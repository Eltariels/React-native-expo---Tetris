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
                        <View style={styles.statsRow}>
                            <Text style={styles.position}>{index + 1}</Text>
                            <Text style={styles.username}>{game.player.username}</Text>
                            <Text style={styles.score}>{game.best_score}</Text>
                        </View>
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
        width: '100%',
    },
    statsRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    position: {
        color: '#ccc',
        fontSize: 16,
        fontWeight: 'bold',
        width: '10%',
    },
    username: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
        width: '70%',
    },
    score: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
        width: '20%',
        textAlign: 'right',
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
