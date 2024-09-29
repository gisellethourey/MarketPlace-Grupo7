import React, { createContext, useState, useContext } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem('user');
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const register = async (userData) => {
    localStorage.setItem('user', JSON.stringify(userData));
    setUser(userData);
  };

  const login = async (token) => {
    return new Promise((resolve, reject) => {
      try {
        if (token) {
         
          fetch(`${import.meta.env.VITE_API_URL}/usuarios/profile`, { 
            method: 'GET',
            headers: {
              'Authorization': `Bearer ${token}`
            }
          })
          .then(response => response.json())
          .then(data => {
            const userData = {
              token,
              nombre: data.username,
              email: data.email,
              telefono: data.phone_number
            };
            localStorage.setItem('user', JSON.stringify(userData));
            setUser(userData);
            resolve();
          })
          .catch(error => {
            reject('Error al obtener los datos del usuario');
          });
        } else {
          reject('Token no válido');
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