import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAdminAuth } from '../context/AdminAuthContext';

const AdminLoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const navigate = useNavigate();
  const { adminLogin } = useAdminAuth();

  const handleLogin = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    try {
      const isAuthenticated = await adminLogin(username, password); // Wait for login to complete
      if (isAuthenticated) {
        setErrorMessage('');
        navigate('/admin'); // Redirect on successful login
      } else {
        setErrorMessage('Invalid credentials.'); // Show error message on failure
      }
    } catch (error) {
      setErrorMessage('An error occurred during login.');
      console.error('Login error:', error);
    }
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-sm">
        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Admin Login</h2>
        
        <form onSubmit={handleLogin}>
          <div className="mb-6">
            <label htmlFor="username" className="block text-lg font-medium text-gray-700">Admin Username</label>
            <input
              type="text"
              id="username"
              className="mt-2 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-400 focus:border-blue-500 text-lg"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          
          <div className="mb-6">
            <label htmlFor="password" className="block text-lg font-medium text-gray-700">Admin Password</label>
            <input
              type="password"
              id="password"
              className="mt-2 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-400 focus:border-blue-500 text-lg"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          
          {errorMessage && <p className="text-red-500 text-sm mb-4">{errorMessage}</p>}
          
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-200"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLoginPage;