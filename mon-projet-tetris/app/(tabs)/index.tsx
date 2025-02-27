import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { getUserData } from '../api/auth/me';  // Import de la fonction pour récupérer les données utilisateur
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import HomeFooter from '../../components/HomeFooter';  // Votre footer

export default function HomeScreen() {
    const [username, setUsername] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [userData, setUserData] = useState<any>(null);
    const router = useRouter();

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
        <View style={styles.container}>
            <View style={styles.content}>
                <Text style={styles.title}>Bienvenue {username || 'Utilisateur'}!</Text>

                <Button title="Déconnexion" onPress={handleLogout} color="#FF6347" />
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
});
