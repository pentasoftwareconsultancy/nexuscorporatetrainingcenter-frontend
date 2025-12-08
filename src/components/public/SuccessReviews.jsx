import React, { useEffect, useRef } from "react";
import eventData from "../../assets/vaishnavi/eventStoryData.json";
import StoryCard from "../common/StoryCard";

const SuccessReviews = () => {
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
    <div className="relative w-full text-white py-2 px-2 sm:px-5  md:px-10  ">
      {/* ✅ Title */}
      <h2 className="text-start text-2xl sm:text-3xl md:text-5xl font-extrabold mb-8 sm:mb-8 tracking-wide text-white  ">
        Reviews
      </h2>
      <div className="relative w-full flex items-center justify-center  transition-all duration-500 grayscale hover:grayscale-0">
        {/* ✅ Auto-Scrolling Gallery */}
        <div
          ref={mainScrollRef}
          className="w-full overflow-x-hidden whitespace-nowrap pb-6"
          onMouseEnter={() => (isMainPaused.current = true)}
          onMouseLeave={() => (isMainPaused.current = false)}
        >
          <div className="inline-flex gap-4 sm:gap-6 px-2 sm:px-4">
            {[...eventData, ...eventData].map((event, index) => (
              <StoryCard
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
};

export default SuccessReviews;
