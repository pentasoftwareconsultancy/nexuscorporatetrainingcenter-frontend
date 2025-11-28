import React from "react";
// import { MapPin, Phone } from "lucide-react";
import { TiLocation } from "react-icons/ti";
import { FaPhone } from "react-icons/fa6";


export default function Branches() {
  const branches = [
    {
      title: "Pimple Saudagar:",
      address:
        "Address: Office No. 4-B, Second Floor, Ganesham Commercial-A, Survey No. 21/B-2/2-A, BRTS Road, Pimple Saudagar, Pune - 411027",
      phone: "+919545450788 / +919545450677",
    },
    {
      title: "Katraj:",
      address:
        "Address: Office No. 4-B, Second Floor, Ganesham Commercial-A, Survey No. 21/B-2/2-A, BRTS Road, Pimple Saudagar, Pune - 411027",
      phone: "+919545450788 / +919545450677",
    },
    {
      title: "United Kingdom:",
      address:
        "Address: Office No. 4-B, Second Floor, Ganesham Commercial-A, Survey No. 21/B-2/2-A, BRTS Road, Pimple Saudagar, Pune - 411027",
      phone: "+919545450788 / +919545450677",
    },
    {
      title: "Akola:",
      address: "Address: A-45, Collector colony, Near ST stand, ITI Road, Akola",
      phone: "+919545450788 / +919545450677",
    },
    {
      title: "Nashik:",
      address:
        "Address: Office No. 4-B, Second Floor, Ganesham Commercial-A, Survey No. 21/B-2/2-A, BRTS Road, Pimple Saudagar, Pune - 411027",
      phone: "+919545450788 / +919545450677",
    },
    {
      title: "Wagholi:",
      address: "Address: 502 Radheeshwari Nagar, Bakori road, Wagholi",
      phone: "+919545450788 / +919545450677",
    },
    {
      title: "Manchar:",
      address:
        "Address: Office No. 4-B, Second Floor, Ganesham Commercial-A, Survey No. 21/B-2/2-A, BRTS Road, Pimple Saudagar, Pune - 411027",
      phone: "+919545450788 / +919545450677",
    },
  ];

  return (
    <div className="min-h-screen w-full bg-black text-[#eaeaea] px-12 py-20">
      <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-12">
        Branches
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
        {branches.map((item, index) => (
          <div key={index} className="space-y-3">
            <h2 className="text-lg sm:text-xl font-semibold">{item.title}</h2>

            {/* Address */}
            <p className="flex items-center gap-3 text-[13px] leading-tight text-gray-300 max-w-[350px] line-clamp-2 overflow-hidden text-ellipsis">
              <span className="w-5 h-5 flex-shrink-0 flex items-center justify-center">
                <TiLocation className="w-full h-full mb-4 stroke-[2.5]" />
              </span>
              {item.address}
            </p>

            {/* Phone */}
            <p className="flex items-center gap-3 text-[13px] text-gray-300">
              <span className="w-5 h-5 flex-shrink-0 flex items-center justify-center">
                <FaPhone className="w-full h-full stroke-[2.5] text-one" />
              </span>
              {item.phone}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
