import {Tabs, useRouter} from 'expo-router';
import React, {useEffect} from 'react';
import {Platform, Text, Image} from 'react-native';

import {HapticTab} from '@/components/HapticTab';
import TabBarBackground from '@/components/ui/TabBarBackground';
import {Colors} from '@/constants/Colors';
import {useColorScheme} from '@/hooks/useColorScheme';
import {useAuth} from '@/context/AuthContext';

export default function TabLayout() {
    const colorScheme = useColorScheme();
    const {isLoggedIn, verifyLogin} = useAuth();
    const router = useRouter();

    useEffect(() => {
        verifyLogin();
    }, []);

    if (isLoggedIn === null) return <Text>Loading...</Text>;

    if (isLoggedIn === false) {
        router.replace('/auth');
    }

    return (
        <Tabs
            screenOptions={{
                tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
                headerShown: false,
                tabBarStyle: {
                    backgroundColor: '#464646',
                    borderTopWidth: 0,
                    height: 78,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    paddingHorizontal: 20,
                    paddingVertical: 50,
                },
                tabBarButton: HapticTab,
                tabBarBackground: TabBarBackground,
            }}
        >
            <Tabs.Screen
                name="index"
                options={{
                    title: '',
                    tabBarShowLabel: false,
                    tabBarIcon: () => (
                        <Image
                            source={require('../../assets/images/list.jpg')}
                            style={{width: 32, height: 32, padding: 10}} // Ajustement de la taille et couleur
                        />
                    ),
                }}
            />
            <Tabs.Screen
                name="play"
                options={{
                    title: '',
                    tabBarShowLabel: false,
                    tabBarIcon: () => (
                        <Image
                            source={require('../../assets/images/user.jpg')}
                            style={{width: 32, height: 32, padding: 10}} // Ajustement de la taille et couleur
                        />
                    ),
                }}
            />
            <Tabs.Screen
                name="leaderboard"
                options={{
                    title: '',
                    tabBarShowLabel: false,
                    tabBarIcon: () => (
                        <Image
                            source={require('../../assets/images/stats.jpg')}
                            style={{width: 32, height: 32, padding: 10}} // Ajustement de la taille et couleur
                        />
                    ),
                }}
            />
        </Tabs>
    );
}
