import React from 'react';

interface BaseModalProps {
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
}

const BaseModal: React.FC<BaseModalProps> = ({ isOpen, onClose, children }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-md">
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md relative">
                <button
                    onClick={onClose}
                    className="absolute top-3 right-3 text-gray-600 hover:text-gray-800"
                >
                    &times;
                </button>
                {children}
            </div>
        </div>
    );
};

export default BaseModal;
