import React from 'react';

const HelpSupport = ({ darkMode }) => {
  return (
    <div className={`p-6 rounded-lg shadow-md ${darkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'} transition-all`}>
      <h2 className="text-2xl font-bold mb-4">Help & Support</h2>
      <p>For any issues, please contact support at support@example.com.</p>
    </div>
  );
};

export default HelpSupport;