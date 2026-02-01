// Office Tileset and Furniture Sprites
// Inspired by top-down pixel art office games
// Using soft purple/blue/tan palette

export const OFFICE_PALETTE = {
  // Walls
  wallLight: '#E8E0F0',
  wallMid: '#D8D0E8',
  wallDark: '#C8C0D8',
  wallTrim: '#9890A8',

  // Floors
  floorTile1: '#C8D0E0',
  floorTile2: '#B8C8D8',
  floorGrid: '#A8B8C8',
  carpetTan: '#E8D8C0',
  carpetTanDark: '#D8C8B0',

  // Furniture - Desks
  deskTop: '#D0C0A0',
  deskShadow: '#B0A080',
  deskLeg: '#A09070',

  // Furniture - Chairs
  chairBlue: '#5070A0',
  chairBlueDark: '#405880',
  chairSeat: '#6080B0',

  // Monitors
  monitorFrame: '#404050',
  monitorScreen: '#203040',
  monitorScreenOn: '#40A080',
  monitorStand: '#505060',

  // Plants
  plantGreen: '#70A060',
  plantGreenDark: '#508040',
  plantGreenLight: '#90C080',
  potTerracotta: '#C08060',
  potShadow: '#A06040',

  // Bookshelf
  shelfWood: '#A08060',
  shelfWoodDark: '#806040',
  bookRed: '#C06060',
  bookBlue: '#6080C0',
  bookGreen: '#60A060',
  bookYellow: '#D0C060',

  // Couch/Lounge
  couchBlue: '#7088B0',
  couchBlueDark: '#506888',
  couchShadow: '#405068',

  // Decorations
  frameGold: '#C0A060',
  chartWhite: '#F0F0F0',
  chartLine: '#6080A0',

  // Characters - African American skin tones
  skin: '#8B5A2B',
  skinShadow: '#6B4423',
  hairBrown: '#705040',
  hairBlonde: '#D0B080',
  shirtBlue: '#6090C0',
  shirtOrange: '#E08050',
  pants: '#404860',

  // Water cooler
  waterCooler: '#90B0D0',
  waterCoolerDark: '#7090B0',
  waterJug: '#C0E0F0',
};

type ColorKey = keyof typeof OFFICE_PALETTE | '';
export type TileGrid = ColorKey[][];

// =============================================================================
// FLOOR TILES (16x16)
// =============================================================================

// Basic office floor tile
export const FLOOR_TILE: TileGrid = [
  ['floorTile1','floorTile1','floorTile1','floorTile1','floorTile1','floorTile1','floorTile1','floorTile1','floorTile1','floorTile1','floorTile1','floorTile1','floorTile1','floorTile1','floorTile1','floorGrid'],
  ['floorTile1','floorTile1','floorTile1','floorTile1','floorTile1','floorTile1','floorTile1','floorTile1','floorTile1','floorTile1','floorTile1','floorTile1','floorTile1','floorTile1','floorTile1','floorGrid'],
  ['floorTile1','floorTile1','floorTile2','floorTile2','floorTile2','floorTile2','floorTile2','floorTile2','floorTile2','floorTile2','floorTile2','floorTile2','floorTile2','floorTile2','floorTile1','floorGrid'],
  ['floorTile1','floorTile1','floorTile2','floorTile2','floorTile2','floorTile2','floorTile2','floorTile2','floorTile2','floorTile2','floorTile2','floorTile2','floorTile2','floorTile2','floorTile1','floorGrid'],
  ['floorTile1','floorTile1','floorTile2','floorTile2','floorTile2','floorTile2','floorTile2','floorTile2','floorTile2','floorTile2','floorTile2','floorTile2','floorTile2','floorTile2','floorTile1','floorGrid'],
  ['floorTile1','floorTile1','floorTile2','floorTile2','floorTile2','floorTile2','floorTile2','floorTile2','floorTile2','floorTile2','floorTile2','floorTile2','floorTile2','floorTile2','floorTile1','floorGrid'],
  ['floorTile1','floorTile1','floorTile2','floorTile2','floorTile2','floorTile2','floorTile2','floorTile2','floorTile2','floorTile2','floorTile2','floorTile2','floorTile2','floorTile2','floorTile1','floorGrid'],
  ['floorTile1','floorTile1','floorTile2','floorTile2','floorTile2','floorTile2','floorTile2','floorTile2','floorTile2','floorTile2','floorTile2','floorTile2','floorTile2','floorTile2','floorTile1','floorGrid'],
  ['floorTile1','floorTile1','floorTile2','floorTile2','floorTile2','floorTile2','floorTile2','floorTile2','floorTile2','floorTile2','floorTile2','floorTile2','floorTile2','floorTile2','floorTile1','floorGrid'],
  ['floorTile1','floorTile1','floorTile2','floorTile2','floorTile2','floorTile2','floorTile2','floorTile2','floorTile2','floorTile2','floorTile2','floorTile2','floorTile2','floorTile2','floorTile1','floorGrid'],
  ['floorTile1','floorTile1','floorTile2','floorTile2','floorTile2','floorTile2','floorTile2','floorTile2','floorTile2','floorTile2','floorTile2','floorTile2','floorTile2','floorTile2','floorTile1','floorGrid'],
  ['floorTile1','floorTile1','floorTile2','floorTile2','floorTile2','floorTile2','floorTile2','floorTile2','floorTile2','floorTile2','floorTile2','floorTile2','floorTile2','floorTile2','floorTile1','floorGrid'],
  ['floorTile1','floorTile1','floorTile2','floorTile2','floorTile2','floorTile2','floorTile2','floorTile2','floorTile2','floorTile2','floorTile2','floorTile2','floorTile2','floorTile2','floorTile1','floorGrid'],
  ['floorTile1','floorTile1','floorTile2','floorTile2','floorTile2','floorTile2','floorTile2','floorTile2','floorTile2','floorTile2','floorTile2','floorTile2','floorTile2','floorTile2','floorTile1','floorGrid'],
  ['floorTile1','floorTile1','floorTile1','floorTile1','floorTile1','floorTile1','floorTile1','floorTile1','floorTile1','floorTile1','floorTile1','floorTile1','floorTile1','floorTile1','floorTile1','floorGrid'],
  ['floorGrid','floorGrid','floorGrid','floorGrid','floorGrid','floorGrid','floorGrid','floorGrid','floorGrid','floorGrid','floorGrid','floorGrid','floorGrid','floorGrid','floorGrid','floorGrid'],
];

