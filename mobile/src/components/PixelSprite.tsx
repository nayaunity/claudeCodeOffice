import React, { memo } from 'react';
import { View, StyleSheet } from 'react-native';
import { PALETTE, PixelGrid } from '../assets/sprites';

interface PixelSpriteProps {
  sprite: PixelGrid;
  scale?: number;
  style?: object;
}

/**
 * Renders a pixel art sprite from a 2D color grid
 * Each cell in the grid maps to a color from PALETTE
 */
export const PixelSprite = memo(({ sprite, scale = 4, style }: PixelSpriteProps) => {
  const pixelSize = scale;
  const width = sprite[0]?.length || 0;
  const height = sprite.length;

  return (
    <View style={[styles.container, { width: width * pixelSize, height: height * pixelSize }, style]}>
      {sprite.map((row, y) => (
        <View key={y} style={styles.row}>
          {row.map((colorKey, x) => {
            if (!colorKey || colorKey === '') return (
              <View
                key={`${x}-${y}`}
                style={{ width: pixelSize, height: pixelSize }}
              />
            );

            const color = PALETTE[colorKey as keyof typeof PALETTE];
            return (
              <View
                key={`${x}-${y}`}
                style={{
                  width: pixelSize,
                  height: pixelSize,
                  backgroundColor: color,
                }}
              />
            );
          })}
        </View>
      ))}
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
  },
  row: {
    flexDirection: 'row',
  },
});

export default PixelSprite;
