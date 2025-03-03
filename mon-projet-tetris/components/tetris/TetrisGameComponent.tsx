// app/tetris.tsx
import React, { useCallback, useEffect } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import TetrisBoard from '@/components/TetrisBoard';
import ScoreBoard from '@/components/ScoreBoard';
import NextPiecePreview from '@/components/NextPiecePreview';
import HoldPiecePreview from '@/components/HoldPiecePreview';
import PauseOverlay from '@/components/PauseOverlay';
import GameFooter from '@/components/GameFooter';
import GameControls from '@/components/GameControls';
import GameOverOverlay from '@/components/GameOverOverlay';
import { useFocusEffect, useNavigation } from 'expo-router';
import { useTetrisGame } from '@/context/TestGameContext';

type Props = {
  isMultiplayer: boolean;
  seed: number | null;
  duelId: string | null;
  otherPlayerScore?: number;
};

export default function TetrisGameComponent({ isMultiplayer, seed, duelId, otherPlayerScore }: Props) {
  const navigation = useNavigation('/(tabs)');
  useFocusEffect(
    useCallback(() => {
      navigation.setOptions({
        headerShown: false,
        tabBarStyle: { display: 'none' },
      });
    }, [])
  );

  const { game, setGame, refreshGame } = useTetrisGame();

  useEffect(() => {
    setGame(game.retrieveGame(isMultiplayer, seed, duelId, refreshGame));
  }, [isMultiplayer]);

  if (!game.getState().activePiece || !game.getState().nextPiece || !game.getState().ghostPiece) {
    return <Text>Cant find piece</Text>;
  }

  return (
    <View style={styles.container}>
      <PauseOverlay visible={game.getState().isPaused} onResume={() => game.togglePause()} />

      <View style={styles.topRow}>
        <HoldPiecePreview piece={game.getState().holdPiece} />
        <ScoreBoard
          score={game.getState().score}
          lines={game.getState().lines}
          duration={game.getState().duration}
          isMultiplayer={isMultiplayer}
          otherPlayerScore={otherPlayerScore}
        />
        <NextPiecePreview piece={game.getState().nextPiece} />
      </View>

      <TetrisBoard
        board={game.getState().board}
        activePiece={game.getState().activePiece}
        ghostPiece={game.getState().ghostPiece}
      />

      <GameOverOverlay visible={game.getState().gameOver} />

      <GameControls />
      <GameFooter />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 100,
    backgroundColor: '#000',
  },
  topRow: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
});
