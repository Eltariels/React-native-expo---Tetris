import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ImageBackground, TouchableOpacity } from 'react-native';
import { getUserData } from '../api/auth/me';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Audio } from 'expo-av';

export default function HomeScreen() {
    const [username, setUsername] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [userData, setUserData] = useState<any>(null);
    const router = useRouter();
    const [sound, setSound] = useState<Audio.Sound | null>(null);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const user = await getUserData();
                setUserData(user);
                setUsername(user.data.username);
            } catch (err) {
                setError('Erreur lors de la récupération des données utilisateur');
            } finally {
                setLoading(false);
            }
        };

        fetchUserData();
    }, []);

    useEffect(() => {
        const playMusic = async () => {
            const { sound } = await Audio.Sound.createAsync(
                require('../../assets/music/tetris.mp3'),
                { shouldPlay: true, isLooping: true }
            );
            setSound(sound);
            await sound.playAsync();
        };

        playMusic();
        return () => {
            if (sound) {
                sound.unloadAsync();
            }
        };
    }, []);

    const handleLogout = async () => {
        await AsyncStorage.removeItem('token');
        router.push('/auth');
    };

    if (loading) {
        return (
            <View style={styles.container}>
                <Text style={styles.title}>Chargement...</Text>
            </View>
        );
    }

    if (error) {
        return (
            <View style={styles.container}>
                <Text style={styles.title}>{error}</Text>
            </View>
        );
    }

    return (
        <ImageBackground source={require('../../assets/images/background.jpg')} style={styles.container}>
            <View style={styles.content}>
                <View style={styles.titleContainer}>
                    <Text style={[styles.letter, styles.letterShadow, styles.letterBold, { color: '#FF0' }]}>T</Text>
                    <Text style={[styles.letter, styles.letterShadow, styles.letterBold, { color: '#00ffff' }]}>E</Text>
                    <Text style={[styles.letter, styles.letterShadow, styles.letterBold, { color: '#F00' }]}>T</Text>
                    <Text style={[styles.letter, styles.letterShadow, styles.letterBold, { color: '#0F0' }]}>R</Text>
                    <Text style={[styles.letter, styles.letterShadow, styles.letterBold, { color: '#F70' }]}>I</Text>
                    <Text style={[styles.letter, styles.letterShadow, styles.letterBold, { color: '#A0F' }]}>S</Text>
                </View>
                <Text style={styles.subtitle}>Bienvenue sur le jeu du tetris {username || 'Utilisateur'} !</Text>

                <View style={styles.buttonContainer}>
                    <TouchableOpacity
                        style={[styles.button, { backgroundColor: '#4294FF' }]}
                        onPress={() => router.push('/play/singleplayer')}
                    >
                        <Text style={styles.buttonText}>Partie solo</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity
                        style={[styles.button, { backgroundColor: '#FFA443' }]}
                        onPress={() => router.replace('/play/multiplayer')}
                    >
                        <Text style={styles.buttonText}>Partie multijoueur</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity
                        style={[styles.button, { backgroundColor: '#FF4242' }]}
                        onPress={handleLogout}
                    >
                        <Text style={styles.buttonText}>Déconnexion</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between',
    },
    content: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
    },
    titleContainer: {
        flexDirection: 'row',
        marginBottom: 12,
    },
    title: {
        color: '#fff',
        fontSize: 32,
        marginBottom: 12,
        fontWeight: 'bold',
        textShadowColor: 'rgba(0, 0, 0, 0.75)',
        textShadowOffset: { width: 3, height: 3 },
        textShadowRadius: 5,
    },
    letter: {
        fontSize: 38,
        fontWeight: 'bold',
        marginHorizontal: 2,
    },
    letterBold: {
        textShadowColor: 'rgba(0, 0, 0, 1)',
        textShadowOffset: { width: 4, height: 4 },
        textShadowRadius: 6,
    },
    letterShadow: {
        textShadowColor: 'rgba(0, 0, 0, 0.8)',
        textShadowOffset: { width: 2, height: 2 },
        textShadowRadius: 4,
    },
    subtitle: {
        fontSize: 22,
        textShadowColor: 'rgba(0, 0, 0, 0.8)',
        textShadowOffset: { width: 2, height: 2 },
        textShadowRadius: 6,
        color: '#fff',
        marginBottom: 12,
        fontWeight: 'bold',
    },
    buttonContainer: {
        width: 200,
        marginBottom: 12,
        alignSelf: 'center',
    },
    button: {
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
});
