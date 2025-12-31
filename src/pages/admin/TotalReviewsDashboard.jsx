import React, { useEffect, useState } from "react";
import { Search } from "lucide-react";
import ApiService from "../../core/services/api.service";
import ServerUrl from "../../core/constants/serverURL.constant";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../core/constants/routes.constant";

export default function TotalReviewsDashboard() {
  const api = new ApiService();

  const [reviews, setReviews] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const res = await api.apiget(`${ServerUrl.API_GET_REVIEWS}`);
        console.log("Reviews Data:", res.data);

        // FIX HERE 👇
        setReviews(res?.data?.data || []);
      } catch (err) {
        console.error("Reviews Fetch Failed:", err);
      }
    };

    fetchReviews();
  }, []);

  const filteredReviews = reviews.filter((r) =>
    (r?.name || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
    (r?.position || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
    (r?.review || "").toLowerCase().includes(searchQuery.toLowerCase())
  );

  const trimReview = (text = "") => {
    const words = text.split(" ");
    if (words.length <= 3) return text;
    return words.slice(0, 3).join(" ") + " ...";
  };

  return (
    <div className="min-h-screen text-white font-sora p-4 md:p-10">

      <h2 className="text-xl md:text-2xl font-semibold pb-5">
        Total Reviews ({filteredReviews.length})
      </h2>

      {/* SEARCH */}
      <div className="mt-6 relative">
        <Search className="absolute left-4 top-3 text-gray-400" size={20} />
        <input
          type="text"
          placeholder="Search by name, position, review text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full border border-white rounded-full py-3 pl-12 pr-5 
          outline-none focus:ring-2 focus:ring-orange-400 transition bg-black"
        />
      </div>

      {/* HEADERS */}
      <div className="mt-6 hidden md:grid grid-cols-5 gap-4 font-bold">
        <h2>Image</h2>
        <h2>Name</h2>
        <h2>Position</h2>
        <h2>Rating</h2>
        <h2>Review</h2>
      </div>

      {/* LIST */}
      <div className="flex flex-col gap-4 mt-4">
        {filteredReviews.map((r, index) => (
          <div
            key={index}
            className="border border-white rounded-xl p-4 hover:bg-[#222] transition
            grid grid-cols-1 md:grid-cols-5 gap-4 items-center overflow-x-hidden"
            onClick={() => navigate(ROUTES.ADMIN_REVIEW_EDIT.replace(":id", r.id))}
          >
            {/* IMAGE */}
            <img
              src={r.imageUrl}
              alt={r.name}
              className="w-14 h-14 rounded-full object-cover border"
            />

            {/* NAME */}
            <p>{r.name}</p>

            {/* POSITION */}
            <p>{r.position}</p>

            {/* RATING */}
            <p>{"⭐".repeat(Number(r.rating) || 0)}</p>

            {/* REVIEW - MAX 3 WORDS */}
            <p>{trimReview(r.review)}</p>
          </div>
        ))}

        {filteredReviews.length === 0 && (
          <p className="text-center text-gray-400 mt-4">
            No reviews found
          </p>
        )}
      </div>
      <button
        onClick={() => navigate(ROUTES.ADMIN_REVIEW_ADD) }
        className="fixed right-10 bottom-10 w-14 h-14 bg-one text-black text-3xl rounded-full"
      >
        +
      </button>
    </div>
  );
}
