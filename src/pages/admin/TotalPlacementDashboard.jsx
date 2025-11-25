import React, { useState } from "react";
import { Search, Bell, Menu } from "lucide-react";

export default function TotalPlacementDashboard() {
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
  const [searchQuery, setSearchQuery] = useState("");

  // Filtering Users
  const filteredUsers = allUsers.filter((u) => {
    const matchCategory =
      selectedCategory === "" || u.course === selectedCategory;

    const matchSearch =
      u.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.email.toLowerCase().includes(searchQuery.toLowerCase());

    return matchCategory && matchSearch;
  });

  return (
    <div className="relative min-h-screen flex text-one font-poppins overflow-hidden font-sora">

      <div className="hidden lg:flex p-6 overflow-y-auto">

        <div className="mt-6">
          <div className="flex flex-col gap-3 overflow-y-auto pr-2">
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
      </div>

      {/* MAIN CONTENT */}
      <main className="flex-1 p-6 lg:p-10 w-full overflow-y-auto">
          <h2 className="text-xl md:text-2xl font-semibold pb-5">
            Total Placements ({allUsers.length})
          </h2>

        {/* SEARCH BAR */}
        <div className="mt-6 relative">
          <Search className="absolute left-4 top-3 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search by name, email"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full border border-white rounded-full py-3 pl-12 pr-5 outline-none focus:ring-2 focus:ring-orange-400 transition"
          />
        </div>

        {/* INPUT FIELDS */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-4 gap-4">
          <h2 className="px-3 pt-3 font-bold">Name</h2>
          <h2 className="px-3 pt-3 font-bold">Email</h2>
          <h2 className="px-3 pt-3 font-bold">Course name</h2>
          <h2 className="px-3 pt-3 font-bold">Course duration</h2>
        </div>

        {/* USER LIST – PERFECTLY ALIGNED */}
        <div>


          {/* Rows */}
          <div className="flex flex-col gap-3 mt-4">
            {filteredUsers.map((u, index) => (
              <div
                key={index}
                className="grid grid-cols-4 border border-white rounded-xl py-3 px-4 hover:bg-[#222] transition"
              >
                <p className="truncate">{u.name}</p>
                <p className="truncate">{u.email}</p>
                <p className="truncate">{u.course}</p>
                <p className="truncate">{u.duration}</p>
              </div>
            ))}

            {filteredUsers.length === 0 && (
              <p className="text-center text-gray-400 mt-4">No users found</p>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
