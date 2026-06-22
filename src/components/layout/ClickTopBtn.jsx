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
      className={`cursor-pointer fixed bottom-14 left-1/2 -translate-x-1/2 z-50 w-12 h-12 rounded-full bg-[#181818]/60 backdrop-blur-md text-white flex items-center justify-center border border-white/10 border-b-[4px] border-b-white/20 shadow-[0_10px_25px_rgba(0,0,0,0.5),_inset_0_1px_1px_rgba(255,255,255,0.1)] transition-all duration-300 hover:scale-105 hover:bg-[#222222]/80 hover:border-white/20 hover:border-b-[4px] hover:border-b-white/30 active:translate-y-[2px] active:border-b-[2px] active:scale-100 ${
        isVisible
          ? "opacity-100 translate-y-0"
          : "opacity-0 translate-y-10 pointer-events-none"
      }`}
    >
      {/* Bouncing arrow */}
      <FaArrowUp className="text-lg animate-bounce" />
    </button>
  );
};

export default ClickTopBtn;
