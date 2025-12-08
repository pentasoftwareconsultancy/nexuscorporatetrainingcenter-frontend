import React, { useEffect, useState } from "react";
import CourseCard from "../../components/common/CoursesCard";
import ApiService from "../../core/services/api.service";
import ServerUrl from "../../core/constants/serverURL.constant";

const CoursesPage = () => {
  const api = new ApiService();

  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

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

      const courseRes = await api.apiget(ServerUrl.API_GET_COURSES);
      const allCourses = Array.isArray(courseRes.data.data?.rows)
        ? courseRes.data.data.rows
        : [];

      const finalData = categoryList.map((category) => {
        const courses = allCourses.filter(
          (course) => course.categoryId === category.id
        );
        return {
          ...category,
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

      {categories.map((category) => (
        <div key={category.id} className="mb-12">
          <p className="text-[18px] font-bold mb-3 inline-block text-white">
            {category.name}
          </p>

          <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 justify-items-center">
            {category.courses.map((course) => (
              <CourseCard
                key={course.id}
                id={course.id}
                title={course.title}
                logo={course.logo || null}
                description={truncateDescription(course.description)}
                duration={course.duration}
                categoryName={category.name}
              />
            ))}
          </div>
        </div>
      ))}
    </section>
  );
};

export default CoursesPage;
