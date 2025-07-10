import React, { useState } from 'react';
import BaseModal from './BaseModal.tsx';
import {useToast} from "../../context/ToastContext.tsx";
import Spinner from "../Spinner.tsx";

interface CreateNoteModalProps {
    isOpen: boolean;
    onClose: () => void;
    onCreate: (title: string, content: string) => void;
    isLoading: boolean;
}

const CreateNoteModal: React.FC<CreateNoteModalProps> = ({ isOpen, onClose, onCreate, isLoading }) => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const { showToast } = useToast();

    const handleSubmit = () => {
        if (title.trim() && content.trim()) {
            onCreate(title, content);
        } else {
            showToast('Title and content are required.', 'error');
        }
    };

    return (
        <BaseModal isOpen={isOpen} onClose={onClose}>
            <h2 className="text-xl font-semibold">Create New Note</h2>
            <div className="mt-4">
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Title"
                    className="w-full p-2 border rounded mb-4"
                />
                <textarea
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="Content"
                    className="w-full p-2 border rounded h-40"
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
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                    onClick={handleSubmit}
                >
                    {isLoading ? <Spinner /> : 'Create'}
                </button>
            </div>
        </BaseModal>
    );
};

export default CreateNoteModal;
