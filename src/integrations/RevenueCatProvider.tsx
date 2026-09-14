import React, { createContext, useContext, useState, useEffect } from 'react';
import { RevenueCatEntitlements, ExperimentVariant } from '../types';

interface OfferingPackage {
  id: string;
  identifier: 'monthly' | 'annual' | 'lifetime';
  title: string;
  priceString: string;
  pricePerMonth?: string;
  badge?: string;
  trialDays?: number;
  description: string;
}

interface RevenueCatContextType {
  entitlements: RevenueCatEntitlements;
  packages: OfferingPackage[];
  selectedOfferingId: string;
  setSelectedOfferingId: (id: string) => void;
  purchasePackage: (packageId: string) => Promise<boolean>;
  restorePurchases: () => Promise<boolean>;
  toggleSandbox: () => void;
  activeExperiment: ExperimentVariant;
  isLoading: boolean;
  paywallDismissedCount: number;
  recordPaywallView: () => void;
}

const RevenueCatContext = createContext<RevenueCatContextType | undefined>(undefined);

export const RevenueCatProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [entitlements, setEntitlements] = useState<RevenueCatEntitlements>(() => {
    const saved = localStorage.getItem('momentum_entitlements');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) {}
    }
    return {
      hasProAccess: false,
      activeOffering: 'free',
      trialActive: false,
      isSandbox: true,
    };
  });

  const [selectedOfferingId, setSelectedOfferingId] = useState<string>('pkg_annual');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [paywallDismissedCount, setPaywallDismissedCount] = useState<number>(0);

  // Revenue Experiment: Variant A (Annual-First with Trial) vs Variant B (Monthly-First)
  const [activeExperiment] = useState<ExperimentVariant>({
    id: 'exp_paywall_structure_2026',
    name: 'Annual Free Trial vs Direct Monthly',
    variant: 'A',
    metric: 'trial_start_conversion',
  });

  const packages: OfferingPackage[] = [
    {
      id: 'pkg_annual',
      identifier: 'annual',
      title: 'Pro Annual (Most Popular)',
      priceString: '$59.99 / year',
      pricePerMonth: '$4.99 / mo',
      badge: 'SAVE 50% + 7-DAY FREE TRIAL',
      trialDays: 7,
      description: 'Full unlimited access. Zero charge until day 7. Cancel anytime in 1 tap.',
    },
    {
      id: 'pkg_monthly',
      identifier: 'monthly',
      title: 'Pro Monthly',
      priceString: '$9.99 / month',
      description: 'Flexible month-to-month adaptive coaching. Cancel anytime.',
    },
    {
      id: 'pkg_lifetime',
      identifier: 'lifetime',
      title: 'Founder Lifetime Pass',
      priceString: '$149.99 one-time',
      badge: 'SHIPATON 2026 EXCLUSIVE',
      description: 'Pay once, unlock every current and future Momentum engine upgrade forever.',
    },
  ];

  useEffect(() => {
    localStorage.setItem('momentum_entitlements', JSON.stringify(entitlements));
  }, [entitlements]);

  const recordPaywallView = () => {
    // Telemetry event for paywall conversion funnel
    console.log('[RevenueCat Telemetry] paywall_viewed', {
      variant: activeExperiment.variant,
      currentOffering: selectedOfferingId,
      timestamp: new Date().toISOString(),
    });
  };

  const purchasePackage = async (packageId: string): Promise<boolean> => {
    setIsLoading(true);
    console.log(`[RevenueCat SDK] Purchasing package: ${packageId} (Sandbox: ${entitlements.isSandbox})`);

    // Simulate official RevenueCat Purchases.purchasePackage()
    await new Promise((resolve) => setTimeout(resolve, 800));

    const isAnnual = packageId === 'pkg_annual';
    const newEntitlement: RevenueCatEntitlements = {
      hasProAccess: true,
      activeOffering: isAnnual ? 'annual_pro_trial' : packageId === 'pkg_lifetime' ? 'lifetime_sponsor' : 'monthly_pro',
      trialActive: isAnnual,
      trialDaysRemaining: isAnnual ? 7 : undefined,
      isSandbox: entitlements.isSandbox,
      expirationDate: new Date(Date.now() + 365 * 86400000).toISOString(),
    };

    setEntitlements(newEntitlement);
    setIsLoading(false);

    console.log('[RevenueCat Telemetry] purchase_completed', {
      packageId,
      hasProAccess: true,
      entitlement: 'pro_access',
    });

    return true;
  };

  const restorePurchases = async (): Promise<boolean> => {
    setIsLoading(true);
    console.log('[RevenueCat SDK] Restoring purchases from app store receipt...');
    await new Promise((resolve) => setTimeout(resolve, 600));

    // Restore entitlement if previously cached
    const restored: RevenueCatEntitlements = {
      hasProAccess: true,
      activeOffering: 'annual_pro_trial',
      trialActive: false,
      isSandbox: entitlements.isSandbox,
      expirationDate: new Date(Date.now() + 365 * 86400000).toISOString(),
    };

    setEntitlements(restored);
    setIsLoading(false);
    console.log('[RevenueCat Telemetry] restore_purchase_success', restored);
    return true;
  };

  const toggleSandbox = () => {
    setEntitlements((prev) => ({ ...prev, isSandbox: !prev.isSandbox }));
  };

  return (
    <RevenueCatContext.Provider
      value={{
        entitlements,
        packages,
        selectedOfferingId,
        setSelectedOfferingId,
        purchasePackage,
        restorePurchases,
        toggleSandbox,
        activeExperiment,
        isLoading,
        paywallDismissedCount,
        recordPaywallView,
      }}
    >
      {children}
    </RevenueCatContext.Provider>
  );
};

export const useRevenueCat = () => {
  const context = useContext(RevenueCatContext);
  if (!context) {
    throw new Error('useRevenueCat must be used within a RevenueCatProvider');
  }
  return context;
};
