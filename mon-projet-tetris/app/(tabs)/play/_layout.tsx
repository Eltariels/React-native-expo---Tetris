import { TetrisProvider } from '@/context/TetrisContext';
import { Stack } from 'expo-router';

export default function Layout() {
  return (
    <TetrisProvider>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="singleplayer" />
        <Stack.Screen name="multiplayer" />
      </Stack>
    </TetrisProvider>
  );
}
