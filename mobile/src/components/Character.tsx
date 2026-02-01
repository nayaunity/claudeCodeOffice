import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Animated, Easing } from 'react-native';
import { CharacterState } from '../types';
import { getLocationPosition, LOCATIONS } from '../utils/locations';

interface CharacterProps {
  state: CharacterState;
}

// Character size
const CHARACTER_SIZE = 32;

// Colors for different actions
const ACTION_COLORS: Record<string, string> = {
  walking: '#4dabf7',      // Blue
  typing: '#69db7c',       // Green
  'typing-green': '#20c997', // Teal (terminal)
  reading: '#ffd43b',      // Yellow
  searching: '#da77f2',    // Purple
  scrolling: '#74c0fc',    // Light blue
  thinking: '#ff922b',     // Orange
  waiting: '#fcc419',      // Gold
  celebrating: '#51cf66',  // Bright green
  frustrated: '#ff6b6b',   // Red
  phone: '#e599f7',        // Pink
  'coffee-sip': '#a0522d', // Brown
  idle: '#868e96',         // Gray
};

export function Character({ state }: CharacterProps) {
  const bounceAnim = useRef(new Animated.Value(0)).current;
  const walkAnim = useRef(new Animated.Value(0)).current;
  const flashAnim = useRef(new Animated.Value(0)).current;

  // Get static position when not walking
  const staticPosition = getLocationPosition(state.currentLocation);

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
    if (state.currentAction === 'frustrated') {
      // Flash red
      const flash = Animated.loop(
        Animated.sequence([
          Animated.timing(flashAnim, {
            toValue: 1,
            duration: 100,
            useNativeDriver: true,
          }),
          Animated.timing(flashAnim, {
            toValue: 0,
            duration: 100,
            useNativeDriver: true,
          }),
        ]),
        { iterations: 5 }
      );
      flash.start();
    } else if (state.currentAction === 'celebrating') {
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
    } else if (state.currentAction === 'typing' || state.currentAction === 'typing-green') {
      // Subtle typing movement
      const type = Animated.loop(
        Animated.sequence([
          Animated.timing(bounceAnim, {
            toValue: -1,
            duration: 80,
            useNativeDriver: true,
          }),
          Animated.timing(bounceAnim, {
            toValue: 1,
            duration: 80,
            useNativeDriver: true,
          }),
        ])
      );
      type.start();
      return () => type.stop();
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
    } else if (state.currentAction === 'waiting') {
      // Wave animation
      const wave = Animated.loop(
        Animated.sequence([
          Animated.timing(bounceAnim, {
            toValue: -3,
            duration: 200,
            useNativeDriver: true,
          }),
          Animated.timing(bounceAnim, {
            toValue: 3,
            duration: 200,
            useNativeDriver: true,
          }),
        ])
      );
      wave.start();
      return () => wave.stop();
    }
  }, [state.currentAction]);

  const color = ACTION_COLORS[state.currentAction] || '#868e96';

  // Calculate animated position for walking
  const animatedX = state.isWalking && state.targetLocation
    ? walkAnim.interpolate({
        inputRange: [0, 1],
        outputRange: [
          LOCATIONS[state.currentLocation].position.x - CHARACTER_SIZE / 2,
          LOCATIONS[state.targetLocation].position.x - CHARACTER_SIZE / 2,
        ],
      })
    : staticPosition.x - CHARACTER_SIZE / 2;

  const animatedY = state.isWalking && state.targetLocation
    ? walkAnim.interpolate({
        inputRange: [0, 1],
        outputRange: [
          LOCATIONS[state.currentLocation].position.y - CHARACTER_SIZE / 2,
          LOCATIONS[state.targetLocation].position.y - CHARACTER_SIZE / 2,
        ],
      })
    : staticPosition.y - CHARACTER_SIZE / 2;

  return (
    <Animated.View
      style={[
        styles.character,
        {
          left: animatedX,
          top: animatedY,
          transform: [{ translateY: bounceAnim }],
        },
      ]}
    >
      {/* Character body - placeholder rectangle */}
      <Animated.View
        style={[
          styles.body,
          {
            backgroundColor: color,
            opacity: flashAnim.interpolate({
              inputRange: [0, 1],
              outputRange: [1, 0.5],
            }),
          },
        ]}
      />
      {/* Face */}
      <View style={styles.face}>
        <View style={styles.eye} />
        <View style={styles.eye} />
      </View>
      {/* Action indicator */}
      {state.currentAction === 'typing-green' && (
        <View style={styles.terminalGlow} />
      )}
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  character: {
    position: 'absolute',
    width: CHARACTER_SIZE,
    height: CHARACTER_SIZE,
  },
  body: {
    width: CHARACTER_SIZE,
    height: CHARACTER_SIZE,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: '#1a1a2e',
  },
  face: {
    position: 'absolute',
    top: 8,
    left: 4,
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: CHARACTER_SIZE - 8,
  },
  eye: {
    width: 6,
    height: 6,
    backgroundColor: '#1a1a2e',
    borderRadius: 3,
  },
  terminalGlow: {
    position: 'absolute',
    width: CHARACTER_SIZE + 8,
    height: CHARACTER_SIZE + 8,
    left: -4,
    top: -4,
    borderRadius: 8,
    backgroundColor: 'rgba(32, 201, 151, 0.3)',
    zIndex: -1,
  },
});
