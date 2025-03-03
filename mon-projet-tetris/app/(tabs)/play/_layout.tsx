import { TetrisGameProvider } from '@/context/TestGameContext';
import { Stack } from 'expo-router';

export default function Layout() {
  return (
    <TetrisGameProvider>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="singleplayer" />
        <Stack.Screen name="multiplayer" />
      </Stack>
    </TetrisGameProvider>
  );
}
