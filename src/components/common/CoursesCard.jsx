import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../core/constants/routes.constant";
import { getIconBySubject } from "../../core/utils/iconMap";

// ── All course images
import img_ai            from "../../assets/courses/ai.jpg";
import img_angular       from "../../assets/courses/angular.jpg";
import img_angular1      from "../../assets/courses/angular1.jpg";
import img_aws           from "../../assets/courses/aws.jpg";
import img_azure         from "../../assets/courses/azure.jpg";
import img_bizanalyst    from "../../assets/courses/business_analyst.jpg";
import img_csharp        from "../../assets/courses/Csharp_and_dotnet.jpg";
import img_cloud         from "../../assets/courses/cloudcomputing.jpg";
import img_dataanalytics from "../../assets/courses/dataanalytics.jpg";
import img_datascience   from "../../assets/courses/datascience.jpg";
import img_datascimath   from "../../assets/courses/datasciencemathematical.jpg";
import img_devopscloud   from "../../assets/courses/devopscloud.jpg";
import img_core_engine   from "../../assets/courses/Core_engine.jpg";
import img_fullstack_dev from "../../assets/courses/Full_stack_developer.jpg";
import img_fullstack_net from "../../assets/courses/full_stack_.net_developer.jpg";
import img_java          from "../../assets/courses/java.jpg";
import img_mern          from "../../assets/courses/Mern_stack_developer.jpg";
import img_3d_anim       from "../../assets/courses/3d_animation.jpg";
import img_auto_test     from "../../assets/courses/Auto_testing.jpg";
import img_db_test       from "../../assets/courses/database_testing.jpg";
import img_med_coding    from "../../assets/courses/Medical_coding.jpg";
import img_mob_test      from "../../assets/courses/Mobile_testing.jpg";
import img_networking    from "../../assets/courses/Netwoking.jpg";
import img_osi_soft      from "../../assets/courses/OSI_soft.jpg";
import img_powerbi       from "../../assets/courses/powerbisql.jpg";
import img_python        from "../../assets/courses/python.jpg";
import img_react         from "../../assets/courses/React.jpg";
import img_salesforce    from "../../assets/courses/sales_force.jpg";
import img_scrum         from "../../assets/courses/Scrum_master.jpg";
import img_selenium      from "../../assets/courses/selenium.jpg";
import img_softskill     from "../../assets/courses/soft_skill.jpg";
import img_sys_test      from "../../assets/courses/system_testing.jpg";
import img_tableau       from "../../assets/courses/tableausql.jpg";
import img_tosca         from "../../assets/courses/tosca.jpg";
import img_web_test      from "../../assets/courses/Web_tesing.jpg";

// ── Exact course ID → image
const COURSE_ID_MAP = {
  1:  img_fullstack_dev,
  2:  img_mern,
  3:  img_python,
  4:  img_java,
  5:  img_csharp,
  6:  img_react,
  7:  img_fullstack_net,
  8:  img_core_engine,
  9:  img_aws,
  10: img_devopscloud,
  11: img_cloud,
  12: img_azure,
  13: img_networking,
  14: img_aws,
  15: img_aws,
  16: img_selenium,
  17: img_web_test,
  18: img_auto_test,
  19: img_db_test,
  20: img_mob_test,
  21: img_sys_test,
  22: img_powerbi,
  23: img_datascience,
  24: img_datascimath,
  25: img_bizanalyst,
  26: img_angular,
  27: img_3d_anim,
  28: img_salesforce,
  29: img_angular1,
  30: img_dataanalytics,
  31: img_med_coding,
  32: img_ai,
  33: img_ai,
  34: img_bizanalyst,
  35: img_datascimath,
  36: img_osi_soft,
  37: img_softskill,
  38: img_networking,
  39: img_salesforce,
  40: img_tosca,
  41: img_scrum,
  42: img_cloud,
  43: img_devopscloud,
  44: img_tableau,
};

