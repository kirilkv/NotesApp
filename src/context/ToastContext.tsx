// src/context/ToastContext.tsx
import React, { createContext, useContext, useState, useCallback } from 'react';
import Toast, {type ToastSeverity } from '../components/Toast';

interface ToastContextType {
    showToast: (message: string, severity: ToastSeverity) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [toast, setToast] = useState<{
        message: string;
        severity: ToastSeverity;
    } | null>(null);

    const showToast = useCallback((message: string, severity: ToastSeverity) => {
        setToast({ message, severity });
    }, []);

    const hideToast = useCallback(() => {
        setToast(null);
    }, []);

    return (
        <ToastContext.Provider value={{ showToast }}>
            {children}
            {toast && (
                <Toast
                    message={toast.message}
                    severity={toast.severity}
                    onClose={hideToast}
                />
            )}
        </ToastContext.Provider>
    );
};

export const useToast = () => {
    const context = useContext(ToastContext);
    if (!context) {
        throw new Error('useToast must be used within a ToastProvider');
    }
    return context;
};
