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
  const IconComponent = getIconBySubject(title);

  // 🧠 Generate unique custom highlights dynamically based on the course category and title
  const getHighlights = (catId) => {
    switch (Number(catId)) {
      case 1:
      case 5:
        return {
          mode: "Online & Classroom",
          exposure: "Full-Stack Capstone Projects",
          outcome: "Developer Portfolio & Placement Support"
        };
      case 4:
        return {
          mode: "Hands-on Hybrid Labs",
          exposure: "AWS/DevOps Cloud Architecture Labs",
          outcome: "Global Cloud Certification Ready"
        };
      case 3:
        return {
          mode: "Online & Classroom",
          exposure: "Selenium Automation & Manual Testing",
          outcome: "QA Engineer Placement Ready"
        };
      case 6:
        return {
          mode: "Live & Interactive Sessions",
          exposure: "Power BI, SQL & Analytics Datasets",
          outcome: "Certified Data Analyst Training"
        };
      case 8:
        return {
          mode: "Studio & Creative Lab",
          exposure: "UI/UX & Graphic Portfolio Creation",
          outcome: "Creative Agency & Studio Prepared"
        };
      case 7:
        return {
          mode: "Comprehensive Classroom",
          exposure: "Real-world Medical Chart Audits & ICD-10",
          outcome: "CPC / Certified Billing Specialist"
        };
      case 2:
      default:
        if (title?.toLowerCase().includes("sql") || title?.toLowerCase().includes("production")) {
          return {
            mode: "Interactive Labs",
            exposure: "SQL Database Queries & Production Shells",
            outcome: "Production L2 Support Certified"
          };
        }
        return {
          mode: "Online & Classroom",
          exposure: "Practical Corporate Case Studies",
          outcome: "Industry-Certified Placement Support"
        };
    }
  };

  const highlights = getHighlights(categoryId);

  return (
    <div
      className="relative bg-twopointo text-one rounded-4xl p-6 border-b-[0.5px] border-r-[0.5px] border-t-[1px] border-l-[1px] border-one font-sora
      transition-all duration-300 ease-in-out 
      hover:shadow-[0_0_30px_6px_rgba(255,111,0,0.8)]
      hover:border-five
      hover:scale-105
      flex flex-col justify-between w-full h-full min-h-[280px] z-2"
    >
      <div className="z-5">
        <h2 className="text-xl font-semibold mb-2 flex items-center gap-2">
          {IconComponent && <IconComponent size={24} className="text-five" />}
          {title}
        </h2>

        <p className="text-towpointone text-sm mb-3 leading-relaxed">
          {description}
        </p>

        {/* Premium Unique Highlights Content */}
        <div className="mt-3 space-y-2 text-xs text-towpointone border-t border-one/15 pt-3">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 bg-five rounded-full"></span>
            <span>Training Mode: <strong className="text-white font-semibold">{highlights.mode}</strong></span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 bg-five rounded-full"></span>
            <span>Exposure: <strong className="text-white font-semibold">{highlights.exposure}</strong></span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 bg-five rounded-full"></span>
            <span>Outcome: <strong className="text-white font-semibold">{highlights.outcome}</strong></span>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between z-5 mt-3 border-t border-one/10 pt-3">
        <p className="text-xs font-semibold text-one">Duration: {duration}</p>
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
