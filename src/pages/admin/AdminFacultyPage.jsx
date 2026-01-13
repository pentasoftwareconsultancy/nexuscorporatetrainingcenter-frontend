import React from "react";
import ApiService from "../../core/services/api.service";
import ServerUrl from "../../core/constants/serverURL.constant";
import { Search } from "lucide-react";
import { ROUTES } from "../../core/constants/routes.constant";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
const AdminFacultyPage = () => {
  const navigate = useNavigate();
  const api = new ApiService();

  const [facultys, setFacultys] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const fetchFacultyData = async () => {
    try {
      const res = await api.apiget(ServerUrl.API_GET_FACULTYS);
      const list = res?.data?.data;

      const formatted = list.map((v) => ({
        id: v.facultyId,
        facultyName: v.faculty_name,
        experience: v.experience,
        profile: v.image,
        designation: v.designation,
        skills: v.skills,
      }));

      setFacultys(formatted);
    } catch (error) {
      console.error("Error fetching faculty data:", error);
    }
  };

  useEffect(() => {
    fetchFacultyData();
  }, []);

  const finalResult = facultys.filter((v) => {
    const text = searchQuery.toLowerCase();
    return (
      v.facultyName?.toLowerCase().includes(text) ||
      v.designation?.toLowerCase().includes(text) ||
      v.experience?.toLowerCase().includes(text) ||
      v.skills?.toLowerCase().includes(text)
    );
  });

  return (
    <section>
      <div className="container mx-auto p-4">
        <h2 className="text-xl md:text-2xl font-semibold pb-5">
          Total Faculty Members ({finalResult.length})
        </h2>

        {/* SEARCH */}
        <div className="mt-4 relative">
          <Search className="absolute left-4 top-3 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search faculty..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full border border-white rounded-full py-3 pl-12 pr-5 outline-none"
          />
        </div>

        {/* HEADER */}
        <div className="mt-6 hidden md:grid grid-cols-5 gap-2 font-bold">
          <h2>Profile</h2>
          <h2>Name</h2>
          <h2>Designation</h2>
          <h2>Experience</h2>
          <h2>Skills</h2>
        </div>

        {/* LIST */}
        <div className="flex flex-col gap-4 mt-4">
          {finalResult.map((v, idx) => (
            <div
              key={idx}
              onClick={() =>
                navigate(ROUTES.ADMIN_FACULTY_FORM_EDIT.replace(":id", v.id))
              }
              className="border border-white rounded-xl p-4 hover:bg-[#222] transition
      grid grid-cols-1 md:grid-cols-5 gap-3 md:gap-4 cursor-pointer"
            >
              {/* PROFILE + MOBILE TEXT */}
              <div className="flex items-center gap-3 md:block">
                <img
                  src={v.profile}
                  alt={v.facultyName}
                  className="w-12 h-12 rounded-full object-cover border"
                />

                {/* MOBILE NAME + DESIGNATION */}
                <div className="md:hidden">
                  <p className="font-semibold text-white">{v.facultyName}</p>
                  <p className="text-sm text-gray-400">{v.designation}</p>
                </div>
              </div>

              {/* DESKTOP FIELDS */}
              <div className="hidden md:block truncate text-white">
                {v.facultyName}
              </div>

              <div className="hidden md:block truncate text-gray-300">
                {v.designation}
              </div>

              <div className="hidden md:block truncate text-gray-400">
                {v.experience}
              </div>

              <div className="hidden md:block truncate text-gray-400">
                {v.skills}
              </div>

              {/* MOBILE EXTRA INFO */}
              <div className="md:hidden text-sm text-gray-300 mt-2 space-y-1">
                <p>
                  <span className="font-semibold">Experience:</span>{" "}
                  {v.experience}
                </p>
                <p>
                  <span className="font-semibold">Skills:</span> {v.skills}
                </p>
              </div>
            </div>
          ))}

          {finalResult.length === 0 && (
            <p className="text-center text-gray-400 mt-4">No faculty found</p>
          )}
        </div>
      </div>

      {/* ADD BUTTON */}
      <button
        onClick={() => navigate(ROUTES.ADMIN_FACULTY_FORM)}
        className="fixed right-10 bottom-10 w-14 h-14 bg-one text-black text-3xl rounded-full font-bold shadow-lg"
      >
        +
      </button>
    </section>
  );
};

export default AdminFacultyPage;
