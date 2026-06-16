import React, { useEffect, useRef, useState } from "react";
import ApiService from "../../core/services/api.service";
import ServerUrl from "../../core/constants/serverURL.constant";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const AVATAR_COLORS = [
  "#FF6A00", "#6366f1", "#10b981", "#f59e0b",
  "#ef4444", "#3b82f6", "#8b5cf6", "#ec4899",
];

const DEFAULT_REVIEWS = [
  {
    id: "db-2",
    name: "Ajinkya Uday Sasne",
    position: "Full Stack Development",
    review: "Completed my Full Stack Java development training here and had a great experience. The training was practical, well-structured, and focused on real-world coding skills. Trainers were knowledgeable.",
    imageUrl: "https://res.cloudinary.com/dscncrxmu/image/upload/v1770896938/nexus/googleReviews/uydxsqgkocrhbqnuuj28.png",
    rating: 5
  },
  {
    id: "db-7",
    name: "Tarushi Dusane",
    position: "MERN Stack Developer",
    review: "Good teachers , learning concept is very easy. Had fun learning new tech.",
    imageUrl: "https://res.cloudinary.com/dscncrxmu/image/upload/v1774000927/nexus/googleReviews/zwnklvbvorlo7ftmk3s1.jpg",
    rating: 5
  },
  {
    id: "db-8",
    name: "Vaishnavi Gopale",
    position: "MERN Stack Developer",
    review: "Great learning experience at Nexus CTC. The MERN stack course is practical, easy to understand, and very useful for real-world development.",
    imageUrl: "https://res.cloudinary.com/dscncrxmu/image/upload/v1774001611/nexus/googleReviews/zjn6qgjf1rn62iomfo2l.jpg",
    rating: 5
  },
  {
    id: "db-9",
    name: "Prathamesh Bhavsar",
    position: "Java Developer",
    review: "It was good class. And staff was also good and co-operative.",
    imageUrl: "https://res.cloudinary.com/dscncrxmu/image/upload/v1774001789/nexus/googleReviews/i6nyjhlhacm3s7gi5jos.jpg",
    rating: 3
  },
  {
    id: "db-10",
    name: "Sneha Shinde",
    position: "MERN Stack Developer",
    review: "Nexus CTC provides a solid foundation in MERN stack development with a strong focus on hands-on learning. The trainers are experienced, and the course is designed to make you industry-ready.",
    imageUrl: "https://res.cloudinary.com/dscncrxmu/image/upload/v1774001917/nexus/googleReviews/o5hyk8h8lf3cr62tve7l.jpg",
    rating: 5
  },
  {
    id: "db-11",
    name: "Priti Tole",
    position: "MERN Stack Developer",
    review: "I had a great experience learning the MERN stack at Nexus CTC. The course structure was well-organized and focused on practical, real-world development rather than just theory.",
    imageUrl: "https://res.cloudinary.com/dscncrxmu/image/upload/v1774002182/nexus/googleReviews/xvggvv7fheggpzg0jk7y.jpg",
    rating: 4
  }
];

const getInitials = (name = "") =>
  name.split(" ").slice(0, 2).map((w) => w[0]?.toUpperCase()).join("");

