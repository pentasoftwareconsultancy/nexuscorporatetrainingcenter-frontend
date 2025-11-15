import React from "react";

const Button = ({ text, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="flex gap-3 cursor-pointer text-black font-semibold bg-gradient-to-r from-white to-[#b9b6b6] px-5 py-3 font-bold
        rounded-full border border-gray-600 hover:scale-105 duration-200 hover:text-white hover:border-gray-800 text-sm
        hover:from-black hover:to-gray-900 items-center"
    >
      {text}
      <span className="relative z-10 flex items-center justify-center bg-gradient-to-br from-[#ff4d00] to-[#ff5100] 
        rounded-full w-[28px] h-[28px] shadow-md hover:scale-105 transition-transform duration-300"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-[18px] h-[18px] text-white"
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
