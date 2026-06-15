import React, { useEffect, useState } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useLocation } from "react-router-dom";
import ApiService from "../../core/services/api.service";
import ServerUrl from "../../core/constants/serverURL.constant";
import { ROUTES } from "../../core/constants/routes.constant";

// Cinematic Card Subcomponent to isolate hover coordinate tracking and prevent full page re-renders
const CinematicCard = ({ item, index, isPlacementTestimonials, onClick }) => {
  const x = useMotionValue(0.5);
  const y = useMotionValue(0.5);

  // Springs for 3D rotation parallax (inertia/damping)
  const rotateX = useSpring(useTransform(y, [0, 1], [10, -10]), { stiffness: 45, damping: 18 });
  const rotateY = useSpring(useTransform(x, [0, 1], [-10, 10]), { stiffness: 45, damping: 18 });

  // Spring translations for dynamic back-shadow/glow position
  const glowX = useSpring(useTransform(x, [0, 1], [-20, 20]), { stiffness: 45, damping: 18 });
  const glowY = useSpring(useTransform(y, [0, 1], [-20, 20]), { stiffness: 45, damping: 18 });

  // Dynamic glare overlay background follow
  const glareBackground = useTransform(
    [x, y],
    ([latestX, latestY]) => `radial-gradient(circle 220px at ${latestX * 100}% ${latestY * 100}%, rgba(255, 106, 0, 0.22) 0%, transparent 80%)`
  );

  const [hovered, setHovered] = useState(false);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    x.set(mouseX / width);
    y.set(mouseY / height);
  };

  const handleMouseEnter = () => setHovered(true);
  const handleMouseLeave = () => {
    setHovered(false);
    x.set(0.5);
    y.set(0.5);
  };

  const easePreset = [0.22, 1, 0.36, 1];

  return (
    <motion.div
      className="relative group perspective-1000"
      style={{ transformStyle: "preserve-3d" }}
      initial={{ opacity: 0, y: -300 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.01 }}
      transition={{
        type: "tween",
        ease: easePreset,
        duration: 2.2,
        delay: index * 0.18,
      }}
    >
      {/* Parallax back glow blur shadow */}
      <motion.div
        className="absolute inset-0 rounded-xl bg-orange-500/15 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          x: glowX,
          y: glowY,
          scale: 0.95,
        }}
      />

      {/* Floating & Parallax Card container */}
      <motion.div
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={onClick}
        animate={hovered ? { scale: 1.06, rotateX, rotateY } : {
          y: [0, -6, 0],
          rotateX: 0,
          rotateY: 0,
          transition: {
            y: {
              duration: 7.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: index * 0.15,
            },
            rotateX: { duration: 0.8, ease: "easeOut" },
            rotateY: { duration: 0.8, ease: "easeOut" },
            scale: { duration: 0.8, ease: "easeOut" },
          }
        }}
        style={{
          rotateX: hovered ? rotateX : 0,
          rotateY: hovered ? rotateY : 0,
          transformStyle: "preserve-3d",
          aspectRatio: isPlacementTestimonials ? "1 / 1.7" : "4 / 5"
        }}
        className="relative flex flex-col rounded-xl shadow-2xl overflow-hidden cursor-pointer 
          border border-white/8 bg-[#0a0a0a]/90 backdrop-blur-md glass-luxury transition-colors duration-500
          hover:border-orange-500/40 hover:shadow-[0_0_35px_rgba(255,106,0,0.2)]"
      >
        {/* Full Card Background Image */}
        <img
          src={item.thumbnail || "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800"}
          alt={item.caption}
          loading="lazy"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800";
          }}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-108"
        />

        {/* Ambient Overlay Layer (Noise Grain) */}
        <div className="absolute inset-0 pointer-events-none z-10 luxury-noise opacity-[0.03]" />

        {/* Darkening base overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent transition-opacity duration-500 group-hover:opacity-75" />

        {/* Cursor-Following Glare Highlight */}
        <motion.div
          className="absolute inset-0 pointer-events-none z-10 mix-blend-overlay transition-opacity duration-300 opacity-0 group-hover:opacity-100"
          style={{ background: glareBackground }}
        />

        {/* Play Button Overlay on Hover */}
        <div className="absolute inset-0 flex items-center justify-center bg-black/45 opacity-0 hover:opacity-100 transition-opacity duration-300 z-20">
          <motion.div
            className="bg-orange-500 text-white p-3 rounded-full text-lg shadow-2xl flex items-center justify-center w-12 h-12"
            whileHover={{ scale: 1.15, rotate: 8 }}
            whileTap={{ scale: 0.95 }}
          >
            ▶
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
};

