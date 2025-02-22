import { useTetris } from '@/context/TetrisContext';
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { getStats } from '../api/profil/stats';
import AsyncStorage from '@react-native-async-storage/async-storage';

function formatSeconds(sec: number): string {
    const h = Math.floor(sec / 3600);
    const m = Math.floor((sec % 3600) / 60);
    const s = sec % 60;
    return `${h}h ${m}m ${s}s`;
}

export default function StatsScreen() {
    const [bestScore, setBestScore] = useState<number>(0);
    const [bestLines, setBestLines] = useState<number>(0);
    const [bestTime, setBestTime] = useState<number>(0);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchUserDataAndGames = async () => {
            try {
                const token = await AsyncStorage.getItem('token');
                if (token) {
                    const gamesData = await getStats();
                    
                    let maxScore = 0;
                    let maxLines = 0;
                    let minTime = 0;
                    
                    gamesData.data.forEach((game: { score: number; lines_cleared: number; duration: number }) => {
                        if (game.score > maxScore) {
                            maxScore = game.score;
                        }
                        if (game.lines_cleared > maxLines) {
                            maxLines = game.lines_cleared;
                        }
                        if (game.duration > minTime) {
                            minTime = game.duration;
                        }
                    });

                    setBestScore(maxScore);
                    setBestLines(maxLines);
                    setBestTime(minTime);
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
            <Text style={styles.title}>Mes Statistiques</Text>

            <View style={styles.statsBox}>
                <Text style={styles.statLabel}>Meilleur Score :</Text>
                <Text style={styles.statValue}>{bestScore}</Text>
            </View>

            <View style={styles.statsBox}>
                <Text style={styles.statLabel}>Plus de lignes :</Text>
                <Text style={styles.statValue}>{bestLines}</Text>
            </View>

            <View style={styles.statsBox}>
                <Text style={styles.statLabel}>Meilleur temps :</Text>
                <Text style={styles.statValue}>{formatSeconds(bestTime)}</Text>
            </View>
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
});
