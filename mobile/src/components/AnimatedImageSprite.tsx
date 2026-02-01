import React, { memo, useEffect, useState, useRef } from 'react';
import { Image, ImageSourcePropType, StyleSheet, View, Animated } from 'react-native';

interface FrameConfig {
  // Source image for this frame
  source: ImageSourcePropType;
  // Optional duration override for this frame (in ms)
  duration?: number;
}

interface AnimatedImageSpriteProps {
  // Array of frame sources or frame configs
  frames: ImageSourcePropType[] | FrameConfig[];
  // Width of each frame
  width: number;
  // Height of each frame
  height: number;
  // Frames per second (default 4)
  frameRate?: number;
  // Scale multiplier (default 1)
  scale?: number;
  // Whether to loop the animation (default true)
  loop?: boolean;
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
  // Callback when animation completes (only fires if loop is false)
  onAnimationComplete?: () => void;
  // Whether to play the animation (default true)
  playing?: boolean;
  // Initial frame index (default 0)
  initialFrame?: number;
}

/**
 * AnimatedImageSprite - Renders an animated sprite by cycling through frames
 *
 * Used for character animations like typing, walking, celebrating, etc.
 * Supports variable frame rates, looping, and animation callbacks.
 */
export const AnimatedImageSprite = memo(({
  frames,
  width,
  height,
  frameRate = 4,
  scale = 1,
  loop = true,
  position,
  zIndex,
  flipX = false,
  flipY = false,
  opacity = 1,
  onAnimationComplete,
  playing = true,
  initialFrame = 0,
}: AnimatedImageSpriteProps) => {
  const [currentFrame, setCurrentFrame] = useState(initialFrame);
  const frameTimerRef = useRef<NodeJS.Timeout | null>(null);
  const completedRef = useRef(false);

  const scaledWidth = width * scale;
  const scaledHeight = height * scale;

  // Normalize frames to FrameConfig format
  const normalizedFrames: FrameConfig[] = frames.map((frame) => {
    if (typeof frame === 'object' && 'source' in frame) {
      return frame as FrameConfig;
    }
    return { source: frame as ImageSourcePropType };
  });

  // Get the current frame's source
  const currentFrameConfig = normalizedFrames[currentFrame];
  const currentSource = currentFrameConfig?.source;

  // Calculate frame duration
  const baseFrameDuration = 1000 / frameRate;
  const currentFrameDuration = currentFrameConfig?.duration ?? baseFrameDuration;

  useEffect(() => {
    if (!playing || normalizedFrames.length <= 1) {
      return;
    }

    // Clear any existing timer
    if (frameTimerRef.current) {
      clearTimeout(frameTimerRef.current);
    }

    // Reset completed flag when starting
    completedRef.current = false;

    const advanceFrame = () => {
      setCurrentFrame((prev) => {
        const nextFrame = prev + 1;

        // Check if we've reached the end
        if (nextFrame >= normalizedFrames.length) {
          if (loop) {
            return 0; // Loop back to start
          } else {
            // Animation complete
            if (!completedRef.current) {
              completedRef.current = true;
              onAnimationComplete?.();
            }
            return prev; // Stay on last frame
          }
        }

        return nextFrame;
      });
    };

    // Schedule next frame
    frameTimerRef.current = setTimeout(advanceFrame, currentFrameDuration);

    return () => {
      if (frameTimerRef.current) {
        clearTimeout(frameTimerRef.current);
      }
    };
  }, [currentFrame, playing, normalizedFrames.length, loop, currentFrameDuration, onAnimationComplete]);

  // Reset to initial frame when frames change
  useEffect(() => {
    setCurrentFrame(initialFrame);
    completedRef.current = false;
  }, [frames, initialFrame]);

  if (!currentSource) {
    return null;
  }

  const containerStyle = [
    styles.container,
    {
      width: scaledWidth,
      height: scaledHeight,
    },
    position && {
      position: 'absolute' as const,
      left: position.x,
      top: position.y,
    },
    zIndex !== undefined && { zIndex },
  ];

  const imageStyle = [
    styles.image,
    {
      width: scaledWidth,
      height: scaledHeight,
      opacity,
    },
    (flipX || flipY) && {
      transform: [
        { scaleX: flipX ? -1 : 1 },
        { scaleY: flipY ? -1 : 1 },
      ],
    },
  ];

  return (
    <View style={containerStyle}>
      <Image
        source={currentSource}
        style={imageStyle}
        resizeMode="stretch"
      />
    </View>
  );
});

/**
 * Hook for controlling animated sprite playback
 */
export function useAnimationControl(initialPlaying = true) {
  const [playing, setPlaying] = useState(initialPlaying);
  const [currentAnimation, setCurrentAnimation] = useState<string | null>(null);

  const play = (animationName?: string) => {
    if (animationName) {
      setCurrentAnimation(animationName);
    }
    setPlaying(true);
  };

  const pause = () => {
    setPlaying(false);
  };

  const stop = () => {
    setPlaying(false);
    setCurrentAnimation(null);
  };

  return {
    playing,
    currentAnimation,
    play,
    pause,
    stop,
  };
}

const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
  },
  image: {
    // Image fills the container
  },
});

export default AnimatedImageSprite;