// Standard Card Subcomponent for Course Videos (no tilting, glare, or complex spring effects)
const StandardCard = ({ item, index, onClick, truncateWords }) => {
  return (
    <motion.div
      className="flex flex-col rounded-2xl shadow-xl overflow-hidden cursor-pointer 
        border border-white/5 transition-all duration-300 bg-[#121212]
        hover:border-orange-500 hover:shadow-[0_0_15px_rgba(255,115,0,0.8)]"
      whileHover={{ scale: 1.03 }}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ delay: index * 0.1, duration: 0.4 }}
      onClick={onClick}
    >
      {/* Thumbnail */}
      <div className="relative w-full h-60 overflow-hidden bg-black">
        <img
          src={item.thumbnail || "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800"}
          alt={item.caption}
          loading="lazy"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800";
          }}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
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

      {/* Text block underneath the image */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          <p className="text-base font-bold text-white line-clamp-1">
            {item.caption}
          </p>
          <p className="mt-1.5 text-white/60 text-xs line-clamp-2 leading-relaxed">
            {truncateWords(item.about, 15)}
          </p>
        </div>
      </div>
    </motion.div>
  );
};

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
    <div className="relative px-6 py-10 text-one bg-three min-h-screen overflow-hidden">
      {/* Cinematic Ambient Background Blobs */}
      <div className="absolute top-[10%] left-[-10%] w-[45vw] h-[45vw] max-w-[600px] rounded-full bg-orange-500/5 blur-[120px] pointer-events-none z-0 animate-float-blob" />
      <div className="absolute bottom-[20%] right-[-10%] w-[40vw] h-[40vw] max-w-[500px] rounded-full bg-amber-600/5 blur-[100px] pointer-events-none z-0 animate-float-blob-reverse" />
      
      {/* Background Noise Overlay */}
      <div className="absolute inset-0 pointer-events-none z-0 luxury-noise opacity-[0.015]" />

      {/* Title */}
      <motion.h1
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-20 text-2xl sm:text-3xl md:text-4xl lg:text-[46px] font-bold tracking-tight text-white mb-6"
      >
        {isPlacementTestimonials ? "Placement Testimonials" : "Course Videos"}
      </motion.h1>

      {/* Cinematic Glowing Divider */}
      <motion.div 
        initial={{ scaleX: 0, opacity: 0 }}
        animate={{ scaleX: 1, opacity: 1 }}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
        className="relative z-20 glow-divider mb-12 origin-left w-full"
      />

      {/* Masking Container for Slide-Down Effect */}
      <div className="relative overflow-hidden z-10 pt-4 pb-12 px-2 -mx-2">
        <div className={
          isPlacementTestimonials 
            ? "grid gap-x-4 sm:gap-x-6 gap-y-12 sm:gap-y-16 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5" 
            : "grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3"
        }>
          {videos.map((item, index) => (
            isPlacementTestimonials ? (
              <CinematicCard
                key={item.id}
                item={item}
                index={index}
                isPlacementTestimonials={isPlacementTestimonials}
                onClick={() => openPopup(item)}
              />
            ) : (
              <StandardCard
                key={item.id}
                item={item}
                index={index}
                onClick={() => openPopup(item)}
                truncateWords={truncateWords}
              />
            )
          ))}
        </div>
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
