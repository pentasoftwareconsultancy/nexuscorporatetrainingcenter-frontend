import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../public/Navbar";
import { ROUTES } from "../../core/constants/routes.constant";
import Footer from "../public/Footer";
import ButtonGroup from "./ButtonGroup";
import ClickTopBtn from "./ClickTopBtn";

const PublicLayout = () => {
  const location = useLocation();
  const isExcludedPage = location.pathname === ROUTES.CONTACT || location.pathname === ROUTES.LOGIN;

  return (
    <div className="relative min-h-screen bg-black overflow-hidden">
      {/* Global Blue Glow Effects - Hidden on Contact and Login */}
      {!isExcludedPage && (
        <>
          <div className="fixed top-[-10%] left-[-15%] w-[700px] h-[700px] bg-blue-600/20 blur-[130px] rounded-full pointer-events-none z-0"></div>
          <div className="fixed bottom-[20%] right-[-10%] w-[600px] h-[600px] bg-blue-700/15 blur-[120px] rounded-full pointer-events-none z-0"></div>
        </>
      )}

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
