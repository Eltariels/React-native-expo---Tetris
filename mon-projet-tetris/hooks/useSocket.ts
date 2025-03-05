import { SOCKET_URL } from '@/api/config';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from 'expo-router';
import { useCallback, useRef, useState } from 'react';
import { io, Socket } from 'socket.io-client';

export const useSocket = () => {
  const socketRef = useRef<Socket | null>(null);
  const [hasConnection, setHasConnection] = useState(false);
  const [hasError, setHasError] = useState(false);

  const connectSocket = async () => {
    const token = await AsyncStorage.getItem('token');
    const socketInstance = io(`${SOCKET_URL}/matchmaking`, {
      transports: ['websocket'],
      extraHeaders: { Authorization: `Bearer ${token}` },
    });

    socketInstance.on('connect', () => {
      console.log(`Socket connected: ${socketInstance.id}`);
      setHasConnection(true);
      setHasError(false);
    });

    socketInstance.on('unauthorized', () => {
      console.log(`unauthorized`);
      setHasError(true);
    });

    socketInstance.on('error', () => {
      console.log(`error`);
      setHasError(true);
    });

    socketInstance.on('disconnect', () => {
      console.log(`disconnect`);
      setHasConnection(false);
    });
    socketRef.current = socketInstance;
  };

  useFocusEffect(
    useCallback(() => {
      connectSocket();
      return () => {
        if (socketRef.current) {
          socketRef.current.disconnect();
          socketRef.current.removeAllListeners();
          socketRef.current = null;
        }
      };
    }, [])
  );

  return { socket: socketRef.current, hasConnection, hasError };
};
