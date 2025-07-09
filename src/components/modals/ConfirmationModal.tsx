import React from 'react';
import BaseModal from './BaseModal.tsx';
import Spinner from "../Spinner.tsx";

interface ConfirmationModalProps {
    isOpen: boolean;
    title: string;
    message: string;
    onConfirm: () => void;
    onCancel: () => void;
    isLoading?: boolean;
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
                                                                 isOpen,
                                                                 title,
                                                                 message,
                                                                 onConfirm,
                                                                 onCancel,
                                                                 isLoading,
                                                             }) => {
    return (
        <BaseModal isOpen={isOpen} onClose={onCancel}>
            <h2 className="text-xl font-semibold">{title}</h2>
            <p className="mt-4 text-gray-600">{message}</p>
            <div className="mt-6 flex justify-end space-x-4">
                <button
                    className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
                    onClick={onCancel}
                >
                    Cancel
                </button>
                <button
                    className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                    onClick={onConfirm}
                >
                    {isLoading ? <Spinner /> : 'Delete'}
                </button>
            </div>
        </BaseModal>
    );
};

export default ConfirmationModal;
