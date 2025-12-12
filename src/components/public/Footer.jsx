import React from "react";
import { Link, useNavigate } from "react-router-dom"; // import Link
import { ROUTES } from "../../core/constants/routes.constant"; // import your routes
import footerImg from "../../assets/sneha/footer.png";
import { FaLinkedin, FaFacebook, FaPhoneAlt } from "react-icons/fa";
import { IoIosMail } from "react-icons/io";
import { AiFillInstagram } from "react-icons/ai";
import { FaYoutube, FaLocationDot } from "react-icons/fa6";

const companyLinks = [
  { title: "Home", path: ROUTES.HOME },
  { title: "About us", path: ROUTES.ABOUT },
  { title: "Courses", path: ROUTES.COURSES },
  { title: "Gallery", path: ROUTES.GALLERY },
  { title: "Success stories", path: ROUTES.PLACEMENTS },
  { title: "Contact us", path: ROUTES.CONTACT },
  { title: "Book appointment", path: ROUTES.CONTACT }
];

const branches = [
  { title: "Pimple Saudagar", address: "Office No. 4-B, Second Floor, Ganesham Commercial -A, Survey No. 21/8-21/24, BRTS Road, Pimple Saudagar, Pune - 411027" },
  { title: "Akole", address: "4/45, Collector colony, Near ST stand, 111 Road, Akole" },
  { title: "Wagholi", address: "502 Radheeshwari Nagar, Bakori road, Wagholi" },
  { title: "Katraj", address: "Office No. 4-B, Second Floor, Ganesham Commercial -A, Survey No. 21/8-21/24, BRTS Road, Pimple Saudagar, Pune - 411027" },
  { title: "Nashik", address: "Office No. 4-B, Second Floor, Ganesham Commercial -A, Survey No. 21/8-21/24, BRTS Road, Pimple Saudagar, Pune - 411027" },
  { title: "Manchar", address: "Office No. 4-B, Second Floor, Ganesham Commercial -A, Survey No. 21/8-21/24, BRTS Road, Pimple Saudagar, Pune - 411027" },
  { title: "United Kingdom", address: "Office No. 4-B, Second Floor, Ganesham Commercial -A, Survey No. 21/8-21/24, BRTS Road, Pimple Saudagar, Pune - 411027" },
];

const coursesLeft = [
  "AWS Solution Architect", "Dev-Ops", "Power BI/ Data analyst", "Data Science", "Full Stack Developer",
  "Big Data", "Full Stack Python", "Core Engine", "Google Cloud", "Azure 104 admin",
  "DV-360", "Software Testing/ QA", "Web testing", "Auto testing", "Database testing", "Mobile testing",
  "ETC testing", "Ethical Hacking", "Graphic Design", "3D animation", "Full Stack .net"
];

const coursesRight = [
  "Medical Coding", "Medical Billing", "AR Caller Non", "Full Stack Java", "C# and .Net", "Business Analyst",
  "Sales Force Admin/ Dev", "SQL unix production support (L2)", "Scrum Master", "Digital Marketing",
  "Soft Skills", "MERN Stack Developer", "UX/UI Design", "SAP (fico)", "SAP (mm)", "OSI soft (PI system)",
  "Networking", "Cyber Security", "Asset Management", "Service OP", "CC NA", "Full Stack react js/ Angular"
];

