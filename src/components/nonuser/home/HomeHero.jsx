import React from "react";
import { ArrowUpRight } from "lucide-react";
import heroimg from "../../../assets/vaishnavi/X.png"; // ✅ Background "X" image

export default function HomeHero() {
  const handleEnrollClick = () => {
    window.location.href = "/enroll";
  };

  return (
    <div className="relative w-full min-h-screen flex flex-col md:flex-row justify-between items-center px-4 sm:px-8 md:px-12 lg:px-20 bg-gradient-to-t from-[#1e1515] via-[#150d0d] to-[#1e1616] text-white overflow-hidden">
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

          <button
            onClick={handleEnrollClick}
            className="group mx-auto md:mx-0 px-6 sm:px-8 py-3 bg-white text-orange-600 font-semibold rounded-full flex items-center justify-center gap-3 border border-slate-300 shadow-[0_4px_8px_rgba(0,0,0,0.2),0_-2px_4px_rgba(255,255,255,0.4)] hover:shadow-[inset_0_4px_8px_rgba(0,0,0,0.3),inset_0_-2px_6px_rgba(255,255,255,0.4)] active:shadow-[inset_0_6px_10px_rgba(0,0,0,0.35),inset_0_-4px_8px_rgba(255,255,255,0.3)] transition-all duration-300 ease-in-out hover:translate-y-[1px] active:translate-y-[2px] hover:bg-gray-50 active:bg-gray-100"
          >
            Enroll Now
            <span className="flex items-center justify-center w-7 h-7 rounded-full bg-orange-600 text-white transition-all duration-300 group-hover:bg-orange-700">
              <ArrowUpRight
                size={16}
                className="transition-transform duration-300 group-hover:translate-x-[1px] group-hover:-translate-y-[1px]"
              />
            </span>
          </button>
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
