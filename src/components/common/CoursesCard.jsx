import React from "react";

const CoursesCard = ({ title, description, image, onClick, location, children }) => {
  return (
    <div
      onClick={onClick}
      className="
        relative
        flex flex-col justify-between
        rounded-2xl
        cursor-pointer
        overflow-hidden
        border-2
        min-w-[320px]
        text-white
        transition-all duration-300 ease-in-out
        hover:scale-[1.02]
        group
      "
    >
      {/* Image */}
      {image && (
        <div className="w-full h-48 overflow-hidden">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>
      )}

      {/* Content */}
      <div className="p-5 flex flex-col gap-2 text-left">
        <h3 className="text-lg font-semibold text-white">{title}</h3>
        <p className="text-sm text-white leading-snug">{description}</p>
        <p className="text-sm text-white leading-snug">{location}</p>
      </div>

      {/* Bottom Button / Icon Section */}
      {children && (
        <div className="flex justify-center items-center pb-4">
          {children}
        </div>
      )}
    </div>
  );
};

export default CoursesCard;
