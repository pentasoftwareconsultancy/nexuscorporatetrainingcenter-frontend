import React from 'react'
import { IoLogoWhatsapp } from "react-icons/io";
import { FaPhoneAlt } from "react-icons/fa";
import { FaMessage } from "react-icons/fa6";

const ButtonGroup = () => {
  return (
    <div
      className="
        fixed right-0 bottom-12 flex flex-col items-center 
        bg-[#FFF6EF] border border-[#e8d7c9] rounded-2xl
        rounded-1 shadow-[inset_2px_2px_6px_rgba(0,0,0,0.55)]
        px-5 py-8 space-y-8 z-50
      "
    >
      {/* WhatsApp */}
      <a
        href="https://wa.me/1234567890"
        target="_blank"
        rel="noreferrer"
        className="cursor-pointer hover:scale-110 transition"
      >
        <IoLogoWhatsapp size={30} className="text-[#0057FF]" />
      </a>

      {/* Call */}
      <a
        href="tel:+911234567890"
        className="cursor-pointer hover:scale-110 transition"
      >
        <FaPhoneAlt size={27} className="text-[#0057FF]" />
      </a>

      {/* Message */}
      <a href="#" className="cursor-pointer hover:scale-110 transition">
        <FaMessage size={32} className="text-[#0057FF]" />
      </a>
    </div>
  );
};

export default ButtonGroup