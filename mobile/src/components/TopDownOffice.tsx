import React, { memo } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { OFFICE_PALETTE, TileGrid, OFFICE_SPRITES } from '../assets/officeSprites';

interface TopDownOfficeProps {
  scale?: number;
  width?: number;
  height?: number;
}

// Render a single sprite from a TileGrid
const Sprite = memo(({
  grid,
  scale,
  style
}: {
  grid: TileGrid;
  scale: number;
  style?: object;
}) => {
  const pixelSize = scale;
  const spriteWidth = grid[0]?.length || 0;
  const spriteHeight = grid.length;

  return (
    <View style={[{ width: spriteWidth * pixelSize, height: spriteHeight * pixelSize }, style]}>
      {grid.map((row, y) => (
        <View key={y} style={{ flexDirection: 'row' }}>
          {row.map((colorKey, x) => {
            if (!colorKey || colorKey === '') return (
              <View key={`${x}-${y}`} style={{ width: pixelSize, height: pixelSize }} />
            );
            const color = OFFICE_PALETTE[colorKey as keyof typeof OFFICE_PALETTE];
            return (
              <View
                key={`${x}-${y}`}
                style={{ width: pixelSize, height: pixelSize, backgroundColor: color }}
              />
            );
          })}
        </View>
      ))}
    </View>
  );
});

