import React, { useState, useEffect } from 'react';
import { FaPhoneAlt, FaUsers, FaArrowDown, FaArrowUp, FaClock, FaExclamationTriangle } from 'react-icons/fa';

const Dashboard = ({ darkMode }) => {
  const [data, setData] = useState({
    ongoingCall: 'John Doe - 5:23',
    usersOnline: 8,
    incomingCalls: 18,
    outgoingCalls: 17,
    missedCalls: 26,
    totalMinutes: '324 minutes',
  });

  useEffect(() => {
    const fetchData = () => {
      setTimeout(() => {
        setData({
          ongoingCall: 'Alice Smith - 3:45',
          usersOnline: Math.floor(Math.random() * 10) + 5,
          incomingCalls: Math.floor(Math.random() * 20) + 10,
          outgoingCalls: Math.floor(Math.random() * 20) + 10,
          missedCalls: Math.floor(Math.random() * 10) + 5,
          totalMinutes: `${Math.floor(Math.random() * 500) + 200} minutes`,
        });
      }, 2000);
    };

    fetchData();
    const interval = setInterval(fetchData, 30000);

    return () => clearInterval(interval);
  }, []);

  const cards = [
    { title: 'Ongoing Call', value: data.ongoingCall, icon: FaPhoneAlt, color: 'blue' },
    { title: 'Users Online', value: `${data.usersOnline} users`, icon: FaUsers, color: 'green' },
    { title: 'Incoming Calls', value: `${data.incomingCalls} calls`, icon: FaArrowDown, color: 'indigo' },
    { title: 'Outgoing Calls', value: `${data.outgoingCalls} calls`, icon: FaArrowUp, color: 'yellow' },
    { title: 'Missed Calls', value: `${data.missedCalls} calls`, icon: FaExclamationTriangle, color: 'red' },
    { title: 'Total Minutes', value: data.totalMinutes, icon: FaClock, color: 'purple' },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {cards.map((card, index) => (
        <div
          key={index}
          className={`p-6 rounded-lg shadow-md flex flex-col justify-between transform transition-all duration-300 hover:scale-105 ${
            darkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'
          }`}
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold">{card.title}</h2>
            <card.icon className={`text-3xl text-${card.color}-500 animate-pulse`} aria-hidden="true" />
          </div>
          <div className="text-4xl font-bold mb-2">{card.value}</div>
          <div className={`h-2 w-full bg-${card.color}-200 rounded-full overflow-hidden`}>
            <div 
              className={`h-full bg-${card.color}-500 rounded-full transition-all duration-1000 ease-in-out`} 
              style={{ width: `${Math.random() * 100}%` }}
            ></div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Dashboard;

