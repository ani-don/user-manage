import React from 'react';
import { X, Building2,  Phone, Mail,  Trash2, Edit2 } from 'lucide-react';

export function UserDetail({ user, onClose, onDelete, onEdit }) {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex justify-between items-start mb-6">
        <h2 className="text-2xl font-bold text-gray-900">{user.name}</h2>
        <div className="flex gap-2">
          <button
            onClick={() => onEdit(user)}
            className="p-2 hover:bg-blue-50 text-blue-500 rounded-full transition-colors"
            title="Edit user"
          >
            <Edit2 className="w-5 h-5" />
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
            <Trash2 className="w-5 h-5" />
          </button>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            title="Close details"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>
      </div>

      <div className="space-y-6">
        <div className="flex items-center gap-3">
          <Mail className="w-5 h-5 text-blue-500" />
          <div>
            <p className="text-sm text-gray-500">Email</p>
            <p className="text-gray-900">{user.email}</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Phone className="w-5 h-5 text-blue-500" />
          <div>
            <p className="text-sm text-gray-500">Phone</p>
            <p className="text-gray-900">{user.phone}</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Building2 className="w-5 h-5 text-blue-500" />
          <div>
            <p className="text-sm text-gray-500">Company</p>
            <p className="text-gray-900">{user.company.name}</p>
         
          </div>
        </div>
      </div>
    </div>
  );
}