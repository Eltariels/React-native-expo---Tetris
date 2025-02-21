// components/HomeFooter.tsx
import React from 'react';
import { View, Text, StyleSheet, Pressable, Button, Platform } from 'react-native';
import {Link, useRouter} from 'expo-router';
import * as Application from 'expo-application';
import * as Updates from 'expo-updates';

export default function HomeFooter() {
    const router = useRouter();

    const quitApp = () => {
        // Sur Android uniquement, on peut "quitter" l'app:
        if (Platform.OS === 'android') {
            // On peut utiliser BackHandler.exitApp() OU un hack direct:
            // BackHandler.exitApp();
            Updates.reloadAsync();
            // reloadAsync() n'est pas vraiment quitter, mais redémarre l'app
            // Il n'y a pas de méthode 100% fiable pour quitter sur iOS.
        } else {
            // Sur iOS, quitter programmé n’est pas autorisé.
            console.log('Quitter l’app n’est pas autorisé sur iOS');
        }
    };

    return (
        <View style={styles.container}>
            {/* Bouton quitter (à gauche) */}
            <Pressable style={styles.button} onPress={quitApp}>
                <Text style={styles.buttonText}>Quitter</Text>
            </Pressable>

            {/* Bouton central : Jouer */}
            <View style={styles.playButtonContainer}>
                <Button
                    title="Jouer"
                    color="#d43f3f"
                    onPress={() => {
                        router.push('/tetris');
                    }}
                />
            </View>

            {/* Bouton profil (à droite) */}
            <Pressable style={styles.button} onPress={() => router.push('/profile')}>
                <Text style={styles.buttonText}>Profil</Text>
            </Pressable>

            <Button
                title="Succès"
                onPress={() => router.push('/achievements')}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        backgroundColor: '#333',
        padding: 10,
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    button: {
        paddingHorizontal: 20,
        paddingVertical: 10,
        backgroundColor: '#666',
        borderRadius: 5,
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
    playButtonContainer: {
        // Optionnel : pour mieux centrer / styliser le bouton "Jouer"
    },
});
