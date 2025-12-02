import React from "react";

const Button = ({ 
  text, 
  onClick, 
  className = "", 
  showIcon = true,   // 👈 NEW PROP to hide/show the <span>
  type = "button"
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      style={{
        borderTop: "2px solid transparent",
        borderBottom: "2px solid transparent",
        borderImage:
          "linear-gradient(to right, transparent, #f97316, transparent) 2"
      }}
      className={`
        flex bg-one shadow-[inset_2px_2px_6px_rgba(0,0,0,0.75)] border-2
        rounded-full px-6 py-3 gap-3 text-three items-center justify-center
        ${className}   // 👈 YOUR CUSTOM CLASSES HERE
      `}
    >
      {text}

      {/* 👇 ICON SHOWN ONLY WHEN showIcon=true */}
      {showIcon && (
        <span
          className="relative z-10 flex items-center justify-center 
            bg-five rounded-full w-[28px] h-[28px] shadow-md
            hover:scale-105 transition-transform duration-300"
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
      )}
    </button>
  );
};

export default Button;
