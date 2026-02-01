// Programmatic Pixel Art Sprites for Claude Code Office
// 16x16 base resolution, scaled up for display

// Color palette - warm, cozy office aesthetic
export const PALETTE = {
  // Character colors - African American skin tones
  skin: '#8B5A2B',
  skinShadow: '#6B4423',
  hair: '#5C4033',
  hairHighlight: '#7A5A45',
  shirt: '#6B8E9F',      // Claude blue-grey
  shirtShadow: '#4A6A7A',
  pants: '#3D3D3D',
  pantsShadow: '#2A2A2A',
  shoes: '#2D2D2D',

  // Office furniture
  deskTop: '#C4A574',
  deskShadow: '#8B7355',
  deskLeg: '#8B6914',
  chair: '#4A4A4A',
  chairCushion: '#6B8E9F',
  monitor: '#2D2D2D',
  monitorScreen: '#1A1A2E',
  monitorScreenOn: '#0D7377',
  keyboard: '#3D3D3D',

  // Room
  floor: '#E8DCC4',
  floorShadow: '#D4C4A8',
  wall: '#F5F0E6',
  wallAccent: '#E8E0D0',

  // Props
  whiteboard: '#FFFFFF',
  whiteboardFrame: '#8B8B8B',
  plant: '#4A7C4E',
  plantDark: '#2D5A30',
  pot: '#C67B4E',
  potShadow: '#8B5A3C',
  coffee: '#6F4E37',
  mug: '#FFFFFF',
  mugHandle: '#E8E8E8',

  // Effects
  sparkle: '#FFD700',
  frustration: '#FF6B6B',
  thought: '#87CEEB',

  // Helper character (subagent) - orange accent
  helper: '#FF8C42',
  helperShadow: '#CC6B2E',
};

// Each sprite is a 2D array where each string is a color key from PALETTE or '' for transparent
// Format: 16x16 or 16x24 (for taller characters)

export type PixelGrid = (keyof typeof PALETTE | '')[][];

// =============================================================================
// CHARACTER SPRITES - Claude (main character)
// =============================================================================

// Base character facing down (front view) - 16x24
export const CLAUDE_IDLE_DOWN: PixelGrid = [
  // Row 0-3: Head
  ['','','','','','hair','hair','hair','hair','hair','hair','','','','',''],
  ['','','','','hair','hair','hair','hair','hair','hair','hair','hair','','','',''],
  ['','','','hair','hair','skin','skin','skin','skin','skin','skin','hair','hair','','',''],
  ['','','','hair','skin','skin','skin','skin','skin','skin','skin','skin','hair','','',''],
  // Row 4-7: Face
  ['','','','hair','skin','','skin','skin','skin','skin','','skin','hair','','',''],
  ['','','','hair','skin','skin','skin','skin','skin','skin','skin','skin','hair','','',''],
  ['','','','','skin','skin','skin','skinShadow','skinShadow','skin','skin','skin','','','',''],
  ['','','','','','skin','skin','skin','skin','skin','skin','','','','',''],
  // Row 8-11: Torso
  ['','','','','shirt','shirt','shirt','shirt','shirt','shirt','shirt','shirt','','','',''],
  ['','','','shirt','shirt','shirt','shirt','shirt','shirt','shirt','shirt','shirt','shirt','','',''],
  ['','','','shirt','shirt','shirt','shirt','shirt','shirt','shirt','shirt','shirt','shirt','','',''],
  ['','','','','shirt','shirtShadow','shirt','shirt','shirt','shirt','shirtShadow','shirt','','','',''],
  // Row 12-15: Lower torso
  ['','','','','shirt','shirtShadow','shirt','shirt','shirt','shirt','shirtShadow','shirt','','','',''],
  ['','','','','','pants','pants','pants','pants','pants','pants','','','','',''],
  ['','','','','','pants','pants','pants','pants','pants','pants','','','','',''],
  ['','','','','pants','pants','pants','','','pants','pants','pants','','','',''],
  // Row 16-19: Legs
  ['','','','','pants','pants','pants','','','pants','pants','pants','','','',''],
  ['','','','','pants','pants','','','','','pants','pants','','','',''],
  ['','','','','pants','pants','','','','','pants','pants','','','',''],
  ['','','','','pantsShadow','pantsShadow','','','','','pantsShadow','pantsShadow','','','',''],
  // Row 20-23: Feet
  ['','','','','shoes','shoes','','','','','shoes','shoes','','','',''],
  ['','','','shoes','shoes','shoes','','','','','shoes','shoes','shoes','','',''],
  ['','','','shoes','shoes','shoes','','','','','shoes','shoes','shoes','','',''],
  ['','','','','','','','','','','','','','','',''],
];

