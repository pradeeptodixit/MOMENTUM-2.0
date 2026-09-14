import React from 'react';
import { X, AlertTriangle, ShieldAlert, Sparkles, ArrowRight } from 'lucide-react';
import { Task, FrictionLog } from '../../types';

interface FrictionRadarModalProps {
  task: Task | null;
  isOpen: boolean;
  onClose: () => void;
  onSelectReason: (taskId: string, reason: FrictionLog['reason']) => void;
}

export const FrictionRadarModal: React.FC<FrictionRadarModalProps> = ({
  task,
  isOpen,
  onClose,
  onSelectReason,
}) => {
  if (!isOpen || !task) return null;

  const reasons: { id: FrictionLog['reason']; label: string; icon: string; adaptationHint: string }[] = [
    {
      id: 'too_long',
      label: 'Takes too long today',
      icon: '⏳',
      adaptationHint: 'Splits this task into a single 10-minute micro-sprint.',
    },
    {
      id: 'too_difficult',
      label: 'Too complex or intimidating',
      icon: '🧗',
      adaptationHint: 'Deconstructs into an easy visual primer before coding.',
    },
    {
      id: 'low_motivation',
      label: 'Low energy / Procrastinating',
      icon: '🔋',
      adaptationHint: 'Triggers the 3-Minute Just Start protocol with zero pressure.',
    },
    {
      id: 'unclear_instructions',
      label: 'Ambiguous / Don\'t know where to start',
      icon: '❓',
      adaptationHint: 'Clarifies explicit "definition of done" and starting click.',
    },
    {
      id: 'wrong_time',
      label: 'Bad timing / Unexpected interruption',
      icon: '⏰',
      adaptationHint: 'Reschedules to your verified evening sweet spot without guilt.',
    },
    {
      id: 'missing_prerequisite',
      label: 'Blocked by prerequisite missing',
      icon: '🔗',
      adaptationHint: 'Reorders dependencies and generates the missing foundation first.',
    },
  ];

  const handleSelect = (reason: FrictionLog['reason']) => {
    onSelectReason(task.id, reason);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <div className="bg-surface-cardElevated border border-surface-border rounded-3xl p-6 max-w-md w-full shadow-2xl relative">
        {/* Header */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-full text-slate-400 hover:text-white bg-surface-dark/60"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="flex items-center gap-2 text-amber-400 text-xs font-mono font-bold uppercase tracking-wider mb-2">
          <AlertTriangle className="w-4 h-4" />
          <span>FRICTION RADAR DIAGNOSTIC</span>
        </div>

        <h3 className="text-lg font-extrabold text-white">
          Why does this task feel blocked?
        </h3>
        <p className="text-xs text-slate-400 mt-1 leading-relaxed">
          Momentum never blames you for skipping. Select what is in the way, and the AI will adapt the plan to fit reality.
        </p>

        {/* Task Name */}
        <div className="mt-3 p-3 rounded-xl bg-surface-dark border border-surface-border">
          <div className="text-[10px] text-slate-500 uppercase font-mono">Target Task</div>
          <div className="text-xs font-semibold text-slate-200 mt-0.5">{task.title}</div>
        </div>

        {/* 1-Tap Reasons */}
        <div className="mt-4 space-y-2">
          {reasons.map((r) => (
            <button
              key={r.id}
              onClick={() => handleSelect(r.id)}
              className="w-full text-left p-3 rounded-xl bg-surface-card hover:bg-surface-dark border border-surface-border hover:border-amber-500/40 transition flex items-start justify-between group"
            >
              <div className="flex items-start gap-3">
                <span className="text-lg">{r.icon}</span>
                <div>
                  <div className="text-xs font-bold text-slate-200 group-hover:text-amber-300 transition-colors">
                    {r.label}
                  </div>
                  <div className="text-[11px] text-slate-400 mt-0.5">
                    {r.adaptationHint}
                  </div>
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-amber-400 group-hover:translate-x-0.5 transition-all mt-1" />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
