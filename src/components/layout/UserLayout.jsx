import React from "react";
import Navbar from "../../components/public/Navbar";
import Footer from "../../components/public/Footer";
import { Outlet } from "react-router-dom";

export default function UserLayout() {
  return (
    <div className="flex flex-col">
      <Navbar />

      <main className="flex-1 mt-18">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
