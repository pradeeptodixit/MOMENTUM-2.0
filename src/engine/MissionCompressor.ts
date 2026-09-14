import { Mission, Task } from '../types';

export class MissionCompressor {
  /**
   * Dynamically compresses a mission to fit into an exact time budget
   * (e.g. 5, 10, 15, 20, 30 minutes), ALWAYS protecting "The One Thing".
   */
  public static compress(mission: Mission, targetMinutes: number): Mission {
    const tasks = [...mission.tasks];
    
    // Locate "The One Thing" or pick the highest cognitive load/importance task
    let oneThingIndex = tasks.findIndex(t => t.isOneThing);
    if (oneThingIndex === -1 && tasks.length > 0) {
      oneThingIndex = 0;
      tasks[0].isOneThing = true;
    }

    const oneThing = tasks[oneThingIndex];
    const otherTasks = tasks.filter((_, idx) => idx !== oneThingIndex);

    let adaptedTasks: Task[] = [];

    if (targetMinutes <= 5) {
      // 5-Minute Extreme Micro Mode: condense The One Thing into its absolute seed action
      adaptedTasks = [
        {
          ...oneThing,
          title: `[5-Min Sprint] ${oneThing.title}`,
          durationMinutes: 5,
          actionableStep: `Focus exclusively on step 1: ${oneThing.actionableStep.slice(0, 70)}...`,
          cognitiveLoad: 'medium',
          whyThisMatters: 'Preserves your streak and initiates psychological momentum.',
        }
      ];
    } else if (targetMinutes <= 15) {
      // 10-15 Minute Compact Mode: The One Thing (10m) + rapid 3m wrap-up
      adaptedTasks = [
        {
          ...oneThing,
          durationMinutes: Math.min(targetMinutes - 3, 10),
          actionableStep: oneThing.actionableStep,
        },
        {
          id: `t_rapid_wrap_${Date.now()}`,
          title: '3-Minute Synthesis & Notes',
          description: 'Quickly record what you accomplished so tomorrow picks up instantly.',
          durationMinutes: 3,
          completed: false,
          isOneThing: false,
          cognitiveLoad: 'low',
          difficulty: 'easy',
          actionableStep: 'Write 2 lines summarizing today\'s breakthrough.',
          whyThisMatters: 'Locks in progress and eliminates tomorrow\'s startup friction.',
        }
      ];
    } else if (targetMinutes <= 30) {
      // 30 Minute Balanced Mode
      const primaryDuration = Math.round(targetMinutes * 0.65);
      const secondaryDuration = targetMinutes - primaryDuration;
      
      const secondaryTask = otherTasks[0] || {
        id: `t_sec_${Date.now()}`,
        title: 'Tactical Review & Extension',
        description: 'Review core takeaways and verify key mechanisms.',
        durationMinutes: secondaryDuration,
        completed: false,
        isOneThing: false,
        cognitiveLoad: 'medium',
        difficulty: 'comfort',
        actionableStep: 'Review the output and self-test on 1 variation.',
        whyThisMatters: 'Solidifies learning through deliberate recall.',
      };

      adaptedTasks = [
        {
          ...oneThing,
          durationMinutes: primaryDuration,
        },
        {
          ...secondaryTask,
          durationMinutes: secondaryDuration,
        }
      ];
    } else {
      // 45+ minutes: keep all tasks scaled to fit target
      const scaleFactor = targetMinutes / (mission.originalDurationMinutes || 45);
      adaptedTasks = tasks.map(t => ({
        ...t,
        durationMinutes: Math.max(5, Math.round(t.durationMinutes * scaleFactor)),
      }));
    }

    const newCalculatedTotal = adaptedTasks.reduce((acc, t) => acc + t.durationMinutes, 0);

    return {
      ...mission,
      tasks: adaptedTasks,
      targetDurationMinutes: newCalculatedTotal,
      status: 'adapted',
      adaptedReason: `Mission auto-compressed to ${newCalculatedTotal}m to adapt to your schedule. High-impact core protected.`,
      aiCollaboratorNote: `I reduced today's mission from ${mission.originalDurationMinutes}m to ${newCalculatedTotal}m because real life fluctuates. I protected your #1 highest-leverage task.`,
      dna: {
        ...mission.dna,
        estimatedDuration: newCalculatedTotal,
        frictionProbability: Math.max(0.1, mission.dna.frictionProbability - 0.2),
      },
      totalTasksCount: adaptedTasks.length,
      completedTasksCount: adaptedTasks.filter(t => t.completed).length,
    };
  }

  /**
   * Expands a mission when user has extra time and wants to go deeper.
   */
  public static expand(mission: Mission, extraMinutes: number): Mission {
    const newTotal = mission.targetDurationMinutes + extraMinutes;
    const bonusTask: Task = {
      id: `t_deep_${Date.now()}`,
      title: 'Deep Focus Challenge & Extension',
      description: 'Leverage your surplus energy to test boundary conditions or tackle a harder variant.',
      durationMinutes: extraMinutes,
      completed: false,
      isOneThing: false,
      cognitiveLoad: 'high',
      difficulty: 'challenge',
      actionableStep: 'Push one level beyond the comfortable baseline.',
      whyThisMatters: 'Capitalizing on high-energy days accelerates your milestone velocity.',
    };

    const newTasks = [...mission.tasks, bonusTask];

    return {
      ...mission,
      tasks: newTasks,
      targetDurationMinutes: newTotal,
      status: 'adapted',
      adaptedReason: `Mission expanded by +${extraMinutes}m to leverage your extra availability.`,
      aiCollaboratorNote: `Great initiative. We've added an advanced deep-work extension to accelerate your progress.`,
      dna: {
        ...mission.dna,
        estimatedDuration: newTotal,
        cognitiveLoad: 'high',
      },
      totalTasksCount: newTasks.length,
    };
  }
}
