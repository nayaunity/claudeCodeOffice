import React, { memo } from 'react';
import { View, StyleSheet, Text } from 'react-native';

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

// Simple rectangle component
const Rect = ({ x, y, w, h, color }: { x: number; y: number; w: number; h: number; color: string }) => (
  <View style={{ position: 'absolute', left: x, top: y, width: w, height: h, backgroundColor: color }} />
);

// Monitor component (detailed)
const Monitor = memo(({ x, y, scale = 1 }: { x: number; y: number; scale?: number }) => (
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
));

// Keyboard component
const Keyboard = memo(({ x, y, scale = 1 }: { x: number; y: number; scale?: number }) => (
  <View style={{ position: 'absolute', left: x, top: y }}>
    <Rect x={0} y={0} w={18 * scale} h={6 * scale} color={COLORS.monitorFrame} />
    <Rect x={1 * scale} y={1 * scale} w={16 * scale} h={4 * scale} color={'#555'} />
  </View>
));

// Complete desk with monitor, keyboard, chair
const Workstation = memo(({ x, y, facing = 'down' }: { x: number; y: number; facing?: 'up' | 'down' }) => {
  const scale = 1.2;

  if (facing === 'down') {
    return (
      <View style={{ position: 'absolute', left: x, top: y }}>
        {/* Chair at top (person sits here facing down) */}
        <Rect x={12} y={0} w={36} h={8} color={COLORS.chairBlueDark} />
        <Rect x={8} y={8} w={44} h={28} color={COLORS.chairBlue} />
        <Rect x={12} y={12} w={36} h={20} color={COLORS.chairSeat} />

        {/* Desk */}
        <Rect x={0} y={40} w={60} h={35} color={COLORS.deskTop} />
        <Rect x={0} y={75} w={60} h={4} color={COLORS.deskShadow} />

        {/* Monitor on desk */}
        <Monitor x={18} y={42} scale={scale} />

        {/* Keyboard */}
        <Keyboard x={20} y={70} scale={scale} />

        {/* Desk legs */}
        <Rect x={4} y={79} w={6} h={12} color={COLORS.deskLeg} />
        <Rect x={50} y={79} w={6} h={12} color={COLORS.deskLeg} />
      </View>
    );
  } else {
    // Facing up - monitor at bottom, chair at top
    return (
      <View style={{ position: 'absolute', left: x, top: y }}>
        {/* Desk */}
        <Rect x={0} y={0} w={60} h={35} color={COLORS.deskTop} />
        <Rect x={0} y={35} w={60} h={4} color={COLORS.deskShadow} />

        {/* Monitor on desk (facing up/toward viewer) */}
        <View style={{ position: 'absolute', left: 18, top: 8 }}>
          <Rect x={0} y={0} w={24 * scale} h={4 * scale} color={COLORS.monitorStand} />
          <Rect x={10 * scale} y={-14 * scale} w={4 * scale} h={14 * scale} color={COLORS.monitorStand} />
          <Rect x={0} y={-32 * scale} w={24 * scale} h={18 * scale} color={COLORS.monitorFrame} />
          <Rect x={2 * scale} y={-30 * scale} w={20 * scale} h={12 * scale} color={COLORS.monitorFrame} />
        </View>

        {/* Keyboard */}
        <Keyboard x={20} y={26} scale={scale} />

        {/* Chair at bottom */}
        <Rect x={8} y={43} w={44} h={28} color={COLORS.chairBlue} />
        <Rect x={12} y={47} w={36} h={20} color={COLORS.chairSeat} />
        <Rect x={12} y={71} w={36} h={8} color={COLORS.chairBlueDark} />

        {/* Desk legs */}
        <Rect x={4} y={39} w={6} h={4} color={COLORS.deskLeg} />
        <Rect x={50} y={39} w={6} h={4} color={COLORS.deskLeg} />
      </View>
    );
  }
});

