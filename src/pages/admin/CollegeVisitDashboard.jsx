import React, { useState } from "react";
import { Search } from "lucide-react";

export default function CollegeVisitDashboard() {
  const initialUsers = new Array(15).fill({
    name: "Vaishnavi Gopale",
    email: "vaishnavigopale22@gmail.com",
    course: "Full Stack Python",
    duration: "6 months",
  });

  const [allUsers] = useState(initialUsers);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredUsers = allUsers.filter((u) => {
    return (
      u.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.email.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  return (
    <div className="relative min-h-screen flex text-one font-poppins overflow-hidden font-sora">
      <main className="flex-1 p-4 md:p-8 w-full overflow-y-auto">
        <h2 className="text-lg md:text-2xl font-semibold pb-5">
          Total College visits ({allUsers.length})
        </h2>

        {/* SEARCH BAR */}
        <div className="mt-4 relative">
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

        {/* HEADERS (Desktop Only) */}
        <div className="hidden md:grid grid-cols-4 gap-4 mt-8">
          <h2 className="px-3 pt-3 font-bold">Name</h2>
          <h2 className="px-3 pt-3 font-bold">Email</h2>
          <h2 className="px-3 pt-3 font-bold">Course Name</h2>
          <h2 className="px-3 pt-3 font-bold">Course Duration</h2>
        </div>

        {/* USER LIST */}
        <div className="flex flex-col gap-4 mt-6">
          {filteredUsers.map((u, index) => (
            <div
              key={index}
              className="border border-white rounded-xl p-4 hover:bg-[#222] transition 
                         grid grid-cols-1 md:grid-cols-4 gap-3"
            >
              {/* MOBILE LABEL + VALUE */}
              <div className="md:hidden flex justify-between">
                <span className="font-semibold">Name:</span>
                <span className="truncate">{u.name}</span>
              </div>

              <p className="hidden md:block truncate">{u.name}</p>

              <div className="md:hidden flex justify-between">
                <span className="font-semibold">Email:</span>
                <span className="truncate">{u.email}</span>
              </div>

              <p className="hidden md:block truncate">{u.email}</p>

              <div className="md:hidden flex justify-between">
                <span className="font-semibold">Course:</span>
                <span className="truncate">{u.course}</span>
              </div>

              <p className="hidden md:block truncate">{u.course}</p>

              <div className="md:hidden flex justify-between">
                <span className="font-semibold">Duration:</span>
                <span className="truncate">{u.duration}</span>
              </div>

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
