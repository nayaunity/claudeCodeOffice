import React, { memo } from 'react';
import { View, StyleSheet } from 'react-native';
import { PixelSprite } from './PixelSprite';
import { AnimatedSprite } from './AnimatedSprite';
import SPRITES, { PALETTE } from '../assets/sprites';

export type ClaudeState = 'idle' | 'typing' | 'reading' | 'thinking' | 'celebrating' | 'frustrated' | 'waving';

interface PixelOfficeSceneProps {
  claudeState: ClaudeState;
  showHelper?: boolean;
  scale?: number;
}

/**
 * Pixel art office scene with Claude character and furniture
 * Uses programmatic pixel sprites for all graphics
 */
export const PixelOfficeScene = memo(({
  claudeState = 'idle',
  showHelper = false,
  scale = 3
}: PixelOfficeSceneProps) => {

  const renderClaude = () => {
    const sprites = SPRITES.claude;

    switch (claudeState) {
      case 'typing':
        return <AnimatedSprite frames={sprites.typing} frameRate={4} scale={scale} />;
      case 'waving':
        return <AnimatedSprite frames={sprites.waving} frameRate={3} scale={scale} />;
      case 'reading':
        return <PixelSprite sprite={sprites.reading} scale={scale} />;
      case 'thinking':
        return <PixelSprite sprite={sprites.thinking} scale={scale} />;
      case 'celebrating':
        return <PixelSprite sprite={sprites.celebrating} scale={scale} />;
      case 'frustrated':
        return <PixelSprite sprite={sprites.frustrated} scale={scale} />;
      case 'idle':
      default:
        return <PixelSprite sprite={sprites.idle} scale={scale} />;
    }
  };

  return (
    <View style={[styles.scene, { backgroundColor: PALETTE.wall }]}>
      {/* Floor */}
      <View style={[styles.floor, { backgroundColor: PALETTE.floor }]} />

      {/* Wall decorations layer */}
      <View style={styles.wallLayer}>
        {/* Whiteboard on left wall */}
        <View style={styles.whiteboard}>
          <PixelSprite sprite={SPRITES.furniture.whiteboard} scale={scale} />
        </View>
      </View>

      {/* Furniture layer */}
      <View style={styles.furnitureLayer}>
        {/* Coffee machine on the right */}
        <View style={styles.coffeeArea}>
          <PixelSprite sprite={SPRITES.furniture.coffeeMachine} scale={scale} />
        </View>

        {/* Plant decoration */}
        <View style={styles.plantArea}>
          <PixelSprite sprite={SPRITES.furniture.plant} scale={scale} />
        </View>

        {/* Another plant on the right */}
        <View style={styles.plantAreaRight}>
          <PixelSprite sprite={SPRITES.furniture.plant} scale={scale} />
        </View>
      </View>

      {/* Desk layer */}
      <View style={styles.deskLayer}>
        <PixelSprite sprite={SPRITES.furniture.desk} scale={scale} />
      </View>

      {/* Character layer */}
      <View style={styles.characterLayer}>
        {/* Main character - Claude */}
        <View style={styles.claudePosition}>
          {renderClaude()}
        </View>

        {/* Helper character for subagents */}
        {showHelper && (
          <View style={styles.helperPosition}>
            <PixelSprite sprite={SPRITES.helper.idle} scale={scale * 0.8} />
          </View>
        )}
      </View>
    </View>
  );
});

const styles = StyleSheet.create({
  scene: {
    width: '100%',
    aspectRatio: 16 / 9,
    position: 'relative',
    overflow: 'hidden',
  },
  floor: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '35%',
  },
  wallLayer: {
    position: 'absolute',
    top: 20,
    left: 0,
    right: 0,
  },
  whiteboard: {
    position: 'absolute',
    left: 20,
    top: 10,
  },
  furnitureLayer: {
    position: 'absolute',
    bottom: '35%',
    left: 0,
    right: 0,
  },
  coffeeArea: {
    position: 'absolute',
    right: 30,
    bottom: 10,
  },
  plantArea: {
    position: 'absolute',
    left: 30,
    bottom: 10,
  },
  plantAreaRight: {
    position: 'absolute',
    right: 100,
    bottom: 10,
  },
  deskLayer: {
    position: 'absolute',
    bottom: '25%',
    left: '50%',
    transform: [{ translateX: -48 * 3 }], // center the desk
  },
  characterLayer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '100%',
  },
  claudePosition: {
    position: 'absolute',
    bottom: '30%',
    left: '50%',
    transform: [{ translateX: -24 }], // center character
  },
  helperPosition: {
    position: 'absolute',
    bottom: '32%',
    right: '20%',
  },
});

export default PixelOfficeScene;
