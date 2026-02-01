import React, { memo } from 'react';
import { View, StyleSheet, Text, ImageSourcePropType, Image } from 'react-native';
import {
  IMAGES_AVAILABLE,
  FURNITURE_SPRITES_ENABLED,
  ASSET_PATHS,
  FURNITURE_SPRITES,
  TILE_SPRITES,
  SHEET_SIZES,
} from '../assets/images';
import { FURNITURE_IMAGES, FurnitureImageKey } from '../assets/images/furniture';
import { SpriteSheet, AnimatedSpriteSheet, createFrameGrid } from './SpriteSheet';
import ImageSprite from './ImageSprite';

// Color palette matching Pixel HQ style
const COLORS = {
  // Walls
  wallBg: '#D8D0E8',
  wallLight: '#E8E4F0',
  wallTrim: '#B0A8C0',

  // Floor
  floorTile: '#C8D0E0',
  floorGrid: '#B8C4D4',
  carpet: '#E8D8C0',
  carpetDark: '#D8C8B0',

  // Furniture
  deskTop: '#E8DCC8',
  deskShadow: '#C8B898',
  deskLeg: '#A89878',

  // Monitors
  monitorFrame: '#3D4550',
  monitorScreen: '#1A2530',
  monitorScreenOn: '#40B090',
  monitorStand: '#4D5560',

  // Chairs
  chairBlue: '#5878A8',
  chairBlueDark: '#4060A0',
  chairSeat: '#6888B8',

  // Plants
  plantGreen: '#70A860',
  plantDark: '#508845',
  potBrown: '#C08060',

  // Decorations
  frameGold: '#C8A868',
  frameWhite: '#F5F5F5',
  picRed: '#D87070',
  picBlue: '#7090D0',
  picYellow: '#E8D070',
  picGreen: '#70C088',

  // Books
  bookRed: '#C86060',
  bookBlue: '#6080C0',
  bookGreen: '#60A060',
  bookYellow: '#D0C060',

  // Couch
  couchBlue: '#7090B8',
  couchDark: '#5878A0',

  // Water cooler
  coolerBody: '#A0B8D0',
  coolerWater: '#C0E8F8',

  // Character
  skin: '#8B5A2B',
  shirt: '#6090C0',
};

interface TopDownOfficeProps {
  scale?: number;
  width?: number;
  height?: number;
}

// Simple rectangle component (fallback renderer)
const Rect = ({ x, y, w, h, color }: { x: number; y: number; w: number; h: number; color: string }) => (
  <View style={{ position: 'absolute', left: x, top: y, width: w, height: h, backgroundColor: color }} />
);

// Individual furniture sprite component (uses pre-extracted PNGs)
interface FurnitureSpriteProps {
  x: number;
  y: number;
  type: FurnitureImageKey;
  scale?: number;
}

const FurnitureSprite = memo(({ x, y, type, scale = 1 }: FurnitureSpriteProps) => {
  const source = FURNITURE_IMAGES[type];
  if (!source) return null;

  return (
    <Image
      source={source}
      style={{
        position: 'absolute',
        left: x,
        top: y,
        width: 32 * scale,
        height: 32 * scale,
      }}
      resizeMode="contain"
    />
  );
});

// Image-based furniture components (used when LimeZu assets are available)
type FurnitureSpriteType = keyof typeof FURNITURE_SPRITES;

interface ImageFurnitureProps {
  x: number;
  y: number;
  type: FurnitureSpriteType;
  scale?: number;
}

const ImageFurniture = memo(({ x, y, type, scale = 1 }: ImageFurnitureProps) => {
  if (!FURNITURE_SPRITES_ENABLED || !ASSET_PATHS.furniture) {
    return null;
  }

  const source = ASSET_PATHS.furniture as ImageSourcePropType;
  const config = FURNITURE_SPRITES[type];

  if (!config) {
    return null;
  }

  return (
    <SpriteSheet
      source={source}
      frame={config}
      scale={scale}
      position={{ x, y }}
      sheetWidth={SHEET_SIZES.furniture.width}
      sheetHeight={SHEET_SIZES.furniture.height}
    />
  );
});

// Image-based tile rendering (used when LimeZu assets are available)
type TileSpriteType = keyof typeof TILE_SPRITES;

interface ImageTileProps {
  x: number;
  y: number;
  type: TileSpriteType;
  scale?: number;
}

