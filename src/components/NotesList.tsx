import React from 'react';
import type {Note as NoteType} from '../types';
import Spinner from "./Spinner.tsx";

interface NotesListProps {
    notes: NoteType[];
    onView: (id: bigint) => void;
    onDelete: (id: bigint) => void;
    isAdmin?: boolean;
    isLoading?: boolean;
}

const NotesList: React.FC<NotesListProps> = ({notes, onView, onDelete, isAdmin, isLoading}) => {
    const truncateContent = (content: string, maxLength: number) => {
        return content.length > maxLength
            ? content.substring(0, maxLength) + '...'
            : content;
    };
    if (isLoading) return <Spinner />;

    return (
        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
            <div className="overflow-x-auto">

                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                    <tr>
                        {isAdmin && (<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            User Id
                        </th>)}
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Title
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Content
                        </th>
                        {!isAdmin && (
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Actions
                            </th>
                        )}
                    </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                    {notes.map((note) => (
                        <tr key={note.id} className="hover:bg-gray-50">
                            {isAdmin && (<td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                {note.userId}
                            </td>)}
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                {truncateContent(note.title, 50)}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                {truncateContent(note.content, 100)}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm">
                                <button
                                    onClick={() => onView(note.id)}
                                    className="text-blue-600 hover:text-blue-900 mr-3"
                                >
                                    View
                                </button>
                                {!isAdmin && (
                                    <button
                                        onClick={() => onDelete(note.id)}
                                        className="text-red-600 hover:text-red-900"
                                    >
                                        Delete
                                    </button>
                                )}
                            </td>
                        </tr>
                    ))}
                    {notes.length === 0 && (
                        <tr>
                            <td colSpan={3} className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                No notes found
                            </td>
                        </tr>
                    )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default NotesList;
