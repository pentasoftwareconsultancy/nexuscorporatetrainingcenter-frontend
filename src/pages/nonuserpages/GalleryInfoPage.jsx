import React from "react";
import { useParams } from "react-router-dom";
import galleryData from "../../assets/vaishnavi/gallary.json";

export default function GalleryInfoPage() {
  const { id } = useParams();

  // Find the selected album by ID
  const album = galleryData.albums.find((item) => item.id === parseInt(id));

  // Function to get full image path
  const getImageSrc = (filename) =>
    new URL(`../../assets/vaishnavi/${filename}`, import.meta.url).href;

  return (
    <div className="min-h-screen text-white px-12 py-4">
      {/* Title and Description */}
      <div className=" mx-auto text-start mb-10">
        <h1 className="text-2xl font-bold text-white drop-shadow-lg mb-4">
          Collaboration with {album.title}
        </h1>
      </div>

      {/* Images Grid */}
      <div
        className="grid gap-4 place-items-center"
        style={{ gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))" }}
      >
        {album.images.map((image, index) => (
          <div
            key={index}
            className="relative group overflow-hidden rounded-xl border border-gray-700 
                       shadow-[0_0_25px_rgba(255,165,0,0.5)] 
                       hover:shadow-[0_0_40px_rgba(255,165,0,0.8)] 
                       transition-all duration-500 w-[280px] h-[280px] max-w-full"
          >
            <img
              src={getImageSrc(image)}
              alt={`${album.title}-${index}`}
              className="w-full h-full object-cover rounded-xl 
                         transform group-hover:scale-105 
                         transition-transform duration-500"
            />
          </div>
        ))}
      </div>

      <div className=" mx-auto text-start mt-18">
        <h1 className="text-2xl font-bold text-white drop-shadow-lg mb-4">
          {album.title} Collab
        </h1>
        <p>{album.description}</p>
      </div>
    </div>
  );
}
