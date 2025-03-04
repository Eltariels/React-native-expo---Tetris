import { API_URL } from '@/app/config';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createContext, useCallback, useContext, useState, useEffect } from 'react';
export type User = {
  id: string;
  username: string;
};
type Credential = { username: string; password: string };
const AuthContext = createContext<{
  signIn: (value: Credential) => Promise<void>;
  signOut: () => void;
  token?: string | null;
  isError: boolean;
  errorMessage: string;
  isLoggedIn: boolean | null;
  verifyLogin: () => Promise<void>;
  currentUser: User | null;
}>({
  signIn: async () => {},
  signOut: () => null,
  token: null,
  isError: false,
  errorMessage: '',
  isLoggedIn: null,
  verifyLogin: async () => {},
  currentUser: null,
});

export function useAuth() {
  const value = useContext(AuthContext);
  if (process.env.NODE_ENV !== 'production') {
    if (!value) {
      throw new Error('useAuth must be wrapped in a <AuthProvider />');
    }
  }

  return value;
}

export function AuthProvider(props: React.PropsWithChildren) {
  const [isError, setIsError] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [currentUser, setCurrentUser] = useState(null);
  const login = async (credential: Credential) => {
    try {
      const response = await fetch(`${API_URL}/authentification/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credential),
      });

      const data = await response.json();
      await AsyncStorage.setItem('token', data.data.access_token);
    } catch (error) {
      console.error('Erreur de login', error);
      throw error;
    }
    setIsLoggedIn(true);
  };

  const getCurrentUser = async () => {
    const token = await AsyncStorage.getItem('token');
    if (!token) {
      throw new Error('Token non trouvé');
    }
    const response = await fetch(`${API_URL}/authentification/me`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || 'Une erreur est survenue');
    }
    setIsLoggedIn(true);
    setCurrentUser(data.data);
    return data;
  };

  const verifyLogin = useCallback(async () => {
    try {
      await getCurrentUser();
    } catch (err) {
      console.log(err);
      setIsLoggedIn(false);
    }
  }, []);

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        await verifyLogin();
      } catch (err) {
        setIsLoggedIn(false);
      }
    };
  
    checkLoginStatus();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        signIn: async (credential: Credential) => {
          try {
            setIsError(false);
            await login(credential);
          } catch (err: any) {
            console.log(err.response.data.message);
            setIsLoggedIn(false);
            setIsError(true);
            if (err?.response?.data?.message) {
              setErrorMessage(err.response.data.message);
            } else {
              setErrorMessage('Une erreur est survenue');
            }
          }
        },
        signOut: async () => {
          AsyncStorage.removeItem('token');
          setIsLoggedIn(false);
        },
        currentUser,
        isError,
        errorMessage,
        isLoggedIn,
        verifyLogin,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}