export default function Footer() {
  const navigate=useNavigate();
  const handlenavigate = (link) => {
    navigate(link.path);
  };
  return (
    <footer className="flex justify-center items-center text-white w-full min-h-screen relative mx-auto m-10 px-12">
<div className="relative w-full min-h-[700px] overflow-hidden rounded-2xl border-0 md:border-2 md:border-one">

        {/* Background Gradient */}
        <div className="absolute inset-0 z-0 bg-gradient-to-b via-[#1b1008] to-[#e77b2ee1]" />

        <div className="relative z-10 max-w-7xl mx-auto py-6 px-4 md:px-8 text-start">
          <div className="flex flex-col md:flex-row md:flex-nowrap md:items-start md:justify-between gap-10 md:gap-6">

            {/* Company Links */}
            <div className="md:w-1/4 mb-8 md:mb-0">
              <h3 className="font-bold mb-3 text-lg">Company</h3>
              <ul className="space-y-1 text-sm text-gray-300">
                {companyLinks.map(link => (
                  <li key={link.title} onClick={()=>handlenavigate(link)} className="hover:text-orange-400 cursor-pointer">{link.title}</li>
                ))}
              </ul>
            </div>

            {/* Branches */}
            <div className="md:w-1/2 mb-8 md:mb-0 text-start">
              <h3 className="font-bold mb-3 text-lg">Branches</h3>
              <ul className="space-y-2 text-xs text-gray-300">
                {branches.map(branch => (
                  <li key={branch.title}>
                    <div className="font-bold text-white mb-1">{branch.title}</div>
                    <p className="ml-2 flex items-center gap-2 align-top"><FaLocationDot />{branch.address}</p>
                  </li>
                ))}
              </ul>

              {/* See More Button */}
              <div className="mt-4 cursor-pointer" onClick={()=>navigate(ROUTES.BRANCHES)}>
                                             
                
                  See More
                
              </div>
            </div>

            {/* Courses */}
            <div className="md:w-1/4 flex flex-row gap-4">
              <div>
                <h3 className="font-bold mb-3 text-lg">Courses</h3>
                <ul className="space-y-1 text-xs text-gray-300">
                  {coursesLeft.map(course => (
                    <li key={course}>{course}</li>
                  ))}
                </ul>
              </div>
              <div>
                <ul className="mt-9 space-y-1 text-xs text-gray-300">
                  {coursesRight.map(course => (
                    <li key={course}>{course}</li>
                  ))}
                </ul>
              </div>
            </div>

          </div>
        </div>

        {/* Footer Image */}
        <div className="relative z-10 flex justify-center -translate-y-12">
          <img
            src={footerImg}
            alt="Nexus Footer Image"
            className="w-[80%] md:w-[90%] object-contain opacity-90"
          />
        </div>

        {/* Contact Info */}
        <div className="relative z-10 text-left -translate-y-8 px-6 sm:px-10 md:px-16">
          <h2 className="text-lg sm:text-xl md:text-2xl font-semibold mb-2">
            Corporate Training Center LLP
          </h2>
          <p className="text-[10px] sm:text-xs md:text-sm max-w-2xl text-gray-300 mb-4">
            Address: Office No. 4-B, Second Floor, Ganesham Commercial -A, Survey No. 21/8-21/24,
            BRTS Road, Pimple Saudagar, Pune - 411027
          </p>

          <div className="flex flex-col gap-3 sm:gap-3 md:gap-4 font-semibold text-[10px] sm:text-sm leading-relaxed">
            <p>
              <span className="font-bold text-white flex items-center gap-2 leading-1"><FaPhoneAlt /> Contact:
              <a href="tel:+919545450788" className="text-white hover:underline ml-1">+91 9545450788</a> /
              <a href="tel:+919545450677" className="text-white hover:underline ml-1">+91 9545450677</a>
              </span>
            </p>
            <p>
              <span className="font-bold text-white flex items-center gap-2 leading-1"><IoIosMail /> Email:
              <a href="mailto:nexusCTC2020@gmail.com" className="text-white hover:underline ml-1">
                nexusCTC2020@gmail.com
              </a>
              </span>
            </p>
          </div>

          <div className="flex justify-start gap-4 mt-5">
            {[FaLinkedin, FaFacebook, AiFillInstagram, FaYoutube].map((Icon, i) => (
              <a key={i} href="#">
                <Icon size={28} />
              </a>
            ))}
          </div>

          <p className="text-white text-[10px] sm:text-xs md:text-sm mt-5 text-left">
            © 2025 All rights reserved Nexusctc.com
          </p>
        </div>

      </div>
    </footer>
  );
}
