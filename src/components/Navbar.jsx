import React from 'react';
import { FiMoon, FiSun, FiArrowLeft, FiHome, FiBell } from 'react-icons/fi';

const Navbar = ({ username, userStatus, darkMode, setDarkMode, activeComponent, setActiveComponent }) => {
  return (
    <nav
      className={`w-full px-6 py-4 shadow-lg ${
        darkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'
      } transition-all duration-300 ease-in-out sticky top-0 z-10`}
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo Section */}
        <div className="flex items-center space-x-4">
          <span
            className={`text-2xl font-extrabold tracking-widest uppercase ${
              darkMode ? 'text-indigo-400' : 'text-indigo-600'
            }`}
          >
            ECHO-LINK
          </span>
        </div>

        {/* Navigation and User Section */}
        <div className="flex items-center space-x-6">
          {/* Back/Home Button */}
          <button
            onClick={() => setActiveComponent('welcome')}
            className={`flex items-center text-lg font-medium px-4 py-2 rounded-lg transition-colors duration-300 ${
              darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300'
            }`}
          >
            {activeComponent !== 'welcome' ? <FiArrowLeft className="mr-2" /> : <FiHome className="mr-2" />}
            {activeComponent !== 'welcome' ? 'Back' : 'Home'}
          </button>

          {/* Notification Bell */}
          <button
            className={`relative p-2 rounded-full transition-colors duration-300 ${
              darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300'
            }`}
            aria-label="Notifications"
          >
            <FiBell className="text-xl" />
            <span
              className="absolute top-0 right-0 bg-red-500 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full"
            >
              3
            </span>
          </button>

          {/* User Status */}
          <div className="flex items-center space-x-2">
            <span
              className={`w-3 h-3 rounded-full ${
                userStatus === 'active' ? 'bg-green-500' : 'bg-red-500'
              }`}
              title={userStatus === 'active' ? 'Active' : 'Inactive'}
            ></span>
            <div>
              <p className="text-sm font-medium">{username}</p>
              <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Status: {userStatus}</p>
            </div>
          </div>

          {/* Dark Mode Toggle */}
          <button
            onClick={() => setDarkMode(!darkMode)}
            className={`p-2 rounded-full transition-colors duration-300 ${
              darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300'
            }`}
            aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {darkMode ? <FiSun className="text-xl" /> : <FiMoon className="text-xl" />}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;