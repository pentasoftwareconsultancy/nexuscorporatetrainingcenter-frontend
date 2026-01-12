import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

import VisionImg from "../../../assets/about/OurVision.png";
import MissionImg from "../../../assets/about/OurMission.png";
import ValuesImg from "../../../assets/about/OurValues.png";

const VMVSection = () => {
  useEffect(() => {
    AOS.init({
      duration: 1200,
      offset: 80,
      once: true,
      easing: "ease-in-out",
    });
  }, []);

  return (
    <div
      className="
        min-h-screen flex flex-col justify-between 
        px-5 sm:px-8 md:px-12 lg:px-12 py-10
        text-white font-sans space-y-16 sm:space-y-20 md:space-y-28
        overflow-hidden
      "
    >
      {/* === INLINE GLOW CSS === */}
      <style>
        {`
          .glow-border {
            position: relative;
            border: 2px solid rgba(0, 132, 255, 0.45);
            border-radius: 14px;
            padding: 2px;
            animation: neonGlow 2.8s ease-in-out infinite alternate;
            box-shadow: 0 0 10px rgba(0, 132, 255, 0.6);
          }

          @keyframes neonGlow {
            0% {
              box-shadow: 0 0 12px rgba(0, 132, 255, 0.5),
                          0 0 18px rgba(0, 132, 255, 0.4);
              border-color: rgba(0, 132, 255, 0.6);
            }
            100% {
              box-shadow: 0 0 26px rgba(0, 162, 255, 1),
                          0 0 45px rgba(0, 162, 255, 0.9);
              border-color: rgba(0, 162, 255, 1);
            }
          }
        `}
      </style>

      {/* ================================
          OUR VISION
      ================================= */}
      <div
        data-aos="fade-right"
        className="
          relative flex md:flex-row-reverse items-center gap-10 md:gap-16
          max-md:flex-col max-md:text-center
        "
      >
        <div className="absolute -top-10 right-0 w-[180px] h-[180px] bg-blue-700/40 blur-[100px] rounded-full max-md:hidden"></div>

        <img
          src={VisionImg}
          alt="Our Vision"
          className="
            w-full md:w-[35%] max-w-[280px] sm:max-w-[320px]
            rounded-xl glow-border mx-auto
          "
        />

        <div className="relative w-full md:w-[60%] z-10">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 md:mb-4">
            Our Vision
          </h2>

          <p className="text-gray-200 leading-relaxed text-sm sm:text-base md:text-[17px]">
            At Nexus Corporate Training Center LLP, our vision is to deliver
            accessible, high-quality IT education with placement support...
            <br />
            <br />
            <span className="font-semibold text-white">
              Our Vision Highlights:
            </span>
          </p>

          <ul
            className="list-disc ml-5 mt-3 space-y-1 text-gray-300 text-sm sm:text-base
            max-md:text-left max-md:mx-auto max-md:w-fit"
          >
            <li>Enable every learner to become job-ready</li>
            <li>Expand career-oriented training across India</li>
            <li>Create globally recognized professionals</li>
            <li>Reinvent education with modern tools</li>
          </ul>
        </div>
      </div>

      {/* ================================
          OUR MISSION
      ================================= */}
      <div
        data-aos="fade-left"
        className="
          relative flex md:flex-row items-center gap-10 md:gap-16
          max-md:flex-col max-md:text-center
        "
      >
        <div className="absolute -top-5 left-0 w-[180px] h-[180px] bg-blue-700/40 blur-[100px] rounded-full max-md:hidden"></div>

        <img
          src={MissionImg}
          alt="Our Mission"
          className="
            w-full md:w-[35%] max-w-[280px] sm:max-w-[320px]
            rounded-xl glow-border mx-auto
          "
        />

        <div className="relative w-full md:w-[60%] z-10">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 md:mb-4">
            Our Mission
          </h2>

          <p className="text-gray-200 leading-relaxed text-sm sm:text-base md:text-[17px]">
            Our mission at Nexus Corporate Training Center LLP is to empower
            learners with job-focused software skills...
            <br />
            <br />
            <span className="font-semibold text-white">
              Mission Objectives:
            </span>
          </p>

          <ul
            className="
            list-disc mt-3 ml-5 space-y-1 text-gray-300 text-sm sm:text-base
            max-md:text-left max-md:mx-auto max-md:w-fit
          "
          >
            <li>Provide industry-driven IT courses</li>
            <li>Offer 1:1 mentorship & grooming</li>
            <li>Ensure 100% placement assistance</li>
            <li>Update programs based on feedback</li>
          </ul>
        </div>
      </div>

      {/* ================================
          OUR VALUES
      ================================= */}
      <div
        data-aos="fade-up"
        className="
          relative flex md:flex-row-reverse items-center gap-10 md:gap-16 
          max-md:flex-col max-md:text-center
        "
      >
        <div className="absolute bottom-0 right-0 w-[180px] h-[180px] bg-blue-700/40 blur-[100px] rounded-full max-md:hidden"></div>

        <img
          src={ValuesImg}
          alt="Our Values"
          className="
            w-full md:w-[35%] max-w-[280px] sm:max-w-[320px]
            rounded-xl glow-border mx-auto
          "
        />

        <div className="relative w-full md:w-[60%] z-10">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 md:mb-4">
            Our Values
          </h2>

          <p className="text-gray-200 leading-relaxed text-sm sm:text-base md:text-[17px]">
            At Nexus Corporate Training Center LLP, our values guide everything
            we do...
            <br />
            <br />
            <span className="font-semibold text-white">
              Core Values We Stand By:
            </span>
          </p>

          <ul
            className="list-disc mt-3 ml-5 space-y-1 text-gray-300 text-sm sm:text-base
            max-md:text-left max-md:mx-auto max-md:w-fit"
          >
            <li>Integrity & transparency</li>
            <li>Commitment to outcomes</li>
            <li>Innovation-driven approach</li>
            <li>Inclusive learning culture</li>
            <li>Focus on real-world skills</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default VMVSection;
