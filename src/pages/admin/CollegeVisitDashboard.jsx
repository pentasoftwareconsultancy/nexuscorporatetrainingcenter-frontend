import React, { useEffect, useState } from "react";
import { Search } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../core/constants/routes.constant";
import ServerUrl from "../../core/constants/serverURL.constant";
import ApiService from "../../core/services/api.service";

export default function CollegeVisitDashboard() {
  const navigate = useNavigate();
  const api = new ApiService();

  const [allUsers, setAllUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCollegeVisits = async () => {
      try {
        setLoading(true);

        // 1️⃣ Get all cities
        const cityRes = await api.apiget(ServerUrl.API_GET_CITIES);
        const cities = cityRes?.data?.data || [];

        let allColleges = [];

        // 2️⃣ Get colleges city-wise
        for (const city of cities) {
          const collegeRes = await api.apiget(
            ServerUrl.API_GET_COLLEGES_BY_CITY + city.id
          );

          const colleges = collegeRes?.data?.data || [];

          const enriched = colleges.map((c) => ({
            ...c,
            cityId: city.id,
            cityName: city.name,
          }));

          allColleges.push(...enriched);
        }

        // 3️⃣ Get images for each college
        const withImages = await Promise.all(
          allColleges.map(async (college) => {
            try {
              const imgRes = await api.apiget(
                ServerUrl.API_GET_IMAGES_BY_COLLEGE + college.id
              );

              const images = imgRes?.data?.data || [];

              return {
                collegename: college.name,
                collegecollab: images?.[0]?.description || "No description available",
                images: images.length,
              };
            } catch {
              return {
                collegename: college.name,
                collegecollab: "No description available",
                images: 0,
              };
            }
          })
        );

        setAllUsers(withImages);
      } catch (err) {
        console.error("Error fetching college visits:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCollegeVisits();
  }, []);

  const filteredUsers = allUsers.filter((u) =>
    u.collegename.toLowerCase().includes(searchQuery.toLowerCase()) ||
    u.collegecollab.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="relative min-h-screen flex text-one font-poppins overflow-hidden font-sora">
      <main className="flex-1 p-4 md:p-8 w-full overflow-y-auto">
        <h2 className="text-lg md:text-2xl font-semibold pb-5">
          Total College visits ({allUsers.length})
        </h2>

        {/* SEARCH */}
        <div className="mt-4 relative">
          <Search className="absolute left-4 top-3 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search by college or description"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full border border-white rounded-full py-3 pl-12 pr-5 outline-none 
                       focus:ring-2 focus:ring-orange-400 transition"
          />
        </div>

        {/* HEADERS */}
        <div className="hidden md:grid grid-cols-3 gap-4 mt-8">
          <h2 className="px-3 pt-3 font-bold">College Name</h2>
          <h2 className="px-3 pt-3 font-bold">College Description</h2>
          <h2 className="px-3 pt-3 font-bold">Images</h2>
        </div>

        {/* LIST */}
        <div className="flex flex-col gap-4 mt-6">
          {loading && (
            <p className="text-center text-gray-400 mt-4">
              Loading colleges...
            </p>
          )}

          {!loading &&
            filteredUsers.map((u, index) => (
              <div
                key={index}
                onClick={() => navigate(ROUTES.ADMIN_GALLERY_EVENT)}
                className="border border-white rounded-xl p-4 hover:bg-[#222] transition 
                           grid grid-cols-1 md:grid-cols-3 gap-3"
              >
                {/* MOBILE */}
                <div className="md:hidden flex justify-between">
                  <span className="font-semibold">College Name:</span>
                  <span className="truncate">{u.collegename}</span>
                </div>
                <p className="hidden md:block truncate">{u.collegename}</p>

                <div className="md:hidden flex justify-between">
                  <span className="font-semibold">Description:</span>
                  <span className="truncate">{u.collegecollab}</span>
                </div>
                <p className="hidden md:block truncate">{u.collegecollab}</p>

                <div className="md:hidden flex justify-between">
                  <span className="font-semibold">Images:</span>
                  <span>{u.images}</span>
                </div>
                <p className="hidden md:block truncate">{u.images}</p>
              </div>
            ))}

          {!loading && filteredUsers.length === 0 && (
            <p className="text-center text-gray-400 mt-4">No colleges found</p>
          )}
        </div>
      </main>
    </div>
  );
}