// Plant in pot
const Plant = memo(({ x, y, size = 1 }: { x: number; y: number; size?: number }) => (
  <View style={{ position: 'absolute', left: x, top: y }}>
    {/* Leaves */}
    <Rect x={8 * size} y={0} w={8 * size} h={8 * size} color={COLORS.plantGreen} />
    <Rect x={4 * size} y={4 * size} w={6 * size} h={10 * size} color={COLORS.plantGreen} />
    <Rect x={14 * size} y={4 * size} w={6 * size} h={10 * size} color={COLORS.plantGreen} />
    <Rect x={6 * size} y={8 * size} w={12 * size} h={8 * size} color={COLORS.plantDark} />
    {/* Pot */}
    <Rect x={6 * size} y={16 * size} w={12 * size} h={10 * size} color={COLORS.potBrown} />
    <Rect x={4 * size} y={14 * size} w={16 * size} h={4 * size} color={COLORS.potBrown} />
  </View>
));

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
const StandingWhiteboard = memo(({ x, y }: { x: number; y: number }) => (
  <View style={{ position: 'absolute', left: x, top: y }}>
    {/* Stand legs */}
    <Rect x={5} y={70} w={6} h={20} color={'#505050'} />
    <Rect x={59} y={70} w={6} h={20} color={'#505050'} />
    {/* Cross bar */}
    <Rect x={8} y={80} w={54} h={4} color={'#505050'} />
    {/* Board frame */}
    <Rect x={0} y={0} w={70} h={72} color={'#606060'} />
    {/* White surface */}
    <Rect x={4} y={4} w={62} h={64} color={'#F8F8F8'} />
    {/* Writing/diagrams */}
    <Rect x={8} y={10} w={30} h={3} color={'#3070B0'} />
    <Rect x={8} y={18} w={45} h={3} color={'#3070B0'} />
    <Rect x={8} y={26} w={25} h={3} color={'#3070B0'} />
    {/* Box diagram */}
    <Rect x={40} y={35} w={22} h={18} color={'#D05050'} />
    <Rect x={43} y={38} w={16} h={12} color={'#F8F8F8'} />
    {/* Arrow */}
    <Rect x={12} y={45} w={20} h={3} color={'#40A060'} />
    <Rect x={28} y={42} w={4} h={9} color={'#40A060'} />
    {/* Marker tray at bottom */}
    <Rect x={8} y={66} w={54} h={5} color={'#505050'} />
    <Rect x={12} y={63} w={10} h={5} color={'#D04040'} />
    <Rect x={26} y={63} w={10} h={5} color={'#4040D0'} />
    <Rect x={40} y={63} w={10} h={5} color={'#40A040'} />
  </View>
));

// Bookshelf
const Bookshelf = memo(({ x, y }: { x: number; y: number }) => (
  <View style={{ position: 'absolute', left: x, top: y }}>
    {/* Shelf frame */}
    <Rect x={0} y={0} w={50} h={50} color={COLORS.deskShadow} />
    {/* Shelf back */}
    <Rect x={2} y={2} w={46} h={46} color={COLORS.deskTop} />
    {/* Books row 1 */}
    <Rect x={4} y={4} w={6} h={12} color={COLORS.bookRed} />
    <Rect x={11} y={4} w={5} h={12} color={COLORS.bookBlue} />
    <Rect x={17} y={4} w={7} h={12} color={COLORS.bookGreen} />
    <Rect x={25} y={4} w={5} h={12} color={COLORS.bookYellow} />
    <Rect x={31} y={4} w={6} h={12} color={COLORS.bookRed} />
    <Rect x={38} y={4} w={8} h={12} color={COLORS.bookBlue} />
    {/* Shelf divider */}
    <Rect x={2} y={17} w={46} h={3} color={COLORS.deskShadow} />
    {/* Books row 2 */}
    <Rect x={4} y={22} w={8} h={11} color={COLORS.bookGreen} />
    <Rect x={13} y={22} w={6} h={11} color={COLORS.bookYellow} />
    <Rect x={20} y={22} w={5} h={11} color={COLORS.bookRed} />
    <Rect x={26} y={22} w={7} h={11} color={COLORS.bookBlue} />
    <Rect x={34} y={22} w={6} h={11} color={COLORS.bookGreen} />
    <Rect x={41} y={22} w={5} h={11} color={COLORS.bookRed} />
    {/* Shelf divider */}
    <Rect x={2} y={34} w={46} h={3} color={COLORS.deskShadow} />
    {/* Items row 3 */}
    <Rect x={5} y={39} w={10} h={8} color={COLORS.plantGreen} />
    <Rect x={20} y={39} w={12} h={8} color={COLORS.bookBlue} />
    <Rect x={36} y={39} w={8} h={8} color={COLORS.picYellow} />
  </View>
));

// Couch
const Couch = memo(({ x, y }: { x: number; y: number }) => (
  <View style={{ position: 'absolute', left: x, top: y }}>
    {/* Back */}
    <Rect x={0} y={0} w={90} h={15} color={COLORS.couchDark} />
    {/* Seat */}
    <Rect x={0} y={15} w={90} h={30} color={COLORS.couchBlue} />
    {/* Cushion lines */}
    <Rect x={30} y={18} w={2} h={24} color={COLORS.couchDark} />
    <Rect x={58} y={18} w={2} h={24} color={COLORS.couchDark} />
    {/* Arms */}
    <Rect x={-5} y={10} w={8} h={35} color={COLORS.couchDark} />
    <Rect x={87} y={10} w={8} h={35} color={COLORS.couchDark} />
  </View>
));

