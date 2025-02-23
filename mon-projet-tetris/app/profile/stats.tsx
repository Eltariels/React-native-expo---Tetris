import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { getStats } from '../api/profil/stats';

export default function StatsScreen() {
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [userData, setUserData] = useState<any>({});
    
        useEffect(() => {
            const fetchUserData = async () => {
                try {
                    const stats = await getStats();
                    setUserData(stats.data);
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
            <Text style={styles.title}>Mes Statistiques</Text>

            <View style={styles.statsBox}>
                <Text style={styles.statLabel}>Parties jouées :</Text>
                <Text style={styles.statValue}>{userData.totalGames}</Text>
            </View>

            <View style={styles.statsBox}>
                <Text style={styles.statLabel}>Temps joué :</Text>
                <Text style={styles.statValue}>{userData.timePlayed}</Text>
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
                <Text style={styles.statLabel}>Succes completés :</Text>
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
