import React from "react";
import footer from "../../assets/sneha/footer1.png"


const companyLinks = [
  "Home", "About us", "Courses", "Gallery", "Success stories", "Contact us", "Book appointment"
];

const branches = [
  {
    title: "Pimple Saudagar",
    addresses: [
      "Address: Office No. 4-B, Second Floor, Ganesham Commercial -A, Survey No. 21/8-21/24, BRTS Road, Pimple Saudagar, Pune - 411027"
    ]
  },
  {
    title: "Akole",
    addresses: [
      "Address: 4/45, Collector colony, Near ST stand,111 Road, Akole"
    ]
  },
  {
    title: "Wagholi",
    addresses: [
      "Address: 502 Radheeshwari Nagar, Bakori road, Wagholi"
    ]
  },
  {
    title: "Katraj",
    addresses: [
      "Address: Office No. 4-B, Second Floor, Ganesham Commercial -A, Survey No. 21/8-21/24, BRTS Road, Pimple Saudagar, Pune - 411027"
    ]
  },
  {
    title: "Nashik",
    addresses: [
      "Address: Office No. 4-B, Second Floor, Ganesham Commercial -A, Survey No. 21/8-21/24, BRTS Road, Pimple Saudagar, Pune - 411027"
    ]
  },
  {
    title: "Manchar",
    addresses: [
      "Address: Office No. 4-B, Second Floor, Ganesham Commercial -A, Survey No. 21/8-21/24, BRTS Road, Pimple Saudagar, Pune - 411027"
    ]
  },
  {
    title: "United Kingdom",
    addresses: [
      "Address: Office No. 4-B, Second Floor, Ganesham Commercial -A, Survey No. 21/8-21/24, BRTS Road, Pimple Saudagar, Pune - 411027"
    ]
  },
];

const coursesLeft = [
  "AWS Solution Architect", "Dev-Ops", "Power BI/ Data analyst", "Data Science", "Full Stack Developer", "Big Data", "Full Stack Python", "Core Engine", "Google Cloud", "Azure 104 admin", "DV-360", "Software Testing/ QA", "Web testing", "Auto testing", "Database testing", "Mobile testing", "ETC testing", "Ethical Hacking", "Graphic Design", "3D animation", "Full Stack .net"
];

const coursesRight = [
  "Medical Coding", "Medical Billing", "AR Caller Non", "Full Stack Java", "C# and .Net", "Business Analyst", "Sales Force Admin/ Dev", "SQL unix production support (L2)", "Scrum Master", "Digital Marketing", "Soft Skills", "MERN Stack Developer", "UX/UI Design", "SAP (fico)", "SAP (mm)", "OSI soft (PI system)", "Networking", "Cyber Security", "Asset Management", "Service OP", "CC NA", "Full Stack react js/ Angular"
];

export default function Footer() {
  return (
    <footer className="flex justify-center items-center text-white w-full min-h-screen bg-black relative">
      <div className="relative w-[95%] min-h-[700px] text-white overflow-hidden rounded-xl">
        
        {/* Image Background */}
       <img
  src={footer}
  alt=""
  className="absolute inset-0 w-full h-full object-cover z-0"
/>


        {/* Optional Overlay: Adjust/remove as needed for readability */}
        <div className="absolute inset-0 w-full h-full bg-gradient-to-t from-black via-black/70 to-transparent z-0 pointer-events-none"></div>
        
        {/* Main Content */}
        <div className="relative z-10 max-w-7xl mx-auto py-8 px-4 md:px-8 text-start">
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-10 md:gap-6">
            {/* Company Section */}
            <div className="md:w-1/4 mb-8 md:mb-0">
              <div className="font-bold mb-3 text-lg">Company</div>
              <ul className="space-y-1 text-sm">
                {companyLinks.map(link => (
                  <li key={link}>
                    <a href="#" className="hover:text-orange-400">{link}</a>
                  </li>
                ))}
              </ul>
            </div>
            {/* Branches Section */}
            <div className="md:w-1/2 mb-8 md:mb-0 text-start">
              <div className="font-bold mb-3 text-lg">Branches</div>
              <ul className="space-y-2 text-xs">
                {branches.map(branch => (
                  <li key={branch.title}>
                    <div className="font-bold text-white mb-1">{branch.title}:</div>
                    {branch.addresses.map(addr => (
                      <div key={addr} className="ml-2 text-gray-300">{addr}</div>
                    ))}
                  </li>
                ))}
              </ul>
            </div>
            {/* Courses Section */}
            <div className="md:w-1/4 flex flex-row gap-4">
              <div>
                <div className="font-bold mb-3 text-lg">Courses</div>
                <ul className="space-y-1 text-xs text-start">
                  {coursesLeft.map(course => (
                    <li key={course}>{course}</li>
                  ))}
                </ul>
              </div>
              <div>
                <ul className="mt-9 space-y-1 text-xs text-start">
                  {coursesRight.map(course => (
                    <li key={course}>{course}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
          {/* Large Branding and Info */}
          <div className="mt-20 flex flex-col items-left ">
            <div className="text-2xl md:text-3xl font-semibold mb-2">
              Corporate training center LLP
            </div>
            <div className="text-xs md:text-base mb-4 text-center max-w-2xl">
              Address: Office No. 4-B, Second Floor, Ganesham Commercial -A, Survey No. 21/8-21/24, BRTS Road, Pimple Saudagar, Pune - 411027
            </div>
            <div className="flex flex-col gap-2 items-center md:flex-row md:gap-10 font-semibold">
              <span>
                Contact:
                <a href="tel:+919545450788" className="text-white hover:underline">+919545450788</a> /
                <a href="tel:+919545450677" className="text-orange-400 hover:underline">+919545450677</a>
              </span>
              <span>
                Email:
                <a href="mailto:nexusCTC2020@gmail.com" className="text-orange-400 hover:underline">nexusCTC2020@gmail.com</a>
              </span>
            </div>
            <div className="mt-5 text-gray-400 text-sm text-center">
              © 2025 All rights reserved Nexusctc.com
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
