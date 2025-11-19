import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../public/Navbar";
import Footer from "../public/Footer";

const PublicLayout = () => {
  return (
    <div>
      {/* You can add a navbar or footer here */}
      <Navbar />

      {/* Nested pages like HomePage, AboutPage, etc. will appear here */}
      <div className="mt-18">
        <Outlet />
      </div>

      <div
        className="z-1 w-full h-[1px] sm:h-[2px] my-8 lg:my-12"
        style={{
          background:
            "linear-gradient(90deg, #030e4e 0%, #b9b4b4 50%, #030e4e 100%)",
        }}
      />
      <Footer />
    </div>
  );
};

export default PublicLayout;
