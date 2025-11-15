import React from "react";
import { motion } from "framer-motion";
import partnerData from "../../../assets/tarushri/partnerData.json";

// Import all icons
import { FaUserFriends, FaUserTie, FaLightbulb } from "react-icons/fa";
import { ImHtmlFive } from "react-icons/im";
import { BsFileBarGraphFill } from "react-icons/bs";
import { RiFocus3Line } from "react-icons/ri";

// Map icon names to actual components
const icons = {
  FaUserFriends,
  FaUserTie,
  FaLightbulb,
  ImHtmlFive,
  BsFileBarGraphFill,
  RiFocus3Line,
};

const PartnerSection = () => {
  // Split data into left and right for desktop layout
  const leftData = partnerData.filter((item) => item.side === "left");
  const rightData = partnerData.filter((item) => item.side === "right");

  return (
    <>
      <div className="relative w-full min-h-screen pt-10">
        {/* Title */}
        <div className="flex p-10 align-text-top text-3xl text-white">
          <h1>Why Partner with Nexus?</h1>
        </div>

        <div className="absolute flex flex-col items-center justify-center text-white px-12 py-10">

          {/* ================= DESKTOP / TABLET VIEW ================= */}
          <div className="hidden md:flex flex-col lg:flex-row items-center justify-center gap-6 w-[95%]">

            {/* LEFT SIDE */}
            <div className="flex flex-col gap-9 flex-1">
              {leftData.map((item) => {
                const Icon = icons[item.icon];
                return (
                  <div
                    key={item.id}
                    className={`flex items-center justify-between rounded-full px-5 py-4 shadow-md border border-white hover:scale-105 transition-transform animate-slideInLeft ${item.translate}`}
                  >
                    <div>
                      <h3 className="font-semibold text-lg">{item.title}</h3>
                      <p className="text-sm text-gray-400">{item.description}</p>
                    </div>
                    <div className="bg-[#101010] w-20 h-13 rounded-full flex justify-center items-center">
                      <Icon className="text-2xl text-white" />
                    </div>
                  </div>
                );
              })}
            </div>

            {/* CENTER CIRCLE */}
            <div className="flex justify-center items-center relative w-[240px] h-[240px] rounded-full bg-[radial-gradient(circle,_#0041FF_0%,_#0A0A0F_100%)] animate-scaleUp  shadow-[0_0_40px_#0041FF] border border-dashed border-gray-500">
              <h2 className="text-xl font-semibold text-center">
                Why Partner <br /> with Nexus?
              </h2>
            </div>

            {/* RIGHT SIDE */}
            <div className="flex flex-col gap-9 flex-1">
              {rightData.map((item) => {
                const Icon = icons[item.icon];
                return (
                  <div
                    key={item.id}
                    className={`flex items-center gap-4 rounded-full px-5 py-4 shadow-md border border-white hover:scale-105 transition-transform animate-slideInRight ${item.translate}`}
                  >
                    <div className="bg-[#101010] w-20 h-13 rounded-full flex justify-center items-center">
                      <Icon className="text-2xl text-white" />
                    </div>
                    <div className="text-right mr-3">
                      <h3 className="font-semibold text-lg">{item.title}</h3>
                      <p className="text-sm text-gray-400">{item.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* ================= MOBILE VIEW ================= */}
          <div className="flex md:hidden flex-col items-center gap-5 mt-6 w-full">
            {/* Center Circle */}
            <div className="flex justify-center items-center w-[180px] h-[180px] rounded-full bg-[radial-gradient(circle,_#0041FF_0%,_#0A0A0F_100%)] shadow-[0_0_40px_#0041FF] border border-dashed border-gray-500 text-center mb-6 shadow-md">
              <h2 className="text-base font-semibold leading-tight">
                Why Partner <br /> with Nexus?
              </h2>
            </div>

            {/* Render all items in mobile */}
            {partnerData.map((item, i) => {
              const Icon = icons[item.icon];
              const align = i % 2 === 0 ? "self-start" : "self-end";
              return (
                <div
                  key={item.id}
                  className={`flex items-center gap-4 bg-[#1a1a20] rounded-full px-5 py-4 w-[90%] sm:w-[80%] border border-white shadow-md ${align}`}
                >
                  <div className="bg-[#101010] w-14 h-14 rounded-full flex justify-center items-center">
                    <Icon className="text-2xl text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-sm">{item.title}</h3>
                    <p className="text-xs text-gray-400">{item.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default PartnerSection;
