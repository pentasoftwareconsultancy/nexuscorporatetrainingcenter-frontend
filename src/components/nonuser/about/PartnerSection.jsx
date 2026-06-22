// import React, { useState, useEffect, useRef } from "react";
// import partnerData from "../../../assets/about/partnerData.json";
// import { motion } from "framer-motion";

// // Safelist classes for Tailwind compiler to detect dynamic JSON classes:
// // translate-x-10 -translate-x-10 translate-x-7 -translate-x-7

// // Import all icons
// import { FaUserFriends, FaUserTie, FaLightbulb } from "react-icons/fa";
// import { ImHtmlFive } from "react-icons/im";
// import { BsBarChartFill } from "react-icons/bs";
// import { RiFocus3Line } from "react-icons/ri";

// // Map icon names to actual components
// const icons = {
//   FaUserFriends,
//   FaUserTie,
//   FaLightbulb,
//   ImHtmlFive,
//   BsBarChartFill,
//   RiFocus3Line,
// };

// const PartnerSection = () => {
//   const leftData = partnerData.filter((item) => item.side === "left");
//   const rightData = partnerData.filter((item) => item.side === "right");

//   const containerRef = useRef(null);
//   const centerRef = useRef(null);
//   const cardRefs = useRef([]);

//   const [lines, setLines] = useState([]);

//   // Reset refs on each render
//   cardRefs.current = [];

//   const addToRefs = (el) => {
//     if (el && !cardRefs.current.includes(el)) {
//       cardRefs.current.push(el);
//     }
//   };

//   useEffect(() => {
//     const updateLines = () => {
//       if (!containerRef.current || !centerRef.current || cardRefs.current.length === 0) return;
//       const containerRect = containerRef.current.getBoundingClientRect();
//       const centerRect = centerRef.current.getBoundingClientRect();

//       const centerPoint = {
//         x: centerRect.left - containerRect.left + centerRect.width / 2,
//         y: centerRect.top - containerRect.top + centerRect.height / 2,
//       };

//       const newLines = cardRefs.current
//         .map((cardEl) => {
//           if (!cardEl) return null;
//           const cardRect = cardEl.getBoundingClientRect();
//           return {
//             x1: centerPoint.x,
//             y1: centerPoint.y,
//             x2: cardRect.left - containerRect.left + cardRect.width / 2,
//             y2: cardRect.top - containerRect.top + cardRect.height / 2,
//           };
//         })
//         .filter(Boolean);

//       setLines(newLines);
//     };

//     updateLines();
//     window.addEventListener("resize", updateLines);

//     // Add a small delay/timeout to handle initial rendering / layout shifts / image loads
//     const timer = setTimeout(updateLines, 200);

//     return () => {
//       window.removeEventListener("resize", updateLines);
//       clearTimeout(timer);
//     };
//   }, [leftData, rightData]);

//   return (
//     <div className="relative w-full min-h-[78vh] pt-10 pb-10">

//       {/* Title */}
//       <div className="flex px-5 md:px-10">
//         <h2 className="text-[28px] sm:text-[32px] md:text-[36px] font-bold tracking-tight text-white">
//           Why Choose Nexus as <span className="text-orange-500"> Your Partner?</span>
//         </h2>
//       </div>

//       <div className="flex flex-col items-center justify-center text-white px-4 md:px-12 py-10 w-full">

//         {/* ================= DESKTOP / TABLET VIEW ================= */}
//         <div
//           ref={containerRef}
//           className="hidden md:flex flex-col lg:flex-row items-center justify-center gap-8 w-full max-w-[1450px] relative"
//         >
//           {/* Dotted Lines SVG */}
//           <svg className="absolute inset-0 w-full h-full pointer-events-none z-10 hidden md:block">
//             {lines.map((line, idx) => (
//               <line
//                 key={idx}
//                 x1={line.x1}
//                 y1={line.y1}
//                 x2={line.x2}
//                 y2={line.y2}
//                 stroke="rgba(249,115,22,0.18)"
//                 strokeWidth="1.5"
//                 strokeDasharray="4 4"
//               />
//             ))}
//           </svg>

