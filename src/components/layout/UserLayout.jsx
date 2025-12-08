import React from "react";
import Navbar from "../../components/public/Navbar";
import Footer from "../../components/public/Footer";
import { Outlet, useLocation } from "react-router-dom";
import { ROUTES } from "../../core/constants/routes.constant";

export default function UserLayout() {
  const location = useLocation();

  // All exam-related paths that should hide navbar & footer
  const hideLayout = location.pathname.startsWith(ROUTES.USER_EXAM);

  return (
    <div className="flex flex-col">

      {/* NAVBAR (Show only if not /exam) */}
      {!hideLayout && <Navbar />}

      <main className={`flex-1 ${!hideLayout ? "mt-18" : ""}`}>
        <Outlet />
      </main>

      {/* FOOTER (Show only if not /exam) */}
      {!hideLayout && <Footer />}
    </div>
  );
}
