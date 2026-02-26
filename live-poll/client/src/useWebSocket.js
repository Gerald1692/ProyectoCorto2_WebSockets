import { useState, useCallback, useEffect, useRef } from 'react';

export const useWebSocket = (url) => {
  const [lastMessage, setLastMessage] = useState(null);
  const [connected, setConnected] = useState(false);
  const [error, setError] = useState(null);
  const ws = useRef(null);

  const connect = useCallback(() => {
    if (ws.current?.readyState === WebSocket.OPEN) return;

    ws.current = new WebSocket(url);

    ws.current.onopen = () => {
      setConnected(true);
      setError(null);
      console.log('Connected to WS');
    };

    ws.current.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        if (data.type === 'ERROR') {
          setError(data.payload.message);
        } else {
          setLastMessage(data);
          setError(null);
        }
      } catch (e) {
        console.error('Failed to parse message', e);
      }
    };

    ws.current.onerror = () => {
      setError('Connection error');
    };

    ws.current.onclose = () => {
      setConnected(false);
      console.log('Disconnected from WS');
    };
  }, [url]);

  const send = useCallback((type, payload) => {
    if (ws.current?.readyState === WebSocket.OPEN) {
      ws.current.send(JSON.stringify({ type, payload }));
    } else {
      console.warn('WebSocket not connected');
    }
  }, []);

  const clearError = () => setError(null);

  useEffect(() => {
    connect();
    return () => {
      ws.current?.close();
    };
  }, [connect]);

  return { lastMessage, connected, error, send, clearError };
};
