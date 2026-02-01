import express, { Request, Response } from 'express';
import { WebSocketServer, WebSocket } from 'ws';
import http from 'http';
import { HookPayload, AnimationEvent } from './types';
import { normalizeEvent } from './event-normalizer';
import { IdleTracker } from './idle-tracker';

const HTTP_PORT = 3001;
const WS_PORT = 3002;

// Create Express app
const app = express();
app.use(express.json());

// Store connected WebSocket clients
const clients = new Set<WebSocket>();

// Create WebSocket server
const wss = new WebSocketServer({ port: WS_PORT });

wss.on('connection', (ws: WebSocket) => {
  console.log(`[WS] Client connected (total: ${clients.size + 1})`);
  clients.add(ws);

  // Send current state to new client
  ws.send(JSON.stringify({
    type: 'state_change',
    animation: idleTracker.getState(),
    description: 'Connected',
    timestamp: Date.now(),
  }));

  ws.on('close', () => {
    clients.delete(ws);
    console.log(`[WS] Client disconnected (total: ${clients.size})`);
  });

  ws.on('error', (err) => {
    console.error('[WS] Client error:', err.message);
    clients.delete(ws);
  });
});

// Broadcast event to all connected clients
function broadcast(event: AnimationEvent): void {
  const message = JSON.stringify(event);
  let sentCount = 0;

  clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(message);
      sentCount++;
    }
  });

  if (sentCount > 0) {
    console.log(`[WS] Broadcast to ${sentCount} client(s)`);
  }
}

// Create idle tracker
const idleTracker = new IdleTracker((event) => {
  console.log(`[IDLE] State change: ${event.animation}`);
  broadcast(event);
});

// HTTP endpoint for hook events
app.post('/event', (req: Request, res: Response) => {
  try {
    const payload = req.body as HookPayload;

    // Log the incoming event
    const toolInfo = payload.tool ? ` [${payload.tool}]` : '';
    console.log(`[EVENT] ${payload.event}${toolInfo}`);

    // Normalize and broadcast
    const animationEvent = normalizeEvent(payload);
    console.log(`[ANIM] → ${animationEvent.animation}${animationEvent.description ? ': ' + animationEvent.description : ''}`);

    // Update idle tracker
    idleTracker.onEvent(animationEvent.animation, payload.event);

    // Broadcast to WebSocket clients
    broadcast(animationEvent);

    res.status(200).json({ status: 'ok', animation: animationEvent.animation });
  } catch (error) {
    console.error('[ERROR] Failed to process event:', error);
    res.status(400).json({ status: 'error', message: 'Invalid payload' });
  }
});

// Health check endpoint
app.get('/health', (_req: Request, res: Response) => {
  res.json({
    status: 'ok',
    clients: clients.size,
    currentState: idleTracker.getState(),
  });
});

// Status endpoint
app.get('/status', (_req: Request, res: Response) => {
  res.json({
    httpPort: HTTP_PORT,
    wsPort: WS_PORT,
    connectedClients: clients.size,
    currentAnimation: idleTracker.getState(),
  });
});

// Start HTTP server
app.listen(HTTP_PORT, () => {
  console.log('╔═══════════════════════════════════════════════════════════╗');
  console.log('║         Claude Code Office - Event Server                 ║');
  console.log('╠═══════════════════════════════════════════════════════════╣');
  console.log(`║  HTTP endpoint:    http://localhost:${HTTP_PORT}/event            ║`);
  console.log(`║  WebSocket server: ws://localhost:${WS_PORT}                    ║`);
  console.log(`║  Health check:     http://localhost:${HTTP_PORT}/health           ║`);
  console.log('╚═══════════════════════════════════════════════════════════╝');
  console.log('');
  console.log('Waiting for events...');
  console.log('');
});

// Graceful shutdown
process.on('SIGINT', () => {
  console.log('\nShutting down...');
  idleTracker.destroy();
  wss.close();
  process.exit(0);
});
