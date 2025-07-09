import React, { useState } from 'react';
import BaseModal from './BaseModal.tsx';
import type { Note as NoteType } from '../../types';
import Spinner from "../Spinner.tsx";

interface ViewNoteModalProps {
    isOpen: boolean;
    note: NoteType;
    isAdmin?: boolean;
    onClose: () => void;
    onUpdate?: (id: bigint, title: string, content: string) => void;
    isLoading?: boolean;
}

const ViewNoteModal: React.FC<ViewNoteModalProps> = ({
                                                         isOpen,
                                                         note,
                                                         isAdmin,
                                                         onClose,
                                                         onUpdate,
                                                         isLoading,
                                                     }) => {
    const [title, setTitle] = useState(note.title);
    const [content, setContent] = useState(note.content);

    const handleUpdate = () => {
        if (onUpdate) onUpdate(note.id, title, content);
        onClose();
    };

    return (
        <BaseModal isOpen={isOpen} onClose={onClose}>
            <h2 className="text-xl font-semibold">{isAdmin ? 'View Note' : 'Edit Note'}</h2>
            <div className="mt-4">
                {isAdmin ? (
                    <>
                        <h3 className="font-bold">{title}</h3>
                        <p className="mt-2">{content}</p>
                    </>
                ) : (
                    <>
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
                    </>
                )}
            </div>
            <div className="mt-4 flex justify-end">
                {!isAdmin && (
                    <button
                        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                        onClick={handleUpdate}
                    >
                        {isLoading ? <Spinner /> : 'Save'}
                    </button>
                )}
                <button
                    className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
                    onClick={onClose}
                >
                    Close
                </button>
            </div>
        </BaseModal>
    );
};

export default ViewNoteModal;
