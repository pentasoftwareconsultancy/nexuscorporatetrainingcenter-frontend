import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../../core/constants/routes.constant";
import Button from "../../common/Button";

// Import the 4 custom gradient X background images
import x1 from "../../../assets/home/x1.png";
import x2 from "../../../assets/home/x2.png";
import x3 from "../../../assets/home/x3.png";
import x4 from "../../../assets/home/x4.png";

const backgroundImages = [x1, x2, x3, x4];

export default function HomeHero() {
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);

  // Cycle background images every 4.5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % backgroundImages.length);
    }, 4500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative font-sora w-full min-h-[92vh] flex flex-col md:grid md:grid-cols-2 pl-6 pr-6 sm:pl-8 sm:pr-8 md:pl-12 md:pr-12 lg:pl-12 lg:pr-12 py-16 md:py-24 text-white overflow-hidden bg-black gap-12 md:gap-0">
      
      {/* 🌟 ROTATING BLUE COLOR SPOTLIGHT (Smart Animate ease-out circular motion 2500ms) */}
      <div 
        className="absolute inset-0 flex items-center justify-center pointer-events-none z-0 select-none transition-transform duration-[2500ms] ease-out"
        style={{ transform: `rotate(${currentIndex * 90}deg)` }}
      >
        {/* Glowing blue color orb offset from center to create a circular orbit sweep around the screen */}
        <div className="absolute w-[550px] h-[550px] rounded-full bg-blue-600/15 blur-[120px] -translate-x-[25%] -translate-y-[25%]" />
      </div>

      {/* 🌟 STATIC PURPLE GLOW (Remains anchored on the bottom right for contrast) */}
      <div className="absolute bottom-[5%] right-[-10%] w-[500px] h-[500px] bg-purple-950/15 rounded-full blur-[130px] pointer-events-none z-0" />

      {/* 🌟 CENTRAL GIANT GRADIENT "X" (Statically cross-fading over 2500ms) */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0 select-none">
        {backgroundImages.map((img, index) => (
          <img
            key={index}
            src={img}
            alt="Glowing X Background"
            className={`absolute w-auto h-[55vh] md:h-[75vh] object-contain transition-opacity duration-[2500ms] ease-out transform md:scale-100 scale-75 ${
              index === currentIndex ? "opacity-75" : "opacity-0 pointer-events-none"
            }`}
          />
        ))}
      </div>

      {/* 🌟 LEFT CONTENT PANEL (Pushed to Bottom-Left on Desktop with decreased left margin) */}
      <div className="relative z-10 w-full flex flex-col items-start text-left order-2 md:order-none md:self-end md:pb-6">
        <h1 className="flex flex-col tracking-tight leading-[1.1] select-none">
          <span className="text-[#FF6A00] text-3xl sm:text-4xl md:text-5xl lg:text-[48px] font-semibold">Nexus</span>
          <span className="text-white text-3xl sm:text-4xl md:text-5xl lg:text-[48px] font-light mt-1">Corporate training</span>
          <span className="text-white text-3xl sm:text-4xl md:text-5xl lg:text-[48px] font-light lowercase mt-1">center</span>
        </h1>
        
        {/* ENROLL NOW BUTTON */}
        <Button
          text="Enroll now"
          onClick={() => navigate(ROUTES.CONTACT)}
          className="mt-8 px-5 py-1.5 hover:-translate-y-0.5 transition-all duration-300 font-semibold"
        />
      </div>

      {/* 🌟 RIGHT CONTENT PANEL (Pushed to Top-Right on Desktop) */}
      <div className="relative z-10 w-full flex flex-col items-end text-right order-1 md:order-none md:self-start md:pt-4">
        <div className="max-w-xl flex flex-col items-end">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-[48px] font-light leading-[1.1] text-white tracking-tight flex flex-col items-end">
            <span>Your Growth</span>
            <span>Our Expertise</span>
          </h2>
          
          <p className="mt-6 text-[#D1D5DB] text-[12px] sm:text-[13px] md:text-[14.5px] leading-[1.65] text-right font-light max-w-[465px]">
            We believe true business growth is built on the strength of your
            people. Our expertise is in crafting bespoke training programs
            that don't just teach skills—they transform teams. We partner with you to
            understand your unique challenges, delivering proven solutions that
            drive real, measurable results and empower your workforce to
            achieve more.
          </p>
        </div>
      </div>

    </div>
  );
}
