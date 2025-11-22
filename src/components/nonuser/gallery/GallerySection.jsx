// src/components/nonuser/gallery/GallerySection.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import galleryData from "../../../assets/vaishnavi/gallary.json";

export default function GallerySection() {
  const navigate = useNavigate();

  // Resolve image paths safely
  const getImageSrc = (filename) => {
    if (!filename) return ""; // fallback (you may want a placeholder)
    return new URL(`../../../assets/vaishnavi/${filename}`, import.meta.url)
      .href;
  };

  // Navigate to album page
  const openAlbum = (id) => {
    navigate(`/gallery/${id}`);
  };

  return (
    <section className="w-full px-12 py-10 text-white">
      {/* Title + Intro (centered in page width) */}
      <div className="max-w-[2400px] mx-auto">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-5 tracking-wide">
          Gallery
        </h2>

        <p className="pb-9 leading-relaxed">
          Explore our vibrant corporate and academic ecosystem. This gallery is
          a visual testament to the energy and hands-on learning environment
          fostered at every Nexus event, from intensive industry workshops to
          successful college placement drives. Witness our strong collaborative
          spirit and the moments where professional growth begins.
        </p>

        <h1 className="text-4xl pb-6">Collaboration with Colleges</h1>
      </div>

      {/* Dynamic auto-fitting grid - fills entire width with no leftover gaps */}
      <div
        className="
    grid
    gap-18
    w-full
    max-w-[2400px]
    mx-auto
    px-12
    grid-cols-[repeat(auto-fit,minmax(260px,1fr))]
    xl:grid-cols-4
  "
      >
        {galleryData.albums.map((album, index) => (
          <div
            key={index}
            onClick={() => openAlbum(album.id)}
            className="cursor-pointer group w-full"
          >
            <div className="relative w-full aspect-square transition-all duration-500 group-hover:scale-105">

              <img
                src={getImageSrc(album.images[3])}
                className="
            absolute top-0 left-[10%]
            w-full h-full object-cover 
            rounded-xl border border-gray-400 
            shadow-[0_0_20px_rgba(255,140,0,0.6)]
            opacity-60 grayscale
            transition-all duration-500 
            group-hover:grayscale-0
          "
              />

              <img
                src={getImageSrc(album.images[2])}
                className="
            absolute top-0 left-[5%]
            w-full h-full object-cover 
            rounded-xl border border-gray-400 
            shadow-[0_0_25px_rgba(255,165,0,0.7)]
            opacity-80 grayscale
            transition-all duration-500 
            group-hover:grayscale-0
          "
              />

              <img
                src={getImageSrc(album.images[1])}
                className="
            absolute top-0 left-0
            w-full h-full object-cover
            rounded-xl border border-white 
            grayscale 
            transition-all duration-500 
            group-hover:grayscale-0
          "
              />
            </div>

            <p className="mt-4 text-base sm:text-lg font-semibold tracking-wide">
              {album.title}
            </p>
          </div>
        ))}
      </div>

    </section>
  );
}
