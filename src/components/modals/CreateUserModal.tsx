import React, { useState } from 'react';
import BaseModal from './BaseModal.tsx';
import {useToast} from "../../context/ToastContext.tsx";

interface CreateUserModalProps {
    isOpen: boolean;
    onClose: () => void;
    onCreate: (email: string, password: string) => void;
}

const CreateUserModal: React.FC<CreateUserModalProps> = ({ isOpen, onClose, onCreate }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { showToast } = useToast();

    const handleSubmit = async () => {
        if (!email.trim() || !password.trim()) {
            showToast('Admin must have an email and password.', 'error');
            return;
        }

        setIsSubmitting(true);
        try {
            await onCreate(email, password);
            showToast('Admin created successfully!', 'success');
            onClose();
            setIsSubmitting(false);
        } catch (error: any) {
            showToast(`Failed to create Admin: ${error.response.data.message}`, 'error');
        } finally {
            setIsSubmitting(false);
        }

    };

    return (
        <BaseModal isOpen={isOpen} onClose={onClose}>
            <h2 className="text-xl font-semibold">Create New Admin</h2>
            <div className="mt-4">
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                    className="w-full p-2 border rounded mb-4"
                />
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    className="w-full p-2 border rounded"
                />
            </div>
            <div className="mt-4 flex justify-end">
                <button
                    className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 mr-2"
                    onClick={onClose}
                >
                    Cancel
                </button>
                <button
                    className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                >
                    {isSubmitting ? 'Creating...' : 'Create'}
                </button>
            </div>
        </BaseModal>
    );
};

export default CreateUserModal;