const SuccessReviews = () => {
  const api = new ApiService();
  const [reviews, setReviews] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(0);
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

        if (unique.length > 0) {
          setReviews(unique);
        } else {
          setReviews(DEFAULT_REVIEWS);
        }
      } catch {
        setReviews(DEFAULT_REVIEWS);
      }
    };
    fetch();
  }, []);

  const handlePrev = () => {
    if (reviews.length === 0) return;
    setDirection(-1);
    setActiveIndex((prev) => (prev === 0 ? reviews.length - 1 : prev - 1));
  };

  const handleNext = () => {
    if (reviews.length === 0) return;
    setDirection(1);
    setActiveIndex((prev) => (prev === reviews.length - 1 ? 0 : prev + 1));
  };

  if (reviews.length === 0) {
    return null;
  }

  const activeReview = reviews[activeIndex];
  const avatarColor = AVATAR_COLORS[activeIndex % AVATAR_COLORS.length];

  const slideVariants = {
    enter: (dir) => ({
      x: dir > 0 ? 80 : -80,
      opacity: 0,
      scale: 0.95
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.35,
        ease: "easeOut"
      }
    },
    exit: (dir) => ({
      x: dir < 0 ? 80 : -80,
      opacity: 0,
      scale: 0.95,
      transition: {
        duration: 0.3,
        ease: "easeIn"
      }
    })
  };

  return (
    <div className="relative w-full bg-gradient-to-br from-[#030e2d] via-[#020718] to-[#00020a] text-white py-16 md:py-24 px-6 sm:px-12 lg:px-24 overflow-hidden">
      {/* Background radial glows matching brand colors (orange and blue/purple) */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[350px] sm:w-[500px] h-[350px] sm:h-[500px] bg-[#ff6a00]/8 blur-[100px] sm:blur-[130px] rounded-full pointer-events-none z-0" />
      <div className="absolute left-[-10%] top-[-10%] w-[300px] h-[300px] bg-[#1254fa]/6 blur-[120px] rounded-full pointer-events-none z-0" />

      <div className="relative z-10 max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        {/* Left Column: Heading Block */}
        <div className="lg:col-span-5 flex flex-col justify-center text-left">
          <div className="inline-flex items-center bg-orange-500/10 text-[#FF6A00] border border-orange-500/20 px-5 py-2 rounded-full text-xs font-semibold tracking-wider uppercase mb-6 w-fit shadow-md">
            Our Testimonials
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-[44px] font-bold text-white leading-tight tracking-tight mb-5 font-sans">
            What Students Think and Say About Nexus
          </h2>
          <p className="text-sm sm:text-base text-gray-300/80 leading-relaxed font-light max-w-md">
            Real experiences, real voices – hear what students have to say about Nexus
          </p>
        </div>

        {/* Right Column: Card Stack & Slider */}
        <div className="lg:col-span-7 flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-8 w-full">
          {/* Left Navigation Arrow */}
          <button
            onClick={handlePrev}
            aria-label="Previous Testimonial"
            className="hidden sm:flex w-12 h-12 rounded-full border border-white/20 items-center justify-center text-white hover:text-[#ff6a00] hover:border-[#ff6a00] hover:bg-[#ff6a00]/10 transition-all duration-300 shrink-0 cursor-pointer focus:outline-none"
          >
            <ChevronLeft size={20} />
          </button>

          {/* Card Stack Container */}
          <div className="relative w-full max-w-[440px] min-h-[300px] sm:min-h-[320px] mx-auto z-10">
            {/* Layered background card matching the dark blue theme */}
            <div className="absolute inset-0 bg-[#071333]/90 border border-blue-500/10 rounded-[2rem] translate-x-5 translate-y-3 scale-[0.98] z-0 shadow-xl pointer-events-none transition-all duration-300" />

            <AnimatePresence initial={false} custom={direction} mode="wait">
              <motion.div
                key={activeIndex}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                className="relative z-10 w-full bg-white text-gray-900 rounded-[2rem] p-8 sm:p-10 shadow-2xl flex flex-col justify-between min-h-[300px] sm:min-h-[320px]"
              >
                <div>
                  <div className="flex justify-between items-start gap-4 mb-4">
                    {activeReview.rating ? (
                      <div className="flex gap-0.5 mt-1 shrink-0">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star
                            key={i}
                            size={14}
                            fill={i < activeReview.rating ? "#FF6A00" : "none"}
                            stroke={i < activeReview.rating ? "#FF6A00" : "#cbd5e1"}
                          />
                        ))}
                      </div>
                    ) : (
                      <div />
                    )}

                    <Quote size={24} className="text-[#FF6A00]/15 shrink-0 rotate-180" />
                  </div>

                  <p className="text-sm sm:text-base text-gray-600 leading-relaxed font-light line-clamp-5">
                    {activeReview.review}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-gray-100 flex items-center gap-4">
                  {activeReview.imageUrl ? (
                    <img
                      src={activeReview.imageUrl}
                      alt={activeReview.name}
                      className="w-11 h-11 rounded-full object-cover border border-gray-200"
                    />
                  ) : (
                    <div
                      className="w-11 h-11 rounded-full flex items-center justify-center text-sm font-bold shrink-0"
                      style={{ backgroundColor: `${avatarColor}20`, color: avatarColor, border: `1.5px solid ${avatarColor}40` }}
                    >
                      {getInitials(activeReview.name)}
                    </div>
                  )}
                  <div>
                    <h4 className="text-base sm:text-lg font-bold text-[#0c0c0c]">
                      {activeReview.name}
                    </h4>
                    <p className="text-xs sm:text-sm text-gray-500">
                      {activeReview.position}
                    </p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Right Navigation Arrow */}
          <button
            onClick={handleNext}
            aria-label="Next Testimonial"
            className="hidden sm:flex w-12 h-12 rounded-full border border-white/20 items-center justify-center text-white hover:text-[#ff6a00] hover:border-[#ff6a00] hover:bg-[#ff6a00]/10 transition-all duration-300 shrink-0 cursor-pointer focus:outline-none"
          >
            <ChevronRight size={20} />
          </button>

          {/* Mobile Navigation Arrows */}
          <div className="flex sm:hidden gap-5 mt-4">
            <button
              onClick={handlePrev}
              aria-label="Previous Testimonial"
              className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-white hover:text-[#ff6a00] hover:border-[#ff6a00] hover:bg-[#ff6a00]/10 transition-all duration-300 cursor-pointer focus:outline-none"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={handleNext}
              aria-label="Next Testimonial"
              className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-white hover:text-[#ff6a00] hover:border-[#ff6a00] hover:bg-[#ff6a00]/10 transition-all duration-300 cursor-pointer focus:outline-none"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuccessReviews;
