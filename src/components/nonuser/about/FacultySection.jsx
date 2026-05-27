import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import ApiService from "../../../core/services/api.service";
import ServerUrl from "../../../core/constants/serverURL.constant";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../../core/constants/routes.constant";

export default function FacultySection() {
  const [faculty, setFaculty] = useState([]);
  const navigate = useNavigate();
  const api = new ApiService();

  // Load faculty
  useEffect(() => {
    const fetchFaculty = async () => {
      try {
        const res = await api.apiget(ServerUrl.API_GET_FACULTYS);
        if (Array.isArray(res?.data?.data)) {
          setFaculty(res.data.data);
        }
      } catch (err) {
        console.error("Failed to load faculty:", err);
      }
    };
    fetchFaculty();
  }, []);

  if (faculty.length === 0) return null;

  return (
    <section className="py-16 text-white px-6 sm:px-8 md:px-12 overflow-hidden relative z-10">
      {/* Inline CSS ONLY for high-performance marquee translation */}
      <style>
        {`
          @keyframes facultyScroll {
            from {
              transform: translateX(0);
            }
            to {
              transform: translateX(-50%);
            }
          }

          .faculty-track {
            display: flex;
            gap: 24px;
            width: max-content;
            animation: facultyScroll 25s linear infinite;
          }

          .faculty-wrapper:hover .faculty-track {
            animation-play-state: paused;
          }
        `}
      </style>

      {/* Title & Description */}
      <div className="max-w-[1200px] mx-auto mb-12 text-center sm:text-left">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="text-orange-500 text-xs sm:text-sm font-semibold tracking-[0.2em] uppercase">
            Expert Mentors
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mt-2">
            Meet Our Faculty
          </h2>
          <div className="w-12 h-[2px] bg-orange-500 mt-4 mx-auto sm:mx-0"></div>
          <p className="text-gray-400 pt-4 max-w-2xl text-sm sm:text-base leading-relaxed">
            Our success is driven by world-class instructors with real-world industry expertise, dedicated to grooming the next generation of software professionals.
          </p>
        </motion.div>
      </div>

      {/* Auto Horizontal Marquee Scroller */}
      <div className="faculty-wrapper relative overflow-visible w-full py-4">
        {/* Soft fading edges for elegant blend */}
        <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-[#0c0c0c] to-transparent z-20 pointer-events-none"></div>
        <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-[#0c0c0c] to-transparent z-20 pointer-events-none"></div>

        <div className="faculty-track">
          {[...faculty, ...faculty].map((f, index) => (
            <motion.div
              key={index}
              onClick={() => navigate(ROUTES.PROFESSOR)}
              whileHover={{ 
                scale: 1.04,
                y: -6,
                boxShadow: "0 15px 35px -5px rgba(255, 106, 0, 0.15)"
              }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="
                min-w-[240px]
                sm:min-w-[280px]
                md:min-w-[320px]
                h-[320px]
                sm:h-[360px]
                md:h-[400px]
                rounded-2xl
                overflow-hidden
                cursor-pointer
                glass-luxury
                relative
                group
                border border-white/[0.06]
                transition-all duration-300
              "
            >
              {/* Faculty Image */}
              <img
                src={f.image}
                alt={f.faculty_name}
                className="
                  w-full
                  h-full
                  object-cover
                  transition-transform duration-500
                  group-hover:scale-105
                "
              />

              {/* Glassmorphic Fade-In Details Overlay */}
              <div className="
                absolute inset-0 
                bg-gradient-to-t from-black/95 via-black/50 to-transparent 
                flex flex-col justify-end p-6 
                opacity-90 md:opacity-0 group-hover:opacity-100 
                transition-all duration-350 ease-out
                translate-y-4 md:translate-y-6 group-hover:translate-y-0
              ">
                <span className="text-[10px] sm:text-xs text-orange-500 font-semibold tracking-wider uppercase mb-1">
                  {f.designation}
                </span>
                <h3 className="font-bold text-base sm:text-lg text-white leading-tight">
                  {f.faculty_name}
                </h3>
                <p className="text-xs text-gray-400 mt-2 font-medium">
                  Experience: {f.experience}
                </p>
                {f.skills && (
                  <p className="text-[11px] text-gray-500 mt-2 leading-relaxed line-clamp-2 border-t border-white/10 pt-2">
                    Skills: {f.skills}
                  </p>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
