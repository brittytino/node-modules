import React, { useState } from 'react';
import { FaUser, FaLock } from 'react-icons/fa';

const ForgotPassword = ({ darkMode }) => {
  const [adminUsername, setAdminUsername] = useState('');
  const [targetUsername, setTargetUsername] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleResetPassword = async () => {
    try {
      const response = await fetch('https://your-backend-api/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ adminUsername, targetUsername, newPassword }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage('Password reset successful!');
      } else {
        setMessage(data.message || 'Failed to reset password.');
      }
    } catch (error) {
      console.error('Error resetting password:', error);
      setMessage('An error occurred while resetting the password.');
    }
  };

  return (
    <div className={` max-w-md mx-auto p-6  ${darkMode ? 'bg-gray-800 text-white' : 'bg-white'}`}>
      <h2 className={`text-3xl font-bold mb-6 text-center ${darkMode ? 'text-white' : 'text-gray-800'}`}>Reset Password</h2>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleResetPassword();
        }}
        className="space-y-6"
      >
        <div>
          <label htmlFor="adminUsername" className={`block text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
            Your Admin Username
          </label>
          <input
            type="text"
            id="adminUsername"
            value={adminUsername}
            onChange={(e) => setAdminUsername(e.target.value)}
            required
            className={`mt-1 block w-full pl-10 sm:text-sm border-gray-300 rounded-md ${darkMode ? 'bg-gray-600 text-white' : ''}`}
          />
        </div>
        <div>
          <label htmlFor="targetUsername" className={`block text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
            Target Admin Username
          </label>
          <input
            type="text"
            id="targetUsername"
            value={targetUsername}
            onChange={(e) => setTargetUsername(e.target.value)}
            required
            className={`mt-1 block w-full pl-10 sm:text-sm border-gray-300 rounded-md ${darkMode ? 'bg-gray-600 text-white' : ''}`}
          />
        </div>
        <div>
          <label htmlFor="newPassword" className={`block text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
            New Password
          </label>
          <input
            type="password"
            id="newPassword"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
            className={`mt-1 block w-full pl-10 sm:text-sm border-gray-300 rounded-md ${darkMode ? 'bg-gray-600 text-white' : ''}`}
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md"
        >
          Reset Password
        </button>
        {message && <p className="mt-4 text-center text-sm">{message}</p>}
      </form>
    </div>
  );
};

export default ForgotPassword;
