// components/GameControls.tsx
import React from 'react';
import { View, Pressable, Text, StyleSheet } from 'react-native';
import VirtualJoystick from './VirtualJoystick';
import { useTetrisGame } from '@/context/TestGameContext';

export default function GameControls() {
  const { game } = useTetrisGame();

  return (
    <View style={styles.container}>
      {/* Bouton pour Rotate à gauche */}
      <Pressable style={styles.sideButton} onPress={() => game.rotate()}>
        <Text style={styles.buttonText}>⤾</Text>
      </Pressable>

      {/* Joystick virtuel au centre */}
      <VirtualJoystick />

      {/* Bouton pour Hold à droite */}
      <Pressable style={styles.sideButton} onPress={() => game.hold()}>
        <Text style={styles.buttonText}>H</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  sideButton: {
    backgroundColor: '#444',
    padding: 10,
    borderRadius: 8,
    marginHorizontal: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 28,
    fontWeight: 'bold',
  },
});
