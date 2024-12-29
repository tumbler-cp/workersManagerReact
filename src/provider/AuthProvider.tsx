import { createContext, ReactNode, useState } from 'react';
import { User } from '../model/Auth';
import axios from 'axios';

interface AuthContextType {
    user: User | null;
    signin: (username: string, password: string) => Promise<void>;
    signup: (username: string, password: string) => Promise<void>;
    signout: () => void;
    upd: () => Promise<void>;
    adminRequest: () => Promise<void>;
    loading: boolean;
}

export const AuthContext = createContext<AuthContextType | undefined>(
    undefined,
);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const tokenKey = 'workers_token';

    const me = async () => {
        await axios
            .get('/util/me')
            .then((response) => {
                setUser(response.data);
            })
            .catch((error) => {
                setUser(null);
                console.error(error);
            });
    };

    const signin = async (username: string, password: string) => {
        setLoading(true);
        const response = await axios.post('/auth/authenticate', {
            username,
            password,
        });
        localStorage.setItem(tokenKey, response.data.token);
        axios.defaults.headers.common.Authorization = `Bearer ${response.data.token}`;
        await me();
        setLoading(false);
    };

    const signup = async (username: string, password: string) => {
        setLoading(true);
        const response = await axios.post('/auth/register', {
            username,
            password,
        });
        localStorage.setItem(tokenKey, response.data.token);
        axios.defaults.headers.common.Authorization = `Bearer ${localStorage.getItem('workers_token')}`;
        await me();
        setLoading(false);
    };

    const upd = async () => {
        setLoading(true);
        const token = localStorage.getItem(tokenKey);
        if (token) {
            axios.defaults.headers.common.Authorization = `Bearer ${token}`;
            try {
                await me();
            } catch (error) {
                console.error('Failed to fetch user:', error);
            }
        }
        setLoading(false);
    };

    const adminRequest = async () => {
        await axios.post('/admin/request').catch((error) => {
            console.error(error);
        });
    };

    const signout = () => {
        setUser(null);
        localStorage.removeItem(tokenKey);
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                signin,
                signup,
                signout,
                upd,
                loading,
                adminRequest,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};
