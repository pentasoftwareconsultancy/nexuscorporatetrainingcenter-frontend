import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import AdminNavbar from "../public/AdminNavbar";
import AdminSidebar from "../public/AdminSidebar";

const AdminLayout = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex flex-col text-one min-h-screen">
      <AdminNavbar setIsOpen={setIsOpen} />

      <div className="flex relative">
        {/* ---------- MOBILE BACKDROP ---------- */}
        {isOpen && (
          <div
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 bg-black/50 z-40 md:hidden"
          />
        )}

        {/* ---------- SIDEBAR ---------- */}
        <AdminSidebar isOpen={isOpen} setIsOpen={setIsOpen} />

        {/* ---------- CONTENT ---------- */}
        <div
          className={`
            w-full transition-all duration-300
            px-5 pt-16 pb-5
            ${isOpen ? "md:ml-52" : "md:ml-16"}
          `}
        >
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
