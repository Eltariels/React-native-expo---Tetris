// components/ScoreBoard.tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface ScoreBoardProps {
  score: number;
  lines: number;
  isMultiplayer: boolean;
  duration: number;
  otherPlayerScore?: number;
}

export default function ScoreBoard({ score, lines, isMultiplayer, duration, otherPlayerScore }: ScoreBoardProps) {
  return (
    <View style={styles.container}>
      <View style={styles.scoreContainer}>
        <Text style={styles.smallText}>Score</Text>
        <Text style={styles.scoreText}>{score}</Text>
      </View>
        <Text style={styles.smallText}>Lignes {lines}</Text>
        <Text style={styles.smallText}>Temps {duration}</Text>
      
      {isMultiplayer && <Text style={styles.text}>Score adversaire: {otherPlayerScore}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    marginBottom: 10,
    alignItems: 'center',
  },
  text: {
    color: '#fff',
    fontSize: 16,
  },
  smallText: {
    color: '#ccc',
    fontSize: 14,
  },
  scoreContainer: {
    alignItems: 'center',
  },
  scoreText: {
    color: '#fff',
    fontSize: 32,
    fontWeight: 'bold',
  },
});
