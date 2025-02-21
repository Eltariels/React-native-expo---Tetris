// components/TetrisBoard.tsx
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Board, Piece } from '@/types';
import TetrisPiece from './TetrisPiece';

interface TetrisBoardProps {
    board: Board;
    activePiece: Piece;
    ghostPiece: Piece;
}

export default function TetrisBoard({ board, activePiece, ghostPiece }: TetrisBoardProps) {
    const rows = board.length;
    const cols = board[0].length;

    const renderedCells = board.map((row, rowIndex) =>
        row.map((cell, colIndex) => (
            <View
                key={`${rowIndex}-${colIndex}`}
                style={[
                    styles.cell,
                    { backgroundColor: getCellColor(cell) },
                ]}
            />
        ))
    );

    return (
        <View style={styles.container}>
            <View style={[styles.grid, { width: cols * 20, height: rows * 20 }]}>
                {renderedCells}
                {/* Ghost Piece (semi-transparent) */}
                <TetrisPiece piece={ghostPiece} isGhost />
                {/* Active Piece (solide) */}
                <TetrisPiece piece={activePiece} />
            </View>
        </View>
    );
}

function getCellColor(value: number): string {
    switch (value) {
        case 1: return '#00FFFF';
        case 2: return '#FFFF00';
        case 3: return '#FF00FF';
        case 4: return '#FFA500';
        case 5: return '#00FF00'; // S
        case 6: return '#FF0000'; // Z
        case 7: return '#0000FF'; // J
        default: return '#111';   // vide
    }
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
    },
    grid: {
        position: 'relative',
        flexWrap: 'wrap',
        flexDirection: 'row',
    },
    cell: {
        width: 20,
        height: 20,
        borderWidth: 1,
        borderColor: '#222',
    },
});
