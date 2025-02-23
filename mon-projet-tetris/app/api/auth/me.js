// /api/getUserData.js
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_URL } from '../../config';

export const getUserData = async () => {
    try {
        const token = await AsyncStorage.getItem('token'); 

        if (!token) {
            throw new Error('Token non trouvé');
        }

        const response = await fetch(`${API_URL}/authentification/me`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });

        const data = await response.json();
        
        if (!response.ok) {
            throw new Error(data.message || 'Une erreur est survenue');
        }

        return data;
    } catch (error) {
        console.error('Erreur de récupération des données utilisateur', error);
        throw error;
    }
};
