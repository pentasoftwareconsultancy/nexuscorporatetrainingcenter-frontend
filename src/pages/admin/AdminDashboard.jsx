// import React from "react";
// import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
// import { IoPeopleSharp } from "react-icons/io5";
// import { HiUserPlus } from "react-icons/hi2";
// import { FaComputer } from "react-icons/fa6";
// import { FaGraduationCap } from "react-icons/fa";
// import { LiaVectorSquareSolid } from "react-icons/lia";
// import { MdReviews } from "react-icons/md";
// import { ROUTES } from "../../core/constants/routes.constant";
// import { useNavigate } from "react-router-dom";

// // -----------------------------------------------------
// // STATS DATA
// // -----------------------------------------------------
// const stats = [
//   {
//     title: "Total Registered Users",
//     value: "2,800",
//     info: [
//       { k: "Enquiry", v: "800" },
//       { k: "Class visits", v: "1000" },
//       { k: "Direct Admissions", v: "600" },
//     ],
//     icon: IoPeopleSharp,
//     click: ROUTES.ADMIN_TOTAL_REGISTER,
//   },
//   {
//     title: "New Registered Users",
//     value: "700",
//     info: [
//       { k: "Enquiry", v: "200" },
//       { k: "Class visits", v: "100" },
//       { k: "Direct Admissions", v: "400" },
//     ],
//     icon: HiUserPlus,
//     click: ROUTES.ADMIN_NEW_REGISTER,
//   },
//   {
//     title: "Users completed Test",
//     value: "1,200",
//     info: [
//       { k: "Certificate", v: "500" },
//       { k: "Attend Test", v: "600" },
//       { k: "Completed 5 attempts", v: "100" },
//     ],
//     icon: FaComputer,
//     click: ROUTES.ADMIN_TEST_COMPLETED,
//   },
//   {
//     title: "Total Colleges Visit",
//     value: "600",
//     info: [],
//     icon: FaGraduationCap,
//     click: ROUTES.ADMIN_COLLEGE_VISIT,
//   },
//   {
//     title: "Total Placements",
//     value: "1000",
//     info: [],
//     icon: LiaVectorSquareSolid,
//     click: ROUTES.ADMIN_TOTAL_PLACEMENTS,
//   },
//   {
//     title: "Total Reviews",
//     value: "500",
//     info: [],
//     icon: MdReviews,
//     click: ROUTES.ADMIN_REVIEWS,
//   },
// ];

// // -----------------------------------------------------
// // GRAPH DATA (one point per period)
// // -----------------------------------------------------
// const graphData = [
//   { period: "1M", users: 200 },
//   { period: "3M", users: 600 },
//   { period: "9M", users: 1200 },
//   { period: "1Y", users: 2800 },
//   { period: "3Y", users: 8400 },
//   { period: "5Y", users: 14000 },
//   { period: "ALL", users: 18000 },
// ];

// // -----------------------------------------------------
// // STAT CARD COMPONENT
// // -----------------------------------------------------
// function StatCard({ title, value, info, icon, click }) {
//   const Icons = icon;
//   const navigate = useNavigate();

//   return (
//     <div
//       onClick={() => navigate(click)}
//       className="
//          border border-white rounded-2xl p-6 flex flex-col
//         text-white shadow-md transition duration-200
//         hover:shadow-[0_0_48px_12px_rgba(255,115,0,0.5)]
//         cursor-pointer
//         w-full sm:w-[47%] lg:w-[30%] xl:w-[31%]
//       "
//     >
//       <div className="flex justify-between items-start">
//         <span className="text-base text-zinc-100">{title}</span>

//         <span className="text-2xl">
//           <span className="bg-orange-900 text-orange-400 rounded-lg p-2 flex items-center justify-center">
//             <Icons />
//           </span>
//         </span>
//       </div>

//       <div className="text-4xl font-bold text-[#f3efe8] mb-2">{value}</div>

//       {info.length === 3 && (
//         <div className="mt-3 space-y-2">
//           <div className="flex gap-2">
//             {info.slice(0, 2).map((i, idx) => (
//               <div key={idx} className="flex-1 bg-twopointo rounded-xl p-4">
//                 <span className="text-[1.1rem] text-zinc-200">{i.k}</span>
//                 <span className="text-2xl font-semibold">{i.v}</span>
//               </div>
//             ))}
//           </div>

//           <div className="bg-twopointo rounded-xl p-4">
//             <span className="text-[1.1rem] text-zinc-200">{info[2].k}</span>
//             <span className="text-2xl font-semibold">{info[2].v}</span>
//           </div>
//         </div>
//       )}

//       {info.length === 0 && <div className="h-8"></div>}
//     </div>
//   );
// }

// // -----------------------------------------------------
// // MAIN DASHBOARD
// // -----------------------------------------------------
// export default function AdminDashboard() {
//   return (
//     <section className="w-full">
//       <h1 className="text-4xl sm:text-5xl font-light text-white mb-8">
//         Dashboard
//       </h1>

//       {/* STATS ROW 1 */}
//       <div className="flex flex-wrap justify-between gap-4 mb-5">
//         {stats.slice(0, 3).map((card, i) => (
//           <StatCard key={i} {...card} />
//         ))}
//       </div>

//       {/* STATS ROW 2 */}
//       <div className="flex flex-wrap justify-between gap-4 mb-6">
//         {stats.slice(3, 6).map((card, i) => (
//           <StatCard key={i + 3} {...card} />
//         ))}
//       </div>

//       {/* ------------------------------- */}
//       {/* LINE GRAPH WITH PERIODS ON X-AXIS */}
//       {/* ------------------------------- */}
//       <div className="bg-[#1a1a1a] rounded-2xl p-6 border border-zinc-700">
//         <h2 className="text-2xl text-white font-light mb-6">Total Registered Users Growth</h2>

