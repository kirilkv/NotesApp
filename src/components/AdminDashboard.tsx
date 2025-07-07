// src/components/AdminDashboard.tsx
import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import {adminAPI, notesAPI} from '../services/api';
import type { Note as NoteType } from '../types';
import Note from "./Note.tsx";

const AdminDashboard = () => {
    const { logout } = useAuth();
    const [notes, setNotes] = useState<NoteType[]>([]);
    const [isCreatingAdmin, setIsCreatingAdmin] = useState(false);
    const [newAdmin, setNewAdmin] = useState({ email: '', password: '' });
    const [error, setError] = useState('');

    useEffect(() => {
        fetchAllNotes();
    }, []);

    const fetchAllNotes = async () => {
        try {
            const response = await notesAPI.getNotes();
            setNotes(response.data);
        } catch (error) {
            console.error('Failed to fetch notes:', error);
        }
    };

    const handleCreateAdmin = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await adminAPI.createAdmin(newAdmin.email, newAdmin.password);
            setNewAdmin({ email: '', password: '' });
            setIsCreatingAdmin(false);
            setError('');
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
                <div className="mb-8">
                    {!isCreatingAdmin ? (
                        <button
                            onClick={() => setIsCreatingAdmin(true)}
                            className="px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600"
                        >
                            Create New Admin
                        </button>
                    ) : (
                        <form onSubmit={handleCreateAdmin} className="bg-white p-4 rounded-lg shadow max-w-md">
                            {error && (
                                <div className="mb-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                                    {error}
                                </div>
                            )}
                            <input
                                type="text"
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
                </div>

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
            </main>
        </div>
    );
};

export default AdminDashboard;
