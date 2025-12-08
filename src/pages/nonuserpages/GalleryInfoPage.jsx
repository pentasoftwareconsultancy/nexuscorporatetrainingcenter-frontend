import React, { useState, useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import ApiService from "../../core/services/api.service";
import ServerUrl from "../../core/constants/serverURL.constant";

export default function GalleryInfoPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const api = new ApiService();

  const collegeId = Number(id);
  const passedCollege = location.state?.college;
  const passedCity = location.state?.city;

  const [college, setCollege] = useState(passedCollege || null);
  const [city, setCity] = useState(passedCity || null);
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!collegeId) return;

    const loadImages = async () => {
      setLoading(true);
      try {
        const imgRes = await api.apiget(
          ServerUrl.API_GET_IMAGES_BY_COLLEGE + collegeId
        );
        setImages(imgRes.data.data || []);
      } catch (error) {
        console.error("FETCH IMAGES ERROR:", error);
      }
      setLoading(false);
    };

    loadImages();
  }, [collegeId]);

  if (loading) {
    return <div className="text-white text-center mt-20">Loading...</div>;
  }

  if (!college) {
    return (
      <div className="text-white text-center mt-20">
        <h2 className="text-3xl font-bold mb-4">College Not Found</h2>
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
    <div className="w-full px-4 sm:px-12 py-10 text-white">
      {/* HEADER */}
      <h1 className="text-3xl font-bold mb-6">Collab With {college.name}</h1>

      {/* IMAGE GRID */}
      <div className="flex flex-wrap gap-6 justify-start max-w-[2400px] mx-auto">
        {images.map((img, index) => (
          <div
            key={index}
            className="relative group overflow-hidden rounded-xl border border-gray-700
              shadow-[0_0_25px_rgba(255,165,0,0.5)]
              hover:shadow-[0_0_40px_rgba(255,165,0,0.8)]
              transition-all duration-500"
            style={{ width: "300px", height: "350px" }}
          >
            <img
              src={img.url}
              className="w-full h-full object-cover rounded-xl
                transform group-hover:scale-105 transition-transform duration-500"
            />
          </div>
        ))}
      </div>

      {/* INFO SECTION */}
      <div className="mt-8">
        <h1 className="text-2xl font-bold">{college.name} Collab</h1>
        <p className="mt-2 text-gray-300">
          Gallery images from our collaboration with {college.name} in {city?.name}.
        </p>
      </div>
    </div>
  );
}
