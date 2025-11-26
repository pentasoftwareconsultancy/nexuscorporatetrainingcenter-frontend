// CoursesCard.jsx
import React from "react";
import Button from "./Button";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../core/constants/routes.constant";

// 🔥 IMPORT getIconByName
import { getIconByName } from "../../core/utils/iconMap";

const CoursesCard = ({ logo, title, description, duration, categoryName }) => {
  const navigate = useNavigate();

  // 🧠 Convert logo string to actual React icon
  const IconComponent = getIconByName(logo);

  return (
    <div
      className="relative bg-twopointo text-one rounded-2xl p-6 border border-one font-sora
      transition-all duration-300 ease-in-out 
      hover:shadow-[0_0_30px_6px_rgba(255,111,0,0.8)]
      hover:border-five
      hover:scale-105
      flex flex-col justify-between min-h-[325px] z-2"
    >
       <div className="absolute bottom-0 right-0 w-6 h-6 bg-twopointo rounded-2xl z-3"></div>
      <div className="z-5">
        <h2 className="text-xl font-semibold mb-2 flex items-center gap-2">
          {IconComponent && <IconComponent size={24} />}
          {title}
        </h2>

        <p className="text-towpointone text-sm mb-4 leading-relaxed">
          {description}
        </p>
      </div>

      <div className="flex items-center justify-between z-5">
        <p className="text-sm font-bold">Duration: {duration}</p>
        <Button
          text="Know more"
          onClick={() =>
            navigate(
              ROUTES.COURSE_DETAILS.replace(":categoryName", categoryName)
            )
          }
        />
      </div>
    </div>
  );
};

export default CoursesCard;
