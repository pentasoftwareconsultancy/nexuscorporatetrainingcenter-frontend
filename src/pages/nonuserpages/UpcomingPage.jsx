import React, { useState } from "react";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../core/constants/routes.constant";

import upcomingData from "../../assets/shubham/upcomingdb.json";
import { getIconByName } from "../../core/utils/iconMap"; // <-- Correct import
import Button from "../../components/common/Button";

const UpcomingPage = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");

  // ✅ Filter by search
  const filtered = upcomingData.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase())
  );

  // ✅ Show only 5 items on Home page
  const displayedCourses = filtered;

  return (
    <div className="w-full text-white font-sans py-2 px-12 md:px-10">
      {/* Title */}
      <h1 className="text-3xl md:text-4xl font-semibold mb-8 tracking-wide">
        Upcoming Batches
      </h1>

      {/* Header Row (Desktop Only) */}
      <div className="hidden md:grid grid-cols-5 text-gray-300 text-lg border border-gray-700 rounded-lg px-6 py-4 mb-8">
        <span>Course name</span>
        <span className="text-center">Duration</span>
        <span className="text-center">Start date</span>
        <span className="text-center">Fees</span>
        <span className="text-center">Contact</span>
      </div>

      {/* Search bar */}
      <div className="relative mb-10 w-full max-w-sm">
        <FaMagnifyingGlass className="absolute left-4 top-3.5 text-gray-400 text-lg" />
        <input
          type="text"
          placeholder="Search course"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-12 pr-4 py-2.5 bg-transparent border border-gray-700 text-white rounded-full focus:outline-none focus:border-gray-400 placeholder-gray-500 text-[15px]"
        />
      </div>

      {/* Course List */}
      <div className="flex flex-col gap-4">
        {displayedCourses.map((c) => (
          <div
            key={`${c.id}-${c.name}`}
            className="relative flex flex-col md:flex-row md:items-center md:justify-between bg-[#1A1A1A] border border-[#4a4a4a] rounded-2xl md:rounded-full px-6 md:px-8 py-5 hover:bg-[#252525] transition-all duration-300"
          >
            {/* Course + Icon */}
            {/* Course + Icon */}
            <div className="flex items-center gap-4 md:w-1/5 mb-3 md:mb-0">
              <div className="bg-[#2c2c2c] p-2 rounded-full flex items-center justify-center">
                {/* FIXED HERE */}
                {(() => {
                  const IconComponent = getIconByName(c.icon);
                  return IconComponent ? <IconComponent size={28} /> : null;
                })()}
              </div>
              <span className="text-[15px] font-medium">{c.name}</span>
            </div>

            {/* Duration */}
            <span className="md:w-1/5 text-[15px] text-gray-300 text-left md:text-center">
              {c.duration}
            </span>

            {/* Start Date */}
            <span className="md:w-1/5 text-[15px] text-gray-300 text-left md:text-center">
              {c.startDate}
            </span>

            {/* Fees */}
            <span className="md:w-1/5 text-[15px] text-gray-300 text-left md:text-center">
              ₹{c.fees}
            </span>

            {/* Contact */}
            <div className="flex items-center justify-between md:justify-end gap-3 md:w-1/5 mt-3 md:mt-0">
              <Button 
                text="Contact Now"
                onClick={() => navigate(ROUTES.CONTACT)}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UpcomingPage;
