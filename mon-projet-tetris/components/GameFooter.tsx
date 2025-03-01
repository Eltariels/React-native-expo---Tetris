// components/GameFooter.tsx (exemple)
import React from 'react';
import { View, Pressable, Text, StyleSheet } from 'react-native';
import { useTetris } from '@/context/TetrisContext';
import { useRouter } from 'expo-router';

export default function GameFooter({ isMultiplayer }: { isMultiplayer: boolean }) {
  const { togglePause, handleQuitGame } = useTetris();
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Pressable style={styles.button} onPress={togglePause}>
        <Text style={styles.btnText}>Pause</Text>
      </Pressable>

      <Pressable
        style={styles.button}
        onPress={() => {
          router.back();
          handleQuitGame(isMultiplayer ? 'multiplayer' : 'singleplayer');
        }}
      >
        <Text style={styles.btnText}>Quitter</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    // Espace horizontal
    justifyContent: 'space-around',
    // Ou un padding plus grand
    padding: 20,
    backgroundColor: '#222',
  },
  button: {
    backgroundColor: '#555',
    paddingHorizontal: 30,
    paddingVertical: 10,
    borderRadius: 8,
    marginHorizontal: 20, // Espace autour du bouton
  },
  btnText: {
    color: '#fff',
    fontSize: 16,
  },
});
