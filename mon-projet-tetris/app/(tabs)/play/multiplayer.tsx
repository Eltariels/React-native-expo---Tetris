import TetrisGameComponent from '@/components/tetris/TetrisGameComponent';
import { useAuth } from '@/context/AuthContext';
import { useSocket } from '@/hooks/useSocket';
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

const Multiplayer = () => {
  const { currentUser } = useAuth();
  const router = useRouter();
  const [hasFindMatch, setHasFindMatch] = useState(false);
  const [otherPlayerScore, setOtherPlayerScore] = useState(0);
  const [seed, setSeed] = useState<null | number>(null);
  const [duelId, setDuelId] = useState<null | string>(null);

  const { socket, hasConnection, hasError } = useSocket();
  useEffect(() => {
    if (!socket) return;
    socket.emit('joinQueue', { userId: currentUser?.id });

    socket.on('matchFound', (data) => {
      setSeed(data.seed);
      setDuelId(data.duelId);
      setHasFindMatch(true);
    });

    socket.on('playerLeft', (data) => {
      console.log('player left');
    });
    socket.on('playerReconnected', (data) => {
      console.log('player reconnected');
      setSeed(data.seed);
      setDuelId(data.duelId);
      setHasFindMatch(true);
    });

    socket.on('liveScoreUpdate', (data: { userId: string; score: number }[]) => {
      const otherPlayer = data.find((player) => player.userId !== currentUser?.id);
      if (otherPlayer) {
        setOtherPlayerScore(otherPlayer.score);
      }
    });
  }, [socket]);

  // useEffect(() => {
  //   if (socket && score !== null) {
  //     socket.emit('scoreUpdate', { userId: currentUser?.id, score });
  //   }
  // }, [score, socket]);

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

  return seed && duelId && <TetrisGameComponent isMultiplayer otherPlayerScore={otherPlayerScore} seed={seed} duelId={duelId} />;
};

export default Multiplayer;
