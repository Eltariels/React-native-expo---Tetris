// app/auth/register.tsx

import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { register } from '../api/auth/register';
import { useRouter } from 'expo-router';

export default function RegisterScreen() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter();

    async function handleRegister() {
        try {
            const data = await register(username, password);
            alert('Inscription réussie, vous pouvez vous connecter.');
            router.push('/auth');
        } catch (error) {
            alert('Erreur d\'inscription, veuillez réessayer.');
        }
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Inscription</Text>
            <TextInput
                style={styles.input}
                placeholder="Nom d'utilisateur"
                placeholderTextColor="#999"
                value={username}
                onChangeText={setUsername}
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
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#1A1A1A',
    },
    title: {
        color: '#fff',
        fontSize: 24,
        marginBottom: 20,
    },
    input: {
        width: '80%',
        padding: 10,
        marginBottom: 12,
        backgroundColor: '#333',
        color: '#fff',
        borderRadius: 8,
    },
});
