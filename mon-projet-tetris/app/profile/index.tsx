// app/profile/index.tsx
import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { Link } from 'expo-router';

export default function ProfileScreen() {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Mon Profil</Text>

            {/* Simulons un avatar */}
            <Image
                source={{ uri: 'https://placekitten.com/200/200' }}
                style={styles.avatar}
            />

            <Text style={styles.info}>Pseudo : JohnDoe</Text>
            <Text style={styles.info}>Email : johndoe@example.com</Text>

            {/* Bouton ou Link vers la page stats */}
            <Link href="/profile/stats" style={styles.link}>
                Voir mes stats
            </Link>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#1A1A1A',
        alignItems: 'center',
        paddingTop: 50,
    },
    title: {
        color: '#fff',
        fontSize: 24,
        marginBottom: 20,
        fontWeight: 'bold',
    },
    avatar: {
        width: 100,
        height: 100,
        borderRadius: 50,
        marginBottom: 20,
    },
    info: {
        color: '#ccc',
        fontSize: 16,
        marginBottom: 5,
    },
    link: {
        color: 'skyblue',
        marginTop: 20,
        fontSize: 16,
    },
});
