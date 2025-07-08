import React, {useState, useEffect} from 'react';
import NotesList from '../components/NotesList.tsx';
import CreateUserModal from '../components/modals/CreateUserModal.tsx';
import ViewNoteModal from '../components/modals/ViewNoteModal.tsx';
import {notesAPI, adminAPI} from '../services/api.ts';
import {useToast} from '../context/ToastContext.tsx';
import type {Note as NoteType, UserInfo} from '../types';
import UserShow from "../components/UserShow.tsx";
import AdminSubNav from "../components/AdminSubNav.tsx";
import UsersList from "../components/UsersList.tsx";

const AdminDashboard: React.FC = () => {
    const {showToast} = useToast();
    const [activeTab, setActiveTab] = useState<'notes' | 'users'>('notes');
    const [notes, setNotes] = useState<NoteType[]>([]);
    const [isCreateUserModalOpen, setIsCreateUserModalOpen] = useState(false);
    const [selectedNote, setSelectedNote] = useState<NoteType | null>(null);
    const [users, setUsers] = useState<UserInfo[]>([]);
    const [selectedUser, setSelectedUser] = useState<UserInfo | null>(null);

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
        } catch {
            showToast('Failed to fetch notes.', 'error');
        }
    };

    const fetchAllUsers = async () => {
        try {
            const response = await adminAPI.getUsers();
            setUsers(response.data);
        } catch (error) {
            showToast(`Failed to fetch users: ${error.message}`, 'error')
        }
    };

    const handleCreateAdmin = async (email: string, password: string) => {
        const response = await adminAPI.createAdmin(email, password);
        if (response.status >= 200 && response.status < 300) {
            setUsers((prev) => [...prev, response.data]);
            showToast('Admin created successfully!', 'success');
            return;
        }
        showToast('Failed to create admin', 'error');
    };


    return (
        <div>
            {!selectedUser && <AdminSubNav activeTab={activeTab} setActiveTab={setActiveTab} />}

            {activeTab === 'notes' && (
                <NotesList
                    notes={notes}
                    onView={(id) =>
                        setSelectedNote(notes.find((note) => note.id === id) || null)
                    }
                    onDelete={() => {
                    }}
                    isAdmin
                />
            )}
            {activeTab === 'users' && (
                <>
                    {!selectedUser ? (
                        <div>
                            <button
                                onClick={() => setIsCreateUserModalOpen(true)}
                                className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
                            >
                                + Create Admin
                            </button>
                            <UsersList users={users} setSelectedUser={setSelectedUser} />
                        </div>
                    ) : (
                        <UserShow
                            user={selectedUser}
                            onBack={() => setSelectedUser(null)}
                        />
                    )}
                </>
            )}

            {selectedNote && (
                <ViewNoteModal
                    isOpen={!!selectedNote}
                    note={selectedNote}
                    isAdmin
                    onClose={() => setSelectedNote(null)}
                />
            )}

            <CreateUserModal
                isOpen={isCreateUserModalOpen}
                onClose={() => setIsCreateUserModalOpen(false)}
                onCreate={handleCreateAdmin}
            />
        </div>
    );
};

export default AdminDashboard;