// Typing animation frames (sitting, hands moving)
export const CLAUDE_TYPING_1: PixelGrid = [
  // Sitting character, arms extended to keyboard
  ['','','','','','hair','hair','hair','hair','hair','hair','','','','',''],
  ['','','','','hair','hair','hair','hair','hair','hair','hair','hair','','','',''],
  ['','','','hair','hair','skin','skin','skin','skin','skin','skin','hair','hair','','',''],
  ['','','','hair','skin','skin','skin','skin','skin','skin','skin','skin','hair','','',''],
  ['','','','hair','skin','','skin','skin','skin','skin','','skin','hair','','',''],
  ['','','','hair','skin','skin','skin','skin','skin','skin','skin','skin','hair','','',''],
  ['','','','','skin','skin','skin','skinShadow','skinShadow','skin','skin','skin','','','',''],
  ['','','','','','skin','skin','skin','skin','skin','skin','','','','',''],
  ['','','','','shirt','shirt','shirt','shirt','shirt','shirt','shirt','shirt','','','',''],
  ['','','','shirt','shirt','shirt','shirt','shirt','shirt','shirt','shirt','shirt','shirt','','',''],
  ['','','skin','shirt','shirt','shirt','shirt','shirt','shirt','shirt','shirt','shirt','shirt','skin','',''],
  ['','skin','skin','','shirt','shirtShadow','shirt','shirt','shirt','shirt','shirtShadow','shirt','','skin','skin',''],
  ['','','skin','','shirt','shirtShadow','shirt','shirt','shirt','shirt','shirtShadow','shirt','','skin','',''],
  ['','','','','','chair','chair','chair','chair','chair','chair','','','','',''],
  ['','','','','chair','chairCushion','chairCushion','chairCushion','chairCushion','chairCushion','chairCushion','chair','','','',''],
  ['','','','','chair','chairCushion','chairCushion','chairCushion','chairCushion','chairCushion','chairCushion','chair','','','',''],
  ['','','','','chair','chair','','','','','chair','chair','','','',''],
  ['','','','','chair','chair','','','','','chair','chair','','','',''],
  ['','','','','','','','','','','','','','','',''],
  ['','','','','','','','','','','','','','','',''],
  ['','','','','','','','','','','','','','','',''],
  ['','','','','','','','','','','','','','','',''],
  ['','','','','','','','','','','','','','','',''],
  ['','','','','','','','','','','','','','','',''],
];

export const CLAUDE_TYPING_2: PixelGrid = [
  // Typing frame 2 - hands in different position
  ['','','','','','hair','hair','hair','hair','hair','hair','','','','',''],
  ['','','','','hair','hair','hair','hair','hair','hair','hair','hair','','','',''],
  ['','','','hair','hair','skin','skin','skin','skin','skin','skin','hair','hair','','',''],
  ['','','','hair','skin','skin','skin','skin','skin','skin','skin','skin','hair','','',''],
  ['','','','hair','skin','','skin','skin','skin','skin','','skin','hair','','',''],
  ['','','','hair','skin','skin','skin','skin','skin','skin','skin','skin','hair','','',''],
  ['','','','','skin','skin','skin','skinShadow','skinShadow','skin','skin','skin','','','',''],
  ['','','','','','skin','skin','skin','skin','skin','skin','','','','',''],
  ['','','','','shirt','shirt','shirt','shirt','shirt','shirt','shirt','shirt','','','',''],
  ['','','','shirt','shirt','shirt','shirt','shirt','shirt','shirt','shirt','shirt','shirt','','',''],
  ['','skin','skin','shirt','shirt','shirt','shirt','shirt','shirt','shirt','shirt','shirt','shirt','skin','skin',''],
  ['','','skin','skin','shirt','shirtShadow','shirt','shirt','shirt','shirt','shirtShadow','shirt','skin','skin','',''],
  ['','','','skin','shirt','shirtShadow','shirt','shirt','shirt','shirt','shirtShadow','shirt','skin','','',''],
  ['','','','','','chair','chair','chair','chair','chair','chair','','','','',''],
  ['','','','','chair','chairCushion','chairCushion','chairCushion','chairCushion','chairCushion','chairCushion','chair','','','',''],
  ['','','','','chair','chairCushion','chairCushion','chairCushion','chairCushion','chairCushion','chairCushion','chair','','','',''],
  ['','','','','chair','chair','','','','','chair','chair','','','',''],
  ['','','','','chair','chair','','','','','chair','chair','','','',''],
  ['','','','','','','','','','','','','','','',''],
  ['','','','','','','','','','','','','','','',''],
  ['','','','','','','','','','','','','','','',''],
  ['','','','','','','','','','','','','','','',''],
  ['','','','','','','','','','','','','','','',''],
  ['','','','','','','','','','','','','','','',''],
];

