import React, { createContext, useState, useContext } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem('user');
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const register = async (userData) => {
    const { token, userId } = userData; 
    localStorage.setItem('user', JSON.stringify({ token, userId }));
    setUser({ token, userId });
  };

  const login = async (userData) => {
    return new Promise((resolve, reject) => {
      try {
        const { token, userId } = userData;
        if (token && userId) {
          const loggedInUser = { token, userId };
          localStorage.setItem('user', JSON.stringify(loggedInUser));
          setUser(loggedInUser);
          resolve();
        } else {
          throw new Error('Credenciales inválidas');
        }
      } catch (error) {
        reject(error);
      }
    });
  };

  const logout = () => {
    localStorage.removeItem('user');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
