import React, { useEffect, useState } from "react";
import ApiService from "../../core/services/api.service";
import ServerUrl from "../../core/constants/serverURL.constant";

export default function FacultyPage() {
  const api = new ApiService();
  const [faculty, setFaculty] = useState([]);
  const [loading, setLoading] = useState(true);

  // -------------------------------
  // 1️⃣ Fetch Faculty Data from Backend
  // -------------------------------
  useEffect(() => {
    const fetchFaculty = async () => {
      try {
        const res = await api.apiget(ServerUrl.API_GET_FACULTYS);

        if (res?.data?.success && Array.isArray(res.data.data)) {
          setFaculty(res.data.data);
        } else {
          console.error("Invalid faculty response:", res);
        }
      } catch (err) {
        console.error("Error fetching faculty:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchFaculty();
  }, []);

  // -------------------------------
  // 2️⃣ Loading UI
  // -------------------------------
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-white text-lg">Loading faculty...</p>
      </div>
    );
  }

  // -------------------------------
  // 3️⃣ Empty UI
  // -------------------------------
  if (!loading && faculty.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-white text-lg">No faculty found.</p>
      </div>
    );
  }

  // -------------------------------
  // 4️⃣ Render Faculty Cards
  // -------------------------------
  return (
    <div className=" text-white px-12 py-10">
      <h1 className="text-4xl font-bold mb-10">Our Faculty</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
        {faculty.map((fac, index) => (
          <div
            key={index}
            className="rounded-2xl p-5 shadow-lg hover:scale-105 transition duration-300"
          >
            <img
              src={fac.image}
              alt={fac.faculty_name}
              className="w-full h-52 object-cover rounded-xl mb-4"
              crossOrigin="anonymous"
            />

            <h2 className="text-xl font-semibold">{fac.faculty_name}</h2>

            <p className="text-sm text-gray-400 flex items-center gap-2 mt-2">
              <span>•</span>
              <span>Experience: {fac.experience}</span>
            </p>

            <p className="text-sm text-gray-400 flex items-center gap-2">
              <span>•</span>
              <span>Designation: {fac.designation}</span>
            </p>

            <p className="text-sm text-gray-400 flex items-center gap-2">
              <span>•</span>
              <span>Skills: {fac.skills}</span>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
