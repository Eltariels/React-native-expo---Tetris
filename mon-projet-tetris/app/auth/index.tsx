import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { Link, useRouter } from 'expo-router';
import { useAuth } from '../../context/AuthContext';

export default function LoginScreen() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const { signIn, isLoggedIn } = useAuth();
    const router = useRouter();

    async function handleLogin() {
        try {
            await signIn({ username, password });
            router.push('/');
        } catch (error) {
            alert('Erreur de connexion, veuillez réessayer.');
        }
    }

    useEffect(() => {
        if (isLoggedIn) {
            router.push('/');
        }
    }, [isLoggedIn, router]);

    if (isLoggedIn) {
        return null;
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Connexion</Text>

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

            <Button title="Se connecter" onPress={handleLogin} />

            <Link href="/auth/register" style={styles.link}>
                Pas de compte ? S’inscrire
            </Link>
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
    link: {
        color: 'skyblue',
        marginTop: 10,
    },
});
