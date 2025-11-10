import React, { useState, useEffect, useRef } from "react";
import { X } from "lucide-react";

// ✅ Import event images
import img1 from "../../../assets/vaishnavi/13.jpeg";
import img2 from "../../../assets/vaishnavi/2.jpeg";
import img3 from "../../../assets/vaishnavi/3.jpeg";
import img4 from "../../../assets/vaishnavi/4.jpeg";
import img5 from "../../../assets/vaishnavi/5.jpeg";
import img6 from "../../../assets/vaishnavi/6.jpeg";
import img7 from "../../../assets/vaishnavi/7.jpeg";
import img8 from "../../../assets/vaishnavi/8.jpeg";
import img9 from "../../../assets/vaishnavi/9.jpeg";
import img10 from "../../../assets/vaishnavi/10.jpeg";
import img11 from "../../../assets/vaishnavi/11.jpeg";
import img12 from "../../../assets/vaishnavi/12.jpeg";
import img13 from "../../../assets/vaishnavi/13.jpeg";
import img14 from "../../../assets/vaishnavi/14.jpeg";
import img15 from "../../../assets/vaishnavi/15.jpeg";
import img16 from "../../../assets/vaishnavi/16.jpeg";
import img17 from "../../../assets/vaishnavi/17.jpeg";
import img18 from "../../../assets/vaishnavi/18.jpeg";
import img19 from "../../../assets/vaishnavi/19.jpeg";
import img20 from "../../../assets/vaishnavi/20.jpeg";
import img21 from "../../../assets/vaishnavi/21.jpeg";
import img22 from "../../../assets/vaishnavi/22.jpeg";
import img23 from "../../../assets/vaishnavi/23.jpeg";
import img24 from "../../../assets/vaishnavi/24.jpeg";
import img25 from "../../../assets/vaishnavi/25.jpeg";
import img26 from "../../../assets/vaishnavi/26.jpeg";

