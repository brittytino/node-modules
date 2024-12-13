import React, { useState } from 'react';
import { FiPhone, FiSettings, FiList } from 'react-icons/fi';
import Navbar from '../components/Navbar';
import CallLog from '../components/CallLog';
import Settings from '../components/Settings';
import NewUI from '../components/NewUI';

const HomePage = () => {
  const [activeComponent, setActiveComponent] = useState('welcome');
  const [darkMode, setDarkMode] = useState(false);
  const username = 'Keeerthy Suresh';
  const userStatus = 'active';

  const renderComponent = () => {
    switch (activeComponent) {
      case 'call':
        return <NewUI darkMode={darkMode} />;
      case 'call-log':
        return <CallLog darkMode={darkMode} />;
      case 'settings':
        return <Settings darkMode={darkMode} />;
      default:
        return (
          <div className="text-center mt-16 space-y-6">
            <h1 className="text-4xl font-extrabold text-blue-600">Welcome to Echo Link</h1>
            <p className="text-lg text-gray-600">
              Click an icon below to navigate through sections.
            </p>
          </div>
        );
    }
  };

  const icons = [
    { key: 'call', label: 'Call', icon: FiPhone },
    { key: 'call-log', label: 'Call Log', icon: FiList },
    { key: 'settings', label: 'Settings', icon: FiSettings },
  ];

  const handleLogout = () => {
    window.location.href = '/';
  };

  return (
    <div
      className={`min-h-screen flex flex-col ${
        darkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'
      } transition-all duration-300 ease-in-out`}
    >
      {/* Navbar */}
      <Navbar
        username={username}
        userStatus={userStatus}
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        activeComponent={activeComponent}
        setActiveComponent={setActiveComponent}
        handleLogout={handleLogout}
      />

      {/* Main Content */}
      <div className="flex-grow overflow-auto pb-20">
        <div className="container mx-auto px-4 py-6">{renderComponent()}</div>
      </div>

      {/* Footer Navigation */}
      <div
        className={`fixed bottom-0 left-0 right-0 ${
          darkMode ? 'bg-gray-800' : 'bg-white'
        } py-4 shadow-lg`}
      >
        <div className="grid grid-cols-3 gap-3 max-w-xl mx-auto">
          {icons.map(({ key, label, icon: Icon }) => (
            <button
              key={key}
              onClick={() => setActiveComponent(key)}
              className={`flex flex-col items-center py-2 rounded-lg transition-colors duration-300 ${
                activeComponent === key
                  ? 'bg-blue-700 text-white scale-105 shadow-lg'
                  : darkMode
                  ? 'bg-gray-700 text-gray-400 hover:bg-blue-600 hover:text-white'
                  : 'bg-gray-200 text-gray-600 hover:bg-blue-500 hover:text-white'
              }`}
            >
              <Icon className="text-3xl mb-1" />
              <span className="text-sm font-semibold">{label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
