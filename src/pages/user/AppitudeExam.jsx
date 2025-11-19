import React, { useState } from "react";
import { Search, ExternalLink } from "lucide-react";
import { ROUTES } from "../../core/constants/routes.constant";
import topicsData from "../../assets/saniya/ApptitudeExam.json";
import { useNavigate } from "react-router-dom";

export default function ApptitudeExam() {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Full Stack Python");
  const navigate = useNavigate();

  const categories = Object.keys(topicsData);

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };

  return (
    <div className="min-h-screen w-full text-white flex flex-col font-sans px-6 md:px-12">
      {/* --------------------- HEADER --------------------- */}
      <header className="py-6 border-b border-gray-800">
        <h1 className="text-3xl sm:text-4xl font-bold mb-2">Aptitude Test</h1>
        <p className="text-gray-400 text-sm sm:text-base">
          Choose a test to assess your skills with Nexus Corporate Training
          Center LLP
        </p>

        <div className="relative mt-4 w-full">
          <Search
            size={18}
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
          />
          <input
            type="text"
            placeholder="Search for a test..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-transparent border border-gray-700 rounded-full py-2 pl-10 pr-4 text-sm focus:outline-none focus:border-gray-500"
          />
        </div>
      </header>

      {/* --------------------- BODY --------------------- */}
      <div className="flex flex-1 overflow-hidden flex-col md:flex-row w-full">
        {/* --------------- CATEGORY SIDEBAR --------------- */}
        <aside className="w-full md:w-64 border-b md:border-b-0 md:border-r border-gray-800 p-2 flex flex-wrap md:flex-col gap-2 md:gap-3 overflow-y-auto">
          {categories.map((cat, i) => (
            <button
              key={i}
              onClick={() => handleCategoryClick(cat)}
              className={`text-xs sm:text-sm rounded-full border px-3 py-2 transition ${
                cat === selectedCategory
                  ? "bg-orange-500 text-white border-orange-500"
                  : "border-gray-600 text-gray-300 hover:bg-[#1a1a1a]"
              }`}
            >
              {cat}
            </button>
          ))}
        </aside>

        {/* --------------- TOPIC LISTING --------------- */}
        <main className="flex-1 p-4 sm:p-6 md:p-10 overflow-y-auto">
          <h2 className="text-xl sm:text-2xl font-semibold mb-6">
            {selectedCategory}
          </h2>

          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
            {(topicsData[selectedCategory] || [])
              .filter((topic) =>
                topic.toLowerCase().includes(search.toLowerCase())
              )
              .map((topic, index) => (
                <div
                  key={index}
                  className="bg-[#1a1a1a] border border-white rounded-2xl p-4 h-28 flex flex-col justify-between hover:border-gray-500 transition"
                >
                  <p className="text-xs sm:text-sm md:text-base break-words leading-tight line-clamp-2">
                    • {topic}
                  </p>

                  {/* 🚀 SEND USER TO USER_EXAM */}
                  <button
                    onClick={() => navigate(ROUTES.USER_EXAM)}
                    className="group px-2 py-1 bg-white text-orange-600 font-semibold 
                      rounded-full flex items-center justify-start gap-1 mt-2 
                      hover:bg-gray-50 transition text-[11px] sm:text-sm whitespace-nowrap w-fit"
                  >
                    Take Quiz
                    <span
                      className="w-4 h-4 sm:w-5 sm:h-5 flex items-center justify-center 
                        rounded-full bg-orange-500 text-white group-hover:bg-orange-700 ml-1"
                    >
                      <ExternalLink size={10} />
                    </span>
                  </button>
                </div>
              ))}
          </div>
        </main>
      </div>
    </div>
  );
}
