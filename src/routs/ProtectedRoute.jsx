import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../core/contexts/AuthContext";
import { ROUTES } from "../core/constants/routes.constant";

const ProtectedRoute = ({ allowedRoles }) => {
  const { isLoggedIn, user, isLoading } = useAuth();

  // Wait until auth finishes loading
  if (isLoading) return <div></div>;

  // Not logged in → go to login
  if (!isLoggedIn || !user) {
    return <Navigate to="/login" replace />;
  }

  // Role mismatch → redirect based on actual role
  if (allowedRoles && !allowedRoles.includes(user.role)) {
    if (user.role === "admin") return <Navigate to={ROUTES.ADMIN_DASHBOARD} replace />;
    if (user.role === "user") return <Navigate to={ROUTES.USER_APPITUDE} replace />;

    // fallback
    return <Navigate to="/" replace />;
  }

  // Authenticated and allowed → render child routes
  return <Outlet />;
};

export default ProtectedRoute;
