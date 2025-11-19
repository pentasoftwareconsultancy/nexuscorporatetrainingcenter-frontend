import React, { useState, useEffect } from "react";
import { ROUTES } from "../../core/constants/routes.constant";
import { useLocation, useNavigate } from "react-router-dom";
import Button from "../common/Button";

const NAV_LINKS = [
  { label: "Home", href: ROUTES.HOME },
  { label: "About us", href: ROUTES.ABOUT },
  { label: "Courses", href: ROUTES.COURSES },
  { label: "Gallery", href: ROUTES.GALLERY },
  { label: "Placements", href: ROUTES.PLACEMENTS },
  { label: "Contact us", href: ROUTES.CONTACT },
];

function Navbar() {
  const [activeTab, setActiveTab] = useState("");
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const currentPath = location.pathname;
    const activeLink = NAV_LINKS.find((link) => link.href === currentPath);
    setActiveTab(activeLink ? activeLink.label : "");
  }, [location.pathname]);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLinkClick = (label) => {
    setActiveTab(label);
    setIsMenuOpen(false);
  };

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "unset";
  }, [isMenuOpen]);

  return (
    <>
      <nav
        className={`fixed w-full top-0 left-0 z-50 flex items-center justify-between px-6 lg:px-12 h-16 lg:h-20 transition-all duration-300
          ${isScrolled}
        `}
        style={{
          borderBottomLeftRadius: "1.2rem",
          borderBottomRightRadius: "1.2rem",
        }}
      >
        {/* Left: Logo */} 
        <div className="flex items-center">
          <h1 className="text-2xl lg:text-3xl font-medium flex items-center justify-center">
            <span className="text-white font-playfair">NE</span>
            <span className="text-orange-500 text-5xl pt-1">
              <svg width="40" height="34" viewBox="0 0 40 34" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M31.5408 0.000221879L39.5234 0.00080831L34.5562 2.77579C33.3436 3.45323 32.2854 4.37587 31.4491 5.4849L12.364 30.7934C11.2302 32.2968 9.45642 33.1808 7.57341 33.1808H-0.000190735L5.03663 30.275C6.22264 29.5907 7.25551 28.6702 8.07121 27.5704L26.7213 2.42583C27.8531 0.899828 29.6409 8.23028e-05 31.5408 0.000221879Z" fill="#FF6A00"/>
                <path d="M7.98262 0.000221879L0 0.00080831L4.96721 2.77579C6.17983 3.45323 7.23802 4.37587 8.07433 5.4849L27.1595 30.7934C28.2932 32.2968 30.067 33.1808 31.95 33.1808H39.5236L34.4868 30.275C33.3008 29.5907 32.2679 28.6702 31.4522 27.5704L12.8022 2.42583C11.6703 0.899828 9.88257 8.23028e-05 7.98262 0.000221879Z" fill="#FF6A00"/>
              </svg>
            </span>
            <span className="text-white font-playfair">US</span>
          </h1>
        </div>

        {/* Center: Desktop Menu */}
        <div className="hidden lg:flex items-center justify-center flex-1">
          <div
            className="flex items-center justify-center space-x-2 px-4 py-2 bg-black/40 border border-white/20 
            rounded-2xl backdrop-blur-md transition-all duration-300"
          >
            {NAV_LINKS.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={() => handleLinkClick(item.label)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200
                  ${
                    activeTab === item.label
                      ? "bg-white text-black shadow-md"
                      : "text-white/90 hover:bg-white hover:text-black"
                  }
                `}
              >
                {item.label}
              </a>
            ))}
          </div>
        </div>

        {/* Right: Test Button */}
        <div className="hidden lg:flex items-center justify-end">
          <Button 
            text="Test"
            onClick={() => navigate(ROUTES.LOGIN)}
          />
        </div>

        {/* Mobile Section */}
        <div className="flex lg:hidden items-center space-x-4">
          <Button 
            text="Test"
            onClick={() => navigate(ROUTES.LOGIN)}
          />

          {/* Hamburger */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="p-2 rounded-lg bg-black/50 border border-white/30 text-white focus:outline-none"
          >
            {isMenuOpen ? (
              <svg
                className="w-6 h-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                className="w-6 h-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        <div
          className={`fixed inset-0 bg-black/70 backdrop-blur-xl flex flex-col items-center justify-center space-y-6 
            transition-all duration-500 lg:hidden z-40
            ${isMenuOpen ? "opacity-100 visible" : "opacity-0 invisible"}
          `}
        >
          {NAV_LINKS.map((item) => (
            <a
              key={item.label}
              href={item.href}
              onClick={() => handleLinkClick(item.label)}
              className={`w-60 text-center px-6 py-3 text-lg rounded-xl font-medium transition-all duration-300
                ${
                  activeTab === item.label
                    ? "bg-white text-black shadow-lg scale-105"
                    : "bg-white/10 text-white hover:bg-white hover:text-black"
                }`}
            >
              {item.label}
            </a>
          ))}

          {/* Close Button */}
          <button
            onClick={() => setIsMenuOpen(false)}
            className="absolute top-6 text-white"
          >
            <svg
              className="w-8 h-8"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
