// components/NextPiecePreview.tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Piece } from '@/types';
import TetrisPiece from './TetrisPiece'; 

/** On peut afficher la NextPiece en miniature */
interface NextPiecePreviewProps {
    piece: Piece;
}

export default function NextPiecePreview({ piece }: NextPiecePreviewProps) {
    let row = -1;
    let col = -1.5;

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

    const adjustedPiece = {
        ...piece,
        row,
        col,
    };

    return (
        <View style={styles.container}>
            <Text style={styles.label}>Suivante</Text>
            <View style={styles.previewArea}>
                <TetrisPiece piece={adjustedPiece} scale={0.8} />
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
        position: 'relative',
        backgroundColor: '#111',
        borderWidth: 2,
        borderColor: '#fff',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
