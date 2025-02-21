// app/index.tsx
import React from 'react';
import { View, Text, StyleSheet, ImageBackground } from 'react-native';
import HomeFooter from '../components/HomeFooter';

export default function HomeScreen() {
    return (
        <View style={styles.container}>
            <View style={styles.content}>
                <Text style={styles.title}>TETRIS APP</Text>
                <Text style={styles.subtitle}>Bienvenue sur le Tetris du turfu</Text>
                <Text style={styles.subtitle}>Sélectionnez "Jouer" pour commencer</Text>
            </View>

            <HomeFooter />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#1A1A1A',
        justifyContent: 'space-between',
    },
    content: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
    },
    title: {
        color: '#fff',
        fontSize: 32,
        marginBottom: 20,
        fontWeight: 'bold',
    },
    subtitle: {
        color: '#ccc',
        fontSize: 16,
        marginBottom: 10,
    },
});