const ImageTile = memo(({ x, y, type, scale = 1 }: ImageTileProps) => {
  if (!FURNITURE_SPRITES_ENABLED || !ASSET_PATHS.tiles) {
    return null;
  }

  const source = ASSET_PATHS.tiles as ImageSourcePropType;
  const config = TILE_SPRITES[type];

  if (!config) {
    return null;
  }

  return (
    <SpriteSheet
      source={source}
      frame={config}
      scale={scale}
      position={{ x, y }}
      sheetWidth={SHEET_SIZES.tiles.width}
      sheetHeight={SHEET_SIZES.tiles.height}
    />
  );
});

// Monitor component (detailed)
const Monitor = memo(({ x, y, scale = 1 }: { x: number; y: number; scale?: number }) => {
  // Use LimeZu sprite if available
  if (FURNITURE_SPRITES_ENABLED && ASSET_PATHS.furniture) {
    return <ImageFurniture x={x} y={y} type="monitorSingle" scale={scale} />;
  }

  // Fallback to Rect-based rendering
  return (
    <View style={{ position: 'absolute', left: x, top: y }}>
      {/* Monitor frame */}
      <Rect x={0} y={0} w={24 * scale} h={18 * scale} color={COLORS.monitorFrame} />
      {/* Screen */}
      <Rect x={2 * scale} y={2 * scale} w={20 * scale} h={12 * scale} color={COLORS.monitorScreen} />
      {/* Screen glow */}
      <Rect x={3 * scale} y={3 * scale} w={18 * scale} h={10 * scale} color={COLORS.monitorScreenOn} />
      {/* Stand */}
      <Rect x={10 * scale} y={18 * scale} w={4 * scale} h={4 * scale} color={COLORS.monitorStand} />
      <Rect x={6 * scale} y={22 * scale} w={12 * scale} h={2 * scale} color={COLORS.monitorStand} />
    </View>
  );
});

// Keyboard component
const Keyboard = memo(({ x, y, scale = 1 }: { x: number; y: number; scale?: number }) => (
  <View style={{ position: 'absolute', left: x, top: y }}>
    <Rect x={0} y={0} w={18 * scale} h={6 * scale} color={COLORS.monitorFrame} />
    <Rect x={1 * scale} y={1 * scale} w={16 * scale} h={4 * scale} color={'#555'} />
  </View>
));

// Desk with monitor and chair - complete workstation
const Workstation = memo(({ x, y, withChair = true }: { x: number; y: number; withChair?: boolean }) => {
  // Use LimeZu individual sprites - SCALED UP
  if (FURNITURE_SPRITES_ENABLED) {
    return (
      <View style={{ position: 'absolute', left: x, top: y }}>
        {/* Desk with legs */}
        <FurnitureSprite x={0} y={0} type="desk" scale={2} />
        {/* Monitor on desk */}
        <FurnitureSprite x={12} y={-30} type="monitor" scale={1.4} />
        {/* Chair in front of desk */}
        {withChair && <FurnitureSprite x={10} y={60} type="chairBlueFront" scale={1.6} />}
      </View>
    );
  }

  // Rect-based desk with LimeZu monitor
  return (
    <View style={{ position: 'absolute', left: x, top: y }}>
      {/* Desk */}
      <Rect x={0} y={0} w={40} h={26} color={COLORS.deskTop} />
      <Rect x={0} y={26} w={40} h={2} color={COLORS.deskShadow} />

      {/* LimeZu Monitor on desk - centered */}
      <FurnitureSprite x={-5} y={-58} type="monitor" scale={2.5} />

      {/* Desk legs */}
      <Rect x={3} y={28} w={3} h={5} color={COLORS.deskLeg} />
      <Rect x={34} y={28} w={3} h={5} color={COLORS.deskLeg} />
    </View>
  );
});

// Plant in pot
const Plant = memo(({ x, y, size = 1.5, large = false }: { x: number; y: number; size?: number; large?: boolean }) => {
  // Use LimeZu sprite if available - SCALED UP
  if (FURNITURE_SPRITES_ENABLED) {
    return <FurnitureSprite x={x} y={y} type="plant" scale={size * 1.5} />;
  }

  // Fallback to Rect-based rendering
  return (
    <View style={{ position: 'absolute', left: x, top: y }}>
      {/* Leaves */}
      <Rect x={6 * size} y={0} w={6 * size} h={6 * size} color={COLORS.plantGreen} />
      <Rect x={3 * size} y={3 * size} w={5 * size} h={8 * size} color={COLORS.plantGreen} />
      <Rect x={10 * size} y={3 * size} w={5 * size} h={8 * size} color={COLORS.plantGreen} />
      <Rect x={5 * size} y={6 * size} w={8 * size} h={6 * size} color={COLORS.plantDark} />
      {/* Pot */}
      <Rect x={5 * size} y={12 * size} w={8 * size} h={7 * size} color={COLORS.potBrown} />
      <Rect x={3 * size} y={10 * size} w={12 * size} h={3 * size} color={COLORS.potBrown} />
    </View>
  );
});

