import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import ApiService from "../../../core/services/api.service";
import ServerUrl from "../../../core/constants/serverURL.constant";

export default function GallerySection() {
  const navigate = useNavigate();
  const api = new ApiService();

  const [cities, setCities] = useState([]);
  const [colleges, setColleges] = useState([]);
  const [selectedCity, setSelectedCity] = useState(null);
  const [loading, setLoading] = useState(false);

  // 🔥 Fetch cities on load
  useEffect(() => {
    api
      .apiget(ServerUrl.API_GET_CITIES)
      .then((res) => {
        const cityList = res.data.data || [];
        setCities(cityList);

        // ⭐ Auto-select first city
        if (cityList.length > 0) {
          setSelectedCity(cityList[0].id);
        }
      })
      .catch((err) => console.error("CITY FETCH ERROR:", err));
  }, []);

  // 🔥 Fetch colleges based on selected city
  useEffect(() => {
    if (!selectedCity) return;

    setLoading(true);

    api
      .apiget(ServerUrl.API_GET_COLLEGES_BY_CITY + selectedCity)
      .then((res) => {
        const collegeList = res.data.data || [];
        fetchCollegeImages(collegeList);
      })
      .catch((err) => {
        console.error("COLLEGE FETCH ERROR:", err);
        setColleges([]);
        setLoading(false);
      });
  }, [selectedCity]);

  // 🔥 Fetch images for each college
  const fetchCollegeImages = async (collegeList) => {
    if (!Array.isArray(collegeList) || collegeList.length === 0) {
      setColleges([]);
      setLoading(false);
      return;
    }

    const updated = await Promise.all(
      collegeList.map(async (college) => {
        try {
          const imgRes = await api.apiget(
            ServerUrl.API_GET_IMAGES_BY_COLLEGE + college.id
          );
          return {
            ...college,
            images: imgRes.data.data?.map((img) => img.url) || [],
          };
        } catch {
          return { ...college, images: [] };
        }
      })
    );

    setColleges(updated);
    setLoading(false);
  };

  // 🔥 Navigate to album
  const openAlbum = (college, city) => {
  navigate(`/gallery/album/${college.id}`, {
    state: { college, city },
  });
};

  const thumb = (college) =>
    college.images?.[0] || "/assets/placeholder-college.jpg";

  return (
    <section className="w-full px-12 py-10 text-white">
      {/* HEADER */}
      <div className="max-w-[2400px] mx-auto">
        <h2 className="text-4xl font-extrabold mb-6">Gallery</h2>
        <h1 className="text-4xl pb-6">Collaboration with Colleges</h1>
      </div>

      {/* CITY FILTER */}
      <div className="flex flex-wrap gap-4 mb-10 max-w-[2400px] mx-auto">
        {cities.map((city) => (
          <button
            key={city.id}
            onClick={() => setSelectedCity(city.id)}
            className={`px-6 py-2 rounded-full border ${
              selectedCity === city.id
                ? "bg-orange-500 text-black"
                : "border-gray-500"
            }`}
          >
            {city.name}
          </button>
        ))}
      </div>

      {/* COLLEGE CARDS */}
      {loading ? (
        <div className="max-w-[2400px] mx-auto">Loading...</div>
      ) : (
        <div
          className="
          grid gap-18 w-full max-w-[2400px] mx-auto px-12 
          grid-cols-[repeat(auto-fit,minmax(260px,1fr))] 
          xl:grid-cols-4"
        >
          {colleges.length === 0 ? (
            <div className="col-span-full text-center py-16 text-gray-300">
              No colleges found.
            </div>
          ) : (
            colleges.map((college) => (
              <div
                key={college.id}
                className="cursor-pointer group"
                onClick={() => openAlbum(college, cities.find(c => c.id === college.cityId))}
              >
                <div className="relative w-full aspect-square group-hover:scale-105 duration-500">
                  <img
                    src={thumb(college)}
                    alt={college.name}
                    className="absolute w-full h-full object-cover rounded-xl grayscale group-hover:grayscale-0 transition"
                  />
                </div>

                <p className="mt-4 text-lg font-semibold">{college.name}</p>
              </div>
            ))
          )}
        </div>
      )}
    </section>
  );
}
