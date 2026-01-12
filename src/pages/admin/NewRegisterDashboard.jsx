import React, { useEffect, useState } from "react";
import { Search, Bell, Menu } from "lucide-react";
import ApiService from "../../core/services/api.service";
import ServerUrl from "../../core/constants/serverURL.constant";

export default function NewRegisterDashboard() {
  const api = new ApiService();

  const [allUsers, setAllUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const fetchUser = async () => {
    try {
      const res = await api.apiget(ServerUrl.API_NEW_REGISTRATION);
      const list = res?.data?.data || [];

      const formatData = list.map((v) => ({
        id: v.id,
        name: v.userName || "N/A",
        email: v.emailOrPhone || "N/A",
        phone: v.phoneNumber || "N/A",
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
    <div className="relative min-h-screen flex text-white font-sora overflow-hidden">

      {/* MOBILE TOP BAR */}
      <div className="lg:hidden fixed top-0 left-0 w-full flex justify-between items-center px-4 py-4 z-20 border-b border-gray-700 bg-black">
        <Menu
          onClick={() => setMobileMenuOpen(true)}
          className="text-white"
          size={28}
        />
        <h2 className="text-lg font-semibold">New Registration Users</h2>
        <Bell className="text-white" size={24} />
      </div>

      {/* MAIN CONTENT */}
      <main className="flex-1 p-4 w-full overflow-y-auto mt-14 lg:mt-0">

        <h2 className="text-xl md:text-2xl font-semibold pb-5">
          New Registration Users ({allUsers.length})
        </h2>

        {/* SEARCH BAR */}
        <div className="mt-6 relative">
          <Search className="absolute left-4 top-3 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search by name, email"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full border border-white rounded-full py-3 pl-12 pr-5 outline-none focus:ring-2 focus:ring-orange-400 transition bg-transparent"
          />
        </div>

        {/* DESKTOP HEADINGS */}
        <div className="hidden md:grid mt-6 grid-cols-3 gap-4 border-b border-gray-600 pb-3">
          <h2 className="font-bold">Name</h2>
          <h2 className="font-bold">Email</h2>
          <h2 className="font-bold">Phone Number</h2>
        </div>

        {/* USER LIST */}
        <div className="flex flex-col gap-4 mt-4">
          {filteredUsers.map((u) => (
            <div
              key={u.id}
              className="border border-white rounded-xl p-4 hover:bg-[#222] transition 
                grid grid-cols-1 md:grid-cols-3 gap-2"
            >
              {/* MOBILE */}
              <div className="md:hidden space-y-1">
                <p><span className="font-semibold">Name:</span> {u.name}</p>
                <p><span className="font-semibold">Email:</span> {u.email}</p>
                <p><span className="font-semibold">Phone:</span> {u.phone}</p>
              </div>

              {/* DESKTOP */}
              <p className="hidden md:block truncate">{u.name}</p>
              <p className="hidden md:block truncate">{u.email}</p>
              <p className="hidden md:block truncate">{u.phone}</p>
            </div>
          ))}

          {filteredUsers.length === 0 && (
            <p className="text-center text-gray-400 mt-4">
              No new users found
            </p>
          )}
        </div>
      </main>
    </div>
  );
}
