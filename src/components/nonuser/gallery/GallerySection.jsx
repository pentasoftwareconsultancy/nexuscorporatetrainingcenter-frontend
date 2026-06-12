import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import ApiService from "../../../core/services/api.service";
import ServerUrl from "../../../core/constants/serverURL.constant";

import zeal1 from "../../../assets/gallary/zeal1.avif";
import zeal2 from "../../../assets/gallary/zeal2.avif";
import zeal3 from "../../../assets/gallary/zeal3.avif";
import zeal4 from "../../../assets/gallary/zeal4.avif";
import zeal5 from "../../../assets/gallary/zeal5.avif";
import zeal6 from "../../../assets/gallary/zeal6.avif";
import zeal7 from "../../../assets/gallary/zeal7.avif";
import govtpoly1 from "../../../assets/gallary/govtpoly1.avif";
import govtpoly2 from "../../../assets/gallary/govtpoly2.avif";
import govtpoly3 from "../../../assets/gallary/govtpoly3.avif";
import akola1 from "../../../assets/gallary/akolaclg/Screenshot (81) 5.avif";
import akola2 from "../../../assets/gallary/akolaclg/Screenshot (81) 8.avif";
import akola3 from "../../../assets/gallary/akolaclg/Screenshot (81) 10.avif";
import akola4 from "../../../assets/gallary/akolaclg/Screenshot (81) 11.avif";

