import React from "react";
import { ArrowUpRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../../core/constants/routes.constant";
import CircleBackground from "../../common/CircleBackground";
import Button from "../../common/Button";

export default function HomeHero() {
  const navigate = useNavigate();

  return (
    <div className="relative overflow-x-hidden w-full min-h-screen flex flex-col md:flex-row justify-between items-center px-4 sm:px-8 md:px-12 lg:px-12 text-white overflow-hidden">
      <div className="absolute z-0 w-1/3 h-9/12 -translate-x-70">
        <CircleBackground />
      </div>

      {/* 🌈 Full-screen dynamic X */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none mb-30">
        <h1
          className="
              fit-text 
              font-extrabold 
              text-white 
              opacity-20 
              select-none 
              leading-none
              text-center
            "
        >
          X
        </h1>
      </div>

      {/* 🔸 Left Section */}
      <div className="relative z-10 flex flex-col justify-end w-full md:w-1/2 pb-10 md:pb-16">
        <div className="p-4 sm:p-6 md:p-10 rounded-2xl space-y-6 text-center md:text-left">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-medium leading-snug">
            <span className="text-orange-400 font-sora">Nexus</span>
            <br />
            <span className="text-white font-sora">
              Corporate Training
              <br />
              Center
            </span>
          </h1>

          <Button text="Enroll Now" onClick={() => navigate(ROUTES.CONTACT)} />
        </div>
      </div>

      {/* 🔸 Right Section */}
      <div className="relative z-10 flex flex-col justify-start items-center md:items-end w-full md:w-1/2 text-center md:text-right space-y-6 pt-6 sm:pt-10 md:pt-16 px-4 sm:px-8">
        <div className="max-w-lg">
          <h2
            className="font-clash text-3xl sm:text-4xl lg:text-5xl font-light leading-tight text-white mb-4 font-sora relative mx-auto w-[24em] text-center whitespace-nowrap overflow-hidden transform -translate-y-1/2 border-r-2 border-r-white/75"
            style={{
              animation:
                "typewriter 6s steps(50) infinite, blinkingCursor 0.75s step-end infinite",
            }}
          >
            <style>
              {`
      @keyframes typewriter {
        0% { width: 0; }
        50% { width: 100%; }
        80% { width: 100%; }
        100% { width: 0; }
      }
      @keyframes blinkingCursor {
        0%, 50% { border-right-color: rgba(255,255,255,0.75); }
        51%, 100% { border-right-color: transparent; }
      }
    `}
            </style>
            Your Growth
            <br />
            Our Expertise
          </h2>

          <p className="text-gray-200 text-base sm:text-lg leading-relaxed text-justify md:text-right font-sora">
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
