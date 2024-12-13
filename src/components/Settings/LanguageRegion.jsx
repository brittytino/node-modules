import React, { useState, useEffect } from 'react';

const LanguageRegion = ({ darkMode }) => {
  const [language, setLanguage] = useState('English');
  const [region, setRegion] = useState('United States');

  useEffect(() => {
    // Fetch language and region settings from the backend
    fetch('http://localhost:5000/api/language-region')
      .then(response => response.json())
      .then(data => {
        setLanguage(data.language);
        setRegion(data.region);
      })
      .catch(error => console.error('Error fetching language and region settings:', error));
  }, []);

  const handleSave = () => {
    // Save language and region settings to the backend
    fetch('http://localhost:5000/api/language-region', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ language, region }),
    })
      .then(response => response.json())
      .then(data => {
        alert('Language and region settings saved successfully!');
      })
      .catch(error => console.error('Error saving language and region settings:', error));
  };

  return (
    <div className={`p-6 rounded-lg shadow-md ${darkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'} transition-all`}>
      <h2 className="text-2xl font-bold mb-4">Language & Region</h2>
      <div className="space-y-4">
        <div>
          <label className="block">Language</label>
          <select
            className={`mt-1 p-2 w-full border rounded-lg focus:outline-none ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-gray-100 border-gray-300'}`}
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
          >
            <option>English</option>
            <option>Spanish</option>
            <option>French</option>
          </select>
        </div>
        <div>
          <label className="block">Region</label>
          <select
            className={`mt-1 p-2 w-full border rounded-lg focus:outline-none ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-gray-100 border-gray-300'}`}
            value={region}
            onChange={(e) => setRegion(e.target.value)}
          >
            <option>United States</option>
            <option>India</option>
            <option>UK</option>
          </select>
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

export default LanguageRegion;