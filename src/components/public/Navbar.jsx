import React, { useState, useEffect } from "react";

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "About us", href: "#about" },
  { label: "Courses", href: "#courses" },
  { label: "Gallery", href: "#gallery" },
  { label: "Placements", href: "#placements" },
  { label: "Contact us", href: "#contact" },
];

function Navbar() {
  const [activeTab, setActiveTab] = useState("Home");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu when clicking on a link
  const handleLinkClick = (label) => {
    setActiveTab(label);
    setIsMenuOpen(false);
  };

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMenuOpen]);

  return (
    <>
      <nav
        className={`fixed w-full top-0 left-0 z-50 flex items-center justify-between px-4 sm:px-6 lg:px-8 h-16 lg:h-20 transition-all duration-300
          ${isScrolled
            ? '  bg-transparent'
            : 'bg-transparent'
          }`
        }
        style={{
          borderBottomLeftRadius: "1.2rem",
          borderBottomRightRadius: "1.2rem"
        }}
      >
        {/* Logo */}
        <div className="flex items-center z-60">
          <span className="text-2xl lg:text-3xl font-extrabold">
            <span className="text-white">NE</span>
            <span className="text-orange-500">X</span>
            <span className="text-white">US</span>
          </span>
        </div>

        {/* Desktop Menu - Hidden on mobile */}
        <div className="hidden lg:flex items-center space-x-4">
          {/* Navigation Links */}
          <div
            className="flex items-center justify-center space-x-1 px-2 py-1 bg-black/50 border border-white
              rounded-xl backdrop-blur-md transition-all duration-300"
            style={{
              minWidth: "600px",
              justifyContent: "center"
            }}
          >
            {NAV_LINKS.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className={`items-center justify-center  px-4 py-1 rounded-lg text-sm font-normal transition-all duration-200
                  ${activeTab === item.label
                    ? "bg-white text-black shadow"
                    : "text-white/90 hover:bg-orange-500 hover:text-white"
                  }
                `}
                onClick={() => setActiveTab(item.label)}
                style={{ cursor: "pointer" }}
              >
                {item.label}
              </a>
            ))}
          </div>

          {/* Test Button */}
          <div className="ml-4">
            <button
              className="flex items-center justify-between w-32 h-12 px-4 py-2
                bg-[#FFF6EF] border-2 border-orange-400 rounded-full
                shadow-[0_4px_8px_rgba(0,0,0,0.12)] transition
                hover:shadow-md hover:scale-105 active:scale-95"
            >
              <span className="text-lg font-normal text-black ml-1">
                Test
              </span>
              <span className="ml-2 flex items-center justify-center 
                w-8 h-8 bg-orange-500 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg"
                  fill="none" viewBox="0 0 24 24" strokeWidth="2"
                  stroke="white" className="w-5 h-5"
                >
                  <path
                    strokeLinecap="round" strokeLinejoin="round"
                    d="M8 16l8-8M8 8h8v8"
                  />
                </svg>
              </span>
            </button>
          </div>
        </div>

        {/* Mobile Menu Button */}
        <div className="flex lg:hidden items-center space-x-4">
          {/* Test Button - Smaller on mobile */}
          <button
            className="flex items-center justify-between w-20 h-10 px-3 py-1
              bg-[#FFF6EF] border-2 border-orange-400 rounded-full
              shadow-[0_4px_8px_rgba(0,0,0,0.12)] transition
              hover:shadow-md"
          >
            <span className="text-sm font-normal text-black">
              Test
            </span>
            <span className="ml-1 flex items-center justify-center 
              w-6 h-6 bg-orange-500 rounded-full">
              <svg xmlns="http://www.w3.org/2000/svg"
                fill="none" viewBox="0 0 24 24" strokeWidth="2"
                stroke="white" className="w-4 h-4"
              >
                <path
                  strokeLinecap="round" strokeLinejoin="round"
                  d="M8 16l8-8M8 8h8v8"
                />
              </svg>
            </span>
          </button>

          {/* Hamburger Menu */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="p-2 rounded-lg bg-black/50 border border-white/30 text-white focus:outline-none"
          >
            {isMenuOpen ? (
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>

        {/* Mobile Menu Overlay */}
        <div
          className={`fixed inset-0  backdrop-blur-lg lg:hidden transition-all duration-300 z-40 pt-16
            ${isMenuOpen ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-full'}`}
        >
          <div className="flex flex-col items-center justify-start h-full pt-8 px-6">
            {/* Mobile Navigation Links */}
            <div className="w-full max-w-sm space-y-4">
              {NAV_LINKS.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className={`
                    block w-full px-6 py-4 text-lg font-medium rounded-xl text-center transition-all duration-200
                    ${activeTab === item.label
                      ? "bg-orange-500 text-white shadow-lg transform scale-105"
                      : "text-white/90 bg-white/10 hover:bg-white/20 hover:text-white"
                    }
                  `}
                  onClick={() => handleLinkClick(item.label)}
                >
                  {item.label}
                </a>
              ))}
            </div>

            {/* Additional mobile content */}
            <div className="mt-12 text-center">
              <p className="text-white/70 text-sm">
                Nexus Corporate Training Center
              </p>
            </div>
          </div>

          {/* Close button for mobile */}
          <button
            onClick={() => setIsMenuOpen(false)}
            className="absolute top-4 right-4 p-2 text-white lg:hidden"
          >
            <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </nav>

      {/* Backdrop for mobile menu */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={() => setIsMenuOpen(false)}
        />
      )}
    </>
  );
}

export default Navbar;