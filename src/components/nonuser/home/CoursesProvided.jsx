import React, { useState } from "react";
import coursesData from "../../../assets/shubham/coursesdata.json";
import CourseCard from "../../common/CoursesCard";

const CoursesProvided = () => {
  const [visibleCount, setVisibleCount] = useState(9);

  // Helper to trim description to 35 words
  const truncateDescription = (text, wordLimit = 35) => {
    if (!text) return "";
    const words = text.split(" ");
    return words.length > wordLimit
      ? words.slice(0, wordLimit).join(" ") + "..."
      : text;
  };

  // Flatten all courses from all categories
  const allCourses = coursesData.flatMap(category =>
    category.courses.map(course => ({
      ...course,
      categoryName: category.categoryName,
    }))
  );

  // Only show limited courses
  const visibleCourses = allCourses.slice(0, visibleCount);

  // Handler for toggling course visibility
  const toggleCourses = () => {
    if (visibleCount === allCourses.length) {
      setVisibleCount(9); // collapse
    } else {
      setVisibleCount(allCourses.length); // expand
    }
  };

  return (
    <section className=" px-12 text-white">
      <h1 className="text-4xl font-bold mb-10">Courses We Provide</h1>

      {/* Courses Grid */}
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

      {/* Show More / See Less Button */}
      <div className="flex justify-end my-10">
        <button
          onClick={toggleCourses}
          className="text-white pb-4 cursor-pointer"
        >
          {visibleCount === allCourses.length ? "See Less" : "See More"}
        </button>
      </div>
    </section>
  );
};

export default CoursesProvided;
