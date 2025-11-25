import React, { useState } from "react";
import Slider from "react-slick";
import CountUp from "react-countup";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// Import JSON data
import OurClientdata from "../../../assets/sneha/json/OurClientdata.json";
import CircleBackground from "../../common/CircleBackground";

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

  const imageMap = {
    "client1.png": client1, "client2.png": client2, "client3.png": client3,
    "client4.png": client4, "client5.png": client5, "client6.png": client6,
    "client7.png": client7, "client8.png": client8, "client9.png": client9,
    "client10.png": client10, "client11.png": client11, "client12.png": client12,
    "client13.png": client13, "client14.png": client14, "client15.png": client15,
    "client16.png": client16, "client17.png": client17, "client18.png": client18,
    "client19.png": client19, "client20.png": client20, "client21.png": client21,
  };

  const { clients } = OurClientdata;

  const sliderSettings = {
    dots: false,
    infinite: true,
    speed: 2600,
    autoplay: !isPaused,
    autoplaySpeed: 0,
    cssEase: "linear",
    slidesToShow: 6,
    slidesToScroll: 1,
    arrows: false,
    pauseOnHover: false,
    responsive: [
      { breakpoint: 1536, settings: { slidesToShow: 6, speed: 2200 } },
      { breakpoint: 1280, settings: { slidesToShow: 5, speed: 1800 } },
      { breakpoint: 1024, settings: { slidesToShow: 4, speed: 1200 } },
      { breakpoint: 768, settings: { slidesToShow: 3, speed: 1000 } },
      { breakpoint: 480, settings: { slidesToShow: 2, speed: 800 } },
      { breakpoint: 360, settings: { slidesToShow: 1, speed: 600 } },
    ],
  };

  const metrics = [
    { label: "Years of Experience", value: 15, suffix: "+" },
    { label: "Students Placed", value: 5, suffix: "K+" },
    { label: "Companies hire from us", value: 1, suffix: "K+" },
    { label: "Webinars", value: 150, suffix: "+" },
    { label: "Courses", value: 20, suffix: "+" },
    { label: "Faculty", value: 100, suffix: "+" },
    { label: "Collab Colleges", value: 600, suffix: "+" },
    { label: "Corporate Training", value: 100, suffix: "+" },
  ];

  return (
    <div className="relative w-screen  bg-gray-900 text-white overflow-x-hidden py-10 sm:py-16">
      {/* Circle backgrounds hidden on small screens */}
      <div className="absolute z-0 w-1/3 h-3/4 -translate-y-[320%] -translate-x-[210%] pointer-events-none hidden md:block">
        <CircleBackground />
      </div>
      <div className="absolute z-0 w-1/3 h-3/4 -translate-y-[340%] translate-x-[210%] pointer-events-none hidden md:block">
        <CircleBackground />
      </div>

      {/* Clients Section */}
      <section className="relative z-10 w-full  mx-auto px-3 md:px-10">
        <h2 className=" text-left font-semibold text-2xl sm:text-3xl lg:text-4xl mb-6 tracking-tight">
          Our Clients
        </h2>
      <div className=" w-full border-t border-[#c0bbbb] my-6"></div>
        <div className="relative">
          <Slider {...sliderSettings}>
            {clients.map((client, idx) => (
              <div key={idx} className="px-2 my-2">
                <div className="flex items-center justify-center h-14 sm:h-16">
                  <img
                    src={imageMap[client.src]}
                    alt={client.name}
                    className="h-9  lg:h-12 object-contain mx-auto grayscale hover:grayscale-0 transition-all duration-300"
                    style={{ maxWidth: "140px", filter: "brightness(1)", opacity: 1 }}
                    onClick={() => setIsPaused(true)}
                  />
                </div>
              </div>
            ))}
          </Slider>
        </div>
        {isPaused && (
          <div className="text-center mt-3">
            <button
              className="px-5 py-2 bg-white text-black rounded-md shadow hover:bg-gray-200 text-sm sm:text-base font-medium"
              onClick={() => setIsPaused(false)}
            >
              Resume Scrolling
            </button>
          </div>
        )}
              <div className="w-full border-t border-[#c0bbbb] my-6"></div>

      </section>

      {/* <div className="w-full border-t border-[#c0bbbb] my-6"></div> */}

      {/* Metrics Section */}
      <section className="z-10 w-full  mx-auto px-3 md:px-10">
        <div className="flex flex-col lg:flex-row lg:items-start lg:gap-8">
          {/* Left */}
          <div className="lg:w-1/3 mb-8 lg:mb-0">
            <h2 className="font-semibold text-2xl sm:text-3xl lg:text-4xl mb-4 leading-snug">
              We Build Success <br /> by the Numbers
            </h2>
            <p className="text-base sm:text-lg text-gray-300 leading-normal max-w-md">
              Our impact is measured not just in satisfied clients, but in tangible results. We are dedicated to creating measurable differences, transforming potential into performance and ambition into achievement.
            </p>
          </div>
          {/* Right */}
          <div className="lg:w-2/3">
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-x-8 gap-y-7">
              {metrics.map((item, idx) => (
                <div key={idx} className="text-center">
                  <span className="block font-bold text-2xl sm:text-3xl lg:text-4xl xl:text-5xl mb-2">
                    <CountUp end={item.value} duration={2} suffix={item.suffix} />
                  </span>
                  <span className="block text-sm sm:text-base font-medium text-gray-200 tracking-tight">
                    {item.label}
                  </span>
                </div>
              ))}
            </div>
            
          </div>
        </div>
      </section>
            <div className="w-full border-t border-[#c0bbbb] my-6"></div>

    </div>
  );
}

export default OurClient;
