import React, { createContext, useState, useContext } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const login = async (username, password) => {
    try {
      // Fetch extension and password data from the server
      const response = await fetch('https://server-ou54.onrender.com/webapi/core/extension-auth');
      if (!response.ok) {
        throw new Error('Failed to fetch extensions data');
      }

      const extensions = await response.json();

      // Check if entered credentials match any in the fetched data
      const isValidUser = extensions.some(
        (ext) => ext.extension === username && ext.password === password
      );

      if (isValidUser) {
        setIsAuthenticated(true);
        return true; // Return true for successful login
      }

      return false; // Return false if credentials are invalid
    } catch (error) {
      console.error('Error during login:', error.message);
      return false; // Return false if an error occurs
    }
  };

  const logout = () => {
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
