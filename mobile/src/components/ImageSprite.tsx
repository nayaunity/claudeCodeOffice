import React, { memo } from 'react';
import { Image, ImageSourcePropType, StyleSheet, View } from 'react-native';

interface ImageSpriteProps {
  // Image source (require or uri)
  source: ImageSourcePropType;
  // Width of the sprite
  width: number;
  // Height of the sprite
  height: number;
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
  // Optional tint color (for effects)
  tintColor?: string;
}

/**
 * ImageSprite - Renders a static image sprite
 *
 * Used for rendering individual sprite images or extracted frames
 * from sprite sheets. Supports scaling, positioning, and flipping.
 */
export const ImageSprite = memo(({
  source,
  width,
  height,
  scale = 1,
  position,
  zIndex,
  flipX = false,
  flipY = false,
  opacity = 1,
  tintColor,
}: ImageSpriteProps) => {
  const scaledWidth = width * scale;
  const scaledHeight = height * scale;

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
    tintColor && { tintColor },
  ];

  return (
    <View style={containerStyle}>
      <Image
        source={source}
        style={imageStyle}
        resizeMode="stretch"
      />
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
  },
  image: {
    // Image fills the container
  },
});

export default ImageSprite;
