import React, { useState } from "react";
import { Mail, Phone, MapPin, ArrowUpRight } from "lucide-react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Form submitted successfully!");
    setFormData({ name: "", email: "", phone: "", message: "" });
  };

  return (
    <div className="min-h-screen text-white flex flex-col items-center mt-20 px-4 sm:px-6 md:px-10 lg:px-20 font-[Poppins] overflow-hidden">

      <div className="absolute top-0 left-0 w-full h-[300px] bg-gradient-to-b from-orange-400/50 to-transparent blur-2xl z-0"></div>

      <h1 className="text-[100px] sm:text-[140px] md:text-[180px] lg:text-[200px] font-bold text-orange-600 opacity-10 select-none text-center mb-[-60px] sm:mb-[-80px] md:mb-[-100px] z-10 leading-none">
        Contact
      </h1>

      <div className="flex flex-col md:flex-row w-full max-w-6xl mt-10 relative z-10 gap-10 md:gap-5">
 
         <div className="md:w-[45%] w-full mt-6 md:mt-10 p-4 sm:p-5 md:p-6 flex flex-col justify-start">

          <div className="mt-4 mb-4 text-center md:text-left">
            <h2 className="text-2xl sm:text-3xl font-semibold mb-1 text-white">
              Get in touch
            </h2>
            <p className="text-gray-300 text-[13px] sm:text-sm leading-relaxed max-w-sm mx-auto md:mx-0">
              Have questions or ready to transform your career with{" "}
              <span className="font-medium">
                Nexus Corporate Training Center LLP
              </span>
              ? We're here to help you reach your goals.
            </p>
          </div>

          <div className="flex flex-col space-y-3 w-full">

            <div className="flex items-center justify-between bg-[#1a1a1a] p-3 rounded-lg shadow-[0_1px_5px_rgba(0,0,0,0.5)] hover:shadow-[0_0_10px_rgba(255,102,0,0.25)] transition-all duration-300">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 flex items-center justify-center rounded-md bg-[#1a1a1a] shadow-[inset_0_0_6px_rgba(255,255,255,0.1)]">
                  <Mail className="w-3.5 h-3.5 text-gray-300" />
                </div>
                <span className="text-[12px] sm:text-[13px] text-gray-300 break-all">
                  nexusCTC2020@gmail.com
                </span>
              </div>
              <div className="w-6 h-6 flex items-center justify-center rounded-full shadow-[inset_0_0_6px_rgba(255,255,255,0.1)] transition">
                <ArrowUpRight className="w-3 h-3 text-white" />
              </div>
            </div>

            <div className="flex items-center justify-between bg-[#1a1a1a] p-3 rounded-lg shadow-[0_1px_5px_rgba(0,0,0,0.5)] hover:shadow-[0_0_10px_rgba(255,102,0,0.25)] transition-all duration-300">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 flex items-center justify-center rounded-md bg-[#1a1a1a] shadow-[inset_0_0_6px_rgba(255,255,255,0.1)]">
                  <Phone className="w-3.5 h-3.5 text-gray-300" />
                </div>
                <span className="text-[12px] sm:text-[13px] text-gray-300">
                  +91 9545450788 / +91 9545450677
                </span>
              </div>
              <div className="w-6 h-6 flex items-center justify-center rounded-full shadow-[inset_0_0_6px_rgba(255,255,255,0.1)] transition">
                <ArrowUpRight className="w-3 h-3 text-white" />
              </div>
            </div>

            <div className="flex items-start sm:items-center justify-between bg-[#1a1a1a] p-3 rounded-lg border border-[#2a2a2a] shadow-[0_1px_5px_rgba(0,0,0,0.5)] hover:shadow-[0_0_10px_rgba(255,102,0,0.25)] transition-all duration-300">
              <div className="flex items-start sm:items-center gap-3">
                <div className="w-8 h-8 flex items-center justify-center rounded-md bg-[#1a1a1a] shadow-[inset_0_0_6px_rgba(255,255,255,0.1)]">
                  <MapPin className="w-3.5 h-3.5 text-gray-300" />
                </div>
                <span className="text-[12px] sm:text-[13px] leading-relaxed text-gray-300">
                  Office No. 4-B, Second Floor, Ganesham Commercial-A, <br />
                  Survey No. 21/18–21/24, BRTS Road, Pimple Saudagar, <br />
                  Pune – 411027
                </span>
              </div>
              <div className="w-6 h-6 flex items-center justify-center rounded-full shadow-[inset_0_0_6px_rgba(255,255,255,0.1)] transition">
                <ArrowUpRight className="w-3 h-3 text-white" />
              </div>
            </div>
          </div>
        </div>

        <div className="md:w-1/2 w-full px-3 sm:px-2 md:px-3 py-3 flex items-center justify-center md:ml-12">
          <form
            onSubmit={handleSubmit}
            className="bg-[#181817] p-3 sm:p-4 rounded-2xl shadow-lg w-full max-w-md h-auto md:h-[400px]"
          >
            <div className="space-y-3">
              <input
                type="text"
                name="name"
                placeholder="Name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full bg-[#111111] text-white placeholder-gray-400 rounded-md px-4 py-2 sm:py-3 focus:outline-none focus:ring-2 focus:ring-orange-500 text-sm sm:text-base"
              />

              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full bg-[#111111] text-white placeholder-gray-400 rounded-md px-4 py-2 sm:py-3 focus:outline-none focus:ring-2 focus:ring-orange-500 text-sm sm:text-base"
              />

              <input
                type="tel"
                name="phone"
                placeholder="Phone number"
                value={formData.phone}
                onChange={handleChange}
                required
                className="w-full bg-[#111111] text-white placeholder-gray-400 rounded-md px-4 py-2 sm:py-3 focus:outline-none focus:ring-2 focus:ring-orange-500 text-sm sm:text-base"
              />

              <textarea
                name="message"
                placeholder="Message"
                value={formData.message}
                onChange={handleChange}
                required
                rows="5"
                className="w-full bg-[#111111] text-white placeholder-gray-400 rounded-md px-4 py-2 sm:py-3 focus:outline-none focus:ring-2 focus:ring-orange-500 text-sm sm:text-base resize-none"
              ></textarea>

              <button
                type="submit"
                className="w-full h-7 sm:h-8 bg-gradient-to-r from-[#ffffff] to-[#f5b37a] text-black text-center rounded-full font-semibold shadow-inner hover:from-orange-500 hover:to-[#ff9966] hover:text-black transition-all duration-300 transform hover:scale-105 text-sm sm:text-base"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Divider Line */}
      <div
        className="w-full h-[1px] sm:h-[2px] my-8 lg:my-12"
        style={{
          background:
            "linear-gradient(90deg, #030e4e 0%, #b9b4b4 50%, #030e4e 100%)",
        }}
      />

      <section className="relative w-screen">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-1 translate-x-2">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-white mb-6 text-center md:text-left">
            Terms & Conditions
          </h2>
          <ul className="list-disc list-inside text-gray-300 space-y-3 leading-relaxed text-sm sm:text-base">
            <li>The fees will be non-refundable and non-transferable.</li>
            <li>Batch or course change is not allowed.</li>
            <li>Nexus provides corporate-level training.</li>
            <li>Training will be provided according to the specified syllabus only.</li>
            <li>Course materials are proprietary and should not be distributed.</li>
            <li>Candidates will receive interview calls from different job portals.</li>
            <li>
              For any queries, contact us at{" "}
              <span className="">support@example.com</span>.
            </li>
          </ul>
        </div>
      </section>

      <div className="h-20"></div>
    </div>
  );
}
