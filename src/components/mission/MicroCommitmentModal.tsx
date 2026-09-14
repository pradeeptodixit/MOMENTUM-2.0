import React, { useState, useEffect } from 'react';
import { X, Play, Pause, RotateCcw, CheckCircle, Sparkles } from 'lucide-react';
import { useMomentum } from '../../context/MomentumContext';

export const MicroCommitmentModal: React.FC = () => {
  const { 
    isMicroCommitmentActive, 
    activeMicroTask, 
    stopMicroCommitment,
    toggleTaskCompletion 
  } = useMomentum();

  const [secondsLeft, setSecondsLeft] = useState<number>(180); // 3 minutes = 180 seconds
  const [isRunning, setIsRunning] = useState<boolean>(true);

  useEffect(() => {
    if (!isMicroCommitmentActive) {
      setSecondsLeft(180);
      setIsRunning(true);
      return;
    }

    let interval: NodeJS.Timeout;
    if (isRunning && secondsLeft > 0) {
      interval = setInterval(() => {
        setSecondsLeft((prev) => prev - 1);
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isMicroCommitmentActive, isRunning, secondsLeft]);

  if (!isMicroCommitmentActive || !activeMicroTask) return null;

  const minutes = Math.floor(secondsLeft / 60);
  const seconds = secondsLeft % 60;
  const progressPercent = Math.round(((180 - secondsLeft) / 180) * 100);

  const handleFinishAndCheck = () => {
    toggleTaskCompletion(activeMicroTask.id);
    stopMicroCommitment();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <div className="bg-surface-cardElevated border border-brand-500/40 rounded-3xl p-6 max-w-sm w-full shadow-2xl relative text-center">
        {/* Close */}
        <button
          onClick={stopMicroCommitment}
          className="absolute top-4 right-4 p-1.5 rounded-full text-slate-400 hover:text-white bg-surface-dark/60"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-500/10 text-brand-400 text-xs font-mono font-bold border border-brand-500/20 mb-3">
          <Sparkles className="w-3.5 h-3.5" />
          <span>MICRO-COMMITMENT PROTOCOL</span>
        </div>

        <h3 className="text-xl font-extrabold text-white">
          Give Me Just 3 Minutes.
        </h3>
        <p className="text-xs text-slate-300 mt-1 max-w-xs mx-auto leading-relaxed">
          Don't worry about completing the whole task. Just touch step 1 for 180 seconds. You are free to stop when the timer ends.
        </p>

        {/* Task Focus Box */}
        <div className="mt-4 p-3.5 rounded-xl bg-surface-dark border border-surface-border text-left">
          <div className="text-[10px] uppercase font-mono text-brand-400 font-bold">Focus Action:</div>
          <div className="text-xs font-semibold text-slate-100 mt-0.5">{activeMicroTask.title}</div>
          <div className="text-[11px] text-emerald-400 mt-1 font-mono">
            👉 {activeMicroTask.actionableStep}
          </div>
        </div>

        {/* Large Timer Graphic */}
        <div className="my-6 flex flex-col items-center justify-center">
          <div className="relative w-36 h-36 flex items-center justify-center">
            {/* Circular Progress Ring */}
            <svg className="w-full h-full transform -rotate-90">
              <circle
                cx="72"
                cy="72"
                r="62"
                stroke="currentColor"
                strokeWidth="8"
                className="text-surface-dark"
                fill="transparent"
              />
              <circle
                cx="72"
                cy="72"
                r="62"
                stroke="currentColor"
                strokeWidth="8"
                className="text-brand-500 transition-all duration-1000 ease-linear"
                fill="transparent"
                strokeDasharray={2 * Math.PI * 62}
                strokeDashoffset={2 * Math.PI * 62 * (1 - progressPercent / 100)}
                strokeLinecap="round"
              />
            </svg>
            <div className="absolute flex flex-col items-center">
              <span className="text-3xl font-mono font-black text-white tracking-tight">
                {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
              </span>
              <span className="text-[10px] uppercase font-mono text-slate-400 mt-0.5">
                {secondsLeft === 0 ? "You Did It!" : "Momentum"}
              </span>
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-center gap-3">
          <button
            onClick={() => setIsRunning(!isRunning)}
            className="p-3 rounded-full bg-surface-card border border-surface-border text-slate-200 hover:text-white hover:border-slate-500 transition"
            title={isRunning ? 'Pause' : 'Resume'}
          >
            {isRunning ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 fill-current" />}
          </button>

          <button
            onClick={() => setSecondsLeft(180)}
            className="p-3 rounded-full bg-surface-card border border-surface-border text-slate-200 hover:text-white hover:border-slate-500 transition"
            title="Reset to 3 minutes"
          >
            <RotateCcw className="w-5 h-5" />
          </button>
        </div>

        {/* Complete Task Trigger */}
        <button
          onClick={handleFinishAndCheck}
          className="mt-5 w-full py-3 rounded-xl bg-gradient-to-r from-brand-600 to-emerald-500 text-black font-extrabold text-sm flex items-center justify-center gap-2 shadow-lg shadow-brand-500/20 hover:opacity-95 transition"
        >
          <CheckCircle className="w-4 h-4" />
          <span>I'm In Flow — Mark Completed</span>
        </button>
      </div>
    </div>
  );
};
