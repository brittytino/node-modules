import React, { useState } from 'react';
import { Phone, Users } from 'lucide-react';
import DialPad from './DialPad';
import Contacts1 from './Contacts1';

const NewUI = ({ darkMode }) => {
  const [activeTab, setActiveTab] = useState('dialpad');

  return (
    <div className={`min-h-[calc(100vh-12rem)] flex items-center justify-center p-4 ${darkMode ? 'bg-gray-800' : 'bg-gray-100'}`}>
      <div
        className={`bg-white rounded-lg shadow-xl overflow-hidden transition-all duration-300 ${
          activeTab === 'dialpad' ? 'w-full max-w-sm' : 'w-full max-w-4xl'
        }`}
      >
        <div className="flex justify-center space-x-4 p-4 bg-gray-50 border-b border-gray-200">
          <button
            className={`flex items-center justify-center px-4 py-2 rounded-full transition-all duration-200 ${
              activeTab === 'dialpad'
                ? 'bg-blue-500 text-white shadow-md'
                : 'bg-white text-gray-700 hover:bg-blue-100'
            }`}
            onClick={() => setActiveTab('dialpad')}
          >
            <Phone className="mr-2" size={18} />
            Dialpad
          </button>
          <button
            className={`flex items-center justify-center px-4 py-2 rounded-full transition-all duration-200 ${
              activeTab === 'contacts'
                ? 'bg-blue-500 text-white shadow-md'
                : 'bg-white text-gray-700 hover:bg-blue-100'
            }`}
            onClick={() => setActiveTab('contacts')}
          >
            <Users className="mr-2" size={18} />
            Contacts
          </button>
        </div>

        <div className="p-4">
          {activeTab === 'dialpad' ? (
            <div className="flex justify-center">
              <DialPad />
            </div>
          ) : (
            <Contacts1 />
          )}
        </div>
      </div>
    </div>
  );
};

export default NewUI;
