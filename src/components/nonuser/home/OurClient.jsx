import React, { useState } from "react";
import Slider from "react-slick";
import CountUp from "react-countup";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// Import JSON data
import OurClientdata from "../../../assets/sneha/json/OurClientdata.json";

// Import images dynamically
import client1 from "../../../assets/sneha/client1.png";
import client2 from "../../../assets/sneha/client2.png";
import client3 from "../../../assets/sneha/client3.png";
import client4 from "../../../assets/sneha/client4.png";
import client5 from "../../../assets/sneha/client5.png";
import client6 from "../../../assets/sneha/client6.png";
import client7 from "../../../assets/sneha/client7.png";
import client8 from "../../../assets/sneha/client8.png";
import client9 from "../../../assets/sneha/client9.png";
import client10 from "../../../assets/sneha/client10.png";
import client11 from "../../../assets/sneha/client11.png";
import client12 from "../../../assets/sneha/client12.png";
import client13 from "../../../assets/sneha/client13.png";
import client14 from "../../../assets/sneha/client14.png";
import client15 from "../../../assets/sneha/client15.png";
import client16 from "../../../assets/sneha/client16.png";
import client17 from "../../../assets/sneha/client17.png";
import client18 from "../../../assets/sneha/client18.png";
import client19 from "../../../assets/sneha/client19.png";
import client20 from "../../../assets/sneha/client20.png";
import client21 from "../../../assets/sneha/client21.png";

function OurClient() {
  const [isPaused, setIsPaused] = useState(false);

  // Map image filenames to imports
  const imageMap = {
    "client1.png": client1,
    "client2.png": client2,
    "client3.png": client3,
    "client4.png": client4,
    "client5.png": client5,
    "client6.png": client6,
    "client7.png": client7,
    "client8.png": client8,
    "client9.png": client9,
    "client10.png": client10,
    "client11.png": client11,
    "client12.png": client12,
    "client13.png": client13,
    "client14.png": client14,
    "client15.png": client15,
    "client16.png": client16,
    "client17.png": client17,
    "client18.png": client18,
    "client19.png": client19,
    "client20.png": client20,
    "client21.png": client21,
  };

  const { clients, metrics } = OurClientdata;

  const sliderSettings = {
    dots: false,
    infinite: true,
    speed: 3000,
    autoplay: !isPaused,
    autoplaySpeed: 0,
    cssEase: "linear",
    slidesToShow: 6,
    slidesToScroll: 1,
    arrows: false,
    pauseOnHover: false,
    responsive: [
      { breakpoint: 1536, settings: { slidesToShow: 6, speed: 2500 } },
      { breakpoint: 1280, settings: { slidesToShow: 5, speed: 2000 } },
      { breakpoint: 1024, settings: { slidesToShow: 4, speed: 1700 } },
      { breakpoint: 768, settings: { slidesToShow: 3, speed: 1400 } },
      { breakpoint: 480, settings: { slidesToShow: 2, speed: 900 } },
      { breakpoint: 360, settings: { slidesToShow: 1, speed: 800 } },
    ],
  };

  return (
    <div className="py-4 lg:py-4 px-12 sm:px-12 md:px-12 text-white mt-10">
      {/* Clients Section */}
      <div className="mb-10 lg:mb-14 ">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-left mb-6 lg:mb-8 mr-6">
          Our Clients
        </h2>
        {/* Divider Line */}
        <div
          className="w-full h-[1px] sm:h-[2px] my-8 lg:my-12"
          style={{
            background:
              "linear-gradient(90deg, #030e4e 0%, #b9b4b4 50%, #030e4e 100%)",
          }}
        />
        <div className="relative">
          <Slider {...sliderSettings}>
            {clients.map((client, idx) => (
              <div key={idx} className="px-2">
                <div className="flex items-center justify-center p-2 sm:p-4">
                  <img
                    src={imageMap[client.src]}
                    alt={client.name}
                    className="h-10 sm:h-12 md:h-14 lg:h-16 object-contain grayscale hover:grayscale-0 transition-all duration-300 mx-auto cursor-pointer"
                    style={{
                      filter: "brightness(0) invert(1)",
                      opacity: 0.9,
                      maxWidth: "100%",
                    }}
                    onClick={() => setIsPaused(true)}
                  />
                </div>
              </div>
            ))}
          </Slider>
        </div>
        {isPaused && (
          <div className="text-center mt-4">
            <button
              className="px-4 py-2 bg-white text-black rounded-lg hover:bg-gray-200 transition-colors duration-200 text-sm sm:text-base"
              onClick={() => setIsPaused(false)}
            >
              Resume Scrolling
            </button>
          </div>
        )}
      </div>

      {/* Divider Line */}
      <div
        className="w-full h-[1px] sm:h-[2px] my-8 lg:my-12"
        style={{
          background:
            "linear-gradient(90deg, #030e4e 0%, #b9b4b4 50%, #030e4e 100%)",
        }}
      />

      {/* Metrics Section */}
      <div className="mb-10 lg:mb-14 max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
          {/* Left */}
          <div className="lg:w-1/2">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 lg:mb-6 text-center lg:text-left">
              We Build Success by the Numbers
            </h2>
            <p className="text-base sm:text-lg lg:text-xl text-gray-300 mb-6 lg:mb-0 text-center lg:text-left leading-relaxed">
              Our impact is measured not just in satisfied clients, but in
              tangible results. We create measurable differences, turning
              potential into performance and ambition into achievement.
            </p>
          </div>

          {/* Right */}
          <div className="lg:w-1/2">
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
              {metrics.map((item, index) => (
                <div
                  key={index}
                  className="text-center p-4 sm:p-6 rounded-lg bg-white/5 hover:bg-white/10 transition-all duration-300"
                >
                  <div className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold mb-1 sm:mb-2 text-white">
                    <CountUp
                      end={item.value}
                      duration={2}
                      suffix={
                        item.value >= 1000
                          ? "+"
                          : [
                              "Years of Experience",
                              "Courses",
                              "Collab Colleges",
                            ].includes(item.label)
                          ? "+"
                          : ""
                      }
                    />
                  </div>
                  <div className="text-xs sm:text-sm lg:text-base font-medium text-gray-300 leading-tight">
                    {item.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Divider Line */}
      <div
        className="w-full h-[1px] sm:h-[2px] my-8 lg:my-12"
        style={{
          background:
            "linear-gradient(90deg, #030e4e 0%, #b9b4b4 50%, #030e4e 100%)",
        }}
      />
    </div>
  );
}

export default OurClient;
