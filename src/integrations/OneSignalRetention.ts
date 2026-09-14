export interface PushNotificationEvent {
  id: string;
  title: string;
  body: string;
  type: 'mission_ready' | 'incomplete_rescue' | 'recovery_prompt' | 'weekly_review' | 'milestone_unlocked';
  timestamp: string;
  delivered: boolean;
  actionUrl?: string;
}

export class OneSignalRetention {
  private static notificationHistory: PushNotificationEvent[] = [
    {
      id: 'init_push_1',
      title: '🎯 Today\'s Mission Ready',
      body: 'Your 25-minute mission is compiled and waiting. High-leverage core protected.',
      type: 'mission_ready',
      timestamp: new Date(Date.now() - 3600000).toISOString(),
      delivered: true,
    }
  ];

  public static getHistory(): PushNotificationEvent[] {
    return [...this.notificationHistory];
  }

  public static triggerMissionReady(missionDurationMinutes: number): PushNotificationEvent {
    const event: PushNotificationEvent = {
      id: `push_${Date.now()}`,
      title: '⚡ Your Mission is Ready',
      body: `Your custom ${missionDurationMinutes}-minute mission is primed. Focus on your #1 highest-leverage action today.`,
      type: 'mission_ready',
      timestamp: new Date().toISOString(),
      delivered: true,
    };
    this.notificationHistory.unshift(event);
    console.log('[OneSignal SDK] Notification sent:', event);
    return event;
  }

  public static triggerIncompleteRescue(remainingMinutes: number): PushNotificationEvent {
    const event: PushNotificationEvent = {
      id: `push_${Date.now()}`,
      title: '🛡️ Adaptive Rescue Activated',
      body: `You only have ${remainingMinutes}m left today? I've protected your single highest-impact action. Tap to execute now.`,
      type: 'incomplete_rescue',
      timestamp: new Date().toISOString(),
      delivered: true,
    };
    this.notificationHistory.unshift(event);
    console.log('[OneSignal SDK] Adaptive Rescue Notification sent:', event);
    return event;
  }

  public static triggerRecoveryPrompt(): PushNotificationEvent {
    const event: PushNotificationEvent = {
      id: `push_${Date.now()}`,
      title: '🌱 Plan Stopped Fitting Your Week?',
      body: 'Zero shame, zero guilt. Let\'s rebuild from reality with a gentle 10-minute reset.',
      type: 'recovery_prompt',
      timestamp: new Date().toISOString(),
      delivered: true,
    };
    this.notificationHistory.unshift(event);
    console.log('[OneSignal SDK] Recovery Notification sent:', event);
    return event;
  }

  public static triggerWeeklyReview(): PushNotificationEvent {
    const event: PushNotificationEvent = {
      id: `push_${Date.now()}`,
      title: '📊 Your Weekly Momentum Review',
      body: '3 empirical things Momentum learned about how you execute this week. Tap to review.',
      type: 'weekly_review',
      timestamp: new Date().toISOString(),
      delivered: true,
    };
    this.notificationHistory.unshift(event);
    console.log('[OneSignal SDK] Weekly Review Notification sent:', event);
    return event;
  }
}