// Carpet tile for lounge area
export const CARPET_TILE: TileGrid = [
  ['carpetTan','carpetTan','carpetTan','carpetTan','carpetTan','carpetTan','carpetTan','carpetTan','carpetTan','carpetTan','carpetTan','carpetTan','carpetTan','carpetTan','carpetTan','carpetTanDark'],
  ['carpetTan','carpetTan','carpetTan','carpetTan','carpetTan','carpetTan','carpetTan','carpetTan','carpetTan','carpetTan','carpetTan','carpetTan','carpetTan','carpetTan','carpetTan','carpetTanDark'],
  ['carpetTan','carpetTan','carpetTan','carpetTan','carpetTan','carpetTan','carpetTan','carpetTan','carpetTan','carpetTan','carpetTan','carpetTan','carpetTan','carpetTan','carpetTan','carpetTanDark'],
  ['carpetTan','carpetTan','carpetTan','carpetTan','carpetTan','carpetTan','carpetTan','carpetTan','carpetTan','carpetTan','carpetTan','carpetTan','carpetTan','carpetTan','carpetTan','carpetTanDark'],
  ['carpetTan','carpetTan','carpetTan','carpetTan','carpetTan','carpetTan','carpetTan','carpetTan','carpetTan','carpetTan','carpetTan','carpetTan','carpetTan','carpetTan','carpetTan','carpetTanDark'],
  ['carpetTan','carpetTan','carpetTan','carpetTan','carpetTan','carpetTan','carpetTan','carpetTan','carpetTan','carpetTan','carpetTan','carpetTan','carpetTan','carpetTan','carpetTan','carpetTanDark'],
  ['carpetTan','carpetTan','carpetTan','carpetTan','carpetTan','carpetTan','carpetTan','carpetTan','carpetTan','carpetTan','carpetTan','carpetTan','carpetTan','carpetTan','carpetTan','carpetTanDark'],
  ['carpetTan','carpetTan','carpetTan','carpetTan','carpetTan','carpetTan','carpetTan','carpetTan','carpetTan','carpetTan','carpetTan','carpetTan','carpetTan','carpetTan','carpetTan','carpetTanDark'],
  ['carpetTan','carpetTan','carpetTan','carpetTan','carpetTan','carpetTan','carpetTan','carpetTan','carpetTan','carpetTan','carpetTan','carpetTan','carpetTan','carpetTan','carpetTan','carpetTanDark'],
  ['carpetTan','carpetTan','carpetTan','carpetTan','carpetTan','carpetTan','carpetTan','carpetTan','carpetTan','carpetTan','carpetTan','carpetTan','carpetTan','carpetTan','carpetTan','carpetTanDark'],
  ['carpetTan','carpetTan','carpetTan','carpetTan','carpetTan','carpetTan','carpetTan','carpetTan','carpetTan','carpetTan','carpetTan','carpetTan','carpetTan','carpetTan','carpetTan','carpetTanDark'],
  ['carpetTan','carpetTan','carpetTan','carpetTan','carpetTan','carpetTan','carpetTan','carpetTan','carpetTan','carpetTan','carpetTan','carpetTan','carpetTan','carpetTan','carpetTan','carpetTanDark'],
  ['carpetTan','carpetTan','carpetTan','carpetTan','carpetTan','carpetTan','carpetTan','carpetTan','carpetTan','carpetTan','carpetTan','carpetTan','carpetTan','carpetTan','carpetTan','carpetTanDark'],
  ['carpetTan','carpetTan','carpetTan','carpetTan','carpetTan','carpetTan','carpetTan','carpetTan','carpetTan','carpetTan','carpetTan','carpetTan','carpetTan','carpetTan','carpetTan','carpetTanDark'],
  ['carpetTan','carpetTan','carpetTan','carpetTan','carpetTan','carpetTan','carpetTan','carpetTan','carpetTan','carpetTan','carpetTan','carpetTan','carpetTan','carpetTan','carpetTan','carpetTanDark'],
  ['carpetTanDark','carpetTanDark','carpetTanDark','carpetTanDark','carpetTanDark','carpetTanDark','carpetTanDark','carpetTanDark','carpetTanDark','carpetTanDark','carpetTanDark','carpetTanDark','carpetTanDark','carpetTanDark','carpetTanDark','carpetTanDark'],
];

// =============================================================================
// FURNITURE - DESK WITH MONITOR (32x24 - top down view)
// =============================================================================

