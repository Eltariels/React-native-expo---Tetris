// components/HoldPiecePreview.tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Piece } from '@/types';
import TetrisPiece from './TetrisPiece';

interface HoldPiecePreviewProps {
    piece: Piece | null;
}

export default function HoldPiecePreview({ piece }: HoldPiecePreviewProps) {
    let row = -1;
    let col = -1.5;
    if (piece){
        if (JSON.stringify(piece.shape) === JSON.stringify([[1], [1], [1], [1]])) {
            row = -2;
            col = -0.5;
        }
        else if (JSON.stringify(piece.shape) === JSON.stringify([[2, 2], [2, 2]])) {
            row = -1;
            col = -1;
        }
        else if (JSON.stringify(piece.shape) === JSON.stringify([[4, 0, 0], [4, 0, 0], [4, 4, 0]])) {
            row = -1.5;
            col = -1;
        }
    }

    const adjustedPiece = {
        ...piece,
        row,
        col,
    };
    
    return (
        <View style={styles.container}>
            <Text style={styles.label}>Hold</Text>
            <View style={styles.previewArea}>
                {piece ? (
                    <TetrisPiece piece={adjustedPiece} scale={0.8} />
                ) : (
                    <Text style={{ color: '#777' }}>Vide</Text>
                )}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginVertical: 10,
        alignItems: 'center',
    },
    label: {
        color: '#fff',
        fontSize: 16,
        marginBottom: 4,
    },
    previewArea: {
        width: 80,
        height: 80,
        backgroundColor: '#111',
        position: 'relative',
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 2,
        borderColor: '#fff',
        borderRadius: 10,
    },
});
