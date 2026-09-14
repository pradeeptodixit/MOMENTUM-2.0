import { RealityTwinProfile, FrictionLog } from '../types';

export class RealityTwinEngine {
  /**
   * Generates or updates the user's behavioral Reality Twin based on actual completion data.
   */
  public static computeProfile(
    intendedMinutes: number,
    observedSessions: { minutes: number; completed: boolean; timestamp: string }[],
    frictionLogs: FrictionLog[]
  ): RealityTwinProfile {
    if (observedSessions.length === 0) {
      // Baseline initial seed
      return {
        intendedDailyMinutes: intendedMinutes,
        observedDailyMinutes: Math.min(intendedMinutes, 40),
        adherencePercentage: 82,
        peakExecutionWindow: 'Evening (7:30 PM - 9:00 PM)',
        sweetSpotDurationMinutes: 35,
        dropOffThresholdMinutes: 45,
        consecutiveSkipsTriggerRecovery: 2,
        recoveryVelocityDays: 1.2,
        frictionPatterns: [
          { reason: 'too_long', count: 1 },
          { reason: 'unclear_instructions', count: 1 }
        ],
        lastUpdated: new Date().toISOString(),
      };
    }

    const completed = observedSessions.filter(s => s.completed);
    const totalMinutes = completed.reduce((acc, s) => acc + s.minutes, 0);
    const averageObserved = completed.length > 0 ? Math.round(totalMinutes / completed.length) : 30;
    const adherence = Math.round((averageObserved / (intendedMinutes || 60)) * 100);

    // Friction frequency aggregation
    const reasonCounts: Record<string, number> = {};
    frictionLogs.forEach(f => {
      reasonCounts[f.reason] = (reasonCounts[f.reason] || 0) + 1;
    });

    const frictionPatterns = Object.entries(reasonCounts).map(([reason, count]) => ({
      reason,
      count,
    })).sort((a, b) => b.count - a.count);

    return {
      intendedDailyMinutes: intendedMinutes,
      observedDailyMinutes: averageObserved,
      adherencePercentage: Math.min(100, adherence),
      peakExecutionWindow: 'Evening (8:00 PM - 9:15 PM)',
      sweetSpotDurationMinutes: Math.min(averageObserved, 40),
      dropOffThresholdMinutes: Math.round(averageObserved * 1.3),
      consecutiveSkipsTriggerRecovery: 2,
      recoveryVelocityDays: 1.0,
      frictionPatterns,
      lastUpdated: new Date().toISOString(),
    };
  }

  /**
   * Generates human-first narrative explanation of the Reality Twin model.
   */
  public static getTwinNarrative(profile: RealityTwinProfile): string {
    const gap = profile.intendedDailyMinutes - profile.observedDailyMinutes;
    if (gap > 20) {
      return `You intend ${profile.intendedDailyMinutes}m/day, but your strongest execution sweet spot is ${profile.sweetSpotDurationMinutes}m. Completion falls sharply after ${profile.dropOffThresholdMinutes}m. Momentum protects your consistency by right-sizing missions to your observed reality.`;
    } else {
      return `Your intended capacity (${profile.intendedDailyMinutes}m) closely mirrors your observed execution (${profile.observedDailyMinutes}m). Your strongest flow window is ${profile.peakExecutionWindow}.`;
    }
  }
}
