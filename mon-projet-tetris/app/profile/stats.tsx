// app/profile/stats.tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTetris } from '@/context/TetrisContext';

function formatSeconds(sec: number): string {
    const h = Math.floor(sec / 3600);
    const m = Math.floor((sec % 3600) / 60);
    const s = sec % 60;
    return `${h}h ${m}m ${s}s`;
}

export default function StatsScreen() {
    const {
        bestScore,
        bestLines,
        gamesPlayed,
        totalPlayTime,
    } = useTetris();

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Mes Statistiques</Text>

            <View style={styles.statsBox}>
                <Text style={styles.statLabel}>Meilleur Score :</Text>
                <Text style={styles.statValue}>{bestScore}</Text>
            </View>

            <View style={styles.statsBox}>
                <Text style={styles.statLabel}>Meilleur total de lignes :</Text>
                <Text style={styles.statValue}>{bestLines}</Text>
            </View>

            <View style={styles.statsBox}>
                <Text style={styles.statLabel}>Parties jouées :</Text>
                <Text style={styles.statValue}>{gamesPlayed}</Text>
            </View>

            <View style={styles.statsBox}>
                <Text style={styles.statLabel}>Temps de jeu total :</Text>
                <Text style={styles.statValue}>{formatSeconds(totalPlayTime)}</Text>
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
        flexDirection: 'row',
        marginBottom: 15,
    },
    statLabel: {
        color: '#ccc',
        fontSize: 16,
        marginRight: 10,
    },
    statValue: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});
