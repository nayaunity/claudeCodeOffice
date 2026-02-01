import React, { useState, useEffect, memo } from 'react';
import { PixelGrid } from '../assets/sprites';
import { PixelSprite } from './PixelSprite';

interface AnimatedSpriteProps {
  frames: PixelGrid[];
  frameRate?: number; // frames per second
  scale?: number;
  style?: object;
  playing?: boolean;
}

/**
 * Renders an animated sprite that cycles through frames
 */
export const AnimatedSprite = memo(({
  frames,
  frameRate = 4,
  scale = 4,
  style,
  playing = true
}: AnimatedSpriteProps) => {
  const [currentFrame, setCurrentFrame] = useState(0);

  useEffect(() => {
    if (!playing || frames.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentFrame(prev => (prev + 1) % frames.length);
    }, 1000 / frameRate);

    return () => clearInterval(interval);
  }, [frames.length, frameRate, playing]);

  return (
    <PixelSprite
      sprite={frames[currentFrame]}
      scale={scale}
      style={style}
    />
  );
});

export default AnimatedSprite;
