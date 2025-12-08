import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useMotionValue } from "framer-motion";
import facultyData from "../../../assets/shubham/facultydata.json";

const FacultySection = () => {
  const [activeIndex, setActiveIndex] = useState(0); // ✅ First one open by default
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

  const handleClick = (index) => {
    // ✅ Close current if same, else open the new one
    setActiveIndex((prev) => (prev === index ? null : index));
  };

  return (
    <section className="min-h-screen text-white px-12 sm:px-6 md:px-12 overflow-hidden">
      <div className="flex flex-col">
        <h2 className="text-3xl sm:text-4xl font-bold mb-3 sm:mb-4">Faculty</h2>
        <p className="text-gray-400 max-w-11/12 py-8 text-[1.1rem]">
          Our success is driven by our faculty of world-class instructors, who are not just educators,
          but active industry leaders with an average of 6+ years of real-world expertise in their
          respective domains. They bring current, cutting-edge knowledge directly from the field into
          the classroom, ensuring that every course is taught through the lens of practical application
          and measurable business impact.
        </p>
      </div>

      <div className="flex flex-col max-full justify-center items-center">
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
                  onClick={() => handleClick(index)}
                  className={`relative flex-shrink-0 cursor-pointer rounded-[20px] overflow-hidden shadow-lg transition-all duration-700 ease-in-out mt-12
                    ${
                      isActive
                        ? "w-[340px] sm:w-[380px] md:w-[420px] lg:w-[460px] z-20" // ✅ Wider when open
                        : "w-[140px] sm:w-[160px] md:w-[180px] opacity-80"
                    } 
                    h-[400px] sm:h-[440px] md:h-[480px] lg:h-[500px]
                  `}
                >
                  <motion.img
                    src={member.image}
                    alt={member.name}
                    className="absolute top-0 left-0 w-full h-full object-cover rounded-[20px]"
                  />

                  {/* Sliding Info Box */}
                  <AnimatePresence>
                    {isActive && (
                      <motion.div
                        key="name-tag"
                        initial={{ x: -120, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        exit={{ x: -120, opacity: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="absolute bottom-3 left-1/2 -translate-x-1/2 
                                   bg-[#1E1E1E]/90 backdrop-blur-md text-white 
                                   rounded-xl px-3 py-2 sm:px-4 sm:py-3 shadow-lg text-start 
                                   w-[80%] max-w-[300px]"
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
