import React, { useState } from 'react';
import { FaPhone, FaBackspace, FaPhoneSlash } from 'react-icons/fa';

const Call = ({ darkMode }) => {
  const [input, setInput] = useState('');

  const handleButtonClick = (value) => {
    setInput((prev) => prev + value);
  };

  const handleBackspace = () => {
    setInput((prev) => prev.slice(0, -1));
  };

  const handleCall = () => {
    alert(`Calling ${input}`);
    setInput('');
  };

  const handleEndCall = () => {
    alert('Call ended');
    setInput('');
  };

  const DialButton = ({ value, icon: Icon }) => (
    <button
      onClick={() => handleButtonClick(value)}
      className={`w-16 h-16 rounded-full flex items-center justify-center text-xl font-semibold ${
        darkMode
          ? 'bg-gray-700 text-white hover:bg-gray-600'
          : 'bg-gray-200 text-gray-900 hover:bg-gray-300'
      }`}
    >
      {Icon ? <Icon /> : value}
    </button>
  );

  return (
    <div className={`w-full max-w-md mx-auto p-6 rounded-lg shadow-lg ${darkMode ? 'bg-gray-800 text-white' : 'bg-white'}`}>
      <h2 className="text-2xl font-bold mb-4 text-center">Dial Pad</h2>
      <div className="flex flex-col items-center space-y-4">
        <FaPhone className="text-4xl text-blue-600" />
        <input
          type="text"
          value={input}
          readOnly
          className={`w-full mb-4 p-2 text-center text-2xl rounded-lg ${
            darkMode ? 'bg-gray-700 text-white' : 'bg-gray-200 text-gray-900'
          }`}
        />
        <div className="grid grid-cols-3 gap-4">
          {['1', '2', '3', '4', '5', '6', '7', '8', '9', '*', '0', '#'].map((key) => (
            <DialButton key={key} value={key} />
          ))}
        </div>
        <div className="flex space-x-4">
          <button
            onClick={handleBackspace}
            className="w-16 h-16 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600"
          >
            <FaBackspace />
          </button>
          <button
            onClick={handleCall}
            className="w-16 h-16 bg-green-500 text-white rounded-full flex items-center justify-center hover:bg-green-600"
          >
            <FaPhone />
          </button>
          <button
            onClick={handleEndCall}
            className="w-16 h-16 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600"
          >
            <FaPhoneSlash />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Call;

