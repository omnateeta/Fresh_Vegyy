import { useEffect, useMemo } from 'react';
import Constants from 'expo-constants';
import { io, Socket } from 'socket.io-client';

export const useSocket = () => {
  const url = Constants.expoConfig?.extra?.socketUrl || 'http://localhost:4000';

  const socket: Socket = useMemo(
    () =>
      io(url, {
        transports: ['websocket'],
        autoConnect: false
      }),
    [url]
  );

  useEffect(() => {
    socket.connect();
    return () => {
      socket.disconnect();
    };
  }, [socket]);

  return socket;
};


