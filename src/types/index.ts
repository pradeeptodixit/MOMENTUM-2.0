export type DifficultyLevel = 'easy' | 'comfort' | 'challenge' | 'mastery';
export type EnergyLevel = 'low' | 'medium' | 'high';
export type CoachTone = 'gentle' | 'balanced' | 'direct';
export type SpecialistType = 'study' | 'career' | 'coding' | 'startup' | 'fitness' | 'creative';

export interface Task {
  id: string;
  title: string;
  description: string;
  durationMinutes: number;
  completed: boolean;
  completedAt?: string;
  isOneThing?: boolean; // Today's "The One Thing"
  cognitiveLoad: 'low' | 'medium' | 'high';
  difficulty: DifficultyLevel;
  actionableStep: string;
  whyThisMatters: string;
  frictionLogId?: string;
  dependencies?: string[]; // IDs of tasks that must be finished first
}

export interface MissionDNA {
  difficulty: DifficultyLevel;
  estimatedDuration: number;
  cognitiveLoad: 'low' | 'medium' | 'high';
  urgency: 'low' | 'medium' | 'high';
  importance: 'normal' | 'critical';
  frictionProbability: number; // 0.0 - 1.0
  userConfidenceScore?: number;
}

export interface Mission {
  id: string;
  goalId: string;
  title: string;
  date: string;
  tasks: Task[];
  originalDurationMinutes: number;
  targetDurationMinutes: number;
  energyLevel: EnergyLevel;
  dna: MissionDNA;
  status: 'pending' | 'in_progress' | 'completed' | 'adapted' | 'reset';
  adaptedReason?: string;
  completedTasksCount: number;
  totalTasksCount: number;
  aiCollaboratorNote?: string;
}

export interface Milestone {
  id: string;
  title: string;
  description: string;
  targetDaysFromStart: number;
  completed: boolean;
  completedDate?: string;
  order: number;
}

export interface Goal {
  id: string;
  title: string;
  rawInput: string;
  category: 'career' | 'engineering' | 'startup' | 'study' | 'fitness' | 'creative' | 'finance';
  timelineDays: number;
  startDate: string;
  milestones: Milestone[];
  gravityScore: number; // 0 to 100
  consistencyRate: number; // 0.0 to 1.0
  currentMissionId?: string;
  totalMissionsCompleted: number;
  totalMinutesInvested: number;
  healthStatus: 'healthy' | 'needs_attention' | 'stagnant' | 'recalibrating';
  activeChallengeId?: string;
}

export interface FrictionLog {
  id: string;
  taskId: string;
  missionId: string;
  taskTitle: string;
  timestamp: string;
  reason: 
    | 'too_difficult'
    | 'too_long'
    | 'wrong_time'
    | 'unclear_instructions'
    | 'low_motivation'
    | 'competing_commitment'
    | 'boredom'
    | 'missing_prerequisite'
    | 'interruption';
  adaptationApplied: string;
}

export interface RealityTwinProfile {
  intendedDailyMinutes: number;
  observedDailyMinutes: number;
  adherencePercentage: number;
  peakExecutionWindow: string; // e.g. "Evening (7:00 PM - 9:30 PM)"
  sweetSpotDurationMinutes: number; // e.g. 35 mins
  dropOffThresholdMinutes: number; // e.g. 45 mins
  consecutiveSkipsTriggerRecovery: number;
  recoveryVelocityDays: number;
  frictionPatterns: { reason: string; count: number }[];
  lastUpdated: string;
}

export interface MomentumReview {
  id: string;
  weekNumber: number;
  startDate: string;
  endDate: string;
  totalMissionsAttempted: number;
  completionRate: number;
  topLearnings: string[];
  systemAdaptationsForNextWeek: string[];
  proofEvidence: {
    actionsCount: number;
    hoursLogged: number;
    milestonesUnlocked: number;
  };
}

export interface PersonalPlaybookEntry {
  trigger: string;
  aiStrategy: string;
  learnedDate: string;
  provenSuccessRate: number;
}

export interface Challenge {
  id: string;
  title: string;
  description: string;
  daysCount: number;
  category: string;
  dailyTimeBudgetMinutes: number;
  participantsCount: number;
  inviterName?: string;
  isPublic: boolean;
}

export interface MomentumCircle {
  id: string;
  name: string;
  category: string;
  collectiveProgressPercent: number;
  membersCount: number;
  activeMissionTitle: string;
}

export interface RevenueCatEntitlements {
  hasProAccess: boolean;
  activeOffering: 'free' | 'monthly_pro' | 'annual_pro_trial' | 'lifetime_sponsor';
  expirationDate?: string;
  trialActive: boolean;
  trialDaysRemaining?: number;
  isSandbox: boolean;
}

export interface ExperimentVariant {
  id: string;
  name: string;
  variant: 'A' | 'B';
  metric: string;
}