// Reading - character looking at something, hand on chin
export const CLAUDE_READING: PixelGrid = [
  ['','','','','','hair','hair','hair','hair','hair','hair','','','','',''],
  ['','','','','hair','hair','hair','hair','hair','hair','hair','hair','','','',''],
  ['','','','hair','hair','skin','skin','skin','skin','skin','skin','hair','hair','','',''],
  ['','','','hair','skin','skin','skin','skin','skin','skin','skin','skin','hair','','',''],
  ['','','','hair','skin','skinShadow','skin','skin','skin','skin','skinShadow','skin','hair','','',''], // squinting
  ['','','','hair','skin','skin','skin','skin','skin','skin','skin','skin','hair','','',''],
  ['','','','','skin','skin','skin','skinShadow','skinShadow','skin','skin','skin','','','',''],
  ['','','','','','skin','skin','skin','skin','skin','skin','skin','','','',''], // hand on chin
  ['','','','','shirt','shirt','shirt','shirt','shirt','shirt','shirt','shirt','skin','','',''],
  ['','','','shirt','shirt','shirt','shirt','shirt','shirt','shirt','shirt','shirt','skin','','',''],
  ['','','','shirt','shirt','shirt','shirt','shirt','shirt','shirt','shirt','shirt','skin','','',''],
  ['','','','','shirt','shirtShadow','shirt','shirt','shirt','shirt','shirtShadow','shirt','','','',''],
  ['','','','','shirt','shirtShadow','shirt','shirt','shirt','shirt','shirtShadow','shirt','','','',''],
  ['','','','','','chair','chair','chair','chair','chair','chair','','','','',''],
  ['','','','','chair','chairCushion','chairCushion','chairCushion','chairCushion','chairCushion','chairCushion','chair','','','',''],
  ['','','','','chair','chairCushion','chairCushion','chairCushion','chairCushion','chairCushion','chairCushion','chair','','','',''],
  ['','','','','chair','chair','','','','','chair','chair','','','',''],
  ['','','','','chair','chair','','','','','chair','chair','','','',''],
  ['','','','','','','','','','','','','','','',''],
  ['','','','','','','','','','','','','','','',''],
  ['','','','','','','','','','','','','','','',''],
  ['','','','','','','','','','','','','','','',''],
  ['','','','','','','','','','','','','','','',''],
  ['','','','','','','','','','','','','','','',''],
];

// Thinking - looking up, thought bubble implied
export const CLAUDE_THINKING: PixelGrid = [
  ['','','','','','hair','hair','hair','hair','hair','hair','','','thought','thought',''],
  ['','','','','hair','hair','hair','hair','hair','hair','hair','hair','','thought','thought','thought'],
  ['','','','hair','hair','skin','skin','skin','skin','skin','skin','hair','hair','','thought',''],
  ['','','','hair','skin','skin','skin','skin','skin','skin','skin','skin','hair','','',''],
  ['','','','hair','skin','skin','skin','skin','skin','skin','skin','skin','hair','','',''], // eyes looking up
  ['','','','hair','skin','','','skin','skin','','','skin','hair','','',''],
  ['','','','','skin','skin','skin','skin','skin','skin','skin','skin','','','',''],
  ['','','','','','skin','skin','skinShadow','skinShadow','skin','skin','','','','',''],
  ['','','','','shirt','shirt','shirt','shirt','shirt','shirt','shirt','shirt','','','',''],
  ['','','','shirt','shirt','shirt','shirt','shirt','shirt','shirt','shirt','shirt','shirt','','',''],
  ['','','','shirt','shirt','shirt','shirt','shirt','shirt','shirt','shirt','shirt','shirt','','',''],
  ['','','','','shirt','shirtShadow','shirt','shirt','shirt','shirt','shirtShadow','shirt','','','',''],
  ['','','','','shirt','shirtShadow','shirt','shirt','shirt','shirt','shirtShadow','shirt','','','',''],
  ['','','','','','chair','chair','chair','chair','chair','chair','','','','',''],
  ['','','','','chair','chairCushion','chairCushion','chairCushion','chairCushion','chairCushion','chairCushion','chair','','','',''],
  ['','','','','chair','chairCushion','chairCushion','chairCushion','chairCushion','chairCushion','chairCushion','chair','','','',''],
  ['','','','','chair','chair','','','','','chair','chair','','','',''],
  ['','','','','chair','chair','','','','','chair','chair','','','',''],
  ['','','','','','','','','','','','','','','',''],
  ['','','','','','','','','','','','','','','',''],
  ['','','','','','','','','','','','','','','',''],
  ['','','','','','','','','','','','','','','',''],
  ['','','','','','','','','','','','','','','',''],
  ['','','','','','','','','','','','','','','',''],
];

