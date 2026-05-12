// CoursesCard.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../core/constants/routes.constant";

// 🔥 IMPORT getIconBySubject
import { getIconBySubject } from "../../core/utils/iconMap";

const CoursesCard = ({
  logo,
  title,
  description,
  duration,
  id,
  categoryId,
}) => {
  const navigate = useNavigate();
  // console.log("categoryId in CoursesCard:", categoryId);
  // 🧠 Convert subject/title name to actual React icon
  const IconComponent = getIconBySubject(title);

  return (
    <div
      className="relative bg-twopointo text-one rounded-4xl p-6 border-b-[0.5px] border-r-[0.5px] border-t-[1px] border-l-[1px] border-one font-sora
      transition-all duration-300 ease-in-out 
      hover:shadow-[0_0_30px_6px_rgba(255,111,0,0.8)]
      hover:border-five
      hover:scale-105
      flex flex-col justify-between w-full h-full min-h-[260px] z-2"
    >
      <div className="z-5">
        <h2 className="text-xl font-semibold mb-2 flex items-center gap-2">
          {IconComponent && <IconComponent size={24} />}
          {title}
        </h2>

        <p className="text-towpointone text-sm mb-2 leading-relaxed">
          {description}
        </p>
      </div>

      <div className="flex items-center justify-between z-5 mt-2">
        <p className="text-xs font-semibold text-one">Duration- {duration}</p>
        <button
          onClick={() =>
            navigate(ROUTES.COURSE_DETAILS.replace(":categoryId", categoryId))
          }
          className="text-five hover:text-orange-400 font-normal text-xs flex items-center gap-1 group transition-colors duration-300 cursor-pointer"
        >
          <span className="relative">
            Know more
            <span className="absolute left-0 -bottom-[2px] w-0 h-[1.5px] bg-five group-hover:w-full transition-all duration-300"></span>
          </span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-3.5 h-3.5 transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2.5}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M7 17L17 7M17 7H7M17 7V17"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default CoursesCard;
