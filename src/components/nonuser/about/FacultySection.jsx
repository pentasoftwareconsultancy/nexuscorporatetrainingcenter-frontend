import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useMotionValue } from "framer-motion";
import facultyData from "../../../assets/shubham/facultydata.json";

const FacultySection = () => {
  const [activeIndex, setActiveIndex] = useState(null);
  const carouselRef = useRef(null);
  const [width, setWidth] = useState(0);
  const x = useMotionValue(0);

  useEffect(() => {
    if (carouselRef.current) {
      const scrollWidth = carouselRef.current.scrollWidth;
      const offsetWidth = carouselRef.current.offsetWidth;
      setWidth(scrollWidth - offsetWidth);
    }
  }, [facultyData]);

  return (
    <section className="bg-[#0B0B0B] text-white py-12 sm:py-16 px-4 sm:px-6 md:px-12 overflow-hidden">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-3xl sm:text-4xl font-bold mb-3 sm:mb-4">Faculty</h2>
        <p className="text-gray-400 max-w-4xl mx-auto mb-8 sm:mb-10 text-sm md:text-base leading-relaxed px-2 sm:px-0">
          Our success is driven by our faculty of world-class instructors, who are not just educators
          but active industry leaders with 15+ years of expertise.
        </p>

        {/* Horizontal Slider */}
        <motion.div
          ref={carouselRef}
          className="cursor-grab active:cursor-grabbing overflow-x-hidden sm:overflow-hidden"
        >
          <motion.div
            style={{ x }}
            drag="x"
            dragConstraints={{ right: 0, left: -width }}
            className="flex items-center gap-0 sm:gap-0 md:gap-1"
          >
            {facultyData.map((member, index) => {
              const isActive = index === activeIndex;
              return (
                <motion.div
                  key={member.id}
                  layout
                  transition={{ duration: 0.6, ease: "easeInOut" }}
                  onClick={() => setActiveIndex(isActive ? null : index)}
                  className={`relative flex-shrink-0 cursor-pointer rounded-[20px] overflow-hidden shadow-lg transition-all duration-700 ease-in-out
                    ${
                      isActive
                        ? "w-[200px] sm:w-[240px] md:w-[260px] lg:w-[280px] z-20"
                        : "w-[120px] sm:w-[140px] md:w-[160px] opacity-80"
                    } 
                    h-[260px] sm:h-[300px] md:h-[340px] lg:h-[360px]
                  `}
                >
                  <motion.img
                    src={member.image}
                    alt={member.name}
                    className="absolute top-0 left-0 w-full h-full object-cover rounded-[20px]"
                  />

                  {/* Sliding Info Box - Inside Image, Bottom Area */}
                  <AnimatePresence>
                    {isActive && (
                      <motion.div
                        key="name-tag"
                        initial={{ x: -120, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        exit={{ x: -120, opacity: 0 }}
                        transition={{
                          duration: 0.8,
                          ease: "easeOut",
                        }}
                        className="absolute bottom-3 left-1/2 -translate-x-1/2 
                                   bg-[#1E1E1E]/90 backdrop-blur-md text-white 
                                   rounded-xl px-3 py-2 sm:px-4 sm:py-3 shadow-lg text-center 
                                   w-[80%] max-w-[240px]"
                      >
                        <h3 className="text-[13px] sm:text-sm md:text-base font-semibold leading-tight">
                          {member.name}
                        </h3>
                        <p className="text-[11px] sm:text-[12px] text-gray-300">{member.experience}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default FacultySection;
