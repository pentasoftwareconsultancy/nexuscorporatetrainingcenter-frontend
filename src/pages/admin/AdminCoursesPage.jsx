import React from "react";
import coursesData from "../../assets/shubham/coursesdata.json";
import CourseCard from "../../components/common/CoursesCard";

const AdminCoursesPage = () => {
  const truncateDescription = (text, wordLimit = 35) => {
    if (!text) return "";
    const words = text.split(" ");
    return words.length > wordLimit
      ? words.slice(0, wordLimit).join(" ") + "..."
      : text;
  };

  return (
    <section className="w-full min-h-screen py-6 px-2 text-one">
      <h1 className="text-4xl text-white font-bold mb-10">Courses</h1>

      {coursesData.map((category) => (
        <div key={category.categoryName} className="mb-12">
          {/* Category Heading */}
          <p className="text-[18px] font-bold mb-3 inline-block">
            {category.categoryName}
          </p>

          {/* Courses Grid */}
          <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 justify-items-center">
            {category.courses.map((course) => (
              <CourseCard
                key={course.id}
                id={course.id}
                title={course.title}
                  logo={course.logo}      //  🟢 ADD THIS ✔

                description={truncateDescription(course.description)}
                duration={course.duration}
                categoryName={category.categoryName} // ✅ this now works correctly
              />
            ))}
          </div>
        </div>
      ))}
    </section>
  );
};

export default AdminCoursesPage;
