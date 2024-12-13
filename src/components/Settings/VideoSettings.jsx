import React, { useState, useEffect } from 'react';

const VideoSettings = ({ darkMode }) => {
  const [resolution, setResolution] = useState('1080p');
  const [microphone, setMicrophone] = useState('Default Microphone');

  useEffect(() => {
    // Fetch video settings from the backend
    fetch('http://localhost:5000/api/video-settings')
      .then(response => response.json())
      .then(data => {
        setResolution(data.resolution);
        setMicrophone(data.microphone);
      })
      .catch(error => console.error('Error fetching video settings:', error));
  }, []);

  const handleSave = () => {
    // Save video settings to the backend
    fetch('http://localhost:5000/api/video-settings', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ resolution, microphone }),
    })
      .then(response => response.json())
      .then(data => {
        alert('Video settings saved successfully!');
      })
      .catch(error => console.error('Error saving video settings:', error));
  };

  return (
    <div className={`p-6 rounded-lg shadow-md ${darkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'} transition-all`}>
      <h2 className="text-2xl font-bold mb-4">Video Settings</h2>
      <div className="space-y-4">
        <div>
          <label className="block">Resolution</label>
          <select
            className={`mt-1 p-2 w-full border rounded-lg focus:outline-none ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-gray-100 border-gray-300'}`}
            value={resolution}
            onChange={(e) => setResolution(e.target.value)}
          >
            <option>1080p</option>
            <option>720p</option>
            <option>480p</option>
          </select>
        </div>
        <div>
          <label className="block">Microphone</label>
          <select
            className={`mt-1 p-2 w-full border rounded-lg focus:outline-none ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-gray-100 border-gray-300'}`}
            value={microphone}
            onChange={(e) => setMicrophone(e.target.value)}
          >
            <option>Default Microphone</option>
            <option>External Mic</option>
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

export default VideoSettings;