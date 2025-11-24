import React from "react";
import coursesData from "../../assets/shubham/coursesdata.json";
import CourseCard from "../../components/common/CoursesCard";

const CoursesPage = () => {
  const truncateDescription = (text, wordLimit = 35) => {
    if (!text) return "";
    const words = text.split(" ");
    return words.length > wordLimit
      ? words.slice(0, wordLimit).join(" ") + "..."
      : text;
  };

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

export default CoursesPage;
