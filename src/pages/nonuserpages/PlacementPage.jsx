import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import ApiService from "../../core/services/api.service";
import ServerUrl from "../../core/constants/serverURL.constant";
import { Link } from "react-router-dom";

const PlacementCard = ({ student }) => {
  const [imageError, setImageError] = useState(false);

  const getInitials = (name) => {
    if (!name) return "N";
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .slice(0, 2)
      .toUpperCase();
  };

  const formatPackage = (pkg) => {
    if (!pkg) return "";
    let cleanPkg = String(pkg).trim();
    if (!cleanPkg.startsWith("₹") && !cleanPkg.toLowerCase().includes("lpa")) {
      return `₹${cleanPkg} LPA`;
    }
    if (cleanPkg.startsWith("₹") && !cleanPkg.toLowerCase().includes("lpa")) {
      return `${cleanPkg} LPA`;
    }
    return cleanPkg;
  };

  return (
    <Link
      to={`/placements/${student.year}/${student.placement_id}`}
      className="group relative bg-[#181818] hover:bg-[#1e1e1e] border border-white/10 hover:border-five/50 rounded-2xl overflow-hidden flex h-[180px] w-full transition-all duration-300 hover:scale-[1.03] hover:shadow-[0_8px_30px_rgba(255,106,0,0.15)] cursor-pointer"
    >
      {/* Student Details Left */}
      <div className="flex-1 p-5 flex flex-col justify-between">
        <div>
          {/* Package Badge */}
          <div className="inline-block bg-five/10 text-five text-[10px] font-bold tracking-wider uppercase px-2.5 py-0.5 rounded-md border border-five/20 mb-2">
            {formatPackage(student.package)}
          </div>
          {/* Name */}
          <h3 className="text-white font-bold text-base leading-snug tracking-wide group-hover:text-five transition-colors duration-300 truncate max-w-[180px] sm:max-w-[220px]">
            {student.student_name}
          </h3>
          {/* Course */}
          <p className="text-xs text-towpointone/70 mt-1 truncate max-w-[180px] sm:max-w-[220px]">
            {student.course}
          </p>
        </div>

        {/* Company & Role */}
        <div className="mt-2 border-t border-white/5 pt-2">
          <p className="text-xs font-semibold text-white/90 truncate max-w-[180px] sm:max-w-[220px]">
            at {student.company_name}
          </p>
          <p className="text-[10px] text-gray-400 truncate max-w-[180px] sm:max-w-[220px]">
            {student.company_role}
          </p>
        </div>
      </div>

      {/* Right Side: Photo */}
      <div className="w-[120px] sm:w-[130px] h-full shrink-0 relative bg-[#222] border-l border-white/5">
        {!imageError && student.image ? (
          <img
            src={student.image}
            alt={student.student_name}
            onError={() => setImageError(true)}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-orange-500/10 to-amber-600/10 flex flex-col items-center justify-center">
            <span className="text-xl font-extrabold text-five tracking-wider">
              {getInitials(student.student_name)}
            </span>
            <span className="text-[8px] text-five/60 font-semibold tracking-widest uppercase mt-1">
              Placed
            </span>
          </div>
        )}
      </div>
    </Link>
  );
};

export default function PlacementPage() {
  const api = new ApiService();

  const [placements, setPlacements] = useState([]);
  const [categories, setCategories] = useState(["All Placement"]);
  const [active, setActive] = useState("All Placement");
  const [showAll, setShowAll] = useState(false);

  /* ---------------------------------------------
        FETCH CATEGORY → YEAR → PLACEMENTS
  --------------------------------------------- */
  const fetchPlacements = async () => {
    try {
      const res = await api.apiget(ServerUrl.API_GET_CATEGORY_WITH_PLACEMENT);

      if (!res?.data?.success || !res?.data?.data) return;

      const apiData = res.data.data;

      const flatPlacements = [];
      const categoryList = ["All Placement"];

      Object.entries(apiData).forEach(([category, years]) => {
        categoryList.push(category);

        Object.entries(years).forEach(([year, list]) => {
          list.forEach((p) => {
            flatPlacements.push({
              ...p,
              category,
              year: Number(year),
            });
          });
        });
      });

      setPlacements(flatPlacements);
      setCategories(categoryList);
    } catch (err) {
      console.error("Placements Fetch Error:", err);
    }
  };

  useEffect(() => {
    fetchPlacements();
  }, []);

  /* ---------------------------------------------
        FILTER LOGIC (CATEGORY BASED)
  --------------------------------------------- */
  const filteredData = () => {
    if (active === "All Placement") return placements;
    return placements.filter((p) => p.category === active);
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

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.97 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6 }}
      className="text-white py-6 px-1 lg:px-12 overflow-hidden"
    >
      <h1 className="text-4xl font-bold mb-10 text-white">From Potential to Performance</h1>

      <p className="text-[18px] text-justify mb-8 w-11/12 text-towpointone leading-relaxed">
        Our graduates consistently demonstrate exceptional performance and command premium positions across the industry.
        Through our rigorous training and placement assistance, we bridge the gap between academic potential and corporate excellence, 
        delivering talented professionals to leading global enterprises.
      </p>

      {/* CATEGORY FILTER TABS */}
      <div className="flex flex-wrap items-center gap-3 mb-10 w-11/12">
        {(showAll ? categories : categories.slice(0, 6)).map((cat, i) => (
          <button
            key={i}
            onClick={() => setActive(cat)}
            className={`
              px-5 py-2.5 rounded-full text-xs md:text-sm font-medium transition-all duration-300 cursor-pointer whitespace-nowrap
              ${active === cat 
                ? "bg-gradient-to-r from-orange-500 to-amber-600 text-white shadow-[0_4px_15px_rgba(249,115,22,0.4)] border border-orange-500/25 scale-105" 
                : "bg-[#181818] text-gray-400 hover:text-white hover:bg-[#222222] border border-white/5"}
            `}
          >
            {cat}
          </button>
        ))}

        {categories.length > 6 && (
          <button 
            onClick={() => setShowAll(!showAll)}
            className="text-five hover:text-orange-400 font-semibold text-xs md:text-sm px-3 py-1 cursor-pointer transition-colors duration-300"
          >
            {showAll ? "Show Less" : "More"}
          </button>
        )}
      </div>

      {/* YEAR WISE DATA GRID */}
      {finalData.map((block) => (
        <div key={block.year} className="mb-16">
          <div className="flex items-center gap-4 mb-6 w-11/12">
            <h2 className="text-2xl font-bold text-white">{block.year} Placements</h2>
            <div className="flex-1 h-[1px] bg-white/10"></div>
          </div>
          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 w-11/12">
            {block.card.map((student) => (
              <PlacementCard key={student.placement_id} student={student} />
            ))}
          </div>
        </div>
      ))}

      {finalData.length === 0 && (
        <div className="flex flex-col items-center justify-center py-20 text-center w-11/12">
          <h3 className="text-xl font-semibold text-white mb-2">No placements found</h3>
          <p className="text-gray-400 max-w-md">
            We couldn't find any placement records for the selected filter.
          </p>
        </div>
      )}
    </motion.div>
  );
}
