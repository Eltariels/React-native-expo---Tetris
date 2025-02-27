import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { getLeaderboard } from '../api/leaderboard';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function LeaderboardScreen() {
    const [leaderboard, setLeaderboard] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchUserDataAndGames = async () => {
            try {
                const token = await AsyncStorage.getItem('token');
                if (token) {
                    const leaderboardData = await getLeaderboard();
                    setLeaderboard(leaderboardData.data);
                }
            } catch (error) {
                console.error('Erreur de récupération des données', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchUserDataAndGames();
    }, []);

    if (isLoading) {
        return <Text style={styles.info}>Chargement...</Text>;
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Classement</Text>

            <ScrollView style={styles.list}>
                {leaderboard.map((game, index) => (
                    <View key={index} style={styles.statsBox}>
                        <Text style={styles.statLabel}>top {index + 1} :</Text>
                        <Text style={styles.statValue}>Score : {game.best_score}</Text>
                        <Text style={styles.statValue}>Joueur : {game.player.username}</Text>
                    </View>
                ))}
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#1A1A1A',
        paddingTop: 60,
        alignItems: 'center',
    },
    title: {
        color: '#fff',
        fontSize: 24,
        marginBottom: 30,
        fontWeight: 'bold',
    },
    statsBox: {
        marginBottom: 20,
        backgroundColor: '#333',
        padding: 15,
        borderRadius: 10,
        width: '80%',
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
    },
    list: {
        width: '100%',
        paddingHorizontal: 20,
    },
});
