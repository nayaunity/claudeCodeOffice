import React, { memo, useMemo } from 'react';
import { Image, ImageSourcePropType, StyleSheet, View } from 'react-native';

interface SpriteFrame {
  x: number;
  y: number;
  width: number;
  height: number;
}

interface SpriteSheetProps {
  // The sprite sheet image source
  source: ImageSourcePropType;
  // The frame to extract from the sprite sheet
  frame: SpriteFrame;
  // Scale multiplier (default 1)
  scale?: number;
  // Optional position for absolute positioning
  position?: { x: number; y: number };
  // Optional z-index for layering
  zIndex?: number;
  // Flip horizontally
  flipX?: boolean;
  // Flip vertically
  flipY?: boolean;
  // Optional opacity
  opacity?: number;
  // Optional tint color
  tintColor?: string;
  // Total width of the sprite sheet (for positioning calculations)
  sheetWidth: number;
  // Total height of the sprite sheet
  sheetHeight: number;
}

/**
 * SpriteSheet - Extracts and renders a specific frame from a sprite sheet
 *
 * Uses overflow clipping and negative positioning to show only the
 * desired region of a larger sprite sheet image. This is the standard
 * technique for sprite sheet rendering in games.
 */
export const SpriteSheet = memo(({
  source,
  frame,
  scale = 1,
  position,
  zIndex,
  flipX = false,
  flipY = false,
  opacity = 1,
  tintColor,
  sheetWidth,
  sheetHeight,
}: SpriteSheetProps) => {
  const scaledFrameWidth = frame.width * scale;
  const scaledFrameHeight = frame.height * scale;
  const scaledSheetWidth = sheetWidth * scale;
  const scaledSheetHeight = sheetHeight * scale;

  // Calculate the offset to position the sprite sheet so the desired frame is visible
  const offsetX = -frame.x * scale;
  const offsetY = -frame.y * scale;

  const containerStyle = useMemo(() => [
    styles.container,
    {
      width: scaledFrameWidth,
      height: scaledFrameHeight,
    },
    position && {
      position: 'absolute' as const,
      left: position.x,
      top: position.y,
    },
    zIndex !== undefined && { zIndex },
  ], [scaledFrameWidth, scaledFrameHeight, position, zIndex]);

  const imageContainerStyle = useMemo(() => [
    styles.imageContainer,
    {
      width: scaledFrameWidth,
      height: scaledFrameHeight,
    },
    (flipX || flipY) && {
      transform: [
        { scaleX: flipX ? -1 : 1 },
        { scaleY: flipY ? -1 : 1 },
      ],
    },
  ], [scaledFrameWidth, scaledFrameHeight, flipX, flipY]);

  const imageStyle = useMemo(() => [
    styles.image,
    {
      width: scaledSheetWidth,
      height: scaledSheetHeight,
      left: offsetX,
      top: offsetY,
      opacity,
    },
    tintColor && { tintColor },
  ], [scaledSheetWidth, scaledSheetHeight, offsetX, offsetY, opacity, tintColor]);

  return (
    <View style={containerStyle}>
      <View style={imageContainerStyle}>
        <Image
          source={source}
          style={imageStyle}
          resizeMode="stretch"
        />
      </View>
    </View>
  );
});

/**
 * Helper to create a grid of frame definitions from a sprite sheet
 */
export function createFrameGrid(
  frameWidth: number,
  frameHeight: number,
  columns: number,
  rows: number,
  startX = 0,
  startY = 0,
  padding = 0
): SpriteFrame[] {
  const frames: SpriteFrame[] = [];

  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < columns; col++) {
      frames.push({
        x: startX + col * (frameWidth + padding),
        y: startY + row * (frameHeight + padding),
        width: frameWidth,
        height: frameHeight,
      });
    }
  }

  return frames;
}

/**
 * Helper to create an animation from specific frame indices
 */
export function createAnimation(
  allFrames: SpriteFrame[],
  frameIndices: number[]
): SpriteFrame[] {
  return frameIndices.map((index) => allFrames[index]);
}

/**
 * AnimatedSpriteSheet - Combines SpriteSheet with animation
 */
interface AnimatedSpriteSheetProps extends Omit<SpriteSheetProps, 'frame'> {
  frames: SpriteFrame[];
  frameRate?: number;
  loop?: boolean;
  playing?: boolean;
  initialFrame?: number;
  onAnimationComplete?: () => void;
}

export const AnimatedSpriteSheet = memo(({
  frames,
  frameRate = 4,
  loop = true,
  playing = true,
  initialFrame = 0,
  onAnimationComplete,
  ...spriteSheetProps
}: AnimatedSpriteSheetProps) => {
  const [currentFrameIndex, setCurrentFrameIndex] = React.useState(initialFrame);
  const completedRef = React.useRef(false);

  React.useEffect(() => {
    if (!playing || frames.length <= 1) {
      return;
    }

    completedRef.current = false;
    const frameDuration = 1000 / frameRate;

    const timer = setInterval(() => {
      setCurrentFrameIndex((prev) => {
        const next = prev + 1;
        if (next >= frames.length) {
          if (loop) {
            return 0;
          } else {
            if (!completedRef.current) {
              completedRef.current = true;
              onAnimationComplete?.();
            }
            return prev;
          }
        }
        return next;
      });
    }, frameDuration);

    return () => clearInterval(timer);
  }, [playing, frames.length, frameRate, loop, onAnimationComplete]);

  React.useEffect(() => {
    setCurrentFrameIndex(initialFrame);
    completedRef.current = false;
  }, [frames, initialFrame]);

  const currentFrame = frames[currentFrameIndex];
  if (!currentFrame) {
    return null;
  }

  return (
    <SpriteSheet
      {...spriteSheetProps}
      frame={currentFrame}
    />
  );
});

const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
  },
  imageContainer: {
    overflow: 'hidden',
  },
  image: {
    position: 'absolute',
  },
});

export default SpriteSheet;
