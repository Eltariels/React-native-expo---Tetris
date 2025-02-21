// components/PauseOverlay.tsx
import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';

interface PauseOverlayProps {
    visible: boolean;
    onResume: () => void; // fonction pour reprendre
}

export default function PauseOverlay({ visible, onResume }: PauseOverlayProps) {
    if (!visible) return null;

    return (
        <View style={styles.overlay} pointerEvents="auto">
            <View style={styles.content}>
                <Text style={styles.title}>Jeu en pause</Text>
                <Text style={styles.subtitle}>Touchez le bouton ci-dessous pour continuer</Text>

                <Pressable style={styles.resumeButton} onPress={onResume}>
                    <Text style={styles.resumeText}>Reprendre</Text>
                </Pressable>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    overlay: {
        position: 'absolute',
        top: 0, left: 0, right: 0, bottom: 0,
        backgroundColor: 'rgba(0,0,0,0.5)',
        zIndex: 999,
        justifyContent: 'center',
        alignItems: 'center',
    },
    content: {
        backgroundColor: '#222',
        padding: 30,
        borderRadius: 10,
        alignItems: 'center',
    },
    title: {
        color: '#fff',
        fontSize: 24,
        marginBottom: 10,
    },
    subtitle: {
        color: '#ccc',
        fontSize: 16,
        marginBottom: 20,
    },
    resumeButton: {
        backgroundColor: '#555',
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 8,
    },
    resumeText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});
