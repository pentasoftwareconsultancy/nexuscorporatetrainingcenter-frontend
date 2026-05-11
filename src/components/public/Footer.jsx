import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom"; // import Link
import { ROUTES } from "../../core/constants/routes.constant"; // import your routes
import footerImg from "../../assets/footer/footer.png";
import { FaLinkedin, FaFacebook, FaPhoneAlt } from "react-icons/fa";
import { IoIosMail } from "react-icons/io";
import { AiFillInstagram } from "react-icons/ai";
import { FaYoutube, FaLocationDot } from "react-icons/fa6";
import ApiService from "../../core/services/api.service";
import ServerUrl from "../../core/constants/serverURL.constant";

const companyLinks = [
  { title: "Home", path: ROUTES.HOME },
  { title: "About us", path: ROUTES.ABOUT },
  { title: "Courses", path: ROUTES.COURSES },
  { title: "Gallery", path: ROUTES.GALLERY },
  { title: "Success stories", path: ROUTES.PLACEMENTS },
  { title: "Contact us", path: ROUTES.CONTACT },
  { title: "Book appointment", path: ROUTES.CONTACT },
];

const categorizedBranches = [
  {
    category: "Pune Region",
    items: [
      {
        title: "Pimple Saudagar",
        address:
          "Office No. 4-B, Second Floor, Ganesham Commercial -A, Survey No. 21/8-21/24, BRTS Road, Pimple Saudagar, Pune - 411027",
      },
      {
        title: "Wagholi",
        address: "502 Radheeshwari Nagar, Bakori road, Wagholi",
      },
      {
        title: "Katraj",
        address:
          "Office No. 4-B, Second Floor, Ganesham Commercial -A, Survey No. 21/8-21/24, BRTS Road, Pimple Saudagar, Pune - 411027",
      },
    ],
  },
  {
    category: "Maharashtra",
    items: [
      {
        title: "Akole",
        address: "4/45, Collector colony, Near ST stand, 111 Road, Akole",
      },
      {
        title: "Nashik",
        address:
          "Office No. 4-B, Second Floor, Ganesham Commercial -A, Survey No. 21/8-21/24, BRTS Road, Pimple Saudagar, Pune - 411027",
      },
      {
        title: "Manchar",
        address:
          "Office No. 4-B, Second Floor, Ganesham Commercial -A, Survey No. 21/8-21/24, BRTS Road, Pimple Saudagar, Pune - 411027",
      },
    ],
  },
  {
    category: "International",
    items: [
      {
        title: "United Kingdom",
        address:
          "Office No. 4-B, Second Floor, Ganesham Commercial -A, Survey No. 21/8-21/24, BRTS Road, Pimple Saudagar, Pune - 411027",
      },
    ],
  },
];

const fallbackCategories = [
  {
    id: "software-development",
    name: "Software Development",
    isFallback: true,
    courses: [
      { id: 1, title: "Full Stack Developer" },
      { id: 2, title: "MERN Stack Developer" },
      { id: 3, title: "Full Stack Python" },
      { id: 4, title: "Full Stack Java" },
      { id: 5, title: "C# and .Net" },
      { id: 6, title: "Full Stack react js / Angular" },
      { id: 7, title: "Full Stack .net" },
      { id: 8, title: "Core Engine" }
    ]
  },
  {
    id: "cloud-devops",
    name: "Cloud & DevOps",
    isFallback: true,
    courses: [
      { id: 9, title: "AWS Solution Architect" },
      { id: 10, title: "Dev-Ops" },
      { id: 11, title: "Google Cloud" },
      { id: 12, title: "Azure 104 admin" },
      { id: 13, title: "Networking" },
      { id: 14, title: "Cyber Security" },
      { id: 15, title: "CC NA" }
    ]
  },
  {
    id: "testing-qa",
    name: "Software Testing / QA",
    isFallback: true,
    courses: [
      { id: 16, title: "Software Testing/ QA" },
      { id: 17, title: "Web testing" },
      { id: 18, title: "Auto testing" },
      { id: 19, title: "Database testing" },
      { id: 20, title: "Mobile testing" },
      { id: 21, title: "ETC testing" }
    ]
  },
  {
    id: "data-analytics",
    name: "Data & Analytics",
    isFallback: true,
    courses: [
      { id: 22, title: "Power BI/ Data analyst" },
      { id: 23, title: "Data Science" },
      { id: 24, title: "Big Data" },
      { id: 25, title: "Business Analyst" }
    ]
  },
  {
    id: "design-marketing",
    name: "Design & Marketing",
    isFallback: true,
    courses: [
      { id: 26, title: "Graphic Design" },
      { id: 27, title: "3D animation" },
      { id: 28, title: "Digital Marketing" },
      { id: 29, title: "UX/UI Design" },
      { id: 30, title: "DV-360" }
    ]
  },
  {
    id: "healthcare-coding",
    name: "Healthcare & Others",
    isFallback: true,
    courses: [
      { id: 31, title: "Medical Coding" },
      { id: 32, title: "Medical Billing" },
      { id: 33, title: "AR Caller Non" },
      { id: 34, title: "SAP (fico)" },
      { id: 35, title: "SAP (mm)" },
      { id: 36, title: "OSI soft (PI system)" },
      { id: 37, title: "Soft Skills" },
      { id: 38, title: "Ethical Hacking" },
      { id: 39, title: "Sales Force Admin/ Dev" },
      { id: 40, title: "SQL unix production support (L2)" },
      { id: 41, title: "Scrum Master" },
      { id: 42, title: "Asset Management" },
      { id: 43, title: "Service OP" }
    ]
  }
];

