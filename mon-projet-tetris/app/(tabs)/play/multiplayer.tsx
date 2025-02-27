import { SOCKET_URL } from '@/app/config';
import { useAuth } from '@/context/AuthContext';
import { useEffect } from 'react';
import { Text, View } from 'react-native';
import { io } from 'socket.io-client';

const Multiplayer = () => {
  const { currentUser } = useAuth();

  useEffect(() => {
    const socket = io(`${SOCKET_URL}`, { transports: ['websocket'] });
    socket.on('connect', () => {
      console.log(`Player ${currentUser?.id} connected:`, socket.id);
      socket.emit('joinQueue', { userId: currentUser?.id });
    });

    socket.on('matchFound', (data) => {
      console.log(data);
    });

    socket.on('disconnect', () => {
      console.log(`disconnect`);
    });

    return () => {
      socket.disconnect();
    };
  }, []);
  return (
    <View>
      <Text>MULTIPLAYER</Text>
    </View>
  );
};

export default Multiplayer;
