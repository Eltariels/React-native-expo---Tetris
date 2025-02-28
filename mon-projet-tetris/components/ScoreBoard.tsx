// components/ScoreBoard.tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface ScoreBoardProps {
  score: number;
  lines: number;
  isMultiplayer: boolean;
  otherPlayerScore?: number;
}

export default function ScoreBoard({ score, lines, isMultiplayer, otherPlayerScore }: ScoreBoardProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Score: {score}</Text>
      {isMultiplayer && <Text style={styles.text}>Score adversaire: {otherPlayerScore}</Text>}
      <Text style={styles.text}>Lignes: {lines}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
    alignItems: 'center',
  },
  text: {
    color: '#fff',
    fontSize: 16,
  },
});
