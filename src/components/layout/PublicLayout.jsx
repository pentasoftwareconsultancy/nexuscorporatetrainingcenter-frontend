import { useRef, useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../public/Navbar";
import Footer from "../public/Footer";
import ButtonGroup from "./ButtonGroup";
import ClickTopBtn from "./ClickTopBtn";

const PublicLayout = () => {
  const location = useLocation();
  const ref = useRef(null);

  useEffect(() => {
    if (ref.current) ref.current.scrollTop = 0;
  }, [location.pathname]);

  return (
    <div ref={ref} className="relative min-h-screen overflow-y-auto overflow-x-hidden h-screen">
      <div className="relative z-10">
        <Navbar />
        <ClickTopBtn />
        <ButtonGroup />
        <div className="pt-20">
          <Outlet />
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default PublicLayout;
