// src/components/Login.tsx
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.tsx';
import { authAPI } from '../services/api.ts';
import {useToast} from "../context/ToastContext.tsx";

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();
    const { showToast } = useToast();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await authAPI.login(email, password);
            login(response.data);
            if (response.data.role === 'ROLE_ADMIN') {
                console.log('Should navigate to admin');
                navigate('/admin');
            } else {
                console.log('Should navigate to dashboard');
                navigate('/dashboard');
            }
        } catch (error: any) {
            showToast(`Failed to login: ${error.message}`, 'error');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg space-y-8">
                <div className="text-center">
                    <h1 className="text-4xl font-bold text-gray-900">Login</h1>
                </div>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                            Email
                        </label>
                        <input
                            id="email"
                            type="email"
                            required
                            className="mt-1 block w-full px-4 py-3 rounded-md border border-gray-300 shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter your email"
                        />
                    </div>

                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                            Password
                        </label>
                        <input
                            id="password"
                            type="password"
                            required
                            className="mt-1 block w-full px-4 py-3 rounded-md border border-gray-300 shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter your password"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full py-3 px-4 border border-transparent rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 font-medium"
                    >
                        Sign in
                    </button>
                </form>

                <div className="text-center">
                    <Link
                        to="/register"
                        className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
                    >
                        Don't have an account? Sign up
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Login;
