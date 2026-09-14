export interface StripeFunnelSession {
  sessionId: string;
  customerEmail: string;
  planId: 'monthly' | 'annual';
  amountUsd: number;
  status: 'initiated' | 'completed' | 'redeemed_in_app';
  deepLinkToken: string;
}

export class StripeFunnel {
  public static createCheckoutSession(email: string, plan: 'monthly' | 'annual'): StripeFunnelSession {
    const session: StripeFunnelSession = {
      sessionId: `cs_test_${Date.now()}`,
      customerEmail: email,
      planId: plan,
      amountUsd: plan === 'annual' ? 59.99 : 9.99,
      status: 'completed',
      deepLinkToken: `momentum://redeem?token=rc_stripe_${Date.now()}&plan=${plan}`,
    };
    console.log('[Stripe Web Funnel] Created and completed checkout session:', session);
    return session;
  }
}
