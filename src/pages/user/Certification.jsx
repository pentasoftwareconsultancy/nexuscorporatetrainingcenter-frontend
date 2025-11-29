
import React from "react";
import img from "../../assets/saidas/Certificate.jpeg"; // your certificate image path

const Certification = () => {
  return (
    <div className="min-h-screen bg-black flex flex-col items-center py-8 relative w-full">
      {/* Download Button - Top Right */}
      <button
        className="absolute top-5 right-10 px-5 py-2 bg-white text-black rounded-full shadow hover:bg-gray-200 transition"
        onClick={() => {
          const link = document.createElement("a");
          link.href = img;
          link.download = "Certificate.jpeg";
          link.click();
        }}
      >
        Download Certificate
      </button>

      {/* Page Title */}
      <h1 className="text-white text-lg mb-4">Certificate</h1>

      {/* Certificate Image */}
      <div className="relative w-[900px] rounded-xl shadow-2xl overflow-hidden">
        <img
          src={img}
          alt="Certificate"
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
};

export default Certification;
