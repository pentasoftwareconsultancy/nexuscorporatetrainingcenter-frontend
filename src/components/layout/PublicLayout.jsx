import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../public/Navbar";
import Footer from "../public/Footer";
import ButtonGroup from "./ButtonGroup";

const PublicLayout = () => {
  return (
    <div>
      {/* You can add a navbar or footer here */}
      <Navbar />
      <ButtonGroup />
      {/* Nested pages like HomePage, AboutPage, etc. will appear here */}
      <div className="mt-18">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default PublicLayout;
