import { AnimationState, AnimationEvent } from './types';

export type IdleCallback = (event: AnimationEvent) => void;

export class IdleTracker {
  private lastEventTime: number = Date.now();
  private lastState: AnimationState = 'idle';
  private thinkingTimer: NodeJS.Timeout | null = null;
  private idleTimer: NodeJS.Timeout | null = null;
  private callback: IdleCallback;
  private hadStopEvent: boolean = false;

  // Configurable timeouts
  private readonly THINKING_TIMEOUT = 3000;  // 3 seconds → thinking
  private readonly IDLE_TIMEOUT = 10000;     // 10 seconds after Stop → idle

  constructor(callback: IdleCallback) {
    this.callback = callback;
  }

  // Call this whenever an event is received
  onEvent(state: AnimationState, eventName: string): void {
    this.lastEventTime = Date.now();
    this.lastState = state;
    this.clearTimers();

    // Track if we received a Stop event
    if (eventName === 'Stop') {
      this.hadStopEvent = true;
      this.startIdleTimer();
    } else {
      this.hadStopEvent = false;
      // For non-Stop events, start thinking timer
      // (in case no more events come)
      if (state !== 'idle' && state !== 'leaving') {
        this.startThinkingTimer();
      }
    }
  }

  private startThinkingTimer(): void {
    this.thinkingTimer = setTimeout(() => {
      // Only transition to thinking if we haven't received new events
      if (Date.now() - this.lastEventTime >= this.THINKING_TIMEOUT) {
        this.emitState('thinking');
      }
    }, this.THINKING_TIMEOUT);
  }

  private startIdleTimer(): void {
    this.idleTimer = setTimeout(() => {
      // Transition to idle after Stop event timeout
      if (this.hadStopEvent && Date.now() - this.lastEventTime >= this.IDLE_TIMEOUT) {
        this.emitState('idle');
      }
    }, this.IDLE_TIMEOUT);
  }

  private emitState(state: AnimationState): void {
    this.lastState = state;
    this.callback({
      type: 'state_change',
      animation: state,
      description: state === 'idle' ? 'Idle' : 'Thinking...',
      timestamp: Date.now(),
    });
  }

  private clearTimers(): void {
    if (this.thinkingTimer) {
      clearTimeout(this.thinkingTimer);
      this.thinkingTimer = null;
    }
    if (this.idleTimer) {
      clearTimeout(this.idleTimer);
      this.idleTimer = null;
    }
  }

  // Get current state
  getState(): AnimationState {
    return this.lastState;
  }

  // Clean up
  destroy(): void {
    this.clearTimers();
  }
}
