import React, { useState } from 'react';
import Gallerydata from '../../assets/tarushri/GallleryEventData.json';
import { useNavigate } from "react-router-dom";
import AdminGallery from "../../assets/tarushri/Admingallery.json";



const GalleryEventPage = () => {
  const navigate = useNavigate();

  const getImageSrc = (filename) => {
    if (!filename) return "";
    return new URL(`../../assets/tarushri${filename}`, import.meta.url).href;
  };

  const openAlbum = (id) => {
    navigate(`/Admingallery/${id}`);
  };

  const [active, setActive] = useState("colleges");

  const categoryData = active === "colleges"
    ? Gallerydata.colleges
    : Gallerydata.eventstories;

  return (
    <div className="w-full px-4 sm:px-6 lg:px-6">
      <div className="max-w-[1600px] mx-auto">

        {/* Header */}
        <div className="Gallery mt-8">
          <h1 className="text-2xl sm:text-3xl font-semibold text-white">Gallery</h1>
        </div>

        {/* Buttons */}
        <div className="border border-gray-400 rounded-full p-1 w-fit mt-5">
          <button
            onClick={() => setActive("colleges")}
            className={`px-4 sm:px-6 py-2 rounded-full text-white text-sm sm:text-base 
            ${active === "colleges" ? "bg-black" : "bg-transparent"}`}
          >
            Colleges
          </button>

          <button
            onClick={() => setActive("eventstories")}
            className={`px-4 sm:px-6 py-2 rounded-full text-white text-sm sm:text-base 
            ${active === "eventstories" ? "bg-black" : "bg-transparent"}`}
          >
            Event stories
          </button>
        </div>

        {/* ------------------------ EVENT CARDS (Works Already) ------------------------ */}
        {active === "eventstories" && (
          <div className="Card mt-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {categoryData.map((item) => (
                <div
                  key={item.id}
                  onClick={() => navigate(`/eventdetail/${item.id}`)}
                  className="bg-black text-white border border-gray-600 rounded-3xl p-4 cursor-pointer hover:scale-[1.02] transition-transform"
                >
                  {/* Image */}
                  <div className="overflow-hidden rounded-2xl">
                    <img
                      src={item.image}
                      alt={item.eventName}
                      className="w-full h-40 sm:h-48 md:h-56 object-cover"
                    />
                  </div>

                  {/* Details */}
                  <div className="mt-4 space-y-1 text-sm sm:text-base">
                    <p><span className="font-semibold">Event name: </span>{item.eventName}</p>
                    <p><span className="font-semibold">Date: </span>{item.date}</p>
                    <p><span className="font-semibold">Location: </span>{item.location}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ------------------------ COLLEGE GALLERY (YOUR ISSUE FIXED) ------------------------ */}
        {active === "colleges" && (
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-12">
            {AdminGallery.albums.map((album, index) => (
              <div
                key={index}
                onClick={() => openAlbum(album.id)}
                className="cursor-pointer group w-full"
              >
                <div className="relative w-full aspect-square transition-all duration-500 group-hover:scale-105">
                  
                  <img
                    src={getImageSrc(album.images[3])}
                    className="absolute top-0 left-[10%] w-full h-full object-cover rounded-xl border border-gray-400 
          shadow-[0_0_20px_rgba(255,140,0,0.6)] opacity-60 grayscale transition-all duration-500 group-hover:grayscale-0"
                  />

                  <img
                    src={getImageSrc(album.images[2])}
                    className="absolute top-0 left-[5%] w-full h-full object-cover rounded-xl border border-gray-400 
          shadow-[0_0_25px_rgba(255,165,0,0.7)] opacity-80 grayscale transition-all duration-500 group-hover:grayscale-0"
                  />

                  <img
                    src={getImageSrc(album.images[1])}
                    className="absolute top-0 left-0 w-full h-full object-cover 
          rounded-xl border border-white grayscale transition-all duration-500 group-hover:grayscale-0"
                  />
                </div>

                <p className="mt-4 text-base sm:text-lg font-semibold tracking-wide">
                  {album.title}
                </p>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
};

export default GalleryEventPage;
