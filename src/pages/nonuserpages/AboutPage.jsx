import React from 'react';
import { motion } from 'framer-motion';
import VMVSection from '../../components/nonuser/about/VMVSection.jsx';
// import PartnerSection from '../../components/nonuser/about/PartnerSection.jsx';
import SuccessReviews from '../../components/public/SuccessReviews.jsx';

const AboutPage = () => {
  return (
    <div className="relative w-full min-h-screen bg-gradient-to-br from-[#05112d] via-[#01040f] to-[#000000] text-white overflow-x-hidden font-sans">

      {/* Ambient Floating Blobs using smooth hardware-accelerated radial gradients */}
      <div className="absolute top-[10%] left-[-10%] w-[45vw] h-[45vw] bg-[radial-gradient(circle,rgba(18,84,250,0.12)_0%,transparent_70%)] animate-float-blob pointer-events-none z-0"></div>
      <div className="absolute top-[40%] right-[-15%] w-[50vw] h-[50vw] bg-[radial-gradient(circle,rgba(99,102,241,0.08)_0%,transparent_70%)] animate-float-blob-reverse pointer-events-none z-0"></div>
      <div className="absolute bottom-[10%] left-[5%] w-[40vw] h-[40vw] bg-[radial-gradient(circle,rgba(59,130,246,0.06)_0%,transparent_70%)] animate-float-blob pointer-events-none z-0"></div>

      <div className="relative z-10">
        {/* Hero Header Section */}
        <div className="max-w-[1200px] mx-auto px-6 sm:px-8 md:px-12 pt-16 pb-8 text-center sm:text-left">
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col gap-3"
          >
            <span className="text-orange-500 text-xs sm:text-sm font-semibold tracking-[0.25em] uppercase">
              Who We Are
            </span>
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-[46px] font-bold tracking-tight bg-gradient-to-b from-white to-white/60 bg-clip-text text-transparent">
              About Nexus
            </h1>
            <p className="text-white/80 text-sm sm:text-base font-light max-w-2xl mt-2 leading-relaxed">
              Forging industry-ready IT professionals and leaders through world-class corporate training, hands-on learning, and dedicated career grooming.
            </p>
          </motion.div>

          <div className="mt-10 glow-divider"></div>
        </div>

        {/* Child Sections */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          <VMVSection />
          {/* <PartnerSection /> */}
          <SuccessReviews />
        </motion.div>
      </div>
    </div>
  );
};

export default AboutPage;