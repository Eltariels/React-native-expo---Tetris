// app/tetris.tsx
import React, { useCallback, useEffect } from 'react';

// On n'importe plus TetrisProvider, car il est déjà dans _layout.tsx
// import { TetrisProvider } from '@/context/TetrisContext';

import { View, StyleSheet, Text } from 'react-native';
import { useTetris } from '@/context/TetrisContext';
import TetrisBoard from '@/components/TetrisBoard';
import ScoreBoard from '@/components/ScoreBoard';
import NextPiecePreview from '@/components/NextPiecePreview';
import HoldPiecePreview from '@/components/HoldPiecePreview';
import PauseOverlay from '@/components/PauseOverlay';
import GameFooter from '@/components/GameFooter';
import GameControls from '@/components/GameControls';
import GameOverOverlay from '@/components/GameOverOverlay';
import { useFocusEffect, useNavigation } from 'expo-router';

type Props = {
  isMultiplayer: boolean;
  otherPlayerScore?: number;
};

export default function TetrisGame({ isMultiplayer, otherPlayerScore }: Props) {
  const navigation = useNavigation('/(tabs)');
  useFocusEffect(
    useCallback(() => {
      navigation.setOptions({
        headerShown: false,
        tabBarStyle: { display: 'none' },
      });
    }, [])
  );

  const {
    board,
    activePiece,
    ghostPiece,
    nextPiece,
    holdPiece,
    score,
    lines,
    isPaused,
    togglePause,
    gameOver,
    handleRetrieveGame,
  } = useTetris();

  useEffect(() => {
    handleRetrieveGame(isMultiplayer ? 'multiplayer' : 'singleplayer');
  }, [isMultiplayer]);

  if (!activePiece || !nextPiece || !ghostPiece) {
    return <Text>Cant find piece</Text>;
  }

  return (
    <View style={styles.container}>
      <PauseOverlay visible={isPaused} onResume={togglePause} />

      <View style={styles.topRow}>
        <HoldPiecePreview piece={holdPiece} />
        <ScoreBoard score={score} lines={lines} isMultiplayer={isMultiplayer} otherPlayerScore={otherPlayerScore} />
        <NextPiecePreview piece={nextPiece} />
      </View>

      <TetrisBoard board={board} activePiece={activePiece} ghostPiece={ghostPiece} />

      <GameOverOverlay visible={gameOver} />

      <GameControls />
      <GameFooter isMultiplayer={isMultiplayer} />
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
