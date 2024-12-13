import React, { useState } from 'react';
import {
  FiUser,
  FiPhone,
  FiVideo,
  FiGlobe,
  FiHelpCircle,
} from 'react-icons/fi';
import AccountSettings from '../components/Settings/AccountSettings';
import CallSettings from '../components/Settings/CallSettings';
import VideoSettings from '../components/Settings/VideoSettings';
import LanguageRegion from '../components/Settings/LanguageRegion';
import HelpSupport from '../components/Settings/HelpSupport';

const Settings = ({ darkMode }) => {
  const [activeSetting, setActiveSetting] = useState('Account Settings');

  const settingsOptions = [
    { icon: <FiUser />, label: 'Account Settings' },
    { icon: <FiPhone />, label: 'Call Settings' },
    { icon: <FiVideo />, label: 'Video Settings' },
    { icon: <FiGlobe />, label: 'Language and Region' },
    { icon: <FiHelpCircle />, label: 'Help and Support' },
  ];

  const renderActiveSetting = () => {
    switch (activeSetting) {
      case 'Account Settings':
        return <AccountSettings darkMode={darkMode} />;
      case 'Call Settings':
        return <CallSettings darkMode={darkMode} />;
      case 'Video Settings':
        return <VideoSettings darkMode={darkMode} />;
      case 'Language and Region':
        return <LanguageRegion darkMode={darkMode} />;
      case 'Help and Support':
        return <HelpSupport darkMode={darkMode} />;
      default:
        return null;
    }
  };

  return (
    <div
      className={`flex justify-center items-center max-h-screen p-10 ${
        darkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-800'
      }`}
    >
      <div
        className={`max-w-5xl w-full ${
          darkMode ? 'bg-gray-800' : 'bg-white'
        } shadow-lg rounded-xl p-6`}
      >
        <div className="flex flex-col md:flex-row">
          <ul className="space-y-4 mb-6 md:mb-0 md:mr-6 md:w-1/4">
            {settingsOptions.map((option, index) => (
              <li
                key={index}
                className={`flex items-center space-x-4 py-4 px-6 rounded-lg cursor-pointer transition duration-200 ${
                  darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
                } ${
                  activeSetting === option.label
                    ? darkMode
                      ? 'bg-gray-700'
                      : 'bg-gray-100'
                    : ''
                }`}
                onClick={() => setActiveSetting(option.label)}
              >
                <div
                  className={`text-2xl ${
                    darkMode ? 'text-indigo-400' : 'text-indigo-500'
                  }`}
                >
                  {option.icon}
                </div>
                <span
                  className={`text-lg font-medium ${
                    darkMode ? 'text-white' : 'text-gray-700'
                  }`}
                >
                  {option.label}
                </span>
              </li>
            ))}
          </ul>
          <div className="flex-1">{renderActiveSetting()}</div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