// Celebrating - arms up!
export const CLAUDE_CELEBRATING: PixelGrid = [
  ['','','sparkle','','','hair','hair','hair','hair','hair','hair','','','sparkle','',''],
  ['','','','','hair','hair','hair','hair','hair','hair','hair','hair','','','',''],
  ['','','','hair','hair','skin','skin','skin','skin','skin','skin','hair','hair','','',''],
  ['','skin','','hair','skin','skin','skin','skin','skin','skin','skin','skin','hair','','skin',''],
  ['skin','skin','','hair','skin','','skin','skin','skin','skin','','skin','hair','','skin','skin'],
  ['','skin','','hair','skin','skin','skinShadow','skinShadow','skinShadow','skinShadow','skin','skin','hair','','skin',''],
  ['','','','','skin','skin','skin','skin','skin','skin','skin','skin','','','',''],
  ['','','','','','skin','skin','skin','skin','skin','skin','','','','',''],
  ['','','','','shirt','shirt','shirt','shirt','shirt','shirt','shirt','shirt','','','',''],
  ['','','','shirt','shirt','shirt','shirt','shirt','shirt','shirt','shirt','shirt','shirt','','',''],
  ['','','','shirt','shirt','shirt','shirt','shirt','shirt','shirt','shirt','shirt','shirt','','',''],
  ['','','','','shirt','shirtShadow','shirt','shirt','shirt','shirt','shirtShadow','shirt','','','',''],
  ['','','','','shirt','shirtShadow','shirt','shirt','shirt','shirt','shirtShadow','shirt','','','',''],
  ['','','','','','chair','chair','chair','chair','chair','chair','','','','',''],
  ['','','','','chair','chairCushion','chairCushion','chairCushion','chairCushion','chairCushion','chairCushion','chair','','','',''],
  ['','','','','chair','chairCushion','chairCushion','chairCushion','chairCushion','chairCushion','chairCushion','chair','','','',''],
  ['','','','','chair','chair','','','','','chair','chair','','','',''],
  ['','','','','chair','chair','','','','','chair','chair','','','',''],
  ['','','','','','','','','','','','','','','',''],
  ['','','','','','','','','','','','','','','',''],
  ['','','','','','','','','','','','','','','',''],
  ['','','','','','','','','','','','','','','',''],
  ['','','','','','','','','','','','','','','',''],
  ['','','','','','','','','','','','','','','',''],
];

// Frustrated - head down, stress marks
export const CLAUDE_FRUSTRATED: PixelGrid = [
  ['','','','','','','frustration','','','frustration','','','','','',''],
  ['','','','','','hair','hair','hair','hair','hair','hair','','','','',''],
  ['','','','','hair','hair','hair','hair','hair','hair','hair','hair','','','',''],
  ['','','','hair','hair','skin','skin','skin','skin','skin','skin','hair','hair','','',''],
  ['','','','hair','skin','skin','skin','skin','skin','skin','skin','skin','hair','','',''],
  ['','','','hair','skin','skinShadow','skin','skin','skin','skin','skinShadow','skin','hair','','',''], // furrowed brow
  ['','','','hair','skin','skin','skin','skin','skin','skin','skin','skin','hair','','',''],
  ['','','','','skin','skin','skin','skin','skin','skin','skin','skin','','','',''],
  ['','','','','','skin','skinShadow','skinShadow','skinShadow','skinShadow','skin','','','','',''], // frown
  ['','','','','shirt','shirt','shirt','shirt','shirt','shirt','shirt','shirt','','','',''],
  ['','','','shirt','shirt','shirt','shirt','shirt','shirt','shirt','shirt','shirt','shirt','','',''],
  ['','','','shirt','shirt','shirt','shirt','shirt','shirt','shirt','shirt','shirt','shirt','','',''],
  ['','','','','shirt','shirtShadow','shirt','shirt','shirt','shirt','shirtShadow','shirt','','','',''],
  ['','','','','shirt','shirtShadow','shirt','shirt','shirt','shirt','shirtShadow','shirt','','','',''],
  ['','','','','','chair','chair','chair','chair','chair','chair','','','','',''],
  ['','','','','chair','chairCushion','chairCushion','chairCushion','chairCushion','chairCushion','chairCushion','chair','','','',''],
  ['','','','','chair','chairCushion','chairCushion','chairCushion','chairCushion','chairCushion','chairCushion','chair','','','',''],
  ['','','','','chair','chair','','','','','chair','chair','','','',''],
  ['','','','','chair','chair','','','','','chair','chair','','','',''],
  ['','','','','','','','','','','','','','','',''],
  ['','','','','','','','','','','','','','','',''],
  ['','','','','','','','','','','','','','','',''],
  ['','','','','','','','','','','','','','','',''],
  ['','','','','','','','','','','','','','','',''],
];