//         <ResponsiveContainer width="100%" height={350}>
//           <LineChart data={graphData}>
//             <CartesianGrid strokeDasharray="3 3" stroke="#555" />
//             <XAxis dataKey="period" stroke="#999" />
//             <YAxis stroke="#999" />
//             <Tooltip />
//             <Line
//               type="monotone"
//               dataKey="users"
//               stroke="#ff7300"
//               strokeWidth={3}
//               dot={{ fill: "#fff", stroke: "#ff7300", strokeWidth: 3 }}
//             />
//           </LineChart>
//         </ResponsiveContainer>
//       </div>
//     </section>
//   );
// }


import React from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { IoPeopleSharp } from "react-icons/io5";
import { HiUserPlus } from "react-icons/hi2";
import { FaComputer } from "react-icons/fa6";
import { FaGraduationCap } from "react-icons/fa";
import { LiaVectorSquareSolid } from "react-icons/lia";
import { MdReviews } from "react-icons/md";
import { ROUTES } from "../../core/constants/routes.constant";
import { useNavigate } from "react-router-dom";

// -----------------------------------------------------
// STATS DATA
// -----------------------------------------------------
const stats = [
  {
    title: "Total Registered Users",
    value: "2,800",
    info: [],
    icon: IoPeopleSharp,
    click: ROUTES.ADMIN_TOTAL_REGISTER,
  },
  {
    title: "New Registered Users",
    value: "700",
    info: [],
    icon: HiUserPlus,
    click: ROUTES.ADMIN_NEW_REGISTER,
  },
  {
    title: "Users completed Test",
    value: "1,200",
    info: [],
    icon: FaComputer,
    click: ROUTES.ADMIN_TEST_COMPLETED,
  },
  {
    title: "Total Colleges Visit",
    value: "600",
    info: [],
    icon: FaGraduationCap,
    click: ROUTES.ADMIN_COLLEGE_VISIT,
  },
  {
    title: "Total Placements",
    value: "1000",
    info: [],
    icon: LiaVectorSquareSolid,
    click: ROUTES.ADMIN_TOTAL_PLACEMENTS,
  },
  {
    title: "Total Reviews",
    value: "500",
    info: [],
    icon: MdReviews,
    click: ROUTES.ADMIN_REVIEWS,
  },
];

// -----------------------------------------------------
// GRAPH DATA (one point per period)
// -----------------------------------------------------
const graphData = [
  { period: "1M", users: 200 },
  { period: "3M", users: 600 },
  { period: "9M", users: 1200 },
  { period: "1Y", users: 2800 },
  { period: "3Y", users: 8400 },
  { period: "5Y", users: 14000 },
  { period: "ALL", users: 18000 },
];

// -----------------------------------------------------
// STAT CARD COMPONENT
// -----------------------------------------------------
function StatCard({ title, value, info, icon, click }) {
  const Icons = icon;
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(click)}
      className="
         border border-white rounded-2xl p-6 flex flex-col
        text-white shadow-md transition duration-200
        hover:shadow-[0_0_48px_12px_rgba(255,115,0,0.5)]
        cursor-pointer
        w-full sm:w-[47%] lg:w-[30%] xl:w-[31%]
      "
    >
      <div className="flex justify-between items-start">
        <span className="text-base text-zinc-100">{title}</span>

        <span className="text-2xl">
          <span className="bg-orange-900 text-orange-400 rounded-lg p-2 flex items-center justify-center">
            <Icons />
          </span>
        </span>
      </div>

      <div className="text-4xl font-bold text-[#f3efe8] mb-2">{value}</div>

      {info.length === 3 && (
        <div className="mt-3 space-y-2">
          <div className="flex gap-2">
            {info.slice(0, 2).map((i, idx) => (
              <div key={idx} className="flex-1 bg-twopointo rounded-xl p-4">
                <span className="text-[1.1rem] text-zinc-200">{i.k}</span>
                <span className="text-2xl font-semibold">{i.v}</span>
              </div>
            ))}
          </div>

          <div className="bg-twopointo rounded-xl p-4">
            <span className="text-[1.1rem] text-zinc-200">{info[2].k}</span>
            <span className="text-2xl font-semibold">{info[2].v}</span>
          </div>
        </div>
      )}

      {info.length === 0 && <div className="h-8"></div>}
    </div>
  );
}

// -----------------------------------------------------
// MAIN DASHBOARD
// -----------------------------------------------------
export default function AdminDashboard() {
  return (
    <section className="w-full">
      <h1 className="text-4xl sm:text-5xl font-light text-white mb-8">
        Dashboard
      </h1>

      {/* STATS ROW 1 */}
      <div className="flex flex-wrap justify-between gap-4 mb-5">
        {stats.slice(0, 3).map((card, i) => (
          <StatCard key={i} {...card} />
        ))}
      </div>

      {/* STATS ROW 2 */}
      <div className="flex flex-wrap justify-between gap-4 mb-6">
        {stats.slice(3, 6).map((card, i) => (
          <StatCard key={i + 3} {...card} />
        ))}
      </div>

      {/* ------------------------------- */}
      {/* LINE GRAPH WITH PERIODS ON X-AXIS */}
      {/* ------------------------------- */}
      <div className=" rounded-2xl p-6 border border-zinc-700">
        <h2 className="text-2xl text-white font-light mb-6">Total Registered Users Growth</h2>

        <ResponsiveContainer width="100%" height={350}>
          <LineChart data={graphData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#555" />
            <XAxis dataKey="period" stroke="#999" />
            <YAxis stroke="#999" />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="users"
              stroke="#ff7300"
              strokeWidth={3}
              dot={{ fill: "#fff", stroke: "#ff7300", strokeWidth: 3 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
}
