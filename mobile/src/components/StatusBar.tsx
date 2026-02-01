import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { CharacterState, AnimationEvent } from '../types';

interface StatusBarProps {
  characterState: CharacterState;
  lastEvent: AnimationEvent | null;
}

export function StatusBar({ characterState, lastEvent }: StatusBarProps) {
  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <Text style={styles.label}>State:</Text>
        <Text style={styles.value}>{characterState.animationState}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>Location:</Text>
        <Text style={styles.value}>{characterState.currentLocation}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>Action:</Text>
        <Text style={styles.value}>{characterState.currentAction}</Text>
      </View>
      {lastEvent?.description && (
        <View style={styles.row}>
          <Text style={styles.label}>Last:</Text>
          <Text style={[styles.value, styles.description]} numberOfLines={1}>
            {lastEvent.description}
          </Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    padding: 12,
    borderRadius: 8,
    gap: 4,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  label: {
    color: '#888',
    fontSize: 12,
    width: 60,
  },
  value: {
    color: '#00d4ff',
    fontSize: 12,
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  description: {
    color: '#aaa',
    textTransform: 'none',
    fontWeight: 'normal',
    flex: 1,
  },
});
