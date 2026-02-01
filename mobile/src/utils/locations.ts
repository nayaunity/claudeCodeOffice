import { Location, Position, LocationDef } from '../types';

// Office dimensions (scaled up for display)
export const OFFICE_WIDTH = 320;
export const OFFICE_HEIGHT = 480;

// Location positions in the office
export const LOCATIONS: Record<Location, LocationDef> = {
  door: {
    position: { x: 260, y: 380 },
    name: 'Door',
  },
  desk: {
    position: { x: 80, y: 280 },
    name: 'Desk',
  },
  whiteboard: {
    position: { x: 160, y: 120 },
    name: 'Whiteboard',
  },
  coffee: {
    position: { x: 260, y: 180 },
    name: 'Coffee Machine',
  },
};

// Get position for a location
export function getLocationPosition(location: Location): Position {
  return LOCATIONS[location].position;
}

// Calculate interpolated position between two locations
export function interpolatePosition(
  from: Location,
  to: Location,
  progress: number // 0 to 1
): Position {
  const fromPos = LOCATIONS[from].position;
  const toPos = LOCATIONS[to].position;

  return {
    x: fromPos.x + (toPos.x - fromPos.x) * progress,
    y: fromPos.y + (toPos.y - fromPos.y) * progress,
  };
}
