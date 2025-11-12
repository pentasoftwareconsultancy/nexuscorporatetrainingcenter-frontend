import React, { useEffect, useRef } from "react";
import { X } from "lucide-react";
import CoursesCard from "../../common/CoursesCard";
import eventData from "../../../assets/vaishnavi/eventStoryData.json";

export default function EventStory() {
  const mainScrollRef = useRef(null);
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

  return (
    <div className="relative w-full text-white py-18 px-12">
      {/* ✅ Title */}
      <h2 className="text-start text-2xl sm:text-3xl md:text-5xl font-extrabold mb-8 sm:mb-12 tracking-wide text-white">
        Event Stories
      </h2>
      <div className="relative w-full flex items-center justify-center">

      {/* ✅ Auto-Scrolling Gallery */}
      <div
        ref={mainScrollRef}
        className="w-full overflow-x-hidden whitespace-nowrap pb-6"
        onMouseEnter={() => (isMainPaused.current = true)}
        onMouseLeave={() => (isMainPaused.current = false)}
        >
        <div className="inline-flex gap-4 sm:gap-6 px-2 sm:px-4">
          {[...eventData, ...eventData].map((event, index) => (
            <CoursesCard
            key={index}
            image={`/src/assets/vaishnavi/${event.image}`}
            title={event.title}
            description={event.description}
            />
          ))}
        </div>
      </div>
          </div>
    </div>
  );
}
