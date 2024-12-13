import React, { useState, useEffect } from 'react';
import { FaEdit, FaSpinner } from 'react-icons/fa';
import EditExtensionDialog from './EditExtensionDialog';

const Extension = ({ darkMode }) => {
  const [extensions, setExtensions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedExtension, setSelectedExtension] = useState(null);

  useEffect(() => {
    const fetchExtensions = async () => {
      try {
        const response = await fetch('https://server-ou54.onrender.com/webapi/core/extension');
        if (!response.ok) {
          throw new Error(`Failed to fetch extensions: ${response.statusText}`);
        }
        const data = await response.json();
        setExtensions(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchExtensions();
  }, []);

  const toggleStatus = (id) => {
    setExtensions(extensions.map(ext =>
      ext.id === id ? { ...ext, enabled: !ext.enabled } : ext
    ));
  };

  const handleEdit = (extension) => {
    setSelectedExtension(extension);
  };

  const closeDialog = () => {
    setSelectedExtension(null);
  };

  if (loading) return (
    <div className="flex justify-center items-center h-screen">
      <FaSpinner className="animate-spin text-4xl text-blue-500" />
    </div>
  );

  if (error) return (
    <div className="flex justify-center items-center h-screen">
      <p className="text-red-500 text-xl">Error: {error}</p>
    </div>
  );

  return (
    <div className={`container mx-auto p-6 ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-900'}`}>
      <h2 className="text-3xl font-bold mb-6 text-center">Extensions Management</h2>
      <div className="overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left">
          <thead className={`text-xs uppercase ${darkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-200 text-gray-700'}`}>
            <tr>
              <th scope="col" className="px-6 py-3">Extension No</th>
              <th scope="col" className="px-6 py-3">Extension Password</th>
              <th scope="col" className="px-6 py-3">Name</th>
              <th scope="col" className="px-6 py-3">Status</th>
              <th scope="col" className="px-6 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {extensions.map(ext => (
              <tr key={ext.id} className={`border-b ${darkMode ? 'bg-gray-800 border-gray-700 hover:bg-gray-700' : 'bg-white border-gray-200 hover:bg-gray-50'}`}>
                <td className="px-6 py-4">{ext.extension}</td>
                <td className="px-6 py-4">********</td>
                <td className="px-6 py-4">{ext.effective_caller_id_name}</td>
                <td className="px-6 py-4">
                  <div className="flex items-center">
                    <span className={`mr-2 ${ext.enabled ? 'text-green-500' : 'text-red-500'}`}>
                      {ext.enabled ? 'Active' : 'Inactive'}
                    </span>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={ext.enabled}
                        onChange={() => toggleStatus(ext.id)}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                    </label>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <button
                    className="text-yellow-500 hover:text-yellow-600 transition-colors duration-300"
                    onClick={() => handleEdit(ext)}
                  >
                    <FaEdit className="text-xl" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selectedExtension && (
        <EditExtensionDialog
          extension={selectedExtension}
          onClose={closeDialog}
          darkMode={darkMode}
        />
      )}
    </div>
  );
};

export default Extension;