const fallbackImages = [zeal1, zeal2, zeal3, zeal4, zeal5, zeal6, zeal7];

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

        // ⭐ Auto-select 'all' regardless of cities returned
        setSelectedCity("all");
      })
      .catch((err) => {
        console.error("CITY FETCH ERROR:", err);
        setSelectedCity("all");
      });
  }, []);

  // 🔥 Fetch colleges based on selected city
  useEffect(() => {
    if (!selectedCity) return;

    setLoading(true);

    if (selectedCity === "all") {
      loadAllColleges();
      return;
    }

    // Normal mode → fetch specific city colleges
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

  const loadAllColleges = async () => {
    try {
      let allColleges = [];

      // Fetch all cities (already in state)
      for (const city of cities) {
        const res = await api.apiget(
          ServerUrl.API_GET_COLLEGES_BY_CITY + city.id
        );

        const list = res?.data?.data || [];

        // We also need city info for album navigation
        const enriched = list.map((college) => ({
          ...college,
          cityName: city.name,
          cityId: city.id,
        }));

        allColleges.push(...enriched);
      }

      // If no colleges are returned from backend, use fallback dummy data
      if (allColleges.length === 0) {
        allColleges = [
          { id: 1, name: "Akola College", cityId: "all" },
          { id: 2, name: "Pune College", cityId: "all" },
          { id: 3, name: "Asian College of Pharmacy", cityId: "all" },
          { id: 4, name: "Navsahyadri institute of pharmacy", cityId: "all" },
          { id: 5, name: "Manav College of engineering", cityId: "all" },
          { id: 6, name: "Shankarlal Khandelwal, Akola", cityId: "all" },
          { id: 7, name: "G.S. College, Khamgaon", cityId: "all" },
          { id: 8, name: "Shree Goraksha College of Pharmacy and Research Center", cityId: "all" },
          { id: 9, name: "D Y Patil Talegoan, with Devcons placement", cityId: "all" },
          { id: 10, name: "Genba Sopanrao Moze College of Engineering", cityId: "all" },
          { id: 11, name: "Pankaj Laddhad institute of Technology", cityId: "all" },
          { id: 12, name: "Mahatma Gandhi Pharmacy, Nashik", cityId: "all" },
          { id: 13, name: "Government College, Pune", cityId: "all" },
          { id: 14, name: "Zeal College, Pune", cityId: "all" },
        ];
      }

      // Now fetch images for all colleges
      await fetchCollegeImages(allColleges);
    } catch (err) {
      console.error("ALL-COLLEGE FETCH ERROR:", err);
      // Fallback
      const dummyColleges = [
        { id: 1, name: "Akola College", cityId: "all" },
        { id: 2, name: "Pune College", cityId: "all" },
        { id: 3, name: "Asian College of Pharmacy", cityId: "all" },
        { id: 4, name: "Navsahyadri institute of pharmacy", cityId: "all" },
        { id: 5, name: "Manav College of engineering", cityId: "all" },
        { id: 6, name: "Shankarlal Khandelwal, Akola", cityId: "all" },
        { id: 7, name: "G.S. College, Khamgaon", cityId: "all" },
        { id: 8, name: "Shree Goraksha College of Pharmacy and Research Center", cityId: "all" },
        { id: 9, name: "D Y Patil Talegoan, with Devcons placement", cityId: "all" },
        { id: 10, name: "Genba Sopanrao Moze College of Engineering", cityId: "all" },
        { id: 11, name: "Pankaj Laddhad institute of Technology", cityId: "all" },
        { id: 12, name: "Mahatma Gandhi Pharmacy, Nashik", cityId: "all" },
        { id: 13, name: "Government College", cityId: "all" },
        { id: 14, name: "Zeal College", cityId: "all" },
      ];
      await fetchCollegeImages(dummyColleges);
    }
  };

  // 🔥 Fetch images for each college
  const fetchCollegeImages = async (collegeList) => {
    if (!Array.isArray(collegeList) || collegeList.length === 0) {
      setColleges([]);
      setLoading(false);
      return;
    }

    const updated = await Promise.all(
      collegeList.map(async (college, index) => {
        try {
          const imgRes = await api.apiget(
            ServerUrl.API_GET_IMAGES_BY_COLLEGE + college.id
          );
          const imagesToUse = imgRes.data.data?.length > 0
            ? imgRes.data.data.map((img) => img.url)
            : (college.name?.toLowerCase().includes("government") || college.name?.toLowerCase().includes("govt") || college.id === 14 || college.id === 13
              ? [govtpoly1, govtpoly2, govtpoly3]
              : (college.name?.toLowerCase().includes("zeal") || college.id === 15 || college.id === 14
                ? [zeal1, zeal2, zeal3, zeal4, zeal5, zeal6, zeal7]
                : (college.name?.toLowerCase().includes("akola") || college.id === 2 || college.id === 1
                  ? [akola1, akola2, akola3, akola4]
                  : [fallbackImages[index % fallbackImages.length]])));
          return {
            ...college,
            images: imagesToUse,
          };
        } catch {
          const imagesToUse = college.name?.toLowerCase().includes("government") || college.name?.toLowerCase().includes("govt") || college.id === 14 || college.id === 13
            ? [govtpoly1, govtpoly2, govtpoly3]
            : (college.name?.toLowerCase().includes("zeal") || college.id === 15 || college.id === 14
              ? [zeal1, zeal2, zeal3, zeal4, zeal5, zeal6, zeal7]
              : (college.name?.toLowerCase().includes("akola") || college.id === 2 || college.id === 1
                ? [akola1, akola2, akola3, akola4]
                : [fallbackImages[index % fallbackImages.length]]));
          return { ...college, images: imagesToUse };
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
    college.images?.[0] || fallbackImages[0];

  return (
    <section className="w-full px-4 sm:px-8 lg:px-12 py-10 text-white">
      {/* HEADER */}
      {/* <div className="max-w-[2400px] mx-auto mb-12">
        <h2 className="text-4xl font-extrabold mb-4">Gallery</h2>
        <p className="text-gray-300 text-sm md:text-base max-w-4xl leading-relaxed mb-8">
          Explore our vibrant corporate and academic ecosystem. This gallery is a visual testament to the energy and hands-on learning environment fostered at every Nexus event, from intensive industry workshops to successful college placement drives. Witness our strong collaborative spirit and the moments where professional growth begins.
        </p>
        <h1 className="text-2xl md:text-3xl font-bold">Collaboration with Colleges</h1>
      </div> */}



      {/* COLLEGE CARDS */}
      {loading ? (
        <div className="max-w-[2400px] mx-auto">Loading...</div>
      ) : (
        <div
          className="
          grid gap-8 sm:gap-12 lg:gap-16 w-full max-w-[2400px] mx-auto
          grid-cols-[repeat(auto-fit,minmax(260px,1fr))] 
          xl:grid-cols-4"
        >
          {colleges.length === 0 ? (
            <div className="col-span-full text-center py-16 text-gray-300">
              No colleges found.
            </div>
          ) : (
            colleges.map((college, idx) => (
              <div
                key={college.id}
                className="cursor-pointer group flex flex-col items-center sm:items-start"
                onClick={() =>
                  openAlbum(
                    college,
                    cities.find((c) => c.id === college.cityId)
                  )
                }
              >
                <div className="relative w-full aspect-[4/3] group-hover:scale-105 duration-500 pr-4 mb-4">
                  {/* Back stacked card */}
                  <img
                    src={thumb(college)}
                    alt="stack-back"
                    className="absolute inset-0 translate-x-4 w-[calc(100%-1rem)] h-full object-cover rounded-xl border border-gray-800 opacity-40"
                  />
                  {/* Middle stacked card */}
                  <img
                    src={thumb(college)}
                    alt="stack-mid"
                    className="absolute inset-0 translate-x-2 w-[calc(100%-1rem)] h-full object-cover rounded-xl border border-gray-800 opacity-70"
                  />

                  {/* Front card (Image) */}
                  <img
                    src={thumb(college)}
                    alt={college.name}
                    className="absolute z-10 inset-0 w-[calc(100%-1rem)] h-full object-cover rounded-xl transition duration-500"
                  />
                </div>

                <p className="mt-2 text-sm md:text-base font-semibold max-w-[calc(100%-1rem)] text-gray-200">
                  {college.name}
                </p>
              </div>
            ))
          )}
        </div>
      )}
    </section>
  );
}
