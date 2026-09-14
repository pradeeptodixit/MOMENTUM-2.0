import React, { useState } from 'react';
import { 
  Sparkles, 
  Target, 
  Flame, 
  Cpu, 
  Trophy, 
  Bot, 
  RotateCcw, 
  Share2, 
  Calendar, 
  HeartHandshake, 
  Plus, 
  SlidersHorizontal,
  ChevronRight,
  ShieldCheck,
  Zap,
  CheckCircle2,
  Clock
} from 'lucide-react';
import { useMomentum } from './context/MomentumContext';
import { useRevenueCat } from './integrations/RevenueCatProvider';
import { AppHeader } from './components/layout/AppHeader';
import { MissionHeroCard } from './components/mission/MissionHeroCard';
import { TaskItem } from './components/mission/TaskItem';
import { MicroCommitmentModal } from './components/mission/MicroCommitmentModal';
import { FrictionRadarModal } from './components/radar/FrictionRadarModal';
import { MomentumResetModal } from './components/recovery/MomentumResetModal';
import { GoalCompilerModal } from './components/goal/GoalCompilerModal';
import { RealityTwinModal } from './components/analytics/RealityTwinModal';
import { ProgressProofCard } from './components/analytics/ProgressProofCard';
import { ChallengeGeneratorModal } from './components/social/ChallengeGeneratorModal';
import { RevenueCatPaywallModal } from './components/monetization/RevenueCatPaywallModal';
import { AICoachDrawer } from './components/coach/AICoachDrawer';
import { WeeklyReviewModal } from './components/review/WeeklyReviewModal';
import { StripeWebLanding } from './components/web/StripeWebLanding';
import { Task } from './types';

