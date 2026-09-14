import React, { useState, useEffect } from 'react';
import { X, Calendar, Sparkles, TrendingUp, CheckCircle2, ArrowRight } from 'lucide-react';
import { useMomentum } from '../../context/MomentumContext';
import { MomentumReview } from '../../types';
import { AIProvider } from '../../engine/AIProvider';

interface WeeklyReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const WeeklyReviewModal: React.FC<WeeklyReviewModalProps> = ({ isOpen, onClose }) => {
  const { currentGoal } = useMomentum();
  const [review, setReview] = useState<MomentumReview | null>(null);

  useEffect(() => {
    if (isOpen) {
      const ai = new AIProvider();
      ai.generateWeeklyReview(3, currentGoal?.totalMissionsCompleted || 14, currentGoal?.totalMinutesInvested || 490)
        .then(setReview);
    }
  }, [isOpen, currentGoal]);

  if (!isOpen || !review) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <div className="bg-surface-cardElevated border border-surface-border rounded-3xl p-6 max-w-lg w-full shadow-2xl relative max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-full text-slate-400 hover:text-white bg-surface-dark/60"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="flex items-center gap-2 text-brand-400 text-xs font-mono font-bold uppercase tracking-wider mb-2">
          <Calendar className="w-4 h-4" />
          <span>WEEKLY MOMENTUM REVIEW #{review.weekNumber}</span>
        </div>

        <h3 className="text-xl font-black text-white">
          What Momentum Learned About You.
        </h3>
        <p className="text-xs text-slate-400 mt-1 leading-relaxed">
          Not generic flattery. Grounded empirical patterns observed from your verified execution logs this week.
        </p>

        {/* Top 3 Learnings */}
        <div className="mt-4 space-y-2.5">
          <div className="text-xs font-bold text-slate-300">
            3 Empirical Insights Discovered:
          </div>
          {review.topLearnings.map((learning, idx) => (
            <div
              key={idx}
              className="p-3.5 rounded-xl bg-surface-dark border border-surface-border flex items-start gap-3"
            >
              <div className="w-5 h-5 rounded-full bg-brand-500/10 text-brand-400 font-mono font-bold text-xs flex items-center justify-center flex-shrink-0 mt-0.5">
                {idx + 1}
              </div>
              <p className="text-xs text-slate-200 leading-relaxed">
                {learning}
              </p>
            </div>
          ))}
        </div>

        {/* System Adaptations for Next Week */}
        <div className="mt-5 p-4 rounded-2xl bg-brand-950/20 border border-brand-500/20">
          <div className="text-xs font-bold text-brand-400 flex items-center gap-1.5 mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Here is What Momentum is Changing Next Week:</span>
          </div>
          <div className="space-y-1.5">
            {review.systemAdaptationsForNextWeek.map((adaptation, idx) => (
              <div key={idx} className="flex items-start gap-2 text-xs text-slate-300">
                <span className="text-brand-500 font-bold">✓</span>
                <span>{adaptation}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Proof Evidence Numbers */}
        <div className="mt-4 grid grid-cols-3 gap-2 text-center">
          <div className="p-2.5 rounded-xl bg-surface-dark border border-surface-border">
            <div className="text-[10px] uppercase font-mono text-slate-500">Actions</div>
            <div className="text-base font-bold font-mono text-white mt-0.5">
              {review.proofEvidence.actionsCount}
            </div>
          </div>
          <div className="p-2.5 rounded-xl bg-surface-dark border border-surface-border">
            <div className="text-[10px] uppercase font-mono text-slate-500">Hours In Flow</div>
            <div className="text-base font-bold font-mono text-brand-400 mt-0.5">
              {review.proofEvidence.hoursLogged}h
            </div>
          </div>
          <div className="p-2.5 rounded-xl bg-surface-dark border border-surface-border">
            <div className="text-[10px] uppercase font-mono text-slate-500">Completion</div>
            <div className="text-base font-bold font-mono text-electric-400 mt-0.5">
              {review.completionRate}%
            </div>
          </div>
        </div>

        {/* Close Button */}
        <button
          onClick={onClose}
          className="mt-5 w-full py-3 rounded-xl bg-surface-card hover:bg-surface-dark text-white font-bold text-xs border border-surface-border transition"
        >
          Apply Adaptations to Upcoming Missions
        </button>
      </div>
    </div>
  );
};
