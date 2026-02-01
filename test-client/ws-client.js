#!/usr/bin/env node
/**
 * Simple WebSocket client for testing the event server from terminal
 * Usage: node ws-client.js
 */

const WebSocket = require('ws');

const WS_URL = 'ws://localhost:3002';

console.log('Claude Code Office - WebSocket Test Client');
console.log('==========================================');
console.log(`Connecting to ${WS_URL}...`);
console.log('');

const ws = new WebSocket(WS_URL);

ws.on('open', () => {
  console.log('✅ Connected to event server');
  console.log('Waiting for events... (Ctrl+C to exit)');
  console.log('');
});

ws.on('message', (data) => {
  try {
    const event = JSON.parse(data.toString());
    const time = new Date(event.timestamp).toLocaleTimeString();
    const tool = event.tool ? ` [${event.tool}]` : '';
    const desc = event.description ? ` - ${event.description}` : '';

    // Color based on animation state
    const colors = {
      idle: '\x1b[90m',      // gray
      thinking: '\x1b[36m',  // cyan
      typing: '\x1b[32m',    // green
      reading: '\x1b[33m',   // yellow
      searching: '\x1b[35m', // magenta
      terminal: '\x1b[33m',  // yellow
      browsing: '\x1b[36m',  // cyan
      delegating: '\x1b[35m',// magenta
      waiting: '\x1b[33m',   // yellow
      success: '\x1b[32m',   // green
      error: '\x1b[31m',     // red
      entering: '\x1b[34m',  // blue
      leaving: '\x1b[90m',   // gray
    };

    const color = colors[event.animation] || '\x1b[0m';
    const reset = '\x1b[0m';

    console.log(`${time} ${color}${event.animation.padEnd(12)}${reset}${tool}${desc}`);
  } catch (err) {
    console.error('Failed to parse:', data.toString());
  }
});

ws.on('close', () => {
  console.log('\n❌ Disconnected from server');
  process.exit(0);
});

ws.on('error', (err) => {
  console.error('Connection error:', err.message);
  console.log('Make sure the event server is running on port 3002');
  process.exit(1);
});
