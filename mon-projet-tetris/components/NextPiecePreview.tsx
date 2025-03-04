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
    return (
        <View style={styles.container}>
            <Text style={styles.label}>Suivante</Text>
            <View style={styles.previewArea}>
                <TetrisPiece piece={{ ...piece, row: -1, col: -1.5 }} scale={0.8} />
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
