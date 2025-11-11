import React, { useState, useEffect } from "react";

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "About us", href: "about" },
  { label: "Courses", href: "courses" },
  { label: "Gallery", href: "gallery" },
  { label: "Placements", href: "placements" },
  { label: "Contact us", href: "contact" },
];

function Navbar() {
  const [activeTab, setActiveTab] = useState("Home");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

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
          <h1 className="text-2xl lg:text-3xl font-extrabold">
            <span className="text-white">NE</span>
            <span className="text-orange-500">X</span>
            <span className="text-white">US</span>
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
          <button
            className="flex items-center justify-between w-32 h-12 px-4 py-2
              bg-[#FFF6EF] border-2 border-orange-400 rounded-full
              shadow-[0_4px_8px_rgba(0,0,0,0.12)] transition
              hover:shadow-md hover:scale-105 active:scale-95"
          >
            <span className="text-lg font-normal text-black">Test</span>
            <span
              className="ml-2 flex items-center justify-center 
              w-8 h-8 bg-orange-500 rounded-full"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="white"
                className="w-5 h-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M8 16l8-8M8 8h8v8"
                />
              </svg>
            </span>
          </button>
        </div>

        {/* Mobile Section */}
        <div className="flex lg:hidden items-center space-x-4">
          <button
            className="flex items-center justify-between w-20 h-10 px-3 py-1
              bg-[#FFF6EF] border-2 border-orange-400 rounded-full
              shadow-[0_4px_8px_rgba(0,0,0,0.12)]"
          >
            <span className="text-sm font-normal text-black">Test</span>
            <span
              className="ml-1 flex items-center justify-center 
              w-6 h-6 bg-orange-500 rounded-full"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="white"
                className="w-4 h-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M8 16l8-8M8 8h8v8"
                />
              </svg>
            </span>
          </button>

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
