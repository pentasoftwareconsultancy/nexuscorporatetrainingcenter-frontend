import React from "react";
import { MapPin, Phone } from "lucide-react";
import { motion } from "framer-motion";

export default function Branches() {
  const branches = [
    { title: "Pimple Saudagar:", address: "Address: Office No. 4-B, Second Floor, Ganesham Commercial-A, Survey No. 21/B-2/2-A, BRTS Road, Pimple Saudagar, Pune - 411027", phone: "+919545450788 / +919545450677" },
    { title: "Katraj:", address: "Address: Office No. 4-B, Second Floor, Ganesham Commercial-A, Survey No. 21/B-2/2-A, BRTS Road, Pimple Saudagar, Pune - 411027", phone: "+919545450788 / +919545450677" },
    { title: "United Kingdom:", address: "Address: Office No. 4-B, Second Floor, Ganesham Commercial-A, Survey No. 21/B-2/2-A, BRTS Road, Pimple Saudagar, Pune - 411027", phone: "+919545450788 / +919545450677" },
    { title: "Akola:", address: "Address: A-45, Collector colony, Near ST stand, ITI Road, Akola", phone: "+919545450788 / +919545450677" },
    { title: "Nashik:", address: "Address: Office No. 4-B, Second Floor, Ganesham Commercial-A, Survey No. 21/B-2/2-A, BRTS Road, Pimple Saudagar, Pune - 411027", phone: "+919545450788 / +919545450677" },
    { title: "Wagholi:", address: "Address: 502 Radheeshwari Nagar, Bakori road, Wagholi", phone: "+919545450788 / +919545450677" },
    { title: "Manchar:", address: "Address: Office No. 4-B, Second Floor, Ganesham Commercial-A, Survey No. 21/B-2/2-A, BRTS Road, Pimple Saudagar, Pune - 411027", phone: "+919545450788 / +919545450677" },
  ];

  const cardVariant = {
    hidden: { opacity: 0, y: 40, scale: 0.95 },
    show: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <div className="min-h-screen w-full text-white px-12 pt-5 relative overflow-hidden">


      {/* 🟦 3. Subtle Grid Overlay */}

      {/* TITLE */}
      <motion.h1
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-5xl md:text-6xl font-extrabold mb-8 tracking-wide 
             bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400"
      >
        Branches
      </motion.h1>


      {/* GRID CARDS */}
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 relative z-10"
      >
        {branches.map((item, index) => (
          <motion.div
            key={index}
            variants={cardVariant}
            transition={{ delay: index * 0.12 }}
            whileHover={{
              scale: 1.06,
              y: -6,
              boxShadow: "0px 25px 40px rgba(255,255,255,0.08)",
            }}
            className="relative p-6 rounded-2xl bg-[#0f0f0f]/80 border border-white/10 
                       backdrop-blur-xl hover:border-white/25 transition-all duration-300"
          >
            {/* Glow border */}
            <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 
                            transition-all duration-300 bg-gradient-to-br 
                            from-white/10 to-transparent pointer-events-none" />

            <h2 className="text-xl font-semibold mb-3">{item.title}</h2>

            <p className="flex items-start gap-3 text-sm text-gray-300 leading-tight">
              <MapPin className="w-5 h-5 text-white shrink-0" />
              {item.address}
            </p>

            <p className="flex items-center gap-3 text-sm text-gray-300 mt-3">
              <Phone className="w-5 h-5 text-white shrink-0" />
              {item.phone}
            </p>
          </motion.div>
        ))}
      </motion.div>

      {/* Soft Glow Bottom */}
      <motion.div
        animate={{ opacity: [0.05, 0.15, 0.05] }}
        transition={{ duration: 5, repeat: Infinity }}
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[70%] h-48 
                   bg-white/20 blur-3xl rounded-full"
      />
    </div>
  );
}