export const App: React.FC = () => {
  const {
    currentGoal,
    currentMission,
    toggleTaskCompletion,
    logFriction,
    startMicroCommitment,
    viewportMode,
    realityTwin,
    playbook,
    circles,
  } = useMomentum();

  const { entitlements } = useRevenueCat();

  // Modal State Controls
  const [isGoalCompilerOpen, setIsGoalCompilerOpen] = useState<boolean>(false);
  const [isFrictionOpen, setIsFrictionOpen] = useState<boolean>(false);
  const [selectedFrictionTask, setSelectedFrictionTask] = useState<Task | null>(null);
  const [isResetOpen, setIsResetOpen] = useState<boolean>(false);
  const [isRealityTwinOpen, setIsRealityTwinOpen] = useState<boolean>(false);
  const [isProofCardOpen, setIsProofCardOpen] = useState<boolean>(false);
  const [isChallengeOpen, setIsChallengeOpen] = useState<boolean>(false);
  const [isPaywallOpen, setIsPaywallOpen] = useState<boolean>(false);
  const [isCoachOpen, setIsCoachOpen] = useState<boolean>(false);
  const [isWeeklyReviewOpen, setIsWeeklyReviewOpen] = useState<boolean>(false);

  // Active Bottom Tab
  const [activeTab, setActiveTab] = useState<'mission' | 'twin' | 'playbook' | 'social'>('mission');

  // If Web Landing Mode is active, render Stripe Funnel
  if (viewportMode === 'web_landing') {
    return <StripeWebLanding />;
  }

  const handleOpenFriction = (task: Task) => {
    setSelectedFrictionTask(task);
    setIsFrictionOpen(true);
  };

  // The Main Phone or Galaxy Fold View
  const isGalaxyFold = viewportMode === 'galaxy_fold';

  return (
    <div className="min-h-screen bg-[#050609] text-slate-100 flex flex-col items-center justify-start sm:py-6 sm:px-4">
      {/* Container simulating native phone or Samsung Galaxy Fold */}
      <div
        className={`w-full transition-all duration-300 bg-surface-dark sm:rounded-[38px] border sm:border-surface-border shadow-2xl flex flex-col overflow-hidden relative ${
          isGalaxyFold
            ? 'max-w-[880px] min-h-[780px]'
            : 'max-w-[430px] min-h-[844px]'
        }`}
      >
        {/* Universal Status / Header */}
        <AppHeader
          onOpenPaywall={() => setIsPaywallOpen(true)}
          onOpenGoalCompiler={() => setIsGoalCompilerOpen(true)}
        />

        {/* Body Layout: Split into dual-pane for Samsung Galaxy Fold, or single-column for Phone */}
        <div className={`flex-1 flex overflow-hidden ${isGalaxyFold ? 'flex-row' : 'flex-col'}`}>
          {/* Left Pane (Only on Galaxy Fold: Goal Trajectory & Reality Twin Overview) */}
          {isGalaxyFold && (
            <div className="w-[340px] border-r border-surface-border bg-surface-card/40 p-4 flex flex-col justify-between overflow-y-auto">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-mono font-bold text-slate-400 uppercase tracking-wider">
                    SAMSUNG DUAL-PANE VIEW
                  </span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-brand-500/10 text-brand-400 border border-brand-500/20 font-bold">
                    UNFOLDED
                  </span>
                </div>

                {/* Goal Trajectory Card */}
                {currentGoal && (
                  <div className="p-4 rounded-2xl bg-surface-card border border-surface-border">
                    <div className="text-[10px] uppercase font-mono text-brand-400 font-bold">Current Target</div>
                    <h4 className="text-sm font-bold text-white mt-1">{currentGoal.title}</h4>
                    <div className="mt-3 space-y-2">
                      {currentGoal.milestones.map((m) => (
                        <div key={m.id} className="flex items-center gap-2 text-xs text-slate-300">
                          <span className="text-brand-500 font-bold">M{m.order}:</span>
                          <span className="truncate">{m.title}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Reality Twin Quick Glance */}
                <div className="p-4 rounded-2xl bg-surface-card border border-surface-border">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-electric-400 flex items-center gap-1">
                      <Cpu className="w-3.5 h-3.5" />
                      <span>Reality Twin</span>
                    </span>
                    <button
                      onClick={() => setIsRealityTwinOpen(true)}
                      className="text-[10px] text-brand-400 hover:underline"
                    >
                      Details
                    </button>
                  </div>
                  <div className="text-xs text-slate-300">
                    Sweet Spot: <span className="font-mono text-brand-400 font-bold">{realityTwin.sweetSpotDurationMinutes}m</span>
                  </div>
                  <div className="text-xs text-slate-300 mt-1">
                    Flow Window: <span className="text-slate-200">{realityTwin.peakExecutionWindow}</span>
                  </div>
                </div>
              </div>

              {/* Reset Mode Trigger on Left Pane */}
              <button
                onClick={() => setIsResetOpen(true)}
                className="w-full py-2.5 rounded-xl bg-surface-card border border-surface-border hover:border-brand-500/30 text-xs font-semibold text-slate-300 flex items-center justify-center gap-1.5 transition"
              >
                <HeartHandshake className="w-3.5 h-3.5 text-brand-400" />
                <span>Need Momentum Reset?</span>
              </button>
            </div>
          )}

          {/* Main Execution Canvas (Right Pane on Fold, Full Screen on Mobile) */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 pb-24">
            {/* Quick Hero Banner / Notification Banner */}
            <div className="flex items-center justify-between bg-gradient-to-r from-brand-950/40 via-surface-card to-surface-card p-3 rounded-xl border border-brand-500/20 text-xs">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-brand-400 flex-shrink-0" />
                <span className="text-slate-200 truncate">
                  "Your plan should adapt to your real life."
                </span>
              </div>
              <button
                onClick={() => setIsCoachOpen(true)}
                className="text-[11px] font-bold text-brand-400 hover:underline flex-shrink-0 ml-2"
              >
                AI Coach 💬
              </button>
            </div>

            {/* Today's Mission Hero Card */}
            <MissionHeroCard />

            {/* Actions / Tasks List */}
            <div className="space-y-2.5">
              <div className="flex items-center justify-between text-xs font-bold text-slate-300 px-1">
                <span>Today's Actions</span>
                <span className="text-[11px] font-mono text-slate-500 font-normal">
                  Tap friction if stuck
                </span>
              </div>

              {currentMission?.tasks.map((task) => (
                <TaskItem
                  key={task.id}
                  task={task}
                  onToggle={toggleTaskCompletion}
                  onOpenFriction={handleOpenFriction}
                  onStartMicro={startMicroCommitment}
                />
              ))}
            </div>

            {/* Quick Strategic Action Bar (Proof Card, Review, Challenges) */}
            <div className="pt-2 grid grid-cols-3 gap-2">
              <button
                onClick={() => setIsProofCardOpen(true)}
                className="p-2.5 rounded-xl bg-surface-card hover:bg-surface-cardElevated border border-surface-border text-center transition group"
              >
                <Share2 className="w-4 h-4 text-brand-400 mx-auto mb-1 group-hover:scale-110 transition-transform" />
                <div className="text-[10px] font-mono font-bold text-slate-200">Proof Card</div>
              </button>

              <button
                onClick={() => setIsWeeklyReviewOpen(true)}
                className="p-2.5 rounded-xl bg-surface-card hover:bg-surface-cardElevated border border-surface-border text-center transition group"
              >
                <Calendar className="w-4 h-4 text-electric-400 mx-auto mb-1 group-hover:scale-110 transition-transform" />
                <div className="text-[10px] font-mono font-bold text-slate-200">Review</div>
              </button>

              <button
                onClick={() => setIsChallengeOpen(true)}
                className="p-2.5 rounded-xl bg-surface-card hover:bg-surface-cardElevated border border-surface-border text-center transition group"
              >
                <Trophy className="w-4 h-4 text-amber-400 mx-auto mb-1 group-hover:scale-110 transition-transform" />
                <div className="text-[10px] font-mono font-bold text-slate-200">Challenge</div>
              </button>
            </div>

            {/* Playbook Preview (Feature #16) */}
            <div className="p-4 rounded-2xl bg-surface-card border border-surface-border">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-slate-200 flex items-center gap-1.5">
                  <Zap className="w-3.5 h-3.5 text-amber-400" />
                  <span>Personal Playbook</span>
                </span>
                <span className="text-[10px] font-mono text-slate-500">Learned Strategies</span>
              </div>
              <div className="space-y-2 text-xs">
                {playbook.slice(0, 2).map((pb, i) => (
                  <div key={i} className="p-2.5 rounded-lg bg-surface-dark border border-surface-border/60">
                    <div className="text-slate-400 font-semibold">{pb.trigger}</div>
                    <div className="text-slate-200 mt-0.5">{pb.aiStrategy}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Zero-Shame Momentum Reset Callout */}
            {!isGalaxyFold && (
              <button
                onClick={() => setIsResetOpen(true)}
                className="w-full py-3 rounded-2xl bg-surface-card/60 hover:bg-surface-card border border-surface-border text-xs font-semibold text-slate-400 hover:text-slate-200 flex items-center justify-center gap-2 transition"
              >
                <HeartHandshake className="w-4 h-4 text-brand-400" />
                <span>Plan stopped fitting your week? Momentum Reset</span>
              </button>
            )}
          </div>
        </div>

        {/* Bottom Tactical Floating Navigation */}
        <div className="absolute bottom-0 left-0 right-0 bg-surface-dark/95 backdrop-blur-lg border-t border-surface-border px-6 py-3 flex items-center justify-around z-20">
          <button
            onClick={() => setActiveTab('mission')}
            className={`flex flex-col items-center gap-1 text-[10px] font-mono transition ${
              activeTab === 'mission' ? 'text-brand-400 font-bold' : 'text-slate-500 hover:text-slate-300'
            }`}
          >
            <Target className="w-4 h-4" />
            <span>Mission</span>
          </button>

          <button
            onClick={() => setIsRealityTwinOpen(true)}
            className="flex flex-col items-center gap-1 text-[10px] font-mono text-slate-500 hover:text-slate-300 transition"
          >
            <Cpu className="w-4 h-4" />
            <span>Reality Twin</span>
          </button>

          <button
            onClick={() => setIsChallengeOpen(true)}
            className="flex flex-col items-center gap-1 text-[10px] font-mono text-slate-500 hover:text-slate-300 transition"
          >
            <Trophy className="w-4 h-4" />
            <span>Challenge</span>
          </button>

          <button
            onClick={() => setIsCoachOpen(true)}
            className="flex flex-col items-center gap-1 text-[10px] font-mono text-slate-500 hover:text-slate-300 transition"
          >
            <Bot className="w-4 h-4" />
            <span>AI Coach</span>
          </button>
        </div>
      </div>

      {/* All Dynamic Modals & Drawers */}
      <GoalCompilerModal
        isOpen={isGoalCompilerOpen}
        onClose={() => setIsGoalCompilerOpen(false)}
      />

      <FrictionRadarModal
        task={selectedFrictionTask}
        isOpen={isFrictionOpen}
        onClose={() => {
          setIsFrictionOpen(false);
          setSelectedFrictionTask(null);
        }}
        onSelectReason={logFriction}
      />

      <MicroCommitmentModal />

      <MomentumResetModal
        isOpen={isResetOpen}
        onClose={() => setIsResetOpen(false)}
      />

      <RealityTwinModal
        isOpen={isRealityTwinOpen}
        onClose={() => setIsRealityTwinOpen(false)}
      />

      <ProgressProofCard
        isOpen={isProofCardOpen}
        onClose={() => setIsProofCardOpen(false)}
      />

      <ChallengeGeneratorModal
        isOpen={isChallengeOpen}
        onClose={() => setIsChallengeOpen(false)}
      />

      <RevenueCatPaywallModal
        isOpen={isPaywallOpen}
        onClose={() => setIsPaywallOpen(false)}
      />

      <AICoachDrawer
        isOpen={isCoachOpen}
        onClose={() => setIsCoachOpen(false)}
      />

      <WeeklyReviewModal
        isOpen={isWeeklyReviewOpen}
        onClose={() => setIsWeeklyReviewOpen(false)}
      />
    </div>
  );
};
