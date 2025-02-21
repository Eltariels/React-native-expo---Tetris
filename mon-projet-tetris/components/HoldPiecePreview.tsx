// components/HoldPiecePreview.tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Piece } from '@/types';
import TetrisPiece from './TetrisPiece';

interface HoldPiecePreviewProps {
    piece: Piece | null;
}

export default function HoldPiecePreview({ piece }: HoldPiecePreviewProps) {
    return (
        <View style={styles.container}>
            <Text style={styles.label}>Hold :</Text>
            <View style={styles.previewArea}>
                {piece ? (
                    <TetrisPiece piece={{ ...piece, row: 0, col: 0 }} scale={0.5} />
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
    },
});
