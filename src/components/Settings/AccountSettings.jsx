import React, { useState, useEffect } from 'react';

const AccountSettings = ({ darkMode }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    // Fetch user data from the backend
    fetch('http://localhost:5000/api/account')
      .then(response => response.json())
      .then(data => {
        setUsername(data.username);
        setEmail(data.email);
      })
      .catch(error => console.error('Error fetching account data:', error));
  }, []);

  const handleSave = () => {
    // Save user data to the backend
    fetch('http://localhost:5000/api/account', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, email, password }),
    })
      .then(response => response.json())
      .then(data => {
        alert('Account settings saved successfully!');
      })
      .catch(error => console.error('Error saving account data:', error));
  };

  return (
    <div className={`p-6 rounded-lg shadow-md ${darkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'} transition-all`}>
      <h2 className="text-2xl font-bold mb-4">Account Settings</h2>
      <div className="space-y-4">
        <div>
          <label className="block">Username</label>
          <input
            type="text"
            className={`mt-1 p-2 w-full border rounded-lg focus:outline-none ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-gray-100 border-gray-300'}`}
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
          />
        </div>
        <div>
          <label className="block">Email</label>
          <input
            type="email"
            className={`mt-1 p-2 w-full border rounded-lg focus:outline-none ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-gray-100 border-gray-300'}`}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
          />
        </div>
        <div>
          <label className="block">Password</label>
          <input
            type="password"
            className={`mt-1 p-2 w-full border rounded-lg focus:outline-none ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-gray-100 border-gray-300'}`}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
          />
        </div>
        <button
          onClick={handleSave}
          className={`mt-4 py-2 px-4 rounded-lg font-semibold ${darkMode ? 'bg-blue-600 hover:bg-blue-500' : 'bg-blue-500 hover:bg-blue-400'} text-white`}
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default AccountSettings;