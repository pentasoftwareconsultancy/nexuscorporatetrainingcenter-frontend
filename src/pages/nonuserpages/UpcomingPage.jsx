import React, { useState, useEffect } from "react";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../core/constants/routes.constant";

import ApiService from "../../core/services/api.service";
import ServerUrl from "../../core/constants/serverURL.constant";
import { getIconBySubject } from "../../core/utils/iconMap";
import Button from "../../components/common/Button";

const UpcomingPage = () => {
  const navigate = useNavigate();
  const api = new ApiService();
  const [search, setSearch] = useState("");
  const [batches, setBatches] = useState([]);
  const [loading, setLoading] = useState(true);

  // Format date: YYYY-MM-DD
  const formatDate = (dateStr) => {
    if (!dateStr) return "";
    return new Date(dateStr).toISOString().split("T")[0];
  };

  // Calculate duration in months
  const getMonthDifference = (start, end) => {
    const s = new Date(start);
    const e = new Date(end);
    const months =
      (e.getFullYear() - s.getFullYear()) * 12 +
      (e.getMonth() - s.getMonth());
    return months <= 0 ? 1 : months;
  };

  // Fetch batches dynamically
  useEffect(() => {
    const loadBatches = async () => {
      try {
        setLoading(true);
        const res = await api.apiget(ServerUrl.API_GET_BATCHES);

        let list = [];
        if (Array.isArray(res.data.data)) {
          list = res.data.data;
        } else if (res.data.data?.rows) {
          list = res.data.data.rows;
        } else if (res.data.data) {
          // Single object fallback
          list = [res.data.data];
        }

        setBatches(list);
      } catch (err) {
        console.error("Error loading batches:", err);
        setBatches([]);
      } finally {
        setLoading(false);
      }
    };

    loadBatches();
  }, []);

  // Filter by search — checks both batch name and linked course title
  const filtered = batches.filter((b) => {
    const query = search.toLowerCase();
    const batchName = (b.name || "").toLowerCase();
    const courseTitle = (b.course?.title || "").toLowerCase();
    return batchName.includes(query) || courseTitle.includes(query);
  });

  if (loading) {
    return (
      <div className="text-white text-center mt-10">Loading batches...</div>
    );
  }

  return (
    <div className="w-full text-white font-sans py-2 px-12 md:px-10">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
        <h1 className="text-3xl md:text-4xl font-semibold tracking-wide">
          Upcoming Batches
        </h1>

        <div className="relative w-full max-w-sm">
          <FaMagnifyingGlass className="absolute left-4 top-3.5 text-gray-400 text-lg" />
          <input
            type="text"
            placeholder="Search course"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-12 pr-4 py-2.5 bg-transparent border border-gray-700 text-white rounded-full focus:outline-none focus:border-gray-400 placeholder-gray-500 text-[15px]"
          />
        </div>
      </div>

      <div className="hidden md:grid grid-cols-5 text-gray-300 text-lg border border-gray-700 rounded-lg px-6 py-4 mb-8">
        <span>Course name</span>
        <span className="text-center">Duration</span>
        <span className="text-center">Start date</span>
        <span className="text-center">End date</span>
        <span className="text-center">Contact</span>
      </div>

      <div className="flex flex-col gap-4">
        {filtered.map((c) => (
          <div
            key={c.id}
            className="relative flex flex-col md:flex-row md:items-center md:justify-between bg-[#1A1A1A] border border-[#4a4a4a] rounded-2xl md:rounded-full px-6 md:px-8 py-3.5 sm:py-4 hover:bg-[#252525] transition-all duration-300"
          >
            {/* Icon + Name */}
            <div className="flex items-center gap-4 md:w-1/5 mb-3 md:mb-0">
              <div className="bg-[#2c2c2c] p-2 rounded-full flex items-center justify-center">
                {(() => {
                  const IconComponent = getIconBySubject(c.course?.title || c.name);
                  return IconComponent ? <IconComponent size={26} /> : null;
                })()}
              </div>
              <span className="text-sm sm:text-[15px] font-medium">{c.course?.title || c.name}</span>
            </div>

            {/* Duration */}
            <span className="md:w-1/5 text-sm sm:text-[15px] text-gray-300 text-left md:text-center">
              {getMonthDifference(c.start_date, c.end_date)} Months
            </span>

            {/* Start Date */}
            <span className="md:w-1/5 text-sm sm:text-[15px] text-gray-300 text-left md:text-center">
              {formatDate(c.start_date)}
            </span>

            {/* End Date */}
            <span className="md:w-1/5 text-sm sm:text-[15px] text-gray-300 text-left md:text-center">
              {formatDate(c.end_date)}
            </span>

            {/* Contact */}
            <div className="flex items-center justify-between md:justify-end gap-3 md:w-1/5 mt-2 md:mt-0">
              <Button
                text="Contact Now"
                className="w-full sm:w-auto py-1.5 px-4 text-xs h-[42px] flex items-center justify-center shrink-0"
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
