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
      <div className="absolute z-0 
  w-[280px] h-[280px] 
  top-10 left-5 
  sm:w-[320px] sm:h-[320px] sm:top-14 sm:left-10 
  md:w-[100px] md:h-[300px] md:top-1 md:left-1
  pointer-events-none">
        <CircleBackground />
      </div>

      {/* 🌈 Full-screen dynamic X */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none mb-30">
        <h1
          className="
            fit-text
            font-extrabold
            font-montserrat
            opacity-20
            select-none
            leading-none
            text-center
            text-[#FF6A00]
            bg-clip-text
          "
        >
          X
        </h1>
      </div>

      {/* 🔸 Left Section (slightly down) */}
      <div className="relative z-10 flex flex-col justify-center md:justify-end w-full md:w-1/2 pb-6 md:pb-1 translate-y-10">
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
        
      {/* 🔸 Right Section (slightly up) */}
      <div className="relative z-10 flex flex-col justify-center md:justify-start items-center md:items-end w-full md:w-1/2 text-center md:text-right space-y-6 pt-1 md:pt-1 -translate-y-30 px-4 sm:px-8">
        <div className="max-w-lg">
          <h2
            className="
              max-w-96
              font-clash 
              text-3xl sm:text-4xl lg:text-5xl 
              font-light leading-tight 
              text-white mb-4 font-sora 
              relative mx-auto text-center 
              whitespace-normal 
              overflow-hidden 
            "
            style={{
              animation: "typing 4s steps(40, end) infinite, blink .75s step-end infinite",
            }}
          >
            <style>
              {`
                @keyframes typing {
                  0% { clip-path: inset(0 100% 0 0); }
                  50% { clip-path: inset(0 0 0 0); }
                  80% { clip-path: inset(0 0 0 0); }
                  100% { clip-path: inset(0 100% 0 0); }
                }
              
                @keyframes blink {
                  0%, 50% { border-right-color: rgba(255,255,255,0.75); }
                  51%, 100% { border-right-color: transparent; }
                }
              `}
            </style>
              
            <span className="border-r-2 border-white pr-1 inline-block">
              Your Growth Our Expertise
            </span>
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
      <div className="  absolute z-0 
  w-[280px] h-[280px] 
  bottom-10 right-5
  sm:w-[320px] sm:h-[320px] sm:bottom-14 sm:right-10
  md:w-[380px] md:h-[380px] md:bottom-20 md:right-20
  pointer-events-none
">
        <CircleBackground />
      </div>
    </div>
  );
}
