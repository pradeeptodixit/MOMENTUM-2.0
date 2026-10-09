import React from 'react';
import { Target, Clock, Zap, Plus, Sparkles, AlertCircle } from 'lucide-react';
import { useMomentum } from '../../context/MomentumContext';
import { EnergyLevel } from '../../types';

export const MissionHeroCard: React.FC = () => {
  const { 
    currentMission, 
    setTimeBudget, 
    setEnergyLevel, 
    expandMissionBy 
  } = useMomentum();

  if (!currentMission) return null;

  const completionPercent = currentMission.totalTasksCount > 0
    ? Math.round((currentMission.completedTasksCount / currentMission.totalTasksCount) * 100)
    : 0;

  const budgetOptions = [5, 15, 30, 45, 60];

  return (
    <div className="bg-gradient-to-b from-surface-cardElevated to-surface-card rounded-2xl p-5 border border-surface-border shadow-xl">
      {/* Title & Status */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-brand-500/10 text-brand-400 border border-brand-500/20">
            <Target className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-base font-bold text-white tracking-wide">
              {currentMission.title}
            </h3>
            <p className="text-xs text-slate-400">
              {currentMission.completedTasksCount} of {currentMission.totalTasksCount} actions completed
            </p>
          </div>
        </div>

        {/* Total Duration Badge */}
        <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface-dark border border-surface-border text-xs font-mono font-bold text-brand-400">
          <Clock className="w-3.5 h-3.5" />
          <span>{currentMission.targetDurationMinutes} mins</span>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mt-4">
        <div className="flex items-center justify-between text-[11px] font-mono mb-1.5 text-slate-400">
          <span>Daily Execution Progress</span>
          <span className="font-bold text-white">{completionPercent}%</span>
        </div>
        <div className="w-full h-2 rounded-full bg-surface-dark overflow-hidden border border-surface-border/50">
          <div
            className="h-full bg-gradient-to-r from-brand-600 via-emerald-400 to-electric-400 transition-all duration-500 rounded-full"
            style={{ width: `${completionPercent}%` }}
          />
        </div>
      </div>

      {/* AI Collaborator Voice (The Adaptive Engine Note) */}
      {currentMission.aiCollaboratorNote && (
        <div className="mt-4 bg-brand-950/20 border border-brand-500/20 rounded-xl p-3 flex items-start gap-2.5">
          <Sparkles className="w-4 h-4 text-brand-400 mt-0.5 flex-shrink-0" />
          <p className="text-xs text-slate-300 leading-relaxed font-sans">
            <span className="font-semibold text-brand-400">Adaptive Engine by Pradeepto Dixit:</span> {currentMission.aiCollaboratorNote}
          </p>
        </div>
      )}

      {/* Time-Budget Dynamic Compression Bar */}
      <div className="mt-4 pt-3 border-t border-surface-border/60">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-slate-400" />
            <span>How much time do you realistically have today?</span>
          </span>
          <span className="text-[10px] uppercase font-mono text-slate-500">Auto-Compress</span>
        </div>

        <div className="grid grid-cols-5 gap-1.5">
          {budgetOptions.map((minutes) => {
            const isSelected = currentMission.targetDurationMinutes === minutes;
            return (
              <button
                key={minutes}
                onClick={() => setTimeBudget(minutes)}
                className={`py-1.5 px-2 rounded-lg text-xs font-mono font-bold transition-all text-center border ${
                  isSelected
                    ? 'bg-brand-500 text-black border-brand-400 shadow-md shadow-brand-500/20 scale-[1.02]'
                    : 'bg-surface-dark text-slate-400 border-surface-border hover:border-slate-600 hover:text-slate-200'
                }`}
              >
                {minutes}m
              </button>
            );
          })}
        </div>
      </div>

      {/* Energy Level & Extension Row */}
      <div className="mt-3 flex items-center justify-between text-xs pt-3 border-t border-surface-border/40">
        {/* Energy selector */}
        <div className="flex items-center gap-2">
          <span className="text-slate-400 flex items-center gap-1">
            <Zap className="w-3 h-3 text-amber-400" />
            <span>Energy:</span>
          </span>
          {(['low', 'medium', 'high'] as EnergyLevel[]).map((lvl) => (
            <button
              key={lvl}
              onClick={() => setEnergyLevel(lvl)}
              className={`px-2 py-0.5 rounded capitalize font-mono text-[11px] transition ${
                currentMission.energyLevel === lvl
                  ? 'bg-slate-700 text-white font-semibold'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {lvl}
            </button>
          ))}
        </div>

        {/* Quick Expand +15m Button */}
        <button
          onClick={() => expandMissionBy(15)}
          className="flex items-center gap-1 text-[11px] text-electric-400 hover:text-electric-300 font-semibold bg-electric-500/10 hover:bg-electric-500/20 px-2.5 py-1 rounded-md border border-electric-500/20 transition"
          title="Have surplus time? Expand today's mission"
        >
          <Plus className="w-3 h-3" />
          <span>+15m Deep Work</span>
        </button>
      </div>
    </div>
  );
};
