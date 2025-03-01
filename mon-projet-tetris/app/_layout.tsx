import { Slot } from 'expo-router';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { TetrisProvider } from '@/context/TetrisContext';
import { View } from 'react-native';
import { AuthProvider } from '@/context/AuthContext';

export default function Layout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
        <AuthProvider>
          <View style={{ flex: 1, backgroundColor: '#000' }}>
            <Slot />
          </View>
        </AuthProvider>
    </GestureHandlerRootView>
  );
}
