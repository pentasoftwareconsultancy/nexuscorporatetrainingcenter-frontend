import React from "react";
import { ArrowUpRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../../core/constants/routes.constant";
import CircleBackground from "../../common/CircleBackground";
import Button from "../../common/Button";

export default function HomeHero() {
  const navigate = useNavigate();

  return (
    <div className="relative font-sora overflow-x-hidden w-full min-h-screen flex flex-col md:flex-row justify-between items-center px-4 sm:px-8 md:px-12 lg:px-12 text-one overflow-hidden">
      <div
        className="absolute z-0
    w-[800px] h-[800px]  /* size of the circle */
    -bottom-[290px] -right-[290px]  /* move half of the circle outside */
    sm:w-[720px] sm:h-[720px] sm:-bottom-[160px] sm:-right-[160px]
    md:w-[880px] md:h-[880px] md:-bottom-[150px] md:-left-[450px]
    pointer-events-none
    overflow-hidden"
      >
        <CircleBackground />
      </div>

      {/* 🌈 Full-screen dynamic X */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none mb-3 ">
        {/* BLUR – EXACT X CORNER ANIMATION */}
        <div
          className="
      absolute left-1/2 top-1/2
      w-[220px] h-[220px]
      -translate-x-1/2 -translate-y-1/2
      rounded-full
      blur-[70px]
      opacity-90
      bg-[radial-gradient(circle,
        rgba(18,84,250,0.9),
        rgba(18,84,250,0)
      )]
      animate-[blueXCorner_2.2s_steps(1)_infinite]
      pointer-events-none
      z-30
    "
        ></div>

        {/* MAIN X */}
        <div
          className="relative overflow-hidden opacity-[0.9] z-1"
          style={{
            width: "650px",
            height: "500px",
            filter: "blur(40px)",
            clipPath:
              "polygon(25% 0%, 0% 0%, 35% 50%, 0% 100%, 25% 100%, 50% 65%, 75% 100%, 100% 100%, 65% 50%, 100% 0%, 75% 0%, 50% 35%)",
          }}
        >
          {/* ROTATING GRADIENT (ONLY THIS MOVES) */}
          <div
            className="absolute -top-[50%] -left-[50%] w-[200%] h-[200%] animate-[rotateGradient_6s_linear_infinite]"
            style={{
              background:
                "conic-gradient(#FD0002 16%, #FF6A00 35%, #DF4812 50%, #BE2424 65%, #1254FA 100%)",
              filter: "blur(20px)",
            }}
          ></div>
        </div>
      </div>

      {/* 🔸 Left Section (slightly down) */}
      <div className="relative z-10 flex flex-col justify-center md:justify-end w-full md:w-1/2 pb-6 md:pb-1 translate-y-10">
        <div className="p-4 sm:p-6 md:p-10 rounded-2xl space-y-6 text-center md:text-left">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-medium leading-snug">
            <span className="text-five">Nexus</span>
            <br />
            <span className="text-white">
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
              text-white mb-4
              relative mx-auto text-center 
              whitespace-normal 
              overflow-hidden 
            "
            style={{
              animation:
                "typing 4s steps(40, end) infinite, blink .75s step-end infinite",
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

            <span className="border-r-2 border-one pr-1 inline-block">
              Your Growth Our Expertise
            </span>
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
      <div
        className="absolute z-0
    w-[780px] h-[780px]  /* size of the circle */
    -bottom-[290px] -right-[290px]  /* move half of the circle outside */
    sm:w-[720px] sm:h-[720px] sm:-bottom-[160px] sm:-right-[160px]
    md:w-[880px] md:h-[880px] md:-bottom-[90px] md:-right-[480px]
    pointer-events-none
    overflow-hidden
  "
      >
        <CircleBackground />
      </div>
    </div>
  );
}
