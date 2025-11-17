import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import galleryData from "../../assets/vaishnavi/gallary.json";

export default function GalleryInfoPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  // Find the selected album by ID
  const album = galleryData.albums.find((item) => item.id === parseInt(id));

  // Function to get full image path
  const getImageSrc = (filename) =>
    new URL(`../../assets/vaishnavi/${filename}`, import.meta.url).href;
  
  // Handle missing album
  if (!album) {
    return (
      <div className="min-h-screen  text-white flex flex-col items-center justify-center">
        <h2 className="text-3xl font-bold mb-4">Album not found!</h2>
        <button
          onClick={() => navigate(-1)}
          className="px-5 py-2 bg-amber-400 hover:bg-amber-500 text-black font-semibold rounded-lg transition"
        >
          ← Back to Gallery
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen   sm:px-10 ">
      {/* Title and Description */}
      <div className="mb-10">
        <h1 className="text-2xl sm:text-2xl font-bold text-white mb-3">
          Collab With {album.title}
        </h1>
      </div>

      {/* Images Grid */}
      <div
        className="grid gap-2 place-items-center mb-8"
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
      <div className="mb-2">
        <h1 className="text-2xl sm:text-2xl font-bold text-white mb-3">
          {album.title} Collab
        </h1>

        <p>{album.description}</p>
      </div>

      {/* Back Button */}
    </div>
  );
}
