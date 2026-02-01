// Individual furniture sprite assets from LimeZu Modern Office
// These are pre-extracted 32x32 sprites

export const FURNITURE_IMAGES = {
  // Chairs
  chairBlueFront: require('./chair_blue_front.png'),
  chairBlueBack: require('./chair_blue_back.png'),
  chairOrangeFront: require('./chair_orange_front.png'),
  chairOrangeBack: require('./chair_orange_back.png'),

  // Desk
  desk: require('./desk.png'),
  deskMid: require('./desk_mid.png'),
  deskRight: require('./desk_right.png'),
  deskTop: require('./desk_top.png'),
  deskCorner: require('./desk_corner.png'),

  // Monitor
  monitor: require('./monitor.png'),

  // Plant
  plant: require('./plant.png'),

  // Couch (3 pieces)
  couchLeft: require('./couch_left.png'),
  couchMid: require('./couch_mid.png'),
  couchRight: require('./couch_right.png'),

  // Whiteboard
  whiteboard: require('./whiteboard.png'),

  // Water cooler
  waterCooler: require('./water_cooler.png'),
};

export type FurnitureImageKey = keyof typeof FURNITURE_IMAGES;

export default FURNITURE_IMAGES;
