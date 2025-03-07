import { API_URL } from '../config';

export const login = async (username, password) => {
    try {
        const response = await fetch(`${API_URL}/authentification/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }),
        });

        const data = await response.json();
        return data; 
    } catch (error) {
        console.error('Erreur de login', error);
        throw error;
    }
};
