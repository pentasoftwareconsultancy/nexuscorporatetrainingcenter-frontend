
import React from 'react'
import Gallerydata from '../../assets/tarushri/GallleryEventData.json';
import { useState } from 'react';
import { useNavigate } from "react-router-dom";




const GalleryEventPage = () => {
  const navigate = useNavigate();

  const [active, setActive] = useState("colleges");

  const categoryData = active === "colleges" ? Gallerydata.colleges : Gallerydata.eventstories;



  return (
    <div className="w-full px-4 sm:px-6 lg:px-12">
      <div className="max-w-[1600px] mx-auto">

        {/* Header */}
        <div className="Gallery mt-8">
          <h1 className="text-2xl sm:text-3xl font-semibold text-white">Gallery</h1>
        </div>

        {/* Buttons */}
        <div className="border border-gray-400 rounded-full p-1 w-fit mt-5">
          <button className="text-white px-4 sm:px-6 py-2 rounded-full bg-black hover:bg-gray-900 transition-all text-sm sm:text-base">
            Colleges
          </button>

          <button
            onClick={() => setActive("eventstories")}
            className={`px-4 sm:px-6 py-2 rounded-full hover:bg-gray-900 transition-all text-sm sm:text-base text-white ${active === "eventstories" ? "bg-black" : "bg-transparent"
              }`}
          >
            Event stories
          </button>
        </div>

        {/* Cards */}
        <div className="Card mt-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">

            {categoryData.map((item) => (
              <div
                key={item.id}
                onClick={() => navigate(`/eventdetail/${item.id}`)}
                className="bg-black text-white border border-gray-600 rounded-3xl p-4 cursor-pointer hover:scale-[1.02] transition-transform"
              >
                {/* Image */}
                <div className="overflow-hidden rounded-2xl">
                  <img
                    src={item.image}
                    alt={item.eventName}
                    className="w-full h-40 sm:h-48 md:h-56 object-cover"
                  />
                </div>

                {/* Details */}
                <div className="mt-4 space-y-1 text-sm sm:text-base">
                  <p><span className="font-semibold">Event name: </span>{item.eventName}</p>
                  <p><span className="font-semibold">Date: </span>{item.date}</p>
                  <p><span className="font-semibold">Location: </span>{item.location}</p>
                </div>
              </div>
            ))}

          </div>
        </div>

      </div>
    </div>

  )
}

export default GalleryEventPage