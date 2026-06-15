import React, { useEffect, useState } from "react";
import { useParams, useNavigate, useSearchParams } from "react-router-dom";
import {
  FaUser,
  FaClock,
  FaPhone,
  FaChevronLeft,
  FaCheckCircle,
  FaBookOpen,
  FaGraduationCap,
  FaArrowRight,
} from "react-icons/fa";
import { FaMoneyBill1Wave } from "react-icons/fa6";
import { IoMdDownload } from "react-icons/io";
import { MdOutlineSchool } from "react-icons/md";
import { ROUTES } from "../../core/constants/routes.constant";
import ApiService from "../../core/services/api.service";
import ServerUrl from "../../core/constants/serverURL.constant";
import Button from "../../components/common/Button";

// ── Brand colours
const ORANGE = "#FF6A00";
const ORANGE_DARK = "#c94d00";

// ── Splits a dot-separated string into clean items
const splitToItems = (text) => {
  if (!text) return [];
  return text.split(".").map((s) => s.trim()).filter(Boolean);
};

// ────────────────────────────────────────
//  Loading Skeleton
// ────────────────────────────────────────
const LoadingSkeleton = () => (
  <div className="min-h-screen text-white px-4 sm:px-8 md:px-14 py-10 font-sora animate-pulse bg-gradient-to-br from-[#05112d] via-[#01040f] to-[#000000]">
    <div className="h-5 w-32 bg-white/10 rounded-full mb-10" />
    <div className="h-14 w-3/4 bg-white/10 rounded-2xl mb-4" />
    <div className="h-3 w-24 bg-white/5 rounded mb-10" />
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
      {[...Array(4)].map((_, i) => <div key={i} className="h-24 bg-white/5 rounded-2xl" />)}
    </div>
    <div className="h-32 bg-white/5 rounded-3xl mb-6" />
    <div className="grid grid-cols-2 gap-4 mb-6">
      {[...Array(6)].map((_, i) => <div key={i} className="h-8 bg-white/5 rounded-lg" />)}
    </div>
    <div className="h-52 bg-white/5 rounded-3xl" />
  </div>
);

// ────────────────────────────────────────
//  Section Heading
// ────────────────────────────────────────
const SectionHeading = ({ icon, label, badge, className = "mb-6" }) => (
  <div className={`flex flex-wrap items-center gap-3 ${className}`}>
    <span
      className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
      style={{ backgroundColor: `${ORANGE}20`, color: ORANGE, border: `1px solid ${ORANGE}40` }}
    >
      {icon}
    </span>
    <h3 className="text-sm sm:text-base font-bold text-white uppercase tracking-widest">
      {label}
    </h3>
    {badge != null && (
      <span
        className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full"
        style={{ backgroundColor: `${ORANGE}18`, color: ORANGE, border: `1px solid ${ORANGE}35` }}
      >
        {badge}
      </span>
    )}
  </div>
);

