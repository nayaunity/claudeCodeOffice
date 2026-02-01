// Animation states from the server
export type AnimationState =
  | 'idle'
  | 'thinking'
  | 'typing'
  | 'reading'
  | 'searching'
  | 'terminal'
  | 'browsing'
  | 'delegating'
  | 'waiting'
  | 'success'
  | 'error'
  | 'entering'
  | 'leaving';

// Locations in the office
export type Location = 'door' | 'desk' | 'whiteboard' | 'coffee';

// Character actions at each location
export type CharacterAction =
  | 'walking'
  | 'typing'
  | 'typing-green'  // terminal with green glow
  | 'reading'
  | 'searching'
  | 'scrolling'
  | 'thinking'
  | 'waiting'
  | 'celebrating'
  | 'frustrated'
  | 'phone'
  | 'coffee-sip'
  | 'idle';

// Event from the WebSocket server
export interface AnimationEvent {
  type: 'activity' | 'state_change';
  animation: AnimationState;
  tool?: string;
  description?: string;
  timestamp: number;
  sessionId?: string;
}

// Character state
export interface CharacterState {
  currentLocation: Location;
  targetLocation: Location | null;
  currentAction: CharacterAction;
  isWalking: boolean;
  animationState: AnimationState;
  queuedState: AnimationState | null;
}

// Position coordinates
export interface Position {
  x: number;
  y: number;
}

// Location definitions with positions
export interface LocationDef {
  position: Position;
  name: string;
}
