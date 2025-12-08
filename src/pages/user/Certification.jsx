// import React from "react";
// import jsPDF from "jspdf";
// import img from "../../assets/saidas/Certificate.jpeg";
// import certificateData from "../../assets/saidas/CertificateData.json";

// const Certification = () => {
//   // DOWNLOAD PDF DIRECT FROM BACKGROUND + TEXT
//   const handleDownloadPDF = () => {
//     const pdf = new jsPDF("landscape", "mm", "a4");

//     const pageWidth = pdf.internal.pageSize.getWidth(); // ~297mm
//     const pageHeight = pdf.internal.pageSize.getHeight(); // ~210mm

//     const background = new Image();
//     background.src = img;

//     background.onload = () => {
//       pdf.addImage(background, "JPEG", 0, 0, pageWidth, pageHeight);

//       // ============================
//       // NAME (28% TOP) => pageHeight * 0.28
//       // ============================
//       pdf.setFont("Times", "Bold");
//       pdf.setFontSize(36);
//       pdf.setTextColor(0, 0, 0);
//       pdf.text(
//         certificateData.defaultName,
//         pageWidth / 2, // center horizontally
//         pageHeight * 0.28 + 15, // match preview top position
//         { align: "center" }
//       );

//       // ============================
//       // COURSE NAME (49.4% TOP, 47% LEFT)
//       // ============================
//       pdf.setFont("Arial", "Bold");
//       pdf.setFontSize(18);
//       pdf.text(
//         certificateData.courseName,
//         pageWidth * 0.47, // match preview left
//         pageHeight * 0.494 + 8 // match preview top
//       );

//       // ============================
//       // SIGN LEFT
//       // ============================
//       pdf.setFontSize(12);
//       pdf.text(certificateData.signLeft, pageWidth * 0.22, pageHeight * 0.78);
//       pdf.setFontSize(10);
//       pdf.text(
//         certificateData.signLeftRole,
//         pageWidth * 0.22,
//         pageHeight * 0.82
//       );

//       // ============================
//       // SIGN RIGHT
//       // ============================
//       pdf.setFontSize(12);
//       pdf.text(certificateData.signRight, pageWidth * 0.78, pageHeight * 0.78, {
//         align: "right",
//       });

//       pdf.setFontSize(10);
//       pdf.text(
//         certificateData.signRightRole,
//         pageWidth * 0.78,
//         pageHeight * 0.82,
//         { align: "right" }
//       );

//       pdf.save(`${certificateData.defaultName}.pdf`);
//     };
//   };

//   return (
//     <div className="min-h-screen flex flex-col items-center py-8 relative w-full">
//       {/* DOWNLOAD BUTTON */}
//       <button
//         onClick={handleDownloadPDF}
//         className="absolute top-5 right-10 px-5 py-2 bg-white text-black rounded-full shadow hover:bg-gray-200 transition"
//       >
//         Download PDF
//       </button>

//       <h1 className="text-2xl mb-4">Certificate</h1>

//       {/* PREVIEW */}
//       <div className="relative w-[900px] shadow-xl overflow-hidden">
//         <img
//           src={img}
//           alt="Certificate"
//           className="w-full h-full object-cover"
//         />

//         {/* NAME (Preview) */}
//         <div
//           className="absolute text-center"
//           style={{
//             top: "28%",
//             left: "50%",
//             transform: "translateX(-50%)",
//             fontSize: "48px",
//             fontFamily: "serif",
//             fontStyle: "semi-bold",
//           }}
//         >
//           {certificateData.defaultName}
//         </div>

//         {/* COURSE NAME (Preview) */}
//         <p
//           className="absolute font-bold whitespace-nowrap"
//           style={{
//             top: "49.4%",
//             left: "47%",
//             fontSize: "22px",
//             fontStyle: "semi-bold",
//           }}
//         >
//           {certificateData.courseName}
//         </p>
//       </div>
//     </div>
//   );
// };

