import React, { useState } from "react";
import { Search,  } from "lucide-react";
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
    <div className="relative min-h-screen flex text-white bg-black font-sora">

      {/* LEFT CATEGORY SIDEBAR */}
      <div className="hidden lg:flex p-6 overflow-y-auto">
        <div className="mt-6 flex flex-col gap-3">
          {categories.map((item) => (
            <button
              key={item}
              onClick={() => setSelectedCategory(item)}
              className={`border px-4 py-2 rounded-full text-sm transition 
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

      {/* MAIN CONTENT */}
      <main className="flex-1 p-6 lg:p-10 w-full overflow-y-auto">
        <div className="flex justify-between items-center pb-5">
          <h2 className="text-xl md:text-2xl font-semibold">
            Total Registration Users ({allUsers.length})
          </h2>

          {/* ADD USER BUTTON */}
        
        </div>

        {/* FILTERS */}
        <div className="flex flex-wrap gap-4">
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
            className="w-full border border-white rounded-full py-3 pl-12 pr-5 outline-none focus:ring-2 focus:ring-orange-400 transition"
          />
        </div>

        {/* TABLE HEADERS */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-4 gap-4 font-bold">
          <h2>Name</h2>
          <h2>Email</h2>
          <h2>Course name</h2>
          <h2>Course duration</h2>
        </div>

        {/* USER LIST */}
        <div className="flex flex-col gap-3 mt-4">
          {filteredUsers.map((u, index) => (
            <div
              key={index}
              className="grid grid-cols-1 md:grid-cols-4 border border-white rounded-xl py-3 px-4 hover:bg-[#222] transition"
            >
              <p>{u.name}</p>
              <p>{u.email}</p>
              <p>{u.course}</p>
              <p>{u.duration}</p>
            </div>
          ))}

          {filteredUsers.length === 0 && (
            <p className="text-center text-gray-400 mt-4">No users found</p>
          )}
        </div>
      </main>

      {/* ===== FLOATING + ICON (CENTER RIGHT) ===== */}
      <div
        onClick={() => navigate("/registerdetail")}
        className="
          fixed 
          top-11/12 
          right-8
          -translate-y-1/2
          w-12 h-12
          bg-white
          rounded-full
          flex items-center justify-center
          shadow-lg
          font-bold text-2xl
          text-black
          cursor-pointer
          hover:bg-orange-400
          transition-all
          z-50
        "
      >
        +
      </div>
    </div>
  );
}