// Waving - one arm raised waving
export const CLAUDE_WAVING_1: PixelGrid = [
  ['','','','','','hair','hair','hair','hair','hair','hair','','','','',''],
  ['','','','','hair','hair','hair','hair','hair','hair','hair','hair','','skin','',''],
  ['','','','hair','hair','skin','skin','skin','skin','skin','skin','hair','hair','skin','skin',''],
  ['','','','hair','skin','skin','skin','skin','skin','skin','skin','skin','hair','skin','',''],
  ['','','','hair','skin','','skin','skin','skin','skin','','skin','hair','','',''],
  ['','','','hair','skin','skin','skinShadow','skinShadow','skinShadow','skinShadow','skin','skin','hair','','',''],
  ['','','','','skin','skin','skin','skin','skin','skin','skin','skin','','','',''],
  ['','','','','','skin','skin','skin','skin','skin','skin','','','','',''],
  ['','','','','shirt','shirt','shirt','shirt','shirt','shirt','shirt','shirt','skin','','',''],
  ['','','','shirt','shirt','shirt','shirt','shirt','shirt','shirt','shirt','shirt','skin','','',''],
  ['','','','shirt','shirt','shirt','shirt','shirt','shirt','shirt','shirt','shirt','skin','','',''],
  ['','','','','shirt','shirtShadow','shirt','shirt','shirt','shirt','shirtShadow','skin','','','',''],
  ['','','','','shirt','shirtShadow','shirt','shirt','shirt','shirt','shirtShadow','shirt','','','',''],
  ['','','','','','pants','pants','pants','pants','pants','pants','','','','',''],
  ['','','','','','pants','pants','pants','pants','pants','pants','','','','',''],
  ['','','','','pants','pants','pants','','','pants','pants','pants','','','',''],
  ['','','','','pants','pants','pants','','','pants','pants','pants','','','',''],
  ['','','','','pants','pants','','','','','pants','pants','','','',''],
  ['','','','','pants','pants','','','','','pants','pants','','','',''],
  ['','','','','pantsShadow','pantsShadow','','','','','pantsShadow','pantsShadow','','','',''],
  ['','','','','shoes','shoes','','','','','shoes','shoes','','','',''],
  ['','','','shoes','shoes','shoes','','','','','shoes','shoes','shoes','','',''],
  ['','','','shoes','shoes','shoes','','','','','shoes','shoes','shoes','','',''],
  ['','','','','','','','','','','','','','','',''],
];

export const CLAUDE_WAVING_2: PixelGrid = [
  ['','','','','','hair','hair','hair','hair','hair','hair','','','skin','skin',''],
  ['','','','','hair','hair','hair','hair','hair','hair','hair','hair','','skin','',''],
  ['','','','hair','hair','skin','skin','skin','skin','skin','skin','hair','hair','','',''],
  ['','','','hair','skin','skin','skin','skin','skin','skin','skin','skin','hair','','',''],
  ['','','','hair','skin','','skin','skin','skin','skin','','skin','hair','','',''],
  ['','','','hair','skin','skin','skinShadow','skinShadow','skinShadow','skinShadow','skin','skin','hair','','',''],
  ['','','','','skin','skin','skin','skin','skin','skin','skin','skin','','','',''],
  ['','','','','','skin','skin','skin','skin','skin','skin','','','','',''],
  ['','','','','shirt','shirt','shirt','shirt','shirt','shirt','shirt','shirt','skin','','',''],
  ['','','','shirt','shirt','shirt','shirt','shirt','shirt','shirt','shirt','shirt','skin','','',''],
  ['','','','shirt','shirt','shirt','shirt','shirt','shirt','shirt','shirt','shirt','skin','','',''],
  ['','','','','shirt','shirtShadow','shirt','shirt','shirt','shirt','shirtShadow','skin','','','',''],
  ['','','','','shirt','shirtShadow','shirt','shirt','shirt','shirt','shirtShadow','shirt','','','',''],
  ['','','','','','pants','pants','pants','pants','pants','pants','','','','',''],
  ['','','','','','pants','pants','pants','pants','pants','pants','','','','',''],
  ['','','','','pants','pants','pants','','','pants','pants','pants','','','',''],
  ['','','','','pants','pants','pants','','','pants','pants','pants','','','',''],
  ['','','','','pants','pants','','','','','pants','pants','','','',''],
  ['','','','','pants','pants','','','','','pants','pants','','','',''],
  ['','','','','pantsShadow','pantsShadow','','','','','pantsShadow','pantsShadow','','','',''],
  ['','','','','shoes','shoes','','','','','shoes','shoes','','','',''],
  ['','','','shoes','shoes','shoes','','','','','shoes','shoes','shoes','','',''],
  ['','','','shoes','shoes','shoes','','','','','shoes','shoes','shoes','','',''],
  ['','','','','','','','','','','','','','','',''],
];

// =============================================================================
// HELPER CHARACTER (Subagent) - Orange accented
// =============================================================================

