import React, { useState, useEffect } from 'react';
import { FaTachometerAlt, FaUsers, FaPhoneAlt, FaCog, FaPhone, FaTable, FaSun, FaMoon, FaSignOutAlt, FaBell, FaBars } from 'react-icons/fa';
import { Dashboard, Users, CDR, Settings, Call, Extension} from '../components/Admin';
import ForgotPassword from '../components/Admin/ForgotPassword'; // Update this line with the correct path
import SipModal from '../components/SipModal';

const AdminDashboard = () => {
  const [activeComponent, setActiveComponent] = useState('Dashboard');
  const [darkMode, setDarkMode] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [notifications, setNotifications] = useState([]);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isSipModalOpen, setIsSipModalOpen] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const fetchNotifications = () => {
      setNotifications([
        { id: 1, message: 'New user registered', time: '7 minutes ago' },
        { id: 2, message: 'Missed call from John Doe', time: '5 minutes ago' },
        { id: 3, message: 'System update available', time: '10 minutes ago' },
      ]);
    };
    fetchNotifications();
  }, []);

  useEffect(() => {
    if (activeComponent === 'Call') {
      setIsSipModalOpen(true);
    }
  }, [activeComponent]);

  const renderComponent = () => {
    switch (activeComponent) {
      case 'Dashboard':
        return <Dashboard darkMode={darkMode} />;
      case 'Users':
        return <Users darkMode={darkMode} />;
      case 'CDR':
        return <CDR darkMode={darkMode} />;
      case 'Call':
        return <Call darkMode={darkMode} />;
      case 'Extension':
        return <Extension darkMode={darkMode} />;
      case 'Settings':
        return <Settings darkMode={darkMode} />;
      case 'ForgotPassword':
        return <ForgotPassword darkMode={darkMode} />;
      default:
        return <Dashboard darkMode={darkMode} />;
    }
  };

  const navItems = [
    { name: 'Dashboard', icon: FaTachometerAlt },
    { name: 'Users', icon: FaUsers },
    { name: 'CDR', icon: FaPhoneAlt },
    { name: 'Call', icon: FaPhone },
    { name: 'Extension', icon: FaTable },
    { name: 'Settings', icon: FaCog },
    { name: 'ForgotPassword', icon: FaSignOutAlt },
  ];

  const handleLogout = () => {
    setShowLogoutModal(true);
  };

  const confirmLogout = () => {
    // Add logout logic here (e.g., clearing local storage, etc.)
    window.location.href = '/';
  };

  return (
    <div className={`flex h-screen ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-900'} transition-all duration-300`}>
      {/* Sidebar */}
      <aside className={`${isSidebarOpen ? 'w-64' : 'w-20'} ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg flex flex-col transition-all duration-300`}>
        <div className="p-4 flex items-center justify-between">
          <h1 className={`text-2xl font-bold ${isSidebarOpen ? 'block' : 'hidden'}`}>Admin Panel</h1>
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200"
          >
            <FaBars className="text-xl" />
          </button>
        </div>
        <nav className="mt-8 flex-grow">
          {navItems.map((item) => (
            <button
              key={item.name}
              onClick={() => setActiveComponent(item.name)}
              className={`flex items-center p-4 w-full text-left transition-all duration-200 ${
                activeComponent === item.name
                  ? 'bg-blue-600 text-white'
                  : `${darkMode ? 'text-gray-400' : 'text-gray-600'} hover:bg-blue-500 hover:text-white`
              }`}
            >
              <item.icon className={`${isSidebarOpen ? 'mr-3' : 'mx-auto'} text-xl`} />
              <span className={isSidebarOpen ? 'block' : 'hidden'}>{item.name}</span>
            </button>
          ))}
        </nav>
        <button
          onClick={handleLogout}
          className={`flex items-center p-4 w-full text-left transition-colors duration-200 ${
            darkMode ? 'text-gray-400 hover:bg-red-700' : 'text-gray-600 hover:bg-red-500'
          } hover:text-white mt-auto`}
        >
          <FaSignOutAlt className={`${isSidebarOpen ? 'mr-3' : 'mx-auto'} text-xl`} />
          <span className={isSidebarOpen ? 'block' : 'hidden'}>Logout</span>
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-grow p-6 overflow-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">{activeComponent}</h1>
          <div className="flex items-center space-x-4">
            {/* Current Time */}
            <div className="text-lg font-semibold">
              {currentTime.toLocaleTimeString()} | {currentTime.toLocaleDateString()}
            </div>
            {/* Notifications */}
            <div className="relative">
              <button
                className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors duration-200"
                onClick={() => setNotifications([])}
              >
                <FaBell className="text-xl text-yellow-500" />
                {notifications.length > 0 && (
                  <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {notifications.length}
                  </span>
                )}
              </button>
              {notifications.length > 0 && (
                <div className="absolute right-0 mt-2 w-72 bg-white dark:bg-gray-800 rounded-lg shadow-lg z-10">
                  {notifications.map((notification) => (
                    <div key={notification.id} className="p-3 border-b border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200">
                      <p className="text-sm font-medium">{notification.message}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{notification.time}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
            {/* Dark Mode Toggle */}
            <button
              onClick={() => setDarkMode(!darkMode)}
              className={`p-2 rounded-full ${darkMode ? 'bg-yellow-400 text-gray-900' : 'bg-gray-700 text-white'} transition-colors duration-200`}
              aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
            >
              {darkMode ? <FaSun /> : <FaMoon />}
            </button>
          </div>
        </div>
        <div className={`bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg transition-all duration-300 transform hover:scale-[1.01]`}>
          {renderComponent()}
        </div>
      </main>

      {/* Logout Confirmation Modal */}
      {showLogoutModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-xl">
            <h2 className="text-2xl font-bold mb-4">Confirm Logout</h2>
            <p className="mb-6">Are you sure you want to logout?</p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setShowLogoutModal(false)}
                className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400 transition-colors duration-200"
              >
                Cancel
              </button>
              <button
                onClick={confirmLogout}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors duration-200"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}

      {/* SIP Modal */}
      <SipModal isOpen={isSipModalOpen} onClose={() => setIsSipModalOpen(false)} />
    </div>
  );
};

export default AdminDashboard;