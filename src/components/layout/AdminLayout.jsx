import React from "react";
import { Outlet } from "react-router-dom";
import AdminNavbar from "../public/AdminNavbar";
import AdminSidbar from "../public/AdminSidebar";

const AdminLayout = () => {
  return (
    <div className="flex flex-col justify-center text-one">
        <AdminNavbar />
        <div className="flex">
          <AdminSidbar />
          <Outlet />
        </div>
    </div>
  );
};

export default AdminLayout;
