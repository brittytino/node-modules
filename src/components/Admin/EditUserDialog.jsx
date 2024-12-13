import React, { useState } from 'react';
import { FaTimes, FaUser, FaUsers, FaToggleOn, FaToggleOff, FaLock, FaEnvelope } from 'react-icons/fa';

const EditUserDialog = ({ isOpen, closeModal, user, onSave, darkMode }) => {
  const [editedUser, setEditedUser] = useState({
    ...user,
    password: '',
    confirm_password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedUser(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editedUser.password !== editedUser.confirm_password) {
      alert("Passwords don't match!");
      return;
    }
    onSave(editedUser);
    closeModal();
  };

  const toggleStatus = () => {
    setEditedUser(prev => ({ ...prev, user_enabled: !prev.user_enabled }));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-start justify-center p-20 z-50">
      <div className={`relative w-full max-w-4xl p-6 rounded-xl shadow-2xl ${
        darkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'
      }`}>
        <button
          onClick={closeModal}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 transition-colors duration-200"
        >
          <FaTimes className="w-6 h-6" />
        </button>
        <h2 className="text-3xl font-bold mb-6 text-center">Edit User</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="relative">
              <label htmlFor="username" className="block text-sm font-medium mb-1">
                Username
              </label>
              <div className="relative">
                <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  id="username"
                  name="username"
                  value={editedUser.username}
                  readOnly
                  className={`pl-10 pr-4 py-2 w-full rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 transition-all duration-200 bg-gray-100 cursor-not-allowed ${
                    darkMode ? 'text-gray-300' : 'text-gray-600'
                  }`}
                />
              </div>
            </div>
            <div className="relative">
              <label htmlFor="email" className="block text-sm font-medium mb-1">
                Email
              </label>
              <div className="relative">
                <FaEnvelope className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={editedUser.email}
                  onChange={handleChange}
                  className={`pl-10 pr-4 py-2 w-full rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 transition-all duration-200 ${
                    darkMode
                      ? 'bg-gray-700 text-white focus:bg-gray-600'
                      : 'bg-gray-100 text-gray-900 focus:bg-white'
                  }`}
                />
              </div>
            </div>
            <div className="relative">
              <label htmlFor="password" className="block text-sm font-medium mb-1">
                Password
              </label>
              <div className="relative">
                <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={editedUser.password}
                  onChange={handleChange}
                  className={`pl-10 pr-4 py-2 w-full rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 transition-all duration-200 ${
                    darkMode
                      ? 'bg-gray-700 text-white focus:bg-gray-600'
                      : 'bg-gray-100 text-gray-900 focus:bg-white'
                  }`}
                />
              </div>
            </div>
            <div className="relative">
              <label htmlFor="confirm_password" className="block text-sm font-medium mb-1">
                Confirm Password
              </label>
              <div className="relative">
                <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="password"
                  id="confirm_password"
                  name="confirm_password"
                  value={editedUser.confirm_password}
                  onChange={handleChange}
                  className={`pl-10 pr-4 py-2 w-full rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 transition-all duration-200 ${
                    darkMode
                      ? 'bg-gray-700 text-white focus:bg-gray-600'
                      : 'bg-gray-100 text-gray-900 focus:bg-white'
                  }`}
                />
              </div>
            </div>
            <div className="relative">
              <label htmlFor="user_groups" className="block text-sm font-medium mb-1">
                User Group
              </label>
              <div className="relative">
                <FaUsers className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <select
                  id="user_groups"
                  name="user_groups"
                  value={editedUser.user_groups}
                  onChange={handleChange}
                  className={`pl-10 pr-4 py-2 w-full rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 transition-all duration-200 ${
                    darkMode
                      ? 'bg-gray-700 text-white focus:bg-gray-600'
                      : 'bg-gray-100 text-gray-900 focus:bg-white'
                  }`}
                >
                  <option value="user">User</option>
                  <option value="admin">Admin</option>
                  <option value="superadmin">Superadmin</option>
                </select>
              </div>
            </div>
            <div className="relative">
              <label htmlFor="user_enabled" className="block text-sm font-medium mb-1">
                Status
              </label>
              <div
                onClick={toggleStatus}
                className={`flex items-center justify-between px-4 py-2 rounded-lg cursor-pointer transition-colors duration-200 ${
                  editedUser.user_enabled
                    ? 'bg-green-500 hover:bg-green-600'
                    : 'bg-red-500 hover:bg-red-600'
                }`}
              >
                <span className="font-medium text-white">
                  {editedUser.user_enabled ? 'Active' : 'Inactive'}
                </span>
                {editedUser.user_enabled ? (
                  <FaToggleOn className="w-6 h-6 text-white" />
                ) : (
                  <FaToggleOff className="w-6 h-6 text-white" />
                )}
              </div>
            </div>
          </div>
          <div className="flex justify-end mt-6">
            <button
              type="button"
              onClick={closeModal}
              className={`px-6 py-2 mr-4 rounded-lg transition-all duration-200 ${
                darkMode
                  ? 'bg-gray-600 text-white hover:bg-gray-700'
                  : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
              }`}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 transform hover:scale-105"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditUserDialog;

