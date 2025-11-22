import { Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const parseBypassUser = () => {
  try {
    return import.meta.env.VITE_BYPASS_USER
      ? JSON.parse(import.meta.env.VITE_BYPASS_USER)
      : null;
  } catch {
    return null;
  }
};

const ProtectedRoute = ({ allowedRoles }) => {
  const { user } = useAuth();

  // Dev bypass
  if (import.meta.env.VITE_BYPASS_AUTH === "true") {
    const devUser = parseBypassUser();
    if (devUser && allowedRoles && !allowedRoles.includes(devUser.role)) {
      return <Navigate to="/login" replace />;
    }
    return <Outlet />;
  }

  // Real auth
  if (!user) return <Navigate to="/login" replace />;

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
