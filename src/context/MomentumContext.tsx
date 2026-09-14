import React, { createContext, useContext, useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { 
  Goal, 
  Mission, 
  Task, 
  FrictionLog, 
  RealityTwinProfile, 
  EnergyLevel, 
  SpecialistType, 
  CoachTone, 
  Challenge, 
  MomentumCircle,
  PersonalPlaybookEntry 
} from '../types';
import { GoalCompiler } from '../engine/GoalCompiler';
import { MissionCompressor } from '../engine/MissionCompressor';
import { FrictionRadar } from '../engine/FrictionRadar';
import { RecoveryEngine, RecoveryReason } from '../engine/RecoveryEngine';
import { RealityTwinEngine } from '../engine/RealityTwinEngine';
import { AIProvider } from '../engine/AIProvider';
import { OneSignalRetention } from '../integrations/OneSignalRetention';

export type ViewportMode = 'mobile_phone' | 'galaxy_fold' | 'web_landing';

interface MomentumContextType {
  // Goal & Mission
  currentGoal: Goal | null;
  currentMission: Mission | null;
  setCurrentGoal: (goal: Goal) => void;
  setCurrentMission: (mission: Mission) => void;
  compileNewGoal: (rawInput: string, timeBudget?: number) => void;
  toggleTaskCompletion: (taskId: string) => void;
  
  // Adaptation Engines
  setTimeBudget: (minutes: number) => void;
  setEnergyLevel: (energy: EnergyLevel) => void;
  expandMissionBy: (minutes: number) => void;
  logFriction: (taskId: string, reason: FrictionLog['reason']) => void;
  triggerResetRecovery: (reason: RecoveryReason, notes?: string) => void;

  // Reality Twin & Playbook
  realityTwin: RealityTwinProfile;
  frictionLogs: FrictionLog[];
  playbook: PersonalPlaybookEntry[];
  
  // Social & Growth
  challenges: Challenge[];
  circles: MomentumCircle[];
  createChallenge: (topic: string) => Promise<Challenge>;
  
  // AI Coach & Settings
  specialist: SpecialistType;
  setSpecialist: (s: SpecialistType) => void;
  coachTone: CoachTone;
  setCoachTone: (t: CoachTone) => void;
  coachChatMessages: { sender: 'user' | 'ai'; text: string; time: string }[];
  sendCoachMessage: (msg: string) => Promise<void>;

  // Device & UI Mode
  viewportMode: ViewportMode;
  setViewportMode: (mode: ViewportMode) => void;
  isMicroCommitmentActive: boolean;
  activeMicroTask: Task | null;
  startMicroCommitment: (task: Task) => void;
  stopMicroCommitment: () => void;

  // Demo & Reset
  loadJudgeDemoData: () => void;
  resetAllData: () => void;
}

const MomentumContext = createContext<MomentumContextType | undefined>(undefined);

export const MomentumProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [viewportMode, setViewportMode] = useState<ViewportMode>('mobile_phone');
  const [specialist, setSpecialist] = useState<SpecialistType>('coding');
  const [coachTone, setCoachTone] = useState<CoachTone>('balanced');
  
  // Micro-commitment state (3-minute "Just Start")
  const [isMicroCommitmentActive, setIsMicroCommitmentActive] = useState<boolean>(false);
  const [activeMicroTask, setActiveMicroTask] = useState<Task | null>(null);

  // Initial Goal & Mission Seed
  const [currentGoal, setCurrentGoal] = useState<Goal | null>(() => {
    const saved = localStorage.getItem('momentum_active_goal');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) {}
    }
    const defaultCompiled = GoalCompiler.compile('Crack Technical Coding Interview in 30 Days', 30);
    return defaultCompiled.goal;
  });

  const [currentMission, setCurrentMission] = useState<Mission | null>(() => {
    const saved = localStorage.getItem('momentum_active_mission');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) {}
    }
    const defaultCompiled = GoalCompiler.compile('Crack Technical Coding Interview in 30 Days', 30);
    return defaultCompiled.initialMission;
  });

  const [frictionLogs, setFrictionLogs] = useState<FrictionLog[]>(() => {
    const saved = localStorage.getItem('momentum_friction_logs');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) {}
    }
    return [
      {
        id: 'fric_seed_1',
        taskId: 't_prev_1',
        missionId: 'm_prev_1',
        taskTitle: 'System Design Architecture Scalability (60m)',
        timestamp: new Date(Date.now() - 86400000).toISOString(),
        reason: 'too_long',
        adaptationApplied: 'Split into 10m concept digest + 10m diagram sketch.',
      }
    ];
  });

  const [realityTwin, setRealityTwin] = useState<RealityTwinProfile>(() => {
    return RealityTwinEngine.computeProfile(60, [
      { minutes: 35, completed: true, timestamp: new Date(Date.now() - 86400000).toISOString() },
      { minutes: 25, completed: true, timestamp: new Date(Date.now() - 172800000).toISOString() }
    ], frictionLogs);
  });

  const [playbook] = useState<PersonalPlaybookEntry[]>([
    {
      trigger: 'When I have less than 20 minutes...',
      aiStrategy: 'Auto-compress to The One Thing and omit secondary exercises.',
      learnedDate: 'Yesterday',
      provenSuccessRate: 94,
    },
    {
      trigger: 'When a task feels too difficult...',
      aiStrategy: 'Break into 5-minute visual primer before touching code.',
      learnedDate: '3 days ago',
      provenSuccessRate: 88,
    },
    {
      trigger: 'When motivation drops...',
      aiStrategy: 'Initiate 3-Minute Just Start countdown without committing to completion.',
      learnedDate: 'Last week',
      provenSuccessRate: 82,
    },
  ]);

  const [challenges, setChallenges] = useState<Challenge[]>([
    {
      id: 'c1',
      title: '7-Day Python & DSA Sprint',
      description: 'Daily 25-minute deliberate practice focused on top high-frequency patterns.',
      daysCount: 7,
      category: 'engineering',
      dailyTimeBudgetMinutes: 25,
      participantsCount: 384,
      isPublic: true,
    },
    {
      id: 'c2',
      title: '7-Day MVP Launch Challenge',
      description: 'Zero-to-one product development sprint with real customer validation.',
      daysCount: 7,
      category: 'startup',
      dailyTimeBudgetMinutes: 30,
      participantsCount: 196,
      isPublic: true,
    }
  ]);

  const [circles] = useState<MomentumCircle[]>([
    {
      id: 'circ_1',
      name: 'Coding & Algorithms Circle',
      category: 'engineering',
      collectiveProgressPercent: 86,
      membersCount: 8,
      activeMissionTitle: 'Arrays & Dynamic Programming Sprint',
    },
    {
      id: 'circ_2',
      name: 'Shipaton 2026 Founders Circle',
      category: 'startup',
      collectiveProgressPercent: 92,
      membersCount: 12,
      activeMissionTitle: 'RevenueCat Monetization & Public Store Release',
    }
  ]);

  const [coachChatMessages, setCoachChatMessages] = useState<{ sender: 'user' | 'ai'; text: string; time: string }[]>([
    {
      sender: 'ai',
      text: "I'm your Momentum Adaptive Coach. I don't give generic motivational quotes—I adapt your plan to your real schedule and energy. How is your focus today?",
      time: 'Just now',
    }
  ]);

  // Sync to local storage for offline resilience
  useEffect(() => {
    if (currentGoal) localStorage.setItem('momentum_active_goal', JSON.stringify(currentGoal));
    if (currentMission) localStorage.setItem('momentum_active_mission', JSON.stringify(currentMission));
    localStorage.setItem('momentum_friction_logs', JSON.stringify(frictionLogs));
  }, [currentGoal, currentMission, frictionLogs]);

  const compileNewGoal = (rawInput: string, timeBudget: number = 30) => {
    const compiled = GoalCompiler.compile(rawInput, timeBudget);
    setCurrentGoal(compiled.goal);
    setCurrentMission(compiled.initialMission);
    OneSignalRetention.triggerMissionReady(timeBudget);
  };

  const toggleTaskCompletion = (taskId: string) => {
    if (!currentMission) return;
    const updatedTasks = currentMission.tasks.map((t) => {
      if (t.id === taskId) {
        const nextCompleted = !t.completed;
        return {
          ...t,
          completed: nextCompleted,
          completedAt: nextCompleted ? new Date().toISOString() : undefined,
        };
      }
      return t;
    });

    const completedCount = updatedTasks.filter((t) => t.completed).length;
    const isNowAllDone = completedCount === updatedTasks.length && updatedTasks.length > 0;

    const updatedMission: Mission = {
      ...currentMission,
      tasks: updatedTasks,
      completedTasksCount: completedCount,
      status: isNowAllDone ? 'completed' : 'in_progress',
    };

    setCurrentMission(updatedMission);

    if (isNowAllDone) {
      // Confetti celebratory burst
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#22c55e', '#38bdf8', '#fbbf24'],
      });

      if (currentGoal) {
        setCurrentGoal({
          ...currentGoal,
          totalMissionsCompleted: currentGoal.totalMissionsCompleted + 1,
          totalMinutesInvested: currentGoal.totalMinutesInvested + currentMission.targetDurationMinutes,
          gravityScore: Math.min(100, currentGoal.gravityScore + 4),
        });
      }
    }
  };

  const setTimeBudget = (minutes: number) => {
    if (!currentMission) return;
    const compressed = MissionCompressor.compress(currentMission, minutes);
    setCurrentMission(compressed);
    OneSignalRetention.triggerIncompleteRescue(minutes);
  };

  const setEnergyLevel = (energy: EnergyLevel) => {
    if (!currentMission) return;
    setCurrentMission({
      ...currentMission,
      energyLevel: energy,
      aiCollaboratorNote: energy === 'low' 
        ? 'Low energy mode enabled. Focus strictly on review and foundational steps.' 
        : energy === 'high' 
        ? 'High energy mode active. Tackle the core challenge with intense focus.' 
        : 'Balanced mode maintained.',
    });
  };

  const expandMissionBy = (minutes: number) => {
    if (!currentMission) return;
    const expanded = MissionCompressor.expand(currentMission, minutes);
    setCurrentMission(expanded);
  };

  const logFriction = (taskId: string, reason: FrictionLog['reason']) => {
    if (!currentMission) return;
    const task = currentMission.tasks.find((t) => t.id === taskId);
    if (!task) return;

    const diagnosis = FrictionRadar.diagnose(currentMission, task, reason);
    setFrictionLogs((prev) => [diagnosis.log, ...prev]);

    const newMission: Mission = {
      ...currentMission,
      tasks: diagnosis.adaptedTasks,
      status: 'adapted',
      adaptedReason: `Friction diagnosed (${reason.replace('_', ' ')}). Task re-engineered into micro-actions.`,
      aiCollaboratorNote: diagnosis.aiMessage,
      totalTasksCount: diagnosis.adaptedTasks.length,
      completedTasksCount: diagnosis.adaptedTasks.filter((t) => t.completed).length,
    };

    setCurrentMission(newMission);
  };

  const triggerResetRecovery = (reason: RecoveryReason, notes?: string) => {
    if (!currentGoal) return;
    const resetResult = RecoveryEngine.executeReset(currentGoal, reason, notes);
    setCurrentGoal(resetResult.updatedGoal);
    setCurrentMission(resetResult.recoveryMission);
    OneSignalRetention.triggerRecoveryPrompt();
  };

  const createChallenge = async (topic: string): Promise<Challenge> => {
    const ai = new AIProvider();
    const newChal = await ai.generate7DayChallenge(topic);
    setChallenges((prev) => [newChal, ...prev]);
    return newChal;
  };

  const startMicroCommitment = (task: Task) => {
    setActiveMicroTask(task);
    setIsMicroCommitmentActive(true);
  };

  const stopMicroCommitment = () => {
    setIsMicroCommitmentActive(false);
    setActiveMicroTask(null);
  };

  const sendCoachMessage = async (msg: string) => {
    const nowStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    setCoachChatMessages((prev) => [...prev, { sender: 'user', text: msg, time: nowStr }]);

    const ai = new AIProvider();
    const reply = await ai.generateCoachResponse(specialist, coachTone, msg, currentMission || undefined);
    
    setTimeout(() => {
      setCoachChatMessages((prev) => [
        ...prev,
        { sender: 'ai', text: reply, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }
      ]);
    }, 400);
  };

  const loadJudgeDemoData = () => {
    const demo = GoalCompiler.compile('Crack Technical Coding Interview in 30 Days', 30);
    setCurrentGoal({
      ...demo.goal,
      totalMissionsCompleted: 14,
      totalMinutesInvested: 490,
      gravityScore: 92,
      consistencyRate: 0.93,
    });
    setCurrentMission(demo.initialMission);
  };

  const resetAllData = () => {
    localStorage.clear();
    const fresh = GoalCompiler.compile('Master Full-Stack & System Architecture', 30);
    setCurrentGoal(fresh.goal);
    setCurrentMission(fresh.initialMission);
    setFrictionLogs([]);
  };

  return (
    <MomentumContext.Provider
      value={{
        currentGoal,
        currentMission,
        setCurrentGoal,
        setCurrentMission,
        compileNewGoal,
        toggleTaskCompletion,
        setTimeBudget,
        setEnergyLevel,
        expandMissionBy,
        logFriction,
        triggerResetRecovery,
        realityTwin,
        frictionLogs,
        playbook,
        challenges,
        circles,
        createChallenge,
        specialist,
        setSpecialist,
        coachTone,
        setCoachTone,
        coachChatMessages,
        sendCoachMessage,
        viewportMode,
        setViewportMode,
        isMicroCommitmentActive,
        activeMicroTask,
        startMicroCommitment,
        stopMicroCommitment,
        loadJudgeDemoData,
        resetAllData,
      }}
    >
      {children}
    </MomentumContext.Provider>
  );
};

export const useMomentum = () => {
  const context = useContext(MomentumContext);
  if (!context) {
    throw new Error('useMomentum must be used within a MomentumProvider');
  }
  return context;
};