// Wall picture/chart
const WallPicture = memo(({ x, y, w, h, bgColor }: { x: number; y: number; w: number; h: number; bgColor: string }) => (
  <View style={{ position: 'absolute', left: x, top: y }}>
    {/* Frame */}
    <Rect x={0} y={0} w={w} h={h} color={COLORS.frameGold} />
    {/* Inner */}
    <Rect x={3} y={3} w={w - 6} h={h - 6} color={COLORS.frameWhite} />
    {/* Content color */}
    <Rect x={6} y={6} w={w - 12} h={h - 12} color={bgColor} />
  </View>
));

// Standing whiteboard (on floor)
const StandingWhiteboard = memo(({ x, y }: { x: number; y: number }) => {
  // Use LimeZu sprite if available - SCALED UP
  if (FURNITURE_SPRITES_ENABLED) {
    return <FurnitureSprite x={x} y={y} type="whiteboard" scale={2.5} />;
  }

  // Fallback to Rect-based rendering
  return (
    <View style={{ position: 'absolute', left: x, top: y }}>
      {/* Stand legs */}
      <Rect x={3} y={45} w={4} h={12} color={'#505050'} />
      <Rect x={38} y={45} w={4} h={12} color={'#505050'} />
      {/* Cross bar */}
      <Rect x={5} y={52} w={35} h={3} color={'#505050'} />
      {/* Board frame */}
      <Rect x={0} y={0} w={45} h={47} color={'#606060'} />
      {/* White surface */}
      <Rect x={3} y={3} w={39} h={41} color={'#F8F8F8'} />
      {/* Writing/diagrams */}
      <Rect x={6} y={7} w={18} h={2} color={'#3070B0'} />
      <Rect x={6} y={12} w={28} h={2} color={'#3070B0'} />
      <Rect x={6} y={17} w={15} h={2} color={'#3070B0'} />
      {/* Box diagram */}
      <Rect x={26} y={22} w={14} h={12} color={'#D05050'} />
      <Rect x={28} y={24} w={10} h={8} color={'#F8F8F8'} />
      {/* Arrow */}
      <Rect x={8} y={28} w={12} h={2} color={'#40A060'} />
      <Rect x={18} y={26} w={3} h={6} color={'#40A060'} />
      {/* Marker tray at bottom */}
      <Rect x={6} y={42} w={33} h={3} color={'#505050'} />
      <Rect x={8} y={40} w={6} h={3} color={'#D04040'} />
      <Rect x={17} y={40} w={6} h={3} color={'#4040D0'} />
      <Rect x={26} y={40} w={6} h={3} color={'#40A040'} />
    </View>
  );
});

// Bookshelf - smaller (using Rect fallback since we don't have bookshelf sprite yet)
const Bookshelf = memo(({ x, y }: { x: number; y: number }) => {
  // For now, use Rect-based rendering (no bookshelf sprite copied)
  // TODO: Copy bookshelf sprite if needed

  // Fallback to Rect-based rendering
  return (
    <View style={{ position: 'absolute', left: x, top: y }}>
      {/* Shelf frame */}
      <Rect x={0} y={0} w={32} h={35} color={COLORS.deskShadow} />
      {/* Shelf back */}
      <Rect x={2} y={2} w={28} h={31} color={COLORS.deskTop} />
      {/* Books row 1 */}
      <Rect x={4} y={4} w={4} h={8} color={COLORS.bookRed} />
      <Rect x={9} y={4} w={4} h={8} color={COLORS.bookBlue} />
      <Rect x={14} y={4} w={5} h={8} color={COLORS.bookGreen} />
      <Rect x={20} y={4} w={4} h={8} color={COLORS.bookYellow} />
      <Rect x={25} y={4} w={4} h={8} color={COLORS.bookRed} />
      {/* Shelf divider */}
      <Rect x={2} y={13} w={28} h={2} color={COLORS.deskShadow} />
      {/* Books row 2 */}
      <Rect x={4} y={17} w={5} h={7} color={COLORS.bookGreen} />
      <Rect x={10} y={17} w={4} h={7} color={COLORS.bookBlue} />
      <Rect x={15} y={17} w={5} h={7} color={COLORS.bookRed} />
      <Rect x={21} y={17} w={4} h={7} color={COLORS.bookYellow} />
      <Rect x={26} y={17} w={4} h={7} color={COLORS.bookBlue} />
      {/* Shelf divider */}
      <Rect x={2} y={25} w={28} h={2} color={COLORS.deskShadow} />
      {/* Items row 3 */}
      <Rect x={5} y={28} w={6} h={5} color={COLORS.plantGreen} />
      <Rect x={14} y={28} w={6} h={5} color={COLORS.bookBlue} />
      <Rect x={23} y={28} w={5} h={5} color={COLORS.picYellow} />
    </View>
  );
});

