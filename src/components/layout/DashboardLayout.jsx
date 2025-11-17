import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../public/Navbar";
import Footer from "../public/Footer";

const DashboardLayout = () => {
  return (
    <div>
       <Navbar />
       <div className="">
          <Outlet />
       </div>
      <Footer />
    </div>
  );
};

export default DashboardLayout;
