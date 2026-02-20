import React, { useEffect, useState } from "react";
import { FaArrowUp } from "react-icons/fa";

const ClickTopBtn = () => {
  const [isVisible, setIsVisible] = useState(false);

  // Show the button after scrolling down 300px
  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 300);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Smooth scroll to top
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <button
      onClick={scrollToTop}
      aria-label="Scroll to top"
      className={`cursor-pointer fixed bottom-14 right-22 z-50 rounded-full bg-gradient-to-r from-twopointo to-black text-white p-6 shadow-lg transition-all duration-500 hover:scale-110 hover:shadow-2xl ${
        isVisible
          ? "opacity-100 translate-y-0"
          : "opacity-0 translate-y-10 pointer-events-none"
      }`}
    >
      {/* Bouncing arrow */}
      <FaArrowUp className="text-xl animate-bounce" />
    </button>
  );
};

export default ClickTopBtn;
