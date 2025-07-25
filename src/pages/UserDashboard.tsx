import React, { useState, useEffect } from 'react';
import NotesList from '../components/NotesList.tsx';
import ConfirmationModal from '../components/modals/ConfirmationModal.tsx';
import CreateNoteModal from '../components/modals/CreateNoteModal.tsx';
import ViewNoteModal from '../components/modals/ViewNoteModal.tsx';
import { notesAPI } from '../services/api.ts';
import { useToast } from '../context/ToastContext.tsx';
import type { Note as NoteType } from '../types';
import Spinner from "../components/Spinner.tsx";

const UserDashboard: React.FC = () => {
    const { showToast } = useToast();
    const [notes, setNotes] = useState<NoteType[]>([]);
    const [selectedNote, setSelectedNote] = useState<NoteType | null>(null);
    const [isCreateNoteModalOpen, setIsCreateNoteModalOpen] = useState(false);
    const [noteToDelete, setNoteToDelete] = useState<NoteType | null>(null);
    const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        fetchNotes();
    }, []);

    const fetchNotes = async () => {
        setIsLoading(true);
        try {
            const response = await notesAPI.getNotes();
            setNotes(response.data);
        } catch (error: any) {
            showToast(`Failed to fetch notes: ${error.message}`, 'error');
        } finally {
            setIsLoading(false);
        }
    };

    const handleCreateNote = () => {
        setIsCreateNoteModalOpen(true);
    };

    const handleSaveNote = async (title: string, content: string) => {
        setIsLoading(true);
        try {
            const response = await notesAPI.createNote({ title, content });
            setNotes((prev) => [...prev, response.data]);
            setSelectedNote(null);
            setIsCreateNoteModalOpen(false);
            showToast('Note created successfully!', 'success');
        } catch (error: any) {
            showToast(`Failed to create note: ${error.response.data.message}`, 'error');
        } finally {
            setIsLoading(false);
        }
    };

    const handleDeleteClick = (id: bigint) => {
        const note = notes.find((note) => note.id === id);
        if (note) {
            setNoteToDelete(note);
            setIsConfirmationModalOpen(true);
        }
    };

    const handleDeleteNote = async () => {
        if (noteToDelete) {
            setIsLoading(true)
            try {
                await notesAPI.deleteNote(noteToDelete.id);
                setNotes((prev) => prev.filter((note) => note.id !== noteToDelete.id));
                showToast('Note deleted successfully!', 'success');
            } catch (error: any) {
                showToast(`Failed to delete the note: ${error.response.data.message}`, 'error');
            } finally {
                setIsConfirmationModalOpen(false);
                setNoteToDelete(null);
                setIsLoading(false)
            }
        }
    };

    return (
        <div>
            <h1 className="text-2xl font-bold mb-4">My Notes</h1>

            <button
                onClick={handleCreateNote}
                className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 mb-4"
            >
                + Create Note
            </button>

            {isLoading ? (<Spinner />) : (
                <NotesList
                    notes={notes}
                    onView={(id) => setSelectedNote(notes.find((note) => note.id === id) || null)}
                    onDelete={handleDeleteClick}
                />
            )}

            {selectedNote && (
                <ViewNoteModal
                    isOpen={!!selectedNote}
                    note={selectedNote}
                    isLoading={isLoading}
                    isAdmin={false} // Regular user can edit
                    onClose={() => setSelectedNote(null)}
                    onUpdate={async (id, title, content) => {
                        setIsLoading(true);
                        try {
                            const updatedNote = await notesAPI.updateNote(id, { title, content });
                            setNotes((prev) =>
                                prev.map((note) =>
                                    note.id === id ? updatedNote.data : note
                                )
                            );
                            setSelectedNote(null);
                            showToast('Note updated successfully!', 'success');
                        } catch (error: any) {
                            showToast(`Failed to update note: ${error.response.data.message}`, 'error');
                        } finally {
                            setIsLoading(false);
                        }
                    }}
                />
            )}

            <CreateNoteModal
                isOpen={isCreateNoteModalOpen}
                onClose={() => setIsCreateNoteModalOpen(false)}
                onCreate={handleSaveNote}
                isLoading={isLoading}
            />

            <ConfirmationModal
                isOpen={isConfirmationModalOpen}
                title="Delete Note"
                message={`Are you sure you want to delete the note "${noteToDelete?.title}"? This action cannot be undone.`}
                onConfirm={handleDeleteNote}
                onCancel={() => {
                    setIsConfirmationModalOpen(false);
                    setNoteToDelete(null);
                }}
                isLoading={isLoading}
            />
        </div>
    );
};

export default UserDashboard;
