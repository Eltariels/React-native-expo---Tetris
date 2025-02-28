import TetrisGame from '@/components/tetris/TetrisGame';
import { useAuth } from '@/context/AuthContext';
import { useTetris } from '@/context/TetrisContext';
import { useSocket } from '@/hooks/useSocket';
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

const Multiplayer = () => {
  const { currentUser } = useAuth();
  const router = useRouter();
  const [hasFindMatch, setHasFindMatch] = useState(false);
  const [otherPlayerScore, setOtherPlayerScore] = useState(0);

  const { score, handleGameSeed } = useTetris();
  const { socket, hasConnection, hasError } = useSocket();
  useEffect(() => {
    if (!socket) return;
    socket.emit('joinQueue', { userId: currentUser?.id });

    socket.on('matchFound', (data) => {
      handleGameSeed(data.seed);
      setHasFindMatch(true);
    });
    socket.on('playerLeft', (data) => {
      console.log('player left');
    });
    socket.on('playerReconnected', (data) => {
      console.log('player reconnected');
      setHasFindMatch(true);
    });

    socket.on('liveScoreUpdate', (data: { userId: string; score: number }[]) => {
      const otherPlayer = data.find((player) => player.userId !== currentUser?.id);
      if (otherPlayer) {
        setOtherPlayerScore(otherPlayer.score);
      }
    });
  }, [socket]);

  useEffect(() => {
    if (socket && score !== null) {
      socket.emit('scoreUpdate', { userId: currentUser?.id, score });
    }
  }, [score, socket]);

  if (hasError) {
    return (
      <View>
        <Text>Une erreur est survenue</Text>
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
