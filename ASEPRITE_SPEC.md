# Claude Code Office - Aseprite Sprite Specification

This document specifies the sprite sheet requirements for Claude Code Office animations.
Use this spec to create custom assets in Aseprite or commission an artist.

---

## Overview

| Property | Value |
|----------|-------|
| Base Resolution | 16x16 pixels (characters: 16x24) |
| Recommended Export | 1x, 2x, 4x scales |
| Color Palette | Limited (16-32 colors recommended) |
| Style | Cozy office/tech aesthetic, warm colors |
| Format | PNG with transparency |

---

## Color Palette

### Character Colors
```
Skin:           #FFD5B8 (light), #E8B898 (shadow)
Hair:           #5C4033 (base), #7A5A45 (highlight)
Shirt:          #6B8E9F (base), #4A6A7A (shadow) - Claude blue-grey
Pants:          #3D3D3D (base), #2A2A2A (shadow)
Shoes:          #2D2D2D
```

### Office Colors
```
Desk:           #C4A574 (top), #8B7355 (shadow), #8B6914 (legs)
Chair:          #4A4A4A (frame), #6B8E9F (cushion)
Monitor:        #2D2D2D (frame), #1A1A2E (off), #0D7377 (on)
Floor:          #E8DCC4 (base), #D4C4A8 (shadow)
Wall:           #F5F0E6 (base), #E8E0D0 (accent)
```

### Props
```
Whiteboard:     #FFFFFF (surface), #8B8B8B (frame)
Plant:          #4A7C4E (light), #2D5A30 (dark)
Pot:            #C67B4E (base), #8B5A3C (shadow)
Coffee:         #6F4E37
Mug:            #FFFFFF (body), #E8E8E8 (handle)
```

### Effects
```
Sparkle:        #FFD700
Frustration:    #FF6B6B
Thought Bubble: #87CEEB
```

### Helper Character (orange accent)
```
Shirt:          #FF8C42 (base), #CC6B2E (shadow)
```

---

## Required Sprites

### 1. Main Character (Claude) - 16x24 pixels

#### Idle Animations
| Animation | Frames | Frame Rate | Notes |
|-----------|--------|------------|-------|
| idle_down | 2-4 | 1 fps | Subtle breathing, blinking |
| idle_up | 2-4 | 1 fps | Back view |
| idle_left | 2-4 | 1 fps | Side view |
| idle_right | 2-4 | 1 fps | Side view (mirror of left) |

#### Walk Cycle (4 directions)
| Animation | Frames | Frame Rate | Notes |
|-----------|--------|------------|-------|
| walk_down | 4-6 | 8 fps | Walking toward camera |
| walk_up | 4-6 | 8 fps | Walking away |
| walk_left | 4-6 | 8 fps | Walking left |
| walk_right | 4-6 | 8 fps | Mirror of walk_left |

#### Action Animations (sitting at desk)
| Animation | Frames | Frame Rate | Notes |
|-----------|--------|------------|-------|
| typing | 2-4 | 4 fps | Hands moving on keyboard |
| reading | 2-4 | 2 fps | Looking at screen, hand on chin |
| thinking | 2-4 | 1 fps | Eyes looking up, thought bubble optional |
| celebrating | 4-6 | 6 fps | Arms up, sparkles |
| frustrated | 2-4 | 2 fps | Head down, stress marks |
| waving | 4 | 3 fps | One arm raised, waving motion |

### 2. Helper Character (Subagent) - 16x24 pixels
Same structure as main character but with orange shirt accent.
Minimum needed: idle_down, walk cycle, typing

### 3. Office Background - 320x180 (or tiled)

Option A: Single background image
Option B: Tileset (16x16 tiles) for flexibility

#### Required Elements
| Element | Size | Notes |
|---------|------|-------|
| Floor tiles | 16x16 | Wood or carpet pattern |
| Wall tiles | 16x16 | Plain with baseboard |
| Desk | 32x16 | With monitor, keyboard, coffee mug |
| Office chair | 16x16 | Rolling chair |
| Whiteboard | 24x16 | Mounted on wall |
| Coffee machine | 8x12 | Small appliance |
| Potted plant | 8x12 | Decorative |
| Door | 16x32 | Optional, for enter/exit animations |
| Window | 16x24 | Optional, with blinds |
| Bookshelf | 16x24 | Optional, decoration |

