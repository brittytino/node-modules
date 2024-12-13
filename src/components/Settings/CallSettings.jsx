import React, { useState, useEffect } from 'react';

const CallSettings = ({ darkMode }) => {
  const [ringtone, setRingtone] = useState('Default');
  const [callForwarding, setCallForwarding] = useState(false);

  useEffect(() => {
    // Fetch call settings from the backend
    fetch('http://localhost:5000/api/call-settings')
      .then(response => response.json())
      .then(data => {
        setRingtone(data.ringtone);
        setCallForwarding(data.callForwarding);
      })
      .catch(error => console.error('Error fetching call settings:', error));
  }, []);

  const handleSave = () => {
    // Save call settings to the backend
    fetch('http://localhost:5000/api/call-settings', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ ringtone, callForwarding }),
    })
      .then(response => response.json())
      .then(data => {
        alert('Call settings saved successfully!');
      })
      .catch(error => console.error('Error saving call settings:', error));
  };

  return (
    <div className={`p-6 rounded-lg shadow-md ${darkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'} transition-all`}>
      <h2 className="text-2xl font-bold mb-4">Call Settings</h2>
      <div className="space-y-4">
        <div>
          <label className="block">Ringtone</label>
          <select
            className={`mt-1 p-2 w-full border rounded-lg focus:outline-none ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-gray-100 border-gray-300'}`}
            value={ringtone}
            onChange={(e) => setRingtone(e.target.value)}
          >
            <option>Default</option>
            <option>Classic</option>
            <option>Beep</option>
          </select>
        </div>
        <div>
          <label className="block">Call Forwarding</label>
          <input
            type="checkbox"
            className="mt-1"
            checked={callForwarding}
            onChange={(e) => setCallForwarding(e.target.checked)}
          /> Enable Call Forwarding
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

export default CallSettings;