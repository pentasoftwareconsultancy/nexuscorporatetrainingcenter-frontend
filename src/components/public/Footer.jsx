import React from "react";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../core/constants/routes.constant";
import { FaLinkedin, FaFacebook, FaPhoneAlt } from "react-icons/fa";
import footerImg from "../../assets/footer/footer.avif";
import { IoIosMail } from "react-icons/io";
import { AiFillInstagram } from "react-icons/ai";
import { FaYoutube, FaLocationDot } from "react-icons/fa6";


const companyLinks = [
  { title: "Home",             path: ROUTES.HOME },
  { title: "About Us",         path: ROUTES.ABOUT },
  { title: "Courses",          path: ROUTES.COURSES },
  { title: "Gallery",          path: ROUTES.GALLERY },
  { title: "Placements",       path: ROUTES.PLACEMENTS },
  { title: "Contact Us",       path: ROUTES.CONTACT },
  { title: "Book Appointment", path: ROUTES.CONTACT },
];

const quickLinks = [
  { title: "Upcoming Batches", path: ROUTES.UPCOMING },
  { title: "Our Faculty",      path: ROUTES.PROFESSOR },
  { title: "Testimonials",     path: ROUTES.VIDEO_TESTIMONIALS },
  { title: "Placements",       path: ROUTES.PLACEMENTS },
  { title: "Gallery",          path: ROUTES.GALLERY },
];

const puneBranches = [
  { title: "Pimple Saudagar", path: ROUTES.BRANCHES },
  { title: "Wagholi",         path: ROUTES.BRANCHES },
  { title: "Katraj",          path: ROUTES.BRANCHES },
];

const otherBranches = [
  { title: "Akola",           path: ROUTES.BRANCHES },
  { title: "Nashik",          path: ROUTES.BRANCHES },
  { title: "Manchar",         path: ROUTES.BRANCHES },
];

const internationalBranches = [
  { title: "United Kingdom",  path: ROUTES.BRANCHES },
];

const socialMedia = [
  { icon: FaLinkedin,      link: "https://www.linkedin.com/company/nexuxctc/?originalSubdomain=in" },
  { icon: FaFacebook,      link: "https://www.facebook.com/p/Nexus-Corporate-Training-Center-100092539515709/" },
  { icon: AiFillInstagram, link: "https://www.instagram.com/nexus_ctc/?hl=en" },
  { icon: FaYoutube,       link: "https://www.youtube.com/@NexusCorporateTrainingCentre" },
];

const ColTitle = ({ children }) => (
  <h3 className="text-white font-bold text-sm uppercase tracking-widest mb-4 pb-2 border-b border-white/10">
    {children}
  </h3>
);

const FLink = ({ onClick, children }) => (
  <li
    onClick={onClick}
    className="text-gray-300 text-[15px] hover:text-white hover:translate-x-1 transition-all duration-200 cursor-pointer leading-relaxed"
  >
    {children}
  </li>
);

export default function Footer() {
  const navigate = useNavigate();

  return (
    <footer className="relative w-full font-sora px-4 md:px-8 pb-6 mt-8">

      <div className="relative border-2 border-white/50 rounded-3xl overflow-hidden">

      {/* Background Nexus watermark image */}
      <img
        src={footerImg}
        alt=""
        className="absolute inset-0 w-full h-full object-contain pointer-events-none z-0"
        style={{ opacity: 1, mixBlendMode: "multiply", padding: "0 60px" }}
      />

      {/* MAIN CONTENT */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 py-12">

        {/* 4-column grid — all on one line */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-8">

          {/* Col 1 — Company */}
          <div>
            <ColTitle>Company</ColTitle>
            <ul className="space-y-2">
              {companyLinks.map((l) => (
                <FLink key={l.title} onClick={() => navigate(l.path)}>
                  {l.title}
                </FLink>
              ))}
            </ul>
          </div>

          {/* Col 3 — Branches */}
          <div>
            <ColTitle>Branches</ColTitle>
            <div className="space-y-4">
              <div>
                <span className="text-gray-400 text-[11px] font-bold uppercase tracking-wider block mb-1">Pune</span>
                <ul className="space-y-1.5">
                  {puneBranches.map((b) => (
                    <FLink key={b.title} onClick={() => navigate(b.path)}>
                      {b.title}
                    </FLink>
                  ))}
                </ul>
              </div>

              <div>
                <span className="text-gray-400 text-[11px] font-bold uppercase tracking-wider block mb-1">Other Cities</span>
                <ul className="space-y-1.5">
                  {otherBranches.map((b) => (
                    <FLink key={b.title} onClick={() => navigate(b.path)}>
                      {b.title}
                    </FLink>
                  ))}
                </ul>
              </div>

              <div>
                <span className="text-gray-400 text-[11px] font-bold uppercase tracking-wider block mb-1">International</span>
                <ul className="space-y-1.5">
                  {internationalBranches.map((b) => (
                    <FLink key={b.title} onClick={() => navigate(b.path)}>
                      {b.title}
                    </FLink>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Col 4 — Quick Links */}
          <div>
            <ColTitle>Quick Links</ColTitle>
            <ul className="space-y-2">
              {quickLinks.map((l) => (
                <FLink key={l.title} onClick={() => navigate(l.path)}>
                  {l.title}
                </FLink>
              ))}
            </ul>
          </div>

          {/* Col 5 — Location */}
          <div>
            <ColTitle>Locations</ColTitle>
            <div className="space-y-3 mb-5">
              <a href="tel:+919545450788" className="flex items-center gap-2 text-gray-300 hover:text-white transition text-sm">
                <FaPhoneAlt size={13} className="text-white/60 shrink-0" />
                +91 9545450788
              </a>
              <a href="tel:+919545450677" className="flex items-center gap-2 text-gray-300 hover:text-white transition text-sm">
                <FaPhoneAlt size={13} className="text-white/60 shrink-0" />
                +91 9545450677
              </a>
              <a href="mailto:nexusCTC2020@gmail.com" className="flex items-center gap-2 text-gray-300 hover:text-white transition text-sm">
                <IoIosMail size={16} className="text-white/60 shrink-0" />
                nexusCTC2020@gmail.com
              </a>
            </div>

            <div className="flex items-center gap-2 flex-wrap">
              {socialMedia.map((item, i) => {
                const Icon = item.icon;
                return (
                  <a
                    key={i}
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-lg bg-white/5 border border-white/8 flex items-center justify-center text-gray-400 hover:text-white hover:border-white/40 hover:bg-white/10 transition-all duration-200"
                  >
                    <Icon size={20} />
                  </a>
                );
              })}
            </div>
          </div>

        </div>
      </div>

      {/* BOTTOM BAR */}
      <div className="relative z-10 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-4 flex flex-col md:flex-row items-center justify-between gap-2">
          <div className="flex items-center gap-2 text-gray-300 text-xs">
            <FaLocationDot size={12} className="text-white/60 shrink-0" />
            <span className="hover:text-white transition-colors duration-200">Office No. 4-B, Second Floor, Ganesham Commercial-A, BRTS Road, Pimple Saudagar, Pune – 411027</span>
          </div>
          <p className="text-gray-500 text-xs">© 2025 All rights reserved — nexusctc.com</p>
        </div>
      </div>

      </div>
    </footer>
  );
}
