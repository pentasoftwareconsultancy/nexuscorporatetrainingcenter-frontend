import React, { createContext, useState, useEffect } from "react";
import storageService from "../services/storage.service";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // store token or user object

  useEffect(() => {
    const storedUser = storageService.getUser(); // e.g. from localStorage
    if (storedUser) setUser(storedUser);
  }, []);

  const login = (userData) => {
    storageService.saveUser(userData);
    setUser(userData);
  };

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