export default function EventStory() {
  const gallery = [
    img1, img2, img3, img4, img5, img6, img7, img8,
    img9, img10, img11, img12, img13, img14, img15, img16,
    img17, img18, img19, img20, img21, img22, img23, img24,
    img25, img26,
  ];

  const eventInfo = [
    "Annual Tech Fest 2025 — a celebration of innovation and teamwork.",
    "Cultural Night 2025 — music, dance, and joy all around!",
    "Workshop on AI & Robotics — empowering students with future tech.",
    "Annual Sports Meet — teamwork, passion, and dedication on display.",
    "Independence Day Celebration — honoring our nation’s pride.",
    "Guest Lecture — sharing knowledge and vision.",
    "Coding Marathon — where ideas turn into code.",
    "Seminar on Entrepreneurship — building future leaders.",
    "Art Exhibition 2025 — creativity knows no bounds.",
    "Tree Plantation Drive — greener tomorrow, better today.",
    "Science Fair — innovation from young minds.",
    "Women Empowerment Talk — inspiring change and equality.",
    "Internship Drive — connecting students to their careers.",
    "Cultural Parade — representing diverse traditions.",
    "Annual Day Celebration — a night of colors and memories.",
    "Tech Expo — showcasing student innovations.",
    "Blood Donation Camp — every drop counts.",
    "Photography Exhibition — capturing life through lenses.",
    "Startup Meetup — bridging ideas and investments.",
    "Teachers’ Day — honoring our mentors.",
    "Alumni Meet — reconnecting hearts and memories.",
    "Placement Drive — dreams meet opportunities.",
    "National Science Day — celebrating scientific spirit.",
    "Environmental Week — act for Earth.",
    "Graduation Ceremony — milestone of achievement.",
    "Farewell Party — goodbyes with smiles and memories.",
  ];

  const [isOpen, setIsOpen] = useState(false);
  const popupScrollRef = useRef(null);
  const mainScrollRef = useRef(null);
  const isPopupPaused = useRef(false);
  const isMainPaused = useRef(false);

  // ✅ Auto-scroll for main section
  useEffect(() => {
    const scrollContainer = mainScrollRef.current;
    if (!scrollContainer) return;
    let scrollPosition = 0;
    const speed = 2;
    let animationFrameId;

    const smoothScroll = () => {
      if (!isMainPaused.current) {
        scrollPosition += speed;
        if (scrollPosition >= scrollContainer.scrollWidth / 2)
          scrollPosition = 0;
        scrollContainer.scrollLeft = scrollPosition;
      }
      animationFrameId = requestAnimationFrame(smoothScroll);
    };

    animationFrameId = requestAnimationFrame(smoothScroll);
    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  // ✅ Auto-scroll for popup
  useEffect(() => {
    if (!isOpen) return;
    const scrollContainer = popupScrollRef.current;
    let scrollPosition = 0;
    const speed = 3;
    let animationFrameId;

    const smoothScroll = () => {
      if (scrollContainer && !isPopupPaused.current) {
        scrollPosition += speed;
        if (scrollPosition >= scrollContainer.scrollWidth / 2)
          scrollPosition = 0;
        scrollContainer.scrollLeft = scrollPosition;
      }
      animationFrameId = requestAnimationFrame(smoothScroll);
    };

    animationFrameId = requestAnimationFrame(smoothScroll);
    return () => cancelAnimationFrame(animationFrameId);
  }, [isOpen]);

  return (
    <div className="relative min-h-screen bg-black text-white flex flex-col items-center justify-center p-4 sm:p-6 md:p-10">
      {/* ✅ Title */}
      <h2 className="text-center text-2xl sm:text-3xl md:text-5xl font-extrabold mb-8 sm:mb-12 tracking-wide text-amber-400 drop-shadow-[0_0_10px_#f59e0b]">
        🎊 Event Stories
      </h2>

      {/* ✅ Auto-Scrolling Gallery */}
      <div
        ref={mainScrollRef}
        className="w-full max-w-7xl overflow-x-hidden whitespace-nowrap pb-6"
        onMouseEnter={() => (isMainPaused.current = true)}
        onMouseLeave={() => (isMainPaused.current = false)}
      >
        <div className="inline-flex gap-4 sm:gap-6 px-2 sm:px-4">
          {[...gallery, ...gallery].map((img, index) => (
            <div
              key={index}
              onClick={() => setIsOpen(true)}
              className="group flex-shrink-0 bg-neutral-900 border border-amber-500/40 rounded-xl sm:rounded-2xl overflow-hidden 
              shadow-[0_0_15px_#f59e0b40] hover:shadow-[0_0_30px_#f59e0b] hover:scale-105 
              transition-all duration-500 cursor-pointer 
              w-[160px] sm:w-[200px] md:w-[240px] lg:w-[280px] h-[260px] sm:h-[300px] md:h-[340px]"
            >
              <img
                src={img}
                alt={`Event ${index + 1}`}
                className="w-full h-[60%] object-cover grayscale transition-all duration-500 group-hover:grayscale-0"
              />
              <div className="flex flex-col justify-center items-center text-center px-2 sm:px-3 py-3 flex-1 bg-black">
                <p className="text-sm sm:text-base font-semibold text-amber-400 mb-1">
                  Event {index + 1}
                </p>
                <p className="text-[10px] sm:text-xs md:text-sm text-gray-300 leading-snug line-clamp-3">
                  {eventInfo[index % eventInfo.length]}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ✅ Popup (Full Gallery) */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/95 flex flex-col items-center justify-start pt-14 sm:pt-20 z-50 overflow-hidden">
          <button
            onClick={() => setIsOpen(false)}
            className="absolute top-4 right-4 sm:top-6 sm:right-8 text-white hover:text-amber-400 transition"
          >
            <X size={28} />
          </button>

          <h3 className="text-base sm:text-xl font-bold mb-6 text-amber-400 drop-shadow-[0_0_10px_#f59e0b] text-center">
            📸 All Event Highlights
          </h3>

          <div
            ref={popupScrollRef}
            className="w-full max-w-7xl overflow-x-hidden whitespace-nowrap pb-10"
            onMouseEnter={() => (isPopupPaused.current = true)}
            onMouseLeave={() => (isPopupPaused.current = false)}
          >
            <div className="inline-flex gap-3 sm:gap-4 px-3 sm:px-6 items-stretch">
              {[...gallery, ...gallery].map((img, index) => (
                <div
                  key={index}
                  className="relative flex-shrink-0 w-[160px] sm:w-[200px] md:w-[240px] lg:w-[280px] 
                  h-[240px] sm:h-[300px] md:h-[340px] bg-neutral-900 border border-amber-500/40 
                  rounded-xl sm:rounded-2xl overflow-hidden 
                  shadow-[0_0_20px_#f59e0b40] hover:shadow-[0_0_35px_#f59e0b] transition-all duration-500"
                >
                  <img
                    src={img}
                    alt={`Popup Event ${index + 1}`}
                    className="w-full h-[65%] object-cover grayscale transition-all duration-500 hover:grayscale-0"
                  />
                  <div className="flex flex-col justify-center items-center text-center p-2 sm:p-3 bg-black">
                    <p className="text-xs sm:text-sm md:text-base font-semibold text-amber-400 mb-1">
                      Event {index + 1}
                    </p>
                    <p className="text-[10px] sm:text-xs md:text-sm text-gray-300 leading-snug line-clamp-3">
                      {eventInfo[index % eventInfo.length]}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
