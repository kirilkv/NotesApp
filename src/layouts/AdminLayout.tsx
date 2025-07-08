import React from 'react';
import { useAuth } from '../context/AuthContext';

const AdminLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const { logout } = useAuth();

    return (
        <div className="min-h-screen bg-gray-100">
            <nav className="bg-white shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between">
                    <h1 className="text-xl font-semibold">Admin Dashboard</h1>
                    <button
                        onClick={logout}
                        className="px-4 py-2 text-red-600 hover:text-red-800"
                    >
                        Logout
                    </button>
                </div>
            </nav>
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {children}
            </main>
        </div>
    );
};

export default AdminLayout;
