import React from "react";
import Slider from "react-slick";
import CountUp from "react-countup";
import { motion } from "framer-motion";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// Import JSON data
import OurClientdata from "../../../assets/home/json/OurClientdata.json";
import CircleBackground from "../../common/CircleBackground";

// Import images dynamically
import client1 from "../../../assets/home/client1.png";
import client2 from "../../../assets/home/client2.png";
import client3 from "../../../assets/home/client3.png";
import client4 from "../../../assets/home/client4.png";
import client5 from "../../../assets/home/client5.png";
import client6 from "../../../assets/home/client6.png";
import client7 from "../../../assets/home/client7.png";
import client8 from "../../../assets/home/client8.png";
import client9 from "../../../assets/home/client9.png";
import client10 from "../../../assets/home/client10.png";
import client11 from "../../../assets/home/client11.png";
import client12 from "../../../assets/home/client12.png";
import client13 from "../../../assets/home/client13.png";
import client14 from "../../../assets/home/client14.png";
import client15 from "../../../assets/home/client15.png";
import client16 from "../../../assets/home/client16.png";
import client17 from "../../../assets/home/client17.png";
import client18 from "../../../assets/home/client18.png";
import client19 from "../../../assets/home/client19.png";
import client20 from "../../../assets/home/client20.png";
import client21 from "../../../assets/home/client21.png";

function OurClient() {
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

  const { clients } = OurClientdata;

  const sliderSettings = {
    dots: false,
    infinite: true,
    speed: 1300,
    autoplay: true,
    autoplaySpeed: 0,
    cssEase: "linear",
    centerMode: false,
    variableWidth: false,
    slidesToShow: 6,
    slidesToScroll: 1,
    arrows: false,
    pauseOnHover: false,
    swipeToSlide: true,
    draggable: true,
    responsive: [
      { breakpoint: 1536, settings: { slidesToShow: 6, speed: 1100 } },
      { breakpoint: 1280, settings: { slidesToShow: 5, speed: 900 } },
      { breakpoint: 1024, settings: { slidesToShow: 4, speed: 600 } },
      { breakpoint: 768, settings: { slidesToShow: 3, speed: 500 } },
      { breakpoint: 480, settings: { slidesToShow: 2, speed: 400 } },
      { breakpoint: 360, settings: { slidesToShow: 1, speed: 300 } },
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
    <div className="relative w-full text-white overflow-hidden py-10 sm:py-16">
      {/* Circle backgrounds hidden on small screens */}
      <div
        className="absolute z-0
          w-[780px] h-[780px]  /* size of the circle */
          -top-[290px] -right-[300px]  /* move half of the circle outside */
          sm:w-[720px] sm:h-[720px] sm:-bottom-[160px] sm:-right-[160px]
          md:w-[880px] md:h-[880px] md:-bottom-[150px] md:-left-[450px]
          pointer-events-none
          overflow-hidden"
      >
        <CircleBackground />
      </div>

      {/* Clients Section */}
      <section className="relative z-10 w-full  mx-auto px-3 md:px-10">
        <h2 className=" text-left font-semibold text-2xl sm:text-3xl lg:text-4xl mb-6 tracking-tight">
          Our Clients
        </h2>
        <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-[#c0bbbb]/40 to-transparent my-6"></div>
        <div className="relative [mask-image:_linear-gradient(to_right,transparent_0%,white_15%,white_85%,transparent_100%)]">
          <Slider {...sliderSettings}>
            {clients.map((client, idx) => (
              <div key={idx} className="px-2 my-2">
                <div className="flex items-center justify-center h-20 sm:h-24 p-2">
                  <img
                    src={imageMap[client.src]}
                    alt={client.name}
                    className="
                      max-w-[120px] 
                      max-h-[60px]
                      w-auto
                      h-full
                      object-contain 
                      mx-auto 
                      grayscale hover:grayscale-0 
                      transition-all duration-300
                      hover:scale-110 hover:drop-shadow-[0_0_15px_rgba(255,255,255,0.4)]
                      cursor-grab active:cursor-grabbing
                    "
                  />
                </div>
              </div>
            ))}
          </Slider>
        </div>
        <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-[#c0bbbb]/40 to-transparent my-6"></div>
      </section>

      {/* <div className="w-full border-t border-[#c0bbbb] my-6"></div> */}

      {/* Metrics Section */}
      <section className="z-10 w-full  mx-auto px-3 md:px-12">
        <div className="flex flex-col lg:flex-row lg:items-start lg:gap-8">
          {/* Left */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.8 }}
            className="w-full lg:w-1/3 mb-8 lg:mb-0"
          >
            <h2 className="font-semibold text-2xl sm:text-3xl lg:text-4xl mb-4 leading-snug">
              We Build Success <br /> by the Numbers
            </h2>
            <p
              className="text-base sm:text-lg text-gray-300 leading-normal 
                max-w-full lg:max-w-md text-justify"
            >
              Our impact is measured not just in satisfied clients, but in
              tangible results. We are dedicated to creating measurable
              differences, transforming potential into performance and ambition
              into achievement.
            </p>
          </motion.div>
          {/* Right */}
          <div className="lg:w-2/3">
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
              {metrics.map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: false, amount: 0.1 }}
                  transition={{
                    type: "spring",
                    stiffness: 120,
                    damping: 18,
                    delay: idx * 0.08,
                  }}
                  whileHover={{
                    y: -6,
                    backgroundColor: "rgba(255, 255, 255, 0.06)",
                    borderColor: "rgba(255, 106, 0, 0.35)",
                    boxShadow: "0 15px 35px -10px rgba(255, 106, 0, 0.15)"
                  }}
                  className="flex flex-col items-center justify-center text-center bg-white/[0.02] backdrop-blur-md border border-white/[0.05] rounded-2xl p-5 select-none cursor-default"
                >
                  <span className="block font-bold text-2xl sm:text-3xl lg:text-4xl xl:text-5xl mb-1 text-transparent bg-clip-text bg-gradient-to-br from-white via-white to-gray-400">
                    <CountUp
                      end={item.value}
                      duration={2}
                      suffix={item.suffix}
                      enableScrollSpy={true}
                      scrollSpyOnce={false}
                    />
                  </span>
                  <span className="block text-xs sm:text-sm font-medium text-gray-300 tracking-tight leading-snug">
                    {item.label}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>
      <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-[#c0bbbb]/40 to-transparent my-6"></div>
    </div>
  );
}

export default OurClient;
