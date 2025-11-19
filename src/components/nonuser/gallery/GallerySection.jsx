import React from "react";

import { useNavigate } from "react-router-dom";

import galleryData from "../../../assets/vaishnavi/gallary.json";

export default function GallerySection() {
  const navigate = useNavigate();

  // Resolve image paths dynamically

  const getImageSrc = (filename) =>
    new URL(`../../../assets/vaishnavi/${filename}`, import.meta.url).href;

  // When clicking any album → redirect to GalleryInfoPage

  const openAlbum = (id) => {
    navigate(`/gallery/${id}`);
  };

  return (
    <div className="relative min-h-screen text-white justify-start px-12 sm:px-12 py-10 overflow-hidden ">
      <h2 className="text-left text-3xl sm:text-4xl md:text-5xl font-extrabold mb-5 sm:mb-5 tracking-wide bg-clip-text pb-0">
        Gallery
      </h2>
      <p className="text-white pb-9"> Explore our vibrant corporate and academic ecosystem. This gallery is a visual testament to the energy and hands-on learning environment fostered at every Nexus event,<br></br> from intensive industry workshops to successful college placement drives. Witness our strong collaborative spirit and the moments where professional growth begins.</p>
<h1 className="text-4xl pb-6"> Collaboration with Colleges</h1>
      <div className="flex w-full justify-center items-center">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-10 sm:gap-12 w-full max-w-7xl items-center justify-center">
          {galleryData.albums.map((album, index) => (
            <div
              key={index}
              onClick={() => openAlbum(album.id)}
              className="flex flex-col items-center cursor-pointer group w-[90%] sm:w-[250px]"
            >
              <div className="relative w-full aspect-square max-w-[250px] transition-all duration-500 group-hover:scale-105">
                <img
                  src={getImageSrc(album.images[3])}
                  alt="Stack 3"
                  className="absolute top-0 left-[10%] w-full h-full object-cover rounded-xl border border-gray-400 shadow-[0_0_20px_rgba(255,140,0,0.6)] opacity-60 transition-all duration-500 grayscale group-hover:grayscale-0"
                />

                <img
                  src={getImageSrc(album.images[2])}
                  alt="Stack 2"
                  className="absolute top-0 left-[5%] w-full h-full object-cover rounded-xl border border-gray-400 shadow-[0_0_25px_rgba(255,165,0,0.7)] opacity-80 transition-all duration-500 grayscale group-hover:grayscale-0"
                />

                <img
                  src={getImageSrc(album.images[1])}
                  alt="Stack 1"
                  className="absolute top-0 left-0 w-full h-full object-cover rounded-xl border border-white transition-all duration-500 grayscale group-hover:grayscale-0"
                />
              </div>

              <p className="mt-4 text-base sm:text-lg font-semibold tracking-wide text-left transition">
                {album.title}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
