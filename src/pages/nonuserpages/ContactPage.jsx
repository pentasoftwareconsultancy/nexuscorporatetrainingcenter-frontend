// import React, { useState } from "react";
// import { Mail, Phone, MapPin, ArrowUpRight } from "lucide-react";

// export default function ContactPage() {
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     phone: "",
//     message: "",
//   });

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     console.log("Form submitted:", formData);
//     alert("Form submitted successfully!");
//     setFormData({ name: "", email: "", phone: "", message: "" });
//   };

//   return (
//     <div className="min-h-screen bg-black text-white flex flex-col items-center mt-20 px-4 sm:px-6 md:px-10 lg:px-20">
//       {/* Spacer at the top */}
//       <div className="h-16 sm:h-20"></div>

//       {/* Background Title */}
//       <h1 className="text-[80px] sm:text-[120px] md:text-[160px] lg:text-[200px] font-bold text-white opacity-10 select-none text-center mb-[-60px] sm:mb-[-80px] md:mb-[-100px] z-10 leading-none">
//         Contact
//       </h1>

//       {/* Main Content */}
//       <div className="flex flex-col md:flex-row w-full max-w-6xl mt-10 bg-black">
//         {/* Left Section */}
//         <div className="md:w-1/2 w-full p-6 sm:p-8 md:p-10 flex flex-col justify-between relative">
//           {/* Get in Touch Section */}
//           <div className="mb-10 md:mb-16">
//             <h2 className="text-3xl sm:text-4xl font-semibold mb-4">Get in touch</h2>
//             <p className="text-gray-300 text-sm sm:text-base leading-relaxed max-w-md">
//               Have questions or ready to transform your career with{" "}
//               <span className="text-orange-500 font-medium">Nexus Corporate Training Center LLP</span>?
//               We're here to help you reach your goals.
//             </p>
//           </div>

//           {/* Contact Info */}
//           <div className="space-y-4">
//             {/* Email */}
//             <div className="flex items-center justify-between bg-gray-800 p-4 rounded-lg hover:bg-gray-700 transition border border-gray-600">
//               <div className="flex items-center flex-wrap gap-2">
//                 <Mail className="w-9 h-9 p-1 border-2 border-gray-500 rounded-lg" />
//                 <span className="text-sm sm:text-base break-all">nexusCTC2020@gmail.com</span>
//               </div>
//               <div className="bg-gray-500 p-2 rounded-full">
//                 <ArrowUpRight className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
//               </div>
//             </div>

//             {/* Phone */}
//             <div className="flex items-center justify-between bg-gray-800 p-4 rounded-lg hover:bg-gray-700 transition border border-gray-600">
//               <div className="flex items-center flex-wrap gap-2">
//                 <Phone className="w-9 h-9 p-1 border-2 border-gray-500 rounded-lg" />
//                 <span className="text-sm sm:text-base">
//                   +91 9545450788 / +91 9545450677
//                 </span>
//               </div>
//               <div className="bg-gray-500 p-2 rounded-full">
//                 <ArrowUpRight className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
//               </div>
//             </div>

//             {/* Location */}
//             <div className="flex items-start justify-between bg-gray-800 p-4 rounded-lg hover:bg-gray-700 transition border border-gray-600">
//               <div className="flex items-start gap-2">
//                 <MapPin className="w-9 h-9 mt-1 p-1 border-2 border-gray-500 rounded-lg flex-shrink-0" />
//                 <span className="text-sm sm:text-base leading-relaxed">
//                   Office No. 4-B, Second Floor, Ganesham Commercial-A,<br />
//                   Survey No. 21/18-21/24, BRTS Road, Pimple Saudagar,<br />
//                   Pune - 411027
//                 </span>
//               </div>
//               <div className="bg-gray-500 p-2 rounded-full mt-1">
//                 <ArrowUpRight className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Right Section (Form) */}
//         <div className="md:w-1/2 w-full p-6 sm:p-8 md:p-10 flex items-center justify-center">
//           <form
//             onSubmit={handleSubmit}
//             className="bg-gray-900 p-6 sm:p-8 md:p-10 rounded-2xl shadow-lg w-full max-w-md"
//           >
//             <div className="space-y-5">
//               <input
//                 type="text"
//                 name="name"
//                 placeholder="Name"
//                 value={formData.name}
//                 onChange={handleChange}
//                 required
//                 className="w-full bg-gray-800 text-white placeholder-gray-400 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-500 text-sm sm:text-base"
//               />

//               <input
//                 type="email"
//                 name="email"
//                 placeholder="Email"
//                 value={formData.email}
//                 onChange={handleChange}
//                 required
//                 className="w-full bg-gray-800 text-white placeholder-gray-400 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-500 text-sm sm:text-base"
//               />

//               <input
//                 type="tel"
//                 name="phone"
//                 placeholder="Phone number"
//                 value={formData.phone}
//                 onChange={handleChange}
//                 required
//                 className="w-full bg-gray-800 text-white placeholder-gray-400 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-500 text-sm sm:text-base"
//               />

//               <textarea
//                 name="message"
//                 placeholder="Message"
//                 value={formData.message}
//                 onChange={handleChange}
//                 required
//                 rows="5"
//                 className="w-full bg-gray-800 text-white placeholder-gray-400 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-500 text-sm sm:text-base resize-none"
//               ></textarea>

//               <button
//                 type="submit"
//                 className="w-full bg-white text-black py-3 rounded-full font-semibold border-2 border-orange-500 shadow-inner shadow-gray-500/50 hover:bg-orange-500 hover:text-black transition-all duration-300 transform hover:scale-105 text-sm sm:text-base"
//               >
//                 Submit
//               </button>
//             </div>
//           </form>
//         </div>
//       </div>

//       {/* Spacer at the bottom */}
//       <div className="h-16 sm:h-20"></div>
//     </div>
//   );
// }


import React from "react";

export default function TermsAndConditions() {
  return (
    <section className="min-h-screen bg-black text-white flex items-start justify-start px-12 py-12">
      <div className="max-w-3xl text-left">
        <h1 className="text-4xl font-bold mb-6">Terms & Conditions</h1>
       
        <ul className="list-disc list-inside text-gray-300 space-y-2 mt-4">
          <li>Use the website only for lawful and legitimate purposes.</li>
          <li>Do not attempt to copy, modify, or redistribute any content.</li>
          <li>We are not responsible for any damages caused by misuse of the site.</li>
          <li>Your personal data will be handled as per our Privacy Policy.</li>
          <li>Unauthorized access to systems or data is strictly prohibited.</li>
          <li>We may update these terms at any time without prior notice.</li>
          <li>Continued use of the site implies acceptance of the latest terms.</li>
          <li>All intellectual property belongs to the rightful owners.</li>
          <li>Violation of these terms may result in account suspension.</li>
          <li>For any queries, contact us at support@example.com.</li>
        </ul>
      </div>
    </section>
  );
}