const getImageByTitle = (title, categoryId, courseId) => {
  if (courseId && COURSE_ID_MAP[Number(courseId)]) return COURSE_ID_MAP[Number(courseId)];
  const catFallback = {
    1: img_fullstack_dev, 5: img_fullstack_net,
    4: img_devopscloud,   3: img_selenium,
    6: img_datascience,   8: img_angular1,
    7: img_ai,            2: img_salesforce,
  };
  return catFallback[Number(categoryId)] || img_fullstack_dev;
};

const CATEGORY_ACCENT = {
  1: "#60a5fa", 5: "#818cf8",
  4: "#fb923c",
  3: "#34d399",
  6: "#c084fc",
  8: "#f472b6",
  7: "#22d3ee",
  2: "#94a3b8",
  default: "#FF6A00",
};

const getHighlights = (catId, title) => {
  switch (Number(catId)) {
    case 1: case 5:
      return { mode: "Online & Classroom", exposure: "Full-Stack Capstone Projects", outcome: "Developer Portfolio & Placement Support" };
    case 4:
      return { mode: "Hands-on Hybrid Labs", exposure: "AWS/DevOps Cloud Architecture Labs", outcome: "Global Cloud Certification Ready" };
    case 3:
      return { mode: "Online & Classroom", exposure: "Selenium Automation & Manual Testing", outcome: "QA Engineer Placement Ready" };
    case 6:
      return { mode: "Live & Interactive Sessions", exposure: "Power BI, SQL & Analytics Datasets", outcome: "Certified Data Analyst Training" };
    case 8:
      return { mode: "Studio & Creative Lab", exposure: "UI/UX & Graphic Portfolio Creation", outcome: "Creative Agency & Studio Prepared" };
    case 7:
      return { mode: "Comprehensive Classroom", exposure: "Real-world Medical Chart Audits & ICD-10", outcome: "CPC / Certified Billing Specialist" };
    case 2:
    default:
      if (title?.toLowerCase().includes("sql") || title?.toLowerCase().includes("production"))
        return { mode: "Interactive Labs", exposure: "SQL Database Queries & Production Shells", outcome: "Production L2 Support Certified" };
      return { mode: "Online & Classroom", exposure: "Practical Corporate Case Studies", outcome: "Industry-Certified Placement Support" };
  }
};

