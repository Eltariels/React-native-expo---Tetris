import TetrisGameComponent from '@/components/tetris/TetrisGameComponent';
import { useAuth } from '@/context/AuthContext';
import { useTetrisGame } from '@/context/TestGameContext';
import { useSocket } from '@/hooks/useSocket';
import { useFocusEffect, useRouter } from 'expo-router';
import { useCallback, useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const Multiplayer = () => {
  const { currentUser } = useAuth();
  const router = useRouter();
  const [hasFindMatch, setHasFindMatch] = useState(false);
  const [otherPlayerScore, setOtherPlayerScore] = useState(0);
  const [seed, setSeed] = useState<null | number>(null);
  const [duelId, setDuelId] = useState<null | string>(null);

  const { socket, hasConnection, hasError } = useSocket();
  const { game } = useTetrisGame();

  useFocusEffect(
    useCallback(() => {
      if (!socket) return;
      socket.emit('joinQueue', { userId: currentUser?.id });

      socket.on('matchFound', (data) => {
        setSeed(data.seed);
        setDuelId(data.duelId);
        setHasFindMatch(true);
      });

      socket.on('playerLeft', () => {
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
    }, [socket])
  );

  useEffect(() => {
    if (!socket) return;
    socket.emit('scoreUpdate', { userId: currentUser?.id, score: game.getScore() });
  }, [game.getScore(), socket]);

  if (hasError) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Une erreur est survenue</Text>
        <TouchableOpacity style={styles.button} onPress={() => router.back()}>
          <Text style={styles.buttonText}>Retour</Text>
        </TouchableOpacity>
      </View>
    );
  }

  if (!hasConnection) {
    return (
      <View style={styles.container}>
        <Text style={styles.statusText}>Connexion au serveur...</Text>
        <ActivityIndicator size="large" color="#ffffff" />
        <TouchableOpacity style={styles.button} onPress={() => router.back()}>
          <Text style={styles.buttonText}>Annuler</Text>
        </TouchableOpacity>
      </View>
    );
  }

  if (hasConnection && !hasFindMatch) {
    return (
      <View style={styles.container}>
        <Text style={styles.statusText}>Recherche d'une partie...</Text>
        <ActivityIndicator size="large" color="#ffffff" />
        <TouchableOpacity style={styles.button} onPress={() => router.replace('/')}>
          <Text style={styles.buttonText}>Annuler</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    seed &&
    duelId && <TetrisGameComponent isMultiplayer otherPlayerScore={otherPlayerScore} seed={seed} duelId={duelId} />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a1a',
    alignItems: 'center',
    justifyContent: 'center',
  },
  statusText: {
    fontSize: 20,
    color: '#ffffff',
    marginBottom: 20,
  },
  errorText: {
    fontSize: 20,
    color: '#ff5555',
    marginBottom: 20,
  },
  button: {
    marginTop: 20,
    backgroundColor: '#d43f3f',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
  },
  buttonText: {
    fontSize: 18,
    color: '#ffffff',
  },
});

export default Multiplayer;
