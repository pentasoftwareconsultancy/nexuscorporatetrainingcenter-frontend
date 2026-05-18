import React, { useState, useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { X } from "lucide-react";
import ApiService from "../../core/services/api.service";
import ServerUrl from "../../core/constants/serverURL.constant";

import zeal1 from "../../assets/gallary/zeal1.jpeg";
import zeal2 from "../../assets/gallary/zeal2.jpeg";
import zeal3 from "../../assets/gallary/zeal3.jpeg";
import zeal4 from "../../assets/gallary/zeal4.jpeg";
import zeal5 from "../../assets/gallary/zeal5.jpeg";
import zeal6 from "../../assets/gallary/zeal6.jpeg";
import zeal7 from "../../assets/gallary/zeal7.jpeg";
import govtpoly1 from "../../assets/gallary/govtpoly1.jpeg";
import govtpoly2 from "../../assets/gallary/govtpoly2.jpeg";
import govtpoly3 from "../../assets/gallary/govtpoly3.jpeg";
import akola1 from "../../assets/gallary/akolaclg/Screenshot (81) 5.png";
import akola2 from "../../assets/gallary/akolaclg/Screenshot (81) 8.png";
import akola3 from "../../assets/gallary/akolaclg/Screenshot (81) 10.png";
import akola4 from "../../assets/gallary/akolaclg/Screenshot (81) 11.png";

const fallbackImages = [zeal1, zeal2, zeal3, zeal4, zeal5, zeal6, zeal7].map(url => ({ url }));

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
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    if (!collegeId) return;

    const loadImages = async () => {
      setLoading(true);
      try {
        let activeCollege = college;
        if (!activeCollege) {
          try {
            const clgRes = await api.apiget(ServerUrl.API_GET_COLLEGES_BY_ID + collegeId);
            const clgData = clgRes?.data?.data;
            if (clgData) {
              activeCollege = clgData;
              setCollege(clgData);
              if (clgData.city) {
                setCity(clgData.city);
              }
            }
          } catch (e) {
            console.error("Failed to load college details", e);
          }
        }

        const imgRes = await api.apiget(
          ServerUrl.API_GET_IMAGES_BY_COLLEGE + collegeId
        );
        const data = imgRes?.data?.data || [];
        const govtPolyImages = [govtpoly1, govtpoly2, govtpoly3].map(url => ({ url }));
        const zealImages = [zeal1, zeal2, zeal3, zeal4, zeal5, zeal6, zeal7].map(url => ({ url }));
        const akolaImages = [akola1, akola2, akola3, akola4].map(url => ({ url }));
        const fallback = (activeCollege?.name?.toLowerCase().includes("government") || activeCollege?.name?.toLowerCase().includes("govt") || collegeId === 14 || collegeId === 13) 
          ? govtPolyImages 
          : (activeCollege?.name?.toLowerCase().includes("zeal") || collegeId === 15 || collegeId === 14)
            ? zealImages
            : (activeCollege?.name?.toLowerCase().includes("akola") || collegeId === 2 || collegeId === 1)
              ? akolaImages
              : fallbackImages;
        setImages(data.length > 0 ? data : fallback);
      } catch (error) {
        console.error("FETCH IMAGES ERROR:", error);
        const govtPolyImages = [govtpoly1, govtpoly2, govtpoly3].map(url => ({ url }));
        const zealImages = [zeal1, zeal2, zeal3, zeal4, zeal5, zeal6, zeal7].map(url => ({ url }));
        const akolaImages = [akola1, akola2, akola3, akola4].map(url => ({ url }));
        const fallback = (college?.name?.toLowerCase().includes("government") || college?.name?.toLowerCase().includes("govt") || collegeId === 14 || collegeId === 13) 
          ? govtPolyImages 
          : (college?.name?.toLowerCase().includes("zeal") || collegeId === 15 || collegeId === 14)
            ? zealImages
            : (college?.name?.toLowerCase().includes("akola") || collegeId === 2 || collegeId === 1)
              ? akolaImages
              : fallbackImages;
        setImages(fallback);
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
              transition-all duration-500 cursor-pointer"
            style={{ width: "300px", height: "350px" }}
            onClick={() => setSelectedImage(img.url)}
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

      {/* LIGHTBOX MODAL */}
      {selectedImage && (
        <div 
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4 animate-in fade-in duration-300"
          onClick={() => setSelectedImage(null)}
        >
          <button 
            className="absolute top-6 right-6 p-2 bg-white/10 hover:bg-white/20 rounded-full transition-colors text-white"
            onClick={(e) => {
              e.stopPropagation();
              setSelectedImage(null);
            }}
          >
            <X size={32} />
          </button>
          
          <div 
            className="relative max-w-7xl max-h-[90vh] flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <img 
              src={selectedImage} 
              alt="Full view" 
              className="max-w-full max-h-[90vh] object-contain rounded-lg shadow-2xl border border-white/10"
            />
          </div>
        </div>
      )}
    </div>
  );
}
