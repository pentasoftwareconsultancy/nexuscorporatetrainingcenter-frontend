import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ApiService from "../../core/services/api.service";
import ServerUrl from "../../core/constants/serverURL.constant";
import { ROUTES } from "../../core/constants/routes.constant";
import { getIconByName } from "../../core/utils/iconMap";
import Button from "../../components/common/Button";

const AdminCoursesPage = () => {
  const api = new ApiService();
  const navigate = useNavigate();

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

        const finalData = categoryList.map((category) => ({
          ...category,
          courses: allCourses.filter(
            (course) => course.categoryId === category.id
          ),
        }));

        setCategories(finalData);
      } catch (err) {
        console.error("Error fetching courses:", err);
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
    <section className="w-full min-h-screen py-6 px-6 text-one relative">
      <h1 className="text-4xl text-white font-bold mb-10">Admin – Courses</h1>

      {categories.map((category) => (
        <div key={category.id} className="mb-12">
          <p className="text-[18px] font-bold mb-3 text-white">
            {category.name}
          </p>

          <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {category.courses.map((course) => {
              const IconComponent = getIconByName(course.logo);

              return (
                <div
                  key={course.id}
                  className="bg-twopointo border border-one rounded-3xl p-6 flex flex-col justify-between min-h-[320px]
                  hover:shadow-[0_0_25px_4px_rgba(255,111,0,0.7)] transition-all"
                >
                  <div>
                    <h2 className="text-lg font-semibold flex items-center gap-2 mb-2">
                      {IconComponent && <IconComponent size={22} />}
                      {course.title}
                    </h2>

                    <p className="text-sm text-towpointone mb-4">
                      {truncateDescription(course.description)}
                    </p>
                  </div>

                  <div className="flex justify-between items-center gap-3">
                    <span className="text-sm font-bold">
                      {course.duration}
                    </span>

                    <div className="flex gap-2">
                      <Button
                        text="Edit/Delete"
                        className="px-4 py-2"
                        onClick={() =>
                          navigate(
                            ROUTES.ADMIN_ADD_COURSE_WITH_ID.replace(":id", course.id)
                          )
                        }
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ))}

      <button
        onClick={() => navigate(ROUTES.ADMIN_ADD_COURSE)}
        className="fixed right-10 bottom-10 w-14 h-14 bg-one text-black text-3xl rounded-full font-bold shadow-lg"
      >
        +
      </button>
    </section>
  );
};

export default AdminCoursesPage;
