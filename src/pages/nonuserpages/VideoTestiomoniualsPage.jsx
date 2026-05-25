import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLocation } from "react-router-dom";
import ApiService from "../../core/services/api.service";
import ServerUrl from "../../core/constants/serverURL.constant";
import { ROUTES } from "../../core/constants/routes.constant";

const VideoTestiomoniualsPage = () => {
  const api = new ApiService();
  const location = useLocation();
  const [videos, setVideos] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [currentVideo, setCurrentVideo] = useState(null);

  const isPlacementTestimonials = location.pathname === ROUTES.VIDEO_TESTIMONIALS;
  const categoryFilter = isPlacementTestimonials ? "blog" : "video";

  const getEmbedUrl = (url) => {
    if (!url) return "";
    if (url.includes("/embed/")) return url;

    let videoId = "";
    if (url.includes("youtu.be/")) {
      videoId = url.split("youtu.be/")[1]?.split(/[?#]/)[0];
    } else if (url.includes("/shorts/")) {
      videoId = url.split("/shorts/")[1]?.split(/[?#]/)[0];
    } else if (url.includes("v=")) {
      videoId = url.split("v=")[1]?.split(/[&?#]/)[0];
    } else {
      const match = url.match(/(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/i);
      if (match) videoId = match[1];
    }
    return videoId ? `https://www.youtube.com/embed/${videoId}` : url;
  };

  const truncateWords = (text, maxWords = 12) => {
    if (!text) return "";
    const words = text.split(" ");
    return words.length > maxWords
      ? words.slice(0, maxWords).join(" ") + "..."
      : text;
  };

  // 🔥 FETCH VIDEOS FROM BACKEND
  useEffect(() => {
    api
      .apiget(`${ServerUrl.API_GET_VIDEOS}?category=${categoryFilter}`)
      .then((res) => {
        const list = res?.data?.data || [];

        // Normalize response for frontend usage
        const formatted = list.map((v) => ({
          id: v.video_id,
          caption: v.caption,
          about: v.about,
          thumbnail: v.image, // same field name used in JSON version
          videoUrl: v.videoUrl,
        }));

        setVideos(formatted);
      })
      .catch((err) => console.error("VIDEO FETCH ERROR:", err));
  }, [categoryFilter]);

  const openPopup = (video) => {
    if (video.videoUrl.includes("instagram.com")) {
      window.open(video.videoUrl, "_blank");
      return;
    }
    setCurrentVideo(video);
    setShowPopup(true);
  };

  const closePopup = () => {
    setShowPopup(false);
    setTimeout(() => setCurrentVideo(null), 300);
  };

  return (
    <div className="px-6 py-10 text-one">
      {/* Title */}
      <motion.h1
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-5xl md:text-6xl font-bold mb-10"
      >
        {isPlacementTestimonials ? "Placement Testimonials" : "Course Videos"}
      </motion.h1>

      {/* Cards Grid */}
      <div className={`grid gap-8 ${
        isPlacementTestimonials 
          ? "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4" 
          : "grid-cols-1 sm:grid-cols-2 md:grid-cols-3"
      }`}>
        {videos.map((item, index) => (
          <motion.div
            key={item.id}
            className="flex flex-col rounded-2xl shadow-xl overflow-hidden cursor-pointer 
              border border-white/5 transition-all duration-300 bg-[#121212]
            hover:border-orange-500 hover:shadow-[0_0_15px_rgba(255,115,0,0.8)]"
            whileHover={{ scale: 1.03 }}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ delay: index * 0.1, duration: 0.4 }}
            onClick={() => openPopup(item)}
          >
            {/* Thumbnail */}
            <div className={`relative w-full overflow-hidden ${
              isPlacementTestimonials ? "aspect-[3/4]" : "h-60"
            }`}>
              <img
                src={item.thumbnail || "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800"}
                alt={item.caption}
                loading="lazy"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800";
                }}
                className="w-full h-full object-cover"
              />

              {/* Play Icon */}
              <motion.div
                className="absolute inset-0 flex items-center justify-center bg-black/20"
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
              >
                <span className="bg-white/80 hover:bg-white text-black p-4 rounded-full text-xl shadow-lg flex items-center justify-center w-12 h-12">
                  ▶
                </span>
              </motion.div>
            </div>

            {/* Text */}
            <div className="p-5 flex-1 flex flex-col justify-between">
              <div>
                <p className="text-base font-bold text-white line-clamp-1">
                  {item.caption}
                </p>
                <p className="mt-1.5 text-gray-400 text-xs line-clamp-2 leading-relaxed">
                  {truncateWords(item.about, 15)}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* POPUP */}
      <AnimatePresence>
        {showPopup && currentVideo && (
          <motion.div
            className="fixed inset-0 bg-black/90 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.5, opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="relative w-full max-w-7xl h-[80vh]"
            >
              <button
                onClick={closePopup}
                className="absolute top-4 right-4 text-white text-3xl font-bold z-50"
              >
                ×
              </button>

              <iframe
                className="w-full h-full rounded-lg"
                src={getEmbedUrl(currentVideo.videoUrl)}
                loading="lazy"
                title={currentVideo.caption}
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerpolicy="strict-origin-when-cross-origin"
                allowfullscreen
              ></iframe>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default VideoTestiomoniualsPage;