export const DESK_WITH_MONITOR: TileGrid = [
  // Monitor at top
  ['','','','','','','','','monitorFrame','monitorFrame','monitorFrame','monitorFrame','monitorFrame','monitorFrame','monitorFrame','monitorFrame','monitorFrame','monitorFrame','monitorFrame','monitorFrame','monitorFrame','monitorFrame','monitorFrame','monitorFrame','','','','','','','',''],
  ['','','','','','','','','monitorFrame','monitorScreen','monitorScreen','monitorScreen','monitorScreen','monitorScreen','monitorScreen','monitorScreen','monitorScreen','monitorScreen','monitorScreen','monitorScreen','monitorScreen','monitorScreen','monitorScreen','monitorFrame','','','','','','','',''],
  ['','','','','','','','','monitorFrame','monitorScreen','monitorScreenOn','monitorScreenOn','monitorScreenOn','monitorScreenOn','monitorScreenOn','monitorScreenOn','monitorScreenOn','monitorScreenOn','monitorScreenOn','monitorScreenOn','monitorScreenOn','monitorScreenOn','monitorScreen','monitorFrame','','','','','','','',''],
  ['','','','','','','','','monitorFrame','monitorScreen','monitorScreenOn','monitorScreenOn','monitorScreenOn','monitorScreenOn','monitorScreenOn','monitorScreenOn','monitorScreenOn','monitorScreenOn','monitorScreenOn','monitorScreenOn','monitorScreenOn','monitorScreenOn','monitorScreen','monitorFrame','','','','','','','',''],
  ['','','','','','','','','monitorFrame','monitorScreen','monitorScreenOn','monitorScreenOn','monitorScreenOn','monitorScreenOn','monitorScreenOn','monitorScreenOn','monitorScreenOn','monitorScreenOn','monitorScreenOn','monitorScreenOn','monitorScreenOn','monitorScreenOn','monitorScreen','monitorFrame','','','','','','','',''],
  ['','','','','','','','','monitorFrame','monitorFrame','monitorFrame','monitorFrame','monitorFrame','monitorFrame','monitorFrame','monitorFrame','monitorFrame','monitorFrame','monitorFrame','monitorFrame','monitorFrame','monitorFrame','monitorFrame','monitorFrame','','','','','','','',''],
  ['','','','','','','','','','','','','','','','monitorStand','monitorStand','','','','','','','','','','','','','','',''],
  ['','','','','','','','','','','','','','','','monitorStand','monitorStand','','','','','','','','','','','','','','',''],
  // Desk surface
  ['','','deskTop','deskTop','deskTop','deskTop','deskTop','deskTop','deskTop','deskTop','deskTop','deskTop','deskTop','deskTop','deskTop','deskTop','deskTop','deskTop','deskTop','deskTop','deskTop','deskTop','deskTop','deskTop','deskTop','deskTop','deskTop','deskTop','deskTop','deskTop','',''],
  ['','','deskTop','deskTop','deskTop','deskTop','deskTop','deskTop','deskTop','deskTop','deskTop','deskTop','deskTop','deskTop','deskTop','deskTop','deskTop','deskTop','deskTop','deskTop','deskTop','deskTop','deskTop','deskTop','deskTop','deskTop','deskTop','deskTop','deskTop','deskTop','',''],
  ['','','deskTop','deskTop','deskTop','deskTop','deskTop','deskTop','deskTop','deskTop','deskTop','deskTop','deskTop','deskTop','deskTop','deskTop','deskTop','deskTop','deskTop','deskTop','deskTop','deskTop','deskTop','deskTop','deskTop','deskTop','deskTop','deskTop','deskTop','deskTop','',''],
  ['','','deskShadow','deskShadow','deskShadow','deskShadow','deskShadow','deskShadow','deskShadow','deskShadow','deskShadow','deskShadow','deskShadow','deskShadow','deskShadow','deskShadow','deskShadow','deskShadow','deskShadow','deskShadow','deskShadow','deskShadow','deskShadow','deskShadow','deskShadow','deskShadow','deskShadow','deskShadow','deskShadow','deskShadow','',''],
  // Desk legs
  ['','','','deskLeg','deskLeg','','','','','','','','','','','','','','','','','','','','','','','','deskLeg','deskLeg','',''],
  ['','','','deskLeg','deskLeg','','','','','','','','','','','','','','','','','','','','','','','','deskLeg','deskLeg','',''],
  ['','','','deskLeg','deskLeg','','','','','','','','','','','','','','','','','','','','','','','','deskLeg','deskLeg','',''],
  ['','','','deskLeg','deskLeg','','','','','','','','','','','','','','','','','','','','','','','','deskLeg','deskLeg','',''],
  // Chair in front
  ['','','','','','','','','','','chairBlueDark','chairBlueDark','chairBlueDark','chairBlueDark','chairBlueDark','chairBlueDark','chairBlueDark','chairBlueDark','chairBlueDark','chairBlueDark','chairBlueDark','chairBlueDark','','','','','','','','','',''],
  ['','','','','','','','','','chairBlue','chairBlue','chairSeat','chairSeat','chairSeat','chairSeat','chairSeat','chairSeat','chairSeat','chairSeat','chairSeat','chairSeat','chairBlue','chairBlue','','','','','','','','',''],
  ['','','','','','','','','','chairBlue','chairBlue','chairSeat','chairSeat','chairSeat','chairSeat','chairSeat','chairSeat','chairSeat','chairSeat','chairSeat','chairSeat','chairBlue','chairBlue','','','','','','','','',''],
  ['','','','','','','','','','chairBlue','chairBlue','chairSeat','chairSeat','chairSeat','chairSeat','chairSeat','chairSeat','chairSeat','chairSeat','chairSeat','chairSeat','chairBlue','chairBlue','','','','','','','','',''],
  ['','','','','','','','','','','chairBlueDark','chairBlueDark','','','','','','','','','','chairBlueDark','chairBlueDark','','','','','','','','',''],
  ['','','','','','','','','','','chairBlueDark','chairBlueDark','','','','','','','','','','chairBlueDark','chairBlueDark','','','','','','','','',''],
  ['','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','',''],
  ['','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','',''],
];

// =============================================================================
// OFFICE CHAIR (16x16 - top down view, for placing separately)
// =============================================================================

