import React, { useRef, useState, useEffect } from "react";
import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";
import {
  Eye,
  Target,
  Award,
  ArrowLeft,
  Wifi,
  Battery,
  Signal,
  ChevronRight,
  GraduationCap,
  Briefcase,
  Laptop,
  Globe,
  Users,
  Heart,
  Play,
  FileText,
  PieChart,
  MessageSquare,
  Shield,
  TrendingUp,
  Lightbulb,
  HeartHandshake,
  Wrench
} from "lucide-react";
import MissionImg from "../../../assets/about/OurMission.avif";
import partnerSection from "../../../components/nonuser/about/PartnerSection.jsx";

// A highly detailed, premium interactive mobile phone UI mockup representing the Nexus Vision tilted in 3D space
const MobileVisionMockup = () => {
  return (
    <motion.div
      className="relative w-[310px] h-[670px] overflow-visible group select-none perspective-1000"
      style={{
        transformStyle: "preserve-3d",
        willChange: "transform"
      }}
      animate={{
        y: [0, -6, 0],
        rotateY: [0, 360]
      }}
      transition={{
        y: { duration: 5, repeat: Infinity, ease: "easeInOut" },
        rotateY: {
          delay: 3.5,
          duration: 2.2,
          ease: "easeInOut",
          repeat: Infinity,
          repeatDelay: 8
        }
      }}
    >
      {/* 1. Phone Bezel Casing with Neon Glow Border (Front Face) */}
      <div
        className="absolute inset-0 rounded-[46px] border-[6px] border-[#08183a] bg-[#020308] shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9),0_0_30px_rgba(6,182,212,0.25),inset_0_0_12px_rgba(6,182,212,0.2)] overflow-hidden flex flex-col z-20"
        style={{ backfaceVisibility: "hidden" }}
      >
        {/* Screen Inner Bezel Line */}
        <div className="absolute inset-px rounded-[40px] border border-white/5 pointer-events-none z-35" />

        {/* Dynamic Notch / Island */}
        <div className="absolute top-2.5 left-1/2 -translate-x-1/2 w-28 h-5 bg-black rounded-full z-40 flex items-center justify-between px-3">
          <div className="w-2.5 h-2.5 rounded-full bg-neutral-900 border border-neutral-800" />
          <div className="w-10 h-1 bg-neutral-800 rounded-full" />
        </div>

        {/* Ambient background glows - Orange/Amber theme */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#1b0e04] via-[#080503] to-[#020202] z-0 pointer-events-none" />

        {/* Curved Glowing Arcs */}
        <div className="absolute -top-10 -left-10 w-[120%] h-[60%] opacity-40 z-0 pointer-events-none">
          <div className="absolute inset-0 rounded-full border-t border-r border-orange-500/20 blur-[2px] rotate-45 scale-110" />
          <div className="absolute inset-0 rounded-full border-t border-amber-500/30 blur-[4px] -rotate-12 scale-100" />
          <div className="absolute inset-0 rounded-full border-t border-yellow-500/20 blur-[8px] rotate-180 scale-95" />
        </div>
        <div className="absolute top-1/3 right-[-30%] w-[80%] h-[40%] bg-orange-600/10 blur-[50px] rounded-full pointer-events-none" />
        <div className="absolute bottom-12 left-[-20%] w-[70%] h-[30%] bg-amber-500/15 blur-[40px] rounded-full pointer-events-none" />

        {/* Screen Content Container */}
        <div className="relative w-full h-full flex flex-col justify-between pt-12 pb-6 px-5 z-10">

          {/* Status Bar */}
          <div className="flex items-center justify-between text-[11px] font-semibold text-neutral-400 px-2 mt-0.5">
            <span>5:15</span>
            <div className="flex items-center gap-1.5">
              <Signal className="w-3.5 h-3.5 text-neutral-400" />
              <Wifi className="w-3.5 h-3.5 text-neutral-400" />
              <Battery className="w-4 h-4 text-neutral-400" />
            </div>
          </div>

          {/* Back Button and Title */}
          <div className="flex flex-col gap-3.5 mt-2">
            <div className="flex items-center px-1">
              <button className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/80 hover:bg-white/10 transition-colors">
                <ArrowLeft className="w-4 h-4" />
              </button>
            </div>

            <div className="text-center">
              <h3 className="text-[20px] font-extrabold tracking-tight text-white leading-none">
                Nexus Training <span className="bg-gradient-to-r from-orange-400 to-amber-400 bg-clip-text text-transparent">Portal</span>
              </h3>
              <p className="text-[10px] text-neutral-400 font-medium tracking-wide mt-1.5 uppercase">
                Learn. Grow. Succeed.
              </p>
            </div>
          </div>

          {/* Center Section: Placement Stats Dashboard card directly on screen */}
          <div className="relative flex-1 flex items-center justify-center my-3 overflow-visible">
            {/* Ambient blur glow behind cards */}
            <div className="absolute w-32 h-32 bg-orange-500/10 blur-[40px] rounded-full z-0" />

            {/* Live Support Profile Card (Behind on right) */}
            <div
              className="absolute left-[130px] top-[30px] w-[105px] h-[120px] bg-gradient-to-b from-[#2a1b12] to-[#120a06] border border-white/10 rounded-2xl p-2 shadow-2xl z-10 flex flex-col gap-1.5"
              style={{ transform: "translateZ(-15px)" }}
            >
              {/* Mock User Avatar Area */}
              <div className="relative w-full h-[55px] bg-[#1a100a] rounded-lg overflow-hidden flex items-center justify-center border border-white/5">
                <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-orange-500/30 to-amber-500/30 flex items-center justify-center border border-orange-500/20">
                  <Users className="w-4.5 h-4.5 text-orange-400" />
                </div>
                <div className="absolute bottom-1 right-1 w-2.5 h-2.5 rounded-full bg-emerald-500 border border-[#2a1b12]" />
              </div>
              {/* Title / Info */}
              <div className="flex flex-col gap-0.5">
                <span className="text-[6px] text-orange-400 font-bold uppercase tracking-wider">Live Support</span>
                <p className="text-[7px] text-white/90 font-medium leading-tight">Connect with Mentor</p>
                <div className="flex items-center gap-0.5 mt-0.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  <span className="text-[6px] text-neutral-400">Online</span>
                </div>
              </div>
            </div>

            {/* Main Dashboard Stats Card with Curved Glow Graph (In front on left) */}
            <div
              className="relative w-[135px] h-[165px] bg-gradient-to-b from-[#1c1109] to-[#0a0704] border border-white/15 shadow-[0_15px_30px_rgba(0,0,0,0.6),_0_0_15px_rgba(249,115,22,0.15)] rounded-2xl p-3 flex flex-col gap-2 z-20"
              style={{ transform: "translateZ(15px)" }}
            >
              <div className="text-[6px] text-neutral-400 font-bold uppercase tracking-wider text-center border-b border-white/5 pb-1">
                Placement Stats
              </div>
              <div className="flex-1 bg-white/5 border border-white/5 rounded-lg p-1.5 flex flex-col justify-between">
                {/* Glowing Orange Curve Line Chart */}
                <div className="h-[52px] relative w-full overflow-hidden flex flex-col justify-end">
                  <svg className="w-full h-[85%] overflow-visible" viewBox="0 0 100 40">
                    <path d="M 0,35 Q 20,20 40,25 T 80,10 T 100,5" fill="none" stroke="#ff6a00" strokeWidth="2.5" className="drop-shadow-[0_0_4px_#ff6a00]" />
                    <path d="M 0,35 Q 20,20 40,25 T 80,10 T 100,5 L 100,40 L 0,40 Z" fill="url(#orangeChartGrad)" />
                    <defs>
                      <linearGradient id="orangeChartGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#ff6a00" stopOpacity="0.35" />
                        <stop offset="100%" stopColor="#ff6a00" stopOpacity="0" />
                      </linearGradient>
                    </defs>
                  </svg>
                </div>
                <div className="grid grid-cols-3 gap-0.5 text-[5px] text-neutral-400 font-bold border-t border-white/5 pt-1 mt-1">
                  <span>💼 500+</span>
                  <span>🎓 10k+</span>
                  <span>⭐ 4.9</span>
                </div>
              </div>
              <div className="bg-gradient-to-r from-orange-950 to-orange-900/60 border border-white/5 rounded-lg p-1 text-[5px] flex flex-col gap-0.5">
                <span className="font-extrabold text-orange-400 uppercase tracking-wide">Nexus Career Vision</span>
                <p className="text-white/80 leading-none">Build Your IT Success</p>
              </div>
            </div>
          </div>

          {/* Feature List (Separated by lines) */}
          <div className="flex flex-col border-t border-b border-white/5 py-2.5 my-2">
            {[
              { text: "Job-Ready Tech Curriculums", icon: GraduationCap },
              { text: "Pan-India Training Networks", icon: Globe },
              { text: "Globally Certified Training", icon: Award },
              { text: "Next-Gen Digital Coding Labs", icon: Laptop },
              { text: "1-on-1 Dedicated Placement Support", icon: Briefcase }
            ].map((item, idx) => {
              const IconComponent = item.icon;
              return (
                <div key={idx} className="flex items-center justify-between py-1.5 border-b border-white/5 last:border-0">
                  <div className="flex items-center gap-2.5">
                    <div className="w-[22px] h-[22px] rounded-md bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
                      <IconComponent className="w-3.5 h-3.5 text-orange-400" />
                    </div>
                    <span className="text-[10px] text-neutral-200 font-semibold tracking-wide leading-none">
                      {item.text}
                    </span>
                  </div>
                  <ChevronRight className="w-3 h-3 text-neutral-500" />
                </div>
              );
            })}
          </div>

          {/* Action Button */}
          <motion.button
            className="w-full py-3 bg-gradient-to-r from-orange-500 via-amber-500 to-yellow-500 hover:brightness-110 text-[10.5px] font-extrabold tracking-wider uppercase rounded-full shadow-[0_0_20px_rgba(249,115,22,0.3)] transition-all duration-300 border border-white/10 active:scale-98"
            whileHover={{ scale: 1.02 }}
          >
            Launch Your Tech Career Today
          </motion.button>
        </div>
      </div>

      {/* Phone Back Face (glowing camera bump, premium matte glass look, orange-cyan accent lines) */}
      <div
        className="absolute inset-0 rounded-[46px] border-[6px] border-[#08183a] bg-[#020308] shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9),0_0_30px_rgba(6,182,212,0.25),inset_0_0_12px_rgba(6,182,212,0.2)] overflow-hidden flex flex-col justify-between p-6 z-10"
        style={{
          backfaceVisibility: "hidden",
          transform: "rotateY(180deg)"
        }}
      >
        {/* Screen Inner Bezel Line */}
        <div className="absolute inset-px rounded-[40px] border border-white/5 pointer-events-none z-35" />

        {/* Sleek metallic sheen sweep overlay */}
        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent pointer-events-none rotate-12 scale-150 z-0" />

        {/* Ambient background glows - Orange/Amber/Cyan blend theme */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0b1528] via-[#050a15] to-[#010307] z-0" />

        {/* Glow Tracks on Back Cover */}
        <div className="absolute top-0 bottom-0 left-[45%] w-[2px] bg-gradient-to-b from-transparent via-cyan-500/20 to-transparent blur-[1px] pointer-events-none" />
        <div className="absolute top-0 bottom-0 left-[55%] w-[2px] bg-gradient-to-b from-transparent via-orange-500/20 to-transparent blur-[1px] pointer-events-none" />

        {/* Corner / Side Accent glow */}
        <div className="absolute -bottom-10 -right-10 w-44 h-44 bg-orange-500/10 blur-[40px] rounded-full pointer-events-none" />
        <div className="absolute -top-10 -left-10 w-44 h-44 bg-cyan-500/10 blur-[40px] rounded-full pointer-events-none" />

        {/* --- Top Part: Premium Triple Camera System --- */}
        <div className="absolute top-6 left-6 w-[95px] h-[95px] bg-[#070c18]/95 border border-white/10 rounded-2xl shadow-lg p-2.5 z-10">
          {/* Top Left Lens */}
          <div className="absolute top-2 left-2 w-8 h-8 rounded-full bg-[#03060c] border border-white/10 flex items-center justify-center shadow-[inset_0_2px_4px_rgba(0,0,0,0.8)]">
            <div className="w-5 h-5 rounded-full bg-[#081024] border border-orange-500/30 flex items-center justify-center">
              <div className="w-2.5 h-2.5 rounded-full bg-black flex items-center justify-center">
                <span className="w-1 h-1 rounded-full bg-cyan-400 shadow-[0_0_4px_#22d3ee]" />
              </div>
            </div>
          </div>
          {/* Bottom Left Lens */}
          <div className="absolute bottom-2 left-2 w-8 h-8 rounded-full bg-[#03060c] border border-white/10 flex items-center justify-center shadow-[inset_0_2px_4px_rgba(0,0,0,0.8)]">
            <div className="w-5 h-5 rounded-full bg-[#081024] border border-orange-500/30 flex items-center justify-center">
              <div className="w-2.5 h-2.5 rounded-full bg-black flex items-center justify-center">
                <span className="w-1 h-1 rounded-full bg-cyan-400 shadow-[0_0_4px_#22d3ee]" />
              </div>
            </div>
          </div>
          {/* Top Right Lens */}
          <div className="absolute top-2 right-2 w-8 h-8 rounded-full bg-[#03060c] border border-white/10 flex items-center justify-center shadow-[inset_0_2px_4px_rgba(0,0,0,0.8)]">
            <div className="w-5 h-5 rounded-full bg-[#081024] border border-orange-500/30 flex items-center justify-center">
              <div className="w-2.5 h-2.5 rounded-full bg-black flex items-center justify-center">
                <span className="w-1 h-1 rounded-full bg-cyan-400 shadow-[0_0_4px_#22d3ee]" />
              </div>
            </div>
          </div>
          {/* Flash Light (Bottom Right top-half) */}
          <div className="absolute bottom-6 right-4 w-3.5 h-3.5 rounded-full bg-amber-400 border border-amber-300 shadow-[0_0_10px_rgba(251,191,36,0.8)] flex items-center justify-center">
            <div className="w-1.5 h-1.5 rounded-full bg-white" />
          </div>
          {/* LiDAR Sensor (Bottom Right bottom-half) */}
          <div className="absolute bottom-2 right-4 w-3 h-3 rounded-full bg-neutral-900 border border-neutral-700/60 shadow-[inset_0_1px_2px_rgba(0,0,0,0.8)]" />
        </div>

        {/* --- Center Part: Glowing Nexus Branding Logo --- */}
        <div className="absolute top-[60%] left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-2.5 z-10 w-full">
          {/* Logo Glow Ring */}
          <div className="relative w-16 h-16 rounded-full bg-[#070d1a] border border-orange-500/30 flex items-center justify-center shadow-[0_0_20px_rgba(249,115,22,0.15)] hover:border-orange-400 transition-all duration-300">
            <Award className="w-8 h-8 text-orange-400 drop-shadow-[0_0_8px_rgba(249,115,22,0.55)]" />
          </div>
          <div className="text-center mt-1">
            <span className="text-[13px] font-extrabold tracking-[0.3em] bg-gradient-to-r from-orange-400 via-amber-400 to-yellow-400 bg-clip-text text-transparent drop-shadow-[0_0_5px_rgba(249,115,22,0.2)] block">
              NEXUS
            </span>
            <span className="text-[6.5px] text-neutral-400 tracking-[0.35em] font-bold uppercase block mt-0.5">
              Corporate Training
            </span>
          </div>
        </div>

        {/* --- Bottom Part: Sleek details --- */}
        <div className="absolute bottom-8 left-0 right-0 flex flex-col items-center gap-1 z-10">
          <div className="w-16 h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent mb-1" />
          <span className="text-[6.5px] text-neutral-500 font-extrabold tracking-[0.3em] uppercase">
            Designed by Nexus in India
          </span>
          <span className="text-[5.5px] text-neutral-600 font-semibold tracking-[0.2em] uppercase">
            Model N-2026 • 5G Support
          </span>
        </div>
      </div>

      {/* 2. Floating Bubble Badges & success cards floating OUTSIDE the phone bezel */}
      {/* Play Video Badge */}
      <motion.div
        className="absolute -left-10 top-[70px] w-8 h-8 rounded-full bg-[#0a1024] md:bg-[#0a1024]/80 md:backdrop-blur-md shadow-[0_0_15px_rgba(6,182,212,0.4)] flex items-center justify-center z-30 border border-cyan-500/30"
        style={{ transform: "translateZ(30px)", backfaceVisibility: "hidden" }}
        animate={{ y: [0, -6, 0], rotate: [0, -8, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      >
        <Play className="w-3.5 h-3.5 text-cyan-400 fill-cyan-400/20" />
      </motion.div>

      {/* Heart Badge */}
      <motion.div
        className="absolute -right-6 top-[80px] w-8 h-8 rounded-full bg-[#0a1024] md:bg-[#0a1024]/80 md:backdrop-blur-md shadow-[0_0_15px_rgba(236,72,153,0.4)] flex items-center justify-center z-30 border border-pink-500/30"
        style={{ transform: "translateZ(35px)", backfaceVisibility: "hidden" }}
        animate={{ y: [0, 5, 0], scale: [1, 1.05, 1] }}
        transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
      >
        <Heart className="w-3.5 h-3.5 text-pink-500 fill-pink-500/20" />
      </motion.div>

      {/* Curriculum/FileText Badge */}
      <motion.div
        className="absolute -left-12 top-[160px] w-8 h-8 rounded-full bg-[#0a1024] md:bg-[#0a1024]/80 md:backdrop-blur-md shadow-[0_0_15px_rgba(59,130,246,0.4)] flex items-center justify-center z-30 border border-blue-500/30"
        style={{ transform: "translateZ(25px)", backfaceVisibility: "hidden" }}
        animate={{ y: [0, 4, 0], x: [0, -2, 0] }}
        transition={{ duration: 4.2, repeat: Infinity, ease: "easeInOut" }}
      >
        <FileText className="w-3.5 h-3.5 text-blue-400" />
      </motion.div>

      {/* Pie Chart Badge */}
      <motion.div
        className="absolute -right-8 top-[170px] w-8 h-8 rounded-full bg-[#0a1024] md:bg-[#0a1024]/80 md:backdrop-blur-md shadow-[0_0_15px_rgba(139,92,246,0.4)] flex items-center justify-center z-30 border border-violet-500/30"
        style={{ transform: "translateZ(28px)", backfaceVisibility: "hidden" }}
        animate={{ y: [0, -5, 0], x: [0, 3, 0] }}
        transition={{ duration: 3.8, repeat: Infinity, ease: "easeInOut" }}
      >
        <PieChart className="w-3.5 h-3.5 text-violet-400" />
      </motion.div>

      {/* Message Square Badge */}
      <motion.div
        className="absolute -left-8 top-[250px] w-8 h-8 rounded-full bg-[#0a1024] md:bg-[#0a1024]/80 md:backdrop-blur-md shadow-[0_0_15px_rgba(14,165,233,0.4)] flex items-center justify-center z-30 border border-sky-500/30"
        style={{ transform: "translateZ(20px)", backfaceVisibility: "hidden" }}
        animate={{ y: [0, 5, 0], rotate: [0, 10, 0] }}
        transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
      >
        <MessageSquare className="w-3.5 h-3.5 text-sky-400" />
      </motion.div>

      {/* Floating Student Profile Placement Success Card */}
      <motion.div
        className="absolute -right-24 top-[240px] w-[115px] h-[140px] rounded-2xl bg-[#070b19] md:bg-[#070b19]/90 md:backdrop-blur-md shadow-[0_10px_25px_rgba(0,0,0,0.5),0_0_15px_rgba(236,72,153,0.2)] border border-pink-500/20 p-2 z-30 flex flex-col gap-1.5"
        style={{
          transformStyle: "preserve-3d",
          transform: "rotateY(-15deg) rotateZ(4deg) translateZ(35px)",
          backfaceVisibility: "hidden"
        }}
        animate={{ y: [0, -6, 0] }}
        transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
      >
        {/* Photo Container */}
        <div className="relative w-full h-[65px] rounded-lg overflow-hidden border border-white/10">
          <img
            src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150"
            alt="Student Placed"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
          <div className="absolute bottom-1 left-1.5 bg-cyan-500 text-white text-[5px] px-1 rounded font-bold uppercase tracking-wider">
            Google
          </div>
        </div>
        {/* Info */}
        <div className="flex flex-col gap-0.5 text-left">
          <span className="text-[6px] text-pink-400 font-bold uppercase tracking-wide">Nexus Success Story</span>
          <p className="text-[7.5px] text-white/95 font-semibold leading-none truncate">Neha Sharma</p>
          <p className="text-[6px] text-gray-400 truncate">Software Engineer</p>
        </div>
        {/* Stats */}
        <div className="flex items-center gap-1.5 border-t border-white/5 pt-1 mt-0.5 text-[5px] text-gray-400 font-medium">
          <span className="flex items-center gap-0.5"><Heart className="w-1.5 h-1.5 text-pink-500 fill-pink-500" /> 280</span>
          <span className="flex items-center gap-0.5"><MessageSquare className="w-1.5 h-1.5 text-sky-400" /> 120</span>
        </div>
      </motion.div>
    </motion.div>
  );
};

// 3D Interactive Value Card Component with mouse-tracking tilt
const ValueCard3D = ({ card, CardIcon, index }) => {
  const cardRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [15, -15]), { stiffness: 150, damping: 20 });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-15, 15]), { stiffness: 150, damping: 20 });

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
    setIsHovered(false);
  };

  // Staggered initial tilt for the fanned-out look
  const baseTilts = [
    { rX: 0, rY: 0, rZ: 0 },
    { rX: 0, rY: 0, rZ: 0 },
    { rX: 0, rY: 0, rZ: 0 },
    { rX: 0, rY: 0, rZ: 0 },
    { rX: 0, rY: 0, rZ: 0 },
    { rX: 0, rY: 0, rZ: 0 }
  ];
  const baseTilt = { rX: 0, rY: 0, rZ: 0 };

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 60, rotateX: baseTilt.rX + 20, rotateY: baseTilt.rY, rotateZ: baseTilt.rZ }}
      whileInView={{
        opacity: 1,
        y: 0,
        rotateX: baseTilt.rX,
        rotateY: baseTilt.rY,
        rotateZ: baseTilt.rZ
      }}
      viewport={{ once: true }}
      transition={{
        type: "spring",
        stiffness: 50,
        damping: 15,
        delay: card.delay !== undefined ? card.delay : index * 0.08
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX: isHovered ? rotateX : baseTilt.rX,
        rotateY: isHovered ? rotateY : baseTilt.rY,
        transformStyle: "preserve-3d",
        perspective: "1000px"
      }}
      whileHover={{
        scale: 1.03,
        y: -10,
        transition: {
          type: "spring",
          stiffness: 250,
          damping: 18,
        },
      }}
      className="relative group cursor-pointer"
    >
      {/* Card Glow Shadow */}
      <div
        className="absolute -inset-2 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl pointer-events-none z-0"
        style={{ background: `radial-gradient(circle, ${card.glowColor}, transparent 70%)` }}
      />

      {/* Main Card */}
      <div
        className={`relative overflow-hidden rounded-2xl border ${card.borderColor}
  backdrop-blur-xl p-6 sm:p-7 flex flex-col gap-4 h-[320px]
  z-10 transition-all duration-300
  group-hover:border-orange-400/40
  group-hover:shadow-[0_20px_50px_-12px_rgba(249,115,22,0.35)]`}
        style={{
          background: `linear-gradient(
      135deg,
      rgba(249,115,22,0.10) 0%,
      rgba(194,65,12,0.18) 50%,
      rgba(251,146,60,0.08) 100%
    )`,
          backdropFilter: "blur(20px) saturate(180%)",
          WebkitBackdropFilter: "blur(20px) saturate(180%)",
          transformStyle: "preserve-3d"
        }}
      >
        {/* Metallic sheen sweep */}
        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/[0.03] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none rotate-12 scale-150" />

        {/* Top Highlight */}
        <div className="absolute top-0 left-4 right-4 h-[1px] bg-gradient-to-r from-transparent via-orange-400/50 to-transparent" />

        {/* Icon */}
        <div
          className="relative w-12 h-12 rounded-xl flex items-center justify-center border border-orange-500/20 group-hover:border-orange-400/40 transition-all duration-300"
          style={{
            background:
              "linear-gradient(135deg, rgba(249,115,22,0.15) 0%, rgba(194,65,12,0.25) 100%)",
            transform: "translateZ(30px)"
          }}
        >
          <CardIcon
            className={`w-5 h-5 ${card.iconColor} group-hover:scale-110 transition-transform duration-300`}
          />

          <div
            className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            style={{
              boxShadow: "0 0 20px rgba(249,115,22,0.4)"
            }}
          />
        </div>

        {/* Title */}
        <h3
          className="text-lg sm:text-xl font-bold text-white tracking-tight leading-tight group-hover:text-orange-100 transition-colors duration-300"
          style={{ transform: "translateZ(25px)" }}
        >
          {card.title}
        </h3>

        {/* Description */}
        <p
          className="text-gray-300 text-sm leading-relaxed"
          style={{ transform: "translateZ(20px)" }}
        >
          {card.description}
        </p>

        {/* Bottom Accent Line */}
        <div className="mt-auto pt-3">
          <div className="w-full h-[1px] bg-gradient-to-r from-orange-500/40 via-amber-400/30 to-transparent" />
        </div>

        {/* Decorative Dots */}
        <div className="absolute top-3 right-3 w-1.5 h-1.5 rounded-full bg-orange-500/40" />
        <div className="absolute bottom-3 left-3 w-1 h-1 rounded-full bg-amber-400/40" />
      </div>
    </motion.div>
  );
};

