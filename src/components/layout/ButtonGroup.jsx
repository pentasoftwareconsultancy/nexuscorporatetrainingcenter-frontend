import React from "react";
import { IoLogoWhatsapp } from "react-icons/io";
import { Bot } from "lucide-react";

const ButtonGroup = () => {
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

  return (
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

      {/* WhatsApp */}
      <div className="icon-wrapper" onClick={createRipple}>
        <a
          href="https://wa.me/9545450788"
          target="_blank"
          rel="noreferrer"
          className="cursor-pointer hover:scale-110 transition"
        >
          <IoLogoWhatsapp
            size={24}
            className="text-[#25D366] sm:size-[28px] md:size-[32px] transition-transform duration-300"
          />
        </a>
      </div>

      {/* AI Assistant */}
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
  );
};

export default ButtonGroup;
