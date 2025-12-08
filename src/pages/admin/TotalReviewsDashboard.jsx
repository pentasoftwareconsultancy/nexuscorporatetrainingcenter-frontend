import React, { useState } from "react";
import { Search } from "lucide-react";

export default function TotalReviewsDashboard() {
  const initialUsers = new Array(15).fill({
    name: "Vaishnavi Gopale",
    email: "vaishnavigopale22@gmail.com",
    course: "Full Stack Python",
    duration: "6 months",
  });

  const [allUsers] = useState(initialUsers);
  const [searchQuery, setSearchQuery] = useState("");

  // Filtering Users
  const filteredUsers = allUsers.filter((u) => {
    return (
      u.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.email.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  return (
    <div className="min-h-screen bg-black text-white font-sora p-4 md:p-10">
      {/* TITLE */}
      <h2 className="text-xl md:text-2xl font-semibold pb-5">
        Total Reviews ({allUsers.length})
      </h2>

      {/* SEARCH BAR */}
      <div className="mt-6 relative">
        <Search className="absolute left-4 top-3 text-gray-400" size={20} />
        <input
          type="text"
          placeholder="Search by name, email"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full border border-white rounded-full py-3 pl-12 pr-5 
          outline-none focus:ring-2 focus:ring-orange-400 transition bg-black"
        />
      </div>

      {/* DESKTOP TABLE HEADERS */}
      <div className="mt-6 hidden md:grid grid-cols-4 gap-4 font-bold">
        <h2>Name</h2>
        <h2>Email</h2>
        <h2>Course name</h2>
        <h2>Course duration</h2>
      </div>

      {/* USER LIST */}
      <div className="flex flex-col gap-4 mt-4">
        {filteredUsers.map((u, index) => (
          <div
            key={index}
            className="border border-white rounded-xl p-4 hover:bg-[#222] transition
            grid grid-cols-1 md:grid-cols-4 gap-2 md:gap-4"
          >
            {/* MOBILE LABELS */}
            <div className="md:hidden">
              <p className="text-sm text-gray-400">Name</p>
              <p className="font-medium truncate">{u.name}</p>
            </div>
            <p className="hidden md:block truncate">{u.name}</p>

            <div className="md:hidden">
              <p className="text-sm text-gray-400">Email</p>
              <p className="font-medium truncate">{u.email}</p>
            </div>
            <p className="hidden md:block truncate">{u.email}</p>

            <div className="md:hidden">
              <p className="text-sm text-gray-400">Course</p>
              <p className="font-medium truncate">{u.course}</p>
            </div>
            <p className="hidden md:block truncate">{u.course}</p>

            <div className="md:hidden">
              <p className="text-sm text-gray-400">Duration</p>
              <p className="font-medium truncate">{u.duration}</p>
            </div>
            <p className="hidden md:block truncate">{u.duration}</p>
          </div>
        ))}

        {filteredUsers.length === 0 && (
          <p className="text-center text-gray-400 mt-4">No users found</p>
        )}
      </div>
    </div>
  );
}
