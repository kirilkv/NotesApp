import React from 'react';
import type {UserInfo} from "../types";
import Spinner from "./Spinner.tsx";

interface UserListProps {
    users: UserInfo[]
    setSelectedUser: React.Dispatch<React.SetStateAction<UserInfo | null>>
    isLoading?: boolean;
}
const UsersList: React.FC<UserListProps> = ({users, setSelectedUser, isLoading}) => {
    if (isLoading) return <Spinner />;

    return (
        <div className="mt-6">
            <h2 className="text-2xl font-bold mb-4">All Users</h2>
            <div className="bg-white shadow overflow-hidden sm:rounded-lg">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                    <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Email
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Role
                        </th>
                    </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                    {users.map((user) => (
                        <tr
                            key={user.id}
                            className="cursor-pointer hover:bg-gray-100"
                            onClick={() => setSelectedUser(user)}
                        >
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                {user.email}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                {user.role}
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
export default UsersList;
