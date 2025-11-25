import React from "react";
import { IoPeopleSharp } from "react-icons/io5";
import { HiUserPlus } from "react-icons/hi2";
import { FaComputer } from "react-icons/fa6";
import { FaGraduationCap } from "react-icons/fa";
import { LiaVectorSquareSolid } from "react-icons/lia";
import { MdReviews } from "react-icons/md";
import { ROUTES } from "../../core/constants/routes.constant";
import { useNavigate } from "react-router-dom";



const stats = [
  {
    title: "Total Registered Users",
    value: "2,800",
    info: [
      { k: "Enquiry", v: "800" },
      { k: "Class visits", v: "1000" },
      { k: "Direct Admissions", v: "600" }
    ],
    icon: IoPeopleSharp,
    click: ROUTES.ADMIN_TOTAL_REGISTER
  },
  {
    title: "New Registered Users",
    value: "700",
    info: [
      { k: "Enquiry", v: "200" },
      { k: "Class visits", v: "100" },
      { k: "Direct Admissions", v: "400" }
    ],
    icon: HiUserPlus,
    click: ROUTES.ADMIN_NEW_REGISTER
  },
  {
    title: "Users completed Test",
    value: "1,200",
    info: [
      { k: "Certificate", v: "500" },
      { k: "Attend Test", v: "600" },
      { k: "Completed 5 attempts", v: "100" }
    ],
    icon: FaComputer ,
    click: ROUTES.ADMIN_TEST_COMPLETED
  },
  { title: "Total Colleges Visit", value: "600", info: [], icon: FaGraduationCap , click: ROUTES.ADMIN_COLLEGE_VISIT  },
  { title: "Total Placements", value: "1000", info: [], icon: LiaVectorSquareSolid , click: ROUTES.ADMIN_TOTAL_PLACEMENTS  },
  { title: "Total Reviews", value: "500", info: [], icon: MdReviews , click: ROUTES.ADMIN_REVIEWS }
];

function StatCard({ title, value, info, icon, click }) {
  const Icons = icon;
  const navigate = useNavigate();
  return (
    <div
      onClick={() => navigate(click)}
      className="
        bg-neutral-900 border border-white rounded-2xl p-6 relative flex flex-col
        flex-1 min-w-[270px] max-w-[400px] m-3 text-white shadow-md
        transition duration-200
        hover:shadow-[0_0_48px_16px_rgba(255,115,0,0.7)]
        cursor-pointer
      "
    >
      <div className="flex justify-between items-start  font-medium">
        <span className="text-base text-zinc-100">{title}</span>
        <span className="text-2xl">
          <span className="bg-orange-900 text-orange-400 rounded-lg p-2 flex items-center justify-center">
            <Icons/></span>
        </span>
      </div>
      <div className="text-4xl font-bold text-[#f3efe8] mb-2 leading-none">{value}</div>
      {/* Info grid: 2 columns on top, 1 full width below */}
      {info.length === 3 && (
        <div className="mt-4 space-y-2">
          <div className="flex gap-2">
            {info.slice(0, 2).map((i, idx) => (
              <div
                key={idx}
                className="flex-1 bg-[#242424] rounded-xl p-4 flex flex-col"
              >
                <span className="text-[1.1rem] text-zinc-200">{i.k}</span>
                <span className="text-2xl font-semibold text-[#f3efe8] leading-tight">{i.v}</span>
              </div>
            ))}
          </div>
          <div>
            <div className="bg-[#242424] rounded-xl p-4 flex flex-col w-full">
              <span className="text-[1.1rem] text-zinc-200">{info[2].k}</span>
              <span className="text-2xl font-semibold text-[#f3efe8] leading-tight">{info[2].v}</span>
            </div>
          </div>
        </div>
      )}
      {/* For cards without info */}
      {info.length === 0 && <div className="mb-6"></div>}
    </div>
  );
}

export default function AdminDashboard() {
  // Use stats data to create chart dynamically
  const chart = {
    labels: stats.map((s) => s.title),   // Use stat titles as labels
    values: stats.map((s) => {
      // Convert value string like "2,800" to number
      return Number(s.value.replace(/,/g, ""));
    }),
  };

  const maxValue = Math.max(...chart.values);

  const points = chart.values.map((v, index) => {
    const xSpacing = 400 / (chart.values.length - 1);
    const x = index * xSpacing;
    const y = 80 - (v / maxValue) * 60; // scale to fit SVG height
    return { x, y, value: v, label: chart.labels[index] };
  });

  const path = `
    M0,80
    ${points.map((p) => `L${p.x},${p.y}`).join(" ")}
    L400,80 Z
  `;

  return (
    <section>
      <h1 className="text-5xl font-light text-white mb-8 mt-2">Dashboard</h1>
      <div className="flex flex-wrap gap-4 mb-5">
        {stats.slice(0, 3).map((card, i) => <StatCard key={i} {...card} />)}
      </div>
      <div className="flex flex-wrap gap-4 mb-6">
        {stats.slice(3, 6).map((card, i) => <StatCard key={i + 3} {...card} />)}
      </div>

      {/* Graph */}
      <div className="bg-neutral-900 border border-white rounded-2xl p-6 text-white shadow-md mt-3">
        <div className="text-lg font-semibold mb-2">
          All Stats Overview
        </div>
        <div className="text-xl font-bold mb-1">Visualizing all stats values</div>
        <div className="relative h-40 mt-6 mb-2">
          <svg width="100%" height="100%" viewBox="0 0 400 80">
            <defs>
              <linearGradient id="orange-glow" x1="0" x2="0" y1="1" y2="0">
                <stop offset="0%" stopColor="#141414" stopOpacity="0" />
                <stop offset="70%" stopColor="#B85006" stopOpacity="0.35" />
                <stop offset="100%" stopColor="#FF6A00" stopOpacity="0.85" />
              </linearGradient>
              <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
                <feDropShadow
                  dx="0"
                  dy="14"
                  stdDeviation="8"
                  floodColor="#ff7100"
                  floodOpacity="0.45"
                />
              </filter>
            </defs>
            <path d={path} fill="url(#orange-glow)" opacity="0.9" filter="url(#shadow)" />
          </svg>
        </div>
        <div className="flex justify-between text-sm text-gray-400 mt-1">
          {chart.labels.map((l, i) => (
            <span key={i}>{l}</span>
          ))}
        </div>
      </div>
    </section>
  );
}
