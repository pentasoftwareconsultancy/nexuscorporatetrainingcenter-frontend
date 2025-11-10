import React from "react";
import coursesData from "../../assets/shubham/coursesdata.json";
import Button from "../../components/common/Button";

const CoursesPage = () => {
  return (
    <section className="bg-black min-h-screen py-12 px-6">
      <h1 className="text-3xl text-center text-white font-bold mb-10">
        Our Courses
      </h1>

      <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 justify-items-center">
        {coursesData.map((course) => (
          <CourseCard
            key={course.id}
            title={course.title}
            description={course.description}
            duration={course.duration}
          />
        ))}
      </div>
    </section>
  );
};

// ✅ Your original CourseCard merged below (unchanged)
const CourseCard = ({ title, description, duration }) => {
  return (
    <div
      className="bg-[#1a1a1a] text-gray-200 rounded-2xl p-6 border border-[#2b2b2b] 
                 transition-all duration-300 ease-in-out 
                 hover:shadow-[0_0_25px_4px_rgba(255,111,0,0.6)] 
                 hover:border-orange-500 
                 flex flex-col justify-between min-h-[280px]"
    >
      <div>
        <h2 className="text-xl font-semibold mb-2 text-white">{title}</h2>
        <p className="text-gray-300 text-sm mb-4 leading-relaxed">
          {description}
        </p>
      </div>
      <div className="flex items-center justify-between">
        <p className="text-gray-300 text-sm">Duration: {duration}</p>
        <Button label="Know more" onClick={() => alert(`${title} clicked`)} />
      </div>
    </div>
  );
};

export default CoursesPage;
