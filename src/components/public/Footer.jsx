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

const branches = [
  {
    title: "Pimple Saudagar",
    address:
      "Office No. 4-B, Second Floor, Ganesham Commercial -A, Survey No. 21/8-21/24, BRTS Road, Pimple Saudagar, Pune - 411027",
  },
  {
    title: "Akole",
    address: "4/45, Collector colony, Near ST stand, 111 Road, Akole",
  },
  { title: "Wagholi", address: "502 Radheeshwari Nagar, Bakori road, Wagholi" },
  {
    title: "Katraj",
    address:
      "Office No. 4-B, Second Floor, Ganesham Commercial -A, Survey No. 21/8-21/24, BRTS Road, Pimple Saudagar, Pune - 411027",
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
  {
    title: "United Kingdom",
    address:
      "Office No. 4-B, Second Floor, Ganesham Commercial -A, Survey No. 21/8-21/24, BRTS Road, Pimple Saudagar, Pune - 411027",
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
      { id: 6, title: "Full Stack react js / Angular" }
    ]
  },
  {
    id: "cloud-devops",
    name: "Cloud & DevOps",
    isFallback: true,
    courses: [
      { id: 1, title: "AWS Solution Architect" },
      { id: 2, title: "Dev-Ops" },
      { id: 3, title: "Google Cloud" },
      { id: 4, title: "Azure 104 admin" },
      { id: 5, title: "Networking" },
      { id: 6, title: "Cyber Security" }
    ]
  },
  {
    id: "testing-qa",
    name: "Software Testing / QA",
    isFallback: true,
    courses: [
      { id: 1, title: "Software Testing / QA" },
      { id: 2, title: "Web testing" },
      { id: 3, title: "Auto testing" },
      { id: 4, title: "Database testing" },
      { id: 5, title: "Mobile testing" }
    ]
  },
  {
    id: "data-analytics",
    name: "Data & Analytics",
    isFallback: true,
    courses: [
      { id: 1, title: "Power BI / Data Analyst" },
      { id: 2, title: "Data Science" },
      { id: 3, title: "Big Data" },
      { id: 4, title: "Business Analyst" }
    ]
  },
  {
    id: "design-marketing",
    name: "Design & Marketing",
    isFallback: true,
    courses: [
      { id: 1, title: "Graphic Design" },
      { id: 2, title: "3D Animation" },
      { id: 3, title: "Digital Marketing" },
      { id: 4, title: "UX/UI Design" }
    ]
  },
  {
    id: "healthcare-coding",
    name: "Healthcare & Others",
    isFallback: true,
    courses: [
      { id: 1, title: "Medical Coding" },
      { id: 2, title: "Medical Billing" },
      { id: 3, title: "AR Caller Non" },
      { id: 4, title: "SAP (fico)" },
      { id: 5, title: "Soft Skills" }
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
  const api = new ApiService();
  const [categories, setCategories] = useState(fallbackCategories);

  useEffect(() => {
    const fetchFooterCourses = async () => {
      try {
        const catRes = await api.apiget(ServerUrl.API_GET_COURSE_CATEGORIES);
        const categoryList = catRes.data.data || [];
        
        const courseRes = await api.apiget(ServerUrl.API_GET_COURSES);
        const allCourses = Array.isArray(courseRes.data.data?.rows)
          ? courseRes.data.data.rows
          : [];
        
        if (categoryList.length > 0) {
          const finalData = categoryList.map((category) => {
            const courses = allCourses.filter(
              (course) => course.categoryId === category.id
            );
            return {
              id: category.id,
              name: category.name,
              isFallback: false,
              courses: courses.map(c => ({ id: c.id, title: c.title })),
            };
          }).filter(cat => cat.courses.length > 0);
          
          setCategories(finalData);
        }
      } catch (err) {
        console.error("Error fetching footer courses dynamically:", err);
      }
    };
    fetchFooterCourses();
  }, []);

  const handleCategoryClick = (category) => {
    if (category.isFallback) {
      navigate(ROUTES.COURSES);
    } else {
      navigate(ROUTES.COURSE_DETAILS.replace(":categoryId", category.id));
    }
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
              <h3 className="font-bold mb-3 text-lg">Branches</h3>
              <ul className="space-y-2 text-xs text-gray-300">
                {branches.map((branch) => (
                  <li key={branch.title}>
                    <div className="font-bold text-white mb-1">
                      {branch.title}
                    </div>
                    <p className="ml-2 flex items-center gap-2 align-top">
                      <FaLocationDot />
                      {branch.address}
                    </p>
                  </li>
                ))}
              </ul>

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
                          {category.courses.slice(0, 4).map((course) => (
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
                          {category.courses.slice(0, 4).map((course) => (
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
