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
    <div className="relative min-h-screen bg-gradient-to-br from-black via-slate-900 to-black text-white flex flex-col items-center justify-start px-4 sm:px-8 py-10 overflow-hidden">
      <h2 className="text-center text-3xl sm:text-4xl md:text-5xl font-extrabold mb-10 sm:mb-14 tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-orange-300 to-yellow-300 drop-shadow-lg">
        ✨ Our Gallery Albums
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-10 sm:gap-12 w-full max-w-7xl justify-items-center">
        {galleryData.albums.map((album, index) => (
          <div
            key={index}
            onClick={() => openAlbum(album.id)}
            className="flex flex-col items-center cursor-pointer group w-[90%] sm:w-[250px]"
          >
            <div className="relative w-full aspect-square max-w-[250px] transition-all duration-500 group-hover:scale-105">
              <img
                src={getImageSrc(album.images[2])}
                alt="Stack 3"
                className="absolute top-0 left-[10%] w-full h-full object-cover rounded-xl border border-gray-400 shadow-[0_0_20px_rgba(255,140,0,0.6)] opacity-60 transition-all duration-500 grayscale group-hover:grayscale-0"
              />
              <img
                src={getImageSrc(album.images[1])}
                alt="Stack 2"
                className="absolute top-0 left-[5%] w-full h-full object-cover rounded-xl border border-gray-400 shadow-[0_0_25px_rgba(255,165,0,0.7)] opacity-80 transition-all duration-500 grayscale group-hover:grayscale-0"
              />
            <img
  src={getImageSrc(album.images[0])}
  alt="Stack 1"
  className="absolute top-0 left-0 w-full h-full object-cover rounded-xl border border-white transition-all duration-500 grayscale group-hover:grayscale-0"
/>
          
            </div>

            <p className="mt-4 text-base sm:text-lg font-semibold tracking-wide text-center text-amber-300 group-hover:text-yellow-400 transition">
              {album.title}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
