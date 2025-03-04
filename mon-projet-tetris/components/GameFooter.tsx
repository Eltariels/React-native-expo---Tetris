// components/GameFooter.tsx
import React from 'react';
import { View, Pressable, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { useTetrisGame } from '@/context/TestGameContext';
import { FontAwesome } from '@expo/vector-icons';

export default function GameFooter() {
  const { game } = useTetrisGame();
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Pressable style={styles.button} onPress={() => game.togglePause()}>
        <FontAwesome name="pause" size={24} color="#fff" />
      </Pressable>

      <Pressable
        style={styles.button}
        onPress={() => {
          router.back();
          game.quitGame();
        }}
      >
        <FontAwesome name="power-off" size={24} color="#fff" />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    width: '100%',
    paddingHorizontal: 20,
  },
  button: {
    backgroundColor: '#555',
    padding: 10,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 20,
  },
});
