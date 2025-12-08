import React, { useState } from "react";
import { Search } from "lucide-react";

export default function CompletedTestDashboard() {
  const categories = [
    "Full Stack Python",
    "Full Stack Developer",
    "Dev Ops",
    "AWS Solution Architect",
    "Power BI / Data analyst",
    "Data Science",
    "Big Data",
    "Data Engineer",
    "Google Cloud",
    "Azure 104 admin",
    "Dev- 320",
    "Software Testing/ QA",
    "Manual testing",
    "Auto testing",
    "Database testing",
    "Mobile testing",
    "ETC training",
    "Ethical hacking",
    "Graphic Design",
  ];

  const initialUsers = new Array(15).fill({
    name: "Vaishnavi Gopale",
    email: "vaishnavigopale22@gmail.com",
    course: "Full Stack Python",
    duration: "6 months",
  });

  const [allUsers] = useState(initialUsers);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("Enquiry");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredUsers = allUsers.filter((u) => {
    const matchCategory =
      selectedCategory === "" || u.course === selectedCategory;

    const matchSearch =
      u.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.email.toLowerCase().includes(searchQuery.toLowerCase());

    return matchCategory && matchSearch;
  });

  return (
    <div className="relative min-h-screen flex text-one font-sora bg-black text-white">

      {/* SIDEBAR – Desktop */}
      <div className="hidden lg:block p-6 overflow-y-auto w-[260px] border-r border-gray-800">
        <h3 className="text-xl font-semibold mb-4">Categories</h3>
        <div className="flex flex-col gap-3 pr-2">
          {categories.map((item) => (
            <button
              key={item}
              onClick={() => setSelectedCategory(item)}
              className={`border px-3 py-2 rounded-full text-sm transition 
              ${
                selectedCategory === item
                  ? "bg-orange-500 border-orange-500 text-black"
                  : "border-white hover:bg-gray-800"
              }`}
            >
              {item}
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
              key={item}
              onClick={() => setSelectedCategory(item)}
              className={`px-4 py-2 rounded-full text-sm border transition flex-shrink-0
              ${
                selectedCategory === item
                  ? "bg-orange-500 border-orange-500 text-black"
                  : "border-white"
              }`}
            >
              {item}
            </button>
          ))}
        </div>

        {/* PAGE TITLE */}
        <h2 className="text-xl md:text-2xl font-semibold mt-6">
          Users Completed Test ({allUsers.length})
        </h2>

        {/* FILTER BUTTONS */}
        <div className="flex flex-wrap gap-3 mt-4">
          {["Enquiry", "Class Visit", "Direct Admissions"].map((item) => (
            <button
              key={item}
              onClick={() => setSelectedFilter(item)}
              className={`px-5 py-2 rounded-full transition border 
            ${
              selectedFilter === item
                ? "border-orange-400 bg-orange-400 text-black"
                : "border-white hover:bg-gray-800"
            }`}
            >
              {item}
            </button>
          ))}
        </div>

        {/* SEARCH BAR */}
        <div className="mt-6 relative">
          <Search className="absolute left-4 top-3 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search by name, email"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full border border-white rounded-full py-3 pl-12 pr-5 
              bg-transparent outline-none focus:ring-2 focus:ring-orange-400"
          />
        </div>

        {/* DESKTOP HEADERS */}
        <div className="hidden md:grid grid-cols-4 gap-4 mt-8 bg-gray-900 p-4 rounded-lg border border-gray-700">
          <h2 className="font-bold">Name</h2>
          <h2 className="font-bold">Email</h2>
          <h2 className="font-bold">Course name</h2>
          <h2 className="font-bold">Course duration</h2>
        </div>

        {/* USER LIST */}
        <div className="flex flex-col gap-4 mt-6 pb-10">
          {filteredUsers.map((u, index) => (
            <div
              key={index}
              className="border border-gray-700 rounded-xl p-4 hover:bg-gray-900 transition 
                grid grid-cols-1 md:grid-cols-4 gap-3"
            >
              {/* MOBILE VIEW */}
              <div className="md:hidden space-y-2 text-sm">
                <p><span className="font-semibold">Name:</span> {u.name}</p>
                <p><span className="font-semibold">Email:</span> {u.email}</p>
                <p><span className="font-semibold">Course:</span> {u.course}</p>
                <p><span className="font-semibold">Duration:</span> {u.duration}</p>
              </div>

              {/* DESKTOP VIEW */}
              <p className="hidden md:block truncate">{u.name}</p>
              <p className="hidden md:block truncate">{u.email}</p>
              <p className="hidden md:block truncate">{u.course}</p>
              <p className="hidden md:block truncate">{u.duration}</p>
            </div>
          ))}

          {filteredUsers.length === 0 && (
            <p className="text-center text-gray-400 mt-4">No users found</p>
          )}
        </div>
      </main>
    </div>
  );
}
