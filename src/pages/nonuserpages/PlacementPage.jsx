import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import ApiService from "../../core/services/api.service";
import ServerUrl from "../../core/constants/serverURL.constant";
import { Link } from "react-router-dom";

const DEFAULT_IMAGE = "../../assets/Placement.jpg"; // <-- if no image

export default function PlacementPage() {
  const [categories, setCategories] = useState(["All Placement"]);
  const [active, setActive] = useState("All Placement");
  const [showAll, setShowAll] = useState(false);
  const api = new ApiService();
  const [placements, setPlacements] = useState([]);

  /* ---------------------------------------------
        FETCH CATEGORIES
  --------------------------------------------- */
  const fetchCategories = async () => {
    try {
      const res = await api.apiget(ServerUrl.API_GET_PLACEMENT_CATEGORIES);

      if (res.success && res.data) {
        const apiCats = res.data.map((c) => c.name);
        setCategories(["All Placement", ...apiCats]);
      }
    } catch (err) {
      console.error("Category Fetch Error:", err);
    }
  };

  /* ---------------------------------------------
        FETCH PLACEMENTS
  --------------------------------------------- */
  const fetchPlacements = async () => {
  try {
    const res = await api.apiget(ServerUrl.API_GET_PLACEMENTS);

    console.log("PLACEMENT RAW RESPONSE:", res);

    // Correct format check
    if (res.data && Array.isArray(res.data.data)) {
      setPlacements(res.data.data);  // <-- Correct path
    } else {
      console.warn("Unexpected placement format:", res);
    }

  } catch (err) {
    console.error("Placements Fetch Error:", err);
  }
};

  useEffect(() => {
    fetchCategories();
    fetchPlacements();
  }, []);

  /* ---------------------------------------------
        FILTER LOGIC
  --------------------------------------------- */
  const filteredData = () => {
    if (active === "All Placement") return placements;

    const q = active.toLowerCase();

    return placements.filter((p) => {
      return (
        p.company_role?.toLowerCase().includes(q) ||
        p.company_name?.toLowerCase().includes(q) ||
        p.course?.toLowerCase().includes(q)
      );
    });
  };

  /* ---------------------------------------------
        GROUP BY YEAR
  --------------------------------------------- */
  const groupByYear = (data) => {
    const map = {};

    data.forEach((p) => {
      if (!map[p.year]) map[p.year] = [];
      map[p.year].push(p);
    });

    return Object.keys(map)
      .sort((a, b) => b - a)
      .map((year) => ({
        year,
        card: map[year],
      }));
  };

  const finalData = groupByYear(filteredData());

  /* ---------------------------------------------
        RENDER ROW (SCROLL)
  --------------------------------------------- */
  const renderRow = (rowData, year, key) => (
    <motion.div
      key={key}
      initial={{ opacity: 0, scale: 0.95, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="flex overflow-x-auto space-x-4 sm:space-x-6 px-4 sm:px-6
        snap-x snap-mandatory [&::-webkit-scrollbar]:hidden"
    >
      {rowData.map((student, i) => (
        <motion.div
          key={student.placement_id}
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: i * 0.1 }}
        >
          <Link
            to={`/placements/${student.year}/${student.placement_id}`}
            className="shrink-0 bg-transparent border border-white rounded-2xl
              shadow-lg w-[90vw] sm:w-[400px] h-[220px] flex snap-start overflow-hidden"
          >
            <div className="flex flex-col justify-center p-3 w-70">
              <p className="font-bold text-sm">Package: {student.package}</p>
              <p className="text-sm">Name: {student.student_name}</p>
              <p className="text-sm">Company: {student.company_name}</p>
              <p className="text-sm">Role: {student.company_role}</p>
              <p className="text-sm">Course: {student.course}</p>
            </div>

            <div className="w-50 h-full p-3">
              <img
                src={student.image || DEFAULT_IMAGE}
                alt={student.student_name}
                className="object-cover w-full h-full rounded-xl border border-gray-700"
              />
            </div>
          </Link>
        </motion.div>
      ))}
    </motion.div>
  );

  /* ---------------------------------------------
        GRID FOR SEARCH / FILTER RESULT
  --------------------------------------------- */
  const renderFilteredGrid = (cards) => (
    <div className="flex flex-wrap gap-6 px-4 sm:px-6">
      {cards.map((student) => (
        <Link
          key={student.placement_id}
          to={`/placements/${student.year}/${student.placement_id}`}
          className="w-full sm:w-[48%] lg:w-[23%] shrink-0"
        >
          <div className="bg-transparent border border-white rounded-2xl shadow-lg overflow-hidden h-[220px] flex">
            <div className="flex flex-col justify-center p-3 w-70">
              <p className="font-bold text-sm">Package: {student.package}</p>
              <p className="text-sm">Name: {student.student_name}</p>
              <p className="text-sm">Company: {student.company_name}</p>
              <p className="text-sm">Role: {student.company_role}</p>
              <p className="text-sm">Course: {student.course}</p>
            </div>

            <div className="w-50 h-full p-3">
              <img
                src={student.image || DEFAULT_IMAGE}
                alt={student.student_name}
                className="object-cover w-full h-full rounded-xl border border-gray-700"
              />
            </div>
          </div>
        </Link>
      ))}
    </div>
  );

  /* ---------------------------------------------
        UI
  --------------------------------------------- */
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.97 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6 }}
      className="text-white py-6 px-12 overflow-hidden"
    >
      <h1 className="text-4xl font-bold mb-8">From Potential to Performance</h1>

      {/* CATEGORY FILTER */}
      <div className="pb-10 flex flex-wrap gap-3">
        {(showAll ? categories : categories.slice(0, 6)).map((cat, i) => (
          <button
            key={i}
            onClick={() => setActive(cat)}
            className={`p-4 border-2 rounded-full 
              ${
                active === cat ? "bg-white text-black" : "bg-[#222] text-white"
              }`}
          >
            {cat}
          </button>
        ))}

        <button onClick={() => setShowAll(!showAll)}>
          {showAll ? "Show Less" : "More"}
        </button>
      </div>

      {/* YEAR WISE DATA */}
      {finalData.map((block, i) => {
        if (active !== "All Placement") {
          return (
            <div key={block.year} className="mb-16">
              <h2 className="text-2xl font-bold mb-5">{block.year}</h2>
              {renderFilteredGrid(block.card)}
            </div>
          );
        }

        const half = Math.ceil(block.card.length / 2);
        const row1 = block.card.slice(0, half);
        const row2 = block.card.slice(half);

        return (
          <div key={block.year} className="mb-16">
            <h2 className="text-2xl font-bold mb-5">{block.year}</h2>
            <div className="space-y-6">
              {renderRow(row1, block.year, `${i}-1`)}
              {renderRow(row2, block.year, `${i}-2`)}
            </div>
          </div>
        );
      })}
    </motion.div>
  );
}