export const OFFICE_CHAIR: TileGrid = [
  ['','','','','chairBlueDark','chairBlueDark','chairBlueDark','chairBlueDark','chairBlueDark','chairBlueDark','chairBlueDark','chairBlueDark','','','',''],
  ['','','','chairBlue','chairBlue','chairSeat','chairSeat','chairSeat','chairSeat','chairSeat','chairSeat','chairBlue','chairBlue','','',''],
  ['','','','chairBlue','chairBlue','chairSeat','chairSeat','chairSeat','chairSeat','chairSeat','chairSeat','chairBlue','chairBlue','','',''],
  ['','','','chairBlue','chairBlue','chairSeat','chairSeat','chairSeat','chairSeat','chairSeat','chairSeat','chairBlue','chairBlue','','',''],
  ['','','','chairBlue','chairBlue','chairSeat','chairSeat','chairSeat','chairSeat','chairSeat','chairSeat','chairBlue','chairBlue','','',''],
  ['','','','chairBlue','chairBlue','chairSeat','chairSeat','chairSeat','chairSeat','chairSeat','chairSeat','chairBlue','chairBlue','','',''],
  ['','','','','chairBlueDark','chairBlueDark','','','','','chairBlueDark','chairBlueDark','','','',''],
  ['','','','','chairBlueDark','chairBlueDark','','','','','chairBlueDark','chairBlueDark','','','',''],
  ['','','','','','','','','','','','','','','',''],
  ['','','','','','','','','','','','','','','',''],
  ['','','','','','','','','','','','','','','',''],
  ['','','','','','','','','','','','','','','',''],
  ['','','','','','','','','','','','','','','',''],
  ['','','','','','','','','','','','','','','',''],
  ['','','','','','','','','','','','','','','',''],
  ['','','','','','','','','','','','','','','',''],
];

// =============================================================================
// PLANT (12x16)
// =============================================================================

export const PLANT_POTTED: TileGrid = [
  ['','','','','plantGreenLight','plantGreenLight','plantGreenLight','plantGreenLight','','','',''],
  ['','','','plantGreen','plantGreen','plantGreenLight','plantGreenLight','plantGreen','plantGreen','','',''],
  ['','','plantGreen','plantGreen','plantGreenDark','plantGreen','plantGreen','plantGreenDark','plantGreen','plantGreen','',''],
  ['','plantGreen','plantGreenDark','plantGreen','plantGreen','plantGreenLight','plantGreenLight','plantGreen','plantGreen','plantGreenDark','plantGreen',''],
  ['','plantGreen','plantGreen','plantGreenDark','plantGreen','plantGreen','plantGreen','plantGreen','plantGreenDark','plantGreen','plantGreen',''],
  ['plantGreen','plantGreenDark','plantGreen','plantGreen','plantGreenLight','plantGreen','plantGreen','plantGreenLight','plantGreen','plantGreen','plantGreenDark','plantGreen'],
  ['plantGreen','plantGreen','plantGreenDark','plantGreen','plantGreen','plantGreenDark','plantGreenDark','plantGreen','plantGreen','plantGreenDark','plantGreen','plantGreen'],
  ['','plantGreen','plantGreen','plantGreen','plantGreenDark','plantGreen','plantGreen','plantGreenDark','plantGreen','plantGreen','plantGreen',''],
  ['','','plantGreen','plantGreen','plantGreen','plantGreen','plantGreen','plantGreen','plantGreen','plantGreen','',''],
  ['','','','','plantGreenDark','plantGreenDark','plantGreenDark','plantGreenDark','','','',''],
  ['','','','','potTerracotta','potTerracotta','potTerracotta','potTerracotta','','','',''],
  ['','','','potTerracotta','potTerracotta','potTerracotta','potTerracotta','potTerracotta','potTerracotta','','',''],
  ['','','','potTerracotta','potTerracotta','potShadow','potShadow','potTerracotta','potTerracotta','','',''],
  ['','','','potTerracotta','potShadow','potShadow','potShadow','potShadow','potTerracotta','','',''],
  ['','','','','potTerracotta','potTerracotta','potTerracotta','potTerracotta','','','',''],
  ['','','','','','','','','','','',''],
];

// =============================================================================
// BOOKSHELF (24x20) - Wall mounted
// =============================================================================

