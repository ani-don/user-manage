import React, { useEffect, useState } from 'react';
import { UserList } from './components/UserList';
import { UserDetail } from './components/UserDetail';
import { UserForm } from './components/UserForm';

function App() {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/users');
      const data = await response.json();
      setUsers(data);
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching users:', error);
      setIsLoading(false);
    }
  };

  const handleAddUser = async (userData) => {
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/users', {
        method: 'POST',
        body: JSON.stringify(userData),
        headers: {
          'Content-type': 'application/json',
        },
      });
      const newUser = await response.json();
      

      setUsers(prev => [...prev, { ...newUser, id: prev.length + 1 }]);
      setShowAddForm(false);
    } catch (error) {
      console.error('Error adding user:', error);
      alert('Failed to add user. Please try again.');
    }
  };

  const handleUpdateUser = async (userData) => {
    if (!userData.id) return;

    try {
      const response = await fetch(`https://jsonplaceholder.typicode.com/users/${userData.id}`, {
        method: 'PUT',
        body: JSON.stringify(userData),
        headers: {
          'Content-type': 'application/json',
        },
      });
      const updatedUser = await response.json();
    
      setUsers(prev => prev.map(user => 
        user.id === userData.id ? { ...user, ...updatedUser } : user
      ));
      setSelectedUser(prev => prev ? { ...prev, ...updatedUser } : null);
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating user:', error);
      alert('Failed to update user. Please try again.');
    }
  };

  const handleDeleteUser = async (id) => {
    try {
      await fetch(`https://jsonplaceholder.typicode.com/users/${id}`, {
        method: 'DELETE',
      });
      
      // Optimistically update UI
      setUsers(prev => prev.filter(user => user.id !== id));
      setSelectedUser(null);
    } catch (error) {
      console.error('Error deleting user:', error);
      alert('Failed to delete user. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-400">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <UserList
            users={users}
            isLoading={isLoading}
            onSelectUser={setSelectedUser}
            onAddUser={() => setShowAddForm(true)}
            onEdit={(user) => {
              setSelectedUser(user);
              setIsEditing(true);
            }}
            onDelete={handleDeleteUser}
          />
          {showAddForm ? (
            <UserForm
              onSubmit={handleAddUser}
              onClose={() => setShowAddForm(false)}
            />
          ) : isEditing && selectedUser ? (
            <UserForm
              user={selectedUser}
              onSubmit={handleUpdateUser}
              onClose={() => setIsEditing(false)}
            />
          ) : selectedUser ? (
            <UserDetail
              user={selectedUser}
              onClose={() => setSelectedUser(null)}
              onDelete={handleDeleteUser}
              onEdit={() => setIsEditing(true)}
            />
          ) : null}
        </div>
      </div>
    </div>
  );
}

export default App;