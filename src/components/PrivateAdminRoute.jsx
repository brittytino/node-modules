import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAdminAuth } from '../context/AdminAuthContext';

const PrivateAdminRoute = ({ element }) => {
  const { isAdminAuthenticated } = useAdminAuth();
  return isAdminAuthenticated ? element : <Navigate to="/admin-login" />;
};

export default PrivateAdminRoute;