const VMVSection = () => {
  const containerRef = useRef(null);
  const [emitterPos, setEmitterPos] = useState({ top: "25%", left: "31%" });

  // Update position of emitter based on actual container bounds (matching object-cover math)
  useEffect(() => {
    if (!containerRef.current) return;
    const updatePosition = () => {
      const rect = containerRef.current.getBoundingClientRect();
      const containerWidth = rect.width;
      const containerHeight = rect.height;
      const imageAspectRatio = 1672 / 941; // OurMission.avif dimensions

      let scaledWidth, scaledHeight;

      if (containerWidth / containerHeight > imageAspectRatio) {
        // Wide screen: image scales to fit width
        scaledWidth = containerWidth;
        scaledHeight = containerWidth / imageAspectRatio;
      } else {
        // Narrow screen: image scales to fit height
        scaledHeight = containerHeight;
        scaledWidth = containerHeight * imageAspectRatio;
      }

      // Sphere is at 31% from left of image, 25% from top of image
      const xPixel = 0.31 * scaledWidth;
      const yPixel = 0.25 * scaledHeight;

      // Convert to percentages of the container
      const xPercent = (xPixel / containerWidth) * 100;
      const yPercent = (yPixel / containerHeight) * 100;

      setEmitterPos({
        top: `${yPercent}%`,
        left: `${xPercent}%`
      });
    };

    updatePosition();
    window.addEventListener("resize", updatePosition);
    const timer = setTimeout(updatePosition, 100);

    return () => {
      window.removeEventListener("resize", updatePosition);
      clearTimeout(timer);
    };
  }, []);

  // Motion settings
  const springTransition = { type: "spring", stiffness: 70, damping: 16 };

  const listContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const listItem = {
    hidden: { opacity: 0, x: -10 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.4 } },
  };

  return (
    <div className="relative w-full max-w-[1200px] mx-auto px-6 sm:px-8 md:px-12 pt-6 pb-10 md:pt-8 md:pb-12 text-white font-sans space-y-10 md:space-y-16 overflow-visible z-10">

      {/* ================================
          OUR VISION
      ================================= */}
      <div className="relative flex flex-col md:flex-row-reverse items-center gap-10 md:gap-16">
        {/* Soft Background Blue Blob using smooth radial gradient */}
        <div className="absolute -top-24 -right-24 w-[350px] h-[350px] bg-[radial-gradient(circle,rgba(18,84,250,0.12)_0%,transparent_70%)] pointer-events-none"></div>

        {/* Vision Mobile UI Mockup Wrapper with Responsive Scaling to prevent mobile layout overflow */}
        <div className="w-full md:w-[40%] h-[420px] sm:h-[520px] md:h-auto flex justify-center items-start overflow-visible py-2 md:py-4 scale-75 sm:scale-90 md:scale-100 origin-top" style={{ willChange: "transform" }}>
          <motion.div
            initial={{ opacity: 0, x: 0, rotateY: -70, rotateX: 5, rotate: 0, scale: 0.7 }}
            whileInView={{ opacity: 1, x: 0, rotateY: -22, rotateX: 18, rotate: 14, scale: 1 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 35, damping: 14 }}
            style={{ transformStyle: "preserve-3d", willChange: "transform" }}
            className="perspective-1000 overflow-visible"
          >
            <div className="w-[310px] h-[670px] overflow-visible" style={{ transformStyle: "preserve-3d" }}>
              <MobileVisionMockup />
            </div>
          </motion.div>
        </div>

        {/* Vision Text */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ type: "spring", stiffness: 50, damping: 16 }}
          className="w-full md:w-[60%] flex flex-col gap-4"
        >
          <span className="text-orange-500 text-xs sm:text-sm font-semibold tracking-wider uppercase">
            Future Focus
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white leading-tight flex items-center gap-3">
            <Eye className="text-orange-500 w-8 h-8 md:w-10 md:h-10 shrink-0" />
            Our Vision
          </h2>
          <div className="w-10 h-[2px] bg-orange-500"></div>

          <div className="space-y-4">
            <p className="text-gray-300 leading-relaxed text-sm sm:text-base md:text-[16px] mt-2">
              At Nexus Corporate Training Center LLP, our vision is to deliver accessible, high-quality IT education with robust placement support, ensuring every student has the skills and opportunities to build a thriving technology career. We envision that the Nexus Brand would reach PAN India level in the next 5 years and connect with all graduate students.
            </p>
            <p className="text-gray-300 leading-relaxed text-sm sm:text-base md:text-[16px]">
              We stand for empowerment through knowledge, and a drive for excellence in the corporate training center. Furthermore, we believe in social work and charity paired with education and employment, creating a positive impact on society.
            </p>
          </div>

          <div className="mt-2">
            <span className="font-semibold text-orange-400 text-sm sm:text-base">
              Vision Highlights:
            </span>

            <motion.ul
              variants={listContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-300 text-sm sm:text-base"
            >
              {[
                { text: "Reach PAN India level in the next 5 years", icon: Globe },
                { text: "Connect with all graduate students", icon: Users },
                { text: "Empowerment through knowledge", icon: GraduationCap },
                { text: "Drive for excellence in corporate training", icon: Award },
                { text: "Social work & charity with education", icon: Heart },
                { text: "Employment and career opportunities", icon: Briefcase }
              ].map((item, i) => {
                const IconComponent = item.icon;
                return (
                  <motion.li
                    key={i}
                    variants={listItem}
                    className="flex items-center gap-3.5 py-1"
                  >
                    <div className="w-7 h-7 rounded-md bg-[#0e1630]/60 border border-orange-500/20 flex items-center justify-center shrink-0">
                      <IconComponent className="w-3.5 h-3.5 text-orange-400" />
                    </div>
                    <span className="text-gray-200 text-xs sm:text-sm font-semibold tracking-wide">
                      {item.text}
                    </span>
                  </motion.li>
                );
              })}
            </motion.ul>
          </div>
        </motion.div>
      </div>

      {/* ================================
          OUR MISSION
      ================================= */}
      <motion.div
        ref={containerRef}
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={springTransition}
        className="relative w-screen max-w-[100vw] left-1/2 -translate-x-1/2 bg-transparent shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9),0_0_35px_rgba(249,115,22,0.25),inset_0_0_15px_rgba(249,115,22,0.15)] py-10 md:py-16 min-h-[400px] md:min-h-[500px] flex items-center overflow-hidden z-10 px-6 sm:px-8 md:px-12"
      >
        {/* Soft Background Purple/Magenta Blob using smooth radial gradient */}
        <div className="absolute -top-24 -left-24 w-[350px] h-[350px] bg-[radial-gradient(circle,rgba(249,115,22,0.18)_0%,transparent_70%)] pointer-events-none"></div>

        {/* Futuristic Cyber-Holographic Background Image covering the entire section */}
        <img
          src={MissionImg}
          alt=""
          className="absolute inset-0 w-full h-full object-cover opacity-90 z-0 pointer-events-none select-none"
          style={{ objectPosition: "left top" }}
        />

        {/* Dark overlay to ensure text readability on mobile while remaining transparent on laptop/desktop */}
        <div className="absolute inset-0 bg-[#01040f]/75 md:bg-transparent z-5 pointer-events-none" />

        {/* Sleek metallic sheen sweep overlay */}
        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent pointer-events-none rotate-12 scale-150 z-5" />

        {/* Dynamic Hologram Grid background */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(249,115,22,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(249,115,22,0.05)_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none z-0 opacity-25" />

        {/* Main Holographic SVG Ripple Overlay - centered absolutely on the background image's sphere */}
        <div className="absolute inset-0 pointer-events-none z-10 overflow-hidden flex items-center justify-center">
          <div
            className="absolute -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px]"
            style={{
              top: emitterPos.top,
              left: emitterPos.left
            }}
          >
            <svg className="w-full h-full overflow-visible" viewBox="0 0 800 800">
              {/* Concentric Rippling Circles from Emitter */}
              {[0, 1, 2, 3].map((i) => (
                <motion.circle
                  key={i}
                  cx="400"
                  cy="400"
                  fill="none"
                  stroke="rgba(251,146,60,0.25)"
                  strokeWidth="1.5"
                  initial={{ r: 30, opacity: 0.85 }}
                  animate={{
                    r: [30, 480],
                    opacity: [0.85, 0]
                  }}
                  transition={{
                    duration: 5,
                    repeat: Infinity,
                    delay: i * 1.25,
                    ease: "easeOut"
                  }}
                />
              ))}
              {/* Glowing Emitter Core Overlay */}
              <circle cx="400" cy="400" r="15" fill="rgba(249,115,22,0.35)" className="animate-pulse" />
              <circle cx="400" cy="400" r="6" fill="#fff" />
            </svg>
          </div>
        </div>

        {/* Centered Content Container */}
        <div className="relative w-full max-w-[1200px] mx-auto z-20">

          {/* Grid Layout: Left Column = Empty Spacing (5 cols), Right Column = Mission Stack (7 cols) */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-16 items-start">

            {/* Left Column (7 cols): Empty spacing for the graphic */}
            <div className="hidden md:block md:col-span-7" />

            {/* Right Column (5 cols): Full Mission Content Stack on the dark blank space */}
            <div className="md:col-span-5 flex flex-col gap-6 md:gap-8">

              {/* Top Section: Mission Text */}
              <div className="flex flex-col gap-4">
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white leading-tight flex items-center gap-3 drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]">
                  <Target className="text-orange-400 w-8 h-8 md:w-10 md:h-10 shrink-0 drop-shadow-[0_0_10px_rgba(249,115,22,0.6)]" />
                  Our Mission
                </h2>
                <div className="w-10 h-[2px] bg-orange-400 shadow-[0_0_8px_rgba(249,115,22,0.5)]"></div>

                <p className="text-gray-100 leading-relaxed text-sm sm:text-base md:text-[16px] drop-shadow-[0_1px_6px_rgba(0,0,0,0.8)] mt-4">
                  Our mission at Nexus Corporate Training Center LLP is to empower learners with job-focused software skills through structured and tailored programs. We stand for empowerment through knowledge, and a drive for excellence in the corporate training center.
                </p>
              </div>

              {/* Bottom Section: Mission Objectives */}
              <div className="flex flex-col gap-4">
                <span className="font-bold text-orange-300 text-sm sm:text-base drop-shadow-[0_0_8px_rgba(249,115,22,0.6)]">
                  Mission Objectives:
                </span>

                <motion.ul
                  variants={listContainer}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  className="flex flex-col gap-4"
                >
                  {[
                    { text: "Provide industry-driven IT courses aligned with current tech trends", icon: Laptop },
                    { text: "Offer one-to-one mentorship, doubt support & interview grooming", icon: Users },
                    { text: "Ensure 100% placement assistance for deserving candidates", icon: Briefcase },
                    { text: "Continuously update programs based on industry needs & feedback", icon: Target }
                  ].map((item, i) => {
                    const IconComponent = item.icon;
                    return (
                      <motion.li
                        key={i}
                        variants={listItem}
                        className="flex items-center gap-4 py-2.5 border-b border-orange-400/15 last:border-0"
                      >
                        <div className="w-9 h-9 rounded-lg bg-black/50 backdrop-blur-sm border border-orange-400/40 flex items-center justify-center shrink-0 shadow-[0_0_12px_rgba(249,115,22,0.25)]">
                          <IconComponent className="w-4 h-4 text-orange-300" />
                        </div>
                        <span className="text-white text-xs sm:text-sm font-semibold tracking-wide drop-shadow-[0_1px_4px_rgba(0,0,0,0.8)]">
                          {item.text}
                        </span>
                      </motion.li>
                    );
                  })}
                </motion.ul>
              </div>

            </div>

          </div>
        </div>
      </motion.div>



    
      
         <PartnerSection/>
      
      {/* ================================
          OUR VALUES — 3D Interactive Floating Cards
      ================================= */}
      <div className="relative flex flex-col items-center gap-10 md:gap-14">

        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ type: "spring", stiffness: 40, damping: 14 }}
          className="text-center flex flex-col items-center gap-3 max-w-2xl mx-auto"
        >
          <span className="text-orange-500 text-xs sm:text-sm font-semibold tracking-[0.25em] uppercase">
            Core Beliefs
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white leading-tight flex items-center justify-center gap-3">
            <Award className="text-orange-500 w-8 h-8 md:w-10 md:h-10 shrink-0" />
            Our Values
          </h2>
          <div className="w-12 h-[2px] bg-gradient-to-r from-orange-500 to-purple-500 mx-auto"></div>
          <p className="text-gray-400 leading-relaxed text-sm sm:text-base md:text-[16px] mt-2">
            At Nexus, our values guide everything we do—from our commitment to student outcomes to our passion for innovation and integrity.
          </p>
        </motion.div>

        {/* 3D Floating Cards Grid */}
        <div className="w-full max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 justify-items-center">
            {[
              {
                title: "Integrity & Transparency",
                description:
                  "We maintain absolute honesty and openness in all our interactions, ensuring trust forms the foundation of every student relationship.",
                icon: Shield,
                gradient: "from-orange-600/30 via-orange-800/30 to-orange-900/40",
                borderColor: "border-orange-500/30",
                glowColor: "rgba(249,115,22,0.25)",
                iconColor: "text-orange-300",
              },
              {
                title: "Commitment to Outcomes",
                description:
                  "Every program is designed with measurable career outcomes in mind — from skill mastery to job placement success.",
                icon: TrendingUp,
                gradient: "from-orange-600/30 via-orange-800/30 to-orange-900/40",
                borderColor: "border-orange-500/30",
                glowColor: "rgba(249,115,22,0.25)",
                iconColor: "text-orange-300",
              },
              {
                title: "Innovation-Driven Approach",
                description:
                  "We constantly evolve our curriculum with cutting-edge tools, modern frameworks, and industry-relevant methodologies.",
                icon: Lightbulb,
                gradient: "from-orange-600/30 via-orange-800/30 to-orange-900/40",
                borderColor: "border-orange-500/30",
                glowColor: "rgba(249,115,22,0.25)",
                iconColor: "text-orange-300",
              },
              {
                title: "Inclusive Learning Culture",
                description:
                  "Whether beginner or professional, every learner finds their place. Our programs are tailored for all experience levels.",
                icon: HeartHandshake,
                gradient: "from-orange-600/30 via-orange-800/30 to-orange-900/40",
                borderColor: "border-orange-500/30",
                glowColor: "rgba(249,115,22,0.25)",
                iconColor: "text-orange-300",
              },
              {
                title: "Focus on Real-World Skills",
                description:
                  "Hands-on projects, live coding labs, and industry case studies ensure our students are truly job-ready from day one.",
                icon: Wrench,
                gradient: "from-orange-600/30 via-orange-800/30 to-orange-900/40",
                borderColor: "border-orange-500/30",
                glowColor: "rgba(249,115,22,0.25)",
                iconColor: "text-orange-300",
              },
              {
                title: "Social Work & Charity",
                description:
                  "We believe in social work and charity paired with education and employment, creating a positive impact on society.",
                icon: Heart,
                gradient: "from-orange-600/30 via-orange-800/30 to-orange-900/40",
                borderColor: "border-orange-500/30",
                glowColor: "rgba(249,115,22,0.25)",
                iconColor: "text-orange-300",
              },
            ].map((card, i) => (
              <div
                key={i}
                className={`w-full max-w-[370px] ${i === 1 || i === 4 ? "xl:translate-y-8" : ""
                  }`}
              >
                <ValueCard3D
                  card={card}
                  CardIcon={card.icon}
                  index={i}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VMVSection;
