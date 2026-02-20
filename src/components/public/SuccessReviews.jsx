import React, { useEffect, useRef, useState } from "react";
import ApiService from "../../core/services/api.service";
import ServerUrl from "../../core/constants/serverURL.constant";
import { Star, X } from "lucide-react";

const SuccessReviews = () => {
  const api = new ApiService();
  const [reviews, setReviews] = useState([]);
  const [selectedReview, setSelectedReview] = useState(null);
  const mainScrollRef = useRef(null);

  const fetchReviews = async () => {
    try {
      const response = await api.apiget(`${ServerUrl.API_GET_REVIEWS}`);
      const data = response?.data?.data || response?.data || [];
      setReviews(data);
    } catch (error) {
      console.error("Error fetching reviews:", error);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  const scroll = (direction) => {
    const container = mainScrollRef.current;
    if (!container) return;

    const scrollAmount = 320;

    container.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  return (
    <>
      <div className="relative w-full text-white py-2 px-2 sm:px-5 md:px-10">
        <h2 className="text-start text-2xl sm:text-3xl md:text-5xl font-extrabold mb-8 tracking-wide">
          Reviews
        </h2>

        <div className="relative w-full group">

          {/* LEFT BUTTON */}
          <button
            onClick={() => scroll("left")}
            className="absolute left-0 sm:-left-4 top-1/2 -translate-y-1/2
            bg-black/60 hover:bg-black text-white
            p-3 size-20 rounded-full opacity-0 group-hover:opacity-100
            transition-all duration-300 z-20"
          >
            &lt;
          </button>

          {/* RIGHT BUTTON */}
          <button
            onClick={() => scroll("right")}
            className="absolute right-0 sm:-right-4 top-1/2 -translate-y-1/2
            bg-black/60 hover:bg-black text-white
            p-3 size-20 rounded-full opacity-0 group-hover:opacity-100
            transition-all duration-300 z-20"
          >
            &gt;
          </button>

          {/* SCROLL CONTAINER */}
          <div
            ref={mainScrollRef}
            className="w-full overflow-x-hidden whitespace-nowrap pb-6"
          >
            <div className="inline-flex gap-4 sm:gap-6 px-2 sm:px-4">

              {reviews.map((review, index) => (
                <div
                  key={index}
                  onClick={() => setSelectedReview(review)}
                  className="flex flex-col justify-between rounded-2xl cursor-pointer overflow-hidden border-2
                  max-w-[280px] sm:max-w-[240px] md:max-w-[260px]
                  text-white transition-all duration-300 ease-in-out hover:scale-[1.02]"
                >
                  {/* Image */}
                  <div className="w-full h-48 overflow-hidden bg-black">
                    <img
                      src={review?.imageUrl || "/fallback.png"}
                      alt={review?.name}
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                      onError={(e) => (e.target.src = "/fallback.png")}
                    />
                  </div>

                  {/* Content */}
                  <div className="p-5 flex flex-col gap-2 text-left">
                    <h3 className="text-lg font-semibold">
                      {review?.name}
                    </h3>

                    <p className="text-sm opacity-80">
                      {review?.position}
                    </p>

                    <p className="text-sm leading-snug line-clamp-3">
                      {review?.review}
                    </p>

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

      {/* ================= MODAL ================= */}
      {selectedReview && (
        <div
          className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          onClick={() => setSelectedReview(null)}
        >
          <div
            className="bg-zinc-900 max-w-lg w-full rounded-2xl p-6 relative animate-fadeIn"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setSelectedReview(null)}
              className="absolute top-4 right-4 text-white hover:text-red-400 transition"
            >
              <X size={22} />
            </button>

            <img
              src={selectedReview?.imageUrl || "/fallback.png"}
              alt={selectedReview?.name}
              className="w-full h-56 object-cover rounded-lg mb-4"
            />

            <h3 className="text-2xl font-bold mb-1">
              {selectedReview?.name}
            </h3>

            <p className="text-sm opacity-70 mb-3">
              {selectedReview?.position}
            </p>

            <div className="flex gap-1 mb-4">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  size={20}
                  fill={star <= selectedReview?.rating ? "gold" : "none"}
                  stroke={star <= selectedReview?.rating ? "gold" : "white"}
                />
              ))}
            </div>

            <p className="text-sm leading-relaxed">
              {selectedReview?.review}
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default SuccessReviews;