// export default Certification;






import React from "react";
import jsPDF from "jspdf";
import img from "../../assets/saidas/Certificate.jpeg";
import certificateData from "../../assets/saidas/CertificateData.json";

const Certification = () => {
  // DOWNLOAD PDF DIRECT FROM BACKGROUND + TEXT (NO CHANGES)
  const handleDownloadPDF = () => {
    const pdf = new jsPDF("landscape", "mm", "a4");

    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();

    const background = new Image();
    background.src = img;

    background.onload = () => {
      pdf.addImage(background, "JPEG", 0, 0, pageWidth, pageHeight);

      // NAME
      pdf.setFont("Times", "Bold");
      pdf.setFontSize(36);
      pdf.setTextColor(0, 0, 0);
      pdf.text(
        certificateData.defaultName,
        pageWidth / 2,
        pageHeight * 0.28 + 15,
        { align: "center" }
      );

      // COURSE NAME
      pdf.setFont("Arial", "Bold");
      pdf.setFontSize(18);
      pdf.text(
        certificateData.courseName,
        pageWidth * 0.47,
        pageHeight * 0.494 + 8
      );

      // SIGN LEFT
      pdf.setFontSize(12);
      pdf.text(certificateData.signLeft, pageWidth * 0.22, pageHeight * 0.78);
      pdf.setFontSize(10);
      pdf.text(
        certificateData.signLeftRole,
        pageWidth * 0.22,
        pageHeight * 0.82
      );

      // SIGN RIGHT
      pdf.setFontSize(12);
      pdf.text(certificateData.signRight, pageWidth * 0.78, pageHeight * 0.78, {
        align: "right",
      });

      pdf.setFontSize(10);
      pdf.text(
        certificateData.signRightRole,
        pageWidth * 0.78,
        pageHeight * 0.82,
        { align: "right" }
      );

      pdf.save(`${certificateData.defaultName}.pdf`);
    };
  };

  // RESPONSIVE PREVIEW UI
  return (
    <div className="min-h-screen flex flex-col items-center py-8 px-3 w-full relative">
      {/* DOWNLOAD BUTTON — responsive placed */}
      <button
        onClick={handleDownloadPDF}
        className="
          fixed bottom-5 right-5
          sm:absolute sm:top-5 sm:right-10 sm:bottom-auto
          px-4 py-2 bg-white text-black rounded-full shadow
          hover:bg-gray-200 transition text-sm sm:text-base z-50
        "
      >
        Download PDF
      </button>

      {/* TITLE */}
      <h1 className="text-xl sm:text-2xl mb-4 font-semibold text-center">
        Certificate
      </h1>

      {/* RESPONSIVE CERTIFICATE PREVIEW */}
      <div
        className="
          relative w-full max-w-[900px]
          aspect-[4/3]            /* Keeps ratio of certificate */
          shadow-xl overflow-hidden
        "
      >
        <img
          src={img}
          alt="Certificate"
          className="w-full h-full object-cover"
        />

        {/* NAME (Preview) */}
        <div
          className="
            absolute font-semibold text-center
            text-[18px] sm:text-[32px] md:text-[44px] lg:text-[48px]
          "
          style={{
            top: "28%",
            left: "50%",
            transform: "translateX(-50%)",
            fontFamily: "serif",
            color: "#000", // <-- ADDED
          }}
        >
          {certificateData.defaultName}
        </div>

        {/* COURSE NAME (Preview) */}
        <p
          className="
            absolute font-bold whitespace-nowrap
            text-[10px] sm:text-[14px] md:text-[18px] lg:text-[22px]
          "
          style={{
            top: "50%",
            left: "48.2%",
            transform: "translateX(-10%)",
            fontFamily: "Arial",
            color: "#000", // <-- ADDED
          }}
        >
          {certificateData.courseName}
        </p>
      </div>
    </div>
  );
};

export default Certification;

