// /api/getUserData.js
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_URL } from '../config';

export const getAchievements = async () => {
    try {
        const token = await AsyncStorage.getItem('token'); 

        if (!token) {
            throw new Error('Token non trouvé');
        }

        const response = await fetch(`${API_URL}/users/me/achievements/progress`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Une erreur est survenue');
        }

        const data = await response.json();
        
        return data;
    } catch (error) {
        console.error('Erreur de récupération des succès utilisateur', error);
        throw error;
    }
};