export const BOOKSHELF: TileGrid = [
  ['shelfWood','shelfWood','shelfWood','shelfWood','shelfWood','shelfWood','shelfWood','shelfWood','shelfWood','shelfWood','shelfWood','shelfWood','shelfWood','shelfWood','shelfWood','shelfWood','shelfWood','shelfWood','shelfWood','shelfWood','shelfWood','shelfWood','shelfWood','shelfWood'],
  ['shelfWood','bookRed','bookRed','bookBlue','bookBlue','bookBlue','bookGreen','bookGreen','bookYellow','bookRed','bookRed','bookBlue','bookGreen','bookGreen','bookGreen','bookYellow','bookYellow','bookRed','bookBlue','bookBlue','bookGreen','bookRed','bookRed','shelfWood'],
  ['shelfWood','bookRed','bookRed','bookBlue','bookBlue','bookBlue','bookGreen','bookGreen','bookYellow','bookRed','bookRed','bookBlue','bookGreen','bookGreen','bookGreen','bookYellow','bookYellow','bookRed','bookBlue','bookBlue','bookGreen','bookRed','bookRed','shelfWood'],
  ['shelfWood','bookRed','bookRed','bookBlue','bookBlue','bookBlue','bookGreen','bookGreen','bookYellow','bookRed','bookRed','bookBlue','bookGreen','bookGreen','bookGreen','bookYellow','bookYellow','bookRed','bookBlue','bookBlue','bookGreen','bookRed','bookRed','shelfWood'],
  ['shelfWood','bookRed','bookRed','bookBlue','bookBlue','bookBlue','bookGreen','bookGreen','bookYellow','bookRed','bookRed','bookBlue','bookGreen','bookGreen','bookGreen','bookYellow','bookYellow','bookRed','bookBlue','bookBlue','bookGreen','bookRed','bookRed','shelfWood'],
  ['shelfWoodDark','shelfWoodDark','shelfWoodDark','shelfWoodDark','shelfWoodDark','shelfWoodDark','shelfWoodDark','shelfWoodDark','shelfWoodDark','shelfWoodDark','shelfWoodDark','shelfWoodDark','shelfWoodDark','shelfWoodDark','shelfWoodDark','shelfWoodDark','shelfWoodDark','shelfWoodDark','shelfWoodDark','shelfWoodDark','shelfWoodDark','shelfWoodDark','shelfWoodDark','shelfWoodDark'],
  ['shelfWood','bookBlue','bookBlue','bookYellow','bookYellow','bookRed','bookRed','bookRed','bookGreen','bookBlue','bookBlue','bookYellow','bookRed','bookRed','bookGreen','bookGreen','bookBlue','bookYellow','bookYellow','bookRed','bookRed','bookGreen','bookBlue','shelfWood'],
  ['shelfWood','bookBlue','bookBlue','bookYellow','bookYellow','bookRed','bookRed','bookRed','bookGreen','bookBlue','bookBlue','bookYellow','bookRed','bookRed','bookGreen','bookGreen','bookBlue','bookYellow','bookYellow','bookRed','bookRed','bookGreen','bookBlue','shelfWood'],
  ['shelfWood','bookBlue','bookBlue','bookYellow','bookYellow','bookRed','bookRed','bookRed','bookGreen','bookBlue','bookBlue','bookYellow','bookRed','bookRed','bookGreen','bookGreen','bookBlue','bookYellow','bookYellow','bookRed','bookRed','bookGreen','bookBlue','shelfWood'],
  ['shelfWood','bookBlue','bookBlue','bookYellow','bookYellow','bookRed','bookRed','bookRed','bookGreen','bookBlue','bookBlue','bookYellow','bookRed','bookRed','bookGreen','bookGreen','bookBlue','bookYellow','bookYellow','bookRed','bookRed','bookGreen','bookBlue','shelfWood'],
  ['shelfWoodDark','shelfWoodDark','shelfWoodDark','shelfWoodDark','shelfWoodDark','shelfWoodDark','shelfWoodDark','shelfWoodDark','shelfWoodDark','shelfWoodDark','shelfWoodDark','shelfWoodDark','shelfWoodDark','shelfWoodDark','shelfWoodDark','shelfWoodDark','shelfWoodDark','shelfWoodDark','shelfWoodDark','shelfWoodDark','shelfWoodDark','shelfWoodDark','shelfWoodDark','shelfWoodDark'],
  ['shelfWood','bookGreen','bookGreen','bookRed','bookBlue','bookBlue','bookYellow','bookGreen','bookGreen','bookRed','bookRed','bookBlue','bookYellow','bookYellow','bookGreen','bookRed','bookBlue','bookBlue','bookGreen','bookYellow','bookRed','bookRed','bookBlue','shelfWood'],
  ['shelfWood','bookGreen','bookGreen','bookRed','bookBlue','bookBlue','bookYellow','bookGreen','bookGreen','bookRed','bookRed','bookBlue','bookYellow','bookYellow','bookGreen','bookRed','bookBlue','bookBlue','bookGreen','bookYellow','bookRed','bookRed','bookBlue','shelfWood'],
  ['shelfWood','bookGreen','bookGreen','bookRed','bookBlue','bookBlue','bookYellow','bookGreen','bookGreen','bookRed','bookRed','bookBlue','bookYellow','bookYellow','bookGreen','bookRed','bookBlue','bookBlue','bookGreen','bookYellow','bookRed','bookRed','bookBlue','shelfWood'],
  ['shelfWood','bookGreen','bookGreen','bookRed','bookBlue','bookBlue','bookYellow','bookGreen','bookGreen','bookRed','bookRed','bookBlue','bookYellow','bookYellow','bookGreen','bookRed','bookBlue','bookBlue','bookGreen','bookYellow','bookRed','bookRed','bookBlue','shelfWood'],
  ['shelfWoodDark','shelfWoodDark','shelfWoodDark','shelfWoodDark','shelfWoodDark','shelfWoodDark','shelfWoodDark','shelfWoodDark','shelfWoodDark','shelfWoodDark','shelfWoodDark','shelfWoodDark','shelfWoodDark','shelfWoodDark','shelfWoodDark','shelfWoodDark','shelfWoodDark','shelfWoodDark','shelfWoodDark','shelfWoodDark','shelfWoodDark','shelfWoodDark','shelfWoodDark','shelfWoodDark'],
  ['','','','','','','','','','','','','','','','','','','','','','','',''],
  ['','','','','','','','','','','','','','','','','','','','','','','',''],
  ['','','','','','','','','','','','','','','','','','','','','','','',''],
  ['','','','','','','','','','','','','','','','','','','','','','','',''],
];

// =============================================================================
// COUCH (32x20) - For lounge area
// =============================================================================

