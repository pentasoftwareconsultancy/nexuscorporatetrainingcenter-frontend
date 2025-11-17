import React, { createContext, useState, useEffect } from "react";
import storageService from "../services/storage.service";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Load user ONCE when app starts
  useEffect(() => {
    const storedUser = storageService.getUser();
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

  // LOGIN FUNCTION
  const login = (userData) => {
    storageService.saveUser(userData);
    setUser(userData);
  };

  // LOGOUT FUNCTION
  const logout = () => {
    storageService.removeUser();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
