import React from "react";
import { IoPeopleSharp } from "react-icons/io5";
import { HiUserPlus } from "react-icons/hi2";
import { FaComputer } from "react-icons/fa6";
import { FaGraduationCap } from "react-icons/fa";
import { LiaVectorSquareSolid } from "react-icons/lia";
import { MdReviews } from "react-icons/md";
import { ROUTES } from "../../core/constants/routes.constant";
import { useNavigate } from "react-router-dom";

// --------------------------------------
// STATS DATA
// --------------------------------------
const stats = [
  {
    title: "Total Registered Users",
    value: "2,800",
    info: [
      { k: "Enquiry", v: "800" },
      { k: "Class visits", v: "1000" },
      { k: "Direct Admissions", v: "600" },
    ],
    icon: IoPeopleSharp,
    click: ROUTES.ADMIN_TOTAL_REGISTER,
  },
  {
    title: "New Registered Users",
    value: "700",
    info: [
      { k: "Enquiry", v: "200" },
      { k: "Class visits", v: "100" },
      { k: "Direct Admissions", v: "400" },
    ],
    icon: HiUserPlus,
    click: ROUTES.ADMIN_NEW_REGISTER,
  },
  {
    title: "Users completed Test",
    value: "1,200",
    info: [
      { k: "Certificate", v: "500" },
      { k: "Attend Test", v: "600" },
      { k: "Completed 5 attempts", v: "100" },
    ],
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

// --------------------------------------
// AREA CHART DATA
// --------------------------------------
const timeRangeData = {
  "1M": 200,
  "3M": 600,
  "9M": 400,
  "1Y": 700,
  "3Y": 300,
  "5Y": 900,
  "ALL": 750,
};

// --------------------------------------
// STAT CARD
// --------------------------------------
function StatCard({ title, value, info, icon, click }) {
  const Icons = icon;
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(click)}
      className="
        bg-[#242424] border border-white rounded-2xl p-6 flex flex-col
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

// --------------------------------------
// AREA CHART RESPONSIVE
// --------------------------------------
function AreaChart() {
  const keys = ["1M", "3M", "9M", "1Y", "3Y", "5Y", "ALL"];
  const values = keys.map((k) => timeRangeData[k]);
  const maxValue = Math.max(...values);

  const points = values.map((v, index) => {
    const x = (index / (values.length - 1)) * 400;
    const y = 120 - (v / maxValue) * 90;
    return { x, y };
  });

  const path = `
    M0,120
    ${points.map((p) => `L${p.x},${p.y}`).join(" ")}
    L400,120 Z
  `;

  return (
    <div className="border border-white rounded-2xl p-6 text-white shadow-md mt-6 w-full overflow-x-auto">
      <div className="text-lg font-semibold">Last 6 Months</div>
      <div className="text-xl font-bold text-green-400">+15% this month</div>

      {/* CHART WRAPPER — scrollable on mobile */}
      <div className="relative h-48 mt-6 min-w-[420px]">
        <svg width="420" height="100%" viewBox="0 0 400 120">
          <defs>
            <linearGradient id="chartArea" x1="0" x2="0" y1="1" y2="0">
              <stop offset="0%" stopColor="#000000" stopOpacity="0" />
              <stop offset="60%" stopColor="#B85006" stopOpacity="0.35" />
              <stop offset="100%" stopColor="#FF6A00" stopOpacity="0.85" />
            </linearGradient>
          </defs>

          <path
            d={path}
            fill="url(#chartArea)"
            stroke="#FF6A00"
            strokeWidth="2"
          />
        </svg>
      </div>

      <div className="flex justify-between text-sm text-gray-400 mt-2 min-w-[420px]">
        {keys.map((k) => (
          <span key={k}>{k}</span>
        ))}
      </div>
    </div>
  );
}

// --------------------------------------
// MAIN DASHBOARD WITH RESPONSIVE LAYOUT
// --------------------------------------
export default function AdminDashboard() {
  return (
    <section className="w-full">
      <h1 className="text-4xl sm:text-5xl font-light text-white mb-8">
        Dashboard
      </h1>

      {/* STATS CARDS ROW 1 */}
      <div className="flex flex-wrap justify-between gap-4 mb-5">
        {stats.slice(0, 3).map((card, i) => (
          <StatCard key={i} {...card} />
        ))}
      </div>

      {/* STATS CARDS ROW 2 */}
      <div className="flex flex-wrap justify-between gap-4 mb-6">
        {stats.slice(3, 6).map((card, i) => (
          <StatCard key={i + 3} {...card} />
        ))}
      </div>

      {/* AREA CHART */}
      <AreaChart />
    </section>
  );
}
