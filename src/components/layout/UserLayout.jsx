import React from "react";
import Navbar from "../../components/public/Navbar";
import Footer from "../../components/public/Footer";
import ButtonGroup from "./ButtonGroup";
import ClickTopBtn from "./ClickTopBtn";
import { Outlet, useLocation } from "react-router-dom";
import { ROUTES } from "../../core/constants/routes.constant";

export default function UserLayout() {
  const location = useLocation();

  // All exam-related paths that should hide navbar & footer
  const hideLayout = location.pathname.startsWith(ROUTES.USER_EXAM);

  return (
    <div className="relative min-h-screen w-full overflow-x-hidden">
      <div className="relative z-10 flex flex-col min-h-screen">
        {/* NAVBAR (Show only if not /exam) */}
        {!hideLayout && <Navbar />}
        
        {!hideLayout && <ClickTopBtn />}
        {!hideLayout && <ButtonGroup />}

        <main className={`flex-1 ${!hideLayout ? "pt-20" : ""}`}>
          <Outlet />
        </main>

        {/* FOOTER (Show only if not /exam) */}
        {!hideLayout && <Footer />}
      </div>
    </div>
  );
}
