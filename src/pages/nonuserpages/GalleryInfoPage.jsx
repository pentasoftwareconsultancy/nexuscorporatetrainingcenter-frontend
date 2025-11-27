import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import galleryData from "../../assets/vaishnavi/gallary.json";

export default function GalleryInfoPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const albumId = Number(id);

  // FIND ALBUM IN ALL AREAS → ALL COLLEGES
  const album = galleryData.areas
    .flatMap((area) => area.colleges)
    .flatMap((college) => college.albums)
    .find((a) => a.id === albumId);

  const getImageSrc = (filename) =>
    new URL(`../../assets/vaishnavi/${filename}`, import.meta.url).href;

  if (!album) {
    return (
      <div className="text-white text-center mt-20">
        <h2 className="text-3xl font-bold mb-4">Album Not Found</h2>
        <button
          onClick={() => navigate(-1)}
          className="px-5 py-2 bg-amber-400 text-black font-semibold rounded-lg transition hover:bg-amber-500"
        >
          ← Back
        </button>
      </div>
    );
  }

  return (
    <div className="w-full px-4 sm:px-10 py-10 text-white">

      <h1 className="text-3xl font-bold mb-6">Collab With {album.title}</h1>

      <div className="grid gap-6 grid-cols-[repeat(auto-fit,minmax(250px,1fr))] max-w-[2400px] mx-auto">

        {album.images.map((image, index) => (
          <div
            key={index}
            className="relative group overflow-hidden rounded-xl border border-gray-700
              shadow-[0_0_25px_rgba(255,165,0,0.5)]
              hover:shadow-[0_0_40px_rgba(255,165,0,0.8)]
              transition-all duration-500 w-full aspect-square"
          >
            <img
              src={getImageSrc(image)}
              className="w-full h-full object-cover rounded-xl
                transform group-hover:scale-105 transition-transform duration-500"
            />
          </div>
        ))}

      </div>

      <div className="mt-8">
        <h1 className="text-2xl font-bold">{album.title} Collab</h1>
        <p className="mt-2">{album.description}</p>
      </div>
    </div>
  );
}
