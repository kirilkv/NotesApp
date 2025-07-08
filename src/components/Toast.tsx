// src/components/Toast.tsx
import React, { useEffect } from 'react';
import { XMarkIcon } from '@heroicons/react/24/solid';

export type ToastSeverity = 'success' | 'error' | 'warning' | 'info';

interface ToastProps {
    message: string;
    severity: ToastSeverity;
    onClose: () => void;
    duration?: number;
}

const Toast: React.FC<ToastProps> = ({
                                         message,
                                         severity,
                                         onClose,
                                         duration = 7000
                                     }) => {
    useEffect(() => {
        if (duration) {
            const timer = setTimeout(() => {
                onClose();
            }, duration);

            return () => clearTimeout(timer);
        }
    }, [duration, onClose]);

    const severityStyles = {
        success: 'bg-green-100 border-green-400 text-green-700',
        error: 'bg-red-100 border-red-400 text-red-700',
        warning: 'bg-yellow-100 border-yellow-400 text-yellow-700',
        info: 'bg-blue-100 border-blue-400 text-blue-700'
    };

    return (
        <div
            className={`z-1000 fixed bottom-4 right-4 flex items-center w-full max-w-sm p-4 rounded-lg border ${severityStyles[severity]}`}
            role="alert"
        >
            <div className="ml-3 text-sm font-normal">{message}</div>
            <button
                type="button"
                className={`ml-auto -mx-1.5 -my-1.5 rounded-lg focus:ring-2 p-1.5 inline-flex items-center justify-center h-8 w-8 ${
                    severity === 'error' ? 'hover:bg-red-200 focus:ring-red-400' :
                        severity === 'success' ? 'hover:bg-green-200 focus:ring-green-400' :
                            severity === 'warning' ? 'hover:bg-yellow-200 focus:ring-yellow-400' :
                                'hover:bg-blue-200 focus:ring-blue-400'
                }`}
                onClick={onClose}
            >
                <XMarkIcon className="w-5 h-5" />
            </button>
        </div>
    );
};

export default Toast;
