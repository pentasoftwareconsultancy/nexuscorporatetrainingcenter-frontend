import React from "react";
import { useNavigate } from "react-router-dom";
import jsPDF from "jspdf";
import img from "../../assets/certification/Certificate.jpeg";
import ApiService from "../../core/services/api.service";
import ServerUrl from "../../core/constants/serverURL.constant";
import { ROUTES } from "../../core/constants/routes.constant";

const Certification = () => {
  const api = new ApiService();
  const navigate = useNavigate();
  const [certData, setCertData] = React.useState(null);

  const fetchCertificationData = async () => {
    try {
      const response = await api.apiget(ServerUrl.API_USER_CERTIFICATION);
      console.log("Certification Data:", response.data);

      if (
        response.data.success &&
        response.data.certified &&
        response.data.certified.length > 0
      ) {
        const cert = response.data.certified[0];

        // Redirect if passedTests !== 1
        if (cert.passedTests !== 1) {
          navigate(ROUTES.USER_APPITUDE);
          return;
        }

        setCertData(cert); // set dynamic API data
      }
    } catch (error) {
      console.error("Error fetching certification data:", error);
    }
  };

  React.useEffect(() => {
    fetchCertificationData();
  }, []);

  const handleDownloadPDF = () => {
    if (!certData) return;

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
      pdf.text(certData.userName || "", pageWidth / 2, pageHeight * 0.28 + 15, {
        align: "center",
      });

      // COURSE NAME / CATEGORY
      pdf.setFont("Arial", "Bold");
      pdf.setFontSize(18);
      pdf.text(
        certData.categoryName || "",
        pageWidth * 0.47,
        pageHeight * 0.494 + 8
      );

      // You can still add static signatures if needed
      pdf.setFontSize(12);
      pdf.text("Signature Left", pageWidth * 0.22, pageHeight * 0.78);
      pdf.setFontSize(10);
      pdf.text("Role Left", pageWidth * 0.22, pageHeight * 0.82);

      pdf.setFontSize(12);
      pdf.text("Signature Right", pageWidth * 0.78, pageHeight * 0.78, {
        align: "right",
      });
      pdf.setFontSize(10);
      pdf.text("Role Right", pageWidth * 0.78, pageHeight * 0.82, {
        align: "right",
      });

      pdf.save(`${certData.userName || "Certificate"}.pdf`);
    };
  };

  if (!certData) return null; // Optional: add loader here

  return (
    <div className="min-h-screen flex flex-col py-8 px-12 w-full relative">
      <button
        onClick={handleDownloadPDF}
        className="absolute bottom-5 right-5 sm:absolute sm:top-5 sm:right-10 sm:bottom-auto px-4 py-2 bg-white text-black rounded-full shadow hover:bg-gray-200 transition text-sm sm:text-base z-50"
      >
        Download PDF
      </button>

      <h1 className="text-3xl sm:text-2xl mb-4 font-semibold text-start">
        Certificate
      </h1>
      <div className="flex justify-center items-center w-full px-2">
        <div className="relative w-full max-w-[900px] aspect-[4/3] shadow-xl overflow-hidden">
          <img
            src={img}
            alt="Certificate"
            className="w-full h-full object-cover"
          />

          <div
            className="absolute font-semibold text-center text-[18px] sm:text-[32px] md:text-[44px] lg:text-[48px]"
            style={{
              top: "28%",
              left: "50%",
              transform: "translateX(-50%)",
              fontFamily: "serif",
              color: "#000",
            }}
          >
            {certData.userName}
          </div>

          <p
            className="absolute font-bold whitespace-nowrap text-[10px] sm:text-[14px] md:text-[18px] lg:text-[22px]"
            style={{
              top: "50%",
              left: "48.2%",
              transform: "translateX(-10%)",
              fontFamily: "Arial",
              color: "#000",
            }}
          >
            {certData.categoryName}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Certification;
