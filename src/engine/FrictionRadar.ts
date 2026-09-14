import { FrictionLog, Mission, Task } from '../types';

export interface FrictionDiagnosis {
  log: FrictionLog;
  adaptedTasks: Task[];
  aiMessage: string;
}

export class FrictionRadar {
  public static diagnose(
    mission: Mission,
    task: Task,
    reason: FrictionLog['reason']
  ): FrictionDiagnosis {
    const logId = `fric_${Date.now()}`;
    let adaptationExplanation = '';
    let newSubTasks: Task[] = [];
    let aiMessage = '';

    switch (reason) {
      case 'too_difficult':
        adaptationExplanation = 'Deconstructed into primer concept, guided walk-through, and basic verification.';
        aiMessage = 'No problem. When a task hits a wall, we break it into three bite-sized steps.';
        newSubTasks = [
          {
            id: `sub_${task.id}_1`,
            title: `Primer: Review core intuition for ${task.title.slice(0, 30)}`,
            description: 'Watch or skim a 5-minute visual explanation without writing code.',
            durationMinutes: 5,
            completed: false,
            isOneThing: true,
            cognitiveLoad: 'low',
            difficulty: 'easy',
            actionableStep: 'Focus purely on the high-level diagram or concept summary.',
            whyThisMatters: 'Reduces cognitive barrier before practical execution.',
          },
          {
            id: `sub_${task.id}_2`,
            title: `Guided Attempt: Follow 1 reference example`,
            description: 'Replicate the simplest working example step-by-step.',
            durationMinutes: 8,
            completed: false,
            isOneThing: false,
            cognitiveLoad: 'medium',
            difficulty: 'comfort',
            actionableStep: 'Type out the basic template line by line.',
            whyThisMatters: 'Rebuilds muscle memory without intimidation.',
          },
          {
            id: `sub_${task.id}_3`,
            title: `Check: Explain the logic in 60 seconds`,
            description: 'Verify intuition by articulating the core rule aloud.',
            durationMinutes: 2,
            completed: false,
            isOneThing: false,
            cognitiveLoad: 'low',
            difficulty: 'easy',
            actionableStep: 'Speak the summary aloud.',
            whyThisMatters: 'Locks in mastery.',
          }
        ];
        break;

      case 'too_long':
        adaptationExplanation = 'Split into immediate 10-minute sprint with remaining balance deferred.';
        aiMessage = 'Understood. Length causes avoidance. Let\'s cut this to a single 10-minute sprint.';
        newSubTasks = [
          {
            id: `sub_${task.id}_1`,
            title: `[Sprint 1/2] ${task.title} (Part 1)`,
            description: 'Execute only the first half of this action.',
            durationMinutes: 10,
            completed: false,
            isOneThing: true,
            cognitiveLoad: 'medium',
            difficulty: 'comfort',
            actionableStep: task.actionableStep,
            whyThisMatters: 'Completing 10 minutes is infinitely better than skipping 40.',
          }
        ];
        break;

      case 'low_motivation':
      case 'boredom':
        adaptationExplanation = 'Applied 3-Minute Micro-Commitment trigger to bypass friction.';
        aiMessage = 'Motivation follows action, not vice versa. Give me just 3 minutes.';
        newSubTasks = [
          {
            id: `sub_${task.id}_micro`,
            title: `[3-Minute Rule] Just Open & Start: ${task.title}`,
            description: 'Commit to touching the task for exactly 180 seconds. You may quit freely after.',
            durationMinutes: 3,
            completed: false,
            isOneThing: true,
            cognitiveLoad: 'low',
            difficulty: 'easy',
            actionableStep: 'Start timer and do the absolute simplest first mouse click or sentence.',
            whyThisMatters: '85% of users continue once the startup barrier is crossed.',
          }
        ];
        break;

      case 'unclear_instructions':
        adaptationExplanation = 'Clarified explicit starting definition and removed ambiguity.';
        aiMessage = 'Ambiguity paralyzes execution. Here is the single explicit step to take right now.';
        newSubTasks = [
          {
            id: `sub_${task.id}_clarified`,
            title: `Clarify: What does "Done" look like?`,
            description: 'Write down 1 single sentence stating the verifiable deliverable.',
            durationMinutes: 5,
            completed: false,
            isOneThing: true,
            cognitiveLoad: 'low',
            difficulty: 'easy',
            actionableStep: 'Write: "I am done when [X] is visible on my screen."',
            whyThisMatters: 'Clarity unlocks rapid execution.',
          },
          {
            ...task,
            id: `sub_${task.id}_exec`,
            title: `Execute: ${task.title}`,
            durationMinutes: Math.min(task.durationMinutes, 15),
          }
        ];
        break;

      default:
        adaptationExplanation = 'Rescheduled to upcoming preferred energy window without penalty.';
        aiMessage = 'Logged. We have adapted your plan to fit your current situation.';
        newSubTasks = [
          {
            id: `sub_${task.id}_light`,
            title: `Lightweight Prep for ${task.title}`,
            description: 'Just bookmark materials and lay out the first step for tomorrow.',
            durationMinutes: 4,
            completed: false,
            isOneThing: true,
            cognitiveLoad: 'low',
            difficulty: 'easy',
            actionableStep: 'Open the necessary tab or document.',
            whyThisMatters: 'Protects the habit loop with zero cognitive drain.',
          }
        ];
        break;
    }

    const log: FrictionLog = {
      id: logId,
      taskId: task.id,
      missionId: mission.id,
      taskTitle: task.title,
      timestamp: new Date().toISOString(),
      reason: reason,
      adaptationApplied: adaptationExplanation,
    };

    // Replace the high friction task with adapted sub-tasks
    const otherTasks = mission.tasks.filter(t => t.id !== task.id);
    const updatedTasks = [...otherTasks, ...newSubTasks];

    return {
      log,
      adaptedTasks: updatedTasks,
      aiMessage,
    };
  }
}
