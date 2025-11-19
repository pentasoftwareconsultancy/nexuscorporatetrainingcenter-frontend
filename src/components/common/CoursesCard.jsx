import React from "react";
import Button from "./Button";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../core/constants/routes.constant";

const CoursesCard = ({ logo, title, description, duration, categoryName }) => {
  const navigate = useNavigate();
  return (
    <div
      className="bg-twopointo text-one rounded-2xl p-6 border border-one font-sora
        transition-all duration-300 ease-in-out 
        hover:shadow-[0_0_25px_4px_rgba(255,111,0,0.6)] 
      hover:border-five flex flex-col justify-between min-h-[280px]"
    >
      <div>
        <h2 className="text-xl font-semibold mb-2"><span>{logo}</span>{title}</h2>
        <p className="text-towpointone text-sm mb-4 leading-relaxed">
          {description}
        </p>
      </div>
      <div className="flex items-center justify-between">
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