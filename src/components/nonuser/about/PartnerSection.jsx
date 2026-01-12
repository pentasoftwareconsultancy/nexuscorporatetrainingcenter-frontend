import React from "react";
import partnerData from "../../../assets/about/partnerData.json";
import { motion } from "framer-motion";

// Import all icons
import { FaUserFriends, FaUserTie, FaLightbulb } from "react-icons/fa";
import { ImHtmlFive } from "react-icons/im";
import { BsBarChartFill } from "react-icons/bs";
import { RiFocus3Line } from "react-icons/ri";

// Map icon names to actual components
const icons = {
  FaUserFriends,
  FaUserTie,
  FaLightbulb,
  ImHtmlFive,
  BsBarChartFill,
  RiFocus3Line,
};

const PartnerSection = () => {
  const leftData = partnerData.filter((item) => item.side === "left");
  const rightData = partnerData.filter((item) => item.side === "right");

  return (
    <div className="relative w-full min-h-[78vh] pt-10 pb-10">
      
      {/* Title */}
      <div className="flex px-5 md:px-10">
        <h1 className="text-2xl md:text-3xl font-semibold text-white">
          Why Partner with Nexus?
        </h1>
      </div>

      <div className="flex flex-col items-center justify-center text-white px-4 md:px-12 py-10 w-full">

        {/* ================= DESKTOP / TABLET VIEW ================= */}
        <div className="hidden md:flex flex-col lg:flex-row items-center justify-center gap-6 w-full max-w-[1200px]">

          {/* LEFT SIDE - animated */}
          <div className="flex flex-col gap-8 flex-1 w-full">
            {leftData.map((item, i) => {
              const Icon = icons[item.icon];
              return (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.15, duration: 0.6, type: "spring", stiffness: 100 }}
                  whileHover={{ scale: 1.05, boxShadow: "0 0 30px 15px rgba(255,100,0,0.5)" }}
                  className={`flex items-center justify-between bg-[#383838] rounded-full px-6 py-4 
                    shadow-md border border-white transition-all duration-500 ease-in-out 
                    hover:shadow-[0_0_30px_15px_rgba(255,100,0,0.5)] hover:scale-105 
                    ${item.translate} group relative`}
                >
                  <div>
                    <h3 className="font-semibold text-lg">{item.title}</h3>
                    <p className="text-sm text-gray-400">{item.description}</p>
                  </div>
                  <div className="bg-[#101010] w-14 h-14 rounded-full flex justify-center items-center shrink-0">
                    <Icon className="text-2xl text-white" />
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* CENTER CIRCLE */}
          <motion.div
            className="flex justify-center items-center w-[200px] h-[200px] md:w-60 md:h-60 rounded-full 
              bg-[radial-gradient(circle,rgba(255,106,0,0.30)_5%,rgba(255,106,0,0.1)_60%)] 
              border-dashed border-2 border-gray-500 shadow-[0_0_20px_rgba(0,65,255,0.3)]"
            animate={{
              scale: [1, 1.05, 1],
              boxShadow: ["0 0 20px rgba(0,65,255,0.3)", "0 0 40px rgba(0,65,255,0.5)", "0 0 20px rgba(0,65,255,0.3)"],
            }}
            transition={{ repeat: Infinity, duration: 2 }}
          >
            <h2 className="text-lg md:text-xl font-semibold text-center leading-tight">
              Why Partner <br /> with Nexus?
            </h2>
          </motion.div>

          {/* RIGHT SIDE */}
          <div className="flex flex-col gap-8 flex-1 w-full">
            {rightData.map((item) => {
              const Icon = icons[item.icon];
              return (
                <div
                  key={item.id}
                  className={`flex items-center gap-3 bg-[#383838] rounded-full px-5 py-4 
                    shadow-md border border-white transition-transform duration-500 ease-in-out
                    hover:scale-105 hover:shadow-[0_0_30px_15px_rgba(255,100,0,0.5)]
                    ${item.translate}`}
                >
                  <div className="bg-[#101010] w-14 h-14 rounded-full flex justify-center items-center shrink-0">
                    <Icon className="text-2xl text-white" />
                  </div>
                  <div className="text-right">
                    <h3 className="font-semibold text-lg">{item.title}</h3>
                    <p className="text-sm text-gray-400">{item.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ================= MOBILE VIEW ================= */}
        <div className="flex md:hidden flex-col items-center gap-4 w-full">

  {/* Center Circle */}
  <motion.div
  animate={{
              scale: [1, 1.05, 1],
              boxShadow: ["0 0 20px rgba(0,65,255,0.3)","0 0 40px rgba(0,65,255,0.5)", "0 0 20px rgba(0,65,255,0.3)"],
            }}
            transition={{ repeat: Infinity, duration: 2 }}
    className="flex justify-center items-center w-40 h-40 mb-7 rounded-full 
      bg-[radial-gradient(circle,rgba(255,106,0,0.30)_5%,rgba(255,106,0,0.1)_60%)] 
      shadow-[0_0_40px_#0041FF] border-dashed border-2 border-gray-500 text-center"
  >
    <h2 className="text-sm font-semibold">
      Why Partner <br /> with Nexus?
    </h2>
  </motion.div>

  {/* Items */}
  {partnerData.map((item, i) => {
    const Icon = icons[item.icon];
    const align = i % 2 === 0 ? "self-start" : "self-end";

    return (
      <div
        key={item.id}
        className={`flex items-center gap-4 bg-[#383838] rounded-full px-5 py-4 
          w-[95%] sm:w-[80%] border border-white shadow-md ${align}`}
      >
        <div className="bg-[#101010] w-14 h-14 rounded-full flex justify-center items-center shrink-0">
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
  );
};

export default PartnerSection;
