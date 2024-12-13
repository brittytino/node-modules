import React, { useEffect, useState } from 'react';
import { FiVideo } from 'react-icons/fi'; // Import only the video icon

const Contacts = ({ darkMode }) => {
  const [contacts, setContacts] = useState([]);

  // Function to fetch data from the deployed Express server
  const fetchData = () => {
    fetch('https://server-ou54.onrender.com/webapi/core/extension') // Updated URL
      .then((response) => response.json())
      .then((data) => setContacts(data)) // Set the fetched data to contacts state
      .catch((error) => console.error('Error fetching data:', error));
  };

  useEffect(() => {
    fetchData(); // Initial fetch
    const interval = setInterval(fetchData, 5000); // Poll every 5 seconds

    return () => clearInterval(interval); // Clear interval on component unmount
  }, []);

  return (
    <div
      className={`min-h-screen p-8 ${
        darkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-900'
      } transition-all`}
    >
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-4">PBX Extension</h1>
        <table
          className={`w-full shadow-lg rounded-lg ${
            darkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'
          }`}
        >
          <thead>
            <tr
              className={`${
                darkMode ? 'bg-gray-700 text-white' : 'bg-indigo-600 text-white'
              }`}
            >
              <th className="py-3 px-4 text-left">Contact Name</th>
              <th className="py-3 px-4 text-left">SIP Number</th>
              <th className="py-3 px-4 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {contacts.map((contact) => (
              <tr
                key={contact.extension_uuid}
                className={`hover:bg-gray-100 border-t ${
                  darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
                }`}
              >
                <td className="py-3 px-4">
                  {contact.effective_caller_id_name || 'N/A'}
                </td>
                <td className="py-3 px-4">{contact.extension}</td>
                <td className="py-3 px-4 flex space-x-4">
                  {/* Video call button */}
                  <button className="text-green-600 hover:underline flex items-center">
                    <FiVideo className="mr-1" /> Call
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Contacts;