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
            <Text style={styles.label}>Prochaine pièce :</Text>
            {/* On peut afficher la pièce en version réduite ou simple */}
            <View style={styles.previewArea}>
                <TetrisPiece piece={{ ...piece, row: 0, col: 0 }} scale={0.5} />
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
    },
});
