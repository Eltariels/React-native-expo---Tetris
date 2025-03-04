import { Tabs, useRouter } from 'expo-router';
import React, { useEffect } from 'react';
import { Text } from 'react-native';
import { Ionicons, FontAwesome5, MaterialIcons } from '@expo/vector-icons';

import { HapticTab } from '@/components/HapticTab';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { useAuth } from '@/context/AuthContext';

export default function TabLayout() {
    const colorScheme = useColorScheme();
    const { isLoggedIn, verifyLogin } = useAuth();
    const router = useRouter();

    useEffect(() => {
        verifyLogin();
    }, []);

    useEffect(() => {
        verifyLogin();
    }, []);
    
    useEffect(() => {
        if (isLoggedIn === false) {
            router.replace('/auth');
        }
    }, [isLoggedIn]);
    
    if (isLoggedIn === null) return <Text>Loading...</Text>;
    

    return (
        <Tabs
            screenOptions={{
                tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
                headerShown: false,
                tabBarStyle: {
                    backgroundColor: colorScheme === 'dark' ? '#1E1E1E' : '#FFFFFF',
                    borderTopWidth: 0,
                    height: 70,
                    paddingBottom: 10,
                },
                tabBarButton: HapticTab,
                tabBarBackground: TabBarBackground,
            }}
        >
            {/* Accueil */}
            <Tabs.Screen
                name="index"
                options={{
                    title: '',
                    tabBarShowLabel: false,
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="home" size={size} color={color} />
                    ),
                }}
            />

            {/* Profil */}
            <Tabs.Screen
                name="profil"
                options={{
                    title: '',
                    tabBarShowLabel: false,
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="person-circle" size={size} color={color} />
                    ),
                }}
            />
            
            {/* Classement */}
            <Tabs.Screen
                name="leaderboard"
                options={{
                    title: '',
                    tabBarShowLabel: false,
                    tabBarIcon: ({ color, size }) => (
                        <FontAwesome5 name="list-ol" size={size} color={color} />
                    ),
                }}
            />

            {/* succes */}
            <Tabs.Screen
                name="achievements"
                options={{
                    title: '',
                    tabBarShowLabel: false,
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="trophy" size={size} color={color} />
                    ),
                }}
            />

            <Tabs.Screen name="play" options={{ href: null }} />
        </Tabs>
    );
}
