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
        <div
          className={`
            fixed md:static top-0 left-0 h-full z-50
            transition-transform duration-300
            ${isOpen ? "translate-x-0" : "-translate-x-full"}
            md:translate-x-0
          `}
        >
          <AdminSidebar isOpen={isOpen} setIsOpen={setIsOpen} />
        </div>

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
