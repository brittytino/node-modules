import React, { useState } from 'react';
import { Phone, Delete } from 'lucide-react';

const Dialpad = () => {
  const [number, setNumber] = useState('');

  const handleNumberClick = (digit) => {
    setNumber((prevNumber) => prevNumber + digit);
  };

  const handleDelete = () => {
    setNumber((prevNumber) => prevNumber.slice(0, -1));
  };

  const handleCall = () => {
    alert(`Calling ${number}`);
    setNumber('');
  };

  const buttons = [
    '1', '2', '3',
    '4', '5', '6',
    '7', '8', '9',
    '*', '0', '#',
  ];

  return (
    <div className="flex flex-col items-center space-y-4 w-full max-w-xs mx-auto">
      {/* Display Screen */}
      <div className="w-64 bg-gray-100 border border-gray-300 rounded-md shadow-sm  max-h-screen">
        <input
          type="text"
          className="w-full text-xl text-gray-800 font-mono text-center bg-transparent focus:outline-none"
          value={number}
          readOnly
          placeholder="Enter number"
        />
      </div>

      {/* Dial Pad */}
      <div className="grid grid-cols-3 gap-2">
        {buttons.map((btn) => (
          <button
            key={btn}
            className="w-12 h-12 bg-blue-500 text-white rounded-full shadow-md hover:bg-blue-600 active:scale-95 text-lg flex items-center justify-center transition"
            onClick={() => handleNumberClick(btn)}
          >
            {btn}
          </button>
        ))}
      </div>

      {/* Action Buttons */}
      <div className="flex justify-between w-64 space-x-4">
        <button
          className="flex-1 flex items-center justify-center bg-red-500 hover:bg-red-600 text-white font-medium py-2 rounded-md shadow-sm transition"
          onClick={handleDelete}
        >
          <Delete size={20} className="mr-1" />
          Erase
        </button>
        <button
          className="flex-1 flex items-center justify-center bg-green-500 hover:bg-green-600 text-white font-medium py-2 rounded-md shadow-sm transition"
          onClick={handleCall}
        >
          <Phone size={20} className="mr-1" />
          Call
        </button>
      </div>
    </div>
  );
};

export default Dialpad;
