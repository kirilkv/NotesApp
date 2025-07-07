import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { adminAPI, notesAPI } from '../services/api';
import type { Note as NoteType, UserInfo } from '../types';
import Note from "./Note.tsx";

const AdminDashboard = () => {
    const { user, logout } = useAuth();
    const [activeTab, setActiveTab] = useState<'notes' | 'users'>('notes');
    const [notes, setNotes] = useState<NoteType[]>([]);
    const [users, setUsers] = useState<UserInfo[]>([]);
    const [isCreatingAdmin, setIsCreatingAdmin] = useState(false);
    const [newAdmin, setNewAdmin] = useState({ email: '', password: '' });
    const [error, setError] = useState('');

    useEffect(() => {
        if (activeTab === 'notes') {
            fetchAllNotes();
        } else {
            fetchAllUsers();
        }
    }, [activeTab]);

    const fetchAllNotes = async () => {
        try {
            const response = await notesAPI.getNotes();
            setNotes(response.data);
        } catch (error) {
            setError('Failed to fetch notes');
        }
    };

    const fetchAllUsers = async () => {
        try {
            const response = await adminAPI.getUsers();
            setUsers(response.data);
        } catch (error) {
            setError('Failed to fetch users');
        }
    };

    const handleCreateAdmin = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!user?.role || user.role !== 'ADMIN') {
            setError('Unauthorized: Only admins can create new admin accounts');
            return;
        }

        try {
            await adminAPI.createAdmin(newAdmin.email, newAdmin.password);
            setNewAdmin({ email: '', password: '' });
            setIsCreatingAdmin(false);
            setError('');
            fetchAllUsers(); // Refresh users list
        } catch (error) {
            setError('Failed to create admin account');
        }
    };

    return (
        <div className="min-h-screen bg-gray-100">
            <nav className="bg-white shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <div className="flex justify-between items-center">
                        <h1 className="text-xl font-semibold">Admin Dashboard</h1>
                        <button
                            onClick={logout}
                            className="px-4 py-2 text-red-600 hover:text-red-800"
                        >
                            Logout
                        </button>
                    </div>
                </div>
            </nav>

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {error && (
                    <div className="mb-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                        {error}
                    </div>
                )}

                <div className="mb-6">
                    <div className="border-b border-gray-200">
                        <nav className="-mb-px flex space-x-8">
                            <button
                                onClick={() => setActiveTab('notes')}
                                className={`${
                                    activeTab === 'notes'
                                        ? 'border-purple-500 text-purple-600'
                                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                } whitespace-nowrap py-4 px-1 border-b-2 font-medium`}
                            >
                                Notes
                            </button>
                            <button
                                onClick={() => setActiveTab('users')}
                                className={`${
                                    activeTab === 'users'
                                        ? 'border-purple-500 text-purple-600'
                                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                } whitespace-nowrap py-4 px-1 border-b-2 font-medium`}
                            >
                                Users
                            </button>
                        </nav>
                    </div>
                </div>

                {activeTab === 'users' && (
                    <div className="mb-8">
                        {user?.role === 'ADMIN' && !isCreatingAdmin ? (
                            <button
                                onClick={() => setIsCreatingAdmin(true)}
                                className="px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600"
                            >
                                Create New Admin
                            </button>
                        ) : null}

                        {isCreatingAdmin && (
                            <form onSubmit={handleCreateAdmin} className="bg-white p-4 rounded-lg shadow max-w-md">
                                <input
                                    type="email"
                                    value={newAdmin.email}
                                    onChange={(e) => setNewAdmin({ ...newAdmin, email: e.target.value })}
                                    className="w-full mb-2 p-2 border rounded"
                                    placeholder="Email"
                                    required
                                />
                                <input
                                    type="password"
                                    value={newAdmin.password}
                                    onChange={(e) => setNewAdmin({ ...newAdmin, password: e.target.value })}
                                    className="w-full mb-2 p-2 border rounded"
                                    placeholder="Password"
                                    required
                                    minLength={6}
                                />
                                <div className="flex justify-end space-x-2">
                                    <button
                                        type="button"
                                        onClick={() => setIsCreatingAdmin(false)}
                                        className="px-4 py-2 text-gray-600 hover:text-gray-800"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        className="px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600"
                                    >
                                        Create Admin
                                    </button>
                                </div>
                            </form>
                        )}

                        <div className="mt-6">
                            <h2 className="text-2xl font-bold mb-4">All Users</h2>
                            <div className="bg-white shadow overflow-hidden sm:rounded-lg">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Email
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Role
                                        </th>
                                    </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                    {users.map((user) => (
                                        <tr key={user.id}>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                {user.email}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                {user.role}
                                            </td>
                                        </tr>
                                    ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === 'notes' && (
                    <div className="space-y-4">
                        <h2 className="text-2xl font-bold mb-4">All Notes</h2>
                        {notes.map((note) => (
                            <Note
                                key={note.id}
                                note={note}
                                readOnly
                            />
                        ))}
                    </div>
                )}
            </main>
        </div>
    );
};

export default AdminDashboard;
