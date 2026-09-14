import React from 'react';
import { X, Cpu, Clock, Activity, AlertCircle, Shield, Trash2, CheckCircle2 } from 'lucide-react';
import { useMomentum } from '../../context/MomentumContext';
import { RealityTwinEngine } from '../../engine/RealityTwinEngine';

interface RealityTwinModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const RealityTwinModal: React.FC<RealityTwinModalProps> = ({ isOpen, onClose }) => {
  const { realityTwin, frictionLogs } = useMomentum();

  if (!isOpen) return null;

  const narrative = RealityTwinEngine.getTwinNarrative(realityTwin);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <div className="bg-surface-cardElevated border border-surface-border rounded-3xl p-6 max-w-lg w-full shadow-2xl relative max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-full text-slate-400 hover:text-white bg-surface-dark/60"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="flex items-center gap-2 text-electric-400 text-xs font-mono font-bold uppercase tracking-wider mb-2">
          <Cpu className="w-4 h-4" />
          <span>BEHAVIORAL EXECUTION TWIN</span>
        </div>

        <h3 className="text-xl font-black text-white">
          Your Reality Twin Model
        </h3>
        <p className="text-xs text-slate-400 mt-1 leading-relaxed">
          Not a psychological diagnosis. An empirical model of how you actually execute in real life, so Momentum can build plans that survive contact with your schedule.
        </p>

        {/* Narrative Insight Box */}
        <div className="mt-4 p-4 rounded-2xl bg-electric-950/20 border border-electric-500/20">
          <div className="text-xs font-bold text-electric-400 flex items-center gap-1.5 mb-1">
            <Activity className="w-3.5 h-3.5" />
            <span>Empirical Synthesis</span>
          </div>
          <p className="text-xs text-slate-200 leading-relaxed">
            {narrative}
          </p>
        </div>

        {/* Intended vs Observed Comparison */}
        <div className="mt-4 p-4 rounded-2xl bg-surface-dark border border-surface-border">
          <div className="text-xs font-semibold text-slate-300 mb-3 flex items-center justify-between">
            <span>Capacity Differential</span>
            <span className="text-[10px] font-mono text-slate-500">Based on verified sessions</span>
          </div>

          <div className="space-y-3">
            {/* Intended */}
            <div>
              <div className="flex justify-between text-xs font-mono mb-1">
                <span className="text-slate-400">Intended Capacity:</span>
                <span className="text-slate-300 font-bold">{realityTwin.intendedDailyMinutes}m / day</span>
              </div>
              <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
                <div className="h-full bg-slate-400 rounded-full" style={{ width: '100%' }} />
              </div>
            </div>

            {/* Observed */}
            <div>
              <div className="flex justify-between text-xs font-mono mb-1">
                <span className="text-brand-400 font-semibold">Observed Capacity:</span>
                <span className="text-brand-400 font-bold">{realityTwin.observedDailyMinutes}m / day</span>
              </div>
              <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
                <div
                  className="h-full bg-brand-500 rounded-full"
                  style={{
                    width: `${Math.min(100, Math.round((realityTwin.observedDailyMinutes / realityTwin.intendedDailyMinutes) * 100))}%`,
                  }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Behavioral Metrics Grid */}
        <div className="mt-4 grid grid-cols-2 gap-2.5">
          <div className="p-3 rounded-xl bg-surface-dark border border-surface-border">
            <div className="text-[10px] font-mono uppercase text-slate-400">Execution Sweet Spot</div>
            <div className="text-base font-bold font-mono text-brand-400 mt-0.5">
              {realityTwin.sweetSpotDurationMinutes} mins
            </div>
            <div className="text-[10px] text-slate-500 mt-0.5">Highest adherence rate</div>
          </div>

          <div className="p-3 rounded-xl bg-surface-dark border border-surface-border">
            <div className="text-[10px] font-mono uppercase text-slate-400">Drop-off Threshold</div>
            <div className="text-base font-bold font-mono text-amber-400 mt-0.5">
              {realityTwin.dropOffThresholdMinutes} mins
            </div>
            <div className="text-[10px] text-slate-500 mt-0.5">Friction rises sharply</div>
          </div>

          <div className="col-span-2 p-3 rounded-xl bg-surface-dark border border-surface-border">
            <div className="text-[10px] font-mono uppercase text-slate-400">Peak Flow Window</div>
            <div className="text-xs font-bold text-slate-200 mt-0.5 flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-electric-400" />
              <span>{realityTwin.peakExecutionWindow}</span>
            </div>
          </div>
        </div>

        {/* Friction Patterns Observed */}
        <div className="mt-4">
          <div className="text-xs font-semibold text-slate-300 mb-2">
            Top Obstacles Momentum Adapts For:
          </div>
          <div className="space-y-1.5">
            {realityTwin.frictionPatterns.map((p, idx) => (
              <div
                key={idx}
                className="px-3 py-2 rounded-lg bg-surface-dark border border-surface-border flex items-center justify-between text-xs"
              >
                <span className="text-slate-300 capitalize">{p.reason.replace('_', ' ')}</span>
                <span className="font-mono text-slate-500 text-[11px]">{p.count} event(s) logged</span>
              </div>
            ))}
          </div>
        </div>

        {/* Privacy & Purge Memory Control */}
        <div className="mt-5 pt-4 border-t border-surface-border flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-xs text-slate-400">
            <Shield className="w-3.5 h-3.5 text-emerald-500" />
            <span>Stored locally • Zero PII sold</span>
          </div>
          <button
            onClick={() => {
              localStorage.removeItem('momentum_friction_logs');
              alert('Reality Twin behavioral cache purged.');
              onClose();
            }}
            className="flex items-center gap-1 text-[11px] text-red-400 hover:text-red-300 font-mono transition"
          >
            <Trash2 className="w-3 h-3" />
            <span>Purge Twin Memory</span>
          </button>
        </div>
      </div>
    </div>
  );
};
