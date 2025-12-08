import React, { useState, useEffect } from "react";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../../core/constants/routes.constant";

import ApiService from "../../../core/services/api.service";
import ServerUrl from "../../../core/constants/serverURL.constant";
import { getIconByName } from "../../../core/utils/iconMap";
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
      (e.getFullYear() - s.getFullYear()) * 12 +
      (e.getMonth() - s.getMonth());

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

  // ⭐ Filter search
  const filtered = batches.filter((b) =>
    b.name.toLowerCase().includes(search.toLowerCase())
  );

  // ⭐ Homepage: show only 5
  const displayed = filtered.slice(0, 5);

  const handleSeeMore = () => navigate(ROUTES.UPCOMING);

  if (loading) {
    return (
      <div className="text-white text-center mt-10">Loading batches...</div>
    );
  }

  return (
    <div className="w-full text-white font-sans py-2 px-12 md:px-10">
      <h1 className="text-3xl md:text-4xl font-semibold mb-8 tracking-wide">
        Upcoming Batches
      </h1>

      {/* Desktop labels */}
      <div className="hidden md:grid grid-cols-5 text-gray-300 text-lg border border-gray-700 rounded-lg px-6 py-4 mb-8">
        <span>Course name</span>
        <span className="text-center">Duration</span>
        <span className="text-center">Start date</span>
        <span className="text-center">End date</span>
        <span className="text-center">Contact</span>
      </div>

      {/* Search Input */}
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

      {/* Batch List */}
      <div className="flex flex-col gap-4">
        {displayed.map((b) => (
          <div
            key={b.id}
            className="relative flex flex-col md:flex-row md:items-center md:justify-between bg-[#1A1A1A] border border-[#4a4a4a] rounded-2xl md:rounded-full px-6 md:px-8 py-5 hover:bg-[#252525] transition-all duration-300"
          >
            {/* Course + Icon */}
            <div className="flex items-center gap-4 md:w-1/5 mb-3 md:mb-0">
              <div className="bg-[#2c2c2c] p-2 rounded-full flex items-center justify-center">
                {(() => {
                  const Icon = getIconByName(b.icon);
                  return Icon ? <Icon size={28} /> : null;
                })()}
              </div>
              <span className="text-[15px] font-medium">{b.name}</span>
            </div>

            {/* Duration (months) */}
            <span className="md:w-1/5 text-[15px] text-gray-300 text-left md:text-center">
              {getMonthDifference(b.start_date, b.end_date)} Months
            </span>

            {/* Start Date */}
            <span className="md:w-1/5 text-[15px] text-gray-300 text-left md:text-center">
              {formatDate(b.start_date)}
            </span>

            {/* End Date */}
            <span className="md:w-1/5 text-[15px] text-gray-300 text-left md:text-center">
              {formatDate(b.end_date)}
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

      {/* SEE MORE */}
      {filtered.length > 5 && (
        <div className="flex justify-end my-6">
          <button
            onClick={handleSeeMore}
            className="text-[15px] font-semibold text-gray-200 hover:text-white transition-all duration-200 underline-offset-4 hover:underline cursor-pointer"
          >
            See more
          </button>
        </div>
      )}
    </div>
  );
};

export default UpcomingBatches;
