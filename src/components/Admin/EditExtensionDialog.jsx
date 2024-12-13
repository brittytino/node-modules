import React, { useState } from 'react';
import { X, Phone, Lock, User, ToggleLeft, ToggleRight, ChevronDown } from 'lucide-react';

const EditExtensionDialog = ({ extension, onClose, darkMode }) => {
  const [status, setStatus] = useState(extension.enabled);
  const [selectedUser, setSelectedUser] = useState(extension.user || 'sarath');
  const [maxLimit, setMaxLimit] = useState(extension.maxLimit || '1');

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-start justify-center p-20 z-50">
      <div className={`relative w-full max-w-2xl p-8 rounded-lg shadow-xl transition-all duration-300 ${
        darkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'
      }`}>
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 transition-colors duration-200"
        >
          <X className="w-6 h-6" />
        </button>
        <h3 className="text-2xl font-bold mb-6">Edit Extension</h3>
        <form className="grid grid-cols-2 gap-6">
          <InputField
            icon={<Phone className="w-5 h-5" />}
            label="Extension No:"
            id="extension"
            value={extension.extension}
            readOnly
            darkMode={darkMode}
          />
          <InputField
            icon={<Lock className="w-5 h-5" />}
            label="Password:"
            id="password"
            type="password"
            value={extension.password}
            darkMode={darkMode}
          />
          <InputField
            icon={<User className="w-5 h-5" />}
            label="Extension Name:"
            id="name"
            value={extension.effective_caller_id_name}
            darkMode={darkMode}
          />
          <div className="relative">
            <label htmlFor="user" className="block text-sm font-medium mb-1">User:</label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <select
                id="user"
                value={selectedUser}
                onChange={(e) => setSelectedUser(e.target.value)}
                className={`pl-10 pr-10 py-2 w-full rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 transition-all duration-200 appearance-none ${
                  darkMode
                    ? 'bg-gray-700 text-white focus:bg-gray-600'
                    : 'bg-gray-100 text-gray-900 focus:bg-white'
                }`}
              >
                <option value="sarath">Sarath</option>
                <option value="nandy">Nandy</option>
                <option value="tino">Tino</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none" />
            </div>
          </div>
          <div className="relative">
            <label htmlFor="status" className="block text-sm font-medium mb-1">Status:</label>
            <div className="flex items-center space-x-2">
              <button
                type="button"
                onClick={() => setStatus(!status)}
                className={`flex items-center justify-center w-12 h-6 rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
                  status ? 'bg-green-500' : 'bg-gray-400'
                }`}
              >
                <div className={`w-5 h-5 rounded-full bg-white transform transition-transform duration-200 ${
                  status ? 'translate-x-3' : '-translate-x-3'
                }`} />
              </button>
              <span className="text-sm font-medium">{status ? 'Active' : 'Inactive'}</span>
            </div>
          </div>
          <div className="relative">
            <label htmlFor="maxLimit" className="block text-sm font-medium mb-1">Max Limit:</label>
            <div className="relative">
              <select
                id="maxLimit"
                value={maxLimit}
                onChange={(e) => setMaxLimit(e.target.value)}
                className={`pl-3 pr-10 py-2 w-full rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 transition-all duration-200 appearance-none ${
                  darkMode
                    ? 'bg-gray-700 text-white focus:bg-gray-600'
                    : 'bg-gray-100 text-gray-900 focus:bg-white'
                }`}
              >
                {[1, 2, 3, 4, 5].map(num => (
                  <option key={num} value={num.toString()}>{num}</option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none" />
            </div>
          </div>
          <div className="col-span-2 flex justify-end mt-6">
            <button
              type="button"
              onClick={onClose}
              className={`px-6 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 transition-all duration-200 transform hover:scale-105 ${
                darkMode
                  ? 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500'
                  : 'bg-blue-500 text-white hover:bg-blue-600 focus:ring-blue-400'
              }`}
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const InputField = ({ icon, label, id, type = 'text', value, readOnly = false, darkMode }) => (
  <div className="relative">
    <label htmlFor={id} className="block text-sm font-medium mb-1">{label}</label>
    <div className="relative">
      <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
        {icon}
      </div>
      <input
        type={type}
        id={id}
        value={value}
        readOnly={readOnly}
        className={`pl-10 pr-4 py-2 w-full rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 transition-all duration-200 ${
          darkMode
            ? 'bg-gray-700 text-white focus:bg-gray-600'
            : 'bg-gray-100 text-gray-900 focus:bg-white'
        } ${readOnly ? 'cursor-not-allowed' : ''}`}
      />
    </div>
  </div>
);

export default EditExtensionDialog;

