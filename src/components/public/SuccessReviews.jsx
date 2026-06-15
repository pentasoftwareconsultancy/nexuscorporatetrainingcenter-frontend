import React, { useEffect, useRef, useState } from "react";
import ApiService from "../../core/services/api.service";
import ServerUrl from "../../core/constants/serverURL.constant";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";

const AVATAR_COLORS = [
  "#FF6A00", "#6366f1", "#10b981", "#f59e0b",
  "#ef4444", "#3b82f6", "#8b5cf6", "#ec4899",
];

const getInitials = (name = "") =>
  name.split(" ").slice(0, 2).map((w) => w[0]?.toUpperCase()).join("");

const StarRating = ({ rating }) => (
  <div className="flex gap-0.5">
    {[1, 2, 3, 4, 5].map((s) => (
      <Star
        key={s}
        size={14}
        fill={s <= rating ? "#FBBF24" : "none"}
        stroke={s <= rating ? "#FBBF24" : "#80766b"}
      />
    ))}
  </div>
);

const SuccessReviews = () => {
  const api = new ApiService();
  const [reviews, setReviews] = useState([]);
  const scrollRef = useRef(null);
  const hasFetched = useRef(false);

  useEffect(() => {
    if (hasFetched.current) return;
    hasFetched.current = true;
    const fetch = async () => {
      try {
        const res = await api.apiget(ServerUrl.API_GET_REVIEWS);
        let data = res?.data?.data ?? res?.data ?? [];
        if (!Array.isArray(data)) data = Object.values(data || {});
        const unique = Array.from(
          new Map(data.map((r) => [r.id || r._id || r.name, r])).values()
        );
        setReviews(unique);
      } catch {
        setReviews([]);
      }
    };
    fetch();
  }, []);

  const scroll = (dir) => {
    scrollRef.current?.scrollBy({ left: dir === "left" ? -320 : 320, behavior: "smooth" });
  };

  return (
    <div className="relative w-full text-white py-2 px-2 sm:px-5 md:px-10">
      <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white mb-8">
        Reviews
      </h2>

      <div className="relative w-full group">
        {/* Left arrow */}
        <button
          onClick={() => scroll("left")}
          className="absolute -left-3 top-1/2 -translate-y-1/2 z-20 bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/10 rounded-full p-2 opacity-0 group-hover:opacity-100 transition-all duration-200"
        >
          <ChevronLeft size={18} />
        </button>

        {/* Right arrow */}
        <button
          onClick={() => scroll("right")}
          className="absolute -right-3 top-1/2 -translate-y-1/2 z-20 bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/10 rounded-full p-2 opacity-0 group-hover:opacity-100 transition-all duration-200"
        >
          <ChevronRight size={18} />
        </button>

        <div ref={scrollRef} className="w-full overflow-x-auto pb-4 scrollbar-hide" style={{ scrollbarWidth: "none" }}>
          <div className="inline-flex gap-4 px-1">
            {reviews.map((review, i) => {
              const color = AVATAR_COLORS[i % AVATAR_COLORS.length];
              return (
                <div
                  key={review.id || review._id || i}
                  className="flex flex-col justify-between w-[260px] shrink-0 rounded-2xl bg-[#111] border border-white/8 p-5 gap-3 hover:border-white/20 transition-all duration-200"
                >
                  {/* Quote icon */}
                  <Quote size={20} className="opacity-20 text-[#f97316] " />

                  {/* Review text */}
                  <p className="text-sm sm:text-base font-light text-white/80 leading-relaxed line-clamp-4 flex-1">
                    {review?.review}
                  </p>

                  {/* Stars */}
                  <StarRating rating={review?.rating} />

                  {/* Divider */}
                  <div className="border-t border-white/8" />

                  {/* Avatar + name */}
                  <div className="flex items-center gap-3">
                    <div
                      className="w-9 h-9 rounded-full flex items-center justify-center text-[13px] font-bold shrink-0"
                      style={{ backgroundColor: `${color}30`, color, border: `1.5px solid ${color}60` }}
                    >
                      {getInitials(review?.name)}
                    </div>
                    <div className="min-w-0">
                      <p className="text-[13px] font-semibold truncate">{review?.name}</p>
                      <p className="text-xs text-white/60 truncate">{review?.position}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuccessReviews;
