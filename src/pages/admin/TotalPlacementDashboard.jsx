import React, { useEffect, useState } from "react";
import ApiService from "../../core/services/api.service";
import ServerUrl from "../../core/constants/serverURL.constant";
import { Search } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../core/constants/routes.constant";

export default function TotalPlacementDashboard() {
  const api = new ApiService();
  const navigate = useNavigate();

  const [categories, setCategories] = useState([
    { name: "All Placement", placementCategoryId: null },
  ]);

  const [active, setActive] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  const [allPlacements, setAllPlacements] = useState([]);
  const [filteredPlacement, setFilteredPlacement] = useState([]);

  /* =======================
       FETCH CATEGORIES
  ======================= */
  const fetchCategories = async () => {
    try {
      const res = await api.apiget(ServerUrl.API_GET_PLACEMENT_CATEGORIES);
      console.log("CATEGORY API:", res.data);

      if (!Array.isArray(res.data)) return;

      const list = [
        { name: "All Placement", placementCategoryId: null },
        ...res.data,
      ];

      setCategories(list);
    } catch (e) {
      console.error("Category Fetch Error:", e);
    }
  };

  /* =======================
        FETCH PLACEMENTS
  ======================= */
  const fetchPlacements = async () => {
    try {
      const res = await api.apiget(ServerUrl.API_GET_PLACEMENTS);

      if (!res?.data?.success || !res?.data?.data) return;

      setAllPlacements(res.data.data);
      setFilteredPlacement(res.data.data); // default show all
    } catch (err) {
      console.error("Placement Fetch Error:", err);
    }
  };

  useEffect(() => {
    fetchCategories();
    fetchPlacements();
  }, []);

  /* =======================
        FILTER HANDLER
  ======================= */
  const handleCategory = (cat) => {
    setActive(cat.placementCategoryId);

    if (cat.placementCategoryId === null) {
      setFilteredPlacement(allPlacements);
      return;
    }

    const filtered = allPlacements.filter(
      (p) => p.placementCategoryId == cat.placementCategoryId
    );

    setFilteredPlacement(filtered);
  };

  /* =======================
        SEARCH FILTER
  ======================= */
  const finalResult = filteredPlacement.filter((p) => {
    const text = searchQuery.toLowerCase();

    return (
      p?.student_name?.toLowerCase().includes(text) ||
      p?.email?.toLowerCase().includes(text)
    );
  });

  const handleidwise = (item) => {
    navigate(
      ROUTES.ADMIN_PLACEMENT_DETAIL_EDIT.replace(":id", item.placement_id)
    );
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row text-one font-poppins font-sora">
      {/* SIDEBAR */}
      <div className="w-full lg:w-auto overflow-x-auto lg:overflow-y-auto p-4 flex gap-3 lg:flex-col border-b lg:border-b-0 lg:border-r border-gray-700">
        {categories.map((item, idx) => (
          <button
            key={idx}
            onClick={() => handleCategory(item)}
            className={`whitespace-nowrap border px-4 py-2 rounded-full text-sm transition 
            ${
              active === item.placementCategoryId
                ? "bg-orange-500 border-orange-500 text-black"
                : "border-white hover:bg-gray-800"
            }`}
          >
            {item.name}
          </button>
        ))}
      </div>

      {/* MAIN CONTENT */}
      <main className="flex-1 p-4 md:p-8">
        <h2 className="text-xl md:text-2xl font-semibold pb-5">
          Total Placements ({finalResult.length})
        </h2>

        {/* SEARCH */}
        <div className="mt-4 relative">
          <Search className="absolute left-4 top-3 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search by name, email"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full border border-white rounded-full py-3 pl-12 pr-5 outline-none focus:ring-2 focus:ring-orange-400 transition"
          />
        </div>

        {/* HEADER */}
        <div className="mt-6 hidden md:grid grid-cols-5 gap-2 font-bold">
          <h2></h2>
          <h2>Name</h2>
          <h2>Email</h2>
          <h2>Course</h2>
          <h2>Duration</h2>
        </div>

        {/* DATA LIST */}
        <div className="flex flex-col gap-4 mt-4">
          {finalResult.map((u, idx) => (
            <div
              key={idx}
              onClick={() => handleidwise(u)}
              className="border border-white rounded-xl p-4 hover:bg-[#222] transition
      grid grid-cols-1 md:grid-cols-5 gap-3 md:gap-4 cursor-pointer"
            >
              {/* IMAGE */}
              <div className="flex items-center gap-3 md:block">
                <img
                  src={u.image}
                  alt={u.student_name}
                  className="w-10 h-10 rounded-full object-cover border"
                />

                {/* NAME (mobile visible) */}
                <div className="md:hidden">
                  <p className="font-semibold">{u.student_name}</p>
                  <p className="text-xs text-gray-400">{u.email}</p>
                </div>
              </div>

              {/* DESKTOP FIELDS */}
              <div className="hidden md:block truncate">{u.student_name}</div>
              <div className="hidden md:block truncate">{u.email}</div>
              <div className="hidden md:block truncate">{u.course}</div>
              <div className="hidden md:block truncate">{u.duration}</div>

              {/* MOBILE EXTRA INFO */}
              <div className="md:hidden text-sm text-gray-300 mt-2">
                <p>
                  <span className="font-semibold">Course:</span> {u.course}
                </p>
                <p>
                  <span className="font-semibold">Duration:</span> {u.duration}
                </p>
              </div>
            </div>
          ))}

          {finalResult.length === 0 && (
            <p className="text-center text-gray-400 mt-4">
              No placements found
            </p>
          )}
        </div>
      </main>
      <button
        onClick={() => navigate(ROUTES.ADMIN_PLACEMENT_DETAIL)}
        className="fixed right-10 bottom-10 w-14 h-14 bg-one text-black text-3xl rounded-full font-bold shadow-lg"
      >
        +
      </button>
    </div>
  );
}
