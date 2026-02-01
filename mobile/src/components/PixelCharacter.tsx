import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Animated, Easing } from 'react-native';
import { CharacterState, CharacterAction } from '../types';
import { getLocationPosition, LOCATIONS } from '../utils/locations';
import { PixelSprite } from './PixelSprite';
import { AnimatedSprite } from './AnimatedSprite';
import SPRITES, { PixelGrid } from '../assets/sprites';

interface PixelCharacterProps {
  state: CharacterState;
  scale?: number;
}

// Character size based on sprite (16x24 at scale 3 = 48x72)
const SPRITE_SCALE = 2;
const CHARACTER_WIDTH = 16 * SPRITE_SCALE;
const CHARACTER_HEIGHT = 24 * SPRITE_SCALE;

// Map CharacterAction to sprite
function getSprite(action: CharacterAction): PixelGrid | PixelGrid[] {
  const sprites = SPRITES.claude;

  switch (action) {
    case 'typing':
    case 'typing-green':
      return sprites.typing; // Returns array for animation
    case 'reading':
    case 'scrolling':
    case 'searching':
      return sprites.reading;
    case 'thinking':
      return sprites.thinking;
    case 'celebrating':
      return sprites.celebrating;
    case 'frustrated':
      return sprites.frustrated;
    case 'waiting':
    case 'phone':
      return sprites.waving; // Returns array for animation
    case 'walking':
    case 'idle':
    case 'coffee-sip':
    default:
      return sprites.idle;
  }
}

function isAnimatedAction(action: CharacterAction): boolean {
  return ['typing', 'typing-green', 'waiting', 'phone'].includes(action);
}

export function PixelCharacter({ state, scale = SPRITE_SCALE }: PixelCharacterProps) {
  const bounceAnim = useRef(new Animated.Value(0)).current;
  const walkAnim = useRef(new Animated.Value(0)).current;

  // Get static position when not walking
  const staticPosition = getLocationPosition(state.currentLocation);

  const charWidth = 16 * scale;
  const charHeight = 24 * scale;

  // Walking animation
  useEffect(() => {
    if (state.isWalking) {
      walkAnim.setValue(0);
      Animated.timing(walkAnim, {
        toValue: 1,
        duration: 800,
        easing: Easing.inOut(Easing.ease),
        useNativeDriver: true,
      }).start();

      // Bounce while walking
      const bounce = Animated.loop(
        Animated.sequence([
          Animated.timing(bounceAnim, {
            toValue: -4,
            duration: 150,
            useNativeDriver: true,
          }),
          Animated.timing(bounceAnim, {
            toValue: 0,
            duration: 150,
            useNativeDriver: true,
          }),
        ])
      );
      bounce.start();

      return () => bounce.stop();
    } else {
      bounceAnim.setValue(0);
    }
  }, [state.isWalking]);

  // Action-specific animations
  useEffect(() => {
    if (state.currentAction === 'celebrating') {
      // Jump animation
      const jump = Animated.sequence([
        Animated.timing(bounceAnim, {
          toValue: -15,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(bounceAnim, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(bounceAnim, {
          toValue: -10,
          duration: 150,
          useNativeDriver: true,
        }),
        Animated.timing(bounceAnim, {
          toValue: 0,
          duration: 150,
          useNativeDriver: true,
        }),
      ]);
      jump.start();
    } else if (state.currentAction === 'thinking') {
      // Slow sway
      const sway = Animated.loop(
        Animated.sequence([
          Animated.timing(bounceAnim, {
            toValue: -2,
            duration: 800,
            useNativeDriver: true,
          }),
          Animated.timing(bounceAnim, {
            toValue: 2,
            duration: 800,
            useNativeDriver: true,
          }),
        ])
      );
      sway.start();
      return () => sway.stop();
    } else if (state.currentAction === 'coffee-sip') {
      // Occasional sip
      const sip = Animated.loop(
        Animated.sequence([
          Animated.delay(2000),
          Animated.timing(bounceAnim, {
            toValue: -3,
            duration: 300,
            useNativeDriver: true,
          }),
          Animated.timing(bounceAnim, {
            toValue: 0,
            duration: 300,
            useNativeDriver: true,
          }),
        ])
      );
      sip.start();
      return () => sip.stop();
    }
  }, [state.currentAction]);

  // Calculate animated position for walking
  const animatedX = state.isWalking && state.targetLocation
    ? walkAnim.interpolate({
        inputRange: [0, 1],
        outputRange: [
          LOCATIONS[state.currentLocation].position.x - charWidth / 2,
          LOCATIONS[state.targetLocation].position.x - charWidth / 2,
        ],
      })
    : staticPosition.x - charWidth / 2;

  const animatedY = state.isWalking && state.targetLocation
    ? walkAnim.interpolate({
        inputRange: [0, 1],
        outputRange: [
          LOCATIONS[state.currentLocation].position.y - charHeight / 2,
          LOCATIONS[state.targetLocation].position.y - charHeight / 2,
        ],
      })
    : staticPosition.y - charHeight / 2;

  const sprite = getSprite(state.currentAction);
  const isAnimated = isAnimatedAction(state.currentAction) && Array.isArray(sprite);

  return (
    <Animated.View
      style={[
        styles.character,
        {
          width: charWidth,
          height: charHeight,
          left: animatedX,
          top: animatedY,
          transform: [{ translateY: bounceAnim }],
        },
      ]}
    >
      {isAnimated ? (
        <AnimatedSprite
          frames={sprite as PixelGrid[]}
          frameRate={state.currentAction === 'typing' || state.currentAction === 'typing-green' ? 4 : 3}
          scale={scale}
        />
      ) : (
        <PixelSprite sprite={sprite as PixelGrid} scale={scale} />
      )}

      {/* Terminal glow effect for typing-green */}
      {state.currentAction === 'typing-green' && (
        <View style={[styles.terminalGlow, { width: charWidth + 8, height: charHeight + 8 }]} />
      )}
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  character: {
    position: 'absolute',
  },
  terminalGlow: {
    position: 'absolute',
    left: -4,
    top: -4,
    borderRadius: 8,
    backgroundColor: 'rgba(32, 201, 151, 0.3)',
    zIndex: -1,
  },
});

export default PixelCharacter;
