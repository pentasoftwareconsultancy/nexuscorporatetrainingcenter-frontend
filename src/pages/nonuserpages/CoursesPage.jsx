import React, { useEffect, useState } from "react";
import CourseCard from "../../components/common/CoursesCard";
import ApiService from "../../core/services/api.service";
import ServerUrl from "../../core/constants/serverURL.constant";

const targetCategories = [
  { id: "software-dev", name: "Software Development", originalIds: [1, 5] },
  { id: "cloud-devops", name: "Cloud & DevOps", originalIds: [4] },
  { id: "testing-qa", name: "Software Testing / QA", originalIds: [3] },
  { id: "data-analytics", name: "Data & Analytics", originalIds: [6] },
  { id: "design-marketing", name: "Design & Marketing", originalIds: [8] },
  { id: "healthcare-others", name: "Healthcare & Others", originalIds: [7, 2] }
];

const CoursesPage = () => {
  const api = new ApiService();

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

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        
        const catRes = await api.apiget(ServerUrl.API_GET_COURSE_CATEGORIES);
        const categoryList = catRes.data.data || [];
        
        const courseRes = await api.apiget(`${ServerUrl.API_GET_COURSES}?limit=100`);
        const allCourses = Array.isArray(courseRes.data.data?.rows)
          ? courseRes.data.data.rows
          : [];
        
        // Map the original database courses to the 6 target categories on-the-fly
        const finalData = targetCategories.map((target) => {
          const courses = allCourses.filter((course) =>
            target.originalIds.includes(course.categoryId)
          );
          return {
            id: target.id,
            name: target.name,
            courses,
          };
        });

        setCategories(finalData);
      } catch (err) {
        console.error("Error fetching categories/courses:", err);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const categoryNames = ["All", ...targetCategories.map((c) => c.name)];

  const filteredCategories = categories
    .map((category) => {
      // 1. Filter by active category tab selection
      const belongsToTab = activeCategory === "All" || category.name === activeCategory;
      if (!belongsToTab) return null;

      // 2. Filter courses by search query
      const courses = category.courses.filter((course) =>
        course.title.toLowerCase().includes(searchQuery.toLowerCase())
      );

      // If category has no matching courses and activeCategory is "All", or we are searching, hide the section
      if (courses.length === 0 && (activeCategory === "All" || searchQuery !== "")) return null;

      return {
        ...category,
        courses,
      };
    })
    .filter(Boolean);

  // Check if we actually have any courses to display across all filtered categories
  const totalDisplayCourses = filteredCategories.reduce(
    (acc, cat) => acc + cat.courses.length,
    0
  );

  if (loading) {
    return <div className="text-white text-center mt-20">Loading...</div>;
  }

  return (
    <section className="w-full min-h-screen py-6 px-12 text-one">
      <h1 className="text-4xl text-white font-bold mb-10">Our Courses</h1>

      <p className="text-[18px] text-justify mb-8 w-11/12">
        Our extensive catalog of corporate training courses is meticulously
        designed to meet the demands of the modern business landscape. From
        cutting-edge technical skills like AWS, Data Science, and Full Stack
        Development to essential professional competencies such as Business
        Analysis and Soft Skills, we offer specialized programs that ensure your
        workforce remains agile, competitive, and highly effective. Each course
        is led by industry experts and structured for real-world application,
        guaranteeing that every hour spent in training translates directly into
        measurable organizational performance and growth.
      </p>

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
            We couldn't find any courses matching your search or selected filter. Try adjusting your keywords or category.
          </p>
        </div>
      ) : (
        filteredCategories.map((category) => {
          if (category.courses.length === 0) return null;
          return (
            <div key={category.id} className="mb-12">
              <p className="text-[18px] font-bold mb-3 inline-block text-white border-b-2 border-orange-500 pb-1">
                {category.name}
              </p>

              <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 justify-items-center auto-rows-fr">
                {category.courses.map((course) => (
                  <CourseCard
                    key={course.id}
                    id={course.id}
                    categoryId={course.categoryId} // Use the original categoryId for details navigation
                    title={course.title}
                    logo={course.logo || null}
                    description={truncateDescription(course.description)}
                    duration={course.duration}
                    categoryName={category.name}
                  />
                ))}
              </div>
            </div>
          );
        })
      )}
    </section>
  );
};

export default CoursesPage;
