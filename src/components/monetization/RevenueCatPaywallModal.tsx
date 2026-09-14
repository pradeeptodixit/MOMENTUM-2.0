import React from 'react';
import { X, ShieldCheck, Check, Sparkles, RefreshCw, Lock, Zap, Award } from 'lucide-react';
import { useRevenueCat } from '../../integrations/RevenueCatProvider';

interface RevenueCatPaywallModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const RevenueCatPaywallModal: React.FC<RevenueCatPaywallModalProps> = ({ isOpen, onClose }) => {
  const {
    entitlements,
    packages,
    selectedOfferingId,
    setSelectedOfferingId,
    purchasePackage,
    restorePurchases,
    toggleSandbox,
    isLoading,
  } = useRevenueCat();

  if (!isOpen) return null;

  const handlePurchase = async () => {
    const success = await purchasePackage(selectedOfferingId);
    if (success) {
      alert('Welcome to Momentum Pro! All adaptive execution features and unlimited goals are unlocked.');
      onClose();
    }
  };

  const handleRestore = async () => {
    const restored = await restorePurchases();
    if (restored) {
      alert('Purchases successfully restored from store receipt!');
      onClose();
    }
  };

  const proFeatures = [
    { title: 'Unlimited Active Goals', desc: 'Free tier is limited to 1 active compiled goal' },
    { title: 'Full Reality Twin Engine', desc: 'Intended vs observed capacity, sweet-spot windows, and friction analytics' },
    { title: 'Dynamic Auto-Compression', desc: 'Instantly compress 90m to 5m with zero guilt or shame' },
    { title: 'Weekly Momentum Reviews', desc: 'Empirical analysis of what the system learned about your execution' },
    { title: 'Specialist AI Coaches', desc: 'Coding, Startup, Study, Fitness & Creative execution modes' },
    { title: 'Momentum Circles & Challenges', desc: 'Create and join collaborative progress circles' },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
      <div className="bg-surface-cardElevated border border-surface-border rounded-3xl p-6 max-w-lg w-full shadow-2xl relative max-h-[95vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-full text-slate-400 hover:text-white bg-surface-dark/60"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Sponsor / RevenueCat Header Badge */}
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-brand-400 uppercase tracking-wider">
            <ShieldCheck className="w-4 h-4" />
            <span>REVENUECAT PRO ENTITLEMENT</span>
          </div>

          <button
            onClick={toggleSandbox}
            className="text-[10px] font-mono px-2 py-0.5 rounded bg-surface-dark border border-surface-border text-slate-400 hover:text-white"
            title="Toggle between Live Sandbox and Production Environment"
          >
            {entitlements.isSandbox ? 'SANDBOX: ACTIVE' : 'PRODUCTION MODE'}
          </button>
        </div>

        <h3 className="text-2xl font-black text-white leading-tight">
          Unlock The Adaptive Human Execution Engine.
        </h3>
        <p className="text-xs text-slate-400 mt-1 leading-relaxed">
          The perfect plan is useless if it doesn't survive real life. Upgrade to Pro and let Momentum adapt continuously to you.
        </p>

        {/* Pro Features Grid */}
        <div className="mt-4 p-3.5 rounded-2xl bg-surface-dark border border-surface-border space-y-2">
          {proFeatures.map((f, i) => (
            <div key={i} className="flex items-start gap-2.5">
              <div className="p-0.5 rounded-full bg-brand-500/20 text-brand-400 mt-0.5">
                <Check className="w-3.5 h-3.5" />
              </div>
              <div>
                <div className="text-xs font-bold text-slate-200">{f.title}</div>
                <div className="text-[11px] text-slate-400">{f.desc}</div>
              </div>
            </div>
          ))}
        </div>

        {/* RevenueCat Offerings Packages Selector */}
        <div className="mt-5 space-y-2.5">
          {packages.map((pkg) => {
            const isSelected = selectedOfferingId === pkg.id;
            return (
              <div
                key={pkg.id}
                onClick={() => setSelectedOfferingId(pkg.id)}
                className={`p-3.5 rounded-2xl border cursor-pointer transition-all relative ${
                  isSelected
                    ? 'bg-gradient-to-r from-brand-950/40 via-surface-card to-surface-card border-brand-500 shadow-lg shadow-brand-500/10'
                    : 'bg-surface-dark border-surface-border hover:border-slate-700'
                }`}
              >
                {pkg.badge && (
                  <div className="absolute -top-2.5 right-4 px-2.5 py-0.5 rounded-full bg-gradient-to-r from-brand-600 to-emerald-500 text-black text-[9px] font-mono font-extrabold uppercase tracking-wider shadow-sm">
                    {pkg.badge}
                  </div>
                )}

                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-sm font-bold text-white flex items-center gap-2">
                      <span>{pkg.title}</span>
                      {pkg.pricePerMonth && (
                        <span className="text-xs font-mono text-brand-400 font-bold">
                          ({pkg.pricePerMonth})
                        </span>
                      )}
                    </div>
                    <div className="text-xs text-slate-400 mt-0.5">{pkg.description}</div>
                  </div>

                  <div className="text-right flex-shrink-0 ml-3">
                    <div className="text-sm font-mono font-black text-white">{pkg.priceString}</div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Purchase CTA */}
        <button
          onClick={handlePurchase}
          disabled={isLoading}
          className="mt-5 w-full py-3.5 rounded-2xl bg-gradient-to-r from-brand-600 via-emerald-500 to-electric-500 text-black font-extrabold text-sm flex items-center justify-center gap-2 shadow-xl shadow-brand-500/25 hover:opacity-95 transition disabled:opacity-50"
        >
          {isLoading ? (
            <RefreshCw className="w-4 h-4 animate-spin text-black" />
          ) : (
            <Sparkles className="w-4 h-4 fill-black" />
          )}
          <span>
            {selectedOfferingId === 'pkg_annual'
              ? 'Start 7-Day Free Trial • Then $59.99/yr'
              : 'Upgrade to Momentum Pro'}
          </span>
        </button>

        {/* Restore Purchases & Legal Links */}
        <div className="mt-4 pt-3 border-t border-surface-border/60 flex items-center justify-between text-[11px] text-slate-400">
          <button
            onClick={handleRestore}
            disabled={isLoading}
            className="hover:text-slate-200 transition underline underline-offset-2 flex items-center gap-1"
          >
            <RefreshCw className="w-3 h-3" />
            <span>Restore Purchases</span>
          </button>

          <div className="flex items-center gap-3">
            <span className="hover:text-slate-200 cursor-pointer">Terms</span>
            <span>•</span>
            <span className="hover:text-slate-200 cursor-pointer">Privacy</span>
          </div>
        </div>
      </div>
    </div>
  );
};
