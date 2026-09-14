import { Goal, Mission, Task } from '../types';

export type RecoveryReason = 
  | 'less_time'
  | 'more_work'
  | 'lost_motivation'
  | 'goal_changed'
  | 'too_difficult'
  | 'unexpected_event';

export interface RecoveryPlanResult {
  updatedGoal: Goal;
  recoveryMission: Mission;
  recoverySummary: string;
}

export class RecoveryEngine {
  /**
   * Rebuilds the user's execution trajectory with zero shaming, adapting the timeline
   * and generating a gentle, confidence-restoring recovery mission.
   */
  public static executeReset(
    goal: Goal,
    reason: RecoveryReason,
    userNotes?: string
  ): RecoveryPlanResult {
    let recoverySummary = '';
    let targetMinutes = 15;
    let recoveryTasks: Task[] = [];

    switch (reason) {
      case 'less_time':
        recoverySummary = 'Real life tightened your schedule. We adapted daily capacity from previous expectation down to realistic 15-minute high-leverage micro-missions.';
        targetMinutes = 15;
        recoveryTasks = [
          {
            id: `rec_t1_${Date.now()}`,
            title: `10-Minute High-Leverage Core Sprint`,
            description: 'Execute only the most crucial single step of your goal.',
            durationMinutes: 10,
            completed: false,
            isOneThing: true,
            cognitiveLoad: 'medium',
            difficulty: 'comfort',
            actionableStep: 'Spend 10 focused minutes on the primary deliverable.',
            whyThisMatters: 'Protects forward movement even amidst intense schedules.',
          },
          {
            id: `rec_t2_${Date.now()}`,
            title: '5-Minute Reset & Wrap',
            description: 'Clear the desk and save progress.',
            durationMinutes: 5,
            completed: false,
            isOneThing: false,
            cognitiveLoad: 'low',
            difficulty: 'easy',
            actionableStep: 'Write 1 sentence of where you stopped.',
            whyThisMatters: 'Zero startup friction for tomorrow.',
          }
        ];
        break;

      case 'more_work':
        recoverySummary = 'Heavy external work load detected. We reduced cognitive load to easy/maintenance mode so you stay consistent without burnout.';
        targetMinutes = 10;
        recoveryTasks = [
          {
            id: `rec_t1_${Date.now()}`,
            title: 'Lightweight Review & Maintenance',
            description: 'A low-strain touchpoint to keep concepts fresh.',
            durationMinutes: 10,
            completed: false,
            isOneThing: true,
            cognitiveLoad: 'low',
            difficulty: 'easy',
            actionableStep: 'Review previous notes or read 1 short summary.',
            whyThisMatters: 'Prevents forgetting curve from compounding.',
          }
        ];
        break;

      case 'too_difficult':
        recoverySummary = 'Difficulty curve was calibrated too steep. We recalibrated down to the comfort zone to rebuild confidence and flow.';
        targetMinutes = 15;
        recoveryTasks = [
          {
            id: `rec_t1_${Date.now()}`,
            title: 'Foundational Confidence Builder',
            description: 'Complete a straightforward, satisfying problem to re-establish momentum.',
            durationMinutes: 12,
            completed: false,
            isOneThing: true,
            cognitiveLoad: 'medium',
            difficulty: 'comfort',
            actionableStep: 'Solve an easy/comfortable problem with complete mastery.',
            whyThisMatters: 'Rebuilds neurological dopamine and belief in your capability.',
          },
          {
            id: `rec_t2_${Date.now()}`,
            title: 'Log Today\'s Win',
            description: 'Acknowledge your progress.',
            durationMinutes: 3,
            completed: false,
            isOneThing: false,
            cognitiveLoad: 'low',
            difficulty: 'easy',
            actionableStep: 'Check this off and take pride in returning.',
            whyThisMatters: 'Consistency is forged in the return, not the unbroken streak.',
          }
        ];
        break;

      default:
        recoverySummary = 'Clean slate initiated. Your plan has been synchronized to your present reality.';
        targetMinutes = 15;
        recoveryTasks = [
          {
            id: `rec_t1_${Date.now()}`,
            title: 'Restart Kickoff Sprint',
            description: 'A gentle 15-minute session to reactivate momentum.',
            durationMinutes: 15,
            completed: false,
            isOneThing: true,
            cognitiveLoad: 'medium',
            difficulty: 'comfort',
            actionableStep: 'Dive into step 1 with zero pressure for perfection.',
            whyThisMatters: 'The best plan is the one that fits your life today.',
          }
        ];
        break;
    }

    const missionId = `rec_mission_${Date.now()}`;
    const recoveryMission: Mission = {
      id: missionId,
      goalId: goal.id,
      title: 'Momentum Recovery Mission',
      date: new Date().toISOString().split('T')[0],
      tasks: recoveryTasks,
      originalDurationMinutes: targetMinutes,
      targetDurationMinutes: targetMinutes,
      energyLevel: 'medium',
      dna: {
        difficulty: 'comfort',
        estimatedDuration: targetMinutes,
        cognitiveLoad: 'medium',
        urgency: 'medium',
        importance: 'critical',
        frictionProbability: 0.1,
      },
      status: 'pending',
      adaptedReason: 'Recovery recalibration applied. Welcome back.',
      completedTasksCount: 0,
      totalTasksCount: recoveryTasks.length,
      aiCollaboratorNote: `Your plan stopped fitting your week, so we adapted the plan. No streak shaming, no backlog debt. We start clean today with ${targetMinutes} minutes.`,
    };

    const updatedGoal: Goal = {
      ...goal,
      currentMissionId: missionId,
      healthStatus: 'recalibrating',
      consistencyRate: Math.max(0.7, goal.consistencyRate),
    };

    return {
      updatedGoal,
      recoveryMission,
      recoverySummary,
    };
  }
}
