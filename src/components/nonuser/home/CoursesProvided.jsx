import React, { useState, useEffect } from "react";
import coursesData from "../../../assets/shubham/coursesdata.json";
import CourseCard from "../../common/CoursesCard";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../../core/constants/routes.constant";

const CoursesProvided = () => {
  const navigate = useNavigate();

  // Flatten categories to single course list
  const allCourses = coursesData.flatMap(category =>
    category.courses.map(course => ({
      ...course,
      categoryName: category.categoryName,
    }))
  );

  const [cardsToShow, setCardsToShow] = useState(9); // default fallback

  // Function: Detect number of cards per row (dynamic)
  const updateLimit = () => {
    let cols = 1;

    if (window.innerWidth >= 1024) cols = 4;        // lg:
    else if (window.innerWidth >= 768) cols = 3;    // md:
    else if (window.innerWidth >= 640) cols = 2;    // sm:

    setCardsToShow(cols * 3); // 3 rows only
  };

  useEffect(() => {
    updateLimit();
    window.addEventListener("resize", updateLimit);
    return () => window.removeEventListener("resize", updateLimit);
  }, []);

  const visibleCourses = allCourses.slice(0, cardsToShow);

  // Navigate to full course list
  const handleSeeMore = () => {
    navigate(ROUTES.COURSES);
  };

  const truncateDescription = (text, wordLimit = 35) => {
    if (!text) return "";
    const words = text.split(" ");
    return words.length > wordLimit
      ? words.slice(0, wordLimit).join(" ") + "..."
      : text;
  };

  return (
    <section className="px-12 text-white">
      <h1 className="text-4xl font-bold mb-10">Courses We Provide</h1>

      {/* Courses Grid (Dynamic Columns) */}
      <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 justify-items-center">
        {visibleCourses.map(course => (
          <CourseCard
            key={course.id}
            id={course.id}
            title={course.title}
            description={truncateDescription(course.description)}
            duration={course.duration}
            categoryName={course.categoryName}
            logo={course.logo}
          />
        ))}
      </div>

      {/* See More */}
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
