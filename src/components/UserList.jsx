import React from 'react';
import { Users, UserPlus, Loader2, Edit2, Trash2 } from 'lucide-react';

export function UserList({ users, isLoading, onSelectUser, onAddUser, onEdit, onDelete }) {
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="p-4 border-b flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Users className="w-5 h-5 text-blue-500" />
          <h2 className="text-lg font-semibold">Users</h2>
        </div>
        <button
          onClick={onAddUser}
          className="flex items-center gap-2 px-3 py-1 text-sm bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
        >
          <UserPlus className="w-4 h-4" />
          Add User
        </button>
      </div>
      <ul className="divide-y">
        {users.map((user) => (
          <li
            key={user.id}
            className="p-4 hover:bg-gray-50 transition-colors"
          >
            <div className="flex justify-between items-center">
              <div className="cursor-pointer" onClick={() => onSelectUser(user)}>
                <h3 className="font-medium text-gray-900">{user.name}</h3>
                <p className="text-sm text-gray-500">{user.email}</p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => onEdit(user)}
                  className="p-2 hover:bg-blue-50 text-blue-500 rounded-full transition-colors"
                  title="Edit user"
                >
                  <Edit2 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => {
                    if (confirm('Are you sure you want to delete this user?')) {
                      onDelete(user.id);
                    }
                  }}
                  className="p-2 hover:bg-red-50 text-red-500 rounded-full transition-colors"
                  title="Delete user"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}