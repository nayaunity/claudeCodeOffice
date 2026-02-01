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
// New larger office: 500x380, wall=80px, floor starts at y=80
// Workstation positions (chair part):
//   Desk 1: x=15, y=15 relative to floor → chair at x≈30, y≈95 (absolute: y=80+15=95)
//   Desk 2: x=90, y=15 → chair at x≈105, y≈95
//   Desk 3: x=15, y=130 → chair at x≈30, y≈210
//   Desk 4: x=90, y=130 → chair at x≈105, y≈210
//   Desk 5: x=175, y=70 → chair at x≈190, y≈150
// Lounge: starts at x≈293, water cooler at ~438, couch at ~308

function getDeskPosition(action: CharacterAction): { x: number; y: number } {
  // Character positions aligned with chair centers
  const desk1Chair = { x: 32, y: 98 };   // First desk, first row
  const desk2Chair = { x: 107, y: 98 };  // Second desk, first row
  const desk3Chair = { x: 32, y: 213 };  // First desk, second row
  const desk4Chair = { x: 107, y: 213 }; // Second desk, second row
  const desk5Chair = { x: 192, y: 153 }; // Single desk
  const waterCooler = { x: 445, y: 115 }; // At water cooler
  const couch = { x: 340, y: 225 };       // On couch

  switch (action) {
    case 'typing':
    case 'typing-green':
      return desk1Chair; // Main desk - typing at computer
    case 'reading':
    case 'scrolling':
    case 'searching':
      return desk2Chair; // Reading at second desk
    case 'thinking':
      return desk5Chair; // Thinking at the single desk
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
  scale = 2.5, // Larger scale for bigger office
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
