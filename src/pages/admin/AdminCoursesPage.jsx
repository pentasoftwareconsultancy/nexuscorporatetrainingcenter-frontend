import React, { useEffect, useState } from "react";
import CourseCard from "../../components/common/CoursesCard";
import ApiService from "../../core/services/api.service";
import ServerUrl from "../../core/constants/serverURL.constant";

const AdminCoursesPage = () => {
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
    <section className="w-full min-h-screen py-6 px-2 text-one relative">
      <h1 className="text-4xl text-white font-bold mb-10">Courses</h1>

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
                onClick={() => {}}
              />
            ))}
          </div>
        </div>
      ))}
      <div className="fixed py-1 px-3 bg-one text-2xl text-black rounded-xl right-12 bottom-12 font-bold">+</div>
    </section>
  );
};

export default AdminCoursesPage;
