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
}
