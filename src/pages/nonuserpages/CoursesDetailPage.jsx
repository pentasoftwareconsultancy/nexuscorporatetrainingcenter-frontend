import React from "react";
import Button from "../../components/common/Button";
import { useParams, useNavigate } from "react-router-dom";
import coursesData from "/src/assets/shubham/coursesdata.json";
import { FaUser, FaClock, FaMoneyBill1Wave, FaPhone } from "react-icons/fa6";
import { IoMdDownload } from "react-icons/io";
import { ROUTES } from "../../core/constants/routes.constant";

const CoursesDetailPage = () => {
  const { categoryName } = useParams();
  const navigate = useNavigate();

  const category = coursesData.find(
    (cat) => cat.categoryName.toLowerCase() === categoryName.toLowerCase()
  );

  if (!category) {
    return <div className="text-white p-6 md:p-10">Category not found</div>;
  }

  return (
    <div className="relative text-white min-h-screen px-4 sm:px-6 md:px-10 lg:px-20 py-6 font-sans flex flex-col">
      <h1 className="text-2xl sm:text-3xl md:text-5xl font-clashDisplay font-semibold mb-10">
        {category.categoryName}
      </h1>

      <div className="flex flex-col gap-10 md:gap-14">
        {category.courses.map((course) => (
          <div
            key={course.id}
            className="relative border border-[#f8f0f0] rounded-3xl p-4 sm:p-6 md:p-10 shadow-lg overflow-hidden"
          >
            {/* Glow Effect */}
            <div className="absolute -top-24 -left-24 w-64 sm:w-[420px] h-64 sm:h-[420px] bg-blue-700/40 blur-[160px] rounded-full pointer-events-none"></div>

            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div className="flex items-center gap-3">
                {course.logo && (
                  <img
                    src={course.logo}
                    alt="Course Logo"
                    className="w-7 h-7 sm:w-10 sm:h-10 object-contain"
                  />
                )}
                <h1 className="text-xl sm:text-2xl md:text-3xl font-semibold">
                  {course.courseName}
                </h1>
              </div>

              <Button
                text="Know more"
                onClick={() => navigate(ROUTES.CONTACT)}
                className="text-xs sm:text-sm px-3 py-1.5 sm:px-4 sm:py-2"
              />
            </div>

            {/* Main Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-10 mt-6">
              {/* Left Columns */}
              <div className="lg:col-span-2 space-y-6">
                <div className="flex flex-col lg:flex-row gap-6">
                  <p className="text-gray-300 text-sm sm:text-base leading-relaxed lg:w-2/3">
                    {course.description}
                  </p>

                  {/* Course Details */}
                  <div className="bg-[#2f2e2e] rounded-2xl p-4 sm:p-6">
                    <h3 className="text-sm sm:text-lg font-semibold mb-3">
                      Course Details
                    </h3>
                    <ul className="text-xs sm:text-sm text-gray-300 space-y-2">
                      <li className="flex items-center gap-2">
                        <FaUser size={14} /> Instructor: {course.instructor}
                      </li>
                      <li className="flex items-center gap-2">
                        <FaClock size={14} /> Duration: {course.duration}
                      </li>
                      <li className="flex items-center gap-2">
                        <FaMoneyBill1Wave size={14} /> Fees: {course.fees}
                      </li>
                      <li className="flex items-center gap-2">
                        <FaPhone size={14} /> Contact: {course.contact}
                      </li>
                    </ul>
                  </div>
                </div>

                {/* Learn Section */}
                <div className="bg-[#2f2e2e] border border-[#f8f0f0] rounded-2xl p-4 sm:p-6">
                  <h3 className="text-sm sm:text-lg font-semibold mb-4">
                    What You'll Learn
                  </h3>
                  <ul className="list-disc list-inside text-gray-300 text-xs sm:text-sm space-y-1">
                    {course.learnList?.map((item, idx) => (
                      <li key={idx}>{item}</li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Right Column */}
              <div className="bg-[#2f2e2e] border border-[#f8f0f0] rounded-2xl p-4 sm:p-6 h-full">
                <div className="flex justify-between items-center mb-3">
                  <h3 className="text-sm sm:text-lg font-semibold">
                    {course.coursad}
                  </h3>
                  <button
                    className="text-black rounded-full p-2 bg-gradient-to-b from-[#fdfaf7] via-[#f7f1ea] to-[#efe4da] border border-[#e8d7c9]
                     shadow-[inset_2px_2px_5px_rgba(255,255,255,0.9),inset_-3px_-3px_8px_rgba(0,0,0,0.15),0_2px_6px_rgba(0,0,0,0.1)]
                     hover:shadow-[inset_1px_1px_4px_rgba(255,255,255,1),inset_-2px_-2px_6px_rgba(0,0,0,0.2),0_3px_8px_rgba(0,0,0,0.15)]
                     transition-all duration-300"
                  >
                    <IoMdDownload size={16} />
                  </button>
                </div>

                <ul className="list-disc list-inside text-gray-300 text-xs sm:text-sm space-y-1">
                  {course.syllabus?.map((item, idx) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CoursesDetailPage;
