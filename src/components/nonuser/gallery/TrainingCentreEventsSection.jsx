import React, { useEffect, useState, useMemo } from "react";
import { X, Play, Image as ImageIcon, Film, MapPin, Calendar, ChevronLeft, ChevronRight } from "lucide-react";
import ApiService from "../../../core/services/api.service";
import ServerUrl from "../../../core/constants/serverURL.constant";
import zeal1 from "../../../assets/gallary/zeal1.avif";

export default function TrainingCentreEventsSection() {
  const api = new ApiService();

  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [lightboxMedia, setLightboxMedia] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setLoading(true);
        const res = await api.apiget(ServerUrl.API_TRAINING_CENTRE_EVENTS);
        setEvents(res?.data?.data || []);
      } catch (err) {
        console.error("Failed to fetch training centre events:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  const displayEvents = useMemo(() => {
    if (events.length === 0) return [];
    let list = [...events];
    if (list.length < 5) {
      while (list.length < 5) {
        list = [...list, ...events];
      }
    }
    return list;
  }, [events]);

  useEffect(() => {
    if (loading || displayEvents.length === 0) return;
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % displayEvents.length);
    }, 2000);
    return () => clearInterval(interval);
  }, [loading, displayEvents.length]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      // Don't trigger if lightbox is open
      if (lightboxMedia) return;
      if (e.key === "ArrowLeft") {
        setActiveIndex((prev) => (prev === 0 ? displayEvents.length - 1 : prev - 1));
      } else if (e.key === "ArrowRight") {
        setActiveIndex((prev) => (prev + 1) % displayEvents.length);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [displayEvents.length, lightboxMedia]);

  const getThumbnail = (item) => {
    const firstImage = item.media?.find((m) => m.type === "image");
    if (firstImage) return firstImage.url;
    return zeal1; // Fallback
  };

  const getEmbedUrl = (url) => {
    if (!url) return "";
    let embedUrl = url;
    if (url.includes("youtube.com/watch?v=")) {
      const videoId = url.split("v=")[1]?.split("&")[0];
      embedUrl = `https://www.youtube.com/embed/${videoId}`;
    } else if (url.includes("youtu.be/")) {
      const videoId = url.split("youtu.be/")[1]?.split("?")[0];
      embedUrl = `https://www.youtube.com/embed/${videoId}`;
    } else if (url.includes("vimeo.com/")) {
      const videoId = url.split("vimeo.com/")[1]?.split("?")[0];
      embedUrl = `https://player.vimeo.com/video/${videoId}`;
    }
    return embedUrl;
  };



  return (
    <div className="relative w-full text-white py-16 px-6 sm:px-12 border-t border-zinc-900 bg-black/10 overflow-hidden">
      {/* Title */}
      <div className="max-w-[2400px] mx-auto mb-10 relative z-10">
        <h2 className="text-start text-2xl sm:text-3xl md:text-5xl font-extrabold mb-4 tracking-wide">
          Training Centre 
          <span className="text-orange-500"> Events </span>
        </h2>
        <p className="text-gray-300 text-sm md:text-base max-w-4xl leading-relaxed">
          Take a look at the latest happenings, training workshops, bootcamps, and events at our training centre. Browse through high-quality photos and video sessions of our learners in action.
        </p>
      </div>

      {loading ? (
        <div className="max-w-[2400px] mx-auto text-gray-400">Loading events...</div>
      ) : events.length === 0 ? (
        <div className="max-w-[2400px] mx-auto text-gray-500 py-10">
          No training centre events posted yet. Check back soon!
        </div>
      ) : (
        <div className="relative w-full max-w-[2400px] mx-auto flex flex-col items-center select-none">
          {/* Spotlight Glow Background */}
          <div className="carousel-spotlight"></div>
          
          {/* Carousel Perspective Area */}
          <div className="perspective-container z-10 my-4 relative w-full flex justify-center">

            {displayEvents.map((event, i) => {
              const imageCount = event.media?.filter((m) => m.type === "image").length || 0;
              const videoCount = event.media?.filter((m) => m.type === "video").length || 0;
              
              // Calculate circular offset
              const N = displayEvents.length;
              let diff = i - activeIndex;
              if (diff > N / 2) {
                diff -= N;
              } else if (diff < -N / 2) {
                diff += N;
              }
              
              // Class assignment
              let slotClass = "slot-hidden";
              if (diff === 0) slotClass = "slot-active";
              else if (diff === -1) slotClass = "slot-left-1";
              else if (diff === 1) slotClass = "slot-right-1";
              else if (diff === -2) slotClass = "slot-left-2";
              else if (diff === 2) slotClass = "slot-right-2";
              
              const isActive = diff === 0;
              
              return (
                <div
                  key={`${event.id || event._id}-${i}`}
                  onClick={() => {
                    if (isActive) {
                      setLightboxMedia(event.media || []);
                      setSelectedIndex(0);
                    } else {
                      setActiveIndex(i);
                    }
                  }}
                  className={`carousel-card ${slotClass} bg-zinc-900 border border-zinc-800/80 rounded-[2rem] overflow-hidden cursor-pointer group transition-all duration-500 shadow-xl flex flex-col justify-end`}
                >
                  {/* Card Background Thumbnail */}
                  <div className="absolute inset-0 w-full h-full bg-black">
                    <img
                      src={getThumbnail(event)}
                      alt={event.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    {/* Shadow overlay matching Netflix movie card style */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/45 to-transparent opacity-90"></div>
                  </div>
                  
                  {/* Media Badges Top Right */}
                  <div className="absolute top-4 right-4 flex gap-1.5 z-20">
                    {imageCount > 0 && (
                      <span className="flex items-center gap-1 bg-black/60 backdrop-blur-md text-[10px] sm:text-xs px-2.5 py-1 rounded-full text-gray-200 border border-white/5">
                        <ImageIcon size={11} className="text-orange-400" /> {imageCount}
                      </span>
                    )}
                    {videoCount > 0 && (
                      <span className="flex items-center gap-1 bg-orange-500/90 text-[10px] sm:text-xs px-2.5 py-1 rounded-full text-black font-semibold shadow-lg">
                        <Film size={11} /> {videoCount}
                      </span>
                    )}
                  </div>
                  
                  {/* Content Overlays at the bottom */}
                  <div className="relative p-6 z-10 flex flex-col justify-end h-full">
                    <span className="text-[10px] uppercase tracking-widest text-orange-400 font-extrabold mb-1">
                      Nexus Event
                    </span>
                    
                    <h3 className="text-lg sm:text-xl font-bold text-white transition-colors duration-200 line-clamp-1 mb-2">
                      {event.title}
                    </h3>
                    
                    <p className="text-gray-300 text-xs line-clamp-2 overflow-hidden transition-all duration-500 opacity-0 max-h-0 group-hover:opacity-100 group-hover:max-h-[60px] group-hover:mb-3">
                      {event.description}
                    </p>
                    
                    <div className="flex flex-wrap gap-y-2 justify-between items-center text-[10px] sm:text-xs text-gray-400 border-t border-white/10 pt-3">
                      {event.date && (
                        <span className="flex items-center gap-1">
                          <Calendar size={11} className="text-orange-400" />
                          {new Date(event.date).toLocaleDateString(undefined, {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                          })}
                        </span>
                      )}
                      {event.location && (
                        <span className="flex items-center gap-1 max-w-[120px] truncate">
                          <MapPin size={11} className="text-orange-400" />
                          {event.location}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* FULL SCREEN CAROUSEL LIGHTBOX */}
      {lightboxMedia && lightboxMedia.length > 0 && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 p-4 animate-in fade-in duration-300"
          onClick={() => setLightboxMedia(null)}
        >
          <button
            className="absolute top-6 right-6 p-2 bg-white/10 hover:bg-white/20 rounded-full transition-colors text-white z-50"
            onClick={(e) => {
              e.stopPropagation();
              setLightboxMedia(null);
            }}
          >
            <X size={32} />
          </button>

          {lightboxMedia.length > 1 && (
            <button 
              className="absolute left-4 sm:left-10 p-3 bg-white/10 hover:bg-white/20 rounded-full transition-colors text-white z-50"
              onClick={(e) => {
                e.stopPropagation();
                setSelectedIndex((prev) => (prev === 0 ? lightboxMedia.length - 1 : prev - 1));
              }}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
            </button>
          )}

          <div className="relative w-full max-w-7xl max-h-[90vh] flex items-center justify-center" onClick={(e) => e.stopPropagation()}>
            {(() => {
              const media = lightboxMedia[selectedIndex];
              if (media.type === "video") {
                const isEmbed =
                  media.url.includes("youtube.com") ||
                  media.url.includes("youtu.be") ||
                  media.url.includes("vimeo.com");
                return (
                  <div className="w-full aspect-video max-h-[90vh] bg-black rounded-lg shadow-2xl border border-white/10 overflow-hidden flex items-center justify-center">
                    {isEmbed ? (
                      <iframe
                        src={getEmbedUrl(media.url)}
                        className="w-full h-full"
                        title="Event Video Link"
                        allowFullScreen
                      ></iframe>
                    ) : (
                      <video src={media.url} controls autoPlay className="max-w-full max-h-[90vh] object-contain" />
                    )}
                  </div>
                );
              } else {
                return (
                  <img
                    src={media.url}
                    alt="Event media"
                    className="max-w-full max-h-[90vh] object-contain rounded-lg shadow-2xl border border-white/10"
                  />
                );
              }
            })()}
          </div>

          {lightboxMedia.length > 1 && (
            <button 
              className="absolute right-4 sm:right-10 p-3 bg-white/10 hover:bg-white/20 rounded-full transition-colors text-white z-50"
              onClick={(e) => {
                e.stopPropagation();
                setSelectedIndex((prev) => (prev === lightboxMedia.length - 1 ? 0 : prev + 1));
              }}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
            </button>
          )}
        </div>
      )}
    </div>
  );
}
