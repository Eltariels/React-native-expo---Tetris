import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getUserData } from '@/api/auth/me';
import { getProfil } from '@/api/profil';

export default function ProfileScreen() {
    const [userData, setUserData] = useState<any>({});
    const [username, setUsername] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const token = await AsyncStorage.getItem('token');
                if (token) {
                    const user = await getUserData();
                    setUsername(user.data.username);
                    
                    const stats = await getProfil();
                    setUserData(stats.data);
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

    const formatTime = (seconds: number) => {
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        const secs = seconds % 60;
        return `${hours}h ${minutes}m ${secs}s`;
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>{username}</Text>

            <View style={styles.statsBox}>
                <Text style={styles.statLabel}>Parties jouées :</Text>
                <Text style={styles.statValue}>{userData.totalGames}</Text>
            </View>

            <View style={styles.statsBox}>
                <Text style={styles.statLabel}>Temps joué :</Text>
                <Text style={styles.statValue}>{formatTime(userData.timePlayed)}</Text>
            </View>

            <View style={styles.statsBox}>
                <Text style={styles.statLabel}>Meilleur Score :</Text>
                <Text style={styles.statValue}>{userData.bestScore}</Text>
            </View>

            <View style={styles.statsBox}>
                <Text style={styles.statLabel}>Score total :</Text>
                <Text style={styles.statValue}>{userData.totalScore}</Text>
            </View>

            <View style={styles.statsBox}>
                <Text style={styles.statLabel}>Succes complétés :</Text>
                <Text style={styles.statValue}>{userData.achievementComplete}</Text>
            </View>

            <View style={styles.statsBox}>
                <Text style={styles.statLabel}>Succes total :</Text>
                <Text style={styles.statValue}>{userData.totalAchievement}</Text>
            </View>

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#1A1A1A',
        paddingTop: 60,
        paddingHorizontal: 20,
    },
    title: {
        color: '#fff',
        fontSize: 24,
        marginBottom: 30,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    statsBox: {
        marginBottom: 20,
        backgroundColor: '#333',
        padding: 15,
        borderRadius: 10,
        width: '100%',
    },
    statLabel: {
        color: '#ccc',
        fontSize: 16,
    },
    statValue: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    info: {
        color: '#fff',
        fontSize: 16,
        textAlign: 'center',
    },
});
