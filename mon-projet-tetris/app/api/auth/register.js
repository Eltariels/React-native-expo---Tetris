// /api/register.js

import { API_URL } from '../../config';

export const register = async (username, password) => {
    try {
        const response = await fetch(`${API_URL}/authentification/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }),
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || 'Une erreur est survenue');
        }

        return data;
    } catch (error) {
        console.error('Erreur d\'inscription', error);
        throw error;
    }
};
