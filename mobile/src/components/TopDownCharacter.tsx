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
// Scaled-down office: 420x300, wall=55px, floor starts at y=55
// Character is 12x16 at scale 2.5 = 30x40 pixels
// Workstation positions: row 1 at y=8, row 2 at y=90 (relative to floor)
// Lounge area starts at x~245, with water cooler and couch

function getDeskPosition(action: CharacterAction): { x: number; y: number } {
  // Character is 12x16 at scale 2.5 = 30x40 pixels
  // Position character centered on chair seats
  // Floor starts at y=55, desks at y=8 and y=90 relative to floor

  // Character sits in front of desks (desks at y=10, 75, 140 relative to floor at y=55)
  const desk1 = { x: 17, y: 90 };      // First desk, row 1 (below desk)
  const desk2 = { x: 67, y: 90 };      // Second desk, row 1
  const desk3 = { x: 17, y: 155 };     // First desk, row 2
  const desk4 = { x: 67, y: 155 };     // Second desk, row 2
  const desk5 = { x: 17, y: 220 };     // First desk, row 3
  const desk6 = { x: 67, y: 220 };     // Second desk, row 3
  const whiteboard = { x: 150, y: 85 };    // Standing at whiteboard
  const waterCooler = { x: 375, y: 72 };   // At water cooler
  const couch = { x: 265, y: 165 };        // On couch

  switch (action) {
    case 'typing':
    case 'typing-green':
      return desk1; // Main desk - typing at computer
    case 'reading':
    case 'scrolling':
    case 'searching':
      return desk2; // Reading at second desk
    case 'thinking':
      return whiteboard; // Thinking at the whiteboard
    case 'celebrating':
      return desk1; // Celebrating at main desk
    case 'frustrated':
      return desk1; // Frustrated at main desk
    case 'coffee-sip':
      return waterCooler; // At water cooler in lounge
    case 'phone':
    case 'waiting':
      return couch; // On couch in lounge
    case 'walking':
    case 'idle':
    default:
      return desk1; // Default at main desk
  }
}

export const TopDownCharacter = memo(({
  state,
  scale = 2.5, // Balanced size to match smaller furniture
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