// Couch
const Couch = memo(({ x, y }: { x: number; y: number }) => {
  // Use LimeZu sprite if available - render as 3-piece couch - SCALED UP
  if (FURNITURE_SPRITES_ENABLED) {
    const scale = 1.8;
    return (
      <View style={{ position: 'absolute', left: x, top: y }}>
        <FurnitureSprite x={0} y={0} type="couchLeft" scale={scale} />
        <FurnitureSprite x={50} y={0} type="couchMid" scale={scale} />
        <FurnitureSprite x={100} y={0} type="couchRight" scale={scale} />
      </View>
    );
  }

  // Fallback to Rect-based rendering
  return (
    <View style={{ position: 'absolute', left: x, top: y }}>
      {/* Back */}
      <Rect x={0} y={0} w={60} h={10} color={COLORS.couchDark} />
      {/* Seat */}
      <Rect x={0} y={10} w={60} h={20} color={COLORS.couchBlue} />
      {/* Cushion lines */}
      <Rect x={20} y={12} w={2} h={16} color={COLORS.couchDark} />
      <Rect x={38} y={12} w={2} h={16} color={COLORS.couchDark} />
      {/* Arms */}
      <Rect x={-4} y={6} w={6} h={24} color={COLORS.couchDark} />
      <Rect x={58} y={6} w={6} h={24} color={COLORS.couchDark} />
    </View>
  );
});

// Water cooler
const WaterCooler = memo(({ x, y }: { x: number; y: number }) => {
  // Use LimeZu sprite if available - SCALED UP
  if (FURNITURE_SPRITES_ENABLED) {
    return <FurnitureSprite x={x} y={y} type="waterCooler" scale={2} />;
  }

  // Fallback to Rect-based rendering
  return (
    <View style={{ position: 'absolute', left: x, top: y }}>
      {/* Water jug */}
      <Rect x={4} y={0} w={12} h={16} color={COLORS.coolerWater} />
      <Rect x={6} y={-3} w={8} h={5} color={COLORS.coolerWater} />
      {/* Body */}
      <Rect x={1} y={16} w={18} h={26} color={COLORS.coolerBody} />
      <Rect x={0} y={20} w={20} h={3} color={COLORS.monitorFrame} />
      {/* Dispenser area */}
      <Rect x={5} y={30} w={10} h={10} color={COLORS.monitorFrame} />
      {/* Legs */}
      <Rect x={3} y={42} w={4} h={5} color={COLORS.monitorFrame} />
      <Rect x={13} y={42} w={4} h={5} color={COLORS.monitorFrame} />
    </View>
  );
});

