import { useRouter } from 'expo-router';
import { Text, TouchableOpacity, View } from 'react-native';

const PlayMenu = () => {
  const router = useRouter();
  return (
    <View>
      <TouchableOpacity
        onPress={() => {
          router.push('/play/tetris');
        }}
      >
        <Text>SinglePlayer</Text>
      </TouchableOpacity>
      {/* <TouchableOpacity onPress={()=>{router.push('/play/multiplayer')}}>
            <Text>Multiplayer</Text>
            </TouchableOpacity> */}
    </View>
  );
};

export default PlayMenu;
