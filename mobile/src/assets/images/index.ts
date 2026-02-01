// Image Asset Configuration for Claude HQ
// Using LimeZu Modern Office + Modern Interiors packs

// Sprite sheet configuration types
export interface SpriteFrame {
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface AnimationConfig {
  frames: SpriteFrame[];
  frameRate: number;
  loop: boolean;
}

// Direction type for character facing
export type Direction = 'down' | 'left' | 'right' | 'up';

// LimeZu character sheets have 24 frames: 6 frames per direction
// Layout: down (0-5), left (6-11), right (12-17), up (18-23)
export const DIRECTION_OFFSETS: Record<Direction, number> = {
  down: 0,
  left: 6,
  right: 12,
  up: 18,
};

export const FRAMES_PER_DIRECTION = 6;

// Enable image-based rendering
export const IMAGES_AVAILABLE = true; // Character uses LimeZu Amelia sprites
export const FURNITURE_SPRITES_ENABLED = false; // Use clean Rect-based furniture

// Asset paths using require for React Native
export const ASSET_PATHS = {
  // Character sprite sheets (Amelia - 16x32 frames)
  characterIdle: require('./characters/amelia_idle.png'),
  characterRun: require('./characters/amelia_run.png'),
  characterSit: require('./characters/amelia_sit.png'),
  characterSit2: require('./characters/amelia_sit2.png'),
  characterSit3: require('./characters/amelia_sit3.png'),
  characterPhone: require('./characters/amelia_phone.png'),

  // Office furniture (32x32 tiles)
  furniture: require('./furniture.png'),

  // Room tiles (32x32)
  tiles: require('./tiles.png'),
};

// Sprite dimensions
export const SPRITE_SIZES = {
  character: {
    width: 16,
    height: 32,
  },
  tile: {
    width: 32,
    height: 32,
  },
};

// Sheet dimensions
export const SHEET_SIZES = {
  characterIdle: { width: 384, height: 32 },    // 24 frames x 1 row (6 per direction)
  characterRun: { width: 384, height: 32 },     // 24 frames x 1 row
  characterSit: { width: 384, height: 32 },     // 24 frames x 1 row
  characterSit2: { width: 384, height: 32 },    // 24 frames x 1 row
  characterSit3: { width: 192, height: 32 },    // 12 frames x 1 row
  characterPhone: { width: 144, height: 32 },   // 9 frames x 1 row
  furniture: { width: 512, height: 1696 },
  tiles: { width: 512, height: 448 },
};

// Helper to generate frames for a direction
function generateDirectionalFrames(direction: Direction, frameCount: number = 6): SpriteFrame[] {
  const startFrame = DIRECTION_OFFSETS[direction];
  return Array.from({ length: frameCount }, (_, i) => ({
    x: (startFrame + i) * 16,
    y: 0,
    width: 16,
    height: 32,
  }));
}

// Character animation definitions with directional support
// Each animation has a default direction, but can be overridden
export interface DirectionalAnimationConfig {
  sheet: string;
  defaultDirection: Direction;
  frameRate: number;
  loop: boolean;
  framesPerDirection?: number; // Defaults to 6
}

export const CHARACTER_ANIMATION_CONFIGS: Record<string, DirectionalAnimationConfig> = {
  idle: {
    sheet: 'characterIdle',
    defaultDirection: 'down',
    frameRate: 4,
    loop: true,
  },
  typing: {
    sheet: 'characterSit',
    defaultDirection: 'down',
    frameRate: 4,
    loop: true,
  },
  'typing-green': {
    sheet: 'characterSit',
    defaultDirection: 'down',
    frameRate: 4,
    loop: true,
  },
  reading: {
    sheet: 'characterSit2',
    defaultDirection: 'down',
    frameRate: 2,
    loop: true,
  },
  searching: {
    sheet: 'characterSit',
    defaultDirection: 'left',
    frameRate: 3,
    loop: true,
  },
  scrolling: {
    sheet: 'characterSit3',
    defaultDirection: 'down',
    frameRate: 4,
    loop: true,
    framesPerDirection: 3, // sit3 has fewer frames
  },
  walking: {
    sheet: 'characterRun',
    defaultDirection: 'down',
    frameRate: 10,
    loop: true,
  },
  thinking: {
    sheet: 'characterIdle',
    defaultDirection: 'up', // Facing whiteboard
    frameRate: 3,
    loop: true,
  },
  phone: {
    sheet: 'characterPhone',
    defaultDirection: 'down',
    frameRate: 4,
    loop: true,
    framesPerDirection: 4, // phone has 9 frames total
  },
  waiting: {
    sheet: 'characterIdle',
    defaultDirection: 'down',
    frameRate: 2, // Slower for waiting
    loop: true,
  },
  'coffee-sip': {
    sheet: 'characterIdle',
    defaultDirection: 'right', // Facing water cooler
    frameRate: 3,
    loop: true,
  },
  celebrating: {
    sheet: 'characterIdle',
    defaultDirection: 'down',
    frameRate: 8, // Faster for celebration
    loop: false,
  },
  frustrated: {
    sheet: 'characterSit',
    defaultDirection: 'down',
    frameRate: 10,
    loop: true,
  },
};

// Legacy format for backwards compatibility
export const CHARACTER_ANIMATIONS = {
  idle: {
    sheet: 'characterIdle',
    frames: generateDirectionalFrames('down'),
    frameRate: 4,
    loop: true,
  },
  typing: {
    sheet: 'characterSit',
    frames: generateDirectionalFrames('down'),
    frameRate: 4,
    loop: true,
  },
  walking: {
    sheet: 'characterRun',
    frames: generateDirectionalFrames('down'),
    frameRate: 10,
    loop: true,
  },
  phone: {
    sheet: 'characterPhone',
    frames: Array.from({ length: 4 }, (_, i) => ({
      x: i * 16,
      y: 0,
      width: 16,
      height: 32,
    })),
    frameRate: 4,
    loop: true,
  },
  reading: {
    sheet: 'characterSit2',
    frames: generateDirectionalFrames('down'),
    frameRate: 2,
    loop: true,
  },
};

// Furniture sprite positions in furniture.png (LimeZu Modern Office 32x32)
// Sheet is 512x1696 pixels, 32x32 grid
export const FURNITURE_SPRITES = {
  // === DESKS (tan/wooden) ===
  // Row around y=320-384 has nice desk tops
  desk2Tile: { x: 128, y: 288, width: 64, height: 32 },      // 2-tile wooden desk
  desk3Tile: { x: 192, y: 288, width: 96, height: 32 },      // 3-tile wooden desk

  // Desk with legs (full workstation view)
  deskFront: { x: 0, y: 480, width: 64, height: 64 },        // Front-facing desk
  deskSide: { x: 64, y: 480, width: 64, height: 64 },        // Side-facing desk

  // === CHAIRS ===
  // Blue office chairs - row 4 (y=128)
  chairBlueFront: { x: 0, y: 128, width: 32, height: 32 },   // Front-facing
  chairBlueBack: { x: 32, y: 128, width: 32, height: 32 },   // Back-facing
  chairBlueLeft: { x: 64, y: 128, width: 32, height: 32 },   // Left-facing
  chairBlueRight: { x: 96, y: 128, width: 32, height: 32 },  // Right-facing

  // Orange/gaming chairs
  chairOrangeFront: { x: 128, y: 128, width: 32, height: 32 },
  chairOrangeBack: { x: 160, y: 128, width: 32, height: 32 },

  // === PLANTS ===
  plantLarge: { x: 192, y: 128, width: 32, height: 64 },     // Large potted plant
  plantMedium: { x: 224, y: 160, width: 32, height: 32 },    // Medium plant
  plantSmall: { x: 256, y: 160, width: 32, height: 32 },     // Small plant

  // === MONITORS/COMPUTERS ===
  // Computer setups around y=160-192
  monitorSingle: { x: 288, y: 160, width: 32, height: 32 },  // Single monitor
  monitorDual: { x: 320, y: 160, width: 64, height: 32 },    // Dual monitors
  computer: { x: 352, y: 160, width: 32, height: 32 },       // Desktop computer
  laptop: { x: 224, y: 128, width: 32, height: 32 },         // Laptop

  // === WALL DECORATIONS ===
  // Framed pictures - row 6 (y=192)
  pictureRed: { x: 0, y: 192, width: 32, height: 32 },
  pictureBlue: { x: 32, y: 192, width: 32, height: 32 },
  pictureYellow: { x: 64, y: 192, width: 32, height: 32 },
  pictureGreen: { x: 96, y: 192, width: 32, height: 32 },

  // Whiteboard with chart
  whiteboard: { x: 128, y: 192, width: 64, height: 64 },

  // Bookshelf
  bookshelf: { x: 192, y: 192, width: 64, height: 64 },

  // === COUCHES/SEATING ===
  // Gray couch - row 7 (y=224)
  couchGrayLeft: { x: 0, y: 224, width: 32, height: 64 },
  couchGrayMid: { x: 32, y: 224, width: 32, height: 64 },
  couchGrayRight: { x: 64, y: 224, width: 32, height: 64 },

  // Blue couch - row 8 (y=256)
  couchBlueLeft: { x: 0, y: 288, width: 32, height: 64 },
  couchBlueMid: { x: 32, y: 288, width: 32, height: 64 },
  couchBlueRight: { x: 64, y: 288, width: 32, height: 64 },

  // Single chairs/seats
  seatGray: { x: 96, y: 224, width: 32, height: 32 },
  seatBlue: { x: 128, y: 224, width: 32, height: 32 },

  // === TABLES ===
  coffeeTable: { x: 160, y: 256, width: 64, height: 32 },
  sideTable: { x: 224, y: 256, width: 32, height: 32 },

  // === STORAGE ===
  filingCabinet: { x: 0, y: 352, width: 32, height: 64 },
  filingCabinetWide: { x: 32, y: 352, width: 64, height: 64 },
  locker: { x: 96, y: 352, width: 32, height: 64 },

  // === WATER COOLER ===
  waterCooler: { x: 288, y: 352, width: 32, height: 64 },

  // === OFFICE EQUIPMENT ===
  printer: { x: 192, y: 352, width: 32, height: 32 },
  copier: { x: 224, y: 352, width: 64, height: 64 },
};

// Floor/Wall tile positions in tiles.png (Room Builder 32x32)
export const TILE_SPRITES = {
  // Walls (top section, y=0-96)
  wallLight: { x: 0, y: 0, width: 32, height: 32 },
  wallCornerTL: { x: 0, y: 0, width: 32, height: 32 },
  wallCornerTR: { x: 64, y: 0, width: 32, height: 32 },
  wallTop: { x: 32, y: 0, width: 32, height: 32 },
  wallLeft: { x: 0, y: 32, width: 32, height: 32 },
  wallRight: { x: 64, y: 32, width: 32, height: 32 },
  wallTrim: { x: 0, y: 64, width: 32, height: 32 },
  wallTrimAlt: { x: 32, y: 64, width: 32, height: 32 },

  // Window
  window: { x: 128, y: 0, width: 32, height: 64 },

  // Light lavender/purple office floor (y=128+)
  floorPurple: { x: 0, y: 128, width: 32, height: 32 },
  floorPurpleAlt: { x: 32, y: 128, width: 32, height: 32 },

  // Gray stone floor
  floorGray: { x: 64, y: 128, width: 32, height: 32 },
  floorGrayAlt: { x: 96, y: 128, width: 32, height: 32 },

  // Light office floor (y=160-192)
  floorLight: { x: 0, y: 160, width: 32, height: 32 },
  floorLightAlt: { x: 32, y: 160, width: 32, height: 32 },

  // Tan/beige floor (y=192+)
  floorTan: { x: 128, y: 192, width: 32, height: 32 },
  floorTanAlt: { x: 160, y: 192, width: 32, height: 32 },

  // Carpet (right side, y=128+)
  carpet: { x: 256, y: 128, width: 32, height: 32 },
  carpetAlt: { x: 288, y: 128, width: 32, height: 32 },
  carpetDark: { x: 320, y: 128, width: 32, height: 32 },

  // Brown/maroon carpet (y=192+)
  carpetBrown: { x: 256, y: 192, width: 32, height: 32 },
  carpetBrownAlt: { x: 288, y: 192, width: 32, height: 32 },
};

// Helper to get animation config with direction support
export function getCharacterAnimation(
  action: string,
  direction?: Direction
): {
  sheet: string;
  frames: SpriteFrame[];
  frameRate: number;
  loop: boolean;
} {
  const config = CHARACTER_ANIMATION_CONFIGS[action] || CHARACTER_ANIMATION_CONFIGS.idle;
  const actualDirection = direction || config.defaultDirection;
  const framesPerDir = config.framesPerDirection || FRAMES_PER_DIRECTION;

  // Generate frames for the specified direction
  const startFrame = DIRECTION_OFFSETS[actualDirection];
  const frames = Array.from({ length: framesPerDir }, (_, i) => ({
    x: (startFrame + i) * 16,
    y: 0,
    width: 16,
    height: 32,
  }));

  return {
    sheet: config.sheet,
    frames,
    frameRate: config.frameRate,
    loop: config.loop,
  };
}

export default {
  available: IMAGES_AVAILABLE,
  furnitureSpritesEnabled: FURNITURE_SPRITES_ENABLED,
  paths: ASSET_PATHS,
  sizes: SPRITE_SIZES,
  sheetSizes: SHEET_SIZES,
  animations: CHARACTER_ANIMATIONS,
  animationConfigs: CHARACTER_ANIMATION_CONFIGS,
  furniture: FURNITURE_SPRITES,
  tiles: TILE_SPRITES,
  directionOffsets: DIRECTION_OFFSETS,
};
