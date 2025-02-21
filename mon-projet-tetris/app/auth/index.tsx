// app/auth/index.tsx
import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Link, useRouter } from 'expo-router';

export default function LoginScreen() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter();

    async function handleLogin() {
        // Vérification minimaliste
        // On lit dans AsyncStorage la clé "user_<email>"
        const storedUser = await AsyncStorage.getItem(`user_${email}`);
        if (!storedUser) {
            alert('Utilisateur non trouvé, ou pas inscrit');
            return;
        }
        const parsed = JSON.parse(storedUser);
        if (parsed.password !== password) {
            alert('Mot de passe incorrect');
            return;
        }
        // On stocke "logged in" quelque part, par ex. "currentUser"
        await AsyncStorage.setItem('currentUser', email);
        // redirect to home, or tetris
        router.push('/');
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Connexion</Text>

            <TextInput
                style={styles.input}
                placeholder="Email"
                placeholderTextColor="#999"
                value={email}
                onChangeText={setEmail}
            />
            <TextInput
                style={styles.input}
                placeholder="Mot de passe"
                placeholderTextColor="#999"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
            />

            <Button title="Se connecter" onPress={handleLogin} />

            <Link href="/auth/register" style={styles.link}>
                Pas de compte ? S’inscrire
            </Link>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex:1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#1A1A1A',
    },
    title: {
        color: '#fff', fontSize: 24, marginBottom: 20,
    },
    input: {
        width: '80%', padding: 10, marginBottom: 12, backgroundColor: '#333', color: '#fff',
        borderRadius: 8,
    },
    link: {
        color: 'skyblue',
        marginTop: 10,
    },
});
