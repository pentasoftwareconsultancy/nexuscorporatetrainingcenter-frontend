import React, { useEffect, useRef, useState } from "react";
import ApiService from "../../core/services/api.service";
import ServerUrl from "../../core/constants/serverURL.constant";
import { Star } from "lucide-react";

const SuccessReviews = () => {
  const api = new ApiService();
  const [reviews, setReviews] = useState([]);
  const mainScrollRef = useRef(null);
  const isMainPaused = useRef(false);

  const fetchReviews = async () => {
    try {
      const response = await api.apiget(`${ServerUrl.API_GET_REVIEWS}`);
      const data = response?.data?.data || response?.data || [];
      setReviews(data);
      console.log("Fetched Reviews:", data);
    } catch (error) {
      console.error("Error fetching reviews:", error);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  // Auto scroll
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
    <div className="relative w-full text-white py-2 px-2 sm:px-5 md:px-10">
      <h2 className="text-start text-2xl sm:text-3xl md:text-5xl font-extrabold mb-8 tracking-wide">
        Reviews
      </h2>

      <div className="relative w-full flex items-center justify-center transition-all duration-500 grayscale hover:grayscale-0">
        <div
          ref={mainScrollRef}
          className="w-full overflow-x-hidden whitespace-nowrap pb-6"
          onMouseEnter={() => (isMainPaused.current = true)}
          onMouseLeave={() => (isMainPaused.current = false)}
        >
          <div className="inline-flex gap-4 sm:gap-6 px-2 sm:px-4">

            {[...reviews, ...reviews].map((review, index) => (
              <div
                key={index}
                className="relative flex flex-col justify-between rounded-2xl cursor-pointer overflow-hidden border-2
                min-w-[280px] sm:min-w-[240px] md:min-w-[260px] text-white transition-all duration-300 ease-in-out 
                hover:scale-[1.02] group"
              >
                {/* Image */}
                <div className="w-full h-48 overflow-hidden bg-black">
                  <img
                    src={review?.imageUrl || "/fallback.png"}
                    alt={review?.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    onError={(e) => (e.target.src = "/fallback.png")}
                  />
                </div>

                {/* Content */}
                <div className="p-5 flex flex-col gap-2 text-left">
                  <h3 className="text-lg font-semibold">{review?.name}</h3>

                  <p className="text-sm opacity-80">{review?.position}</p>

                  {/* Review text */}
                  <p className="text-sm text-white leading-snug line-clamp-3">
                    {review?.review}
                  </p>

                  {/* Stars */}
                  <div className="flex gap-1 mt-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        size={18}
                        fill={star <= review?.rating ? "gold" : "none"}
                        stroke={star <= review?.rating ? "gold" : "white"}
                      />
                    ))}
                  </div>
                </div>
              </div>
            ))}

          </div>
        </div>
      </div>
    </div>
  );
};

export default SuccessReviews;
