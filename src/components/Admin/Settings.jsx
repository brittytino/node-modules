import React, { useState } from 'react';
import { FaSave, FaServer, FaUser, FaLock } from 'react-icons/fa';

const Settings = ({ darkMode }) => {
  const [sipNo, setSipNo] = useState('');
  const [sipServer, setSipServer] = useState('pbx.johnsamuel.in');
  const [sipPassword, setSipPassword] = useState('');

  const handleSave = (e) => {
    e.preventDefault();
    console.log('SIP No:', sipNo);
    console.log('SIP Server:', sipServer);
    console.log('SIP Password:', sipPassword);
    alert('Settings saved successfully!');
  };

  const InputField = ({ icon: Icon, label, type, value, onChange }) => (
    <div className="mb-4">
      <label className="block text-sm font-medium mb-1">{label}</label>
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Icon className="h-5 w-5 text-gray-400" />
        </div>
        <input
          type={type}
          value={value}
          onChange={onChange}
          className={`w-full pl-10 pr-3 py-2 rounded-md ${
            darkMode
              ? 'bg-gray-700 text-white placeholder-gray-400'
              : 'bg-white text-gray-900 placeholder-gray-500'
          } border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500`}
        />
      </div>
    </div>
  );

  return (
    <div className={`w-full max-w-md mx-auto p-6 rounded-lg shadow-lg ${darkMode ? 'bg-gray-800 text-white' : 'bg-white'}`}>
      <h2 className="text-2xl font-bold mb-6">SIP Settings</h2>
      <form onSubmit={handleSave}>
        <InputField
          icon={FaUser}
          label="SIP No"
          type="text"
          value={sipNo}
          onChange={(e) => setSipNo(e.target.value)}
        />
        <InputField
          icon={FaServer}
          label="SIP Server"
          type="text"
          value={sipServer}
          onChange={(e) => setSipServer(e.target.value)}
        />
        <InputField
          icon={FaLock}
          label="SIP Password"
          type="password"
          value={sipPassword}
          onChange={(e) => setSipPassword(e.target.value)}
        />
        <button
          onClick={handleSave}
          className={`w-full flex justify-center items-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${darkMode ? 'hover:bg-blue-500' : ''}`}
        >
          <FaSave className="mr-2" /> Save Settings
        </button>
      </form>
    </div>
  );
};

export default Settings;

