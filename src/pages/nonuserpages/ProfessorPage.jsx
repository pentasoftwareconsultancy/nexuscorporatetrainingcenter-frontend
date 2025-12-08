import React from "react";
import abhitjitImg from "../../assets/vaishnavi/abhijeet.png"; // <-- Correct image import

// Faculty data
const faculty = [
  {
    name: "Aditi Khade",
    designation: "Executive Trainer",
    experience: "6 Years of corporate & training experience",
    specialization: "Specialized in grooming & website training",
    img: abhitjitImg,
  },
];

// Duplicate data
const facultyList = Array(18).fill(faculty[0]);

export default function FacultyPage() {
  return (
    <div className="min-h-screen bg-black text-white p-10">
      <h1 className="text-4xl font-bold mb-10">Our Faculty</h1>

      {/* 5 cards per row on large screens */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
        {facultyList.map((fac, index) => (
          <div
            key={index}
            className="bg-[#111] rounded-2xl p-5 shadow-lg hover:scale-105 transition duration-300"
          >
            <img
              src={fac.img}
              alt={fac.name}
              className="w-full h-52 object-cover rounded-xl mb-4"
            />

            <h2 className="text-xl font-semibold">{fac.name}</h2>

            <p className="text-sm text-gray-400 mt-2">{fac.designation}</p>
            <p className="text-sm text-gray-400">{fac.experience}</p>
            <p className="text-sm text-gray-400">{fac.specialization}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
