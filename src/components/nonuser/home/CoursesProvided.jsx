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

  return (
    <section className="min-h-screen px-12 text-white">
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
          />
        ))}
      </div>

      {/* Show More Button */}
      {visibleCount < allCourses.length && (
        <div className="flex justify-end mb-10">
          <button
            onClick={() => setVisibleCount(prev => prev + 9)}
            className="text-white"
          >
            Show More
          </button>
        </div>
      )}
    </section>
  );
};

export default CoursesProvided;
