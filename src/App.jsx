import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginSignupPage from './components/LoginSignupPage';
import AdminLoginPage from './components/AdminLoginPage';
import HomePage from './pages/HomePage';
import AdminDashboard from './pages/AdminDashboard';
import ServerTest from './pages/ServerTest';
import { ThemeProvider } from './ThemeContext';
import { AuthProvider } from './context/AuthContext';
import { AdminAuthProvider } from './context/AdminAuthContext';
import PrivateRoute from './components/PrivateRoute';
import PrivateAdminRoute from './components/PrivateAdminRoute';
import SipModal from './components/SipModal';
import NewUI from './components/NewUI';
import Hero from './components/Hero';

const App = () => {
  return (
    <ThemeProvider>
      <AuthProvider>
        <AdminAuthProvider>
          <Router>
            <Routes>
            <Route path="/" element={<Hero />} />
              <Route path="/home" element={<HomePage />} />
              <Route path="/admin-login" element={<AdminLoginPage />} />
              <Route path="/admin" element={<PrivateAdminRoute element={<AdminDashboard />} />} />
              <Route path="/server" element={<PrivateRoute element={<ServerTest />} />} />
              <Route path='/sip' element={<SipModal />} />
              <Route path='/new' element={<NewUI />} /> 
            </Routes>
          </Router>
        </AdminAuthProvider>
      </AuthProvider>
    </ThemeProvider>
  );
};

export default App;