//           {/* LEFT SIDE - animated */}
//           <div className="flex flex-col gap-8 flex-[1.2] w-full z-20 items-end">
//             {leftData.map((item, i) => {
//               const Icon = icons[item.icon];
//               return (
//                 <motion.div
//                   ref={addToRefs}
//                   key={item.id}
//                   initial={{ opacity: 0, x: -50 }}
//                   animate={{ opacity: 1, x: 0 }}
//                   transition={{ delay: i * 0.15, duration: 0.6, type: "spring", stiffness: 100 }}
//                   whileHover={{ scale: 1.03 }}
//                   className={`flex items-center justify-between bg-[#111] rounded-full px-7 py-3 
//                     shadow-md border border-white/10 transition-all duration-500 ease-in-out 
//                     hover:border-white/20 relative z-20 
//                     w-full max-w-[480px] lg:w-[450px] lg:max-w-none xl:w-[500px] 2xl:w-[520px]
//                     md:h-[140px] lg:h-[145px] xl:h-[140px] 2xl:h-[135px]
//                     ${item.translate} group`}
//                 >
//                   <div className="text-left flex-1 pr-4">
//                     <h3 className="font-semibold text-[17px] text-white leading-snug">{item.title}</h3>
//                     <p className="text-[13px] sm:text-[14px] font-light text-white/60 leading-relaxed">{item.description}</p>
//                   </div>
//                   <div className="bg-white/5 border border-white/10 w-11 h-11 rounded-full flex justify-center items-center shrink-0">
//                     <Icon className="text-xl text-white" />
//                   </div>
//                 </motion.div>
//               );
//             })}
//           </div>

//           {/* CENTER CIRCLE */}
//           <motion.div
//             ref={centerRef}
//             className="flex justify-center items-center w-[200px] h-[200px] md:w-60 md:h-60 rounded-full 
//                       bg-neutral-950 bg-[radial-gradient(circle,rgba(249,115,22,0.20)_5%,rgba(249,115,22,0.02)_60%)] 
//                       border-dashed border-2 border-orange-500/30 shadow-[0_0_40px_rgba(249,115,22,0.35)] relative z-20 shrink-0"
//             animate={{
//               scale: [1, 1.03, 1],
//               boxShadow: [
//                 "0 0 20px rgba(249,115,22,0.3)",
//                 "0 0 40px rgba(249,115,22,0.5)",
//                 "0 0 20px rgba(249,115,22,0.3)"
//               ],
//             }}
//             transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
//           >
//             <h2 className="text-lg md:text-xl font-bold text-center leading-tight">
//               Why Partner <br /> with Nexus?
//             </h2>
//           </motion.div>

//           {/* RIGHT SIDE */}
//           <div className="flex flex-col gap-8 flex-[1.2] w-full z-20 items-start">
//             {rightData.map((item, i) => {
//               const Icon = icons[item.icon];
//               return (
//                 <motion.div
//                   ref={addToRefs}
//                   key={item.id}
//                   initial={{ opacity: 0, x: 50 }}
//                   animate={{ opacity: 1, x: 0 }}
//                   transition={{ delay: i * 0.15, duration: 0.6, type: "spring", stiffness: 100 }}
//                   whileHover={{ scale: 1.03 }}
//                   className={`flex items-center justify-start gap-5 bg-[#111] rounded-full px-7 py-3 
//                     shadow-md border border-white/10 transition-all duration-500 ease-in-out
//                     hover:border-white/20 relative z-20 
//                     w-full max-w-[480px] lg:w-[450px] lg:max-w-none xl:w-[500px] 2xl:w-[520px]
//                     md:h-[140px] lg:h-[145px] xl:h-[140px] 2xl:h-[135px]
//                     ${item.translate} group`}
//                 >
//                   <div className="bg-white/5 border border-white/10 w-11 h-11 rounded-full flex justify-center items-center shrink-0">
//                     <Icon className="text-xl text-white" />
//                   </div>
//                   <div className="text-left flex-1">
//                     <h3 className="font-semibold text-[17px] text-white leading-snug">{item.title}</h3>
//                     <p className="text-[13px] sm:text-[14px] font-light text-white/60 leading-relaxed">{item.description}</p>
//                   </div>
//                 </motion.div>
//               );
//             })}
//           </div>
//         </div>

//         {/* ================= MOBILE VIEW ================= */}
//         <div className="flex md:hidden flex-col items-center gap-4 w-full">

//           {/* Center Circle */}
//           <motion.div
//             animate={{
//               scale: [1, 1.03, 1],
//               boxShadow: ["0 0 20px rgba(249,115,22,0.3)", "0 0 40px rgba(249,115,22,0.5)", "0 0 20px rgba(249,115,22,0.3)"],
//             }}
//             transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
//             className="flex justify-center items-center w-40 h-40 mb-7 rounded-full 
//               bg-[radial-gradient(circle,rgba(249,115,22,0.30)_5%,rgba(249,115,22,0.1)_60%)] 
//             shadow-[0_0_40px_rgba(249,115,22,0.4)] border-dashed border-2 border-white/20 text-center"
//           >
//             <h2 className="text-sm font-semibold">
//               Why Partner <br /> with Nexus?
//             </h2>
//           </motion.div>

