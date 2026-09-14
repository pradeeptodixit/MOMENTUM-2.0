import React, { useState } from 'react';
import { Sparkles, ArrowRight, ShieldCheck, Check, CreditCard, ExternalLink, Smartphone, Zap, Flame } from 'lucide-react';
import { StripeFunnel } from '../../integrations/StripeFunnel';
import { useRevenueCat } from '../../integrations/RevenueCatProvider';
import { useMomentum } from '../../context/MomentumContext';

export const StripeWebLanding: React.FC = () => {
  const { setViewportMode, compileNewGoal } = useMomentum();
  const { purchasePackage } = useRevenueCat();
  const [goalQuery, setGoalQuery] = useState<string>('Crack Coding Interview in 30 Days');
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [checkoutComplete, setCheckoutComplete] = useState<boolean>(false);

  const handleInteractiveDemoCompile = () => {
    compileNewGoal(goalQuery, 25);
    setViewportMode('mobile_phone');
  };

  const handleStripeCheckout = async (plan: 'monthly' | 'annual') => {
    setIsProcessing(true);
    await new Promise((resolve) => setTimeout(resolve, 800));
    const session = StripeFunnel.createCheckoutSession('user@example.com', plan);
    await purchasePackage(plan === 'annual' ? 'pkg_annual' : 'pkg_monthly');
    setIsProcessing(false);
    setCheckoutComplete(true);
  };

  return (
    <div className="min-h-screen bg-surface-dark text-slate-100 py-12 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
      {/* Top Banner Navigation */}
      <div className="flex items-center justify-between pb-8 border-b border-surface-border">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-brand-600 to-electric-500 flex items-center justify-center font-bold text-black shadow-lg shadow-brand-500/20">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <div className="text-base font-extrabold tracking-wider text-white">MOMENTUM AI 2.0</div>
            <div className="text-xs text-slate-400 font-mono">The Adaptive Human Execution Engine</div>
          </div>
        </div>

        <button
          onClick={() => setViewportMode('mobile_phone')}
          className="px-4 py-2 rounded-xl bg-surface-card hover:bg-surface-cardElevated border border-surface-border text-xs font-semibold flex items-center gap-1.5 transition"
        >
          <Smartphone className="w-4 h-4 text-brand-400" />
          <span>Launch Mobile Simulator</span>
        </button>
      </div>

      {/* Hero Section */}
      <div className="text-center mt-12 mb-10 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-500/10 border border-brand-500/20 text-brand-400 text-xs font-mono font-bold mb-4">
          <Flame className="w-3.5 h-3.5 fill-current" />
          <span>REVENUECAT SHIPATON 2026 HERO CANDIDATE</span>
        </div>

        <h1 className="text-4xl sm:text-5xl font-black text-white tracking-tight leading-tight">
          Don't Just Set Goals. <br />
          <span className="bg-gradient-to-r from-brand-400 via-emerald-300 to-electric-400 bg-clip-text text-transparent">
            Build Momentum.
          </span>
        </h1>

        <p className="mt-4 text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
          Traditional productivity apps assume a straight line. Momentum is an AI execution engine that adapts to the human, not the other way around.
        </p>
      </div>

      {/* Interactive Goal Compiler Simulator Box */}
      <div className="p-6 rounded-3xl bg-surface-cardElevated border border-surface-border shadow-2xl max-w-2xl mx-auto mb-16">
        <div className="text-xs font-mono font-bold text-brand-400 uppercase tracking-wider mb-2">
          ⚡ Interactive Live Demo
        </div>
        <h3 className="text-lg font-bold text-white">Test the Goal Compiler in 5 Seconds:</h3>

        <div className="mt-4 flex flex-col sm:flex-row gap-2.5">
          <input
            type="text"
            value={goalQuery}
            onChange={(e) => setGoalQuery(e.target.value)}
            className="flex-1 px-4 py-3 rounded-xl bg-surface-dark border border-surface-border text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-brand-500"
            placeholder="Enter any objective..."
          />
          <button
            onClick={handleInteractiveDemoCompile}
            className="px-5 py-3 rounded-xl bg-gradient-to-r from-brand-600 to-emerald-500 text-black font-extrabold text-sm flex items-center justify-center gap-1.5 shadow-lg shadow-brand-500/20 hover:opacity-95 transition"
          >
            <span>Compile in App</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="mt-3 text-xs text-slate-400 flex items-center gap-2">
          <span>Preset suggestions:</span>
          <button onClick={() => setGoalQuery('Learn Python & Ship a Tool')} className="underline hover:text-brand-400">Python</button>
          <span>•</span>
          <button onClick={() => setGoalQuery('Launch MVP Startup in 30 Days')} className="underline hover:text-brand-400">Startup</button>
          <span>•</span>
          <button onClick={() => setGoalQuery('Run a 10K Sub-50m Pace')} className="underline hover:text-brand-400">10K Run</button>
        </div>
      </div>

      {/* Stripe Funnel Pricing Section */}
      <div className="text-center mb-6">
        <div className="text-xs font-mono font-bold text-electric-400 uppercase tracking-widest">
          OFFICIAL STRIPE + REVENUECAT WEB-TO-APP FUNNEL
        </div>
        <h2 className="text-2xl sm:text-3xl font-black text-white mt-1">
          Simple, Transparent Execution Plans
        </h2>
        <p className="text-xs text-slate-400 mt-1">
          Purchase on web via Stripe Checkout $\to$ instantly unlocked on iOS, Android & Galaxy Fold via RevenueCat.
        </p>
      </div>

      {checkoutComplete && (
        <div className="mb-8 p-4 rounded-2xl bg-brand-950/40 border border-brand-500/40 max-w-xl mx-auto text-center">
          <div className="text-sm font-bold text-brand-400 flex items-center justify-center gap-2">
            <Check className="w-4 h-4" />
            <span>Stripe Checkout Verified & RevenueCat Entitlement Granted!</span>
          </div>
          <p className="text-xs text-slate-300 mt-1">
            Your Pro pass has been synchronized. Click below to return to your mobile execution dashboard.
          </p>
          <button
            onClick={() => setViewportMode('mobile_phone')}
            className="mt-3 px-4 py-2 rounded-xl bg-brand-500 text-black font-extrabold text-xs inline-flex items-center gap-1"
          >
            <span>Open Mobile App with Pro</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">
        {/* Monthly Plan */}
        <div className="p-6 rounded-3xl bg-surface-card border border-surface-border text-left relative flex flex-col justify-between">
          <div>
            <div className="text-xs font-mono text-slate-400 uppercase">Monthly Pro</div>
            <div className="text-3xl font-black text-white mt-1">$9.99 <span className="text-xs text-slate-400 font-normal">/ month</span></div>
            <p className="text-xs text-slate-400 mt-2 leading-relaxed">
              Flexible month-to-month access to adaptive execution, Reality Twin, and AI mission compressor.
            </p>
            <ul className="mt-4 space-y-2 text-xs text-slate-300">
              <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-brand-400" /> Unlimited compiled goals</li>
              <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-brand-400" /> Reality Twin capacity modeling</li>
              <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-brand-400" /> One-tap Friction Radar & 3-Min micro mode</li>
            </ul>
          </div>

          <button
            onClick={() => handleStripeCheckout('monthly')}
            disabled={isProcessing}
            className="mt-6 w-full py-3 rounded-xl bg-surface-cardElevated hover:bg-slate-700 border border-surface-border text-white font-bold text-xs flex items-center justify-center gap-2 transition"
          >
            <CreditCard className="w-4 h-4" />
            <span>Pay $9.99 with Stripe</span>
          </button>
        </div>

        {/* Annual Plan (Best Value with Trial) */}
        <div className="p-6 rounded-3xl bg-gradient-to-b from-brand-950/30 via-surface-card to-surface-card border-2 border-brand-500/60 text-left relative flex flex-col justify-between shadow-xl shadow-brand-500/10">
          <div className="absolute -top-3 right-6 px-3 py-0.5 rounded-full bg-brand-500 text-black font-mono font-extrabold text-[10px] uppercase tracking-wider">
            SAVE 50% + 7-DAY FREE TRIAL
          </div>

          <div>
            <div className="text-xs font-mono text-brand-400 uppercase font-bold">Annual Pro Pass</div>
            <div className="text-3xl font-black text-white mt-1">$59.99 <span className="text-xs text-slate-400 font-normal">/ year ($4.99/mo)</span></div>
            <p className="text-xs text-slate-300 mt-2 leading-relaxed">
              7 days free trial. Zero charge today. Unlocks every current & future adaptive engine upgrade.
            </p>
            <ul className="mt-4 space-y-2 text-xs text-slate-200">
              <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-brand-400 font-bold" /> Everything in Monthly</li>
              <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-brand-400 font-bold" /> Full Specialist Coaches (Coding, Startup, Fitness)</li>
              <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-brand-400 font-bold" /> Weekly Momentum Reviews with empirical insights</li>
              <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-brand-400 font-bold" /> 7-Day Challenges & Collaborative Circles</li>
            </ul>
          </div>

          <button
            onClick={() => handleStripeCheckout('annual')}
            disabled={isProcessing}
            className="mt-6 w-full py-3 rounded-xl bg-gradient-to-r from-brand-600 to-emerald-500 text-black font-black text-xs flex items-center justify-center gap-2 shadow-lg shadow-brand-500/25 hover:opacity-95 transition"
          >
            <CreditCard className="w-4 h-4" />
            <span>Start 7-Day Free Trial (Stripe)</span>
          </button>
        </div>
      </div>
    </div>
  );
};
