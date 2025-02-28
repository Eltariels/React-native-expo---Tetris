import { SOCKET_URL } from '@/app/config';
import TetrisGame from '@/components/tetris/TetrisGame';
import { useAuth } from '@/context/AuthContext';
import { useTetris } from '@/context/TetrisContext';
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { io, Socket } from 'socket.io-client';

const Multiplayer = () => {
  const { currentUser } = useAuth();
  const router = useRouter();
  const [hasConnection, setHasConnection] = useState(false);
  const [hasFindMatch, setHasFindMatch] = useState(false);
  const [socket, setSocket] = useState<Socket | null>(null);
  const [otherPlayerScore, setOtherPlayerScore] = useState(0);

  const { score, handleGameSeed } = useTetris();

  useEffect(() => {
    const socketInstance = io(`${SOCKET_URL}/matchmaking`, { transports: ['websocket'] });
    socketInstance.on('connect', () => {
      socketInstance.emit('joinQueue', { userId: currentUser?.id });
      setHasConnection(true);
    });

    socketInstance.on('matchFound', (data) => {
      handleGameSeed(data.seed);
      setHasFindMatch(true);
    });
    socketInstance.on('playerLeft', (data) => {
      console.log('player left');
    });
    socketInstance.on('playerReconnected', (data) => {
      console.log('player reconnected');
      setHasFindMatch(true);
    });

    socketInstance.on('liveScoreUpdate', (data: { userId: string; score: number }[]) => {
      const otherPlayer = data.find((player) => player.userId !== currentUser?.id);
      if (otherPlayer) {
        setOtherPlayerScore(otherPlayer.score);
      }
    });

    socketInstance.on('disconnect', () => {
      console.log(`disconnect`);
      setHasConnection(false);
      setHasFindMatch(false);
    });

    setSocket(socketInstance);

    return () => {
      socketInstance.disconnect();
      socketInstance.removeAllListeners();
    };
  }, []);

  useEffect(() => {
    if (socket && score !== null) {
      socket.emit('scoreUpdate', { userId: currentUser?.id, score });
    }
  }, [score, socket]);

  if (!hasConnection) {
    return (
      <View>
        <Text>Connexion au serveur....</Text>
        <TouchableOpacity
          onPress={() => {
            router.back();
          }}
        >
          <Text>Annuler</Text>
        </TouchableOpacity>
      </View>
    );
  }

  if (hasConnection && !hasFindMatch) {
    return (
      <View>
        <Text>Recherche d'une partie....</Text>
        <TouchableOpacity
          onPress={() => {
            router.back();
          }}
        >
          <Text>Annuler</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return <TetrisGame isMultiplayer otherPlayerScore={otherPlayerScore} />;
};

export default Multiplayer;
