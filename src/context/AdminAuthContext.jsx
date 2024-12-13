import React, { createContext, useState, useContext } from 'react';
import bcrypt from 'bcryptjs';

const AdminAuthContext = createContext();

export const AdminAuthProvider = ({ children }) => {
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);

  const adminLogin = async (username, password) => {
    try {
      // Fetch user credentials from your server
      const response = await fetch('https://server-ou54.onrender.com/webapi/core/user-auth');
      if (!response.ok) {
        throw new Error(`Failed to fetch user data: ${response.statusText}`);
      }

      const users = await response.json(); // Array of users with username and hashed password
      const user = users.find((user) => user.username === username);

      if (user) {
        // Compare the entered password with the stored hashed password
        const isMatch = await bcrypt.compare(password, user.password);
        if (isMatch) {
          console.log('Login successful!');
          setIsAdminAuthenticated(true);
          return true;
        }
      }

      console.log('Invalid username or password.');
      return false;
    } catch (error) {
      console.error('Error during login:', error);
      return false;
    }
  };

  const adminLogout = () => {
    setIsAdminAuthenticated(false);
  };

  return (
    <AdminAuthContext.Provider value={{ isAdminAuthenticated, adminLogin, adminLogout }}>
      {children}
    </AdminAuthContext.Provider>
  );
};

export const useAdminAuth = () => useContext(AdminAuthContext);
