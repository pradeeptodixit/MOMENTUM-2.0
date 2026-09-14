import React, { useState } from 'react';
import { X, RefreshCw, HeartHandshake, Sparkles, CheckCircle2 } from 'lucide-react';
import { useMomentum } from '../../context/MomentumContext';
import { RecoveryReason } from '../../engine/RecoveryEngine';

interface MomentumResetModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MomentumResetModal: React.FC<MomentumResetModalProps> = ({ isOpen, onClose }) => {
  const { triggerResetRecovery } = useMomentum();
  const [selectedReason, setSelectedReason] = useState<RecoveryReason>('less_time');
  const [notes, setNotes] = useState<string>('');

  if (!isOpen) return null;

  const recoveryOptions: { id: RecoveryReason; label: string; description: string }[] = [
    {
      id: 'less_time',
      label: 'My available time dropped',
      description: 'Momentum adjusts daily target down to rapid 10-15 minute high-leverage micro-actions.',
    },
    {
      id: 'more_work',
      label: 'Overwhelmed by external job / work',
      description: 'Momentum activates low-cognitive-strain maintenance mode so you stay in motion without burnout.',
    },
    {
      id: 'too_difficult',
      label: 'Tasks were calibrated too hard',
      description: 'Momentum dials back the difficulty curve to restore momentum and mastery.',
    },
    {
      id: 'lost_motivation',
      label: 'Lost steam or felt disconnected',
      description: 'Momentum resets with a 3-minute psychological restart and clean slate.',
    },
    {
      id: 'unexpected_event',
      label: 'Unexpected life event occurred',
      description: 'Zero penalty. We archive skipped days and align to today.',
    },
  ];

  const handleApplyReset = () => {
    triggerResetRecovery(selectedReason, notes);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <div className="bg-surface-cardElevated border border-brand-500/30 rounded-3xl p-6 max-w-md w-full shadow-2xl relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-full text-slate-400 hover:text-white bg-surface-dark/60"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-500/10 text-brand-400 text-xs font-mono font-bold border border-brand-500/20 mb-2">
          <HeartHandshake className="w-3.5 h-3.5" />
          <span>ZERO-SHAME RECOVERY MODE</span>
        </div>

        <h3 className="text-xl font-extrabold text-white">
          Your Plan Stopped Fitting Your Week.
        </h3>
        <p className="text-xs text-slate-300 mt-1 leading-relaxed">
          Traditional apps break your streak and shame you. Momentum simply assumes life changed and adapts the plan. What happened?
        </p>

        {/* Reason Selectors */}
        <div className="mt-4 space-y-2">
          {recoveryOptions.map((opt) => {
            const isSelected = selectedReason === opt.id;
            return (
              <button
                key={opt.id}
                onClick={() => setSelectedReason(opt.id)}
                className={`w-full text-left p-3 rounded-xl border transition flex items-start justify-between ${
                  isSelected
                    ? 'bg-brand-950/30 border-brand-500/60 shadow-sm'
                    : 'bg-surface-dark border-surface-border hover:border-slate-600'
                }`}
              >
                <div>
                  <div className={`text-xs font-bold ${isSelected ? 'text-brand-400' : 'text-slate-200'}`}>
                    {opt.label}
                  </div>
                  <div className="text-[11px] text-slate-400 mt-0.5 leading-snug">
                    {opt.description}
                  </div>
                </div>
                {isSelected && <CheckCircle2 className="w-4 h-4 text-brand-400 flex-shrink-0 mt-0.5" />}
              </button>
            );
          })}
        </div>

        {/* Optional input */}
        <div className="mt-3">
          <input
            type="text"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Optional: Anything specific you want the AI to know?"
            className="w-full px-3 py-2 rounded-xl bg-surface-dark border border-surface-border text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-brand-500"
          />
        </div>

        {/* Action Button */}
        <button
          onClick={handleApplyReset}
          className="mt-5 w-full py-3 rounded-xl bg-gradient-to-r from-brand-600 to-emerald-500 text-black font-extrabold text-sm flex items-center justify-center gap-2 shadow-lg shadow-brand-500/20 hover:opacity-95 transition"
        >
          <RefreshCw className="w-4 h-4" />
          <span>Rebuild My Plan From Reality</span>
        </button>
      </div>
    </div>
  );
};
