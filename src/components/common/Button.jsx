import React from "react";

const Button = ({ text, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="
        relative
        flex
        justify-center
        items-center
        gap-1
        bg-white
        rounded-full 
        text-gray-600  
        cursor-pointer 
        text-lg 
        px-5 py-3
        transition-all 
        duration-200 
        ease-in-out 
        border-2 
        border-gray-300
        shadow-[inset_1px_2px_0_#bcbcbc,inset_-2px_-2px_0_#ffffff,1px_2px_0_#bcbcbc,-2px_-1px_0_#ffffff]
        focus:outline-none
        overflow-hidden
      "
    >
      {/* Fading Top Border */}
      <div className="absolute top-0 left-1/2 w-2/3 h-[3px] bg-gradient-to-r from-transparent via-orange-500 to-transparent transform -translate-x-1/2"></div>
      
      {/* Fading Bottom Border */}
      <div className="absolute bottom-0 left-1/2 w-2/3 h-[3px] bg-gradient-to-r from-transparent via-orange-500 to-transparent transform -translate-x-1/2"></div>

      {/* Text */}
      <span className="relative z-10 text-[15px] font-[600] tracking-tight leading-none">
        {text}
      </span>

      {/* Circular Arrow Icon */}
      <span className="relative z-10 flex items-center justify-center bg-gradient-to-br from-[#ff4d00] to-[#ff5100] rounded-full w-[26px] h-[26px] shadow-md hover:scale-105 transition-transform duration-300">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-[13px] h-[13px] text-white"
          fill="none"
          viewBox="0 0 28 28"
          stroke="currentColor"
          strokeWidth={3}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M7 17l10-10M7 7h10v10"
          />
        </svg>
      </span>
    </button>
  );
};

export default Button;