export const COUCH: TileGrid = [
  ['','','couchBlueDark','couchBlueDark','couchBlueDark','couchBlueDark','couchBlueDark','couchBlueDark','couchBlueDark','couchBlueDark','couchBlueDark','couchBlueDark','couchBlueDark','couchBlueDark','couchBlueDark','couchBlueDark','couchBlueDark','couchBlueDark','couchBlueDark','couchBlueDark','couchBlueDark','couchBlueDark','couchBlueDark','couchBlueDark','couchBlueDark','couchBlueDark','couchBlueDark','couchBlueDark','couchBlueDark','couchBlueDark','',''],
  ['','couchBlueDark','couchBlue','couchBlue','couchBlue','couchBlue','couchBlue','couchBlue','couchBlue','couchBlue','couchBlue','couchBlue','couchBlue','couchBlue','couchBlue','couchBlue','couchBlue','couchBlue','couchBlue','couchBlue','couchBlue','couchBlue','couchBlue','couchBlue','couchBlue','couchBlue','couchBlue','couchBlue','couchBlue','couchBlue','couchBlueDark',''],
  ['','couchBlueDark','couchBlue','couchBlue','couchBlue','couchBlue','couchBlue','couchBlue','couchBlue','couchBlue','couchBlue','couchBlue','couchBlue','couchBlue','couchBlue','couchBlue','couchBlue','couchBlue','couchBlue','couchBlue','couchBlue','couchBlue','couchBlue','couchBlue','couchBlue','couchBlue','couchBlue','couchBlue','couchBlue','couchBlue','couchBlueDark',''],
  ['','couchBlueDark','couchBlue','couchBlue','couchBlue','couchBlue','couchBlue','couchBlue','couchBlue','couchBlue','couchBlue','couchBlue','couchBlue','couchBlue','couchBlue','couchBlue','couchBlue','couchBlue','couchBlue','couchBlue','couchBlue','couchBlue','couchBlue','couchBlue','couchBlue','couchBlue','couchBlue','couchBlue','couchBlue','couchBlue','couchBlueDark',''],
  ['couchBlueDark','couchBlue','couchBlue','couchBlue','couchBlue','couchBlue','couchBlue','couchBlue','couchBlue','couchBlue','couchBlue','couchBlue','couchBlue','couchBlue','couchBlue','couchBlue','couchBlue','couchBlue','couchBlue','couchBlue','couchBlue','couchBlue','couchBlue','couchBlue','couchBlue','couchBlue','couchBlue','couchBlue','couchBlue','couchBlue','couchBlue','couchBlueDark'],
  ['couchBlueDark','couchBlue','couchBlue','couchBlue','couchBlue','couchBlue','couchBlue','couchBlue','couchBlue','couchBlue','couchBlueDark','couchBlueDark','couchBlue','couchBlue','couchBlue','couchBlue','couchBlue','couchBlue','couchBlue','couchBlue','couchBlueDark','couchBlueDark','couchBlue','couchBlue','couchBlue','couchBlue','couchBlue','couchBlue','couchBlue','couchBlue','couchBlue','couchBlueDark'],
  ['couchBlueDark','couchBlue','couchBlue','couchBlue','couchBlue','couchBlue','couchBlue','couchBlue','couchBlue','couchBlue','couchBlueDark','couchBlueDark','couchBlue','couchBlue','couchBlue','couchBlue','couchBlue','couchBlue','couchBlue','couchBlue','couchBlueDark','couchBlueDark','couchBlue','couchBlue','couchBlue','couchBlue','couchBlue','couchBlue','couchBlue','couchBlue','couchBlue','couchBlueDark'],
  ['couchBlueDark','couchBlue','couchBlue','couchBlue','couchBlue','couchBlue','couchBlue','couchBlue','couchBlue','couchBlue','couchBlue','couchBlue','couchBlue','couchBlue','couchBlue','couchBlue','couchBlue','couchBlue','couchBlue','couchBlue','couchBlue','couchBlue','couchBlue','couchBlue','couchBlue','couchBlue','couchBlue','couchBlue','couchBlue','couchBlue','couchBlue','couchBlueDark'],
  ['couchBlueDark','couchBlue','couchBlue','couchBlue','couchBlue','couchBlue','couchBlue','couchBlue','couchBlue','couchBlue','couchBlue','couchBlue','couchBlue','couchBlue','couchBlue','couchBlue','couchBlue','couchBlue','couchBlue','couchBlue','couchBlue','couchBlue','couchBlue','couchBlue','couchBlue','couchBlue','couchBlue','couchBlue','couchBlue','couchBlue','couchBlue','couchBlueDark'],
  ['couchShadow','couchBlueDark','couchBlueDark','couchBlueDark','couchBlueDark','couchBlueDark','couchBlueDark','couchBlueDark','couchBlueDark','couchBlueDark','couchBlueDark','couchBlueDark','couchBlueDark','couchBlueDark','couchBlueDark','couchBlueDark','couchBlueDark','couchBlueDark','couchBlueDark','couchBlueDark','couchBlueDark','couchBlueDark','couchBlueDark','couchBlueDark','couchBlueDark','couchBlueDark','couchBlueDark','couchBlueDark','couchBlueDark','couchBlueDark','couchBlueDark','couchShadow'],
  ['','couchShadow','couchShadow','','','','','','','','','','','','','','','','','','','','','','','','','','','couchShadow','couchShadow',''],
  ['','couchShadow','couchShadow','','','','','','','','','','','','','','','','','','','','','','','','','','','couchShadow','couchShadow',''],
  ['','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','',''],
  ['','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','',''],
  ['','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','',''],
  ['','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','',''],
  ['','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','',''],
  ['','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','',''],
  ['','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','',''],
  ['','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','',''],
];

// =============================================================================
// WALL CHART/WHITEBOARD (20x16)
// =============================================================================

