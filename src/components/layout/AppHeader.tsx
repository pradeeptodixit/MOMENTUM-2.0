import React from 'react';
import { Sparkles, Flame, ShieldCheck, Smartphone, Tablet, Globe, RotateCcw } from 'lucide-react';
import { useMomentum } from '../../context/MomentumContext';
import { useRevenueCat } from '../../integrations/RevenueCatProvider';

interface AppHeaderProps {
  onOpenPaywall: () => void;
  onOpenGoalCompiler: () => void;
}

export const AppHeader: React.FC<AppHeaderProps> = ({ onOpenPaywall, onOpenGoalCompiler }) => {
  const { currentGoal, viewportMode, setViewportMode, loadJudgeDemoData } = useMomentum();
  const { entitlements } = useRevenueCat();

  return (
    <header className="sticky top-0 z-30 bg-surface-dark/90 backdrop-blur-md border-b border-surface-border px-4 py-3 flex items-center justify-between">
      {/* Brand & Goal Badge */}
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-brand-600 to-electric-500 flex items-center justify-center shadow-lg shadow-brand-500/20">
          <Sparkles className="w-4 h-4 text-black font-bold" />
        </div>
        <div>
          <div className="flex items-center gap-2">
            <span className="text-sm font-extrabold tracking-wider text-white">MOMENTUM</span>
            <span className="text-[10px] uppercase font-mono px-1.5 py-0.5 rounded bg-brand-500/10 text-brand-500 font-semibold border border-brand-500/20">
              AI 2.0
            </span>
          </div>
          <button 
            onClick={onOpenGoalCompiler}
            className="text-xs text-slate-400 hover:text-slate-200 transition-colors flex items-center gap-1 truncate max-w-[180px]"
          >
            <span>{currentGoal?.title || 'Set Primary Goal'}</span>
            <span className="text-brand-500 text-[10px]">⇄</span>
          </button>
        </div>
      </div>

      {/* Center Device Mode Toggles (Phone, Galaxy Fold, Web Funnel) */}
      <div className="hidden sm:flex items-center bg-surface-card rounded-lg p-0.5 border border-surface-border text-xs">
        <button
          onClick={() => setViewportMode('mobile_phone')}
          className={`px-2.5 py-1 rounded flex items-center gap-1.5 transition-all ${
            viewportMode === 'mobile_phone'
              ? 'bg-surface-cardElevated text-white shadow-sm'
              : 'text-slate-400 hover:text-slate-200'
          }`}
          title="Standard Mobile Device (390px)"
        >
          <Smartphone className="w-3.5 h-3.5" />
          <span>Mobile</span>
        </button>
        <button
          onClick={() => setViewportMode('galaxy_fold')}
          className={`px-2.5 py-1 rounded flex items-center gap-1.5 transition-all ${
            viewportMode === 'galaxy_fold'
              ? 'bg-surface-cardElevated text-brand-400 shadow-sm'
              : 'text-slate-400 hover:text-slate-200'
          }`}
          title="Samsung Galaxy Fold Dual-Pane Mode"
        >
          <Tablet className="w-3.5 h-3.5" />
          <span>Galaxy Fold</span>
        </button>
        <button
          onClick={() => setViewportMode('web_landing')}
          className={`px-2.5 py-1 rounded flex items-center gap-1.5 transition-all ${
            viewportMode === 'web_landing'
              ? 'bg-surface-cardElevated text-electric-400 shadow-sm'
              : 'text-slate-400 hover:text-slate-200'
          }`}
          title="Stripe Web-to-App Funnel Landing"
        >
          <Globe className="w-3.5 h-3.5" />
          <span>Stripe Funnel</span>
        </button>
      </div>

      {/* Right Stats & RevenueCat Pro Pill */}
      <div className="flex items-center gap-2.5">
        {/* Quick Demo Seed Button for Judges */}
        <button
          onClick={loadJudgeDemoData}
          className="hidden md:flex items-center gap-1 text-[11px] font-mono px-2 py-1 rounded bg-slate-800 text-slate-300 hover:bg-slate-700 transition"
          title="Load Seeded Realistic Progress for Hackathon Judges"
        >
          <RotateCcw className="w-3 h-3 text-amber-400" />
          <span>Judge Demo Seed</span>
        </button>

        {/* Gravity Score */}
        <div className="flex items-center gap-1 bg-surface-card px-2.5 py-1 rounded-md border border-surface-border text-xs font-mono">
          <Flame className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
          <span className="font-bold text-slate-200">{currentGoal?.gravityScore ?? 85}</span>
          <span className="text-[10px] text-slate-500">GRAV</span>
        </div>

        {/* RevenueCat Status Button */}
        <button
          onClick={onOpenPaywall}
          className={`flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-semibold transition-all ${
            entitlements.hasProAccess
              ? 'bg-gradient-to-r from-brand-600 to-emerald-500 text-black shadow-md shadow-brand-500/20'
              : 'bg-gradient-to-r from-amber-500/20 to-orange-500/20 text-amber-400 border border-amber-500/30 hover:border-amber-400'
          }`}
        >
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>{entitlements.hasProAccess ? 'PRO ACTIVE' : 'UPGRADE PRO'}</span>
        </button>
      </div>
    </header>
  );
};
