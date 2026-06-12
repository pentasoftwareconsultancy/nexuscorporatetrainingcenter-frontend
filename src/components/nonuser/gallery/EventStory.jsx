import React, { useEffect, useState, useMemo } from "react";
import { X, Calendar, MapPin, Image as ImageIcon, ChevronLeft, ChevronRight } from "lucide-react";
import CoursesCard from "../../common/StoryCard";
import ApiService from "../../../core/services/api.service";
import ServerUrl from "../../../core/constants/serverURL.constant";

import zeal1 from "../../../assets/gallary/zeal1.avif";
import zeal2 from "../../../assets/gallary/zeal2.avif";
import zeal3 from "../../../assets/gallary/zeal3.avif";
import zeal4 from "../../../assets/gallary/zeal4.avif";
import zeal5 from "../../../assets/gallary/zeal5.avif";
import zeal6 from "../../../assets/gallary/zeal6.avif";
import zeal7 from "../../../assets/gallary/zeal7.avif";
import govtpoly1 from "../../../assets/gallary/govtpoly1.avif";
import govtpoly2 from "../../../assets/gallary/govtpoly2.avif";
import govtpoly3 from "../../../assets/gallary/govtpoly3.avif";
import akola1 from "../../../assets/gallary/akolaclg/Screenshot (81) 5.avif";
import akola2 from "../../../assets/gallary/akolaclg/Screenshot (81) 8.avif";
import akola3 from "../../../assets/gallary/akolaclg/Screenshot (81) 10.avif";
import akola4 from "../../../assets/gallary/akolaclg/Screenshot (81) 11.avif";

const fallbackImages = [zeal1, zeal2, zeal3, zeal4, zeal5, zeal6, zeal7];