//           {/* Items */}
//           {partnerData.map((item, i) => {
//             const Icon = icons[item.icon];
//             const align = i % 2 === 0 ? "self-start" : "self-end";

//             return (
//               <div
//                 key={item.id}
//                 className={`flex items-center gap-4 bg-[#111] rounded-full px-5 py-3 
//           w-[95%] sm:w-[80%] border border-white/10 shadow-md ${align}`}
//               >
//                 <div className="bg-white/5 border border-white/10 w-11 h-11 rounded-full flex justify-center items-center shrink-0">
//                   <Icon className="text-xl text-white" />
//                 </div>

//                 <div className="text-left">
//                   <h3 className="font-semibold text-sm text-white">{item.title}</h3>
//                   <p className="text-xs text-white/60 leading-relaxed">{item.description}</p>
//                 </div>
//               </div>
//             );
//           })}
//         </div>

//       </div>
//     </div>
//   );
// };

// export default PartnerSection;


import React, { useState, useEffect, useRef } from "react";
import partnerData from "../../../assets/about/partnerData.json";
import { motion } from "framer-motion";

// Safelist classes for Tailwind compiler to detect dynamic JSON classes:
// translate-x-10 -translate-x-10 translate-x-7 -translate-x-7

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

  const containerRef = useRef(null);
  const centerRef = useRef(null);
  const cardRefs = useRef([]);

  const [lines, setLines] = useState([]);

  // Reset refs on each render
  cardRefs.current = [];

  const addToRefs = (el) => {
    if (el && !cardRefs.current.includes(el)) {
      cardRefs.current.push(el);
    }
  };

  useEffect(() => {
    const updateLines = () => {
      if (!containerRef.current || !centerRef.current || cardRefs.current.length === 0) return;
      const containerRect = containerRef.current.getBoundingClientRect();
      const centerRect = centerRef.current.getBoundingClientRect();

      const centerPoint = {
        x: centerRect.left - containerRect.left + centerRect.width / 2,
        y: centerRect.top - containerRect.top + centerRect.height / 2,
      };

      const newLines = cardRefs.current
        .map((cardEl) => {
          if (!cardEl) return null;
          const cardRect = cardEl.getBoundingClientRect();
          return {
            x1: centerPoint.x,
            y1: centerPoint.y,
            x2: cardRect.left - containerRect.left + cardRect.width / 2,
            y2: cardRect.top - containerRect.top + cardRect.height / 2,
          };
        })
        .filter(Boolean);

      setLines(newLines);
    };

    updateLines();
    window.addEventListener("resize", updateLines);

    // Add a small delay/timeout to handle initial rendering / layout shifts / image loads
    const timer = setTimeout(updateLines, 200);

    return () => {
      window.removeEventListener("resize", updateLines);
      clearTimeout(timer);
    };
  }, [leftData, rightData]);

  return (
    <div className="relative w-full min-h-[78vh] pt-10 pb-10">

      {/* Title */}
      <div className="flex px-5 md:px-10">
        <h2 className="text-[28px] sm:text-[32px] md:text-[36px] font-bold tracking-tight text-white">
          Why Choose Nexus as <span className="text-orange-500"> Your Partner?</span>
        </h2>
      </div>

      <div className="flex flex-col items-center justify-center text-white px-4 md:px-12 py-10 w-full">

        {/* ================= DESKTOP / TABLET VIEW ================= */}
        <div
          ref={containerRef}
          className="hidden md:flex flex-col lg:flex-row items-center justify-center gap-8 w-full max-w-[1450px] relative"
        >
          {/* Dotted Lines SVG */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none z-10 hidden md:block">
            {lines.map((line, idx) => (
              <line
                key={idx}
                x1={line.x1}
                y1={line.y1}
                x2={line.x2}
                y2={line.y2}
                stroke="rgba(249,115,22,0.18)"
                strokeWidth="1.5"
                strokeDasharray="4 4"
              />
            ))}
          </svg>

          {/* LEFT SIDE - animated */}
          <div className="flex flex-col gap-8 flex-[1.2] w-full z-20 items-end">
            {leftData.map((item, i) => {
              const Icon = icons[item.icon];
              return (
                <motion.div
                  ref={addToRefs}
                  key={item.id}
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.15, duration: 0.6, type: "spring", stiffness: 100 }}
                  whileHover={{ scale: 1.03 }}
                  className={`flex items-center justify-between bg-[#111]
                 rounded-full px-5 py-2 shadow-md border border-white/10
                  transition-all duration-500 ease-in-out
                  hover:border-white/20 relative z-20   w-full max-w-[360px] lg:w-[360px]   xl:w-[390px]
                 md:h-[105px] lg:h-[110px]
                  ${item.translate} group`}
                >
                  <div className="text-left flex-1 pr-4">
                    <h3 className="font-semibold text-[15px] text-white leading-snug ml-5">{item.title}</h3>
                    <p className="text-[13px] sm:text-[12px] font-light text-white/60 leading-relaxed ml-5">{item.description}</p>
                  </div>
                  <div className="bg-white/5 border border-white/10 w-9 h-9 rounded-full flex justify-center items-center shrink-0 ">
                    <Icon className="text-base text-white" />
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* CENTER CIRCLE */}
          <motion.div
            ref={centerRef}
            className="flex justify-center items-center w-[200px] h-[200px] md:w-60 md:h-60 rounded-full 
                      bg-neutral-950 bg-[radial-gradient(circle,rgba(249,115,22,0.20)_5%,rgba(249,115,22,0.02)_60%)] 
                      border-dashed border-2 border-orange-500/30 shadow-[0_0_40px_rgba(249,115,22,0.35)] relative z-20 shrink-0"
            animate={{
              scale: [1, 1.03, 1],
              boxShadow: [
                "0 0 20px rgba(249,115,22,0.3)",
                "0 0 40px rgba(249,115,22,0.5)",
                "0 0 20px rgba(249,115,22,0.3)"
              ],
            }}
            transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
          >
            <h2 className="text-lg md:text-xl font-bold text-center leading-tight">
              Why Partner <br /> with Nexus?
            </h2>
          </motion.div>

          {/* RIGHT SIDE */}
          <div className="flex flex-col gap-8 flex-[1.2] w-full z-20 items-start">
            {rightData.map((item, i) => {
              const Icon = icons[item.icon];
              return (
                <motion.div
                  ref={addToRefs}
                  key={item.id}
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.15, duration: 0.6, type: "spring", stiffness: 100 }}
                  whileHover={{ scale: 1.03 }}
                  className={`flex items-center justify-start gap-4 bg-[#111]
rounded-full px-5 py-2
shadow-md border border-white/10
transition-all duration-500 ease-in-out
hover:border-white/20 relative z-20

w-full max-w-[360px]
lg:w-[360px]
xl:w-[390px]

md:h-[105px]
lg:h-[110px]

${item.translate} group`}
                >
                  <div className="bg-white/5 border border-white/10 w-9 h-9 rounded-full flex justify-center items-center shrink-0">
                    <Icon className="text-base text-white" />
                  </div>
                  <div className="text-left flex-1">
                    <h3 className="font-semibold text-[15px] text-white leading-snug">{item.title}</h3>
                    <p className="text-[13px] sm:text-[12px] font-light text-white/60 leading-relaxed">{item.description}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* ================= MOBILE VIEW ================= */}
        <div className="flex md:hidden flex-col items-center w-full px-4">

          {/* Center Circle */}
          <motion.div
            animate={{
              scale: [1, 1.03, 1],
              boxShadow: [
                "0 0 20px rgba(249,115,22,0.3)",
                "0 0 40px rgba(249,115,22,0.5)",
                "0 0 20px rgba(249,115,22,0.3)",
              ],
            }}
            transition={{
              repeat: Infinity,
              duration: 2.5,
              ease: "easeInOut",
            }}
            className="w-36 h-36 rounded-full flex items-center justify-center text-center mb-8
    bg-[radial-gradient(circle,rgba(249,115,22,0.30)_5%,rgba(249,115,22,0.08)_60%)]
    border border-orange-500/30 shadow-[0_0_30px_rgba(249,115,22,0.35)]"
          >
            <h2 className="text-sm font-semibold leading-relaxed text-white">
              Why Partner
              <br />
              with Nexus?
            </h2>
          </motion.div>

          {/* Cards */}
          <div className="flex flex-col gap-4 w-full">
            {partnerData.map((item) => {
              const Icon = icons[item.icon];

              return (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                  className="w-full bg-[#111]
          border border-white/10
          rounded-2xl
          p-4
          flex items-start gap-4
          shadow-md"
                >
                  <div
                    className="w-12 h-12 min-w-[48px]
            rounded-full
            bg-white/5
            border border-white/10
            flex items-center justify-center"
                  >
                    <Icon className="text-lg text-white" />
                  </div>

                  <div className="flex-1 min-w-0">
                    <h3 className="text-white font-semibold text-sm mb-1">
                      {item.title}
                    </h3>

                    <p className="text-white/60 text-xs leading-6 break-words">
                      {item.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
};

export default PartnerSection;
