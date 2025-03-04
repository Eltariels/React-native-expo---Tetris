import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { useTetrisGame } from '@/context/TestGameContext'; // Assurez-vous d'importer le contexte

export default function GameOverOverlay({ visible }: { visible: boolean }) {
    const router = useRouter();
    const { game, setGame, refreshGame } = useTetrisGame();

    if (!visible) return null;

    const handleRestart = () => {
        const newGame = game.retrieveGame(false, null, null, refreshGame);
        setGame(newGame);
        router.back();
    };

    return (
        <View style={styles.overlay}>
            <Text style={styles.title}>Game Over</Text>
            <Pressable style={styles.button} onPress={handleRestart}>
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