export const HELPER_IDLE: PixelGrid = [
  ['','','','','','helper','helper','helper','helper','helper','helper','','','','',''],
  ['','','','','helper','helper','helper','helper','helper','helper','helper','helper','','','',''],
  ['','','','helper','helper','skin','skin','skin','skin','skin','skin','helper','helper','','',''],
  ['','','','helper','skin','skin','skin','skin','skin','skin','skin','skin','helper','','',''],
  ['','','','helper','skin','','skin','skin','skin','skin','','skin','helper','','',''],
  ['','','','helper','skin','skin','skin','skin','skin','skin','skin','skin','helper','','',''],
  ['','','','','skin','skin','skin','skinShadow','skinShadow','skin','skin','skin','','','',''],
  ['','','','','','skin','skin','skin','skin','skin','skin','','','','',''],
  ['','','','','helper','helper','helper','helper','helper','helper','helper','helper','','','',''],
  ['','','','helper','helper','helper','helper','helper','helper','helper','helper','helper','helper','','',''],
  ['','','','helper','helper','helper','helper','helper','helper','helper','helper','helper','helper','','',''],
  ['','','','','helper','helperShadow','helper','helper','helper','helper','helperShadow','helper','','','',''],
  ['','','','','helper','helperShadow','helper','helper','helper','helper','helperShadow','helper','','','',''],
  ['','','','','','pants','pants','pants','pants','pants','pants','','','','',''],
  ['','','','','','pants','pants','pants','pants','pants','pants','','','','',''],
  ['','','','','pants','pants','pants','','','pants','pants','pants','','','',''],
  ['','','','','pants','pants','pants','','','pants','pants','pants','','','',''],
  ['','','','','pants','pants','','','','','pants','pants','','','',''],
  ['','','','','pants','pants','','','','','pants','pants','','','',''],
  ['','','','','pantsShadow','pantsShadow','','','','','pantsShadow','pantsShadow','','','',''],
  ['','','','','shoes','shoes','','','','','shoes','shoes','','','',''],
  ['','','','shoes','shoes','shoes','','','','','shoes','shoes','shoes','','',''],
  ['','','','shoes','shoes','shoes','','','','','shoes','shoes','shoes','','',''],
  ['','','','','','','','','','','','','','','',''],
];

// =============================================================================
// OFFICE FURNITURE
// =============================================================================

// Desk with monitor - 32x16
export const DESK: PixelGrid = [
  ['','','','','','','','','monitor','monitor','monitor','monitor','monitor','monitor','monitor','monitor','monitor','monitor','monitor','monitor','monitor','monitor','monitor','monitor','','','','','','','',''],
  ['','','','','','','','','monitor','monitorScreen','monitorScreen','monitorScreen','monitorScreen','monitorScreen','monitorScreen','monitorScreen','monitorScreen','monitorScreen','monitorScreen','monitorScreen','monitorScreen','monitorScreen','monitorScreen','monitor','','','','','','','',''],
  ['','','','','','','','','monitor','monitorScreen','monitorScreenOn','monitorScreenOn','monitorScreenOn','monitorScreenOn','monitorScreenOn','monitorScreenOn','monitorScreenOn','monitorScreenOn','monitorScreenOn','monitorScreenOn','monitorScreenOn','monitorScreenOn','monitorScreen','monitor','','','','','','','',''],
  ['','','','','','','','','monitor','monitorScreen','monitorScreenOn','monitorScreenOn','monitorScreenOn','monitorScreenOn','monitorScreenOn','monitorScreenOn','monitorScreenOn','monitorScreenOn','monitorScreenOn','monitorScreenOn','monitorScreenOn','monitorScreenOn','monitorScreen','monitor','','','','','','','',''],
  ['','','','','','','','','monitor','monitorScreen','monitorScreenOn','monitorScreenOn','monitorScreenOn','monitorScreenOn','monitorScreenOn','monitorScreenOn','monitorScreenOn','monitorScreenOn','monitorScreenOn','monitorScreenOn','monitorScreenOn','monitorScreenOn','monitorScreen','monitor','','','','','','','',''],
  ['','','','','','','','','monitor','monitorScreen','monitorScreen','monitorScreen','monitorScreen','monitorScreen','monitorScreen','monitorScreen','monitorScreen','monitorScreen','monitorScreen','monitorScreen','monitorScreen','monitorScreen','monitorScreen','monitor','','','','','','','',''],
  ['','','','','','','','','','','','','','','monitor','monitor','monitor','monitor','','','','','','','','','','','','','',''],
  ['','','','','','','','','','','','','','','','monitor','monitor','','','','','','','','','','','','','','',''],
  ['deskTop','deskTop','deskTop','deskTop','deskTop','deskTop','deskTop','deskTop','deskTop','deskTop','deskTop','deskTop','deskTop','deskTop','deskTop','deskTop','deskTop','deskTop','deskTop','deskTop','deskTop','deskTop','deskTop','deskTop','deskTop','deskTop','deskTop','deskTop','deskTop','deskTop','deskTop','deskTop'],
  ['deskTop','deskTop','deskTop','deskTop','deskTop','keyboard','keyboard','keyboard','keyboard','keyboard','keyboard','keyboard','keyboard','deskTop','deskTop','deskTop','deskTop','deskTop','mug','mug','mug','deskTop','deskTop','deskTop','deskTop','deskTop','deskTop','deskTop','deskTop','deskTop','deskTop','deskTop'],
  ['deskShadow','deskShadow','deskShadow','deskShadow','deskShadow','deskShadow','deskShadow','deskShadow','deskShadow','deskShadow','deskShadow','deskShadow','deskShadow','deskShadow','deskShadow','deskShadow','deskShadow','deskShadow','mug','coffee','mugHandle','deskShadow','deskShadow','deskShadow','deskShadow','deskShadow','deskShadow','deskShadow','deskShadow','deskShadow','deskShadow','deskShadow'],
  ['','','deskLeg','deskLeg','','','','','','','','','','','','','','','','','','','','','','','','','','deskLeg','deskLeg',''],
  ['','','deskLeg','deskLeg','','','','','','','','','','','','','','','','','','','','','','','','','','deskLeg','deskLeg',''],
  ['','','deskLeg','deskLeg','','','','','','','','','','','','','','','','','','','','','','','','','','deskLeg','deskLeg',''],
  ['','','deskLeg','deskLeg','','','','','','','','','','','','','','','','','','','','','','','','','','deskLeg','deskLeg',''],
  ['','','deskLeg','deskLeg','','','','','','','','','','','','','','','','','','','','','','','','','','deskLeg','deskLeg',''],
];