---

## Sprite Sheet Layout

### Recommended Organization

```
claude_sprites.png (256x256)
┌────────────────────────────────────────────────────────┐
│ Row 0: idle_down (4 frames)  │ idle_up (4 frames)      │
│ Row 1: idle_left (4 frames)  │ idle_right (4 frames)   │
│ Row 2: walk_down (6 frames)                            │
│ Row 3: walk_up (6 frames)                              │
│ Row 4: walk_left (6 frames)                            │
│ Row 5: walk_right (6 frames)                           │
│ Row 6: typing (4 frames)     │ reading (4 frames)      │
│ Row 7: thinking (4 frames)   │ celebrating (6 frames)  │
│ Row 8: frustrated (4 frames) │ waving (4 frames)       │
└────────────────────────────────────────────────────────┘

office_tiles.png (128x128)
┌────────────────────────────────────────────────────────┐
│ Floor tiles (various)        │ Wall tiles (various)    │
│ Desk pieces                  │ Chair                   │
│ Props (whiteboard, plants)   │ Appliances              │
└────────────────────────────────────────────────────────┘
```

---

## Aseprite Project Setup

### File Structure
```
claude-office-sprites/
├── claude_main.aseprite      # Main character
├── claude_helper.aseprite    # Helper/subagent character
├── office_tiles.aseprite     # Background tiles
├── office_props.aseprite     # Furniture and props
└── effects.aseprite          # Sparkles, thought bubbles, etc.
```

### Aseprite Settings
- Canvas Size: As specified per sprite
- Color Mode: RGBA
- Background: Transparent
- Grid: 16x16 or 16x24 (match sprite size)

### Export Settings
```json
{
  "format": "png",
  "scale": [1, 2, 4],
  "trim": false,
  "padding": 0,
  "sheet_type": "horizontal_strip",
  "json_data": true
}
```

### Animation Tags (in Aseprite)
Create tags for each animation:
- `idle_down`, `idle_up`, `idle_left`, `idle_right`
- `walk_down`, `walk_up`, `walk_left`, `walk_right`
- `typing`, `reading`, `thinking`, `celebrating`, `frustrated`, `waving`

---

## Animation Guidelines

### Character Movement
- Walk cycle: 6 frames, bob head slightly
- Arms swing opposite to legs
- Keep consistent silhouette

### Typing Animation
- 2-4 frames alternating hand positions
- Small body movement (leaning into keyboard)
- Optional: screen glow flicker

### Thinking Animation
- Eyes drift upward
- Optional thought bubble appears
- Slight head tilt

### Celebrating Animation
- Arms raise above head
- Optional jump (2px vertical offset)
- Sparkle effects around character

### Frustrated Animation
- Head drops
- Shoulders slump
- Stress marks (red symbols) above head

---

## Integration Notes

### Loading in React Native
Sprites will be loaded as PNG images and displayed using:
- Individual frame images, OR
- Sprite sheet with frame extraction

### Frame Data JSON (optional)
If using sprite sheets, include frame data:
```json
{
  "frames": {
    "claude_typing_0.png": {
      "frame": {"x": 0, "y": 0, "w": 16, "h": 24},
      "duration": 250
    },
    "claude_typing_1.png": {
      "frame": {"x": 16, "y": 0, "w": 16, "h": 24},
      "duration": 250
    }
  },
  "meta": {
    "app": "Aseprite",
    "size": {"w": 256, "h": 256},
    "scale": "1"
  }
}
```

---

## Free Asset Recommendations

If you prefer using existing assets:

### Office/Interior
- [LimeZu Modern Office](https://limezu.itch.io/modernoffice) ($2.50) - Best match
- [Free Modern Pixel Art](https://itch.io/game-assets/free/tag-modern/tag-pixel-art)

### Characters
- [Memao Sprite Sheet Creator](https://sleeping-robot-games.itch.io/sprite-sheet-creator) - Generate custom
- [Free Idle Pixel Art](https://itch.io/game-assets/free/tag-idle/tag-pixel-art)

---

## Questions?

The programmatic sprites in `mobile/src/assets/sprites.ts` serve as a reference
implementation. Use them as a guide for proportions, colors, and animation timing.
