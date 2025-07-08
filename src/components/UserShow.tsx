import React, { useState, useEffect } from 'react';
import NotesList from './NotesList';
import ViewNoteModal from './modals/ViewNoteModal.tsx';
import Spinner from './Spinner';
import { notesAPI } from '../services/api';
import type { Note as NoteType, UserInfo } from '../types';
import { useToast } from '../context/ToastContext';

interface UserShowProps {
    user: UserInfo;
    onBack: () => void;
}

const UserShow: React.FC<UserShowProps> = ({ user, onBack }) => {
    const { showToast } = useToast();
    const [notes, setNotes] = useState<NoteType[]>([]);
    const [selectedNote, setSelectedNote] = useState<NoteType | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        fetchUserNotes();
    }, []);

    const fetchUserNotes = async () => {
        setIsLoading(true);
        try {
            const response = await notesAPI.getUserNotes(user.id);
            setNotes(response.data);
        } catch (error) {
            showToast(`Failed to fetch user notes: ${error.message}`, 'error');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div>
            <button
                onClick={onBack}
                className="mb-4 px-4 py-2 bg-gray-100 text-gray-600 rounded hover:bg-gray-200"
            >
                ← Back to Users
            </button>

            <div className="bg-white p-6 rounded-lg shadow mb-6">
                <h2 className="text-2xl font-bold text-gray-900">{user.email}</h2>
                <p className="text-gray-600 mt-2">
                    <span className="font-semibold">Total Notes:</span> {notes.length}
                </p>
            </div>

            {isLoading ? (
                <Spinner />
            ) : (
                <NotesList
                    notes={notes}
                    onView={(id) =>
                        setSelectedNote(notes.find((note) => note.id === id) || null)
                    }
                    isAdmin={true}
                    onDelete={() => {}}
                />
            )}

            {selectedNote && (
                <ViewNoteModal
                    isOpen={!!selectedNote}
                    note={selectedNote}
                    isAdmin={true}
                    onClose={() => setSelectedNote(null)}
                />
            )}
        </div>
    );
};

export default UserShow;
