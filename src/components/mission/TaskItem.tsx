import React from 'react';
import { CheckCircle2, Circle, Clock, Zap, AlertTriangle, Play, Sparkles } from 'lucide-react';
import { Task } from '../../types';

interface TaskItemProps {
  task: Task;
  onToggle: (taskId: string) => void;
  onOpenFriction: (task: Task) => void;
  onStartMicro: (task: Task) => void;
}

export const TaskItem: React.FC<TaskItemProps> = ({
  task,
  onToggle,
  onOpenFriction,
  onStartMicro,
}) => {
  return (
    <div
      className={`relative rounded-xl p-4 transition-all duration-200 border ${
        task.completed
          ? 'bg-surface-card/50 border-surface-border/60 opacity-60'
          : task.isOneThing
          ? 'bg-gradient-to-b from-surface-cardElevated to-surface-card border-brand-500/40 shadow-lg shadow-brand-500/5'
          : 'bg-surface-card border-surface-border hover:border-slate-700'
      }`}
    >
      {/* "The One Thing" Priority Tag */}
      {task.isOneThing && !task.completed && (
        <div className="absolute -top-2.5 left-4 px-2.5 py-0.5 rounded-full bg-brand-500 text-black text-[10px] font-extrabold uppercase tracking-wider flex items-center gap-1 shadow-sm">
          <Sparkles className="w-3 h-3 fill-black" />
          <span>Today's The One Thing</span>
        </div>
      )}

      <div className="flex items-start gap-3.5">
        {/* Checkbox */}
        <button
          onClick={() => onToggle(task.id)}
          className="mt-0.5 text-slate-400 hover:text-brand-400 transition-colors focus:outline-none"
          title={task.completed ? 'Mark incomplete' : 'Mark complete'}
        >
          {task.completed ? (
            <CheckCircle2 className="w-5 h-5 text-brand-500 fill-brand-500/20" />
          ) : (
            <Circle className="w-5 h-5 text-slate-500 hover:text-brand-500" />
          )}
        </button>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-2">
            <h4
              className={`text-sm font-semibold leading-snug ${
                task.completed ? 'line-through text-slate-400' : 'text-slate-100'
              }`}
            >
              {task.title}
            </h4>

            {/* Duration */}
            <div className="flex items-center gap-1 text-xs font-mono px-2 py-0.5 rounded bg-surface-dark border border-surface-border text-slate-300 flex-shrink-0">
              <Clock className="w-3 h-3 text-slate-400" />
              <span>{task.durationMinutes}m</span>
            </div>
          </div>

          <p className="text-xs text-slate-400 mt-1 leading-relaxed">
            {task.description}
          </p>

          {/* Actionable First Step */}
          {!task.completed && (
            <div className="mt-2 text-xs font-mono text-emerald-400 bg-emerald-950/30 border border-emerald-800/30 px-2.5 py-1.5 rounded-md flex items-center gap-1.5">
              <span className="text-[10px] uppercase font-bold text-emerald-500">First Step:</span>
              <span className="truncate">{task.actionableStep}</span>
            </div>
          )}

          {/* Bottom Action Row: Cognitive Load + 3-Min Just Start + Friction */}
          {!task.completed && (
            <div className="mt-3 flex items-center justify-between pt-2 border-t border-surface-border/50 text-xs">
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-surface-dark text-slate-400 border border-surface-border capitalize">
                  {task.difficulty}
                </span>
                <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-surface-dark text-slate-400 border border-surface-border flex items-center gap-1">
                  <Zap className="w-2.5 h-2.5 text-amber-400" />
                  {task.cognitiveLoad} load
                </span>
              </div>

              <div className="flex items-center gap-2">
                {/* 3-Minute Just Start Button */}
                <button
                  onClick={() => onStartMicro(task)}
                  className="flex items-center gap-1 text-[11px] font-semibold text-brand-400 hover:text-brand-300 bg-brand-500/10 hover:bg-brand-500/20 border border-brand-500/20 px-2 py-1 rounded transition"
                  title="Overcome procrastination with a 3-minute commitment"
                >
                  <Play className="w-3 h-3 fill-brand-400" />
                  <span>3-Min Start</span>
                </button>

                {/* 1-Tap Friction Radar Trigger */}
                <button
                  onClick={() => onOpenFriction(task)}
                  className="flex items-center gap-1 text-[11px] text-slate-400 hover:text-amber-400 bg-surface-dark hover:bg-amber-950/20 border border-surface-border hover:border-amber-500/30 px-2 py-1 rounded transition"
                  title="Diagnose why this task feels blocked"
                >
                  <AlertTriangle className="w-3 h-3 text-amber-500" />
                  <span>Friction?</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
