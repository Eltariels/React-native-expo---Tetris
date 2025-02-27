// app/tetris.tsx
import React from 'react';

// On n'importe plus TetrisProvider, car il est déjà dans _layout.tsx
// import { TetrisProvider } from '@/context/TetrisContext';

import { View, StyleSheet } from 'react-native';
import { useTetris } from '@/context/TetrisContext';
import TetrisBoard from '@/components/TetrisBoard';
import ScoreBoard from '@/components/ScoreBoard';
import NextPiecePreview from '@/components/NextPiecePreview';
import HoldPiecePreview from '@/components/HoldPiecePreview';
import PauseOverlay from '@/components/PauseOverlay';
import GameFooter from '@/components/GameFooter';
import GameControls from '@/components/GameControls';
import GameOverOverlay from '@/components/GameOverOverlay';

export default function TetrisPage() {
  const { board, activePiece, ghostPiece, nextPiece, holdPiece, score, lines, isPaused, togglePause } = useTetris();

  const { gameOver } = useTetris();

  return (
    <View style={styles.container}>
      <PauseOverlay visible={isPaused} onResume={togglePause} />

      <View style={styles.topRow}>
        <HoldPiecePreview piece={holdPiece} />
        <ScoreBoard score={score} lines={lines} />
        <NextPiecePreview piece={nextPiece} />
      </View>

      <TetrisBoard board={board} activePiece={activePiece} ghostPiece={ghostPiece} />

      <GameOverOverlay visible={gameOver} />

      <GameControls />
      <GameFooter />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 40,
    backgroundColor: '#000',
  },
  topRow: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
});
