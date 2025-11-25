import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import AdminNavbar from "../public/AdminNavbar";
import AdminSidebar from "../public/AdminSidebar";

const AdminLayout = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex flex-col text-one">
      <AdminNavbar />

      <div className="flex">
        <AdminSidebar isOpen={isOpen} setIsOpen={setIsOpen} />

        {/* CONTENT AREA */}
        <div
          className={`
            transition-all duration-300 w-full pl-5
            ${isOpen ? "ml-52" : "ml-16"}
          `}
        >
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