export const WALL_CHART: TileGrid = [
  ['frameGold','frameGold','frameGold','frameGold','frameGold','frameGold','frameGold','frameGold','frameGold','frameGold','frameGold','frameGold','frameGold','frameGold','frameGold','frameGold','frameGold','frameGold','frameGold','frameGold'],
  ['frameGold','chartWhite','chartWhite','chartWhite','chartWhite','chartWhite','chartWhite','chartWhite','chartWhite','chartWhite','chartWhite','chartWhite','chartWhite','chartWhite','chartWhite','chartWhite','chartWhite','chartWhite','chartWhite','frameGold'],
  ['frameGold','chartWhite','chartWhite','chartWhite','chartWhite','chartWhite','chartWhite','chartWhite','chartWhite','chartWhite','chartWhite','chartWhite','chartWhite','chartWhite','chartWhite','chartWhite','chartWhite','chartWhite','chartWhite','frameGold'],
  ['frameGold','chartWhite','chartWhite','chartLine','chartWhite','chartWhite','chartWhite','chartWhite','chartWhite','chartWhite','chartWhite','chartWhite','chartWhite','chartWhite','chartWhite','chartWhite','chartLine','chartWhite','chartWhite','frameGold'],
  ['frameGold','chartWhite','chartWhite','chartLine','chartLine','chartWhite','chartWhite','chartWhite','chartWhite','chartWhite','chartWhite','chartWhite','chartWhite','chartWhite','chartWhite','chartLine','chartLine','chartWhite','chartWhite','frameGold'],
  ['frameGold','chartWhite','chartWhite','chartWhite','chartLine','chartLine','chartWhite','chartWhite','chartWhite','chartWhite','chartWhite','chartWhite','chartWhite','chartWhite','chartLine','chartLine','chartWhite','chartWhite','chartWhite','frameGold'],
  ['frameGold','chartWhite','chartWhite','chartWhite','chartWhite','chartLine','chartLine','chartWhite','chartWhite','chartWhite','chartWhite','chartWhite','chartWhite','chartLine','chartLine','chartWhite','chartWhite','chartWhite','chartWhite','frameGold'],
  ['frameGold','chartWhite','chartWhite','chartWhite','chartWhite','chartWhite','chartLine','chartLine','chartWhite','chartWhite','chartWhite','chartWhite','chartLine','chartLine','chartWhite','chartWhite','chartWhite','chartWhite','chartWhite','frameGold'],
  ['frameGold','chartWhite','chartWhite','chartWhite','chartWhite','chartWhite','chartWhite','chartLine','chartLine','chartWhite','chartWhite','chartLine','chartLine','chartWhite','chartWhite','chartWhite','chartWhite','chartWhite','chartWhite','frameGold'],
  ['frameGold','chartWhite','chartWhite','chartWhite','chartWhite','chartWhite','chartWhite','chartWhite','chartLine','chartLine','chartLine','chartLine','chartWhite','chartWhite','chartWhite','chartWhite','chartWhite','chartWhite','chartWhite','frameGold'],
  ['frameGold','chartWhite','chartWhite','chartWhite','chartWhite','chartWhite','chartWhite','chartWhite','chartWhite','chartLine','chartLine','chartWhite','chartWhite','chartWhite','chartWhite','chartWhite','chartWhite','chartWhite','chartWhite','frameGold'],
  ['frameGold','chartWhite','chartWhite','chartWhite','chartWhite','chartWhite','chartWhite','chartWhite','chartWhite','chartWhite','chartWhite','chartWhite','chartWhite','chartWhite','chartWhite','chartWhite','chartWhite','chartWhite','chartWhite','frameGold'],
  ['frameGold','chartWhite','chartWhite','chartWhite','chartWhite','chartWhite','chartWhite','chartWhite','chartWhite','chartWhite','chartWhite','chartWhite','chartWhite','chartWhite','chartWhite','chartWhite','chartWhite','chartWhite','chartWhite','frameGold'],
  ['frameGold','chartWhite','chartWhite','chartWhite','chartWhite','chartWhite','chartWhite','chartWhite','chartWhite','chartWhite','chartWhite','chartWhite','chartWhite','chartWhite','chartWhite','chartWhite','chartWhite','chartWhite','chartWhite','frameGold'],
  ['frameGold','frameGold','frameGold','frameGold','frameGold','frameGold','frameGold','frameGold','frameGold','frameGold','frameGold','frameGold','frameGold','frameGold','frameGold','frameGold','frameGold','frameGold','frameGold','frameGold'],
  ['','','','','','','','','','','','','','','','','','','',''],
];

// =============================================================================
// WATER COOLER (10x16)
// =============================================================================

export const WATER_COOLER: TileGrid = [
  ['','','','waterJug','waterJug','waterJug','waterJug','','',''],
  ['','','waterJug','waterJug','waterJug','waterJug','waterJug','waterJug','',''],
  ['','','waterJug','waterJug','waterJug','waterJug','waterJug','waterJug','',''],
  ['','','waterJug','waterJug','waterJug','waterJug','waterJug','waterJug','',''],
  ['','','','waterJug','waterJug','waterJug','waterJug','','',''],
  ['','','waterCooler','waterCooler','waterCooler','waterCooler','waterCooler','waterCooler','',''],
  ['','waterCooler','waterCooler','waterCooler','waterCooler','waterCooler','waterCooler','waterCooler','waterCooler',''],
  ['','waterCooler','waterCooler','waterCoolerDark','waterCoolerDark','waterCoolerDark','waterCoolerDark','waterCooler','waterCooler',''],
  ['','waterCooler','waterCooler','waterCoolerDark','waterCoolerDark','waterCoolerDark','waterCoolerDark','waterCooler','waterCooler',''],
  ['','waterCooler','waterCooler','waterCooler','waterCooler','waterCooler','waterCooler','waterCooler','waterCooler',''],
  ['','waterCooler','waterCooler','waterCooler','waterCooler','waterCooler','waterCooler','waterCooler','waterCooler',''],
  ['','waterCoolerDark','waterCoolerDark','waterCoolerDark','waterCoolerDark','waterCoolerDark','waterCoolerDark','waterCoolerDark','waterCoolerDark',''],
  ['','waterCoolerDark','waterCoolerDark','','','','','waterCoolerDark','waterCoolerDark',''],
  ['','waterCoolerDark','waterCoolerDark','','','','','waterCoolerDark','waterCoolerDark',''],
  ['','','','','','','','','',''],
  ['','','','','','','','','',''],
];

