// src/context/AuthContext.tsx
import React, { createContext, useState, useContext } from 'react';
import type {AuthResponse, UserInfo} from '../types';

interface AuthContextType {
    user: UserInfo | null;
    token: string | null;
    login: (response: AuthResponse) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<UserInfo | null>(() => {
        const storedUser = localStorage.getItem('user');
        return storedUser ? JSON.parse(storedUser) : null;
    });

    const [token, setToken] = useState<string | null>(() => localStorage.getItem('token'))


    const login = (response: AuthResponse) => {
        const userInfo: UserInfo = {
            id: response.id,
            email: response.email,
            role: response.role
        };
        localStorage.setItem('token', response.token);
        localStorage.setItem('user', JSON.stringify(userInfo));
        setToken(response.token);
        setUser(userInfo);
    };

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setToken(null);
        setUser(null);

    };

    return (
        <AuthContext.Provider value={{ user, token, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
