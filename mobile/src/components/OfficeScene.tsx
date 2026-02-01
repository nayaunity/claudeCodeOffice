import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { OFFICE_WIDTH, OFFICE_HEIGHT, LOCATIONS } from '../utils/locations';

export function OfficeScene() {
  return (
    <View style={styles.office}>
      {/* Floor */}
      <View style={styles.floor} />

      {/* Wall */}
      <View style={styles.wall} />

      {/* Desk with computer */}
      <View style={[styles.desk, { left: LOCATIONS.desk.position.x - 40, top: LOCATIONS.desk.position.y - 20 }]}>
        <View style={styles.deskTop}>
          <View style={styles.monitor}>
            <View style={styles.screen} />
          </View>
          <View style={styles.keyboard} />
        </View>
        <View style={styles.deskLegs}>
          <View style={styles.leg} />
          <View style={styles.leg} />
        </View>
      </View>

      {/* Whiteboard */}
      <View style={[styles.whiteboard, { left: LOCATIONS.whiteboard.position.x - 50, top: LOCATIONS.whiteboard.position.y - 60 }]}>
        <View style={styles.whiteboardSurface}>
          <View style={styles.marker} />
          <View style={[styles.marker, { left: 20 }]} />
          <View style={[styles.marker, { left: 40 }]} />
        </View>
        <Text style={styles.label}>WHITEBOARD</Text>
      </View>

      {/* Coffee machine */}
      <View style={[styles.coffeeMachine, { left: LOCATIONS.coffee.position.x - 20, top: LOCATIONS.coffee.position.y - 40 }]}>
        <View style={styles.coffeeBody}>
          <View style={styles.coffeeTop} />
          <View style={styles.coffeeDisplay} />
          <View style={styles.coffeeCup} />
        </View>
      </View>

      {/* Door */}
      <View style={[styles.door, { left: LOCATIONS.door.position.x - 25, top: LOCATIONS.door.position.y - 60 }]}>
        <View style={styles.doorFrame}>
          <View style={styles.doorHandle} />
        </View>
      </View>

      {/* Location markers (debug) */}
      {__DEV__ && (
        <>
          {Object.entries(LOCATIONS).map(([name, loc]) => (
            <View
              key={name}
              style={[
                styles.locationMarker,
                { left: loc.position.x - 4, top: loc.position.y - 4 },
              ]}
            />
          ))}
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  office: {
    width: OFFICE_WIDTH,
    height: OFFICE_HEIGHT,
    backgroundColor: '#2d2d44',
    position: 'relative',
    overflow: 'hidden',
  },

  // Floor and wall
  floor: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 200,
    backgroundColor: '#4a4a5e',
  },
  wall: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 280,
    backgroundColor: '#3d3d52',
  },

  // Desk
  desk: {
    position: 'absolute',
    alignItems: 'center',
  },
  deskTop: {
    width: 80,
    height: 35,
    backgroundColor: '#8b4513',
    borderRadius: 2,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 5,
  },
  monitor: {
    width: 40,
    height: 25,
    backgroundColor: '#1a1a2e',
    borderRadius: 2,
    borderWidth: 2,
    borderColor: '#333',
    alignItems: 'center',
    justifyContent: 'center',
  },
  screen: {
    width: 32,
    height: 18,
    backgroundColor: '#0a2540',
    borderRadius: 1,
  },
  keyboard: {
    width: 30,
    height: 6,
    backgroundColor: '#444',
    borderRadius: 1,
    marginTop: 2,
  },
  deskLegs: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 70,
    marginTop: -2,
  },
  leg: {
    width: 8,
    height: 25,
    backgroundColor: '#6b3a0a',
  },

  // Whiteboard
  whiteboard: {
    position: 'absolute',
    alignItems: 'center',
  },
  whiteboardSurface: {
    width: 100,
    height: 60,
    backgroundColor: '#f5f5f5',
    borderRadius: 2,
    borderWidth: 3,
    borderColor: '#666',
    padding: 8,
    flexDirection: 'row',
  },
  marker: {
    width: 4,
    height: 15,
    backgroundColor: '#ff6b6b',
    borderRadius: 2,
    position: 'absolute',
    bottom: 5,
    left: 5,
  },
  label: {
    color: '#666',
    fontSize: 8,
    marginTop: 4,
    fontWeight: 'bold',
  },

  // Coffee machine
  coffeeMachine: {
    position: 'absolute',
  },
  coffeeBody: {
    width: 40,
    height: 55,
    backgroundColor: '#444',
    borderRadius: 4,
    alignItems: 'center',
    paddingTop: 5,
  },
  coffeeTop: {
    width: 30,
    height: 8,
    backgroundColor: '#333',
    borderRadius: 2,
  },
  coffeeDisplay: {
    width: 20,
    height: 10,
    backgroundColor: '#00d4ff',
    marginTop: 5,
    borderRadius: 2,
  },
  coffeeCup: {
    width: 12,
    height: 15,
    backgroundColor: '#fff',
    marginTop: 10,
    borderRadius: 2,
    borderWidth: 1,
    borderColor: '#ccc',
  },

  // Door
  door: {
    position: 'absolute',
  },
  doorFrame: {
    width: 50,
    height: 80,
    backgroundColor: '#5a3a1a',
    borderRadius: 2,
    borderWidth: 3,
    borderColor: '#3a2510',
  },
  doorHandle: {
    position: 'absolute',
    right: 8,
    top: 35,
    width: 8,
    height: 8,
    backgroundColor: '#ffd700',
    borderRadius: 4,
  },

  // Debug markers
  locationMarker: {
    position: 'absolute',
    width: 8,
    height: 8,
    backgroundColor: 'rgba(255, 0, 0, 0.5)',
    borderRadius: 4,
  },
});
