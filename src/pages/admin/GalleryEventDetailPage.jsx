
import React from 'react'
import { useParams } from "react-router-dom";
import Gallerydata from '../../assets/tarushri/GallleryEventData.json';


const GalleryEventDetailPage = () => {

  const { id } = useParams();
  const allEvents = [...Gallerydata.colleges, ...Gallerydata.eventstories];

  const event = allEvents.find(item => item.id === Number(id));

  if (!event) {
    return <h1 className="text-white p-5">Event not found</h1>
  }

  return (

    <div className="w-full px-4 sm:px-6 lg:px-12">
      <div className="max-w-[1600px] mx-auto">

        {/* Heading */}
        <div className="Gallery mt-10">
          <h1 className="text-2xl sm:text-3xl text-white font-semibold">Gallery</h1>
        </div>

        {/* Buttons */}
        <div className="border border-gray-400 rounded-full p-1 w-fit mt-5">
          <button className="text-white px-4 sm:px-6 py-2 rounded-full bg-black hover:bg-gray-900 transition-all text-sm sm:text-base">
            Colleges
          </button>

          <button className="text-white px-4 sm:px-6 py-2 rounded-full bg-black hover:bg-gray-900 transition-all text-sm sm:text-base">
            Event stories
          </button>
        </div>

        {/*================== Input Fields ============================= */}

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 text-white mt-8">

          {/* Event Name */}
          <div className="flex flex-col">
            <label className="text-sm font-semibold mb-1">Event name</label>
            <input
              type="text"
              placeholder="Mrs. Sneha"
              value={event.eventName}
              className="bg-transparent border border-gray-500 rounded-lg px-3 py-2 outline-none focus:border-white transition"
            />
          </div>

          {/* Date */}
          <div className="flex flex-col">
            <label className="text-sm font-semibold mb-1">Date</label>
            <input
              type="text"
              placeholder="2 October"
              value={event.date}
              className="bg-transparent border border-gray-500 rounded-lg px-3 py-2 outline-none focus:border-white transition"
            />
          </div>

          {/* Location */}
          <div className="flex flex-col">
            <label className="text-sm font-semibold mb-1">Location</label>
            <input
              type="text"
              placeholder="Pune"
              value={event.location}
              className="bg-transparent border border-gray-500 rounded-lg px-3 py-2 outline-none focus:border-white transition"
            />
          </div>

        </div>

        {/* Images Section */}
        <div className="Images mt-10">
          <h1 className="text-white text-lg sm:text-xl font-semibold mb-3">Images</h1>

          <div className="w-full sm:w-[90%] md:w-[80%] lg:w-[60%] rounded-xl p-3">
            <img
              src={event.image}
              className="sm:h-40 md:h-40  w-50  object-cover rounded-lg"
            />
          </div>
        </div>

      </div>
    </div>

  )
}

export default GalleryEventDetailPage