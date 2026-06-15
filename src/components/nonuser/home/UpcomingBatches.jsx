import React, { useState, useEffect } from "react";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../../core/constants/routes.constant";

import ApiService from "../../../core/services/api.service";
import ServerUrl from "../../../core/constants/serverURL.constant";
import { getIconBySubject } from "../../../core/utils/iconMap";
import Button from "../../common/Button";

const UpcomingBatches = () => {
  const navigate = useNavigate();
  const api = new ApiService();
  const [search, setSearch] = useState("");
  const [batches, setBatches] = useState([]);
  const [loading, setLoading] = useState(true);

  const formatDate = (dateStr) => {
    if (!dateStr) return "";
    return new Date(dateStr).toISOString().split("T")[0];
  };

  // ⭐ Calculate duration in months
  const getMonthDifference = (start, end) => {
    const s = new Date(start);
    const e = new Date(end);

    const months =
      (e.getFullYear() - s.getFullYear()) * 12 + (e.getMonth() - s.getMonth());

    return months <= 0 ? 1 : months; // at least 1 month
  };

  // ⭐ Fetch API batches
  useEffect(() => {
    const loadBatches = async () => {
      try {
        setLoading(true);
        const res = await api.apiget(ServerUrl.API_GET_BATCHES);

        let list = [];

        if (Array.isArray(res.data.data)) {
          // Case 1: data: [ ... ]
          list = res.data.data;
        } else if (res.data.data?.rows) {
          // Case 2: data: { rows: [ ... ] }
          list = res.data.data.rows;
        } else {
          console.warn("Unknown API batch format:", res.data);
        }

        setBatches(list);
      } catch (err) {
        console.error("Error loading batches:", err);
        setBatches([]); // fallback
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

  // ⭐ Homepage: show only 5
  const displayed = filtered.slice(0, 5);

  const handleSeeMore = () => navigate(ROUTES.UPCOMING);

  if (loading) {
    return (
      <div className="text-white text-center mt-10">Loading batches...</div>
    );
  }

  return (
    <div className="w-full text-white font-sans py-6 px-3 sm:px-6 md:px-12">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
        <h2 className="text-[28px] sm:text-[32px] md:text-[36px] font-bold tracking-tight text-white">
          Upcoming Batches
        </h2>

        {/* Search Input */}
        <div className="relative w-full sm:max-w-sm">
          <FaMagnifyingGlass className="absolute left-4 top-3.5 text-white/40 text-lg" />
          <input
            type="text"
            placeholder="Search course"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-12 pr-4 py-2.5 sm:py-3 sm:text-[15px] bg-transparent border border-white/10 text-white rounded-full 
            focus:outline-none focus:border-white/40 placeholder-white/30 text-[15px]"
          />
        </div>
      </div>

      {/* Desktop labels */}
      <div className="hidden md:grid grid-cols-5 text-white/80 text-sm sm:text-base font-light border border-white/10 rounded-lg px-6 py-4 mb-8">
        <span>Course name</span>
        <span className="text-center">Duration</span>
        <span className="text-center">Start date</span>
        <span className="text-center">End date</span>
        <span className="text-center">Contact</span>
      </div>

      {/* Batch List */}
      <div className="flex flex-col gap-4">
        {displayed.map((b) => (
          <div
            key={b.id}
            className="relative flex flex-col gap-3
              sm:gap-4 sm:justify-center
              md:flex-row md:items-center md:justify-between
              border border-white/10
              rounded-2xl md:rounded-full
              px-4 sm:px-6 md:px-8
              py-3.5 sm:py-4
              hover:bg-white/5
              transition-all duration-300"
          >
            {/* Course + Icon */}
            <div className="flex items-center gap-3 sm:gap-4 md:w-1/5">
              <div className="bg-white/5 border border-white/10 p-2 rounded-full flex items-center justify-center">
                {(() => {
                  const Icon = getIconBySubject(b.course?.title || b.name);
                  return Icon ? <Icon size={26} /> : null;
                })()}
              </div>
              <span className="text-sm sm:text-[15px] font-medium">{b.course?.title || b.name}</span>
            </div>

            {/* Duration (months) */}
            <span className="block text-xs text-white/40 sm:hidden">
              Duration
            </span>
            <span className="md:w-1/5 text-sm sm:text-[15px] text-white/80 font-light text-left md:text-center">
              {getMonthDifference(b.start_date, b.end_date)} Months
            </span>

            {/* Start Date */}
            <span className="block text-xs text-white/40 sm:hidden">
              Start Date
            </span>
            <span className="md:w-1/5 text-sm sm:text-[15px] text-white/80 font-light text-left md:text-center">
              {formatDate(b.start_date)}
            </span>

            {/* End Date */}
            <span className="block text-xs text-white/40 sm:hidden">
              End Date
            </span>
            <span className="md:w-1/5 text-sm sm:text-[15px] text-white/80 font-light text-left md:text-center">
              {formatDate(b.end_date)}
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

      {/* SEE MORE */}
      {filtered.length > 5 && (
        <div className="flex justify-end my-6">
          <button
            onClick={handleSeeMore}
            className="text-[15px] font-semibold text-white/80 hover:text-white transition-all duration-200 underline-offset-4 hover:underline cursor-pointer"
          >
            See more
          </button>
        </div>
      )}
    </div>
  );
};

export default UpcomingBatches;
