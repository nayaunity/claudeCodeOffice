import React, { useCallback, useState } from 'react';
import { StyleSheet, View, SafeAreaView, Text, Pressable, Switch } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useWebSocket } from './src/hooks/useWebSocket';
import { useCharacterState } from './src/hooks/useCharacterState';
import { OfficeScene } from './src/components/OfficeScene';
import { Character } from './src/components/Character';
import { TopDownOffice } from './src/components/TopDownOffice';
import { TopDownCharacter } from './src/components/TopDownCharacter';
import { ConnectionStatus } from './src/components/ConnectionStatus';
import { StatusBar as AppStatusBar } from './src/components/StatusBar';
import { OFFICE_WIDTH, OFFICE_HEIGHT } from './src/utils/locations';
import { AnimationEvent, AnimationState } from './src/types';

// New dimensions for top-down office (larger for better visibility)
const TOP_DOWN_WIDTH = 380;
const TOP_DOWN_HEIGHT = 280;

export default function App() {
  const { state: characterState, handleEvent } = useCharacterState();
  const [usePixelArt, setUsePixelArt] = useState(true); // Default to pixel art

  const onWebSocketEvent = useCallback((event: AnimationEvent) => {
    handleEvent(event);
  }, [handleEvent]);

  const { status, lastEvent, reconnect } = useWebSocket(onWebSocketEvent);

  // Debug: Simulate events
  const simulateEvent = (animation: AnimationState) => {
    handleEvent({
      type: 'activity',
      animation,
      timestamp: Date.now(),
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />

      <View style={styles.header}>
        <Text style={styles.title}>Claude Code Office</Text>
        <ConnectionStatus status={status} />
      </View>

      {/* View mode toggle */}
      <View style={styles.toggleContainer}>
        <Text style={styles.toggleLabel}>Top-Down View</Text>
        <Switch
          value={usePixelArt}
          onValueChange={setUsePixelArt}
          trackColor={{ false: '#3d3d52', true: '#00d4ff' }}
          thumbColor={usePixelArt ? '#fff' : '#888'}
        />
      </View>

      {/* Office viewport */}
      <View style={styles.officeContainer}>
        {usePixelArt ? (
          // New top-down pixel art office
          <View style={styles.topDownWrapper}>
            <TopDownOffice width={TOP_DOWN_WIDTH} height={TOP_DOWN_HEIGHT} scale={2} />
            <TopDownCharacter state={characterState} scale={2} />
          </View>
        ) : (
          // Original side-view office
          <View style={styles.officeWrapper}>
            <OfficeScene />
            <Character state={characterState} />
          </View>
        )}
      </View>

      {/* Status info */}
      <View style={styles.statusContainer}>
        <AppStatusBar characterState={characterState} lastEvent={lastEvent} />
      </View>

      {/* Debug controls */}
      {__DEV__ && (
        <View style={styles.debugControls}>
          <Text style={styles.debugTitle}>Debug Controls:</Text>
          <View style={styles.buttonRow}>
            <Pressable
              style={[styles.debugButton, { backgroundColor: '#00d4ff' }]}
              onPress={() => simulateEvent('entering')}
            >
              <Text style={styles.buttonText}>Enter</Text>
            </Pressable>
            <Pressable
              style={[styles.debugButton, { backgroundColor: '#69db7c' }]}
              onPress={() => simulateEvent('typing')}
            >
              <Text style={styles.buttonText}>Type</Text>
            </Pressable>
            <Pressable
              style={[styles.debugButton, { backgroundColor: '#ffd43b' }]}
              onPress={() => simulateEvent('reading')}
            >
              <Text style={styles.buttonText}>Read</Text>
            </Pressable>
            <Pressable
              style={[styles.debugButton, { backgroundColor: '#ff922b' }]}
              onPress={() => simulateEvent('thinking')}
            >
              <Text style={styles.buttonText}>Think</Text>
            </Pressable>
          </View>
          <View style={styles.buttonRow}>
            <Pressable
              style={[styles.debugButton, { backgroundColor: '#20c997' }]}
              onPress={() => simulateEvent('terminal')}
            >
              <Text style={styles.buttonText}>Terminal</Text>
            </Pressable>
            <Pressable
              style={[styles.debugButton, { backgroundColor: '#51cf66' }]}
              onPress={() => simulateEvent('success')}
            >
              <Text style={styles.buttonText}>Success</Text>
            </Pressable>
            <Pressable
              style={[styles.debugButton, { backgroundColor: '#ff6b6b' }]}
              onPress={() => simulateEvent('error')}
            >
              <Text style={styles.buttonText}>Error</Text>
            </Pressable>
            <Pressable
              style={[styles.debugButton, { backgroundColor: '#868e96' }]}
              onPress={() => simulateEvent('idle')}
            >
              <Text style={styles.buttonText}>Idle</Text>
            </Pressable>
          </View>
          <View style={styles.buttonRow}>
            <Pressable
              style={[styles.debugButton, { backgroundColor: '#fcc419' }]}
              onPress={() => simulateEvent('waiting')}
            >
              <Text style={styles.buttonText}>Wait</Text>
            </Pressable>
            <Pressable
              style={[styles.debugButton, { backgroundColor: '#e599f7' }]}
              onPress={() => simulateEvent('delegating')}
            >
              <Text style={styles.buttonText}>Delegate</Text>
            </Pressable>
            <Pressable
              style={[styles.debugButton, { backgroundColor: '#868e96' }]}
              onPress={() => simulateEvent('leaving')}
            >
              <Text style={styles.buttonText}>Leave</Text>
            </Pressable>
            <Pressable
              style={[styles.debugButton, { backgroundColor: '#4dabf7' }]}
              onPress={reconnect}
            >
              <Text style={styles.buttonText}>Reconnect</Text>
            </Pressable>
          </View>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a2e',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  title: {
    color: '#00d4ff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  toggleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    gap: 8,
  },
  toggleLabel: {
    color: '#888',
    fontSize: 14,
  },
  officeContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  officeWrapper: {
    width: OFFICE_WIDTH,
    height: OFFICE_HEIGHT,
    borderRadius: 8,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: '#0f3460',
  },
  topDownWrapper: {
    width: TOP_DOWN_WIDTH,
    height: TOP_DOWN_HEIGHT,
    borderRadius: 8,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: '#5070A0',
    position: 'relative',
  },
  statusContainer: {
    paddingHorizontal: 16,
    paddingBottom: 8,
  },
  debugControls: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 12,
    gap: 8,
  },
  debugTitle: {
    color: '#888',
    fontSize: 12,
    marginBottom: 4,
  },
  buttonRow: {
    flexDirection: 'row',
    gap: 8,
  },
  debugButton: {
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 4,
    borderRadius: 4,
    alignItems: 'center',
  },
  buttonText: {
    color: '#1a1a2e',
    fontSize: 11,
    fontWeight: 'bold',
  },
});
