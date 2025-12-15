import React, { useEffect, useState } from "react";
import Button from "../../components/common/Button";
import { useParams, useNavigate } from "react-router-dom";
import { FaUser, FaClock, FaMoneyBill1Wave, FaPhone } from "react-icons/fa6";
import { IoMdDownload } from "react-icons/io";
import { ROUTES } from "../../core/constants/routes.constant";
import ApiService from "../../core/services/api.service";
import ServerUrl from "../../core/constants/serverURL.constant";

const CoursesDetailPage = () => {
  const { categoryId } = useParams();
  console.log("categoryId:", categoryId); // MUST log a number

  const navigate = useNavigate();
  const api = new ApiService();

  const [category, setCategory] = useState(null);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const handlePdfDownload = async (url, filename = "syllabus.pdf") => {
  const response = await fetch(url);
  const blob = await response.blob();

  const link = document.createElement("a");
    link.href = window.URL.createObjectURL(blob);
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  useEffect(() => {
    if (!categoryId) return;

    const fetchCategoryCourses = async () => {
      try {
        const res = await api.apiget(
          `${ServerUrl.API_GET_CATEGORY_WITH_COURSES}/${categoryId}`
        );

        setCategory(res.data.data);
        setCourses(res.data.data.courses || []);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setLoading(false);
      }
    };

    fetchCategoryCourses();
  }, [categoryId]);

  const renderTextAsListOrParagraph = (text) => {
  if (!text) return null;

  const items = text
    .split(".")
    .map(item => item.trim())
    .filter(Boolean);

  if (items.length > 1) {
    return (
      <ul
        style={{
          listStyleType: "disc",
          paddingLeft: "1.5rem"
        }}
        className="space-y-2 text-gray-300"
      >
        {items.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    );
  }

  return <p className="text-gray-300">{text}</p>;
};

  if (loading) {
    return <div className="text-white p-6">Loading...</div>;
  }

  if (!category) {
    return <div className="text-white p-6">Category not found</div>;
  }

  return (
    <div className="relative text-white min-h-screen px-4 sm:px-6 md:px-10 lg:px-12 py-6 font-sans flex flex-col">
      {/* CATEGORY NAME */}
      <h1 className="text-2xl sm:text-3xl md:text-5xl font-clashDisplay font-semibold mb-10">
        {category.name}
      </h1>

      <div className="flex flex-col gap-12">
        {courses.map((course) => (
          <div
            key={course.id}
            className="relative border border-[#f8f0f0] rounded-3xl p-4 sm:p-6 md:p-10 shadow-lg overflow-hidden"
          >
            <div className="absolute -top-24 -left-24 w-64 sm:w-[420px] h-64 sm:h-[420px] bg-blue-700/40 blur-[160px] rounded-full pointer-events-none"></div>

            {/* HEADER */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
              <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold">
                {course.title}
              </h2>

              <Button
                text="Know more"
                onClick={() => navigate(ROUTES.CONTACT)}
                className="text-xs sm:text-sm px-3 py-1.5 sm:px-4 sm:py-2"
              />
            </div>

            {/* MAIN GRID */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-10">
              {/* LEFT */}
              <div className="lg:col-span-2 space-y-6">
                <div className="flex flex-col lg:flex-row gap-6">
                  <p className="text-gray-300 text-sm sm:text-base leading-relaxed lg:w-3/4">
                    {course.description}
                  </p>

                  <div className="bg-[#2f2e2e] rounded-2xl p-4 sm:p-8 border border-[#f8f0f0]">
                    <h3 className="text-sm sm:text-lg font-semibold mb-3">
                      Course Details
                    </h3>
                    <ul className="text-xs sm:text-sm text-gray-300 space-y-2">
                      <li className="flex items-center gap-2">
                        <FaUser size={14} />
                        Instructor: {course.details?.instructor || "N/A"}
                      </li>
                      <li className="flex items-center gap-2">
                        <FaClock size={14} />
                        Duration: {course.duration}
                      </li>
                      <li className="flex items-center gap-2">
                        <FaMoneyBill1Wave size={14} />
                        Fees: {course.fees}
                      </li>
                      <li className="flex items-center gap-2">
                        <FaPhone size={14} />
                        Contact: {course.contact || "N/A"}
                      </li>
                    </ul>
                  </div>
                </div>

                {course.details?.what_you_will_learn && (
                  <div className="bg-[#2f2e2e] border border-[#f8f0f0] rounded-2xl p-4 sm:p-6">
                    <h3 className="text-sm sm:text-lg font-semibold mb-4">
                      What You'll Learn
                    </h3>
                    {renderTextAsListOrParagraph(course.details.what_you_will_learn)}
                  </div>
                )}
              </div>

              {/* RIGHT */}
              {course.details?.syllabus && (
                <div className="bg-[#2f2e2e] border border-[#f8f0f0] rounded-2xl p-4 sm:p-6 h-full">
                  <div className="flex justify-between items-center mb-3">
                    <h3 className="text-sm sm:text-lg font-semibold">
                      Syllabus
                    </h3>

                    {course.details?.syllabus_pdf && (
                      <button
                        onClick={() =>
                          handlePdfDownload(
                            course.details.syllabus_pdf,
                            `${course.title}-syllabus.pdf`
                          )
                        }
                        className="text-black rounded-full p-2 bg-gradient-to-b from-[#fdfaf7] via-[#f7f1ea] to-[#efe4da] border border-[#e8d7c9]"
                      >
                        <IoMdDownload size={16} />
                      </button>
                    )}
                  </div>

                  {renderTextAsListOrParagraph(course.details.syllabus)}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CoursesDetailPage;
