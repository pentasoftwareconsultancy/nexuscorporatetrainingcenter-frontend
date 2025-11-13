// import React from "react";
// import { Navigate } from "react-router-dom";
// import useAuth from "../hooks/useAuth";

// const ProtectedRoute = ({ children, allowedRoles }) => {
//   const { user } = useAuth();

//   if (!user) return <Navigate to="/login" replace />;

//   if (allowedRoles && !allowedRoles.includes(user.role)) {
//     return <Navigate to="/" replace />; // or show “Access Denied”
//   }

//   return children;
// };

// export default ProtectedRoute;


// src/routs/ProtectedRoute.jsx
import React from "react";
import { Navigate } from "react-router-dom";
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

const ProtectedRoute = ({ allowedRoles, children }) => {
  const { user } = useAuth();

  // DEV bypass: if enabled, use env-provided mock user
  if (import.meta.env.VITE_BYPASS_AUTH === "true") {
    const devUser = parseBypassUser();
    if (devUser) {
      // role check against devUser
      if (allowedRoles && !allowedRoles.includes(devUser.role)) {
        return <Navigate to="/login" replace />;
      }
      return children;
    }
    // if bypass flag is on but no dev user, allow through (optionally)
    return children;
  }

  // Normal behavior
  if (!user) return <Navigate to="/login" replace />;

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/" replace />; // or show access denied
  }

  return children;
};

export default ProtectedRoute;
