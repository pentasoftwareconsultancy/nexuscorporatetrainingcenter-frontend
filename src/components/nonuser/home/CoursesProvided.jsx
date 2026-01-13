import React, { useState, useEffect } from "react";
import CourseCard from "../../common/CoursesCard";
import ApiService from "../../../core/services/api.service";
import ServerUrl from "../../../core/constants/serverURL.constant";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../../core/constants/routes.constant";

const CoursesProvided = () => {
  const api = new ApiService();
  const navigate = useNavigate();

  const [allCourses, setAllCourses] = useState([]);
  const [cardsToShow, setCardsToShow] = useState(9);
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

        const catRes = await api.apiget(ServerUrl.API_GET_COURSE_CATEGORIES);
        const categories = catRes.data.data || [];

        const courseRes = await api.apiget(ServerUrl.API_GET_COURSES);
        const courseList = courseRes.data.data?.rows || [];

        // ⭐ Flatten courses (IMPORTANT PART)
        const flattened = courseList.map((course) => {
          const category = categories.find(
            (c) => c.id === course.categoryId
          );

          return {
            ...course,
            categoryId: course.categoryId, // 🔥 explicitly keep it
            categoryName: category?.name || "Uncategorized",
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
    <section className="px-12 text-white">
      <h1 className="text-4xl font-bold mb-10">Courses We Provide</h1>

      <div className="grid gap-8
            grid-cols-1
            sm:grid-cols-2
            md:grid-cols-3
            lg:grid-cols-4
            justify-items-center
            auto-rows-fr"
      >
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

      <div className="flex justify-end my-10">
        <button
          onClick={handleSeeMore}
          className="text-white pb-4 cursor-pointer"
        >
          See More
        </button>
      </div>
    </section>
  );
};

export default CoursesProvided;
