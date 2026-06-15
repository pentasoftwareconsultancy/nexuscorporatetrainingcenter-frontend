import React from "react";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../../core/constants/routes.constant";
import Button from "../../common/Button";
import nexusAnimationWebm from "../../../assets/home/nexus animation.webm";
import nexusAnimationMp4 from "../../../assets/home/nexus animation.mp4";

export default function HomeHero() {
  const navigate = useNavigate();

  return (
    <>
      {/* 🖥️ DESKTOP HERO LAYOUT */}
      <div className="hidden md:flex relative font-sora w-full min-h-[92vh] items-center pl-12 pr-12 lg:pl-12 lg:pr-12 py-16 md:py-24 text-white overflow-hidden bg-black">
        {/* 🌟 BACKGROUND VIDEO */}
        <div className="absolute inset-y-0 right-0 w-full md:w-[65%] flex items-center justify-center overflow-hidden z-0 select-none pointer-events-none">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-contain"
          >
            <source src={nexusAnimationWebm} type="video/webm" />
            <source src={nexusAnimationMp4} type="video/mp4" />
          </video>
        </div>

        {/* 🌟 VIGNETTE SHADOWS & SEAMLESS GRADIENTS (Soft readability overlay) */}
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/40 to-transparent z-5 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/35 z-5 pointer-events-none" />

        {/* 🌟 LEFT CONTENT PANEL */}
        <div className="relative z-10 w-full max-w-[480px] flex flex-col items-start text-left gap-4 mt-10 md:mt-0">
          <h1 className="flex flex-col tracking-tight leading-[1.08] select-none">
            <span className="text-[#FF6A00] text-2xl sm:text-3xl md:text-4xl lg:text-[46px] font-semibold">Nexus</span>
            <span className="text-white text-2xl sm:text-3xl md:text-4xl lg:text-[46px] font-light mt-0.5">Corporate training</span>
            <span className="text-white text-2xl sm:text-3xl md:text-4xl lg:text-[46px] font-light mt-0.5">Center</span>
          </h1>

          <p className="text-[#D1D5DB] text-[13px] sm:text-[14px] md:text-[14.5px] leading-relaxed font-light opacity-90">
            Traditional degrees teach theory, but top companies hire for practical skills. We design structured, hands-on IT training programs led by industry experts to help you master modern tech stacks, gain real-world project experience, and successfully secure your dream job.
          </p>

          {/* ENROLL NOW BUTTON */}
          <Button
            text="Enroll now"
            onClick={() => navigate(ROUTES.CONTACT)}
            className="mt-1 px-5 py-2 hover:-translate-y-0.5 transition-all duration-300 font-semibold shadow-lg shadow-orange-500/20"
          />
        </div>
      </div>

      {/* 📱 MOBILE HERO LAYOUT */}
      <div className="flex md:hidden flex-col w-full bg-black text-white px-3 py-10 gap-6">
        {/* 1. Title at the top */}
        <h1 className="flex flex-col tracking-tight leading-[1.1] select-none text-left">
          <span className="text-[#FF6A00] text-3xl font-semibold">Nexus</span>
          <span className="text-white text-3xl font-light mt-1">Corporate training</span>
          <span className="text-white text-3xl font-light mt-1">Center</span>
        </h1>

        {/* 2. Video in the middle */}
        <div className="relative w-full aspect-video">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-contain"
          >
            <source src={nexusAnimationWebm} type="video/webm" />
            <source src={nexusAnimationMp4} type="video/mp4" />
          </video>
        </div>

        {/* 3. Description and button below */}
        <div className="flex flex-col items-start gap-5">
          <p className="text-[#D1D5DB] text-[13.5px] sm:text-[14.5px] leading-relaxed font-light opacity-90 text-left">
            Traditional degrees teach theory, but top companies hire for practical skills. We design structured, hands-on IT training programs led by industry experts to help you master modern tech stacks, gain real-world project experience, and successfully secure your dream job.
          </p>
          <Button
            text="Enroll now"
            onClick={() => navigate(ROUTES.CONTACT)}
            className="w-full sm:w-auto px-6 py-2.5 font-semibold shadow-lg shadow-orange-500/20"
          />
        </div>
      </div>
    </>
  );
}
