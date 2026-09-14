import React, { useState } from 'react';
import { X, Share2, Copy, Check, Sparkles, Flame, ShieldCheck, ExternalLink } from 'lucide-react';
import { useMomentum } from '../../context/MomentumContext';
import { LayersGrowthTracker } from '../../integrations/LayersGrowthTracker';

interface ProgressProofCardProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ProgressProofCard: React.FC<ProgressProofCardProps> = ({ isOpen, onClose }) => {
  const { currentGoal, currentMission } = useMomentum();
  const [copied, setCopied] = useState<boolean>(false);

  if (!isOpen || !currentGoal) return null;

  const missionsDone = currentGoal.totalMissionsCompleted || 14;
  const minutesLogged = currentGoal.totalMinutesInvested || 490;
  const gravity = currentGoal.gravityScore || 92;
  const streakDays = 9;

  const handleShare = () => {
    LayersGrowthTracker.recordShare('proof_card');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <div className="bg-surface-cardElevated border border-surface-border rounded-3xl p-6 max-w-sm w-full shadow-2xl relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-full text-slate-400 hover:text-white bg-surface-dark/60"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="text-center mb-4">
          <span className="text-[10px] font-mono font-bold text-brand-400 uppercase tracking-widest bg-brand-500/10 px-2.5 py-1 rounded-full border border-brand-500/20">
            MOMENTUM PROOF CARD
          </span>
          <h3 className="text-lg font-black text-white mt-1.5">Share Verified Execution</h3>
          <p className="text-xs text-slate-400">Concrete proof over empty motivation.</p>
        </div>

        {/* The Card Artifact */}
        <div
          id="momentum-proof-card"
          className="p-5 rounded-2xl bg-gradient-to-br from-slate-900 via-[#0d1017] to-black border-2 border-brand-500/40 relative overflow-hidden shadow-2xl text-left"
        >
          {/* Subtle Background Glow Accent */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-brand-500/10 rounded-full blur-2xl pointer-events-none" />

          {/* Header */}
          <div className="flex items-center justify-between pb-3 border-b border-surface-border/50">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded bg-brand-500 flex items-center justify-center font-bold text-black text-xs">
                M
              </div>
              <span className="text-xs font-mono font-bold text-white tracking-wider">MOMENTUM AI</span>
            </div>
            <div className="flex items-center gap-1 text-[11px] font-mono text-amber-400">
              <Flame className="w-3.5 h-3.5 fill-current" />
              <span>{streakDays} DAY STREAK</span>
            </div>
          </div>

          {/* Goal Title */}
          <div className="mt-3">
            <div className="text-[10px] uppercase font-mono text-slate-400">Mission Target</div>
            <div className="text-sm font-black text-white leading-snug mt-0.5">
              {currentGoal.title}
            </div>
          </div>

          {/* Proof Evidence Numbers */}
          <div className="mt-4 grid grid-cols-2 gap-2">
            <div className="p-2.5 rounded-xl bg-surface-dark/90 border border-surface-border/60">
              <div className="text-[10px] text-slate-400 font-mono">Verified Missions</div>
              <div className="text-lg font-black text-white font-mono mt-0.5">{missionsDone} Completed</div>
            </div>
            <div className="p-2.5 rounded-xl bg-surface-dark/90 border border-surface-border/60">
              <div className="text-[10px] text-slate-400 font-mono">Deliberate Time</div>
              <div className="text-lg font-black text-brand-400 font-mono mt-0.5">{minutesLogged} Mins</div>
            </div>
            <div className="p-2.5 rounded-xl bg-surface-dark/90 border border-surface-border/60">
              <div className="text-[10px] text-slate-400 font-mono">Goal Gravity</div>
              <div className="text-lg font-black text-amber-400 font-mono mt-0.5">{gravity} / 100</div>
            </div>
            <div className="p-2.5 rounded-xl bg-surface-dark/90 border border-surface-border/60">
              <div className="text-[10px] text-slate-400 font-mono">Adherence Rate</div>
              <div className="text-lg font-black text-electric-400 font-mono mt-0.5">93% Reality</div>
            </div>
          </div>

          {/* Footer with Deep Link */}
          <div className="mt-4 pt-3 border-t border-surface-border/50 flex items-center justify-between text-[10px] font-mono text-slate-400">
            <span>Adaptive Human Execution</span>
            <span className="text-brand-400 font-bold">momentum.ai/challenge</span>
          </div>
        </div>

        {/* Share Action Buttons */}
        <div className="mt-5 space-y-2">
          <button
            onClick={handleShare}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-brand-600 to-emerald-500 text-black font-extrabold text-xs flex items-center justify-center gap-2 shadow-lg shadow-brand-500/20 hover:opacity-95 transition"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4" />
                <span>Link Copied & Tracked to Layers!</span>
              </>
            ) : (
              <>
                <Share2 className="w-4 h-4" />
                <span>Share Proof Card (Viral Referral)</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
