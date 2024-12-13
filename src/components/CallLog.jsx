import React, { useEffect, useState } from 'react';

// Helper function to format date from "start_stamp"
const formatDate = (startStamp) => {
  const date = new Date(startStamp); // Convert to Date object
  return date.toLocaleDateString('en-US'); // Return the date portion (MM/DD/YYYY format)
};

// Helper function to extract and format time with AM/PM from "start_stamp"
const formatTime = (startStamp) => {
  const date = new Date(startStamp); // Convert to Date object
  return date.toLocaleTimeString('en-US', { hour12: true }); // Convert to 12-hour time format with AM/PM
};

// Helper function to calculate duration in minutes and seconds
const calculateDuration = (duration) => {
  const minutes = Math.floor(duration / 60);
  const seconds = duration % 60;
  return `${minutes}m ${seconds}s`; // Return as 'X m Y s'
};

const Cdr = ({ darkMode }) => {
  const [cdrLogs, setCdrLogs] = useState([]);

  // Function to fetch data from the Express server
  const fetchData = () => {
    fetch('https://server-ou54.onrender.com/webapi/core/cdr') // Use Render server URL
      .then((response) => response.json())
      .then((data) => {
        // Sort the data in descending order by "start_stamp"
        const sortedData = data.sort((a, b) => new Date(b.start_stamp) - new Date(a.start_stamp));
        setCdrLogs(sortedData); // Set the sorted data to cdrLogs state
      })
      .catch((error) => console.error('Error fetching data:', error));
  };

  useEffect(() => {
    fetchData(); // Initial fetch
    const interval = setInterval(fetchData, 5000); // Poll every 5 seconds

    return () => clearInterval(interval); // Clear interval on component unmount
  }, []); // Empty dependency array means it runs only on mount and unmount

  return (
    <div
      className={`p-6 rounded-lg shadow-md ${
        darkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'
      } transition-all`}
    >
      <h1 className="text-2xl font-semibold mb-6 text-center">Call Log</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto">
          <thead
            className={`${
              darkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-700'
            }`}
          >
            <tr>
              <th className="py-3 px-4 text-left text-sm sm:text-base">S.No.</th>
              <th className="py-3 px-4 text-left text-sm sm:text-base">Date</th>
              <th className="py-3 px-4 text-left text-sm sm:text-base">Time</th>
              <th className="py-3 px-4 text-left text-sm sm:text-base">Caller</th>
              <th className="py-3 px-4 text-left text-sm sm:text-base">Type</th>
              <th className="py-3 px-4 text-left text-sm sm:text-base">Duration</th>
            </tr>
          </thead>
          <tbody>
            {cdrLogs.length > 0 ? (
              cdrLogs.map((log, index) => (
                <tr
                  key={log.serial_number}
                  className={`${
                    index % 2 === 0
                      ? darkMode
                        ? 'bg-gray-700'
                        : 'bg-gray-50'
                      : darkMode
                      ? 'bg-gray-600'
                      : 'bg-gray-200'
                  } hover:${
                    darkMode ? 'bg-gray-500' : 'bg-gray-300'
                  } transition-colors`}
                >
                  <td className="py-3 px-4 text-sm sm:text-base">{index + 1}</td> {/* Generate S.No. */}
                  <td className="py-3 px-4 text-sm sm:text-base">{formatDate(log.start_stamp)}</td> {/* Extract date */}
                  <td className="py-3 px-4 text-sm sm:text-base">{formatTime(log.start_stamp)}</td> {/* Extract time */}
                  <td className="py-3 px-4 text-sm sm:text-base">{log.caller_id_name}</td>
                  <td className="py-3 px-4 text-sm sm:text-base">NA</td>
                  <td className="py-3 px-4 text-sm sm:text-base">
                    {calculateDuration(log.duration)}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="6"
                  className="py-4 text-center text-lg text-gray-500"
                >
                  No call logs available.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Cdr;
