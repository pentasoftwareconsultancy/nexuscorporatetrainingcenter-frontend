import React from "react";
import { useNavigate } from "react-router-dom";
import galleryData from "../../../assets/vaishnavi/gallary.json";

export default function GallerySection() {
  const navigate = useNavigate();

  const getImageSrc = (filename) => {
    if (!filename) return "";
    return new URL(`../../../assets/vaishnavi/${filename}`, import.meta.url).href;
  };

  const openCollege = (collegeId) => {
    navigate(`/gallery/${collegeId}`);
  };

  return (
    <section className="w-full px-12 py-10 text-white">
      <div className="max-w-[2400px] mx-auto">
        <h2 className="text-4xl font-extrabold mb-6">Gallery</h2>
        <h1 className="text-4xl pb-6">Collaboration with Colleges</h1>
      </div>

      <div
        className="grid gap-18 w-full max-w-[2400px] mx-auto px-12 
        grid-cols-[repeat(auto-fit,minmax(260px,1fr))] xl:grid-cols-4"
      >
        {galleryData.areas.flatMap((area) =>
  area.colleges.map((college, index) => (
    <div
      key={index}
      onClick={() => openCollege(college.collegeId)}
      className="cursor-pointer group w-full"
    >
      <div className="relative w-full aspect-square transition-all duration-500 group-hover:scale-105">

        <img
          src={getImageSrc(college.images[3])}
          className="absolute top-0 left-[10%] w-full h-full object-cover rounded-xl border border-gray-400 
          shadow-[0_0_20px_rgba(255,140,0,0.6)] opacity-60 grayscale transition-all duration-500 group-hover:grayscale-0"
        />

        <img
          src={getImageSrc(college.images[2])}
          className="absolute top-0 left-[5%] w-full h-full object-cover rounded-xl border border-gray-400 
          shadow-[0_0_25px_rgba(255,165,0,0.7)] opacity-80 grayscale transition-all duration-500 group-hover:grayscale-0"
        />

        <img
          src={getImageSrc(college.images[1])}
          className="absolute top-0 left-0 w-full h-full object-cover 
          rounded-xl border border-white grayscale transition-all duration-500 group-hover:grayscale-0"
        />

      </div>

      <p className="mt-4 text-base sm:text-lg font-semibold tracking-wide">
        {college.collegeName}
      </p>
    </div>
  ))
)}
      </div>
    </section>
  );
}