const CoursesCard = ({ logo, title, description, duration, id, categoryId }) => {
  const navigate = useNavigate();
  const [hovered, setHovered] = useState(false);
  const IconComponent = getIconBySubject(title);
  const highlights = getHighlights(categoryId, title);
  const catNum = Number(categoryId);
  const accent = CATEGORY_ACCENT[catNum] || CATEGORY_ACCENT.default;
  const ORANGE = CATEGORY_ACCENT.default;
  const image = logo || getImageByTitle(title, categoryId, id);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocus={() => setHovered(true)}
      onBlur={() => setHovered(false)}
      className="group relative flex flex-col w-full rounded-2xl overflow-hidden bg-[#0d0d0d] border border-white/8 transition-all duration-150 hover:-translate-y-2 font-sora cursor-pointer"
      style={{
        minWidth: 0,
        borderColor: hovered ? `${ORANGE}60` : undefined,
        boxShadow: hovered ? `0 6px 30px ${ORANGE}22, 0 0 0 4px ${ORANGE}22` : undefined,
        transition: 'box-shadow 220ms ease, border-color 220ms ease, transform 220ms ease',
        zIndex: hovered ? 20 : undefined,
      }}
    >
      {/* ── Shimmer border animation on hover ── */}
      <div
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-10"
        style={{
          background: `linear-gradient(135deg, ${ORANGE}22 0%, transparent 50%, ${ORANGE}11 100%)`,
        }}
      />

      {/* ── Top accent line ── */}
      <div
        className="absolute top-0 left-0 w-full h-[2px] z-10"
        style={{ background: `linear-gradient(to right, ${accent}, transparent)` }}
      />

      {/* Hover overlay (orange) */}
      <div
        className="absolute inset-0 rounded-2xl pointer-events-none transition-opacity duration-200 z-5"
        style={{
          opacity: hovered ? 1 : 0,
          background: `linear-gradient(180deg, ${ORANGE}18 0%, ${ORANGE}08 100%)`,
          mixBlendMode: 'overlay',
        }}
      />

      {/* ── IMAGE ── */}
      <div className="relative h-48 overflow-hidden shrink-0">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-500"
          style={{ transform: hovered ? 'scale(1.12)' : undefined }}
          onError={(e) => { e.target.src = img_fullstack_dev; }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0d0d0d] via-black/20 to-transparent" />

        {/* duration pill */}
        <div className="absolute top-2 right-2 flex items-center gap-1 px-2 py-0.5 rounded-full bg-black/70 backdrop-blur-sm border border-white/10">
          <svg className="w-2 h-2" style={{ color: accent }} fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
          </svg>
          <span className="text-[9px] font-semibold text-white">{duration}</span>
        </div>

        {/* icon badge */}
        <div
          className="absolute bottom-2 left-3 w-8 h-8 rounded-xl flex items-center justify-center bg-black/70 backdrop-blur-sm border border-white/10 group-hover:scale-110 transition-transform duration-300"
          style={{ boxShadow: `0 0 12px ${accent}50` }}
        >
          {IconComponent && <IconComponent size={16} style={{ color: accent }} />}
        </div>
      </div>

      {/* ── BODY ── */}
      <div className="flex flex-col flex-1 px-3.5 pt-4 pb-4 gap-2.5">

        {/* Title */}
        <h2 className="font-bold text-[15px] leading-snug line-clamp-2" style={{ color: hovered ? ORANGE : undefined }}>
          {title}
        </h2>

        {/* Description */}
        <p className="text-gray-300 text-[12px] leading-relaxed line-clamp-2">
          {description}
        </p>

        {/* Highlights */}
        <div className="space-y-1 pt-2 border-t border-white/5">
          {[
            { label: "Mode",     value: highlights.mode },
            { label: "Exposure", value: highlights.exposure },
            { label: "Outcome",  value: highlights.outcome },
          ].map(({ label, value }) => (
            <div key={label} className="flex items-start gap-1.5">
              <span className="mt-[4px] w-1 h-1 rounded-full shrink-0" style={{ backgroundColor: accent }} />
              <p className="text-[11px] text-gray-300 leading-snug">
                {label}: <span className="text-gray-400 font-medium">{value}</span>
              </p>
            </div>
          ))}
        </div>

        {/* ── FOOTER ── */}
        <div className="flex items-center justify-between pt-2 mt-auto border-t border-white/5">
          <div className="flex items-center gap-0.5">
            <span className="w-1 h-1 rounded-full" style={{ backgroundColor: ORANGE }} />
            <span className="w-1 h-1 rounded-full opacity-50" style={{ backgroundColor: ORANGE }} />
            <span className="w-1 h-1 rounded-full opacity-20" style={{ backgroundColor: ORANGE }} />
          </div>
          <button
            onClick={() => navigate(ROUTES.COURSE_DETAILS.replace(":categoryId", categoryId))}
            className="flex items-center gap-1 text-[11px] font-semibold px-3 py-1 rounded-full border transition-all duration-200 cursor-pointer"
            style={{ color: ORANGE, borderColor: `${ORANGE}40`, backgroundColor: `${ORANGE}10` }}
            onMouseEnter={e => e.currentTarget.style.backgroundColor = `${ORANGE}22`}
            onMouseLeave={e => e.currentTarget.style.backgroundColor = `${ORANGE}10`}
          >
            Know more
            <svg xmlns="http://www.w3.org/2000/svg" className="w-2.5 h-2.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7M17 7H7M17 7V17" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default CoursesCard;