// Whiteboard - 24x16
export const WHITEBOARD: PixelGrid = [
  ['whiteboardFrame','whiteboardFrame','whiteboardFrame','whiteboardFrame','whiteboardFrame','whiteboardFrame','whiteboardFrame','whiteboardFrame','whiteboardFrame','whiteboardFrame','whiteboardFrame','whiteboardFrame','whiteboardFrame','whiteboardFrame','whiteboardFrame','whiteboardFrame','whiteboardFrame','whiteboardFrame','whiteboardFrame','whiteboardFrame','whiteboardFrame','whiteboardFrame','whiteboardFrame','whiteboardFrame'],
  ['whiteboardFrame','whiteboard','whiteboard','whiteboard','whiteboard','whiteboard','whiteboard','whiteboard','whiteboard','whiteboard','whiteboard','whiteboard','whiteboard','whiteboard','whiteboard','whiteboard','whiteboard','whiteboard','whiteboard','whiteboard','whiteboard','whiteboard','whiteboard','whiteboardFrame'],
  ['whiteboardFrame','whiteboard','whiteboard','whiteboard','whiteboard','whiteboard','whiteboard','whiteboard','whiteboard','whiteboard','whiteboard','whiteboard','whiteboard','whiteboard','whiteboard','whiteboard','whiteboard','whiteboard','whiteboard','whiteboard','whiteboard','whiteboard','whiteboard','whiteboardFrame'],
  ['whiteboardFrame','whiteboard','whiteboard','whiteboard','whiteboard','whiteboard','whiteboard','whiteboard','whiteboard','whiteboard','whiteboard','whiteboard','whiteboard','whiteboard','whiteboard','whiteboard','whiteboard','whiteboard','whiteboard','whiteboard','whiteboard','whiteboard','whiteboard','whiteboardFrame'],
  ['whiteboardFrame','whiteboard','whiteboard','whiteboard','whiteboard','whiteboard','whiteboard','whiteboard','whiteboard','whiteboard','whiteboard','whiteboard','whiteboard','whiteboard','whiteboard','whiteboard','whiteboard','whiteboard','whiteboard','whiteboard','whiteboard','whiteboard','whiteboard','whiteboardFrame'],
  ['whiteboardFrame','whiteboard','whiteboard','whiteboard','whiteboard','whiteboard','whiteboard','whiteboard','whiteboard','whiteboard','whiteboard','whiteboard','whiteboard','whiteboard','whiteboard','whiteboard','whiteboard','whiteboard','whiteboard','whiteboard','whiteboard','whiteboard','whiteboard','whiteboardFrame'],
  ['whiteboardFrame','whiteboard','whiteboard','whiteboard','whiteboard','whiteboard','whiteboard','whiteboard','whiteboard','whiteboard','whiteboard','whiteboard','whiteboard','whiteboard','whiteboard','whiteboard','whiteboard','whiteboard','whiteboard','whiteboard','whiteboard','whiteboard','whiteboard','whiteboardFrame'],
  ['whiteboardFrame','whiteboard','whiteboard','whiteboard','whiteboard','whiteboard','whiteboard','whiteboard','whiteboard','whiteboard','whiteboard','whiteboard','whiteboard','whiteboard','whiteboard','whiteboard','whiteboard','whiteboard','whiteboard','whiteboard','whiteboard','whiteboard','whiteboard','whiteboardFrame'],
  ['whiteboardFrame','whiteboard','whiteboard','whiteboard','whiteboard','whiteboard','whiteboard','whiteboard','whiteboard','whiteboard','whiteboard','whiteboard','whiteboard','whiteboard','whiteboard','whiteboard','whiteboard','whiteboard','whiteboard','whiteboard','whiteboard','whiteboard','whiteboard','whiteboardFrame'],
  ['whiteboardFrame','whiteboard','whiteboard','whiteboard','whiteboard','whiteboard','whiteboard','whiteboard','whiteboard','whiteboard','whiteboard','whiteboard','whiteboard','whiteboard','whiteboard','whiteboard','whiteboard','whiteboard','whiteboard','whiteboard','whiteboard','whiteboard','whiteboard','whiteboardFrame'],
  ['whiteboardFrame','whiteboardFrame','whiteboardFrame','whiteboardFrame','whiteboardFrame','whiteboardFrame','whiteboardFrame','whiteboardFrame','whiteboardFrame','whiteboardFrame','whiteboardFrame','whiteboardFrame','whiteboardFrame','whiteboardFrame','whiteboardFrame','whiteboardFrame','whiteboardFrame','whiteboardFrame','whiteboardFrame','whiteboardFrame','whiteboardFrame','whiteboardFrame','whiteboardFrame','whiteboardFrame'],
  ['','','','','','','','','','','','whiteboardFrame','whiteboardFrame','','','','','','','','','','',''],
  ['','','','','','','','','','','','whiteboardFrame','whiteboardFrame','','','','','','','','','','',''],
  ['','','','','','','','','','','','whiteboardFrame','whiteboardFrame','','','','','','','','','','',''],
  ['','','','','','','','','','','','whiteboardFrame','whiteboardFrame','','','','','','','','','','',''],
  ['','','','','','','','','','','','whiteboardFrame','whiteboardFrame','','','','','','','','','','',''],
];

