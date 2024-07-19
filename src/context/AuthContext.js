/* eslint-disable prettier/prettier */
import React, { createContext, useState, useEffect } from 'react';
import { login, register, logout } from '../services/auth';
import { getStoredUser } from '../services/storage';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const checkUser = async () => {
      const storedUser = await getStoredUser();
      if (storedUser) {
        setUser(storedUser);
      }
    };
    checkUser();
  }, []);

  const authContext = {
    user,
    login: async (email, password) => {
      const loggedInUser = await login(email, password);
      setUser(loggedInUser);
    },
    register: async (email, password) => {
      const newUser = await register(email, password);
      setUser(newUser);
    },
    logout: async () => {
      await logout();
      setUser(null);
    },
  };

  return (
    <AuthContext.Provider value={authContext}>
      {children}
    </AuthContext.Provider>
  );
};
