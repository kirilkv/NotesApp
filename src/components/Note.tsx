import { useState } from 'react';
import type { Note as NoteType } from '../types';

interface NoteProps {
    note: NoteType;
    onUpdate?: (id: bigint, title: string, content: string) => void;
    onDelete?: (id: bigint) => void;
    readOnly?: boolean;
}

const Note: React.FC<NoteProps> = ({ note, onUpdate, onDelete, readOnly = false }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [title, setTitle] = useState(note.title);
    const [content, setContent] = useState(note.content);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onUpdate?.(note.id, title, content);
        setIsEditing(false);
    };

    if (isEditing && !readOnly) {
        return (
            <form onSubmit={handleSubmit} className="bg-white p-4 rounded-lg shadow mb-4">
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full mb-2 p-2 border rounded"
                    placeholder="Title"
                />
                <textarea
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    className="w-full mb-2 p-2 border rounded"
                    placeholder="Content"
                    rows={4}
                />
                <div className="flex justify-end space-x-2">
                    <button
                        type="button"
                        onClick={() => setIsEditing(false)}
                        className="px-4 py-2 text-gray-600 hover:text-gray-800"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                    >
                        Save
                    </button>
                </div>
            </form>
        );
    }

    return (
        <div className="bg-white p-4 rounded-lg shadow mb-4">
            <h3 className="text-xl font-semibold mb-2">{note.title}</h3>
            <p className="text-gray-600 mb-4">{note.content}</p>
            {!readOnly && (
                <div className="flex justify-end space-x-2">
                    <button
                        onClick={() => setIsEditing(true)}
                        className="px-4 py-2 text-blue-600 hover:text-blue-800"
                    >
                        Edit
                    </button>
                    <button
                        onClick={() => onDelete?.(note.id)}
                        className="px-4 py-2 text-red-600 hover:text-red-800"
                    >
                        Delete
                    </button>
                </div>
            )}
        </div>
    );
};

export default Note;
