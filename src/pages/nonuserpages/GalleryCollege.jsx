// src/components/nonuser/gallery/GalleryCollege.jsx
import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import galleryData from "../../assets/vaishnavi/gallary.json";

export default function GalleryCollege() {
  const { collegeId } = useParams();
  const navigate = useNavigate();

  const getImageSrc = (filename) => {
    if (!filename) return "";
    return new URL(`../../../assets/vaishnavi/${filename}`, import.meta.url).href;
  };

  // FIND THE SELECTED COLLEGE
  const college = galleryData.areas
    .flatMap((area) => area.colleges)
    .find((c) => c.collegeId === Number(collegeId));

  if (!college) {
    return <h1 className="text-white text-center mt-20">College Not Found</h1>;
  }

  const openAlbum = (albumId) => {
    navigate(`/gallery/album/${albumId}`);
  };

  return (
    <section className="w-full px-12 py-10 text-white">

      <h1 className="text-4xl font-extrabold mb-6">
        {college.collegeName} – Albums
      </h1>

      <div
        className="grid gap-18 w-full max-w-[2400px] mx-auto px-12 
        grid-cols-[repeat(auto-fit,minmax(260px,1fr))] xl:grid-cols-4"
      >
        {college.albums.map((album, index) => (
          <div
            key={index}
            onClick={() => openAlbum(album.id)}
            className="cursor-pointer group w-full"
          >
            <div className="relative w-full aspect-square transition-all duration-500 group-hover:scale-105">

              <img
                src={getImageSrc(album.images[3])}
                className="absolute top-0 left-[10%] w-full h-full object-cover 
                rounded-xl border border-gray-400 opacity-60 grayscale
                shadow-[0_0_20px_rgba(255,140,0,0.6)]
                transition-all duration-500 group-hover:grayscale-0"
              />

              <img
                src={getImageSrc(album.images[2])}
                className="absolute top-0 left-[5%] w-full h-full object-cover 
                rounded-xl border border-gray-400 opacity-80 grayscale
                shadow-[0_0_25px_rgba(255,165,0,0.7)]
                transition-all duration-500 group-hover:grayscale-0"
              />

              <img
                src={getImageSrc(album.images[1])}
                className="absolute top-0 left-0 w-full h-full object-cover 
                rounded-xl border border-white grayscale 
                transition-all duration-500 group-hover:grayscale-0"
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
