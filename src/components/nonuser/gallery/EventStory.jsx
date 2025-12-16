import React, { useEffect, useRef, useState } from "react";
import { X } from "lucide-react";
import CoursesCard from "../../common/StoryCard";
import ApiService from "../../../core/services/api.service";
import ServerUrl from "../../../core/constants/serverURL.constant";

export default function EventStory() {
  const api = new ApiService();

  const mainScrollRef = useRef(null);
  const isMainPaused = useRef(false);

  const [eventStories, setEventStories] = useState([]);
  const safeStories = Array.isArray(eventStories) ? eventStories : [];

  /* ================= FETCH EVENT STORIES ================= */
  useEffect(() => {
    const fetchEventStories = async () => {
      try {
        const res = await api.apiget(ServerUrl.API_GET_EVENTSTORIES);
        // ✅ adjust according to your backend response structure
        setEventStories(res?.data?.data || []);
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

    animationFrameId = requestAnimationFrame(smoothScroll);
    return () => cancelAnimationFrame(animationFrameId);
  }, [eventStories]);

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

      <div className="relative w-full flex items-center justify-center grayscale hover:grayscale-0">
        <div
          ref={mainScrollRef}
          className="w-full overflow-x-hidden whitespace-nowrap pb-6"
          onMouseEnter={() => (isMainPaused.current = true)}
          onMouseLeave={() => (isMainPaused.current = false)}
        >
          <div className="inline-flex gap-4 sm:gap-6 px-2 sm:px-4">
            {[...safeStories, ...safeStories].map((event, index) => (
              <div
                key={index}
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

                <div className="p-4">
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
    </div>
  );
}
