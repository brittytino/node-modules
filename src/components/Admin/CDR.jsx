import React, { useState, useEffect } from 'react';

const CDR = ({ darkMode }) => {
  const [logs, setLogs] = useState([]);
  const [filters, setFilters] = useState({
    fromDate: '',
    toDate: '',
    callerId: '',
    receiverId: '',
    type: '',
  });

  useEffect(() => {
    // Fetch data from the PBX API
    const fetchLogs = async () => {
      try {
        const response = await fetch('https://server-ou54.onrender.com/webapi/core/cdr');
        if (!response.ok) throw new Error('Failed to fetch CDR data');
        const data = await response.json();

        // Sort logs in descending order by date
        const sortedLogs = data.sort((a, b) => new Date(b.start_stamp) - new Date(a.start_stamp));
        setLogs(sortedLogs);
      } catch (error) {
        console.error('Error fetching CDR:', error.message);
      }
    };

    fetchLogs();
  }, []);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  const clearFilters = () => {
    setFilters({
      fromDate: '',
      toDate: '',
      callerId: '',
      receiverId: '',
      type: '',
    });
  };

  const applyFilters = (log) => {
    const logDate = new Date(log.start_stamp);
    const fromDate = filters.fromDate ? new Date(filters.fromDate) : null;
    const toDate = filters.toDate ? new Date(filters.toDate) : null;

    return (
      (!filters.fromDate || logDate >= fromDate) &&
      (!filters.toDate || logDate <= toDate) &&
      (!filters.callerId || log.caller_id_number.includes(filters.callerId)) &&
      (!filters.receiverId || log.destination_number.includes(filters.receiverId)) &&
      (!filters.type || log.status.toLowerCase() === filters.type.toLowerCase())
    );
  };

  const filteredLogs = logs.filter(applyFilters);

  const formatDuration = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}m ${secs}s`;
  };

  const formatTime = (dateTime) => {
    const [date, time] = dateTime.split(' ');
    const [hours, minutes] = time.split(':');
    const ampm = hours >= 12 ? 'PM' : 'AM';
    const formattedHours = hours % 12 || 12;
    return `${formattedHours}:${minutes} ${ampm}`;
  };

  const formatDate = (dateTime) => dateTime.split(' ')[0];

  return (
    <div className={`container mx-auto p-6 ${darkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'}`}>
      <h2 className="text-2xl font-bold mb-6">Call Detail Records</h2>

      <div className="mb-6 flex flex-wrap items-center gap-4">
        <div className="flex items-center space-x-2">
          <label htmlFor="fromDate" className="text-sm font-medium">From Date:</label>
          <input
            type="date"
            id="fromDate"
            name="fromDate"
            value={filters.fromDate}
            onChange={handleFilterChange}
            className={`rounded-md border ${darkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'} px-3 py-2 text-sm`}
          />
        </div>
        <div className="flex items-center space-x-2">
          <label htmlFor="toDate" className="text-sm font-medium">To Date:</label>
          <input
            type="date"
            id="toDate"
            name="toDate"
            value={filters.toDate}
            onChange={handleFilterChange}
            className={`rounded-md border ${darkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'} px-3 py-2 text-sm`}
          />
        </div>
        <div className="flex items-center space-x-2">
          <label htmlFor="callerId" className="text-sm font-medium">Caller ID:</label>
          <input
            type="text"
            id="callerId"
            name="callerId"
            value={filters.callerId}
            onChange={handleFilterChange}
            placeholder="Enter Caller ID"
            className={`rounded-md border ${darkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'} px-3 py-2 text-sm`}
          />
        </div>
        <div className="flex items-center space-x-2">
          <label htmlFor="receiverId" className="text-sm font-medium">Receiver ID:</label>
          <input
            type="text"
            id="receiverId"
            name="receiverId"
            value={filters.receiverId}
            onChange={handleFilterChange}
            placeholder="Enter Receiver ID"
            className={`rounded-md border ${darkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'} px-3 py-2 text-sm`}
          />
        </div>
        <div className="flex items-center space-x-2">
          <label htmlFor="type" className="text-sm font-medium">Type:</label>
          <select
            id="type"
            name="type"
            value={filters.type}
            onChange={handleFilterChange}
            className={`rounded-md border ${darkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'} px-3 py-2 text-sm`}
          >
            <option value="">All</option>
            <option value="Answered">Answered</option>
            <option value="Failed">Failed</option>
            <option value="Cancelled">Cancelled</option>
            <option value="Voicemail">Voicemail</option>
            <option value="No_Answer">No Answer</option>
            <option value="Missed">Missed</option>
          </select>
        </div>
        <button
          onClick={clearFilters}
          className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors duration-300"
        >
          Clear All Filters
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead className={darkMode ? 'bg-gray-700' : 'bg-gray-50'}>
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">S.No</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Date</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Time</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Caller</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Receiver</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Type</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Duration</th>
            </tr>
          </thead>
          <tbody className={`divide-y divide-gray-200 dark:divide-gray-700 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
            {filteredLogs.map((log, index) => (
              <tr key={log.id} className={`transition-colors duration-300 ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-50'}`}>
                <td className="px-6 py-4 whitespace-nowrap">{index + 1}</td>
                <td className="px-6 py-4 whitespace-nowrap">{formatDate(log.start_stamp)}</td>
                <td className="px-6 py-4 whitespace-nowrap">{formatTime(log.start_stamp)}</td>
                <td className="px-6 py-4 whitespace-nowrap">{`${log.caller_id_number} - ${log.caller_id_name}`}</td>
                <td className="px-6 py-4 whitespace-nowrap">{`${log.destination_number} - ${log.caller_destination}`}</td>
                <td className="px-6 py-4 whitespace-nowrap">{log.status}</td>
                <td className="px-6 py-4 whitespace-nowrap">{formatDuration(log.duration)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CDR;
