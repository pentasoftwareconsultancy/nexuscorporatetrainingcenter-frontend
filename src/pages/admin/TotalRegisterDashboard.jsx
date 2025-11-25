import React, { useState } from "react";
import { Search, Bell, Menu } from "lucide-react";

export default function TotalRegisterDashboard() {
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
  const [activeMenu, setActiveMenu] = useState("Dashboard");

  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    course: "",
    duration: "",
  });

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
    <div className="relative min-h-screen flex bg-[#0f0f0f] text-white font-poppins overflow-hidden">

      {/* SIDEBAR */}
      <h1 className="absolute text-2xl font-bold text-white mb-10 mx-5">NEXUS</h1>

      <div className="hidden lg:flex w-[350px] bg-[#0E0E0E] border-r border-white p-6 overflow-y-auto">
        <nav className="flex flex-col gap-4 text-gray-300 border-b mt-10 mr-3 border-white pb-6">
          {["Dashboard", "Courses", "Gallery", "Placements"].map((btn) => (
            <button
              key={btn}
              onClick={() => setActiveMenu(btn)}
              className={`text-left px-3 py-2 rounded-md transition 
                ${
                  activeMenu === btn
                    ? "bg-black text-white font-semibold"
                    : "hover:bg-gray-800"
                }`}
            >
              {btn}
            </button>
          ))}

          <button className="mt-60 bg-orange-500 text-white py-2 px-5 rounded-full">
            Log out
          </button>
        </nav>

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
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-xl md:text-2xl font-semibold">
            Total Registration Users ({allUsers.length})
          </h2>

          <div className="flex items-center gap-5">
            <Menu className="lg:hidden cursor-pointer" />
            <Bell size={22} className="text-white" />
            <img
              src="https://i.pravatar.cc/50"
              alt="user"
              className="w-10 h-10 rounded-full"
            />
          </div>
        </div>

        {/* FILTER BUTTONS */}
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
            className="w-full bg-[#1a1a1a] border border-white rounded-full py-3 pl-12 pr-5 outline-none focus:ring-2 focus:ring-orange-400 transition"
          />
        </div>

        {/* INPUT FIELDS */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-4 gap-4">
          <input
            type="text"
            placeholder="Name"
            value={newUser.name}
            onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
            className="bg-black rounded-full p-3 outline-none focus:ring-2 focus:ring-orange-400"
          />

          <input
            type="email"
            placeholder="Email"
            value={newUser.email}
            onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
            className="bg-black rounded-full p-3 outline-none focus:ring-2 focus:ring-orange-400"
          />

          <input
            type="text"
            placeholder="Course Name"
            value={newUser.course}
            onChange={(e) => setNewUser({ ...newUser, course: e.target.value })}
            className="bg-black rounded-full p-3 outline-none focus:ring-2 focus:ring-orange-400"
          />

          <input
            type="text"
            placeholder="Course Duration"
            value={newUser.duration}
            onChange={(e) =>
              setNewUser({ ...newUser, duration: e.target.value })
            }
            className="bg-black rounded-full p-3 outline-none focus:ring-2 focus:ring-orange-400"
          />
        </div>

        {/* USER LIST – PERFECTLY ALIGNED */}
        <div className="mt-10">


          {/* Rows */}
          <div className="flex flex-col gap-3 mt-4">
            {filteredUsers.map((u, index) => (
              <div
                key={index}
                className="grid grid-cols-4 bg-[#1b1b1b] border border-white rounded-xl py-3 px-4 hover:bg-[#222] transition"
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
