// import React from "react";
// import Button from "../../components/common/Button";
// import { useParams } from "react-router-dom";
// import coursesData from "/src/assets/shubham/coursesdata.json";
// import { FaUser, FaClock, FaMoneyBill1Wave, FaPhone } from "react-icons/fa6";
// import { IoMdDownload } from "react-icons/io";
// import { ROUTES } from "../../core/constants/routes.constant";
// import { useNavigate } from "react-router-dom";

// const CoursesDetailPage = () => {
//   const { categoryName } = useParams();
//   const navigate = useNavigate();

//   // 🔹 Find category by name
//   const category = coursesData.find(
//     (cat) => cat.categoryName.toLowerCase() === categoryName.toLowerCase()
//   );

//   if (!category) {
//     return <div className="text-white p-8">Category not found</div>;
//   }

//   return (
//     <div className="relative text-white min-h-screen px-12 sm:px-8 md:px-12 py-6 md:py-6 font-sans flex flex-col">
//       <h1
//         className="
//           text-3xl sm:text-4xl md:text-5xl font-clashDisplay font-semibold text-left mb-10
//           max-[400px]:text-[1.6rem] max-[370px]:text-[1.5rem] max-[350px]:text-[1.4rem]
//         "
//       >
//         {category.categoryName}
//       </h1>

//       {/* 🔹 Render All Courses Inside the Category */}
//       <div className="flex flex-col gap-12">
//         {category.courses.map((course) => (
//           <div
//             key={course.id}
//             className="
//               w-full border border-[#f8f0f0] rounded-3xl 
//               p-5 sm:p-8 md:p-10 shadow-lg overflow-hidden
//               max-[400px]:p-4 max-[370px]:p-3 max-[430px]:p-5
//             "
//           >
//             {/* 🔵 Blue Glow */}
//             <div
//               className="
//                 absolute top-0 left-0 w-[400px] sm:w-[500px] h-[400px] sm:h-[500px] 
//                 bg-blue-700/40 blur-[180px] rounded-full pointer-events-none
//                 max-[430px]:w-[300px] max-[430px]:h-[300px] max-[430px]:blur-[120px]
//               "
//             ></div>

//             {/* 🔸 Header Section */}
//             <div
//               className="
//                 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4
//                 max-[430px]:gap-3
//               "
//             >
//               {/* Logo + Course Name */}
//               <div className="flex items-center gap-3 max-[430px]:gap-2">
//                 {course.logo && (
//                   <img
//                     src={course.logo}
//                     alt="Course Logo"
//                     className="
//                       w-8 sm:w-10 h-8 sm:h-10 object-contain
//                       max-[400px]:w-7 max-[400px]:h-7 max-[360px]:w-6 max-[360px]:h-6
//                     "
//                   />
//                 )}
//                 <h1
//                   className="
//                     text-2xl sm:text-3xl font-semibold
//                     max-[400px]:text-lg max-[370px]:text-base max-[430px]:text-xl
//                   "
//                 >
//                   {course.courseName}
//                 </h1>
//               </div>

//               {/* Duration + Button */}
//               <div
//                 className="
//                   flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4
//                   max-[430px]:gap-2
//                 "
//               >
//                 <Button
//                   text="Know more"
//                   onClick={() => navigate(ROUTES.CONTACT)}
//                   className="
//                     max-[400px]:text-xs max-[370px]:text-[11px]
//                     max-[430px]:px-3 max-[430px]:py-1.5
//                   "
//                 />
//               </div>
//             </div>

//             {/* 🔹 Main Grid */}
//             <div
//               className="
//                 grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6 sm:mt-8
//                 max-[430px]:gap-5 max-[400px]:mt-4
//               "
//             >
//               {/* Left Column */}
//               <div className="lg:col-span-2 space-y-6 max-[430px]:space-y-4">
//                 <div
//                   className="
//                     flex flex-col lg:flex-row justify-between gap-6
//                     max-[430px]:gap-3
//                   "
//                 >
//                   {/* Description */}
//                   <div
//                     className="
//                       leading-relaxed text-gray-300 lg:w-2/3 text-sm sm:text-base
//                       max-[400px]:text-xs max-[360px]:text-[11px]
//                     "
//                   >
//                     {course.description}
//                   </div>