export const TopDownOffice = memo(({ width = 420, height = 300 }: TopDownOfficeProps) => {
  const wallHeight = 55;
  const floorHeight = height - wallHeight;
  const workAreaWidth = width * 0.58;

  return (
    <View style={[styles.office, { width, height }]}>
      {/* WALL SECTION */}
      <View style={[styles.wall, { height: wallHeight, backgroundColor: COLORS.wallBg }]}>
        {/* Wall trim at bottom */}
        <Rect x={0} y={wallHeight - 4} w={width} h={4} color={COLORS.wallTrim} />

        {/* Bookshelf left */}
        <Bookshelf x={8} y={10} />

        {/* Colorful pictures */}
        <WallPicture x={50} y={8} w={30} h={24} bgColor={COLORS.picRed} />
        <WallPicture x={88} y={12} w={28} h={20} bgColor={COLORS.picBlue} />

        {/* CLAUDE HQ Sign */}
        <View style={[styles.sign, { left: width / 2 - 42, top: 14 }]}>
          <Text style={styles.signText}>CLAUDE HQ</Text>
        </View>

        {/* More pictures on right */}
        <WallPicture x={width - 120} y={10} w={28} h={22} bgColor={COLORS.picYellow} />
        <WallPicture x={width - 85} y={14} w={26} h={18} bgColor={COLORS.picGreen} />

        {/* Bookshelf right */}
        <Bookshelf x={width - 45} y={10} />
      </View>

      {/* FLOOR SECTION */}
      <View style={[styles.floor, { height: floorHeight }]}>
        {/* Work area - left side */}
        <View style={[styles.workArea, { width: workAreaWidth, backgroundColor: COLORS.floorTile }]}>
          {/* Grid pattern */}
          {Array.from({ length: Math.ceil(floorHeight / 20) }).map((_, i) => (
            <Rect key={`hg${i}`} x={0} y={i * 20} w={workAreaWidth} h={1} color={COLORS.floorGrid} />
          ))}
          {Array.from({ length: Math.ceil(workAreaWidth / 20) }).map((_, i) => (
            <Rect key={`vg${i}`} x={i * 20} y={0} w={1} h={floorHeight} color={COLORS.floorGrid} />
          ))}

          {/* Workstation row 1 - Two desks */}
          <Workstation x={12} y={10} />
          <Workstation x={62} y={10} />

          {/* Workstation row 2 - Two desks */}
          <Workstation x={12} y={75} />
          <Workstation x={62} y={75} />

          {/* Workstation row 3 - Two more desks */}
          <Workstation x={12} y={140} />
          <Workstation x={62} y={140} />

          {/* Standing whiteboard */}
          <StandingWhiteboard x={130} y={20} />

          {/* Third column desk */}
          <Workstation x={130} y={100} />

          {/* Plants in work area */}
          <Plant x={185} y={80} size={1.2} large={true} />
          <Plant x={200} y={180} size={1} />
        </View>

        {/* Divider */}
        <Rect x={workAreaWidth} y={0} w={2} h={floorHeight} color={COLORS.wallTrim} />

        {/* Lounge area - right side */}
        <View style={[styles.loungeArea, { left: workAreaWidth + 2, width: width - workAreaWidth - 2, backgroundColor: COLORS.carpet }]}>
          {/* Carpet texture */}
          {Array.from({ length: 4 }).map((_, i) => (
            <Rect
              key={`ct${i}`}
              x={10 + (i % 2) * 50}
              y={25 + Math.floor(i / 2) * 80}
              w={35} h={2}
              color={COLORS.carpetDark}
            />
          ))}

          {/* Water cooler */}
          <WaterCooler x={130} y={12} />

          {/* Couch */}
          <Couch x={15} y={100} />

          {/* Plants */}
          <Plant x={20} y={20} size={1.3} large={true} />
          <Plant x={115} y={170} size={1.1} large={true} />

          {/* Extra chair */}
          {FURNITURE_SPRITES_ENABLED ? (
            <FurnitureSprite x={80} y={45} type="chairBlueFront" scale={1.6} />
          ) : (
            <View style={{ position: 'absolute', left: 80, top: 45 }}>
              <Rect x={0} y={0} w={22} h={18} color={COLORS.chairBlue} />
              <Rect x={3} y={3} w={16} h={12} color={COLORS.chairSeat} />
              <Rect x={0} y={18} w={6} h={5} color={COLORS.chairBlueDark} />
              <Rect x={16} y={18} w={6} h={5} color={COLORS.chairBlueDark} />
            </View>
          )}
        </View>
      </View>
    </View>
  );
});

const styles = StyleSheet.create({
  office: {
    overflow: 'hidden',
    position: 'relative',
  },
  wall: {
    width: '100%',
    position: 'relative',
  },
  sign: {
    position: 'absolute',
    backgroundColor: '#F0ECF8',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 4,
    borderWidth: 3,
    borderColor: COLORS.wallTrim,
  },
  signText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#5070A0',
    fontFamily: 'monospace',
    letterSpacing: 2,
  },
  floor: {
    flexDirection: 'row',
    position: 'relative',
  },
  workArea: {
    position: 'relative',
    overflow: 'hidden',
  },
  loungeArea: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    overflow: 'hidden',
  },
});

export default TopDownOffice;