// =============================================================================
// CHARACTER SPRITES (12x16 - top down view)
// =============================================================================

export const CHARACTER_IDLE: TileGrid = [
  ['','','','','hairBrown','hairBrown','hairBrown','hairBrown','','','',''],
  ['','','','hairBrown','hairBrown','hairBrown','hairBrown','hairBrown','hairBrown','','',''],
  ['','','hairBrown','hairBrown','skin','skin','skin','skin','hairBrown','hairBrown','',''],
  ['','','hairBrown','skin','skin','skin','skin','skin','skin','hairBrown','',''],
  ['','','','skin','','skin','skin','','skin','','',''],
  ['','','','skin','skin','skin','skin','skin','skin','','',''],
  ['','','','','skin','skinShadow','skinShadow','skin','','','',''],
  ['','','','shirtBlue','shirtBlue','shirtBlue','shirtBlue','shirtBlue','shirtBlue','','',''],
  ['','','shirtBlue','shirtBlue','shirtBlue','shirtBlue','shirtBlue','shirtBlue','shirtBlue','shirtBlue','',''],
  ['','','shirtBlue','shirtBlue','shirtBlue','shirtBlue','shirtBlue','shirtBlue','shirtBlue','shirtBlue','',''],
  ['','','','shirtBlue','shirtBlue','shirtBlue','shirtBlue','shirtBlue','shirtBlue','','',''],
  ['','','','','pants','pants','pants','pants','','','',''],
  ['','','','pants','pants','pants','pants','pants','pants','','',''],
  ['','','','pants','pants','','','pants','pants','','',''],
  ['','','','pants','pants','','','pants','pants','','',''],
  ['','','','','','','','','','','',''],
];

export const CHARACTER_TYPING_1: TileGrid = [
  ['','','','','hairBrown','hairBrown','hairBrown','hairBrown','','','',''],
  ['','','','hairBrown','hairBrown','hairBrown','hairBrown','hairBrown','hairBrown','','',''],
  ['','','hairBrown','hairBrown','skin','skin','skin','skin','hairBrown','hairBrown','',''],
  ['','','hairBrown','skin','skin','skin','skin','skin','skin','hairBrown','',''],
  ['','','','skin','','skin','skin','','skin','','',''],
  ['','','','skin','skin','skin','skin','skin','skin','','',''],
  ['','','','','skin','skinShadow','skinShadow','skin','','','',''],
  ['','','','shirtBlue','shirtBlue','shirtBlue','shirtBlue','shirtBlue','shirtBlue','','',''],
  ['','skin','shirtBlue','shirtBlue','shirtBlue','shirtBlue','shirtBlue','shirtBlue','shirtBlue','shirtBlue','skin',''],
  ['','','skin','shirtBlue','shirtBlue','shirtBlue','shirtBlue','shirtBlue','shirtBlue','skin','',''],
  ['','','','shirtBlue','shirtBlue','shirtBlue','shirtBlue','shirtBlue','shirtBlue','','',''],
  ['','','','','pants','pants','pants','pants','','','',''],
  ['','','','pants','pants','pants','pants','pants','pants','','',''],
  ['','','','pants','pants','','','pants','pants','','',''],
  ['','','','pants','pants','','','pants','pants','','',''],
  ['','','','','','','','','','','',''],
];

export const CHARACTER_TYPING_2: TileGrid = [
  ['','','','','hairBrown','hairBrown','hairBrown','hairBrown','','','',''],
  ['','','','hairBrown','hairBrown','hairBrown','hairBrown','hairBrown','hairBrown','','',''],
  ['','','hairBrown','hairBrown','skin','skin','skin','skin','hairBrown','hairBrown','',''],
  ['','','hairBrown','skin','skin','skin','skin','skin','skin','hairBrown','',''],
  ['','','','skin','','skin','skin','','skin','','',''],
  ['','','','skin','skin','skin','skin','skin','skin','','',''],
  ['','','','','skin','skinShadow','skinShadow','skin','','','',''],
  ['','','','shirtBlue','shirtBlue','shirtBlue','shirtBlue','shirtBlue','shirtBlue','','',''],
  ['','','shirtBlue','shirtBlue','shirtBlue','shirtBlue','shirtBlue','shirtBlue','shirtBlue','shirtBlue','',''],
  ['','skin','skin','shirtBlue','shirtBlue','shirtBlue','shirtBlue','shirtBlue','shirtBlue','skin','skin',''],
  ['','','','shirtBlue','shirtBlue','shirtBlue','shirtBlue','shirtBlue','shirtBlue','','',''],
  ['','','','','pants','pants','pants','pants','','','',''],
  ['','','','pants','pants','pants','pants','pants','pants','','',''],
  ['','','','pants','pants','','','pants','pants','','',''],
  ['','','','pants','pants','','','pants','pants','','',''],
  ['','','','','','','','','','','',''],
];

// Export all sprites
export const OFFICE_SPRITES = {
  tiles: {
    floor: FLOOR_TILE,
    carpet: CARPET_TILE,
  },
  furniture: {
    deskWithMonitor: DESK_WITH_MONITOR,
    chair: OFFICE_CHAIR,
    plant: PLANT_POTTED,
    bookshelf: BOOKSHELF,
    couch: COUCH,
    wallChart: WALL_CHART,
    waterCooler: WATER_COOLER,
  },
  character: {
    idle: CHARACTER_IDLE,
    typing: [CHARACTER_TYPING_1, CHARACTER_TYPING_2],
  },
};

export default OFFICE_SPRITES;