//                   {/* Course Details */}
//                   <div
//                     className="
//                       bg-[#2f2e2e] rounded-2xl p-5 sm:p-6
//                       max-[430px]:p-4 max-[400px]:p-3
//                     "
//                   >
//                     <h3
//                       className="
//                         text-base sm:text-lg font-semibold mb-3 text-white
//                         max-[430px]:text-sm max-[400px]:text-xs
//                       "
//                     >
//                       Course Details
//                     </h3>
//                     <ul
//                       className="
//                         text-xs sm:text-sm text-gray-300 space-y-2
//                         max-[430px]:text-[11px]
//                       "
//                     >
//                       <li className="flex items-center gap-2">
//                         <FaUser size={14} /> Instructor: {course.instructor}
//                       </li>
//                       <li className="flex items-center gap-2">
//                         <FaClock size={14} /> Duration: {course.duration}
//                       </li>
//                       <li className="flex items-center gap-2">
//                         <FaMoneyBill1Wave size={14} /> Fees: {course.fees}
//                       </li>
//                       <li className="flex items-center gap-2">
//                         <FaPhone size={14} /> Contact: {course.contact}
//                       </li>
//                     </ul>
//                   </div>
//                 </div>

//                 {/* What You'll Learn */}
//                 <div
//                   className="
//                     bg-[#2f2e2e] border border-[#f8f0f0] rounded-2xl p-5 sm:p-6
//                     max-[430px]:p-4 max-[400px]:p-3
//                   "
//                 >
//                   <h3
//                     className="
//                       text-base sm:text-lg font-semibold mb-4 text-white
//                       max-[430px]:text-sm max-[400px]:text-xs
//                     "
//                   >
//                     What You'll Learn
//                   </h3>
//                   <ul
//                     className="
//                       list-disc list-inside text-gray-300 space-y-2 text-xs sm:text-sm
//                       max-[430px]:text-[11px] max-[430px]:space-y-1
//                     "
//                   >
//                     {course.learnList?.map((item, idx) => (
//                       <li key={idx}>{item}</li>
//                     ))}
//                   </ul>
//                 </div>
//               </div>

//               {/* Right Column */}
//               <div
//                 className="
//                   bg-[#2f2e2e] border border-[#f8f0f0] rounded-2xl p-5 sm:p-6 h-full
//                   max-[430px]:p-4 max-[400px]:p-3
//                 "
//               >
//                 <div className="flex justify-between items-center mb-3">
//                   <h3
//                     className="
//                       text-base sm:text-lg font-semibold text-white
//                       max-[430px]:text-sm
//                     "
//                   >
//                     {course.coursad}
//                   </h3>
//                   <button
//                     className="
//                       text-black rounded-full p-2 bg-gradient-to-b from-[#fdfaf7] via-[#f7f1ea] to-[#efe4da]
//                       border border-[#e8d7c9]
//                       shadow-[inset_2px_2px_5px_rgba(255,255,255,0.9),inset_-3px_-3px_8px_rgba(0,0,0,0.15),0_2px_6px_rgba(0,0,0,0.1)]
//                       hover:shadow-[inset_1px_1px_4px_rgba(255,255,255,1),inset_-2px_-2px_6px_rgba(0,0,0,0.2),0_3px_8px_rgba(0,0,0,0.15)]
//                       cursor-pointer transition-all duration-300 ease-in-out
//                       max-[430px]:p-1.5
//                     "
//                   >
//                     <IoMdDownload size={16} />
//                   </button>
//                 </div>
//                 <ul
//                   className="
//                     list-disc list-inside text-gray-300 text-xs sm:text-sm space-y-1
//                     max-[430px]:text-[11px] max-[430px]:space-y-0.5
//                   "
//                 >
//                   {course.syllabus?.map((item, idx) => (
//                     <li key={idx}>{item}</li>
//                   ))}
//                 </ul>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default CoursesDetailPage;



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
