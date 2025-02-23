import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { Link } from 'expo-router';
import { getUserData } from '../api/auth/me';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function ProfileScreen() {
    const [username, setUsername] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const token = await AsyncStorage.getItem('token');
                console.log(token);
                if (token) {
                    const userData = await getUserData();
                    setUsername(userData.data.username);
                }
            } catch (error) {
                console.error('Erreur de récupération des données utilisateur', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchUserData();
    }, []);

    if (isLoading) {
        return <Text style={styles.info}>Chargement...</Text>;
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Mon Profil</Text>

            <Image
                source={{ uri: 'https://picsum.photos/200' }}
                style={styles.avatar}
            />

            <Text style={styles.info}>Pseudo : {username || 'Non renseigné'}</Text>

            <Link href="/profile/stats" style={styles.link}>
                Voir mes stats
            </Link>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#1A1A1A',
        alignItems: 'center',
        paddingTop: 50,
    },
    title: {
        color: '#fff',
        fontSize: 24,
        marginBottom: 20,
        fontWeight: 'bold',
    },
    avatar: {
        width: 100,
        height: 100,
        borderRadius: 50,
        marginBottom: 20,
    },
    info: {
        color: '#ccc',
        fontSize: 16,
        marginBottom: 5,
    },
    link: {
        color: 'skyblue',
        marginTop: 20,
        fontSize: 16,
    },
});
