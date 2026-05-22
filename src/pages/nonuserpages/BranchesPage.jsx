import React, { useState } from "react";
import { MapPin, Phone, Globe, Building2 } from "lucide-react";
import { motion } from "framer-motion";

const branchGroups = [
  {
    region: "Pune Region",
    branches: [
      {
        title: "Pimple Saudagar",
        tag: "Head Office",
        address: "Office No. 4-B, Second Floor, Ganesham Commercial-A, Survey No. 21/B-2/2-A, BRTS Road, Pimple Saudagar, Pune - 411027",
        phone: "+91 9545450788 / +91 9545450677",
      },
      {
        title: "Katraj",
        tag: "Branch",
        address: "Office No. 4-B, Second Floor, Ganesham Commercial-A, Survey No. 21/B-2/2-A, BRTS Road, Pimple Saudagar, Pune - 411027",
        phone: "+91 9545450788 / +91 9545450677",
      },
      {
        title: "Wagholi",
        tag: "Branch",
        address: "502 Radheeshwari Nagar, Bakori Road, Wagholi, Pune",
        phone: "+91 9545450788 / +91 9545450677",
      },
    ],
  },
  {
    region: "Maharashtra",
    branches: [
      {
        title: "Akola",
        tag: "Branch",
        address: "Nexus Corporate Training Centre LLP, Geeta Nagar, Dahigaon Gawande, Akola, Maharashtra 444002",
        phone: "+91 9545450788 / +91 9545450677",
      },
      {
        title: "Nashik",
        tag: "Branch",
        address: "Office No. 4-B, Second Floor, Ganesham Commercial-A, Survey No. 21/B-2/2-A, BRTS Road, Pimple Saudagar, Pune - 411027",
        phone: "+91 9545450788 / +91 9545450677",
      },
      {
        title: "Manchar",
        tag: "Branch",
        address: "Office No. 4-B, Second Floor, Ganesham Commercial-A, Survey No. 21/B-2/2-A, BRTS Road, Pimple Saudagar, Pune - 411027",
        phone: "+91 9545450788 / +91 9545450677",
      },
    ],
  },
  {
    region: "International",
    branches: [
      {
        title: "United Kingdom",
        tag: "International",
        address: "Office No. 4-B, Second Floor, Ganesham Commercial-A, Survey No. 21/B-2/2-A, BRTS Road, Pimple Saudagar, Pune - 411027",
        phone: "+91 9545450788 / +91 9545450677",
      },
    ],
  },
];

const allRegions = ["All", ...branchGroups.map((g) => g.region)];

const cardVariant = {
  hidden: { opacity: 0, y: 30 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
};

export default function Branches() {
  const [activeRegion, setActiveRegion] = useState("All");

  const filtered = activeRegion === "All"
    ? branchGroups
    : branchGroups.filter((g) => g.region === activeRegion);

  return (
    <section className="relative w-full min-h-screen py-6 px-6 md:px-12 text-one overflow-hidden font-sora">
      <div className="relative z-10">

        {/* ── Header ── */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="mb-4"
        >
          <h1 className="text-4xl text-white font-bold mb-3">Our Branches</h1>
          <p className="text-[16px] text-towpointone max-w-2xl">
            Nexus Corporate Training Center is present across multiple cities in India and internationally.
            Find a branch near you and start your learning journey today.
          </p>
        </motion.div>

        {/* ── Region Filter Tabs — same style as CoursesPage ── */}
        <div className="flex flex-wrap gap-3 mb-10">
          {allRegions.map((region) => (
            <button
              key={region}
              onClick={() => setActiveRegion(region)}
              className={`
                px-5 py-2.5 rounded-full text-xs md:text-sm font-medium transition-all duration-300 cursor-pointer whitespace-nowrap
                ${activeRegion === region
                  ? "bg-gradient-to-r from-orange-500 to-amber-600 text-white shadow-[0_4px_15px_rgba(249,115,22,0.4)] border border-orange-500/25 scale-105"
                  : "bg-[#181818] text-gray-400 hover:text-white hover:bg-[#222222] border border-white/5"}
              `}
            >
              {region}
            </button>
          ))}
        </div>

        {/* ── Branch Groups ── */}
        <div className="space-y-12">
          {filtered.map((group, gi) => (
            <div key={group.region}>

              {/* Region label */}
              <div className="flex items-center gap-3 mb-6">
                <p className="text-[18px] font-bold inline-block text-white border-b-2 border-orange-500 pb-1">
                  {group.region}
                </p>
                {group.region === "International" && (
                  <Globe size={16} className="text-five" />
                )}
              </div>

              {/* Cards */}
              <motion.div
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                transition={{ staggerChildren: 0.1 }}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
              >
                {group.branches.map((branch, bi) => (
                  <motion.div
                    key={bi}
                    variants={cardVariant}
                    whileHover={{ y: -6, scale: 1.02 }}
                    className="group relative flex flex-col rounded-3xl bg-[#111111] border border-white/8
                               hover:border-orange-500/40 hover:shadow-[0_0_30px_rgba(255,106,0,0.15)]
                               transition-all duration-300 overflow-hidden cursor-pointer"
                  >
                    {/* Orange top accent bar */}
                    <div className="h-[3px] w-full bg-gradient-to-r from-orange-500 to-transparent" />

                    {/* Hover glow */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-3xl bg-gradient-to-br from-orange-500/8 to-transparent" />

                    <div className="p-6 flex flex-col gap-4 relative z-10">

                      {/* Title + tag */}
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex items-center gap-2">
                          <Building2 size={18} className="text-five shrink-0" />
                          <h3 className="text-lg font-bold text-white">{branch.title}</h3>
                        </div>
                        <span className={`
                          text-[10px] font-semibold px-2.5 py-1 rounded-full shrink-0 border
                          ${branch.tag === "Head Office"
                            ? "bg-orange-500/20 text-orange-400 border-orange-500/40"
                            : branch.tag === "International"
                            ? "bg-blue-500/20 text-blue-400 border-blue-500/40"
                            : "bg-white/5 text-gray-400 border-white/10"}
                        `}>
                          {branch.tag}
                        </span>
                      </div>

                      {/* Address */}
                      <div className="flex items-start gap-3">
                        <MapPin size={15} className="text-five shrink-0 mt-0.5" />
                        <p className="text-gray-400 text-sm leading-relaxed">{branch.address}</p>
                      </div>

                      {/* Phone */}
                      <div className="flex items-center gap-3 pt-3 border-t border-white/6">
                        <Phone size={13} className="text-five shrink-0" />
                        <a
                          href="tel:+919545450788"
                          className="text-towpointone text-sm hover:text-orange-400 transition-colors"
                        >
                          {branch.phone}
                        </a>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
