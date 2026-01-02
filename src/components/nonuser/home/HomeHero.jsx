import React from "react";
import { ArrowUpRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../../core/constants/routes.constant";
import CircleBackground from "../../common/CircleBackground";
import Button from "../../common/Button";

// 🔥 GSAP imports
import gsap from "gsap";

export default function HomeHero() {
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = React.useState(0);

  // 🔥 This ref is for animated slogan text
  const textRef = React.useRef(null);

  // Rotate every 3 seconds
  React.useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % sloganPhrases.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const sloganPhrases = [
    "India's No. 1 Corporate Training Center",
    "Best Software training institute in Pune",
    "No 1 Corporate Training Center for IT Courses In Pune",
    "US Billing & Insurance Traning center in pune",
  ];

  // 🔥 GSAP ANIMATION ON TEXT CHANGE
  React.useEffect(() => {
    if (!textRef.current) return;

    const element = textRef.current;
    const words = sloganPhrases[currentIndex].split(" ");

    element.innerHTML = "";

    words.forEach((word) => {
      const span = document.createElement("span");
      span.textContent = word + " ";
      span.style.display = "inline-block";
      element.appendChild(span);
    });

    const spans = element.querySelectorAll("span");

    gsap.fromTo(
      spans,
      { y: 30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.7,
        stagger: 0.1,
        ease: "power3.out",
      }
    );
  }, [currentIndex]);

  return (
    <div className="relative font-sora overflow-x-hidden w-full min-h-screen flex flex-col md:flex-row justify-between items-center px-4 sm:px-8 md:px-12 lg:px-12 text-one overflow-hidden">
      <div
        className="absolute z-0
          w-[800px] h-[800px]  /* size of the circle */
          -bottom-[290px] -right-[290px]  /* move half of the circle outside */
          sm:w-[720px] sm:h-[720px] sm:-bottom-[160px] sm:-right-[160px]
          md:w-[880px] md:h-[880px] md:-bottom-[150px] md:-left-[450px]
          pointer-events-none
          overflow-hidden"
      >
        <CircleBackground />
      </div>

      <div className="absolute inset-0 flex items-center justify-center pointer-events-none mb-50 ">
        {/* MAIN X */}
        <div className="flex justify-center items-center">
          <h1
            className="
              relative w-full 
              xl:text-[300px] md:text-9xl text-5xl 
              sm:tracking-[17px] tracking-[10px] 
              uppercase text-center 
              leading-[0.70em] outline-none 
              animate-dimlight box-reflect flex items-center justify-center
            "
          >
            <span className="font-playfair">NE</span>
            <span className="text-5xl pt-1">
              <svg width="300" height="300" viewBox="0 0 40 34" fill="none">
                <path
                  d="M31.5408 0.000221879L39.5234 0.00080831L34.5562 2.77579C33.3436 3.45323 32.2854 4.37587 31.4491 5.4849L12.364 30.7934C11.2302 32.2968 9.45642 33.1808 7.57341 33.1808H-0.000190735L5.03663 30.275C6.22264 29.5907 7.25551 28.6702 8.07121 27.5704L26.7213 2.42583C27.8531 0.899828 29.6409 8.23028e-05 31.5408 0.000221879Z"
                  fill="#FF6A00"
                />
                <path
                  d="M7.98262 0.000221879L0 0.00080831L4.96721 2.77579C6.17983 3.45323 7.23802 4.37587 8.07433 5.4849L27.1595 30.7934C28.2932 32.2968 30.067 33.1808 31.95 33.1808H39.5236L34.4868 30.275C33.3008 29.5907 32.2679 28.6702 31.4522 27.5704L12.8022 2.42583C11.6703 0.899828 9.88257 8.23028e-05 7.98262 0.000221879Z"
                  fill="#FF6A00"
                />
              </svg>
            </span>
            <span className="font-playfair">US</span>
          </h1>

          <style>
            {`
              @keyframes dimlight {
                /* OFF STATE — soft light (#FFF3EA) */
                0%, 18%, 20%, 50.1%, 60%, 65.1%, 80%, 90.1%, 92% {
                  color: #FFF3EA;
                  box-shadow: none;
                }
            
                /* ON STATE — bright glow (#FF6A00) */
                18.1%, 20.1%, 30%, 50%, 60.1%, 65%, 80.1%, 90%, 92.1%, 100% {
                  color: #FF6A00;
                  text-shadow: 0 0 10px #FF6A00;
                }
              }
            
              .animate-dimlight {
                animation: dimlight 15s infinite;
              }
            
              .box-reflect {
                -webkit-box-reflect: below 1px linear-gradient(transparent, #0004);
              }
            `}
            {`
              .fade-text {
                transition: opacity 0.8s ease-in-out;
              }
            `}
            {`
              .inline-char {
                display: inline-block;
                white-space: nowrap;
              }
            `}
          </style>
        </div>
      </div>

      <div className="flex justify-center w-full h-full z-20 ">
        <div className="absolute inset-0 bg-three/5 backdrop-blur-sm rounded-2xl pointer-events-none w-full h-full"></div>
        {/* 🔸 Left Section (slightly down) */}
        <div className="relative z-10 flex flex-col justify-center md:justify-end w-full md:w-1/2 pb-6 md:pb-1 translate-y-10">
          <div className="p-4 sm:p-6 md:p-10 rounded-2xl space-y-6 text-center md:text-left">
            <div className="max-w-3xl">
              <h1
                key={currentIndex} // 🔥 Key to re-render on index change
                ref={textRef} // 🔥 GSAP target
                className="
                  text-4xl sm:text-5xl lg:text-6xl 
                  font-medium leading-snug 
                "
              >
                {sloganPhrases[currentIndex]}
              </h1>
            </div>
            <Button
              text="Enroll Now"
              onClick={() => navigate(ROUTES.CONTACT)}
            />
          </div>
        </div>

        {/* 🔸 Right Section (slightly up) */}
        <div className="relative z-10 flex flex-col justify-center md:justify-start items-center md:items-end w-full md:w-1/2 text-center md:text-right space-y-6 pt-1 md:pt-1 -translate-y-30 px-4 sm:px-8">
          <div className="max-w-lg">
            <h2
              className="
              max-w-96
              font-clash 
              text-3xl sm:text-4xl lg:text-5xl 
              font-light leading-tight 
              text-white mb-4
              relative mx-auto text-center 
              whitespace-normal 
              overflow-hidden 
              "
              style={{
                animation:
                  "typing 4s steps(40, end) infinite, blink .75s step-end infinite",
              }}
            >
              <style>
                {`
                  @keyframes typing {
                    0% { clip-path: inset(0 100% 0 0); }
                    50% { clip-path: inset(0 0 0 0); }
                    80% { clip-path: inset(0 0 0 0); }
                    100% { clip-path: inset(0 100% 0 0); }
                  }

                  @keyframes blink {
                    0%, 50% { border-right-color: rgba(255,255,255,0.75); }
                    51%, 100% { border-right-color: transparent; }
                    }
                    `}
              </style>

              <span className="border-r-2 border-one pr-1 inline-block">
                Your Growth Our Expertise
              </span>
            </h2>
            <p className="text-gray-200 text-base sm:text-lg leading-relaxed text-justify md:text-right">
              We believe true business growth is built on the strength of your
              people. Our expertise lies in crafting bespoke training programs
              that don’t just teach skills — they transform teams. We partner
              with you to understand your unique challenges, delivering proven
              solutions that drive measurable results and empower your workforce
              to achieve more.
            </p>
          </div>
        </div>
      </div>
      <div
        className="absolute z-0
        w-[780px] h-[780px]  /* size of the circle */
        -bottom-[290px] -right-[290px]  /* move half of the circle outside */
        sm:w-[720px] sm:h-[720px] sm:-bottom-[160px] sm:-right-[160px]
        md:w-[880px] md:h-[880px] md:-bottom-[90px] md:-right-[480px]
        pointer-events-none
        overflow-hidden
        "
      >
        <CircleBackground />
      </div>
    </div>
  );
}
