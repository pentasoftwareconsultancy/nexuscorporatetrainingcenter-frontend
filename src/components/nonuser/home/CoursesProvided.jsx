import React, { useState, useEffect } from "react";
import CourseCard from "../../common/CoursesCard";
import ApiService from "../../../core/services/api.service";
import ServerUrl from "../../../core/constants/serverURL.constant";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../../core/constants/routes.constant";

const targetCategories = [
  { id: "software-dev", name: "Software Development", originalIds: [1, 5] },
  { id: "cloud-devops", name: "Cloud & DevOps", originalIds: [4] },
  { id: "testing-qa", name: "Software Testing / QA", originalIds: [3] },
  { id: "data-analytics", name: "Data & Analytics", originalIds: [6] },
  { id: "design-marketing", name: "Design & Marketing", originalIds: [8] },
  { id: "healthcare-others", name: "Healthcare & Others", originalIds: [7, 2] }
];

const CoursesProvided = () => {
  const api = new ApiService();
  const navigate = useNavigate();

  const [allCourses, setAllCourses] = useState([]);
  const [cardsToShow, setCardsToShow] = useState(8);
  const [loading, setLoading] = useState(true);

  // ⭐ Truncate description
  const truncateDescription = (text, wordLimit = 35) => {
    if (!text) return "";
    const words = text.split(" ");
    return words.length > wordLimit
      ? words.slice(0, wordLimit).join(" ") + "..."
      : text;
  };

  // ⭐ Fetch courses + categories
  useEffect(() => {
    const loadCourses = async () => {
      try {
        setLoading(true);

        const courseRes = await api.apiget(`${ServerUrl.API_GET_COURSES}?limit=100`);
        const courseList = courseRes.data.data?.rows || [];

        // ⭐ Filter and Map courses matching Courses Page target categories
        const flattened = courseList
          .filter((course) =>
            targetCategories.some((tc) => tc.originalIds.includes(course.categoryId))
          )
          .map((course) => {
            const targetCat = targetCategories.find((tc) =>
              tc.originalIds.includes(course.categoryId)
            );

            return {
              ...course,
              categoryId: course.categoryId,
              categoryName: targetCat ? targetCat.name : "Uncategorized",
            };
          });

        setAllCourses(flattened);
      } catch (error) {
        console.error("Error fetching courses:", error);
      } finally {
        setLoading(false);
      }
    };

    loadCourses();

  }, []);

  const visibleCourses = allCourses.slice(0, cardsToShow);

  const handleSeeMore = () => {
    navigate(ROUTES.COURSES);
  };

  if (loading) {
    return <div className="text-white text-center mt-20">Loading...</div>;
  }

  return (
    <section className="px-3 md:px-12 text-white">
      <h1 className="text-[28px] sm:text-[32px] md:text-[36px] font-bold tracking-tight text-white mb-10">
        Empower Your Tech Career with Our Industry Ready Training Programs
      </h1>

      <div className="grid gap-5 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 justify-items-center auto-rows-fr">
        {visibleCourses.map((course) => (
          <CourseCard
            key={course.id}
            id={course.id}
            categoryId={course.categoryId} // ✅ THIS WAS MISSING
            title={course.title}
            description={truncateDescription(course.description)}
            duration={course.duration}
            categoryName={course.categoryName}
            logo={course.logo}
          />
        ))}
      </div>

      <div className="flex justify-center my-10">
        <button
          onClick={handleSeeMore}
          className="px-6 py-2.5 rounded-full border border-orange-500/30 bg-orange-500/10 hover:bg-orange-500/20 text-white font-semibold text-sm transition-all duration-200 cursor-pointer"
        >
          See More
        </button>
      </div>
    </section>
  );
};

export default CoursesProvided;
