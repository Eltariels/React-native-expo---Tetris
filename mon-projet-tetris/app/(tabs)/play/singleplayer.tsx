import TetrisGameComponent from '@/components/tetris/TetrisGameComponent';
import React from 'react';

export default function TetrisPage() {
  return <TetrisGameComponent isMultiplayer={false} seed={null} duelId={null} />;
}