// ────────────────────────────────────────
//  Single Course Card
// ────────────────────────────────────────
const CourseSection = ({ course, onContact }) => {
  const learnItems = splitToItems(course.details?.what_you_will_learn);
  const syllabusItems = splitToItems(course.details?.syllabus);

  const handlePdfDownload = async () => {
    try {
      const response = await fetch(course.details.syllabus_pdf);
      const blob = await response.blob();
      const link = document.createElement("a");
      link.href = window.URL.createObjectURL(blob);
      link.download = `${course.title}-syllabus.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (e) {
      console.error("PDF download failed", e);
    }
  };

  const stats = [
    { icon: <FaUser size={15} />, label: "Instructor", value: course.details?.instructor || "N/A" },
    { icon: <FaClock size={15} />, label: "Duration", value: course.duration || "N/A" },
    { icon: <FaMoneyBill1Wave size={15} />, label: "Fees", value: course.fees || "N/A" },
    { icon: <FaPhone size={15} />, label: "Contact", value: course.contact || "N/A" },
  ];

  return (
    <div
      className="rounded-3xl overflow-hidden"
      style={{
        background: "linear-gradient(160deg, #0e0e0e 0%, #080808 100%)",
        border: "1px solid rgba(255,255,255,0.08)",
        borderTop: `2px solid ${ORANGE}`,
        boxShadow: `0 0 60px rgba(255,106,0,0.06), 0 2px 0 ${ORANGE}`,
      }}
    >
      {/* ══ 1. HEADER ══ */}
      <div
        className="px-6 sm:px-10 pt-6 pb-5"
        style={{
          background: "linear-gradient(180deg, rgba(255,106,0,0.07) 0%, transparent 100%)",
          borderBottom: "1px solid rgba(255,255,255,0.08)",
        }}
      >
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-5">
          <div className="space-y-3">
            {course.categoryName && (
              <span
                className="inline-flex items-center gap-1.5 text-[11px] font-bold px-3 py-1 rounded-full uppercase tracking-widest"
                style={{
                  backgroundColor: `${ORANGE}18`,
                  color: ORANGE,
                  border: `1px solid ${ORANGE}40`,
                }}
              >
                <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: ORANGE }} />
                {course.categoryName}
              </span>
            )}
            <h2 className="text-2xl sm:text-3xl md:text-[42px] font-bold text-white leading-tight tracking-tight">
              {course.title}
            </h2>
            <p className="text-sm sm:text-base font-light text-white/60">
              Master the skills that drive real-world impact.
            </p>
          </div>

          <Button text="Enquire Now" onClick={onContact} className="py-2 px-6 text-sm" />
        </div>
      </div>

      {/* ══ 2. STATS BAR ══ */}
      <div
        className="px-6 sm:px-10 py-4"
        style={{ borderBottom: "1px solid rgba(255,255,255,0.08)", backgroundColor: "rgba(0,0,0,0.3)" }}
      >
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-4">
          {stats.map(({ icon, label, value }) => (
            <div
              key={label}
              className="flex items-center gap-2 sm:gap-3 rounded-2xl px-2.5 sm:px-4 py-3 sm:py-4 min-w-0"
              style={{
                background: "linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%)",
                border: "1px solid rgba(255,255,255,0.10)",
              }}
            >
              <span
                className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center shrink-0"
                style={{ backgroundColor: `${ORANGE}20`, color: ORANGE, border: `1px solid ${ORANGE}35`, boxShadow: `0 0 12px ${ORANGE}20` }}
              >
                {icon}
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-[9px] sm:text-[10px] text-white/40 font-semibold uppercase tracking-widest mb-0.5">
                  {label}
                </p>
                <p className="text-xs sm:text-sm text-white font-bold break-words">{value}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ══ 3. DESCRIPTION ══ */}
      {course.description && (
        <div
          className="px-6 sm:px-10 py-5"
          style={{ borderBottom: "1px solid rgba(255,255,255,0.08)" }}
        >
          <SectionHeading icon={<MdOutlineSchool size={17} />} label="About This Course" />
          <p className="text-sm sm:text-base font-light text-white/80 leading-relaxed sm:ml-[68px]">
            {course.description}
          </p>
        </div>
      )}

      {/* ══ 4. WHAT YOU'LL LEARN ══ */}
      {learnItems.length > 0 && (
        <div
          className="px-6 sm:px-10 py-5"
          style={{
            borderBottom: "1px solid rgba(255,255,255,0.08)",
            background: "linear-gradient(180deg, rgba(255,106,0,0.03) 0%, transparent 60%)",
          }}
        >
          <SectionHeading
            icon={<FaGraduationCap size={16} />}
            label="What You'll Learn"
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-3 sm:ml-[68px]">
            {learnItems.map((item, i) => (
              <div
                key={i}
                className="flex items-start gap-3 rounded-xl px-3 py-2.5"
                style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}
              >
                <FaCheckCircle
                  size={13}
                  className="mt-0.5 shrink-0 text-white"
                />
                <span className="text-sm sm:text-base font-light text-white/80 leading-relaxed">{item}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ══ 5. SYLLABUS ══ */}
      {syllabusItems.length > 0 && (
        <div
          className="px-6 sm:px-10 py-5"
          style={{ borderBottom: "1px solid rgba(255,255,255,0.08)", background: "rgba(0,0,0,0.2)" }}
        >
          <div className="flex items-center justify-between mb-3">
            <SectionHeading
              icon={<FaBookOpen size={15} />}
              label="Syllabus"
              className="mb-0"
            />
            {course.details?.syllabus_pdf && (
              <button
                onClick={handlePdfDownload}
                className="flex items-center gap-2 text-xs font-bold px-4 py-2 rounded-full cursor-pointer -mt-6"
                style={{
                  color: ORANGE,
                  border: `1px solid ${ORANGE}50`,
                  backgroundColor: `${ORANGE}12`,
                  boxShadow: `0 0 12px ${ORANGE}18`,
                }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = `${ORANGE}25`)}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = `${ORANGE}12`)}
              >
                <IoMdDownload size={14} />
                Download PDF
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-0 sm:ml-[68px]">
            {syllabusItems.map((item, i) => (
              <div
                key={i}
                className="flex items-center gap-3 py-2"
                style={{ borderBottom: "1px solid rgba(255,255,255,0.07)" }}
              >
                <span
                  className="w-7 h-7 rounded-lg flex items-center justify-center text-[11px] font-black shrink-0 text-white bg-white/10 border border-white/20"
                >
                  {i + 1}
                </span>
                <span className="text-sm sm:text-base font-light text-white/80 leading-relaxed">{item}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ══ 6. BOTTOM CTA ══ */}
      <div
        className="px-6 sm:px-10 py-5"
        style={{ background: "linear-gradient(180deg, transparent 0%, rgba(255,106,0,0.06) 100%)" }}
      >
        <div
          className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5 rounded-2xl px-4 sm:px-7 py-5 sm:py-6"
          style={{
            background: "linear-gradient(135deg, rgba(255,106,0,0.12) 0%, rgba(255,106,0,0.04) 100%)",
            border: `1px solid ${ORANGE}35`,
            boxShadow: `0 0 40px ${ORANGE}10`,
          }}
        >
          <div className="min-w-0">
            <p className="text-white font-bold text-lg sm:text-xl mb-1 break-words">
              Ready to enroll in{" "}
              <span style={{ color: ORANGE }}>{course.title}</span>?
            </p>
            <p className="text-sm sm:text-base font-light text-white/80 leading-relaxed">
              Get in touch with us and kickstart your professional learning journey today.
            </p>
          </div>
          <Button text="Contact Us" onClick={onContact} className="whitespace-nowrap py-2 px-6 text-sm shrink-0" />
        </div>
      </div>
    </div>
  );
};

// ────────────────────────────────────────
//  Main Page
// ────────────────────────────────────────
const CoursesDetailPage = () => {
  const { categoryId } = useParams();
  const [searchParams] = useSearchParams();
  const courseId = searchParams.get("courseId");

  const navigate = useNavigate();
  const api = new ApiService();

  const [category, setCategory] = useState(null);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!categoryId) return;
    const fetchCategoryCourses = async () => {
      try {
        const res = await api.apiget(
          `${ServerUrl.API_GET_CATEGORY_WITH_COURSES}/${categoryId}`
        );
        const cat = res.data.data;
        setCategory(cat);
        const all = cat.courses || [];
        setCourses(
          courseId ? all.filter((c) => String(c.id) === String(courseId)) : all
        );
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchCategoryCourses();
  }, [categoryId, courseId]);

  if (loading) return <LoadingSkeleton />;

  if (!category)
    return (
      <div className="min-h-screen text-white flex items-center justify-center font-sora bg-gradient-to-br from-[#05112d] via-[#01040f] to-[#000000]">
        <p className="text-sm sm:text-base font-light text-white/60">Category not found.</p>
      </div>
    );

  return (
    <div className="text-white min-h-screen px-4 sm:px-8 md:px-14 py-10 font-sora bg-gradient-to-br from-[#05112d] via-[#01040f] to-[#000000]">
      {/* ── Back nav */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-sm text-white/80 hover:text-white mb-10 group cursor-pointer"
        style={{ transition: "color 0.15s" }}
      >
        <span
          className="w-8 h-8 rounded-full flex items-center justify-center"
          style={{ border: "1px solid rgba(255,255,255,0.15)", transition: "border-color 0.15s" }}
          onMouseEnter={(e) => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.4)")}
          onMouseLeave={(e) => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.15)")}
        >
          <FaChevronLeft size={10} />
        </span>
        Back to Courses
      </button>

      {/* ── Page heading */}
      <div className="mb-10">
        <div
          className="inline-block text-[11px] font-bold px-3 py-1 rounded-full mb-4 uppercase tracking-widest"
          style={{ backgroundColor: `${ORANGE}18`, color: ORANGE, border: `1px solid ${ORANGE}35` }}
        >
          Course Details
        </div>
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-[46px] font-bold text-white leading-tight tracking-tight mb-3">
          {category.name}
        </h1>
        <div className="flex items-center gap-2">
          <div className="h-[3px] w-12 rounded-full" style={{ background: ORANGE }} />
          <div className="h-[3px] w-6 rounded-full" style={{ background: `${ORANGE}50` }} />
          <div className="h-[3px] w-3 rounded-full" style={{ background: `${ORANGE}25` }} />
        </div>
      </div>

      {/* ── Course cards */}
      {courses.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-32 text-center">
          <div
            className="w-16 h-16 rounded-2xl flex items-center justify-center mb-4"
            style={{ backgroundColor: `${ORANGE}15`, border: `1px solid ${ORANGE}30` }}
          >
            <FaBookOpen size={28} style={{ color: ORANGE }} />
          </div>
          <h3 className="text-xl font-semibold text-white mb-2">No courses found</h3>
          <p className="text-sm sm:text-base font-light text-white/60">Try browsing other categories.</p>
        </div>
      ) : (
        <div className="flex flex-col gap-10">
          {courses.map((course) => (
            <CourseSection
              key={course.id}
              course={course}
              onContact={() => navigate(ROUTES.CONTACT)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default CoursesDetailPage;
