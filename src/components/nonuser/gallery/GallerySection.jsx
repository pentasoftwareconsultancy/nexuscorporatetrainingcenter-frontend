import React, { useState } from "react";
import { X } from "lucide-react";

// ✅ Import images (make sure they exist in src/assets/)
import img1 from "../../../assets/vaishnavi/13.jpeg";
import img2 from "../../../assets/vaishnavi/2.jpeg";
import img3 from "../../../assets/vaishnavi/3.jpeg";
import img4 from "../../../assets/vaishnavi/4.jpeg";
import img5 from "../../../assets/vaishnavi/5.jpeg";
import img6 from "../../../assets/vaishnavi/6.jpeg";
import img7 from "../../../assets/vaishnavi/7.jpeg";
import img8 from "../../../assets/vaishnavi/8.jpeg";
import img9 from "../../../assets/vaishnavi/9.jpeg";
import img10 from "../../../assets/vaishnavi/10.jpeg";
import img11 from "../../../assets/vaishnavi/11.jpeg";
import img12 from "../../../assets/vaishnavi/12.jpeg";
import img13 from "../../../assets/vaishnavi/13.jpeg";
import img14 from "../../../assets/vaishnavi/14.jpeg";
import img15 from "../../../assets/vaishnavi/15.jpeg";
import img16 from "../../../assets/vaishnavi/16.jpeg";

export default function GallerySection() {
  const albums = [
    { title: "Annual Function", images: [img1, img2, img3, img4] },
    { title: "Cultural Fest", images: [img5, img6, img7, img8] },
    { title: "Sports Day", images: [img9, img10, img11, img12] },
    { title: "Tech Event", images: [img13, img14, img15, img16] },
    { title: "Workshop Moments", images: [img2, img5, img8, img11] },
    { title: "Prize Distribution", images: [img3, img6, img9, img12] },
    { title: "Team Celebration", images: [img4, img7, img10, img13] },
    { title: "Graduation Ceremony", images: [img1, img5, img9, img15] },
  ];

  const [isOpen, setIsOpen] = useState(false);
  const [activeAlbum, setActiveAlbum] = useState(null);

  const openAlbum = (album) => {
    setActiveAlbum(album);
    setIsOpen(true);
  };

  const closeAlbum = () => {
    setIsOpen(false);
    setActiveAlbum(null);
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-black via-slate-900 to-black text-white flex flex-col items-center justify-start px-4 sm:px-8 py-10 overflow-hidden">
      {/* Page Title */}
      <h2 className="text-center text-3xl sm:text-4xl md:text-5xl font-extrabold mb-10 sm:mb-14 tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-orange-300 to-yellow-300 drop-shadow-lg">
        ✨ Our Gallery Albums
      </h2>

      {/* ✅ Albums Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-10 sm:gap-12 w-full max-w-7xl justify-items-center">
        {albums.map((album, index) => (
          <div
            key={index}
            className="flex flex-col items-center cursor-pointer group w-[90%] sm:w-[250px]"
            onClick={() => openAlbum(album)}
          >
            {/* ✅ Image Stack (responsive scaling) */}
            <div className="relative w-full aspect-square max-w-[250px] transition-all duration-500 group-hover:scale-105">
              {/* Background Layers */}
              <img
                src={album.images[2]}
                alt="Stack 3"
                className="absolute top-0 left-[10%] w-full h-full object-cover rounded-xl border border-gray-400 shadow-[0_0_20px_rgba(255,140,0,0.6)] opacity-60 transition-all duration-500 grayscale group-hover:grayscale-0"
              />
              <img
                src={album.images[1]}
                alt="Stack 2"
                className="absolute top-0 left-[5%] w-full h-full object-cover rounded-xl border border-gray-400 shadow-[0_0_25px_rgba(255,165,0,0.7)] opacity-80 transition-all duration-500 grayscale group-hover:grayscale-0"
              />
              {/* Front Image */}
              <img
                src={album.images[0]}
                alt="Stack 1"
                className="absolute top-0 left-0 w-full h-full object-cover rounded-xl border border-white shadow-[0_0_35px_rgba(255,165,0,0.9)] transition-all duration-500 grayscale group-hover:grayscale-0 group-hover:shadow-[0_0_50px_rgba(255,165,0,1)]"
              />
            </div>

            {/* Album Title */}
            <p className="mt-4 text-base sm:text-lg font-semibold tracking-wide text-center text-amber-300 group-hover:text-yellow-400 transition">
              {album.title}
            </p>
          </div>
        ))}
      </div>

      {/* ✅ Fullscreen Album View */}
      {isOpen && activeAlbum && (
        <div className="fixed inset-0 bg-black/95 backdrop-blur-sm flex flex-col items-center justify-start pt-20 z-50 overflow-y-auto transition-opacity duration-300 px-4">
          {/* Close Button */}
          <button
            onClick={closeAlbum}
            className="absolute top-6 right-6 text-white hover:text-amber-400 transition"
          >
            <X size={36} />
          </button>

          {/* Album Title */}
          <h3 className="text-2xl sm:text-3xl font-bold mb-8 text-amber-300 text-center">
            {activeAlbum.title}
          </h3>

          {/* Album Images Grid */}
          <div className="w-full max-w-7xl grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 p-4 sm:p-6 justify-items-center">
            {activeAlbum.images.map((img, idx) => (
              <div
                key={idx}
                className="overflow-hidden rounded-xl border border-gray-600 shadow-[0_0_25px_rgba(255,165,0,0.7)] hover:scale-105 transition-transform duration-500 hover:shadow-[0_0_40px_rgba(255,165,0,1)] w-full max-w-[250px]"
              >
                <img
                  src={img}
                  alt={`${activeAlbum.title} ${idx + 1}`}
                  className="w-full h-[220px] sm:h-[250px] object-cover rounded-xl grayscale hover:grayscale-0 transition-all duration-500"
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
