import { useReducer, useCallback, useEffect, useRef } from 'react';
import { AnimationState, CharacterState, Location, AnimationEvent } from '../types';
import { getLocationForState, getActionForState, getTransitionTarget } from '../utils/stateMapping';

// Walking duration in milliseconds
const WALK_DURATION = 800;
// Brief action duration for success/error animations
const BRIEF_ACTION_DURATION = 1500;

type CharacterAction =
  | { type: 'SET_ANIMATION_STATE'; state: AnimationState }
  | { type: 'START_WALKING'; target: Location }
  | { type: 'ARRIVE_AT_LOCATION'; location: Location }
  | { type: 'PROCESS_QUEUED_STATE' }
  | { type: 'QUEUE_STATE'; state: AnimationState };

const initialState: CharacterState = {
  currentLocation: 'door',
  targetLocation: null,
  currentAction: 'idle',
  isWalking: false,
  animationState: 'idle',
  queuedState: null,
};

function characterReducer(state: CharacterState, action: CharacterAction): CharacterState {
  switch (action.type) {
    case 'SET_ANIMATION_STATE': {
      const targetLocation = getTransitionTarget(action.state, state.currentLocation);
      const needsWalk = targetLocation !== state.currentLocation;

      if (needsWalk) {
        // Need to walk to new location first
        return {
          ...state,
          animationState: action.state,
          targetLocation,
          isWalking: true,
          currentAction: 'walking',
          queuedState: null,
        };
      } else {
        // Already at the right location, start action immediately
        return {
          ...state,
          animationState: action.state,
          targetLocation: null,
          isWalking: false,
          currentAction: getActionForState(action.state),
          queuedState: null,
        };
      }
    }

    case 'START_WALKING':
      return {
        ...state,
        targetLocation: action.target,
        isWalking: true,
        currentAction: 'walking',
      };

    case 'ARRIVE_AT_LOCATION':
      return {
        ...state,
        currentLocation: action.location,
        targetLocation: null,
        isWalking: false,
        currentAction: getActionForState(state.animationState),
      };

    case 'QUEUE_STATE':
      return {
        ...state,
        queuedState: action.state,
      };

    case 'PROCESS_QUEUED_STATE':
      if (state.queuedState) {
        const targetLocation = getTransitionTarget(state.queuedState, state.currentLocation);
        const needsWalk = targetLocation !== state.currentLocation;

        if (needsWalk) {
          return {
            ...state,
            animationState: state.queuedState,
            targetLocation,
            isWalking: true,
            currentAction: 'walking',
            queuedState: null,
          };
        } else {
          return {
            ...state,
            animationState: state.queuedState,
            currentAction: getActionForState(state.queuedState),
            queuedState: null,
          };
        }
      }
      return state;

    default:
      return state;
  }
}

export function useCharacterState() {
  const [state, dispatch] = useReducer(characterReducer, initialState);
  const walkTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const briefActionTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Handle walking completion
  useEffect(() => {
    if (state.isWalking && state.targetLocation) {
      walkTimeoutRef.current = setTimeout(() => {
        dispatch({ type: 'ARRIVE_AT_LOCATION', location: state.targetLocation! });
      }, WALK_DURATION);

      return () => {
        if (walkTimeoutRef.current) {
          clearTimeout(walkTimeoutRef.current);
        }
      };
    }
  }, [state.isWalking, state.targetLocation]);

  // Handle brief actions (success/error) - return to thinking after
  useEffect(() => {
    if (state.currentAction === 'celebrating' || state.currentAction === 'frustrated') {
      briefActionTimeoutRef.current = setTimeout(() => {
        // After brief action, go back to thinking/idle state
        dispatch({ type: 'PROCESS_QUEUED_STATE' });
      }, BRIEF_ACTION_DURATION);

      return () => {
        if (briefActionTimeoutRef.current) {
          clearTimeout(briefActionTimeoutRef.current);
        }
      };
    }
  }, [state.currentAction]);

  // Process queued state when not walking
  useEffect(() => {
    if (!state.isWalking && state.queuedState) {
      dispatch({ type: 'PROCESS_QUEUED_STATE' });
    }
  }, [state.isWalking, state.queuedState]);

  const handleEvent = useCallback((event: AnimationEvent) => {
    const newState = event.animation;

    if (state.isWalking) {
      // Queue the new state to process after walking completes
      dispatch({ type: 'QUEUE_STATE', state: newState });
    } else {
      // Process immediately
      dispatch({ type: 'SET_ANIMATION_STATE', state: newState });
    }
  }, [state.isWalking]);

  return {
    state,
    handleEvent,
  };
}
