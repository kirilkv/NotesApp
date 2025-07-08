import React from "react";

interface AdminSubNavProps {
    activeTab: string;
    setActiveTab: React.Dispatch<React.SetStateAction<'notes' | 'users'>>;
}

const AdminSubNav: React.FC<AdminSubNavProps> = ({activeTab, setActiveTab}) => {
    return (
        <div className="mb-4">
            <button
                onClick={() => setActiveTab('notes')}
                className={`px-4 py-2 ${activeTab === 'notes' ? 'bg-blue-500 text-white' : 'bg-gray-200'} rounded`}
            >
                Notes
            </button>
            <button
                onClick={() => setActiveTab('users')}
                className={`ml-4 px-4 py-2 ${activeTab === 'users' ? 'bg-blue-500 text-white' : 'bg-gray-200'} rounded`}
            >
                Users
            </button>
        </div>
    )
}

export default AdminSubNav;
