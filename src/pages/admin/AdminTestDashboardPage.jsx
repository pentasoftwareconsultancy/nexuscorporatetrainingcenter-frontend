import React, { useEffect, useState } from "react";
import { Search, Edit, Delete } from "lucide-react";
import ServerUrl from "../../core/constants/serverURL.constant";
import { useNavigate } from "react-router-dom";
import ApiService from "../../core/services/api.service";
import Button from "../../components/common/Button";
import { ROUTES } from "../../core/constants/routes.constant";

export default function AdminTestDashboardPage() {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [search, setSearch] = useState("");

  const [categories, setCategories] = useState([]);
  const [tests, setTests] = useState([]); // store ALL tests

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const api = new ApiService();

        const res = await api.apiget(ServerUrl.API_GEY_CATEGORY_AND_TESTS);

        const categoryList = Array.isArray(res.data) ? res.data : [];

        setCategories(categoryList);

        // flatten tests from categories
        const allTests = categoryList.flatMap((cat) =>
          cat.tests.map((test) => ({
            ...test,
            categoryId: cat.id,
          }))
        );

        setTests(allTests);

        // set default category
        if (categoryList.length > 0) {
          setSelectedCategory(categoryList[0].id);
        }
      } catch (err) {
        console.error("Error fetching category & tests:", err);
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
    <div className="relative min-h-screen flex text-one font-sora text-white">
      {/* SIDEBAR – Desktop */}
      <div className="hidden lg:block p-6 overflow-y-auto w-[260px] border-r border-gray-800">
        <h3 className="text-xl font-semibold mb-4">Categories</h3>
        <div className="flex flex-col gap-3 pr-2">
          {categories.map((item) => (
            <button
              key={item.id}
              onClick={() => setSelectedCategory(item.id)}
              className={`border px-3 py-2 rounded-full text-sm transition 
      ${
        selectedCategory === item.id
          ? "bg-orange-500 border-orange-500 text-black"
          : "border-white hover:bg-gray-800"
      }`}
            >
              {item.name}
            </button>
          ))}
        </div>
      </div>

      {/* MAIN CONTENT AREA */}
      <main className="flex-1 p-4 sm:p-6 md:p-8 overflow-y-auto w-full">
        {/* MOBILE CATEGORY SCROLLER */}
        <div className="lg:hidden w-full overflow-x-auto whitespace-nowrap flex gap-3 pb-2 mt-2">
          {categories.map((item) => (
            <button
              key={item.id}
              onClick={() => setSelectedCategory(item.id)}
              className={`px-4 py-2 rounded-full text-sm border transition flex-shrink-0
      ${
        selectedCategory === item.id
          ? "bg-orange-500 border-orange-500 text-black"
          : "border-white"
      }`}
            >
              {item.name}
            </button>
          ))}
        </div>

        {/* PAGE TITLE */}
        <h2 className="text-xl md:text-2xl font-semibold mt-6">
          Category wise courses lists ({tests.length})
        </h2>

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

        {/* ------------------ TEST CARDS ------------------ */}
        <div className="flex-1 p-4 sm:p-6 md:p-10 overflow-y-auto">
          <h2 className="text-xl sm:text-2xl font-semibold mb-6">
            {categories.find((c) => c.id === selectedCategory)?.name || ""}
          </h2>

          <div className="grid grid-cols-2 sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-2">
            {filteredTests.map((topic) => (
              <div
                key={topic.id}
                className="bg-[#1a1a1a] border border-white rounded-2xl p-4 h-36 w-full
        flex flex-col justify-between items-start hover:border-gray-500 transition"
              >
                <div>
                  {/* TITLE */}
                  <p className="text-xs sm:text-sm md:text-base break-words leading-tight">
                    • {topic.title}
                  </p>
                </div>

                {/* SHOW BUTTON ONLY IF NOT COMPLETED */}
                <div className="w-full flex justify-end gap-2 mt-8">
                  <Button
                    text={
                      <div className="flex gap-3 items-center justify-center">
                        <Edit />
                        /
                        <Delete />
                      </div>
                    }
                    className={`px-4 py-4 w-2/3 size-2/5 ${topic.status === 1}`}
                    showIcon={false}
                    onClick={() =>
                      navigate(
                        `${ROUTES.ADMIN_TEST_CATEGORY_FORM_EDIT}/${topic.id}`
                      )
                    }
                  />
                  <Button
                    text="Questions"
                    className={`px-4 py-4 w-2/3 size-2/5 ${topic.status === 1}`}
                    showIcon={false}
                    onClick={() =>
                      navigate(
                        `${ROUTES.ADMIN_QUESTION_DASHBOARD_BY_ID}/${topic.id}`
                      )
                    }
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
      <button
        onClick={() => navigate(ROUTES.ADMIN_TEST_CATEGORY_FORM)}
        className="fixed right-10 bottom-10 w-14 h-14 bg-one text-black text-3xl rounded-full font-bold shadow-lg"
      >
        +
      </button>
    </div>
  );
}
