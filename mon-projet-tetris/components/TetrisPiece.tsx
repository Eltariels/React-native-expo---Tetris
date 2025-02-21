// components/TetrisPiece.tsx
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Piece } from '@/types';

interface TetrisPieceProps {
    piece: Piece;
    isGhost?: boolean;
    scale?: number; // ex: 0.5 pour dessiner en plus petit
}

export default function TetrisPiece({ piece, isGhost, scale = 1 }: TetrisPieceProps) {
    const { shape, row, col } = piece;

    return (
        <View style={styles.container}>
            {shape.map((rowArr, r) =>
                rowArr.map((val, c) => {
                    if (val !== 0) {
                        return (
                            <View
                                key={`${r}-${c}`}
                                style={[
                                    styles.block,
                                    {
                                        // Position
                                        top: (row + r) * 20 * scale,
                                        left: (col + c) * 20 * scale,
                                        // Couleur (ghost = opacité)
                                        backgroundColor: getColor(val),
                                        opacity: isGhost ? 0.3 : 1,
                                        // Taille (scale)
                                        width: 20 * scale,
                                        height: 20 * scale,
                                    },
                                ]}
                            />
                        );
                    }
                    return null;
                })
            )}
        </View>
    );
}

function getColor(value: number): string {
    switch (value) {
        case 1: return '#00FFFF';
        case 2: return '#FFFF00';
        case 3: return '#FF00FF';
        case 4: return '#FFA500';
        case 5: return '#00FF00';
        case 6: return '#FF0000';
        case 7: return '#0000FF';
        default: return '#111';
    }
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        width: 0,
        height: 0,
    },
    block: {
        position: 'absolute',
        borderWidth: 1,
        borderColor: '#222',
    },
});