export const TopDownOffice = memo(({ scale = 2, width = 380, height = 280 }: TopDownOfficeProps) => {
  const wallHeight = 60;

  return (
    <View style={[styles.office, { width, height }]}>
      {/* Wall section at top */}
      <View style={[styles.wall, { height: wallHeight, backgroundColor: OFFICE_PALETTE.wallMid }]}>
        {/* Wall pattern - subtle stripes */}
        <View style={[styles.wallStripe, { top: 10, backgroundColor: OFFICE_PALETTE.wallLight }]} />
        <View style={[styles.wallStripe, { top: 25, backgroundColor: OFFICE_PALETTE.wallLight }]} />

        {/* Wall trim at bottom */}
        <View style={[styles.wallTrim, { backgroundColor: OFFICE_PALETTE.wallTrim }]} />

        {/* Wall decorations */}
        {/* Bookshelf on left */}
        <View style={{ position: 'absolute', left: 8, top: 8 }}>
          <Sprite grid={OFFICE_SPRITES.furniture.bookshelf} scale={scale * 0.5} />
        </View>

        {/* Chart in middle-left */}
        <View style={{ position: 'absolute', left: 90, top: 10 }}>
          <Sprite grid={OFFICE_SPRITES.furniture.wallChart} scale={scale * 0.55} />
        </View>

        {/* Sign */}
        <View style={[styles.sign, { left: width / 2 - 40, top: 15 }]}>
          <Text style={styles.signText}>CLAUDE HQ</Text>
        </View>

        {/* Another chart on right */}
        <View style={{ position: 'absolute', right: 60, top: 10 }}>
          <Sprite grid={OFFICE_SPRITES.furniture.wallChart} scale={scale * 0.5} />
        </View>

        {/* Bookshelf on right */}
        <View style={{ position: 'absolute', right: 8, top: 8 }}>
          <Sprite grid={OFFICE_SPRITES.furniture.bookshelf} scale={scale * 0.45} />
        </View>
      </View>

      {/* Floor area */}
      <View style={[styles.floorArea, { height: height - wallHeight }]}>
        {/* Left side - Work area with tiled floor */}
        <View style={[styles.workArea, { width: width * 0.55, backgroundColor: OFFICE_PALETTE.floorTile1 }]}>
          {/* Grid lines for tile effect */}
          {Array.from({ length: 12 }).map((_, i) => (
            <View
              key={`h${i}`}
              style={{
                position: 'absolute',
                left: 0,
                right: 0,
                top: i * 18,
                height: 1,
                backgroundColor: OFFICE_PALETTE.floorGrid,
                opacity: 0.5,
              }}
            />
          ))}
          {Array.from({ length: 14 }).map((_, i) => (
            <View
              key={`v${i}`}
              style={{
                position: 'absolute',
                top: 0,
                bottom: 0,
                left: i * 16,
                width: 1,
                backgroundColor: OFFICE_PALETTE.floorGrid,
                opacity: 0.5,
              }}
            />
          ))}

          {/* Desk Row 1 - Two desks */}
          <View style={{ position: 'absolute', left: 8, top: 15 }}>
            <Sprite grid={OFFICE_SPRITES.furniture.deskWithMonitor} scale={scale * 0.45} />
          </View>
          <View style={{ position: 'absolute', left: 85, top: 15 }}>
            <Sprite grid={OFFICE_SPRITES.furniture.deskWithMonitor} scale={scale * 0.45} />
          </View>

          {/* Desk Row 2 - Two desks */}
          <View style={{ position: 'absolute', left: 8, top: 80 }}>
            <Sprite grid={OFFICE_SPRITES.furniture.deskWithMonitor} scale={scale * 0.45} />
          </View>
          <View style={{ position: 'absolute', left: 85, top: 80 }}>
            <Sprite grid={OFFICE_SPRITES.furniture.deskWithMonitor} scale={scale * 0.45} />
          </View>

          {/* Desk Row 3 - Two more desks */}
          <View style={{ position: 'absolute', left: 8, top: 145 }}>
            <Sprite grid={OFFICE_SPRITES.furniture.deskWithMonitor} scale={scale * 0.45} />
          </View>
          <View style={{ position: 'absolute', left: 85, top: 145 }}>
            <Sprite grid={OFFICE_SPRITES.furniture.deskWithMonitor} scale={scale * 0.45} />
          </View>

          {/* Plant between desk rows */}
          <View style={{ position: 'absolute', left: 165, top: 50 }}>
            <Sprite grid={OFFICE_SPRITES.furniture.plant} scale={scale * 0.6} />
          </View>
        </View>

        {/* Divider line */}
        <View style={[styles.divider, { backgroundColor: OFFICE_PALETTE.wallTrim }]} />

        {/* Right side - Lounge area with carpet */}
        <View style={[styles.loungeArea, { width: width * 0.45, backgroundColor: OFFICE_PALETTE.carpetTan }]}>
          {/* Subtle carpet texture */}
          {Array.from({ length: 8 }).map((_, i) => (
            <View
              key={`ct${i}`}
              style={{
                position: 'absolute',
                left: 10 + (i % 4) * 35,
                top: 20 + Math.floor(i / 4) * 80,
                width: 30,
                height: 2,
                backgroundColor: OFFICE_PALETTE.carpetTanDark,
                opacity: 0.3,
              }}
            />
          ))}

          {/* Couch */}
          <View style={{ position: 'absolute', left: 15, top: 100 }}>
            <Sprite grid={OFFICE_SPRITES.furniture.couch} scale={scale * 0.45} />
          </View>

          {/* Water cooler */}
          <View style={{ position: 'absolute', right: 20, top: 10 }}>
            <Sprite grid={OFFICE_SPRITES.furniture.waterCooler} scale={scale * 0.7} />
          </View>

          {/* Plant near couch */}
          <View style={{ position: 'absolute', left: 10, top: 60 }}>
            <Sprite grid={OFFICE_SPRITES.furniture.plant} scale={scale * 0.65} />
          </View>

          {/* Plant in corner */}
          <View style={{ position: 'absolute', right: 15, bottom: 15 }}>
            <Sprite grid={OFFICE_SPRITES.furniture.plant} scale={scale * 0.7} />
          </View>

          {/* Extra chair */}
          <View style={{ position: 'absolute', right: 50, top: 50 }}>
            <Sprite grid={OFFICE_SPRITES.furniture.chair} scale={scale * 0.7} />
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
  wallStripe: {
    position: 'absolute',
    left: 0,
    right: 0,
    height: 3,
    opacity: 0.5,
  },
  wallTrim: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 4,
  },
  sign: {
    position: 'absolute',
    backgroundColor: '#E8E0F0',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 2,
    borderWidth: 2,
    borderColor: '#9890A8',
  },
  signText: {
    fontSize: 11,
    fontWeight: 'bold',
    color: '#5070A0',
    fontFamily: 'monospace',
    letterSpacing: 1,
  },
  floorArea: {
    flex: 1,
    flexDirection: 'row',
  },
  workArea: {
    position: 'relative',
    overflow: 'hidden',
  },
  divider: {
    width: 2,
    height: '100%',
  },
  loungeArea: {
    position: 'relative',
    overflow: 'hidden',
  },
});

export default TopDownOffice;