// Water cooler
const WaterCooler = memo(({ x, y }: { x: number; y: number }) => (
  <View style={{ position: 'absolute', left: x, top: y }}>
    {/* Water jug */}
    <Rect x={6} y={0} w={18} h={25} color={COLORS.coolerWater} />
    <Rect x={10} y={-5} w={10} h={8} color={COLORS.coolerWater} />
    {/* Body */}
    <Rect x={2} y={25} w={26} h={40} color={COLORS.coolerBody} />
    <Rect x={0} y={30} w={30} h={5} color={COLORS.monitorFrame} />
    {/* Dispenser area */}
    <Rect x={8} y={45} w={14} h={15} color={COLORS.monitorFrame} />
    {/* Legs */}
    <Rect x={4} y={65} w={6} h={8} color={COLORS.monitorFrame} />
    <Rect x={20} y={65} w={6} h={8} color={COLORS.monitorFrame} />
  </View>
));

export const TopDownOffice = memo(({ width = 500, height = 380 }: TopDownOfficeProps) => {
  const wallHeight = 80;
  const floorHeight = height - wallHeight;
  const workAreaWidth = width * 0.58;

  return (
    <View style={[styles.office, { width, height }]}>
      {/* WALL SECTION */}
      <View style={[styles.wall, { height: wallHeight, backgroundColor: COLORS.wallBg }]}>
        {/* Wall trim at bottom */}
        <Rect x={0} y={wallHeight - 6} w={width} h={6} color={COLORS.wallTrim} />

        {/* Bookshelf left */}
        <Bookshelf x={10} y={15} />

        {/* Colorful pictures */}
        <WallPicture x={70} y={12} w={45} h={35} bgColor={COLORS.picRed} />
        <WallPicture x={125} y={18} w={40} h={30} bgColor={COLORS.picBlue} />

        {/* CLAUDE HQ Sign */}
        <View style={[styles.sign, { left: width / 2 - 55, top: 22 }]}>
          <Text style={styles.signText}>CLAUDE HQ</Text>
        </View>

        {/* More pictures on right */}
        <WallPicture x={width - 170} y={15} w={42} h={32} bgColor={COLORS.picYellow} />
        <WallPicture x={width - 120} y={20} w={38} h={28} bgColor={COLORS.picGreen} />

        {/* Bookshelf right */}
        <Bookshelf x={width - 60} y={15} />
      </View>

      {/* FLOOR SECTION */}
      <View style={[styles.floor, { height: floorHeight }]}>
        {/* Work area - left side */}
        <View style={[styles.workArea, { width: workAreaWidth, backgroundColor: COLORS.floorTile }]}>
          {/* Grid pattern */}
          {Array.from({ length: Math.ceil(floorHeight / 25) }).map((_, i) => (
            <Rect key={`hg${i}`} x={0} y={i * 25} w={workAreaWidth} h={1} color={COLORS.floorGrid} />
          ))}
          {Array.from({ length: Math.ceil(workAreaWidth / 25) }).map((_, i) => (
            <Rect key={`vg${i}`} x={i * 25} y={0} w={1} h={floorHeight} color={COLORS.floorGrid} />
          ))}

          {/* Workstation cluster 1 - Two desks facing each other */}
          <Workstation x={15} y={15} facing="down" />
          <Workstation x={90} y={15} facing="down" />

          {/* Workstation cluster 2 */}
          <Workstation x={15} y={130} facing="down" />
          <Workstation x={90} y={130} facing="down" />

          {/* Standing whiteboard for thinking/planning */}
          <StandingWhiteboard x={200} y={15} />

          {/* Plants in work area */}
          <Plant x={170} y={130} size={1.5} />
          <Plant x={255} y={200} size={1.3} />
        </View>

        {/* Divider */}
        <Rect x={workAreaWidth} y={0} w={3} h={floorHeight} color={COLORS.wallTrim} />

        {/* Lounge area - right side */}
        <View style={[styles.loungeArea, { left: workAreaWidth + 3, width: width - workAreaWidth - 3, backgroundColor: COLORS.carpet }]}>
          {/* Carpet texture */}
          {Array.from({ length: 6 }).map((_, i) => (
            <Rect
              key={`ct${i}`}
              x={15 + (i % 3) * 55}
              y={30 + Math.floor(i / 3) * 100}
              w={40} h={3}
              color={COLORS.carpetDark}
            />
          ))}

          {/* Water cooler */}
          <WaterCooler x={145} y={15} />

          {/* Couch */}
          <Couch x={15} y={130} />

          {/* Plants */}
          <Plant x={25} y={30} size={1.8} />
          <Plant x={130} y={220} size={1.5} />

          {/* Extra chair */}
          <View style={{ position: 'absolute', left: 100, top: 60 }}>
            <Rect x={0} y={0} w={30} h={25} color={COLORS.chairBlue} />
            <Rect x={4} y={4} w={22} h={18} color={COLORS.chairSeat} />
            <Rect x={0} y={25} w={8} h={8} color={COLORS.chairBlueDark} />
            <Rect x={22} y={25} w={8} h={8} color={COLORS.chairBlueDark} />
          </View>
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
