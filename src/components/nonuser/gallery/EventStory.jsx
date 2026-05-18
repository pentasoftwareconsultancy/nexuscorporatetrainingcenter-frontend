import React, { useEffect, useRef, useState } from "react";
import { X } from "lucide-react";
import CoursesCard from "../../common/StoryCard";
import ApiService from "../../../core/services/api.service";
import ServerUrl from "../../../core/constants/serverURL.constant";

import zeal1 from "../../../assets/gallary/zeal1.jpeg";
import zeal2 from "../../../assets/gallary/zeal2.jpeg";
import zeal3 from "../../../assets/gallary/zeal3.jpeg";
import zeal4 from "../../../assets/gallary/zeal4.jpeg";
import zeal5 from "../../../assets/gallary/zeal5.jpeg";
import zeal6 from "../../../assets/gallary/zeal6.jpeg";
import zeal7 from "../../../assets/gallary/zeal7.jpeg";
import govtpoly1 from "../../../assets/gallary/govtpoly1.jpeg";
import govtpoly2 from "../../../assets/gallary/govtpoly2.jpeg";
import govtpoly3 from "../../../assets/gallary/govtpoly3.jpeg";
import akola1 from "../../../assets/gallary/akolaclg/Screenshot (81) 5.png";
import akola2 from "../../../assets/gallary/akolaclg/Screenshot (81) 8.png";
import akola3 from "../../../assets/gallary/akolaclg/Screenshot (81) 10.png";
import akola4 from "../../../assets/gallary/akolaclg/Screenshot (81) 11.png";

const fallbackImages = [zeal1, zeal2, zeal3, zeal4, zeal5, zeal6, zeal7];

export default function EventStory() {
  const api = new ApiService();

  const mainScrollRef = useRef(null);
  const isMainPaused = useRef(false);

  const [eventStories, setEventStories] = useState([]);
  const [selectedEventImages, setSelectedEventImages] = useState(null);
  const [fullScreenImage, setFullScreenImage] = useState(null);
  
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

  /* ================= AUTO SCROLL ================= */
  useEffect(() => {
    const scrollContainer = mainScrollRef.current;
    if (!scrollContainer) return;

    let scrollPosition = 0;
    const speed = 2;
    let animationFrameId;

    const smoothScroll = () => {
      if (!isMainPaused.current) {
        scrollPosition += speed;
        if (scrollPosition >= scrollContainer.scrollWidth / 2) {
          scrollPosition = 0;
        }
        scrollContainer.scrollLeft = scrollPosition;
      }
      animationFrameId = requestAnimationFrame(smoothScroll);
    };

    if (safeStories.length > 2) {
      animationFrameId = requestAnimationFrame(smoothScroll);
    }
    return () => {
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
    };
  }, [safeStories.length]);

  return (
    <div className="relative w-full text-white py-2 px-12">
      {/* Title */}
      <h2 className="text-start text-2xl sm:text-3xl md:text-5xl font-extrabold mb-8 tracking-wide">
        Event Stories
      </h2>

      <p className="pb-8">
        Immerse yourself in our world of collaboration and innovation. Our
        gallery showcases the dynamic events, expert-led workshops, and
        successful placement drives conducted in partnership with leading
        colleges and industry clients.
      </p>

      <div className="relative w-full flex items-center justify-start grayscale hover:grayscale-0">
        <div
          ref={mainScrollRef}
          className="w-full overflow-x-auto whitespace-nowrap pb-6 custom-scrollbar"
          onMouseEnter={() => (isMainPaused.current = true)}
          onMouseLeave={() => (isMainPaused.current = false)}
        >
          <div className="inline-flex gap-4 sm:gap-6 px-2 sm:px-4">
            {/* If only 1 story, don't duplicate it. Duplicate only if enough items to scroll */}
            {(safeStories.length > 2 ? [...safeStories, ...safeStories] : safeStories).map((event, index) => (
              <div
                key={index}
                onClick={() => setSelectedEventImages(event.allImages || fallbackImages)}
                className="relative flex flex-col justify-between rounded-2xl cursor-pointer
                overflow-hidden border-2 min-w-[280px] sm:min-w-[240px] md:min-w-[260px]
                transition-all duration-300 hover:scale-[1.02] group"
              >
                <div className="w-full h-56 overflow-hidden">
                  <img
                    src={event.image}
                    alt={event.eventName}
                    className="w-full h-full p-2 rounded-3xl object-cover
                    transition-transform duration-500 group-hover:scale-105"
                  />
                </div>

                <div className="p-4 whitespace-normal">
                  <p>
                    Event Name - <span>{event.eventName}</span>
                  </p>
                  <p>
                    Date - <span>{new Date(event.date).toLocaleDateString()}</span>
                  </p>
                  <p>
                    Location - <span>{event.location}</span>
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* MODAL / LIGHTBOX FOR EVENT PHOTOS */}
      {selectedEventImages && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 sm:p-8">
          <div className="relative w-full max-w-6xl h-full max-h-[90vh] flex flex-col bg-gray-900 rounded-2xl overflow-hidden border border-gray-700">
            {/* Header */}
            <div className="flex justify-between items-center p-4 border-b border-gray-800">
              <h3 className="text-xl font-bold">Event Photos</h3>
              <button 
                onClick={() => setSelectedEventImages(null)}
                className="p-2 hover:bg-gray-800 text-gray-300 hover:text-white rounded-full transition-colors"
              >
                <X size={24} />
              </button>
            </div>
            {/* Grid */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
                {selectedEventImages.map((img, idx) => (
                  <div 
                    key={idx} 
                    className="relative aspect-square rounded-xl overflow-hidden group border border-gray-700 shadow-lg cursor-pointer"
                    onClick={() => setFullScreenImage(img.url || img)}
                  >
                    <img 
                      src={img.url || img} 
                      alt={`Event photo ${idx + 1}`} 
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
      {/* FULL SCREEN LIGHTBOX FOR INDIVIDUAL PHOTO */}
      {fullScreenImage && (
        <div 
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 p-4 animate-in fade-in duration-300"
          onClick={() => setFullScreenImage(null)}
        >
          <button 
            className="absolute top-6 right-6 p-2 bg-white/10 hover:bg-white/20 rounded-full transition-colors text-white"
            onClick={(e) => {
              e.stopPropagation();
              setFullScreenImage(null);
            }}
          >
            <X size={32} />
          </button>
          
          <div 
            className="relative max-w-7xl max-h-[90vh] flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <img 
              src={fullScreenImage} 
              alt="Full view" 
              className="max-w-full max-h-[90vh] object-contain rounded-lg shadow-2xl border border-white/10"
            />
          </div>
        </div>
      )}
    </div>
  );
}
