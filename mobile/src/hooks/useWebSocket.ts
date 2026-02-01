import { useEffect, useRef, useState, useCallback } from 'react';
import { CONFIG } from '../config';
import { AnimationEvent } from '../types';

export type ConnectionStatus = 'connecting' | 'connected' | 'disconnected';

interface UseWebSocketResult {
  status: ConnectionStatus;
  lastEvent: AnimationEvent | null;
  reconnect: () => void;
}

export function useWebSocket(onEvent?: (event: AnimationEvent) => void): UseWebSocketResult {
  const [status, setStatus] = useState<ConnectionStatus>('disconnected');
  const [lastEvent, setLastEvent] = useState<AnimationEvent | null>(null);
  const wsRef = useRef<WebSocket | null>(null);
  const reconnectTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const reconnectAttemptsRef = useRef(0);

  const connect = useCallback(() => {
    // Clean up existing connection
    if (wsRef.current) {
      wsRef.current.close();
    }

    setStatus('connecting');
    console.log(`[WS] Connecting to ${CONFIG.WS_URL}...`);

    const ws = new WebSocket(CONFIG.WS_URL);
    wsRef.current = ws;

    ws.onopen = () => {
      console.log('[WS] Connected');
      setStatus('connected');
      reconnectAttemptsRef.current = 0;
    };

    ws.onmessage = (event) => {
      try {
        const data: AnimationEvent = JSON.parse(event.data);
        console.log(`[WS] Event: ${data.animation}`, data.description || '');
        setLastEvent(data);
        onEvent?.(data);
      } catch (err) {
        console.error('[WS] Failed to parse message:', err);
      }
    };

    ws.onclose = () => {
      console.log('[WS] Disconnected');
      setStatus('disconnected');
      wsRef.current = null;

      // Exponential backoff reconnect
      const delay = Math.min(1000 * Math.pow(2, reconnectAttemptsRef.current), 10000);
      reconnectAttemptsRef.current++;

      console.log(`[WS] Reconnecting in ${delay}ms...`);
      reconnectTimeoutRef.current = setTimeout(connect, delay);
    };

    ws.onerror = (error) => {
      console.error('[WS] Error:', error);
    };
  }, [onEvent]);

  const reconnect = useCallback(() => {
    reconnectAttemptsRef.current = 0;
    if (reconnectTimeoutRef.current) {
      clearTimeout(reconnectTimeoutRef.current);
    }
    connect();
  }, [connect]);

  useEffect(() => {
    connect();

    return () => {
      if (reconnectTimeoutRef.current) {
        clearTimeout(reconnectTimeoutRef.current);
      }
      if (wsRef.current) {
        wsRef.current.close();
      }
    };
  }, [connect]);

  return { status, lastEvent, reconnect };
}
