// src/components/UserDashboard.tsx
import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { notesAPI } from '../services/api';
import type { Note as NoteType } from '../types';
import Note from './Note';

const UserDashboard = () => {
    const { user, logout } = useAuth();
    const [notes, setNotes] = useState<NoteType[]>([]);
    const [newNote, setNewNote] = useState({ title: '', content: '' });
    const [isCreating, setIsCreating] = useState(false);

    useEffect(() => {
        fetchNotes();
    }, []);

    const fetchNotes = async () => {
        try {
            const response = await notesAPI.getNotes();
            setNotes(response.data);
        } catch (error) {
            console.error('Failed to fetch notes:', error);
        }
    };

    const handleCreateNote = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await notesAPI.createNote(newNote);
            setNotes([...notes, response.data]);
            setNewNote({ title: '', content: '' });
            setIsCreating(false);
        } catch (error) {
            console.error('Failed to create note:', error);
        }
    };

    const handleUpdateNote = async (id: bigint, title: string, content: string) => {
        try {
            const response = await notesAPI.updateNote(id, { title, content });
            setNotes(notes.map(note => note.id === id ? response.data : note));
        } catch (error) {
            console.error('Failed to update note:', error);
        }
    };

    const handleDeleteNote = async (id: bigint) => {
        try {
            await notesAPI.deleteNote(id);
            setNotes(notes.filter(note => note.id !== id));
        } catch (error) {
            console.error('Failed to delete note:', error);
        }
    };

    console.log(user)

    return (
        <div className="min-h-screen bg-gray-100">
            <nav className="bg-white shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <div className="flex justify-between items-center">
                        <h1 className="text-xl font-semibold">Welcome, {user?.email}</h1>
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
                    {!isCreating ? (
                        <button
                            onClick={() => setIsCreating(true)}
                            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                        >
                            Create New Note
                        </button>
                    ) : (
                        <form onSubmit={handleCreateNote} className="bg-white p-4 rounded-lg shadow">
                            <input
                                type="text"
                                value={newNote.title}
                                onChange={(e) => setNewNote({ ...newNote, title: e.target.value })}
                                className="w-full mb-2 p-2 border rounded"
                                placeholder="Title"
                                required
                            />
                            <textarea
                                value={newNote.content}
                                onChange={(e) => setNewNote({ ...newNote, content: e.target.value })}
                                className="w-full mb-2 p-2 border rounded"
                                placeholder="Content"
                                rows={4}
                                required
                            />
                            <div className="flex justify-end space-x-2">
                                <button
                                    type="button"
                                    onClick={() => setIsCreating(false)}
                                    className="px-4 py-2 text-gray-600 hover:text-gray-800"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                                >
                                    Create
                                </button>
                            </div>
                        </form>
                    )}
                </div>

                <div className="space-y-4">
                    {notes.map((note) => (
                        <Note
                            key={note.id}
                            note={note}
                            onUpdate={handleUpdateNote}
                            onDelete={handleDeleteNote}
                        />
                    ))}
                </div>
            </main>
        </div>
    );
};

export default UserDashboard;
