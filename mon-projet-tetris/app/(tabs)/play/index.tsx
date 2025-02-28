import { useFocusEffect, useNavigation, useRouter } from 'expo-router';
import { useCallback } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

const PlayMenu = () => {
  const router = useRouter();
  const navigation = useNavigation('/(tabs)');
  useFocusEffect(
    useCallback(() => {
      navigation.setOptions({
        headerShown: true,
        tabBarStyle: { display: 'flex' },
      });
    }, [])
  );
  return (
    <View>
      <TouchableOpacity
        onPress={() => {
          router.push('/play/singleplayer');
        }}
      >
        <Text>SinglePlayer</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          router.push('/play/multiplayer');
        }}
      >
        <Text>Multiplayer</Text>
      </TouchableOpacity>
    </View>
  );
};

export default PlayMenu;
