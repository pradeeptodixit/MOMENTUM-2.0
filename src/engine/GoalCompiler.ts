import { Goal, Milestone, Mission, Task } from '../types';

export interface CompiledGoalResult {
  goal: Goal;
  initialMission: Mission;
}

export class GoalCompiler {
  /**
   * Compiles any vague human goal into a rigorous outcome, structured milestones,
   * dependencies, and an immediate actionable "What Matters Now" mission.
   */
  public static compile(rawInput: string, customDailyMinutes: number = 30): CompiledGoalResult {
    const trimmed = rawInput.trim();
    const lower = trimmed.toLowerCase();
    const goalId = `goal_${Date.now()}`;
    const missionId = `mission_${Date.now()}`;

    let category: Goal['category'] = 'career';
    let timelineDays = 30;
    let title = trimmed;
    let milestones: Milestone[] = [];
    let initialTasks: Task[] = [];

    // Intelligent domain classification and milestone decomposition
    if (lower.includes('interview') || lower.includes('job') || lower.includes('dsa') || lower.includes('leetcode')) {
      category = 'engineering';
      title = trimmed.length > 5 ? trimmed : 'Crack Technical Interview';
      timelineDays = 30;
      milestones = [
        { id: 'm1', title: 'Data Structures & Core Patterns', description: 'Two Pointers, Sliding Window, Fast/Slow pointers', targetDaysFromStart: 7, completed: false, order: 1 },
        { id: 'm2', title: 'Non-Linear Structures', description: 'Trees, Graphs, BFS/DFS traversal mastery', targetDaysFromStart: 15, completed: false, order: 2 },
        { id: 'm3', title: 'Dynamic Programming & High Frequency', description: 'Memoization, tabulation, top 50 company tagged', targetDaysFromStart: 23, completed: false, order: 3 },
        { id: 'm4', title: 'Mock Interviews & Behavioral Polish', description: 'Simulated timed pressure sessions and STAR stories', targetDaysFromStart: 30, completed: false, order: 4 },
      ];
      initialTasks = [
        {
          id: 't1',
          title: 'Master Two-Pointer Pattern (Array Traversal)',
          description: 'Review the two-pointer template and solve Two Sum II and Container With Most Water.',
          durationMinutes: 15,
          completed: false,
          isOneThing: true,
          cognitiveLoad: 'high',
          difficulty: 'comfort',
          actionableStep: 'Open problem #167, write down invariant before coding.',
          whyThisMatters: 'Two pointers is the bedrock for 40% of array interview problems.',
        },
        {
          id: 't2',
          title: 'Code In-Place Reversal',
          description: 'Solve 1 array partitioning problem without allocating extra space.',
          durationMinutes: 10,
          completed: false,
          isOneThing: false,
          cognitiveLoad: 'medium',
          difficulty: 'challenge',
          actionableStep: 'Write the swapping loop and verify boundary indices.',
          whyThisMatters: 'Proves memory efficiency and edge case handling to interviewers.',
        },
        {
          id: 't3',
          title: 'Complexity Log & Verbal Explanation',
          description: 'Articulate time and space complexity aloud in 90 seconds.',
          durationMinutes: 5,
          completed: false,
          isOneThing: false,
          cognitiveLoad: 'low',
          difficulty: 'easy',
          actionableStep: 'Record a quick 60-second voice note explaining the O(N) rationale.',
          whyThisMatters: 'Interviewers hire candidates who communicate their thought process.',
        }
      ];
    } else if (lower.includes('python') || lower.includes('code') || lower.includes('develop') || lower.includes('rust')) {
      category = 'engineering';
      title = trimmed.length > 5 ? trimmed : 'Learn Python Mastery';
      timelineDays = 21;
      milestones = [
        { id: 'm1', title: 'Syntax, Structures & Control Flow', description: 'Lists, dicts, comprehensions, and generators', targetDaysFromStart: 5, completed: false, order: 1 },
        { id: 'm2', title: 'OOP & Modular Engineering', description: 'Classes, decorators, context managers, and packaging', targetDaysFromStart: 12, completed: false, order: 2 },
        { id: 'm3', title: 'Full Project Construction', description: 'Build and deploy a functional CLI or API utility', targetDaysFromStart: 21, completed: false, order: 3 },
      ];
      initialTasks = [
        {
          id: 't1',
          title: 'Hands-on List Comprehensions & Slicing',
          description: 'Refactor 3 traditional for-loops into elegant Pythonic comprehensions.',
          durationMinutes: 15,
          completed: false,
          isOneThing: true,
          cognitiveLoad: 'medium',
          difficulty: 'comfort',
          actionableStep: 'Run Python REPL and transform nested filtering loops.',
          whyThisMatters: 'Forms the baseline of idiomatic, readable code.',
        },
        {
          id: 't2',
          title: 'Write a Dictionary-Based Frequency Counter',
          description: 'Construct a text analyzer script measuring word frequencies.',
          durationMinutes: 10,
          completed: false,
          isOneThing: false,
          cognitiveLoad: 'medium',
          difficulty: 'comfort',
          actionableStep: 'Implement collections.Counter vs manual dict counting.',
          whyThisMatters: 'Solidifies hash map manipulation in practical scripts.',
        },
        {
          id: 't3',
          title: 'Push Commit to GitHub',
          description: 'Initialize git repo and publish today\'s scripts with a README.',
          durationMinutes: 5,
          completed: false,
          isOneThing: false,
          cognitiveLoad: 'low',
          difficulty: 'easy',
          actionableStep: 'git commit -m "feat: day 1 python mastery" && git push',
          whyThisMatters: 'Builds visible public proof of work from day one.',
        }
      ];
    } else if (lower.includes('startup') || lower.includes('launch') || lower.includes('saas') || lower.includes('product')) {
      category = 'startup';
      title = trimmed.length > 5 ? trimmed : 'Launch MVP Startup';
      timelineDays = 30;
      milestones = [
        { id: 'm1', title: 'Problem Discovery & 10 User Interviews', description: 'Validate urgent hair-on-fire customer pain point', targetDaysFromStart: 7, completed: false, order: 1 },
        { id: 'm2', title: 'Clickable Prototype & Value Proposition', description: 'Validate willingness to pay with interactive prototype', targetDaysFromStart: 14, completed: false, order: 2 },
        { id: 'm3', title: 'V1 MVP Build with Payments', description: 'Ship stripped-down solution with RevenueCat/Stripe', targetDaysFromStart: 23, completed: false, order: 3 },
        { id: 'm4', title: 'Public Launch & First 100 Paying Users', description: 'Product Hunt, direct outbound, and social distribution', targetDaysFromStart: 30, completed: false, order: 4 },
      ];
      initialTasks = [
        {
          id: 't1',
          title: 'Draft 5 Cold DM Interview Scripts',
          description: 'Target 5 ideal prospects on LinkedIn/X suffering from the exact problem.',
          durationMinutes: 15,
          completed: false,
          isOneThing: true,
          cognitiveLoad: 'high',
          difficulty: 'challenge',
          actionableStep: 'Write the 3-sentence non-salesy invitation to learn about their workflow.',
          whyThisMatters: 'Startups fail when founders build what nobody actually buys.',
        },
        {
          id: 't2',
          title: 'Define 1 Core Job-to-be-Done Metric',
          description: 'Document the single quantifiable outcome your customer expects.',
          durationMinutes: 10,
          completed: false,
          isOneThing: false,
          cognitiveLoad: 'medium',
          difficulty: 'comfort',
          actionableStep: 'Fill out: "My product helps [persona] achieve [X] in [Y] time without [Z]."',
          whyThisMatters: 'Sharp positioning prevents wasted engineering cycles.',
        },
        {
          id: 't3',
          title: 'Send Initial 3 Discovery Messages',
          description: 'Dispatch the outreach to prospective beta candidates.',
          durationMinutes: 5,
          completed: false,
          isOneThing: false,
          cognitiveLoad: 'medium',
          difficulty: 'comfort',
          actionableStep: 'Hit send on the 3 DMs without overthinking.',
          whyThisMatters: 'Overcomes founder hesitation and initiates market feedback.',
        }
      ];
    } else if (lower.includes('fitness') || lower.includes('run') || lower.includes('10k') || lower.includes('workout') || lower.includes('gym')) {
      category = 'fitness';
      title = trimmed.length > 5 ? trimmed : 'Build Peak Physical Stamina';
      timelineDays = 45;
      milestones = [
        { id: 'm1', title: 'Aerobic Base Building', description: 'Zone 2 heart rate adaptation and mobility drills', targetDaysFromStart: 10, completed: false, order: 1 },
        { id: 'm2', title: 'Intervals & Cadence Pacing', description: 'Lactate threshold runs and strength conditioning', targetDaysFromStart: 25, completed: false, order: 2 },
        { id: 'm3', title: 'Continuous 10K Simulation', description: 'Nutrition strategy and pre-race time trial', targetDaysFromStart: 45, completed: false, order: 3 },
      ];
      initialTasks = [
        {
          id: 't1',
          title: '20-Minute Zone 2 Easy Cadence Run',
          description: 'Keep conversational pace where nasal breathing is comfortable.',
          durationMinutes: 20,
          completed: false,
          isOneThing: true,
          cognitiveLoad: 'low',
          difficulty: 'comfort',
          actionableStep: 'Lace shoes, start timer, maintain steady 140 bpm heart rate.',
          whyThisMatters: 'Builds mitochondrial density needed for sustainable stamina.',
        },
        {
          id: 't2',
          title: 'Post-Run Hip & Calf Mobility',
          description: 'Dynamic pigeon stretches, calf eccentrics, and ankle rotations.',
          durationMinutes: 10,
          completed: false,
          isOneThing: false,
          cognitiveLoad: 'low',
          difficulty: 'easy',
          actionableStep: 'Hold each mobility stretch for 45 seconds per side.',
          whyThisMatters: 'Prevents shin splints and preserves day-to-day consistency.',
        }
      ];
    } else {
      // General Adaptive Execution Plan
      category = 'career';
      title = trimmed;
      timelineDays = 30;
      milestones = [
        { id: 'm1', title: 'Foundation & Baseline Audit', description: 'Deconstruct core elements and establish daily ritual', targetDaysFromStart: 7, completed: false, order: 1 },
        { id: 'm2', title: 'Deliberate Skill Deepening', description: 'Tackle the hardest 20% that delivers 80% of results', targetDaysFromStart: 18, completed: false, order: 2 },
        { id: 'm3', title: 'Tangible Capstone Delivery', description: 'Assemble visible output and test against real-world standard', targetDaysFromStart: 30, completed: false, order: 3 },
      ];
      initialTasks = [
        {
          id: 't1',
          title: `Core Execution: First Actionable Leap on "${trimmed.slice(0, 30)}"`,
          description: 'Isolate the single highest-friction prerequisite and conquer it first.',
          durationMinutes: 15,
          completed: false,
          isOneThing: true,
          cognitiveLoad: 'high',
          difficulty: 'comfort',
          actionableStep: 'Begin right now with 15 minutes of uninterrupted focus.',
          whyThisMatters: 'Action dissolves ambiguity faster than contemplation.',
        },
        {
          id: 't2',
          title: 'Document Key Findings & Insights',
          description: 'Record what succeeded and where friction appeared.',
          durationMinutes: 10,
          completed: false,
          isOneThing: false,
          cognitiveLoad: 'medium',
          difficulty: 'easy',
          actionableStep: 'Jot down 2 bullet points of what worked and 1 obstacle.',
          whyThisMatters: 'Provides Momentum data to adapt tomorrow\'s mission.',
        },
        {
          id: 't3',
          title: 'Prepare Tomorrow\'s Workspace',
          description: 'Clear tabs, lay out materials, reduce startup friction to 0.',
          durationMinutes: 5,
          completed: false,
          isOneThing: false,
          cognitiveLoad: 'low',
          difficulty: 'easy',
          actionableStep: 'Bookmark your exact starting link for tomorrow morning.',
          whyThisMatters: 'Ensures immediate momentum without decision fatigue.',
        }
      ];
    }

    const calculatedTotalMinutes = initialTasks.reduce((acc, t) => acc + t.durationMinutes, 0);

    const initialMission: Mission = {
      id: missionId,
      goalId: goalId,
      title: "Today's Foundation Mission",
      date: new Date().toISOString().split('T')[0],
      tasks: initialTasks,
      originalDurationMinutes: calculatedTotalMinutes,
      targetDurationMinutes: customDailyMinutes,
      energyLevel: 'medium',
      dna: {
        difficulty: 'comfort',
        estimatedDuration: calculatedTotalMinutes,
        cognitiveLoad: 'medium',
        urgency: 'high',
        importance: 'critical',
        frictionProbability: 0.25,
      },
      status: 'pending',
      completedTasksCount: 0,
      totalTasksCount: initialTasks.length,
      aiCollaboratorNote: "I've compiled your objective into a razor-sharp 30-day trajectory. We start right now by protecting your highest-impact action.",
    };

    const goal: Goal = {
      id: goalId,
      title: title,
      rawInput: rawInput,
      category: category,
      timelineDays: timelineDays,
      startDate: new Date().toISOString(),
      milestones: milestones,
      gravityScore: 88,
      consistencyRate: 1.0,
      currentMissionId: missionId,
      totalMissionsCompleted: 0,
      totalMinutesInvested: 0,
      healthStatus: 'healthy',
    };

    return { goal, initialMission };
  }
}
