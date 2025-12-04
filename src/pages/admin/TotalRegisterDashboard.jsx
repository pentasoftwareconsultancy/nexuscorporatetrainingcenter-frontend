import React, { useState } from "react";
import { Search } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function TotalRegisterDashboard() {
  const categories = [
    "Full Stack Python",
    "Full Stack Developer",
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

  const initialUsers = new Array(10).fill({
    name: "Vaishnavi Gopale",
    email: "vaishnavigopale22@gmail.com",
    course: "Full Stack Python",
    duration: "6 months",
  });

  const [allUsers] = useState(initialUsers);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("Enquiry");
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const filteredUsers = allUsers.filter((u) => {
    const matchCategory =
      selectedCategory === "" || u.course === selectedCategory;

    const matchSearch =
      u.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.email.toLowerCase().includes(searchQuery.toLowerCase());

    return matchCategory && matchSearch;
  });

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-black text-white font-sora">

      {/* SIDEBAR – horizontal scroll on mobile */}
      <div className="w-full lg:w-60 p-4 flex gap-3 overflow-x-auto lg:overflow-y-auto lg:flex-col border-b lg:border-b-0 lg:border-r border-gray-700">
        {categories.map((item) => (
          <button
            key={item}
            onClick={() => setSelectedCategory(item)}
            className={`whitespace-nowrap px-4 py-2 rounded-full text-sm transition border
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

      {/* MAIN CONTENT */}
      <main className="flex-1 p-4 md:p-8 overflow-y-auto">
        <div className="flex justify-between items-center pb-5">
          <h2 className="text-xl md:text-2xl font-semibold">
            Total Registration Users ({allUsers.length})
          </h2>
        </div>

        {/* FILTER BUTTONS */}
        <div className="flex flex-wrap gap-3 md:gap-4">
          {["Enquiry", "Class Visit", "Direct Admissions"].map((item) => (
            <button
              key={item}
              onClick={() => setSelectedFilter(item)}
              className={`px-5 py-2 rounded-full transition border
                ${
                  selectedFilter === item
                    ? "border-orange-400 text-white"
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
            className="w-full border border-white rounded-full py-3 pl-12 pr-5 outline-none 
            focus:ring-2 focus:ring-orange-400 transition"
          />
        </div>

        {/* DESKTOP TABLE HEADER */}
        <div className="mt-6 hidden md:grid grid-cols-4 gap-4 font-bold">
          <h2>Name</h2>
          <h2>Email</h2>
          <h2>Course name</h2>
          <h2>Course duration</h2>
        </div>

        {/* USER LIST (Responsive Cards) */}
        <div className="flex flex-col gap-4 mt-4">
          {filteredUsers.map((u, index) => (
            <div
              key={index}
              className="border border-white rounded-xl p-4 hover:bg-[#222] transition
              grid grid-cols-1 md:grid-cols-4 gap-2 md:gap-4"
            >
              {/* MOBILE LABEL + VALUE VIEW */}
              <div className="md:hidden">
                <p className="text-sm text-gray-400">Name</p>
                <p className="font-medium truncate">{u.name}</p>
              </div>
              <div className="hidden md:block truncate">{u.name}</div>

              <div className="md:hidden">
                <p className="text-sm text-gray-400">Email</p>
                <p className="font-medium truncate">{u.email}</p>
              </div>
              <div className="hidden md:block truncate">{u.email}</div>

              <div className="md:hidden">
                <p className="text-sm text-gray-400">Course</p>
                <p className="font-medium truncate">{u.course}</p>
              </div>
              <div className="hidden md:block truncate">{u.course}</div>

              <div className="md:hidden">
                <p className="text-sm text-gray-400">Duration</p>
                <p className="font-medium truncate">{u.duration}</p>
              </div>
              <div className="hidden md:block truncate">{u.duration}</div>
            </div>
          ))}

          {filteredUsers.length === 0 && (
            <p className="text-center text-gray-400 mt-4">No users found</p>
          )}
        </div>
      </main>

      {/* FLOATING + BUTTON */}
      <div
        onClick={() => navigate("/registerdetail")}
        className="
          fixed bottom-6 right-6
          w-14 h-14
          bg-white text-black
          rounded-full flex items-center justify-center
          text-3xl shadow-lg cursor-pointer
          hover:bg-orange-400 transition z-50
        "
      >
        +
      </div>
    </div>
  );
}
