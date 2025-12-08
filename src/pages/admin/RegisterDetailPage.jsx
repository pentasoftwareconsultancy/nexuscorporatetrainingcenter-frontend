// src/pages/UserProfile.jsx
import React, { useState } from "react";
import { Pencil, Trash2, Plus, LogOut } from "lucide-react";

export default function RegisterDetailPage() {
  const [formData, setFormData] = useState({
    courseName: "Data Science",
    courseDuration: "3 months",
    email: "Vaishnavi@gmail.com",
    phone: "1234567890",
    reason: "Enquiry",
    message: "Your message here...",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white flex">

      {/* Main Content */}
      <main className="flex-1 p-10">
        
        {/* Header */}
        <div className="flex justify-between items-start">
          <h2 className="text-3xl font-semibold">Vaishh Gopale</h2>

          <div className="flex gap-3">
            <button className="bg-gray-800 p-3 rounded-full hover:bg-gray-700">
              <Pencil size={18} />
            </button>
            <button className="bg-gray-800 p-3 rounded-full hover:bg-gray-700">
              <Trash2 size={18} />
            </button>
          </div>
        </div>

        {/* FORM GRID */}
        <div className="mt-8">

          {/* ROW 1 – 4 columns */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">

            {/* Course Name */}
            <div className="flex flex-col">
              <label className="mb-1 text-sm text-gray-300">Course Name</label>
              <input
                type="text"
                name="courseName"
                value={formData.courseName}
                onChange={handleChange}
                className="bg-[#1C1C1C] border border-gray-700 rounded-lg p-3 text-white"
              />
            </div>

            {/* Course Duration */}
            <div className="flex flex-col">
              <label className="mb-1 text-sm text-gray-300">Course Duration</label>
              <input
                type="text"
                name="courseDuration"
                value={formData.courseDuration}
                onChange={handleChange}
                className="bg-[#1C1C1C] border border-gray-700 rounded-lg p-3 text-white"
              />
            </div>

            {/* Email */}
            <div className="flex flex-col">
              <label className="mb-1 text-sm text-gray-300">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="bg-[#1C1C1C] border border-gray-700 rounded-lg p-3 text-white"
              />
            </div>

            {/* Phone */}
            <div className="flex flex-col">
              <label className="mb-1 text-sm text-gray-300">Phone</label>
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="bg-[#1C1C1C] border border-gray-700 rounded-lg p-3 text-white"
              />
            </div>

          </div>

          {/* ROW 2 – 2 columns */}
          {/* ROW 2 – 4 columns with message spanning 3 columns */}
<div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-6">

  {/* Reason */}
  <div className="flex flex-col md:col-span-1">
    <label className="mb-1 text-sm text-gray-300">Reason</label>
    <input
      type="text"
      name="reason"
      value={formData.reason}
      onChange={handleChange}
      className="bg-[#1C1C1C] border border-gray-700 rounded-lg p-3 text-white"
    />
  </div>

  {/* Message – takes 3 columns */}
  <div className="flex flex-col md:col-span-3">
    <label className="mb-1 text-sm text-gray-300">Message</label>
    <textarea
      name="message"
      value={formData.message}
      onChange={handleChange}
      rows={5}
      className="bg-[#1C1C1C] border border-gray-700 rounded-lg p-3 text-white"
    />
  </div>

</div>


        </div>

        {/* Add Button */}
        <button className="fixed bottom-10 right-10 bg-orange-500 p-4 rounded-full hover:bg-orange-600 transition">
          <Plus size={24} />
        </button>
      </main>
    </div>
  );
}
