// app/auth/register.tsx
import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Link, useRouter } from 'expo-router';

export default function RegisterScreen() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter();

    async function handleRegister() {
        const key = `user_${email}`;
        const existing = await AsyncStorage.getItem(key);
        if (existing) {
            alert('Compte déjà existant pour cet email');
            return;
        }
        const userObj = { email, password };
        await AsyncStorage.setItem(key, JSON.stringify(userObj));
        alert('Inscription OK, vous pouvez vous connecter');
        router.push('/auth');
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Inscription</Text>
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

            <Button title="S'inscrire" onPress={handleRegister} />

            <Link href="/auth" style={styles.link}>
                Déjà un compte ? Se connecter
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
