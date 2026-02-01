import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { ConnectionStatus as ConnectionStatusType } from '../hooks/useWebSocket';

interface ConnectionStatusProps {
  status: ConnectionStatusType;
}

const STATUS_COLORS: Record<ConnectionStatusType, string> = {
  connected: '#51cf66',
  connecting: '#fcc419',
  disconnected: '#ff6b6b',
};

const STATUS_LABELS: Record<ConnectionStatusType, string> = {
  connected: 'Connected',
  connecting: 'Connecting...',
  disconnected: 'Disconnected',
};

export function ConnectionStatus({ status }: ConnectionStatusProps) {
  return (
    <View style={styles.container}>
      <View style={[styles.dot, { backgroundColor: STATUS_COLORS[status] }]} />
      <Text style={styles.label}>{STATUS_LABELS[status]}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: 12,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 6,
  },
  label: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '500',
  },
});
