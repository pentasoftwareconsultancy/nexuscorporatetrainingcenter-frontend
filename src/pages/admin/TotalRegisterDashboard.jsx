import React, { useEffect, useState } from "react";
import { Search } from "lucide-react";
import ApiService from "../../core/services/api.service";
import ServerUrl from "../../core/constants/serverURL.constant";

export default function TotalRegisterDashboard() {
  const api = new ApiService();

  const [allUsers, setAllUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const fetchUser = async () => {
    try {
      const res = await api.apiget(ServerUrl.API_TOTAL_REGISTRATION);
      const list = res?.data?.data || [];

      const formatData = list.map((v) => ({
        id: v.id,
        name: v.userName,
        email: v.emailOrPhone,
        phone: v.phoneNumber,
      }));

      setAllUsers(formatData);
    } catch (err) {
      console.error("user fetch error", err);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const filteredUsers = allUsers.filter(
    (u) =>
      u.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen flex flex-col text-white font-sora">
      <main className="flex-1 p-4 overflow-y-auto">
        <div className="flex justify-between items-center pb-5">
          <h2 className="text-xl md:text-2xl font-semibold">
            Total Registration Users ({allUsers.length})
          </h2>
        </div>

        {/* SEARCH */}
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

        {/* TABLE HEADER */}
        <div className="mt-6 hidden md:grid grid-cols-3 gap-4 font-bold">
          <h2>Name</h2>
          <h2>Email</h2>
          <h2>Phone Number</h2>
        </div>

        {/* LIST */}
        <div className="flex flex-col gap-4 mt-4">
          {filteredUsers.map((u) => (
            <div
              key={u.id}
              className="border border-white rounded-xl p-4 hover:bg-[#222] transition
              grid grid-cols-1 md:grid-cols-3 gap-2"
            >
              <div>{u.name}</div>
              <div className="truncate">{u.email}</div>
              <div>{u.phone}</div>
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
