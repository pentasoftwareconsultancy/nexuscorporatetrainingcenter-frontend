import React, { useState } from "react";
import { IoLogoWhatsapp } from "react-icons/io";
import { Bot, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const courseOptions = [
  "Software Development",
  "Cloud & DevOps",
  "Software Testing / QA",
  "Data & Analytics",
  "Design & Marketing",
  "Healthcare & Others"
];

const ButtonGroup = () => {
  const [isWhatsAppOpen, setIsWhatsAppOpen] = useState(false);
  const [selectedCourses, setSelectedCourses] = useState({});
  const [userMessage, setUserMessage] = useState("");

  const createRipple = (event) => {
    const btn = event.currentTarget;
    const circle = document.createElement("span");
    const diameter = Math.max(btn.clientWidth, btn.clientHeight);
    const radius = diameter / 2;

    circle.style.width = circle.style.height = `${diameter}px`;
    circle.style.left = `${event.clientX - btn.offsetLeft - radius}px`;
    circle.style.top = `${event.clientY - btn.offsetTop - radius}px`;
    circle.classList.add("ripple");

    const ripple = btn.getElementsByClassName("ripple")[0];
    if (ripple) ripple.remove();

    btn.appendChild(circle);
  };

  const handleMessageClick = (event) => {
    event.preventDefault();
    createRipple(event);
    window.dispatchEvent(new CustomEvent("toggle-ai-assistant"));
  };

  const handleCheckboxChange = (course) => {
    setSelectedCourses((prev) => ({
      ...prev,
      [course]: !prev[course],
    }));
  };

  const handleWhatsAppSubmit = () => {
    const selected = Object.keys(selectedCourses).filter((k) => selectedCourses[k]);
    
    let msg = "Greetings! I would like to get details about the following courses:\n";
    if (selected.length > 0) {
      selected.forEach((course) => {
        msg += `• ${course}\n`;
      });
    } else {
      msg += "• General Query (No specific course selected)\n";
    }
    
    if (userMessage.trim()) {
      msg += `\nMessage: ${userMessage.trim()}`;
    }
    
    const url = `https://wa.me/9545450788?text=${encodeURIComponent(msg)}`;
    window.open(url, "_blank");
    
    // Reset inputs and close popover
    setUserMessage("");
    setSelectedCourses({});
    setIsWhatsAppOpen(false);
  };

  return (
    <>
      {/* Click-outside backdrop */}
      <AnimatePresence>
        {isWhatsAppOpen && (
          <div 
            className="fixed inset-0 z-40 bg-black/10 backdrop-blur-[1px]"
            onClick={() => setIsWhatsAppOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* WhatsApp Custom Interactive Popover */}
      <AnimatePresence>
        {isWhatsAppOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 15 }}
            transition={{ duration: 0.2 }}
            className="fixed right-4 sm:right-6 bottom-[170px] sm:bottom-[200px] z-50 w-[320px] sm:w-[350px] rounded-2xl overflow-hidden shadow-[0_12px_40px_rgba(0,0,0,0.35)] border border-white/10 bg-[#eae6df] flex flex-col font-sans select-none"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='80' height='80' viewBox='0 0 80 80'%3E%3Cg fill='%239C92AC' fill-opacity='0.04'%3E%3Cpath fill-rule='evenodd' d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm1-61c3.148 0 5.7-2.552 5.7-5.7 0-3.148-2.552-5.7-5.7-5.7-3.148 0-5.7 2.552-5.7 5.7 0 3.148 2.552 5.7 5.7 5.7zm50 17c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM9 53c3.148 0 5.7-2.552 5.7-5.7 0-3.148-2.552-5.7-5.7-5.7-3.148 0-5.7 2.552-5.7 5.7 0 3.148 2.552 5.7 5.7 5.7zm58 20c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM28 76c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7z'/%3E%3C/g%3E%3C/svg%3E")`,
              backgroundRepeat: "repeat",
            }}
          >
            {/* Popover Header */}
            <div className="bg-[#0b6656] p-4 flex items-center justify-between text-white relative">
              <div className="flex items-center gap-3">
                {/* White circle avatar with Nexus logo */}
                <div className="w-10 h-10 rounded-full flex items-center justify-center bg-white shadow-md shrink-0 border border-gray-100 select-none">
                  <span className="text-[#111] font-extrabold text-[9px] font-playfair tracking-tighter">NE</span>
                  <span className="text-orange-500 pt-0.5 mx-0.5 shrink-0 flex items-center">
                    <svg width="15" height="13" viewBox="0 0 40 34" fill="none">
                      <path d="M31.5408 0.000221879L39.5234 0.00080831L34.5562 2.77579C33.3436 3.45323 32.2854 4.37587 31.4491 5.4849L12.364 30.7934C11.2302 32.2968 9.45642 33.1808 7.57341 33.1808H-0.000190735L5.03663 30.275C6.22264 29.5907 7.25551 28.6702 8.07121 27.5704L26.7213 2.42583C27.8531 0.899828 29.6409 8.23028e-05 31.5408 0.000221879Z" fill="#FF6A00" />
                      <path d="M7.98262 0.000221879L0 0.00080831L4.96721 2.77579C6.17983 3.45323 7.23802 4.37587 8.07433 5.4849L27.1595 30.7934C28.2932 32.2968 30.067 33.1808 31.95 33.1808H39.5236L34.4868 30.275C33.3008 29.5907 32.2679 28.6702 31.4522 27.5704L12.8022 2.42583C11.6703 0.899828 9.88257 8.23028e-05 7.98262 0.000221879Z" fill="#FF6A00" />
                    </svg>
                  </span>
                  <span className="text-[#111] font-extrabold text-[9px] font-playfair tracking-tighter">US</span>
                </div>
                <div>
                  <h4 className="font-semibold text-sm leading-tight text-white">Nexus Center</h4>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <span className="w-1.5 h-1.5 bg-[#25d366] rounded-full animate-pulse" />
                    <span className="text-[11px] text-white/80">Replies within few hours</span>
                  </div>
                </div>
              </div>
              <button 
                onClick={() => setIsWhatsAppOpen(false)}
                className="w-8 h-8 rounded-full flex items-center justify-center text-white/80 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
              >
                <X size={16} />
              </button>
            </div>

            {/* Popover Body */}
            <div className="p-4 flex flex-col gap-3.5 max-h-[260px] overflow-y-auto">
              {/* Greeting Bubble */}
              <div className="self-start bg-white text-gray-800 p-3 rounded-2xl rounded-tl-none text-xs sm:text-sm shadow-sm max-w-[90%] leading-relaxed">
                Greetings! Please let us know which course you are looking for?
              </div>

              {/* Checkboxes Card Bubble */}
              <div className="self-start bg-white p-3.5 rounded-2xl rounded-tl-none shadow-sm max-w-[90%] w-full">
                <div className="flex flex-col gap-2.5">
                  {courseOptions.map((course) => (
                    <label 
                      key={course}
                      className="flex items-center gap-2.5 text-xs sm:text-sm text-gray-700 hover:text-gray-950 cursor-pointer select-none"
                    >
                      <input
                        type="checkbox"
                        checked={!!selectedCourses[course]}
                        onChange={() => handleCheckboxChange(course)}
                        className="w-4 h-4 rounded border-gray-300 accent-[#0b6656] text-[#0b6656] focus:ring-[#0b6656] cursor-pointer shrink-0"
                      />
                      <span className="font-medium">{course}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            {/* Popover Footer */}
            <div className="bg-[#f0f0f0] p-3 border-t border-gray-200/50 flex flex-col gap-2">
              <input
                type="text"
                placeholder="Type a message..."
                value={userMessage}
                onChange={(e) => setUserMessage(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    handleWhatsAppSubmit();
                  }
                }}
                className="w-full bg-white text-gray-800 border border-gray-200 rounded-xl px-4 py-2.5 text-xs sm:text-sm focus:outline-none focus:ring-1 focus:ring-[#075e54] shadow-inner placeholder-gray-400"
              />
              <button
                onClick={handleWhatsAppSubmit}
                className="w-full h-10 bg-[#25d366] hover:bg-[#20ba59] active:scale-[0.98] text-white text-sm font-semibold rounded-xl flex items-center justify-center gap-1.5 transition-all shadow-[0_2px_8px_rgba(37,211,102,0.3)] cursor-pointer"
              >
                Submit
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Button Group Pill Container */}
      <div
        className="
          fixed right-2 sm:right-2 md:right-2 lg:right-2 
          bottom-8 sm:bottom-10 md:bottom-12 
          flex flex-col items-center 
          glass-luxury rounded-full
          px-1.5 py-3 sm:px-1.5 sm:py-3.5 md:px-2 md:py-4 
          space-y-3 sm:space-y-4 md:space-y-5 
          z-50
        "
      >
        {/* === INLINE ANIMATIONS CSS === */}
        <style>
          {`
            /* Pulse animation */
            .pulse-icon {
              animation: pulseAnim 1.6s infinite ease-in-out;
            }
            @keyframes pulseAnim {
              0% { transform: scale(1); opacity: 1; }
              50% { transform: scale(1.12); opacity: 0.85; }
              100% { transform: scale(1); opacity: 1; }
            }

            /* Ripple animation */
            .ripple {
              position: absolute;
              border-radius: 50%;
              transform: scale(0);
              animation: rippleEffect 0.6s linear;
              background: rgba(0, 87, 255, 0.4);
              pointer-events: none;
            }

            @keyframes rippleEffect {
              to {
                transform: scale(4);
                opacity: 0;
              }
            }

            /* Icon wrapper for ripple */
            .icon-wrapper {
              position: relative;
              overflow: hidden;
              display: flex;
              justify-content: center;
              align-items: center;
            }
          `}
        </style>

        {/* WhatsApp Icon */}
        <div 
          className="icon-wrapper cursor-pointer hover:scale-110 transition"
          onClick={(e) => {
            createRipple(e);
            setIsWhatsAppOpen(!isWhatsAppOpen);
          }}
        >
          <IoLogoWhatsapp
            size={24}
            className="text-[#25D366] sm:size-[28px] md:size-[32px] transition-transform duration-300"
          />
        </div>

        {/* AI Assistant Icon */}
        <div className="icon-wrapper" onClick={handleMessageClick}>
          <button
            className="cursor-pointer hover:scale-[1.02] transition-all duration-300 bg-gradient-to-tr from-[#E67A68] to-[#5E71E4] rounded-full h-10 sm:h-12 flex items-center justify-center border-none outline-none relative shadow-md group px-2 sm:px-2.5"
            title="Chat with AI Assistant"
          >
            <div className="relative flex items-center justify-center shrink-0 w-6 h-6 sm:w-7 sm:h-7">
              <Bot className="text-white w-full h-full" strokeWidth={2.2} />
              <span className="absolute -top-1 -right-1 w-3 h-3 sm:w-3.5 sm:h-3.5 bg-[#1FA463] rounded-full border-[2px] border-[#4b5bc2]" />
            </div>
            <span className="max-w-0 overflow-hidden group-hover:max-w-[120px] transition-all duration-300 ease-out font-medium text-xs sm:text-sm text-white whitespace-nowrap pl-0 group-hover:pl-2">
              Ask anything
            </span>
          </button>
        </div>
      </div>
    </>
  );
};

export default ButtonGroup;

