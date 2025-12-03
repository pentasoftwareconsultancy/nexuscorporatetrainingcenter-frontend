import React from "react";
import { ROUTES } from "../core/constants/routes.constant";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../core/contexts/AuthContext";

const ProtectedRoute = ({ allowedRoles }) => {
  const { isLoggedIn, user } = useAuth();

  // ⛔ Not logged in → send to login
  if (!isLoggedIn || !user) {
    return <Navigate to={ROUTES.LOGIN} replace />;
  }

  // Extract stored roles (your format)
  const userRoles = [user?.role];  // because your API gives { role: "user" }

  // ⛔ Logged in but role does not match
  if (allowedRoles && !allowedRoles.some(role => userRoles.includes(role))) {
    // USER tries to enter admin page
    if (userRoles.includes("user")) return <Navigate to={ROUTES.USER_APPITUDE} replace />;

    // ADMIN tries to enter user page
    if (userRoles.includes("admin")) return <Navigate to={ROUTES.ADMIN_DASHBOARD} replace />;

    return <Navigate to={ROUTES.LOGIN} replace />;
  }

  // ✅ Everything OK → allow access
  return <Outlet />;
};

export default ProtectedRoute;
