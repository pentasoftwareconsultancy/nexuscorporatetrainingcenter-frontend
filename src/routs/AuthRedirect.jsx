import React from "react";
import { Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const AuthRedirect = ({ children }) => {
  const { user } = useAuth();

  if (user) {
    // Redirect based on user role
    if (user.role === "admin") {
      return <Navigate to="/dashboard" replace />;
    } else if (user.role === "user") {
      return <Navigate to="/appitude" replace />;
    }
  }

  // If not logged in → show login/signup
  return children;
};

export default AuthRedirect;