export default function EventStory() {
  const api = new ApiService();

  const [eventStories, setEventStories] = useState([]);
  const [lightboxImages, setLightboxImages] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(0);
  
  const [activeIndex, setActiveIndex] = useState(0);
  
  const dummyStories = [
    {
      eventName: "Zeal College Event",
      date: new Date().toISOString(),
      location: "Pune Campus",
      image: fallbackImages[0],
      allImages: fallbackImages
    },
    {
      eventName: "Government College Event",
      date: new Date().toISOString(),
      location: "Pune",
      image: govtpoly1,
      allImages: [govtpoly1, govtpoly2, govtpoly3]
    },
    {
      eventName: "Akola College Event",
      date: new Date().toISOString(),
      location: "Akola",
      image: akola1,
      allImages: [akola1, akola2, akola3, akola4]
    }
  ];

  const safeStories = Array.isArray(eventStories) && eventStories.length > 0 ? eventStories : dummyStories;

  /* ================= FETCH EVENT STORIES ================= */
  useEffect(() => {
    const fetchEventStories = async () => {
      try {
        const res = await api.apiget(ServerUrl.API_GET_EVENTSTORIES);
        const data = res?.data?.data || [];
        
        const enrichedData = data.map((item, index) => {
          let eventImg = item.image;
          if (typeof eventImg !== "string" || !eventImg.startsWith("http")) {
            if (item.eventName === "Zeal College Event" || eventImg === "zeal1") eventImg = zeal1;
            else if (item.eventName === "Government College Event" || eventImg === "govtpoly1") eventImg = govtpoly1;
            else if (item.eventName === "Akola College Event" || eventImg === "akola1") eventImg = akola1;
            else eventImg = fallbackImages[index % fallbackImages.length];
          }

          let eventAllImages = item.images?.length ? item.images : null;
          if (!eventAllImages) {
            if (item.eventName === "Zeal College Event" || item.image === "zeal1") eventAllImages = fallbackImages;
            else if (item.eventName === "Government College Event" || item.image === "govtpoly1") eventAllImages = [govtpoly1, govtpoly2, govtpoly3];
            else if (item.eventName === "Akola College Event" || item.image === "akola1") eventAllImages = [akola1, akola2, akola3, akola4];
            else eventAllImages = fallbackImages;
          }

          return {
            ...item,
            image: eventImg,
            allImages: eventAllImages
          };
        });
        
        setEventStories(enrichedData);
      } catch (error) {
        console.error("Failed to fetch event stories:", error);
      }
    };

    fetchEventStories();
  }, []);

  const displayStories = useMemo(() => {
    if (safeStories.length === 0) return [];
    let list = [...safeStories];
    if (list.length < 5) {
      while (list.length < 5) {
        list = [...list, ...safeStories];
      }
    }
    return list;
  }, [safeStories]);

  useEffect(() => {
    if (displayStories.length === 0) return;
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % displayStories.length);
    }, 2000);
    return () => clearInterval(interval);
  }, [displayStories.length]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      // Don't trigger if lightbox is open (lightbox has its own state)
      if (lightboxImages) return;
      if (e.key === "ArrowLeft") {
        setActiveIndex((prev) => (prev === 0 ? displayStories.length - 1 : prev - 1));
      } else if (e.key === "ArrowRight") {
        setActiveIndex((prev) => (prev + 1) % displayStories.length);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [displayStories.length, lightboxImages]);

  return (
    <div className="relative w-full text-white py-16 px-6 sm:px-12 border-t border-zinc-900 bg-black/10 overflow-hidden">
      {/* Title */}
      <div className="max-w-[2400px] mx-auto mb-10 relative z-10">
        <h2 className="text-start text-2xl sm:text-3xl md:text-5xl font-extrabold mb-4 tracking-wide">
          Event  <span className="text-orange-500"> Stories </span>
        </h2>
        {/* <p className="text-gray-300 text-sm md:text-base max-w-4xl leading-relaxed">
          Immerse yourself in our world of collaboration and innovation. Our
          gallery showcases the dynamic events, expert-led workshops, and
          successful placement drives conducted in partnership with leading
          colleges and industry clients.
        </p> */}
      </div>

      <div className="relative w-full max-w-[2400px] mx-auto flex flex-col items-center select-none">
        {/* Spotlight Glow Background */}
        <div className="carousel-spotlight"></div>
        
        {/* Carousel Perspective Area */}
        <div className="perspective-container z-10 my-4 relative w-full flex justify-center">

          {displayStories.map((event, i) => {
            const imageCount = event.allImages?.length || 0;
            
            // Calculate circular offset
            const N = displayStories.length;
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
                key={`${event.id || event._id || i}-${i}`}
                onClick={() => {
                  if (isActive) {
                    setLightboxImages(event.allImages || fallbackImages);
                    setSelectedIndex(0);
                  } else {
                    setActiveIndex(i);
                  }
                }}
                className={`carousel-card ${slotClass} bg-zinc-900 border border-zinc-800/80 rounded-[2rem] overflow-hidden cursor-pointer group transition-all duration-500 shadow-xl flex flex-col justify-end`}
              >
                {/* Card Background Image */}
                <div className="absolute inset-0 w-full h-full bg-black">
                  <img
                    src={event.image}
                    alt={event.eventName}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/45 to-transparent opacity-90"></div>
                </div>

                {/* Top Right Media count badge */}
                {imageCount > 0 && (
                  <div className="absolute top-4 right-4 flex gap-1.5 z-20">
                    <span className="flex items-center gap-1 bg-black/60 backdrop-blur-md text-[10px] sm:text-xs px-2.5 py-1 rounded-full text-gray-200 border border-white/5">
                      <ImageIcon size={11} className="text-orange-400" /> {imageCount}
                    </span>
                  </div>
                )}

                {/* Content Overlays at the bottom */}
                <div className="relative p-6 z-10 flex flex-col justify-end h-full">
                  <span className="text-[10px] uppercase tracking-widest text-orange-400 font-extrabold mb-1">
                    Event Story
                  </span>
                  
                  <h3 className="text-lg sm:text-xl font-bold text-white transition-colors duration-200 line-clamp-1 mb-2">
                    {event.eventName}
                  </h3>
                  
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

      {/* FULL SCREEN CAROUSEL LIGHTBOX */}
      {lightboxImages && lightboxImages.length > 0 && (
        <div 
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 p-4 animate-in fade-in duration-300"
          onClick={() => setLightboxImages(null)}
        >
          <button 
            className="absolute top-6 right-6 p-2 bg-white/10 hover:bg-white/20 rounded-full transition-colors text-white z-50"
            onClick={(e) => {
              e.stopPropagation();
              setLightboxImages(null);
            }}
          >
            <X size={32} />
          </button>
          
          {lightboxImages.length > 1 && (
            <button 
              className="absolute left-4 sm:left-10 p-3 bg-white/10 hover:bg-white/20 rounded-full transition-colors text-white z-50"
              onClick={(e) => {
                e.stopPropagation();
                setSelectedIndex((prev) => (prev === 0 ? lightboxImages.length - 1 : prev - 1));
              }}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
            </button>
          )}

          <div 
            className="relative max-w-7xl w-full max-h-[90vh] flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <img 
              src={lightboxImages[selectedIndex].url || lightboxImages[selectedIndex]} 
              alt="Event full view" 
              className="max-w-full max-h-[90vh] object-contain rounded-lg shadow-2xl border border-white/10"
            />
          </div>

          {lightboxImages.length > 1 && (
            <button 
              className="absolute right-4 sm:right-10 p-3 bg-white/10 hover:bg-white/20 rounded-full transition-colors text-white z-50"
              onClick={(e) => {
                e.stopPropagation();
                setSelectedIndex((prev) => (prev === lightboxImages.length - 1 ? 0 : prev + 1));
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
