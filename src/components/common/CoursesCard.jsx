import React from "react";
import Button from "./Button";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../core/constants/routes.constant";

const CoursesCard = ({ id, title, description, duration, categoryName }) => {
  const navigate = useNavigate();
  return (
    <div
      className="bg-[#1a1a1a] text-gray-200 rounded-2xl p-6 border border-[#2b2b2b] 
                 transition-all duration-300 ease-in-out 
                 hover:shadow-[0_0_25px_4px_rgba(255,111,0,0.6)] 
                 hover:border-orange-500 
                 flex flex-col justify-between min-h-[280px]"
    >
      <div>
        <h2 className="text-xl font-semibold mb-2 text-white">{title}</h2>
        <p className="text-gray-300 text-sm mb-4 leading-relaxed">
          {description}
        </p>
      </div>
      <div className="flex items-center justify-between">
        <p className="text-white text-sm font-bold">Duration: {duration}</p>
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
