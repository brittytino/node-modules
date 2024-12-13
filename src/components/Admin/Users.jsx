import React, { useState, useEffect } from 'react';
import { FaUserPlus, FaEdit } from 'react-icons/fa';
import AddUserDialog from './AddUserDialog';
import EditUserDialog from './EditUserDialog';

const Users = ({ darkMode }) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isAddUserDialogOpen, setIsAddUserDialogOpen] = useState(false);
  const [isEditUserDialogOpen, setIsEditUserDialogOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('https://server-ou54.onrender.com/webapi/core/user');
        if (!response.ok) {
          throw new Error(`Failed to fetch users: ${response.statusText}`);
        }
        const data = await response.json();
        setUsers(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const openAddUserDialog = () => {
    setIsAddUserDialogOpen(true);
  };

  const closeAddUserDialog = () => {
    setIsAddUserDialogOpen(false);
  };

  const openEditUserDialog = (user) => {
    setSelectedUser(user);
    setIsEditUserDialogOpen(true);
  };

  const closeEditUserDialog = () => {
    setIsEditUserDialogOpen(false);
    setSelectedUser(null);
  };

  const handleSaveUser = (editedUser) => {
    setUsers(users.map(user => 
      user.id === editedUser.id ? editedUser : user
    ));
    // Here you would typically make an API call to update the user on the server
  };

  if (loading) return <p>Loading users...</p>;
  if (error) return <p className="text-red-500">Error: {error}</p>;

  return (
    <div className={`container mx-auto p-6 ${darkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'}`}>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Users</h2>
        <button 
          onClick={openAddUserDialog}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-blue-700 transition-colors duration-300"
        >
          <FaUserPlus />
          <span>Add New User</span>
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead className={darkMode ? 'bg-gray-700' : 'bg-gray-50'}>
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Username</th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Groups</th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className={`divide-y divide-gray-200 dark:divide-gray-700 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
            {users.map(user => (
              <tr key={user.id} className={`transition-colors duration-300 ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-50'}`}>
                <td className="px-6 py-4 whitespace-nowrap">{user.username}</td>
                <td className="px-6 py-4 whitespace-nowrap">{user.username}</td>
                <td className="px-6 py-4 whitespace-nowrap">{user.group_name}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    user.user_enabled ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                  }`}>
                    {user.user_enabled ? 'Active' : 'Inactive'}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button onClick={() => openEditUserDialog(user)} className="text-yellow-500 hover:text-yellow-600 transition-colors duration-300 mr-2">
                    <FaEdit />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <AddUserDialog 
        isOpen={isAddUserDialogOpen} 
        closeModal={closeAddUserDialog}
        darkMode={darkMode}
      />
      {selectedUser && (
        <EditUserDialog 
          isOpen={isEditUserDialogOpen} 
          closeModal={closeEditUserDialog}
          user={selectedUser}
          onSave={handleSaveUser}
          darkMode={darkMode}
        />
      )}
    </div>
  );
};

export default Users;

