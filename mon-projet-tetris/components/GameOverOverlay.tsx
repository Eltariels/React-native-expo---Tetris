// components/GameOverOverlay.tsx
import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';

export default function GameOverOverlay({ visible }: { visible: boolean }) {
    const router = useRouter();
    if (!visible) return null;
    return (
        <View style={styles.overlay}>
            <Text style={styles.title}>Game Over</Text>
            <Pressable style={styles.button} onPress={() => router.push('/')}>
                <Text style={styles.buttonText}>Retour au menu</Text>
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    overlay: {
        position: 'absolute',
        top: 0, left: 0, right: 0, bottom: 0,
        backgroundColor: 'rgba(0,0,0,0.85)',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1000,
    },
    title: {
        fontSize: 32,
        color: '#fff',
        marginBottom: 20,
    },
    button: {
        backgroundColor: '#d43f3f',
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 8,
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
    },
});
