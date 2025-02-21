// components/GameControls.tsx
import React from 'react';
import { View, Pressable, Text, StyleSheet } from 'react-native';
import VirtualJoystick from './VirtualJoystick';
import { useTetris } from '@/context/TetrisContext';

export default function GameControls() {
    const { rotate, hold } = useTetris();

    return (
        <View style={styles.container}>
            {/* Bouton pour Rotate à gauche */}
            <Pressable style={styles.sideButton} onPress={rotate}>
                <Text style={styles.buttonText}>⤾</Text>
            </Pressable>

            {/* Joystick virtuel au centre */}
            <VirtualJoystick />

            {/* Bouton pour Hold à droite */}
            <Pressable style={styles.sideButton} onPress={hold}>
                <Text style={styles.buttonText}>H</Text>
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20,
    },
    sideButton: {
        backgroundColor: '#444',
        padding: 10,
        borderRadius: 8,
        marginHorizontal: 20,
    },
    buttonText: {
        color: '#fff',
        fontSize: 28,
        fontWeight: 'bold',
    },
});
