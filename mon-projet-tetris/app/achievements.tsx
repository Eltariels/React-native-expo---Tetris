// app/achievements.tsx
import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { useTetris } from '@/context/TetrisContext';

const ACHIEVEMENTS_DATA = [
    {
        id: 'SCORE_1000',
        title: 'Score 1000',
        description: 'Atteindre 1000 points en une partie',
    },
    {
        id: 'LINES_10',
        title: '10 lignes',
        description: 'Détruire au moins 10 lignes en une partie',
    },
    {
        id: 'PLAY_5_GAMES',
        title: '5 parties jouées',
        description: 'Jouer 5 parties au total',
    },
    // Ajouter d’autres si besoin...
];

export default function AchievementsScreen() {
    const { achievementsUnlocked } = useTetris();

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Succès</Text>

            <FlatList
                data={ACHIEVEMENTS_DATA}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => {
                    const unlocked = achievementsUnlocked[item.id] === true;
                    return (
                        <View style={styles.achievementItem}>
                            <Text style={[styles.achievementTitle, unlocked && styles.unlocked]}>
                                {item.title}
                            </Text>
                            <Text style={[styles.achievementDesc, unlocked && styles.unlocked]}>
                                {item.description}
                            </Text>
                            {unlocked ? <Text style={styles.unlockedTag}>Débloqué</Text> : <Text>Verrouillé</Text>}
                        </View>
                    );
                }}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#1A1A1A',
        padding: 20,
    },
    title: {
        color: '#fff',
        fontSize: 24,
        marginBottom: 20,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    achievementItem: {
        marginVertical: 10,
        backgroundColor: '#333',
        padding: 10,
        borderRadius: 8,
    },
    achievementTitle: {
        color: '#ccc',
        fontSize: 18,
        fontWeight: 'bold',
    },
    achievementDesc: {
        color: '#999',
        fontSize: 14,
        marginVertical: 4,
    },
    unlocked: {
        color: '#0f0',
    },
    unlockedTag: {
        color: '#0f0',
        fontStyle: 'italic',
    },
});
