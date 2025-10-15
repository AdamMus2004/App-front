import { createContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import userApi from '../api/axios';

type User = {
    id: number;
    name: string;
    email: string;
    role: 'USER' | 'ADMIN';
};

type AuthContextType = {
    user: User | null;
    token: string | null;
    login: (email: string, password: string) => Promise<void>;
    logout: () => void;
    register: (name: string, email: string, password: string) => Promise<void>;
    fetchMe: () => Promise<void>;
};

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [token, setToken] = useState<string | null>(() => localStorage.getItem('token'));

    // Fetch current user if token exists
    useEffect(() => {
        if (token) fetchMe();
    }, [token]);

    const login = async (email: string, password: string) => {
        try {
            console.log("Sending login request:", { email, password });
            const response = await userApi.post('/auth/login', { email, password });
            console.log("Login response:", response.data);

            setToken(response.data.token);
            localStorage.setItem('token', response.data.token);
            await fetchMe();
        } catch (err: any) {
            console.error("Login error:", err.response?.data || err);
            throw err; // żeby LoginPage mogło wyświetlić błąd
        }
    };


    const register = async (name: string, email: string, password: string) => {
        await userApi.post('/auth/register', { name, email, password });
    };

    const logout = () => {
        setUser(null);
        setToken(null);
        localStorage.removeItem('token');
    };

    const fetchMe = async () => {
        if (!token) return;
        try {
            const response = await userApi.get('/auth/me', {
                headers: { Authorization: `Bearer ${token}` },
            });
            setUser(response.data);
        } catch {
            logout(); // token invalid
        }
    };

    return (
        <AuthContext.Provider value={{user, token, login, logout, register, fetchMe}}>
            {children}
        </AuthContext.Provider>
    );
};
