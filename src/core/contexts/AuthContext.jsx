import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Load saved user on refresh
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  // Login
  const login = (data) => {
    console.log("LOGIN DATA IN CONTEXT:", data);
    
    // Extract token (works for all backend formats)
    const token =
      data.token ||
      data?.data?.token ||
      data?.accessToken ||
      data?.jwt ||
      null;
    
    // Extract user
    const userObj =
      data.user ||
      data?.data?.user ||
      data?.data ||
      null;
    
    if (!token) {
      console.error("❌ NO TOKEN RECEIVED FROM BACKEND");
    }
  
    const userData = {
      role: userObj?.role,
      token: token,
    };
  
    console.log("SAVING USER TO LS:", userData);
  
    localStorage.setItem("user", JSON.stringify(userData));

    // save token separately (important!)
    localStorage.setItem("TOKEN", data.token);

    setUser(userData);
  };

 
  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("TOKEN");
    setUser(null);
  };

  const isLoggedIn = !!user;

  return (
    <AuthContext.Provider value={{ user, isLoggedIn, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
