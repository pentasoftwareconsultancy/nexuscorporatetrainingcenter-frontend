import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ApiService from "../../core/services/api.service";
import ServerUrl from "../../core/constants/serverURL.constant";

const VideoTestiomoniualsPage = () => {
  const api = new ApiService();
  const [videos, setVideos] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [currentVideo, setCurrentVideo] = useState(null);

  // 🔥 FETCH VIDEOS FROM BACKEND
  useEffect(() => {
    api
      .apiget(ServerUrl.API_GET_VIDEOS)
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
  }, []);

  const openPopup = (video) => {
    setCurrentVideo(video);
    setShowPopup(true);
  };

  const closePopup = () => {
    setShowPopup(false);
    setTimeout(() => setCurrentVideo(null), 300);
  };

  return (
    <div className="px-6 py-10 min-h-screen text-one">
      {/* Title */}
      <motion.h1
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-6xl md:text-6xl font-bold mb-10"
      >
        Videos
      </motion.h1>

      {/* Cards Grid */}
      <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-8">
        {videos.map((item, index) => (
          <motion.div
            key={item.id}
            className="flex flex-col justify-center items-center rounded-2xl shadow-xl overflow-hidden cursor-pointer 
              border border-transparent transition-all duration-300
            hover:border-orange-500 hover:shadow-[0_0_15px_rgba(255,115,0,0.8)]"
            whileHover={{ scale: 1.05 }}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ delay: index * 0.1, duration: 0.4 }}
            onClick={() => openPopup(item)}
          >
            {/* Thumbnail */}
            <div className="relative w-full h-60">
              <img
                src={item.thumbnail}
                alt={item.caption}
                loading="lazy"
                className="w-full h-full object-cover"
              />

              {/* Play Icon */}
              <motion.div
                className="absolute inset-0 flex items-center justify-center"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ repeat: Infinity, duration: 1 }}
              >
                <span className="bg-white/70 text-black p-4 rounded-full text-xl shadow-lg">
                  ▶
                </span>
              </motion.div>
            </div>

            {/* Text */}
            <div className="p-5">
              <p className="mt-2 text-lg font-bold">
                <span>Caption:</span> {item.caption}
              </p>
              <p className="mt-1 text-gray-300 text-sm">
                <span className="font-bold">About:</span> {item.about}
              </p>
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

              <iframe className="w-full h-full rounded-lg" src={currentVideo.videoUrl} loading="lazy"
                title={currentVideo.caption} frameborder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                referrerpolicy="strict-origin-when-cross-origin" allowfullscreen
                ></iframe>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default VideoTestiomoniualsPage;
