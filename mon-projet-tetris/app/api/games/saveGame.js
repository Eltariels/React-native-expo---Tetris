import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_URL } from '../../config';

export const saveGameScore = async (finalScore, finalLines, playTime) => {
    try {
        const token = await AsyncStorage.getItem('token');

        if (!token) {
            throw new Error('Token non trouvé');
        }

        const response = await fetch(`${API_URL}/games`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify({
                score: finalScore,
                lines_cleared: finalLines,
                duration: playTime,
            }),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Erreur lors de l’enregistrement du score');
        }

        console.log('Score enregistré avec succès');
    } catch (error) {
        console.error('Erreur lors de l’enregistrement du score :', error);
    }
};
