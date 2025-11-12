import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../public/Navbar";
import SuccessReviews from "../public/SuccessReviews";
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

      <SuccessReviews />
      <Footer />
    </div>
  );
};

export default PublicLayout;
