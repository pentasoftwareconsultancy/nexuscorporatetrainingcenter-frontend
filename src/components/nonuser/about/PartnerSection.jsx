import React from 'react'
import { FaUserFriends } from "react-icons/fa";
import { ImHtmlFive } from "react-icons/im";
import { BsFileBarGraphFill } from "react-icons/bs";
import { RiFocus3Line } from "react-icons/ri";
import { FaLightbulb } from "react-icons/fa6";
import { FaUserClock } from "react-icons/fa";
import {FaUserTie} from "react-icons/fa";
import { motion } from "framer-motion";

const PartnerSection = () => {
  return (
     <>
        <div className='relative w-full min-h-screen'>
      <div className='flex p-10 align-text-top  text-3xl text-white'>
        <h1>Why Partner with Nexus?</h1>
      </div>

      <div className="absolute flex flex-col items-center justify-center translate-x-3 text-white px-6 py-10">

        {/* ========== DESKTOP / TABLET VIEW (>=768px) ========== */}
        <div className="hidden md:flex flex-col lg:flex-row items-center justify-center gap-8 w-[96%] max-w-7xl">

          {/* LEFT SIDE */}
          <div className="flex flex-col gap-9 flex-1">
            {/* Left-1*/}
            <div className="flex items-center gap-3 justify-between bg-[#1a1a20] rounded-full px-5 py-4 shadow-md hover:scale-105 transition-transform border border-white animate-slideInLeft [animation-delay:0.5s] translate-x-10  ">

              <div>
                <h3 className="font-semibold text-lg">Industry-Certified Experts</h3>
                <p className="text-sm text-gray-400 ">
                  Learn directly from active industry leaders with 10+ years of experience.
                </p>
              </div>
              <div className='bg-[#101010] w-15 h-13 rounded-full flex justify-center items-center  '>
                <FaUserTie className="text-2xl text-white" />
              </div>
            </div>

            {/* Left-2 */}
            <div className="flex items-center  justify-between  bg-[#1a1a20] rounded-full px-5 py-4 border border-white shadow-md hover:scale-105 transition-transform animate-slideInLeft -translate-x-7  ">

              <div>
                <h3 className="font-semibold text-lg">100% Customized Programs</h3>
                <p className="text-sm text-gray-400">
                  We design every solution from the ground up to align precisely with your unique business challenges.
                </p>
              </div>
              <div className='bg-[#101010] w-23 h-13 rounded-full flex justify-center items-center  '>
                <ImHtmlFive className="text-2xl text-white" />
              </div>
            </div>

            {/* Left-3 */}
            <div className="flex items-center justify-between gap-1 bg-[#1a1a20] rounded-full px-5 py-4 border border-white shadow-md hover:scale-105 transition-transform animate-slideInLeft translate-x-10 ">

              <div>
                <h3 className="font-semibold text-lg">Guaranteed ROI & Impact</h3>
                <p className="text-sm text-gray-400">
                  Our training focuses on measurable outcomes, providing tools to verify skill transformation.
                </p>
              </div>
              <div className='bg-[#101010] w-20 h-13 rounded-full flex justify-center items-center '>
                <FaUserFriends className="text-2xl text-white" />
              </div>
            </div>
          </div>

          {/* CENTER CIRCLE */}
          <div className="flex justify-center items-center relative w-[240px] h-[240px] rounded-full bg-[radial-gradient(circle,_#0041FF_0%,_#0A0A0F_100%)] animate-scaleUp  shadow-[0_0_40px_#0041FF] 
          border border-dashed border-gray-500">
            <h2 className="text-xl font-semibold">
              Why Partner <br /> with Nexus?
            </h2>
          </div>

          {/* RIGHT SIDE */}
          <div className="flex flex-col gap-9 flex-1">
            {/* Right-1 */}
            <div className="flex items-center bg-[#1a1a20] rounded-full px-4 py-4 shadow-md border border-white hover:scale-105 transition-transform animate-slideInRight space-x-9 -translate-x-10">
              <div className='bg-[#101010] w-22 h-13 rounded-full flex justify-center items-center '>
                <BsFileBarGraphFill className="text-2xl text-white" />
              </div>
              <div className='text-right mr-3 '>
                <h3 className="font-semibold text-lg">Sustained Skill Retention</h3>
                <p className="text-sm text-gray-400">
                  We provide post-training support and resources to ensure new skills are effectively applied.
                </p>
              </div>
            </div>

            {/* Right-2 */}
            <div className="flex items-center gap-4 bg-[#1a1a20] rounded-full px-5 py-4 shadow-md border border-white hover:scale-105 transition-transform animate-slideInRight translate-x-7 ">
              <div className='bg-[#101010] w-19 h-12 rounded-full flex justify-center items-center '>
                <RiFocus3Line className="text-2xl text-white" />
              </div>
              <div className='text-right mr-3'>
                <h3 className="font-semibold text-lg">Technology-Powered Training</h3>
                <p className="text-sm text-gray-400">
                  We provide post-training support and resources to ensure new skills are effectively applied.
                </p>
              </div>
            </div>

            {/* Right-3 */}
            <div className="flex items-center gap-4 bg-[#1a1a20] rounded-full px-5 py-4 shadow-md border border-white hover:scale-105 transition-transform animate-slideInRight -translate-x-10 ">
              <div className='bg-[#101010] w-19 h-12 rounded-full flex justify-center items-center '>
                <FaLightbulb className="text-2xl text-white" />
              </div>
              <div className='text-right mr-3'>
                <h3 className="font-semibold text-lg">Global Standard, Local Focus</h3>
                <p className="text-sm text-gray-400">
                  Our curriculum meets international quality benchmarks while adapting to specific cultural nuances.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* ========== MOBILE VIEW (<768px) ========== */}
        <div className="flex md:hidden flex-col items-center gap-5 mt-6 w-full">
          {/* CIRCLE ON TOP */}
          <div className="flex justify-center items-center w-[180px] h-[180px] rounded-full bg-[radial-gradient(circle,_#0041FF_0%,_#0A0A0F_100%)] shadow-[0_0_40px_#0041FF] 
          border border-dashed border-gray-500 text-center mb-6 shadow-md">
            <h2 className="text-base font-semibold leading-tight">
              Why Partner <br /> with Nexus?
            </h2>
          </div>

          {/* 1 */}
          <div className="flex items-center gap-4 bg-[#1a1a20] rounded-full px-5 py-4 w-[90%] sm:w-[80%] self-start border border-white shadow-md animate-slideInLeft">
            <div className='bg-[#101010] w-14 h-14 rounded-full flex justify-center items-center '>
              <FaUserTie className="text-2xl text-white" />
            </div>
            <div>
              <h3 className="font-semibold text-sm">Industry-Certified Experts</h3>
              <p className="text-xs text-gray-400">
                Learn directly from active industry leaders with 10+ years of experience.
              </p>
            </div>
          </div>

          {/* 2 */}


          <div className="flex items-center gap-4 bg-[#1a1a20] rounded-full px-5 py-4 w-[90%] sm:w-[80%] border border-white self-end shadow-md animate-slideInRight">
            <div className='bg-[#101010] w-15 h-13 rounded-full flex justify-center items-center'>
              <ImHtmlFive className="text-2xl text-white" />
            </div>
            <div>
              <h3 className="font-semibold text-sm">100% Customized Programs</h3>
              <p className="text-xs text-gray-400">
                We design every solution from the ground up to align precisely with your unique business challenges.
              </p>
            </div>
          </div>









          {/* 3 */}
          <div className="flex items-center gap-4 bg-[#1a1a20] rounded-full px-5 py-4 w-[90%] sm:w-[80%] border border-white self-start shadow-md">
            <div className='bg-[#101010] w-14 h-13 rounded-full flex justify-center items-center '>
              <FaUserFriends className="text-2xl text-white" />
            </div>
            <div>
              <h3 className="font-semibold text-sm">Guaranteed ROI & Impact</h3>
              <p className="text-xs text-gray-400">
                Our training focuses on measurable outcomes, providing tools to verify skill transformation.
              </p>
            </div>
          </div>

          {/* 4 */}
          <div className="flex items-center gap-4 bg-[#1a1a20] rounded-full px-5 py-4 w-[90%] sm:w-[80%] border border-white self-end shadow-md">
            <div className='bg-[#101010] w-14 h-13 rounded-full flex justify-center items-center '>
              <BsFileBarGraphFill className="text-2xl text-white" />
            </div>
            <div>
              <h3 className="font-semibold text-sm">Sustained Skill Retention</h3>
              <p className="text-xs text-gray-400">
                We provide post-training support and resources to ensure new skills are effectively applied.
              </p>
            </div>
          </div>

          {/* 5 */}
          <div className="flex items-center gap-4 bg-[#1a1a20] rounded-full px-5 py-4 w-[90%] sm:w-[80%] border border-white self-start shadow-md">
            <div className='bg-[#101010] w-14 h-13 rounded-full flex justify-center items-center '>
              <RiFocus3Line className="text-2xl text-white" />
            </div>
            <div>
              <h3 className="font-semibold text-sm">Technology-Powered Training</h3>
              <p className="text-xs  text-white">
                We provide post-training support and resources to ensure new skills are effectively applied.
              </p>
            </div>
          </div>

          {/* 6 */}
          <div className="flex items-center gap-4 bg-[#1a1a20] rounded-full px-5 py-4 w-[90%] sm:w-[80%] border border-white self-end shadow-md">
            <div className='bg-[#101010] w-14 h-12 rounded-full flex justify-center items-center '>
              <FaLightbulb className="text-white text-2xl" />
            </div>
            <div>
              <h3 className="font-semibold text-sm">Global Standard, Local Focus</h3>
              <p className=" text-xs text-white">
                Our curriculum meets international quality benchmarks while adapting to specific cultural nuances.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
   </>
  )
}

export default PartnerSection