import React from "react";
import { ArrowUpRight } from "lucide-react";
import heroimg from "../../../assets/vaishnavi/X.png"; // ✅ Background "X" image
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../../core/constants/routes.constant";
import CircleBackground from "../../common/CircleBackground";
import Button from "../../common/Button";

export default function HomeHero() {
  const navigate = useNavigate();

  return (
    <div className="relative overflow-x-hidden w-full min-h-screen flex flex-col md:flex-row justify-between items-center px-4 sm:px-8 md:px-12 lg:px-12 bg-gradient-to-t from-[#1e1515] via-[#150d0d] to-[#1e1616] text-white overflow-hidden">
        <div className="absolute z-0 w-1/3 h-9/12 -translate-x-70">
          <CircleBackground />
        </div>
      {/* 🌈 Center background image */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <img
          src={heroimg}
          alt="Background X"
          className="w-[70vw] sm:w-[50vw] md:w-[40vw] max-w-[800px] opacity-70 object-contain select-none"
        />
      </div>

      {/* 🔸 Left Section */}
      <div className="relative z-10 flex flex-col justify-end w-full md:w-1/2 pb-10 md:pb-16">
        <div className="p-4 sm:p-6 md:p-10 rounded-2xl space-y-6 text-center md:text-left">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-snug">
            <span className="text-orange-400">Nexus</span>
            <br />
            <span className="text-white font-light">
              Corporate Training
              <br />
              Center LLP
            </span>
          </h1>

          <Button 
            text="Enroll Now"
            onClick={() => navigate(ROUTES.CONTACT)}
          />
        </div>
      </div>

      {/* 🔸 Right Section */}
      <div className="relative z-10 flex flex-col justify-start items-center md:items-end w-full md:w-1/2 text-center md:text-right space-y-6 pt-6 sm:pt-10 md:pt-16 px-4 sm:px-8">
        <div className="max-w-lg">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light leading-tight text-white mb-4">
            Your Growth
            <br />
            Our Expertise
          </h2>

          <p className="text-gray-200 text-base sm:text-lg leading-relaxed text-justify md:text-right">
            We believe true business growth is built on the strength of your
            people. Our expertise lies in crafting bespoke training programs
            that don’t just teach skills — they transform teams. We partner with
            you to understand your unique challenges, delivering proven
            solutions that drive measurable results and empower your workforce
            to achieve more.
          </p>
        </div>
      </div>
    </div>
  );
}
