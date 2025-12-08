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
<<<<<<< HEAD
      id: userObj?.id,
      role: userObj?.role,
      token: token,
    };
  
    console.log("SAVING USER TO LS:", userData);
  
=======
      id: data.user.id,
      role: data.user.role
    };

    // save user
>>>>>>> 33f5ff6a0411adf3f6b8dc08bd0f15639330bfad
    localStorage.setItem("user", JSON.stringify(userData));

    // save token separately (important!)
    localStorage.setItem("TOKEN", data.token);

    setUser(userData);
  };

  // Logout
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
