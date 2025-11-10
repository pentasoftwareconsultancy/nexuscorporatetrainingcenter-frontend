import React, { useRef, useState } from "react";
import html2canvas from "html2canvas";
import medalImage from "../../assets/vaishnavi/medal.png";
import logoImage from "../../assets/vaishnavi/logo.png";
// import backgroundImage from "../../assets/vaishnavi/certbg.png";

export default function certification() {
  const [studentName] = useState("Vaishnavi Gopale");
  const [courseName] = useState("Full Stack Python");
  const certRef = useRef(null);

  const downloadCertificate = async () => {
    const canvas = await html2canvas(certRef.current, {
      scale: 3,
      useCORS: true,
      allowTaint: true,
    });
    const link = document.createElement("a");
    link.download = `${studentName.replace(/\s+/g, "_")}_Certificate.png`;
    link.href = canvas.toDataURL("image/png");
    link.click();
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-amber-50 flex flex-col items-center justify-center relative py-10 px-4">
      {/* Title */}
      <h1 className="text-black text-2xl sm:text-3xl font-semibold mb-6 text-center">
        Certificate
      </h1>

      {/* Download Button */}
      <button
        onClick={downloadCertificate}
        className="absolute top-6 right-6 px-5 py-2 bg-gradient-to-r from-amber-300 to-yellow-400 text-black rounded-full shadow font-medium hover:brightness-105 transition"
      >
        Download Certificate
      </button>

      {/* Certificate Container */}
      <div
        ref={certRef}
        className="relative w-full max-w-[900px] aspect-[1.45/1] overflow-hidden rounded-lg shadow-2xl flex flex-col items-center justify-center"
      >
        {/* 🌸 Full Background Image */}
        <img
          src={backgroundImage}
          alt="Floral Background"
          className="absolute inset-0 w-full h-full object-cover object-center z-0"
          crossOrigin="anonymous"
        />

        {/* Optional Gold Border */}
        {/* <img
          src="/assets/gold-border.png"
          alt="Gold Border"
          className="absolute right-0 top-0 h-full object-cover pointer-events-none z-5"
          crossOrigin="anonymous"
        /> */}

        {/* Certificate Content */}
        <div className="relative z-10 text-center px-6 sm:px-10 md:px-16 pt-10 sm:pt-16 flex flex-col items-center justify-center w-full bg-white/70 backdrop-blur-sm rounded-lg">
          {/* Logo */}
          <div className="w-full flex justify-start items-center mb-4 sm:mb-6">
            <img
              src={logoImage}
              alt="Logo"
              className="w-16 sm:w-20 md:w-24 ml-15 sm:ml-4 mt-10"
              crossOrigin="anonymous"
            />
          </div>

          <p className="text-gray-800 text-sm mb-2 font-[Georgia]">
            Nexus Corporate Training Center LLP
          </p>

          <h2
            className="text-[32px] sm:text-[40px] md:text-[44px] text-gray-900"
            style={{ fontFamily: "'Great Vibes', cursive" }}
          >
            Certificate of Completion
          </h2>

          <p className="mt-3 text-[14px] sm:text-[15px] italic text-gray-700 font-[Georgia]">
            This certificate is proudly presented to
          </p>

          <h1
            className="mt-2 text-[32px] sm:text-[40px] md:text-[46px] text-gray-900 font-medium tracking-wide border-b border-yellow-600 inline-block pb-1"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            {studentName}
          </h1>

          <p className="mt-4 text-[14px] sm:text-[16px] text-gray-700 italic font-[Georgia]">
            for successfully completing the certification course in
          </p>
          <p className="text-[16px] sm:text-[18px] font-semibold text-gray-800 italic font-[Georgia]">
            {courseName}
          </p>

          {/* 🏅 Medal Image */}
          <div className="mt-6 sm:mt-8 mb-4">
            <img
              src={medalImage}
              alt="Achievement Medal"
              className="w-14 sm:w-16 md:w-20 h-auto mx-auto opacity-95 drop-shadow-lg"
              crossOrigin="anonymous"
            />
          </div>

          {/* Footer: Trainer and CEO */}
          <div className="flex flex-col sm:flex-row justify-between items-center sm:items-end mt-8 sm:mt-10 px-6 sm:px-12 w-full gap-6 sm:gap-0">
            <div className="text-center sm:text-left">
              <p className="font-semibold text-[14px] sm:text-[15px] text-gray-800 font-[Georgia] mb-25">
                Sanjay Wadatkar
              </p>
              <p className="text-[12px] sm:text-[13px] italic text-gray-600 font-[Georgia] o">
                CEO
              </p>
            </div>

            <div className="text-center sm:text-right">
              <p className="font-semibold text-[14px] sm:text-[15px] text-gray-800 font-[Georgia] mb-25">
                Aditi Khade
              </p>
              <p className="text-[12px] sm:text-[13px] italic text-gray-600 font-[Georgia]">
                Trainer
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
