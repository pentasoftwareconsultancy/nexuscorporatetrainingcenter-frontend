import React from "react";
import { IoLogoWhatsapp } from "react-icons/io";
import { FaPhoneAlt } from "react-icons/fa";
import { FaMessage } from "react-icons/fa6";

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

  return (
    <div
      className="
        fixed right-2 sm:right-3 md:right-6 lg:right-8 
        bottom-8 sm:bottom-10 md:bottom-12 
        flex flex-col items-center 
        bg-[#FFF6EF] border border-[#e8d7c9]
        rounded-lg sm:rounded-xl md:rounded-2xl
        shadow-[inset_2px_2px_6px_rgba(0,0,0,0.55)]
        px-3 py-3 sm:px-4 sm:py-5 md:px-5 md:py-8 
        space-y-3 sm:space-y-5 md:space-y-8 
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
            className="text-[#0057FF] pulse-icon sm:size-[28px] md:size-[32px]"
          />
        </a>
      </div>

      {/* Call */}
      <div className="icon-wrapper" onClick={createRipple}>
        <a
          href="tel:+91 9545450788"
          className="cursor-pointer hover:scale-110 transition"
        >
          <FaPhoneAlt
            size={22}
            className="text-[#0057FF] pulse-icon sm:size-[26px] md:size-[30px]"
          />
        </a>
      </div>

      {/* Message */}
      <div className="icon-wrapper" onClick={createRipple}>
        <a href="#" className="cursor-pointer hover:scale-110 transition">
          <FaMessage
            size={26}
            className="text-[#0057FF] pulse-icon sm:size-[30px] md:size-[34px]"
          />
        </a>
      </div>
    </div>
  );
};

export default ButtonGroup;
