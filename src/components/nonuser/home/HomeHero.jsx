import React from "react";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../../core/constants/routes.constant";
import Button from "../../common/Button";
import nexusAnimation from "../../../assets/home/nexus animation.mp4";

export default function HomeHero() {
  const navigate = useNavigate();

  return (
    <div className="relative font-sora w-full min-h-[92vh] flex items-center pl-6 pr-6 sm:pl-8 sm:pr-8 md:pl-16 md:pr-16 lg:pl-24 lg:pr-24 py-16 md:py-24 text-white overflow-hidden bg-black">

      {/* 🌟 BACKGROUND VIDEO */}
      <div className="absolute inset-y-0 right-0 w-full md:w-[65%] flex items-center justify-center overflow-hidden z-0 select-none pointer-events-none">
        <video
          src={nexusAnimation}
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-contain"
        />
      </div>

      {/* 🌟 VIGNETTE SHADOWS & SEAMLESS GRADIENTS (Soft readability overlay) */}
      {/* Limit horizontal gradient to the left 60% on desktop to keep the video completely crisp, and hide the vertical vignette on desktop. */}
      <div className="absolute inset-0 md:right-auto md:w-[60%] bg-gradient-to-r from-black/90 via-black/60 to-black/20 md:from-black md:via-black/70 md:to-transparent z-5 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/35 md:hidden z-5 pointer-events-none" />

      {/* 🌟 LEFT CONTENT PANEL */}
      <div className="relative z-10 w-full max-w-[480px] flex flex-col items-start text-left gap-4 mt-10 md:mt-0">
        <h1 className="flex flex-col tracking-tight leading-[1.08] select-none">
          <span className="text-[#FF6A00] text-2xl sm:text-3xl md:text-4xl lg:text-[46px] font-semibold">Nexus</span>
          <span className="text-white text-2xl sm:text-3xl md:text-4xl lg:text-[46px] font-light mt-0.5">Corporate training</span>
          <span className="text-white text-2xl sm:text-3xl md:text-4xl lg:text-[46px] font-light mt-0.5">Center</span>
        </h1>

        <p className="text-[#D1D5DB] text-[13px] sm:text-[14px] md:text-[14.5px] leading-relaxed font-light opacity-90">
          We believe true business growth is built on the strength of your
          people. Our expertise is in crafting bespoke training programs
          that don't just teach skills—they transform teams. We partner with you to
          understand your unique challenges, delivering proven solutions that
          drive real, measurable results and empower your workforce to
          achieve more.
        </p>

        {/* ENROLL NOW BUTTON */}
        <Button
          text="Enroll now"
          onClick={() => navigate(ROUTES.CONTACT)}
          className="mt-1 px-5 py-2 hover:-translate-y-0.5 transition-all duration-300 font-semibold shadow-lg shadow-orange-500/20"
        />
      </div>

    </div>
  );
}