const socialMedia = [
  {
    icon: FaLinkedin,
    link: "https://www.linkedin.com/company/nexuxctc/?originalSubdomain=in",
  },
  {
    icon: FaFacebook,
    link: "https://www.facebook.com/p/Nexus-Corporate-Training-Center-100092539515709/",
  },
  {
    icon: AiFillInstagram,
    link: "https://www.instagram.com/nexus_ctc/?hl=en",
  },
  {
    icon: FaYoutube,
    link: "www.youtube.com/@NexusCorporateTrainingCentre",
  },
];

export default function Footer() {
  const navigate = useNavigate();
  const [categories, setCategories] = useState(fallbackCategories);

  const handleCategoryClick = (category) => {
    navigate(ROUTES.COURSES);
  };

  const handlenavigate = (link) => {
    navigate(link.path);
  };

  // Split categories into 2 columns
  const half = Math.ceil(categories.length / 2);
  const leftCols = categories.slice(0, half);
  const rightCols = categories.slice(half);

  return (
    <footer className="flex justify-center items-center text-white w-full min-h-screen relative mx-auto md:px-12">
      <div className="relative w-full min-h-[700px] pb-16 md:pb-24 overflow-hidden md:rounded-2xl border-0 md:border-2 md:border-one">
        {/* Background Gradient */}
        <div className="absolute inset-0 z-0 bg-gradient-to-b via-[#1b1008] to-[#e77b2ee1]" />

        <div className="relative z-20 max-w-7xl mx-auto py-6 px-4 md:px-8 text-start">
          <div className="flex flex-col md:flex-row md:flex-nowrap md:items-start md:justify-between gap-10 md:gap-6">
            {/* Company Links */}
            <div className="w-full md:w-[15%] mb-8 md:mb-0 text-start">
              <h3 className="font-bold mb-3 text-lg">Company</h3>
              <ul className="space-y-1 text-sm text-gray-300">
                {companyLinks.map((link) => (
                  <li
                    key={link.title}
                    onClick={() => handlenavigate(link)}
                    className="hover:text-orange-400 cursor-pointer"
                  >
                    {link.title}
                  </li>
                ))}
              </ul>
            </div>

            {/* Branches */}
            <div className="w-full md:w-[45%] mb-8 md:mb-0 text-start">
              <h3 className="font-bold mb-4 text-lg border-b border-white/10 pb-1">Branches</h3>
              <div className="space-y-4">
                {categorizedBranches.map((group) => (
                  <div key={group.category} className="group">
                    <h4 className="font-bold text-xs sm:text-sm text-orange-400/90 mb-1.5 flex items-center gap-1">
                      {group.category}
                    </h4>
                    <ul className="space-y-2 text-[11px] text-gray-300">
                      {group.items.map((item) => (
                        <li key={item.title} className="hover:text-white hover:translate-x-0.5 cursor-pointer transition-all duration-200">
                          <div className="font-semibold text-white/95 text-xs">
                            {item.title}
                          </div>
                          <p className="pl-1 text-[10px] text-gray-400 flex items-start gap-1.5 mt-0.5">
                            <FaLocationDot className="mt-0.5 text-orange-500/80 shrink-0" />
                            <span>{item.address}</span>
                          </p>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>

              {/* See More Button */}
              <div
                className="mt-5 cursor-pointer text-orange-500 font-bold hover:text-orange-400 transition-colors inline-block text-sm"
                onClick={() => navigate(ROUTES.BRANCHES)}
              >
                See More Branches &rarr;
              </div>
            </div>

            {/* Courses Column (Width [40%]) */}
            <div className="w-full md:w-[40%] flex flex-col justify-between text-start">
              <div className="flex flex-row gap-6 md:gap-8">
                <div className="flex-1">
                  <h3 className="font-bold mb-4 text-lg border-b border-white/10 pb-1">Courses</h3>
                  <div className="space-y-5">
                    {leftCols.map((category) => (
                      <div key={category.id} className="group">
                        <h4
                          onClick={() => handleCategoryClick(category)}
                          className="font-bold text-xs sm:text-sm text-orange-400/90 group-hover:text-orange-400 transition-colors cursor-pointer mb-1.5 flex items-center gap-1"
                        >
                          {category.name}
                          <span className="opacity-0 group-hover:opacity-100 transition-opacity text-[10px]">→</span>
                        </h4>
                        <ul className="space-y-1 text-[11px] text-gray-300">
                          {category.courses.map((course) => (
                            <li
                              key={course.id}
                              onClick={() => handleCategoryClick(category)}
                              className="hover:text-white hover:translate-x-1 cursor-pointer transition-all duration-200"
                            >
                              {course.title}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex-1 mt-11">
                  <div className="space-y-5">
                    {rightCols.map((category) => (
                      <div key={category.id} className="group">
                        <h4
                          onClick={() => handleCategoryClick(category)}
                          className="font-bold text-xs sm:text-sm text-orange-400/90 group-hover:text-orange-400 transition-colors cursor-pointer mb-1.5 flex items-center gap-1"
                        >
                          {category.name}
                          <span className="opacity-0 group-hover:opacity-100 transition-opacity text-[10px]">→</span>
                        </h4>
                        <ul className="space-y-1 text-[11px] text-gray-300">
                          {category.courses.map((course) => (
                            <li
                              key={course.id}
                              onClick={() => handleCategoryClick(category)}
                              className="hover:text-white hover:translate-x-1 cursor-pointer transition-all duration-200"
                            >
                              {course.title}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* See All Courses Button */}
              <div
                className="mt-6 cursor-pointer text-orange-500 font-bold hover:text-orange-400 transition-colors inline-block text-sm"
                onClick={() => navigate(ROUTES.COURSES)}
              >
                See All Courses &rarr;
              </div>
            </div>
          </div>
        </div>

        {/* Footer Image */}
        <div className="relative z-10 flex justify-center -translate-y-6 md:-translate-y-12">
          <img
            src={footerImg}
            alt="Nexus Footer Image"
            className="w-[60%] md:w-[90%] object-contain opacity-90"
          />
        </div>

        {/* Contact Info */}
        <div className="relative z-20 text-left -translate-y-8 px-6 sm:px-10 md:px-16">
          <h2 className="text-lg sm:text-xl md:text-2xl font-semibold mb-2">
            Corporate Training Center LLP
          </h2>
          <p className="text-[10px] sm:text-xs md:text-sm max-w-2xl text-gray-300 mb-4">
            Address: Office No. 4-B, Second Floor, Ganesham Commercial -A,
            Survey No. 21/8-21/24, BRTS Road, Pimple Saudagar, Pune - 411027
          </p>

          <div className="flex flex-col gap-3 sm:gap-3 md:gap-4 font-semibold text-[10px] sm:text-sm leading-relaxed">
            <p>
              <span className="font-bold text-white flex items-center gap-2 leading-1">
                <FaPhoneAlt /> Contact:
                <a
                  href="tel:+919545450788"
                  className="text-white hover:underline ml-1"
                >
                  +91 9545450788
                </a>{" "}
                /
                <a
                  href="tel:+919545450677"
                  className="text-white hover:underline ml-1"
                >
                  +91 9545450677
                </a>
              </span>
            </p>
            <p>
              <span className="font-bold text-white flex items-center gap-2 leading-1">
                <IoIosMail /> Email:
                <a
                  href="mailto:nexusCTC2020@gmail.com"
                  className="text-white hover:underline ml-1"
                >
                  nexusCTC2020@gmail.com
                </a>
              </span>
            </p>
          </div>

          <div className="flex justify-start gap-4 mt-5">
            {socialMedia.map((item, i) => {
              const IconComponent = item.icon;

              return (
                <a
                  key={i}
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-orange-400 transition"
                >
                  <IconComponent size={28} />
                </a>
              );
            })}
          </div>

          <p className="text-white text-[10px] sm:text-xs md:text-sm mt-5 text-left">
            © 2025 All rights reserved Nexusctc.com
          </p>
        </div>
      </div>
    </footer>
  );
}
