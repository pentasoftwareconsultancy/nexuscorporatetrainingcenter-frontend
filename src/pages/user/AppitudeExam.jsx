import React, { useState, useEffect } from "react";
import { Search, ExternalLink } from "lucide-react";
import { ROUTES } from "../../core/constants/routes.constant";
import { useNavigate } from "react-router-dom";
import ApiService from "../../core/services/api.service";
import ServerUrl from "../../core/constants/serverURL.constant";
import Button from "../../components/common/Button";

export default function ApptitudeExam() {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);

  const [categories, setCategories] = useState([]);
  const [tests, setTests] = useState([]); // store ALL tests

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const api = new ApiService();

        // 1️⃣ Get categories
        const catRes = await api.apiget(ServerUrl.API_GET_TEST_CATEGORIES);
        const categoryList = Array.isArray(catRes.data.data)
          ? catRes.data.data
          : [];

        setCategories(categoryList);

        // set default category
        if (categoryList.length > 0) {
          setSelectedCategory(categoryList[0].id);
        }

        // 2️⃣ Get ALL tests once
        const testRes = await api.apiget(ServerUrl.API_GET_TESTS);
        const testList = Array.isArray(testRes.data.data)
          ? testRes.data.data
          : [];

        setTests(testList);
      } catch (err) {
        console.error("Error fetching:", err);
      }
    };

    fetchData();
  }, []);

  // 🟧 Filter topics by selected category + search
  const filteredTests = tests.filter((t) => {
    return (
      t.categoryId === selectedCategory &&
      t.title.toLowerCase().includes(search.toLowerCase())
    );
  });

  return (
    <div className="min-h-screen w-full text-white flex flex-col font-sans px-6 md:px-12">
      {/* ------------------ HEADER ------------------ */}
      <header className="py-6 border-b border-gray-800">
        <h1 className="text-3xl sm:text-4xl font-bold mb-2">Aptitude Test</h1>
        <p className="text-gray-400 text-sm sm:text-base">
          Choose a test to assess your skills with Nexus Corporate Training
          Center LLP
        </p>

        {/* Search Bar */}
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

      <div className="flex flex-1 overflow-hidden flex-col md:flex-row w-full">
        {/* ------------------ SIDEBAR ------------------ */}
        <aside className="w-full md:w-64 border-b md:border-b-0 md:border-r border-gray-800 p-2 flex flex-wrap md:flex-col gap-2 md:gap-3 overflow-y-auto">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`text-xs sm:text-sm rounded-full border px-3 py-2 transition ${
                cat.id === selectedCategory
                  ? "bg-orange-500 text-white border-orange-500"
                  : "border-gray-600 text-gray-300 hover:bg-[#1a1a1a]"
              }`}
            >
              {cat.name}
            </button>
          ))}
        </aside>

        {/* ------------------ TEST CARDS ------------------ */}
        <main className="flex-1 p-4 sm:p-6 md:p-10 overflow-y-auto">
          <h2 className="text-xl sm:text-2xl font-semibold mb-6">
            {categories.find((c) => c.id === selectedCategory)?.name || ""}
          </h2>

          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
            {filteredTests.map((topic) => (
              <div
                key={topic.id}
                className="bg-[#1a1a1a] border border-white rounded-2xl p-4 h-36 
        flex flex-col justify-between items-start hover:border-gray-500 transition"
              >
                <div>
                {/* TITLE */}
                <p className="text-xs sm:text-sm md:text-base break-words leading-tight">
                  • {topic.title}
                </p>

                {/* STATUS BELOW TITLE */}
                {topic.status === 1 ? (
                  <p className="text-[10px] sm:text-xs text-green-400 font-semibold">
                    Test Completed
                  </p>
                ) : null}
                </div>

                {/* SHOW BUTTON ONLY IF NOT COMPLETED */}
                <Button
                  text="Take Quiz"
                  onClick={() =>
                    navigate(`${ROUTES.USER_EXAM}/${topic.id}`)
                  }
                  className={`mt-4 px-1 py-1 w-2/3 size-2/5 ${
                    topic.status === 1
                  }`}
                />
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}
