import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { getAchievements } from '../api/achievements'; // Assure-toi que cette fonction existe

export default function AchievementsScreen() {
    const [achievements, setAchievements] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchAchievements = async () => {
            try {
                const response = await getAchievements();
                setAchievements(response.data);  // Assure-toi que 'data' contient la liste des achievements
            } catch (error) {
                console.error('Erreur de récupération des achievements', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchAchievements();
    }, []);

    if (isLoading) {
        return <Text style={styles.info}>Chargement...</Text>;
    }

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.title}>Mes Achievements</Text>
            {achievements.map((achievement) => (
                <View key={achievement.id} style={styles.achievementBox}>
                    <Text style={styles.achievementName}>{achievement.name}</Text>
                    <Text style={styles.achievementDescription}>{achievement.description}</Text>
                    <Text style={styles.achievementStatus}>
                        {achievement.unlocked ? 'Débloqué' : 'Non débloqué'}
                    </Text>
                </View>
            ))}
        </ScrollView>
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
    },
    achievementBox: {
        backgroundColor: '#333',
        padding: 15,
        borderRadius: 10,
        marginBottom: 20,
    },
    achievementName: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    achievementDescription: {
        color: '#ccc',
        fontSize: 16,
    },
    achievementStatus: {
        color: '#4caf50',  // Vert pour débloqué
        fontSize: 16,
        fontWeight: 'bold',
        marginTop: 10,
    },
    info: {
        color: '#fff',
        fontSize: 16,
        textAlign: 'center',
    },
});
