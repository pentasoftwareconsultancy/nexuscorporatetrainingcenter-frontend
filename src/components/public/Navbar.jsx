import React, { useState, useEffect } from "react";
import { ROUTES } from "../../core/constants/routes.constant";
import { useLocation, useNavigate, Link } from "react-router-dom";
import Button from "../common/Button";
import { useAuth } from "../../core/contexts/AuthContext";

function Navbar() {
  const [activeTab, setActiveTab] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [showNavbar, setShowNavbar] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const [openMobileDropdown, setOpenMobileDropdown] = useState(null);

  const location = useLocation();
  const navigate = useNavigate();
  const { isLoggedIn, user, logout } = useAuth();

  const navLinks = [
    { label: "Home", href: ROUTES.HOME },
    { label: "About us", href: ROUTES.ABOUT },
    {
      label: "Courses",
      dropdown: [
        { label: "Courses", href: ROUTES.COURSES },
        { label: "Videos", href: ROUTES.COURSE_VIDEOS }
      ],
    },
    { label: "Gallery", href: ROUTES.GALLERY },
    {
      label: "Placements",
      dropdown: [
        { label: "Placement Records", href: ROUTES.PLACEMENTS },
        { label: "Video Testimonials", href: ROUTES.VIDEO_TESTIMONIALS }
      ]
    },
    { label: "Contact us", href: ROUTES.CONTACT },
  ];

  useEffect(() => {
    const path = location.pathname;
    if (path === ROUTES.HOME) {
      setActiveTab("Home");
    } else if (path.startsWith("/about")) {
      setActiveTab("About us");
    } else if (path.startsWith("/courses")) {
      setActiveTab("Courses");
    } else if (path.startsWith("/gallery")) {
      setActiveTab("Gallery");
    } else if (path.startsWith("/placements") || path.startsWith("/videotestimonials")) {
      setActiveTab("Placements");
    } else if (path.startsWith("/contact")) {
      setActiveTab("Contact us");
    } else {
      setActiveTab("");
    }
  }, [location.pathname]);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (!event.target.closest(".relative")) {
        setOpenDropdown(null);
      }
    };
    window.addEventListener("click", handleOutsideClick);
    return () => window.removeEventListener("click", handleOutsideClick);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsScrolled(currentScrollY > 50);
      if (currentScrollY > lastScrollY && currentScrollY > 80) {
        setShowNavbar(false);
      } else {
        setShowNavbar(true);
      }
      setLastScrollY(currentScrollY);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  const handleLinkClick = (label) => {
    setActiveTab(label);
    setIsMenuOpen(false);
    setOpenDropdown(null);
  };

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "unset";
  }, [isMenuOpen]);

  return (
    <>
      <nav
        className={`fixed w-full top-0 left-0 z-50
        bg-[#181818]/60 backdrop-blur-md
        border border-white/10 border-b-[4px] border-b-white/20
        shadow-[0_10px_25px_rgba(0,0,0,0.5),_inset_0_1px_1px_rgba(255,255,255,0.1)]
        flex items-center justify-between px-6 lg:px-12 h-16 lg:h-20
        transition-all duration-1000 ease-in-out
        ${showNavbar ? "translate-y-0 opacity-100" : "lg:-translate-y-full lg:opacity-0"}
        `}
      >
        {/* Logo */}
        <div onClick={() => navigate(ROUTES.HOME)} className="cursor-pointer flex flex-col items-center">
          <h1 className="text-2xl lg:text-3xl font-medium flex items-center justify-center">
            <span className="text-white font-playfair">NE</span>
            <span className="text-orange-500 text-5xl pt-1">
              <svg width="40" height="34" viewBox="0 0 40 34" fill="none">
                <path d="M31.5408 0.000221879L39.5234 0.00080831L34.5562 2.77579C33.3436 3.45323 32.2854 4.37587 31.4491 5.4849L12.364 30.7934C11.2302 32.2968 9.45642 33.1808 7.57341 33.1808H-0.000190735L5.03663 30.275C6.22264 29.5907 7.25551 28.6702 8.07121 27.5704L26.7213 2.42583C27.8531 0.899828 29.6409 8.23028e-05 31.5408 0.000221879Z" fill="#FF6A00" />
                <path d="M7.98262 0.000221879L0 0.00080831L4.96721 2.77579C6.17983 3.45323 7.23802 4.37587 8.07433 5.4849L27.1595 30.7934C28.2932 32.2968 30.067 33.1808 31.95 33.1808H39.5236L34.4868 30.275C33.3008 29.5907 32.2679 28.6702 31.4522 27.5704L12.8022 2.42583C11.6703 0.899828 9.88257 8.23028e-05 7.98262 0.000221879Z" fill="#FF6A00" />
              </svg>
            </span>
            <span className="text-white font-playfair">US</span>
          </h1>
          <span className="text-[6.5px] text-white">CORPORATE TRAINING CENTER LLP</span>
        </div>

        {/* Desktop Menu */}
        <div className="hidden lg:flex items-center justify-center flex-1">
          <div className="flex items-center justify-center space-x-2 px-4 py-2 bg-black/40 rounded-2xl backdrop-blur-md transition-all duration-300">
            {navLinks.map((item) =>
              item.dropdown ? (
                <div
                  key={item.label}
                  className="relative"
                  onMouseEnter={() => setOpenDropdown(item.label)}
                  onMouseLeave={() => setOpenDropdown(null)}
                >
                  <button
                    onClick={() => setOpenDropdown(item.label)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 cursor-pointer
                    ${activeTab === item.label ? "bg-white text-black shadow-md" : "text-white/90 hover:bg-white hover:text-black"}`}
                  >
                    {item.label}
                  </button>
                  {openDropdown === item.label && (
                    <div className="absolute top-full left-0 pt-2 w-60 z-[100]">
                      <div className="bg-[#181818]/90 text-white/90 border border-white/10 border-b-[4px] border-b-white/20 shadow-[0_10px_25px_rgba(0,0,0,0.5),_inset_0_1px_1px_rgba(255,255,255,0.1)] rounded-xl overflow-hidden backdrop-blur-md">
                        {item.dropdown.map((drop) => (
                          <Link
                            key={drop.label}
                            to={drop.href}
                            onClick={() => handleLinkClick(drop.label)}
                            className="block px-4 py-2.5 hover:bg-gradient-to-r hover:from-orange-500 hover:to-amber-600 hover:text-white text-sm transition-all duration-200"
                          >
                            {drop.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  key={item.label}
                  to={item.href}
                  onClick={() => handleLinkClick(item.label)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200
                  ${activeTab === item.label ? "bg-white text-black shadow-md" : "text-white/90 hover:bg-white hover:text-black"}`}
                >
                  {item.label}
                </Link>
              )
            )}
          </div>
        </div>

        {/* Desktop Right Button */}
        <div className="hidden lg:flex items-center justify-end gap-3">
          {isLoggedIn ? (
            <>
              <Button
                text={user?.role === "admin" ? "Dashboard" : "My Exams"}
                className="px-5 py-2 text-sm gap-2"
                onClick={() =>
                  navigate(
                    user?.role === "admin"
                      ? ROUTES.ADMIN_DASHBOARD
                      : ROUTES.USER_APPITUDE
                  )
                }
              />
              {user?.role !== "admin" && (
                <button
                  onClick={() => {
                    logout();
                    window.location.href = ROUTES.HOME;
                  }}
                  className="px-5 py-2 text-sm font-medium border border-orange-500 text-orange-500 rounded-full hover:bg-orange-500 hover:text-white transition-all duration-300 cursor-pointer"
                >
                  Logout
                </button>
              )}
            </>
          ) : (
            <Button
              text="Test"
              className="px-5 py-2 text-sm gap-2"
              onClick={() => navigate(ROUTES.LOGIN)}
            />
          )}
        </div>

        {/* Mobile: Button + Hamburger */}
        <div className="flex lg:hidden items-center space-x-4">
          {isLoggedIn ? (
            <Button
              text={user?.role === "admin" ? "Dashboard" : "Exams"}
              className="px-4 py-1.5 text-xs gap-1.5"
              onClick={() =>
                navigate(
                  user?.role === "admin"
                    ? ROUTES.ADMIN_DASHBOARD
                    : ROUTES.USER_APPITUDE
                )
              }
            />
          ) : (
            <Button
              text="Test"
              className="px-4 py-1.5 text-xs gap-1.5"
              onClick={() => navigate(ROUTES.LOGIN)}
            />
          )}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="p-2 rounded-lg bg-twopointo text-white focus:outline-none"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </nav>

      {/* Mobile Menu — outside <nav> so fixed inset-0 covers full screen */}
      <div
        className={`fixed inset-0 bg-black/95 backdrop-blur-xl flex flex-col items-center justify-start py-20 space-y-4
        transition-all duration-500 lg:hidden z-[999] overflow-y-auto
        ${isMenuOpen ? "opacity-100 visible" : "opacity-0 invisible"}`}
      >
        {navLinks.map((item) =>
          item.dropdown ? (
            <div key={item.label} className="w-60 flex flex-col items-center">
              <button
                onClick={() => setOpenMobileDropdown(openMobileDropdown === item.label ? null : item.label)}
                className="w-full text-center text-white text-lg font-medium py-3 flex items-center justify-center gap-2 cursor-pointer"
              >
                {item.label}
                <svg
                  className={`w-4 h-4 transition-transform duration-300 ${openMobileDropdown === item.label ? "rotate-180" : ""}`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <div
                className={`w-full overflow-hidden transition-all duration-300 ${openMobileDropdown === item.label ? "max-h-[500px] opacity-100 mt-1" : "max-h-0 opacity-0"
                  }`}
              >
                {item.dropdown.map((drop) => (
                  <Link
                    key={drop.label}
                    to={drop.href}
                    onClick={() => handleLinkClick(drop.label)}
                    className="block w-full px-6 py-2.5 text-center text-sm rounded-xl bg-white/5 text-white/80 hover:bg-white hover:text-black transition-all duration-300 mb-1.5"
                  >
                    {drop.label}
                  </Link>
                ))}
              </div>
            </div>
          ) : (
            <Link
              key={item.label}
              to={item.href}
              onClick={() => handleLinkClick(item.label)}
              className={`w-60 text-center px-6 py-3 text-lg rounded-xl font-medium transition-all duration-300
              ${activeTab === item.label ? "bg-white text-black shadow-lg scale-105" : "bg-white/10 text-white hover:bg-white hover:text-black"}`}
            >
              {item.label}
            </Link>
          )
        )}

        {isLoggedIn && user?.role !== "admin" && (
          <button
            onClick={() => {
              setIsMenuOpen(false);
              logout();
              window.location.href = ROUTES.HOME;
            }}
            className="w-60 text-center px-6 py-3 text-lg rounded-xl font-medium bg-red-600/20 text-red-500 border border-red-500/30 hover:bg-red-600 hover:text-white transition-all duration-300 cursor-pointer"
          >
            Logout
          </button>
        )}

        {/* Close Button */}
        <button
          onClick={() => setIsMenuOpen(false)}
          className="fixed top-6 right-6 text-white z-[1000] cursor-pointer"
        >
          <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </>
  );
}

export default Navbar;