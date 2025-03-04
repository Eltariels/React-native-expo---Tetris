import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { getAchievements } from '../api/achievements';

export default function AchievementsScreen() {
    const [achievements, setAchievements] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchAchievements = async () => {
            try {
                const response = await getAchievements();
                setAchievements(response.data);
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
            <Text style={styles.title}>Mes Succès</Text>
            {achievements.map((achievement) => {
                const progress = Math.min(achievement.progress, achievement.required);
                return (
                    <View key={achievement.id} style={styles.achievementBox}>
                        <Text style={styles.achievementName}>{achievement.name}</Text>
                        <Text style={styles.achievementDescription}>{achievement.description}</Text>

                        <View style={styles.progressContainer}>
                            <Text
                                style={[
                                    styles.progressText,
                                    achievement.unlocked ? { color: '#4caf50' } : { color: '#f44336' },
                                ]}
                            >
                                {progress} / {achievement.required}
                            </Text>
                            <View style={[styles.progressBar, achievement.unlocked && { backgroundColor: '#4caf50' }]}>
                                <View
                                    style={[
                                        styles.progressFill,
                                        { width: `${(progress / achievement.required) * 100}%` },
                                        achievement.unlocked ? { backgroundColor: '#4caf50' } : { backgroundColor: '#f44336' },
                                    ]}
                                />
                            </View>
                        </View>
                    </View>
                );
            })}
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
        textAlign: 'center',
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
        fontSize: 16,
        fontWeight: 'bold',
        marginTop: 10,
    },
    progressContainer: {
        marginVertical: 10,
    },
    progressText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    progressBar: {
        height: 10,
        width: '100%',
        backgroundColor: '#ccc',
        borderRadius: 5,
        marginTop: 5,
    },
    progressFill: {
        height: '100%',
        borderRadius: 5,
    },
    info: {
        color: '#fff',
        fontSize: 16,
        textAlign: 'center',
    },
});
