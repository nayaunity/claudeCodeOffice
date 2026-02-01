import React, { useEffect, useRef, memo } from 'react';
import { View, Animated, Easing } from 'react-native';
import { CharacterState, CharacterAction } from '../types';
import { OFFICE_PALETTE, TileGrid, OFFICE_SPRITES } from '../assets/officeSprites';

interface TopDownCharacterProps {
  state: CharacterState;
  scale?: number;
  // Position in the office (pixel coordinates)
  position?: { x: number; y: number };
}

// Render a sprite
const Sprite = memo(({
  grid,
  scale,
}: {
  grid: TileGrid;
  scale: number;
}) => {
  const pixelSize = scale;
  const width = grid[0]?.length || 0;
  const height = grid.length;

  return (
    <View style={{ width: width * pixelSize, height: height * pixelSize }}>
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

// Animated sprite that cycles through frames
const AnimatedSprite = memo(({
  frames,
  frameRate = 4,
  scale,
}: {
  frames: TileGrid[];
  frameRate?: number;
  scale: number;
}) => {
  const [currentFrame, setCurrentFrame] = React.useState(0);

  useEffect(() => {
    if (frames.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentFrame(prev => (prev + 1) % frames.length);
    }, 1000 / frameRate);

    return () => clearInterval(interval);
  }, [frames.length, frameRate]);

  return <Sprite grid={frames[currentFrame]} scale={scale} />;
});

// Map action to position in the office
// Positions calculated to sit character IN the desk chair
// Office: Wall=60px height, Floor below that
// Desk sprite (32x24 at 0.9 scale = 29x22): chair is at bottom rows 16-21
// Desk positions: Row1 y=75, Row2 y=140, Row3 y=205 (absolute)
// Desk x positions: Desk1 x=8, Desk2 x=85
// Character sprite: 12x16 at scale 2 = 24x32

function getDeskPosition(action: CharacterAction): { x: number; y: number } {
  // Desk 1 chair position: x=8+14.5-12=10.5, y=75+14=89
  // Adjusted to overlap with chair sprite perfectly
  const desk1Chair = { x: 12, y: 88 };
  const desk2Chair = { x: 89, y: 88 };
  const desk3Chair = { x: 12, y: 153 };
  const desk4Chair = { x: 89, y: 153 };
  const waterCooler = { x: 320, y: 80 };
  const couch = { x: 240, y: 175 };

  switch (action) {
    case 'typing':
    case 'typing-green':
      return desk1Chair; // Main desk - typing at computer
    case 'reading':
    case 'scrolling':
    case 'searching':
      return desk1Chair; // Reading at main desk
    case 'thinking':
      return desk2Chair; // Thinking at second desk
    case 'celebrating':
      return desk1Chair; // Celebrating at main desk
    case 'frustrated':
      return desk1Chair; // Frustrated at main desk
    case 'coffee-sip':
      return waterCooler; // At water cooler in lounge
    case 'phone':
    case 'waiting':
      return couch; // On couch in lounge
    case 'walking':
    case 'idle':
    default:
      return desk1Chair; // Default at main desk
  }
}

export const TopDownCharacter = memo(({
  state,
  scale = 2,
  position,
}: TopDownCharacterProps) => {
  const bounceAnim = useRef(new Animated.Value(0)).current;
  const walkAnim = useRef(new Animated.Value(0)).current;

  // Get position based on action if not explicitly provided
  const charPosition = position || getDeskPosition(state.currentAction);

  // Action-specific animations
  useEffect(() => {
    if (state.currentAction === 'celebrating') {
      // Jump animation
      const jump = Animated.sequence([
        Animated.timing(bounceAnim, {
          toValue: -8,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(bounceAnim, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(bounceAnim, {
          toValue: -5,
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
    } else if (state.currentAction === 'frustrated') {
      // Shake animation
      const shake = Animated.loop(
        Animated.sequence([
          Animated.timing(bounceAnim, {
            toValue: -2,
            duration: 50,
            useNativeDriver: true,
          }),
          Animated.timing(bounceAnim, {
            toValue: 2,
            duration: 50,
            useNativeDriver: true,
          }),
        ]),
        { iterations: 5 }
      );
      shake.start(() => bounceAnim.setValue(0));
    } else if (state.currentAction === 'thinking') {
      // Slow sway
      const sway = Animated.loop(
        Animated.sequence([
          Animated.timing(bounceAnim, {
            toValue: -1,
            duration: 800,
            useNativeDriver: true,
          }),
          Animated.timing(bounceAnim, {
            toValue: 1,
            duration: 800,
            useNativeDriver: true,
          }),
        ])
      );
      sway.start();
      return () => sway.stop();
    } else if (state.isWalking) {
      // Walk bounce
      const bounce = Animated.loop(
        Animated.sequence([
          Animated.timing(bounceAnim, {
            toValue: -2,
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
  }, [state.currentAction, state.isWalking]);

  const isTyping = state.currentAction === 'typing' || state.currentAction === 'typing-green';

  // Determine which sprite to show
  const renderCharacter = () => {
    if (isTyping) {
      return (
        <AnimatedSprite
          frames={OFFICE_SPRITES.character.typing}
          frameRate={4}
          scale={scale}
        />
      );
    }
    return <Sprite grid={OFFICE_SPRITES.character.idle} scale={scale} />;
  };

  return (
    <Animated.View
      style={{
        position: 'absolute',
        left: charPosition.x,
        top: charPosition.y,
        transform: [{ translateY: bounceAnim }],
        zIndex: 100,
      }}
    >
      {renderCharacter()}

      {/* Status indicator */}
      {state.currentAction === 'typing-green' && (
        <View
          style={{
            position: 'absolute',
            top: -8,
            left: '50%',
            marginLeft: -4,
            width: 8,
            height: 8,
            borderRadius: 4,
            backgroundColor: '#40A080',
          }}
        />
      )}
      {state.currentAction === 'thinking' && (
        <View
          style={{
            position: 'absolute',
            top: -10,
            right: -5,
            width: 6,
            height: 6,
            borderRadius: 3,
            backgroundColor: '#87CEEB',
          }}
        />
      )}
      {state.currentAction === 'celebrating' && (
        <View
          style={{
            position: 'absolute',
            top: -12,
            left: '50%',
            marginLeft: -6,
            width: 12,
            height: 12,
          }}
        >
          <View style={{ position: 'absolute', top: 0, left: 5, width: 2, height: 8, backgroundColor: '#FFD700', transform: [{ rotate: '-15deg' }] }} />
          <View style={{ position: 'absolute', top: 2, left: 0, width: 2, height: 6, backgroundColor: '#FFD700', transform: [{ rotate: '15deg' }] }} />
          <View style={{ position: 'absolute', top: 2, right: 0, width: 2, height: 6, backgroundColor: '#FFD700', transform: [{ rotate: '-15deg' }] }} />
        </View>
      )}
      {state.currentAction === 'frustrated' && (
        <View
          style={{
            position: 'absolute',
            top: -10,
            left: '50%',
            marginLeft: -4,
          }}
        >
          <View style={{ width: 8, height: 2, backgroundColor: '#FF6B6B', transform: [{ rotate: '45deg' }] }} />
          <View style={{ width: 8, height: 2, backgroundColor: '#FF6B6B', transform: [{ rotate: '-45deg' }], marginTop: -2 }} />
        </View>
      )}
    </Animated.View>
  );
});

export default TopDownCharacter;
