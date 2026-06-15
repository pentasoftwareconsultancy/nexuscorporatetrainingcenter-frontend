import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ApiService from "../../core/services/api.service";
import ServerUrl from "../../core/constants/serverURL.constant";
import { ROUTES } from "../../core/constants/routes.constant";
import { getIconBySubject } from "../../core/utils/iconMap";
import Button from "../../components/common/Button";

const targetCategories = [
  { id: "software-dev", name: "Software Development", originalIds: [1, 5] },
  { id: "cloud-devops", name: "Cloud & DevOps", originalIds: [4] },
  { id: "testing-qa", name: "Software Testing / QA", originalIds: [3] },
  { id: "data-analytics", name: "Data & Analytics", originalIds: [6] },
  { id: "design-marketing", name: "Design & Marketing", originalIds: [8] },
  { id: "healthcare-others", name: "Healthcare & Others", originalIds: [7, 2] }
];

const AdminCoursesPage = () => {
  const api = new ApiService();
  const navigate = useNavigate();

  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const truncateDescription = (text, wordLimit = 35) => {
    if (!text) return "";
    const words = text.split(" ");
    return words.length > wordLimit
      ? words.slice(0, wordLimit).join(" ") + "..."
      : text;
  };

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
        return {
          mode: "Online & Classroom",
          exposure: "Practical Corporate Case Studies",
          outcome: "Industry-Certified Placement Support"
        };
    }
  };

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);

        const courseRes = await api.apiget(`${ServerUrl.API_GET_COURSES}?limit=1000`);
        const allCourses = Array.isArray(courseRes.data.data?.rows)
          ? courseRes.data.data.rows
          : [];

        const mappedIds = new Set();
        targetCategories.forEach(tc => tc.originalIds.forEach(id => mappedIds.add(Number(id))));

        const finalData = targetCategories.map((target) => {
          const courses = allCourses.filter((course) =>
            target.originalIds.includes(Number(course.categoryId))
          );
          return {
            id: target.id,
            name: target.name,
            courses,
          };
        });

        // Add uncategorized courses
        const uncategorizedCourses = allCourses.filter((course) => {
          const cid = Number(course.categoryId);
          return !course.categoryId || isNaN(cid) || !mappedIds.has(cid);
        });

        if (uncategorizedCourses.length > 0) {
          finalData.push({
            id: "uncategorized",
            name: "Uncategorized",
            courses: uncategorizedCourses
          });
        }

        setCategories(finalData);
      } catch (err) {
        console.error("Error fetching courses:", err);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const categoryNames = ["All", ...targetCategories.map((c) => c.name)];
  if (categories.some((cat) => cat.id === "uncategorized")) {
    categoryNames.push("Uncategorized");
  }

  const filteredCategories = categories
    .map((category) => {
      // 1. Filter by active category tab selection
      const belongsToTab = activeCategory === "All" || category.name === activeCategory;
      if (!belongsToTab) return null;

      // 2. Filter courses by search query
      const courses = category.courses.filter((course) =>
        course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (course.description && course.description.toLowerCase().includes(searchQuery.toLowerCase()))
      );

      // If category has no matching courses and activeCategory is "All", or we are searching, hide the section
      if (courses.length === 0 && (activeCategory === "All" || searchQuery !== "")) return null;

      return {
        ...category,
        courses,
      };
    })
    .filter(Boolean);

  const totalDisplayCourses = filteredCategories.reduce(
    (acc, cat) => acc + cat.courses.length,
    0
  );

  if (loading) {
    return <div className="text-white text-center mt-20">Loading...</div>;
  }

  return (
    <section className="w-full min-h-screen py-6 px-12 text-one relative">
      <h1 className="text-4xl text-white font-bold mb-10">Admin – Courses</h1>

      {/* Search & Filter Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10 w-11/12">
        {/* Category Tabs */}
        <div className="flex flex-wrap gap-3 overflow-x-auto pb-1 scrollbar-none max-w-full">
          {categoryNames.map((name) => (
            <button
              key={name}
              onClick={() => setActiveCategory(name)}
              className={`
                px-5 py-2.5 rounded-full text-xs md:text-sm font-medium transition-all duration-300 cursor-pointer whitespace-nowrap
                ${activeCategory === name 
                  ? "bg-gradient-to-r from-orange-500 to-amber-600 text-white shadow-[0_4px_15px_rgba(249,115,22,0.4)] border border-orange-500/25 scale-105" 
                  : "bg-[#181818] text-gray-400 hover:text-white hover:bg-[#222222] border border-white/5"}
              `}
            >
              {name}
            </button>
          ))}
        </div>

        {/* Search Input */}
        <div className="relative min-w-[260px] md:min-w-[320px]">
          <input
            type="text"
            placeholder="Search courses..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[#181818] text-white border border-white/10 rounded-full px-5 py-2.5 pl-11 text-sm focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-all placeholder-gray-500"
          />
          <svg
            className="absolute left-4 top-3 h-4.5 w-4.5 text-gray-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
      </div>

      {totalDisplayCourses === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-center w-11/12">
          <svg
            className="h-16 w-16 text-gray-600 mb-4 animate-bounce"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
              d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <h3 className="text-xl font-semibold text-white mb-2">No courses found</h3>
          <p className="text-gray-400 max-w-md">
            We couldn't find any courses matching your search or selected filter.
          </p>
        </div>
      ) : (
        filteredCategories.map((category) => {
          if (category.courses.length === 0) return null;
          return (
            <div key={category.id} className="mb-12">
              <p className="text-[18px] font-bold mb-6 inline-block text-white border-b-2 border-orange-500 pb-1">
                {category.name}
              </p>

              <div className="grid gap-5 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 justify-items-center auto-rows-fr">
                {category.courses.map((course) => {
                  const IconComponent = getIconBySubject(course.title);
                  const highlights = getHighlights(course.categoryId);

                  return (
                    <div
                      key={course.id}
                      className="relative bg-twopointo text-one rounded-4xl p-6 border-b-[0.5px] border-r-[0.5px] border-t-[1px] border-l-[1px] border-one font-sora
                      transition-all duration-300 ease-in-out 
                      hover:shadow-[0_0_30px_6px_rgba(255,111,0,0.8)]
                      hover:border-five
                      hover:scale-105
                      flex flex-col justify-between w-full h-full min-h-[280px] z-2"
                    >
                      <div className="z-5">
                        <h2 className="text-xl font-semibold mb-2 flex items-center gap-2 text-white">
                          {IconComponent && <IconComponent size={24} className="text-five" />}
                          {course.title}
                        </h2>

                        <p className="text-towpointone text-sm mb-3 leading-relaxed">
                          {truncateDescription(course.description)}
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

                      <div className="flex items-center justify-between z-5 mt-4 border-t border-one/10 pt-3">
                        <p className="text-xs font-semibold text-one">Duration: {course.duration}</p>
                        <div className="flex gap-2">
                          <Button
                            text="Edit/Delete"
                            className="px-4 py-2"
                            onClick={() =>
                              navigate(
                                ROUTES.ADMIN_ADD_COURSE_WITH_ID.replace(":id", course.id)
                              )
                            }
                          />
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })
      )}

      <button
        onClick={() => navigate(ROUTES.ADMIN_ADD_COURSE)}
        className="fixed right-10 bottom-10 w-14 h-14 bg-gradient-to-r from-orange-500 to-amber-600 text-white text-3xl rounded-full font-bold shadow-lg hover:scale-110 hover:shadow-[0_0_20px_rgba(249,115,22,0.6)] active:scale-95 transition-all duration-300 cursor-pointer flex items-center justify-center"
      >
        +
      </button>
    </section>
  );
};

export default AdminCoursesPage;
