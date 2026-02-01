import { AnimationState, Location, CharacterAction } from '../types';

// Map animation states to office locations
export function getLocationForState(state: AnimationState): Location {
  switch (state) {
    case 'entering':
      return 'door';
    case 'leaving':
      return 'door';
    case 'idle':
      return 'coffee';
    case 'thinking':
      return 'whiteboard';
    case 'typing':
    case 'reading':
    case 'searching':
    case 'terminal':
    case 'browsing':
    case 'waiting':
    case 'error':
    case 'success':
    case 'delegating':
      return 'desk';
    default:
      return 'desk';
  }
}

// Map animation states to character actions
export function getActionForState(state: AnimationState): CharacterAction {
  switch (state) {
    case 'entering':
    case 'leaving':
      return 'walking';
    case 'idle':
      return 'coffee-sip';
    case 'thinking':
      return 'thinking';
    case 'typing':
      return 'typing';
    case 'reading':
      return 'reading';
    case 'searching':
      return 'searching';
    case 'terminal':
      return 'typing-green';
    case 'browsing':
      return 'scrolling';
    case 'waiting':
      return 'waiting';
    case 'error':
      return 'frustrated';
    case 'success':
      return 'celebrating';
    case 'delegating':
      return 'phone';
    default:
      return 'idle';
  }
}

// Get target location for entering/leaving animations
export function getTransitionTarget(state: AnimationState, currentLocation: Location): Location {
  if (state === 'entering') {
    return 'desk'; // Walk from door to desk
  }
  if (state === 'leaving') {
    return 'door'; // Walk from current location to door
  }
  return getLocationForState(state);
}
