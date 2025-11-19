import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../public/Navbar";
import Footer from "../public/Footer";

const AdminLayout = () => {
  return (
    <div>
      <Navbar />
        <Outlet />
      <Footer />
    </div>
  );
};

export default AdminLayout;
