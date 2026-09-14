import React, { useState } from 'react';
import { X, Sparkles, Terminal, ArrowRight, Zap, Target } from 'lucide-react';
import { useMomentum } from '../../context/MomentumContext';

interface GoalCompilerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const GoalCompilerModal: React.FC<GoalCompilerModalProps> = ({ isOpen, onClose }) => {
  const { compileNewGoal } = useMomentum();
  const [goalText, setGoalText] = useState<string>('');
  const [timeBudget, setTimeBudget] = useState<number>(30);
  const [isCompiling, setIsCompiling] = useState<boolean>(false);

  if (!isOpen) return null;

  const presets = [
    { label: 'Crack Coding Interview in 30 Days', category: 'engineering' },
    { label: 'Learn Python & Build Automation Scripts', category: 'engineering' },
    { label: 'Launch Startup MVP with RevenueCat in 21 Days', category: 'startup' },
    { label: 'Run a 10K Road Race with Sub-50m Pace', category: 'fitness' },
    { label: 'Read 12 Core Non-Fiction Architecture Books', category: 'study' },
  ];

  const handleCompile = async (textToCompile?: string) => {
    const target = textToCompile || goalText;
    if (!target.trim()) return;

    setIsCompiling(true);
    // Simulate AI compilation transition
    await new Promise((resolve) => setTimeout(resolve, 600));

    compileNewGoal(target, timeBudget);
    setIsCompiling(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <div className="bg-surface-cardElevated border border-surface-border rounded-3xl p-6 max-w-lg w-full shadow-2xl relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-full text-slate-400 hover:text-white bg-surface-dark/60"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="flex items-center gap-2 text-brand-400 text-xs font-mono font-bold uppercase tracking-wider mb-2">
          <Terminal className="w-4 h-4" />
          <span>PROPRIETARY GOAL COMPILER ENGINE</span>
        </div>

        <h3 className="text-xl font-black text-white">
          Enter Any Meaningful Objective.
        </h3>
        <p className="text-xs text-slate-400 mt-1 leading-relaxed">
          Momentum doesn't dump a static 100-step to-do list. The compiler decomposes your goal into milestones, dependencies, and compresses it into <span className="text-brand-400 font-semibold">Today's The One Thing</span>.
        </p>

        {/* Input */}
        <div className="mt-4">
          <label className="block text-xs font-semibold text-slate-300 mb-1.5">
            What do you want to achieve?
          </label>
          <div className="relative">
            <input
              type="text"
              value={goalText}
              onChange={(e) => setGoalText(e.target.value)}
              placeholder="e.g. Crack my coding interview, Learn Python, Launch MVP..."
              className="w-full px-4 py-3 rounded-xl bg-surface-dark border border-surface-border text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-brand-500 font-sans"
              onKeyDown={(e) => e.key === 'Enter' && handleCompile()}
            />
          </div>
        </div>

        {/* Daily Time Budget selector */}
        <div className="mt-3">
          <div className="flex items-center justify-between text-xs font-semibold text-slate-300 mb-1.5">
            <span>Intended Daily Execution Time:</span>
            <span className="font-mono text-brand-400 font-bold">{timeBudget} mins</span>
          </div>
          <div className="flex gap-2">
            {[15, 25, 30, 45, 60].map((m) => (
              <button
                key={m}
                type="button"
                onClick={() => setTimeBudget(m)}
                className={`flex-1 py-1.5 rounded-lg text-xs font-mono font-bold border transition ${
                  timeBudget === m
                    ? 'bg-brand-500 text-black border-brand-400'
                    : 'bg-surface-dark text-slate-400 border-surface-border hover:text-white'
                }`}
              >
                {m}m
              </button>
            ))}
          </div>
        </div>

        {/* Quick Presets for Demo & Testing */}
        <div className="mt-4">
          <div className="text-[11px] font-mono text-slate-500 uppercase font-semibold mb-2">
            Or test with instant goal presets:
          </div>
          <div className="space-y-1.5 max-h-36 overflow-y-auto pr-1">
            {presets.map((p, idx) => (
              <button
                key={idx}
                onClick={() => handleCompile(p.label)}
                className="w-full text-left px-3 py-2 rounded-lg bg-surface-card hover:bg-surface-dark border border-surface-border hover:border-brand-500/40 transition flex items-center justify-between group"
              >
                <span className="text-xs text-slate-300 group-hover:text-white font-medium truncate">
                  {p.label}
                </span>
                <ArrowRight className="w-3.5 h-3.5 text-slate-500 group-hover:text-brand-400 transition" />
              </button>
            ))}
          </div>
        </div>

        {/* Compile Button */}
        <button
          onClick={() => handleCompile()}
          disabled={isCompiling || !goalText.trim()}
          className="mt-5 w-full py-3 rounded-xl bg-gradient-to-r from-brand-600 via-emerald-500 to-electric-500 text-black font-extrabold text-sm flex items-center justify-center gap-2 shadow-lg shadow-brand-500/20 hover:opacity-95 transition disabled:opacity-50"
        >
          {isCompiling ? (
            <>
              <Sparkles className="w-4 h-4 animate-spin text-black" />
              <span>Compiling Trajectory & Milestones...</span>
            </>
          ) : (
            <>
              <Target className="w-4 h-4" />
              <span>Compile Goal into Execution Trajectory</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};