// Plant in pot - 8x12
export const PLANT: PixelGrid = [
  ['','','','plant','plant','','',''],
  ['','','plant','plant','plant','plant','',''],
  ['','plant','plant','plantDark','plantDark','plant','plant',''],
  ['','plant','plantDark','plant','plant','plantDark','plant',''],
  ['plant','plant','plant','plantDark','plantDark','plant','plant','plant'],
  ['plant','plantDark','plant','plant','plant','plant','plantDark','plant'],
  ['','plant','plant','plantDark','plantDark','plant','plant',''],
  ['','','plant','plant','plant','plant','',''],
  ['','','','pot','pot','','',''],
  ['','','pot','pot','pot','pot','',''],
  ['','','pot','potShadow','potShadow','pot','',''],
  ['','','','pot','pot','','',''],
];

// Coffee machine - 8x12
export const COFFEE_MACHINE: PixelGrid = [
  ['','','monitor','monitor','monitor','monitor','',''],
  ['','monitor','monitor','monitor','monitor','monitor','monitor',''],
  ['','monitor','monitorScreen','monitorScreen','monitorScreen','monitorScreen','monitor',''],
  ['','monitor','monitorScreen','monitorScreenOn','monitorScreenOn','monitorScreen','monitor',''],
  ['','monitor','monitor','monitor','monitor','monitor','monitor',''],
  ['','monitor','','','','','monitor',''],
  ['','monitor','','mug','mug','','monitor',''],
  ['','monitor','','mug','coffee','','monitor',''],
  ['','monitor','monitor','monitor','monitor','monitor','monitor',''],
  ['','','monitor','monitor','monitor','monitor','',''],
  ['','','','monitor','monitor','','',''],
  ['','','','monitor','monitor','','',''],
];

// =============================================================================
// SPRITE COLLECTIONS FOR ANIMATIONS
// =============================================================================

export const SPRITES = {
  claude: {
    idle: CLAUDE_IDLE_DOWN,
    typing: [CLAUDE_TYPING_1, CLAUDE_TYPING_2],
    reading: CLAUDE_READING,
    thinking: CLAUDE_THINKING,
    celebrating: CLAUDE_CELEBRATING,
    frustrated: CLAUDE_FRUSTRATED,
    waving: [CLAUDE_WAVING_1, CLAUDE_WAVING_2],
  },
  helper: {
    idle: HELPER_IDLE,
  },
  furniture: {
    desk: DESK,
    whiteboard: WHITEBOARD,
    plant: PLANT,
    coffeeMachine: COFFEE_MACHINE,
  },
};

export default SPRITES;
