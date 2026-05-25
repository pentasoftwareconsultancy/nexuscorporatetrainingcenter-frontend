import React, { useState } from "react";
import GalleryEventPage from "./GalleryEventPage";
import GalleryCollegePage from "./GalleryCollegePage";
import TrainingCentreEventPage from "./TrainingCentreEventPage";

const GalleryForm = () => {
  const [active, setActive] = useState("college");   // 👈 default selected

  return (
    <div className="w-full px-6 text-white">
      <h1 className="text-3xl">Gallery</h1>

      {/* Selector */}
      <div className="flex mt-6 border border-gray-500 rounded-4xl w-max">
        <button
          onClick={() => setActive("college")}
          className={`px-6 py-3 rounded-4xl 
          ${active === "college" ? "bg-five border border-gray-500" : "bg-transparent"}`}
        >
          Colleges
        </button>
        <button
          onClick={() => setActive("event")}
          className={`px-6 py-3 rounded-4xl 
          ${active === "event" ? "bg-five border border-gray-500" : "bg-transparent"}`}
        >
          Event Stories
        </button>
        <button
          onClick={() => setActive("trainingCentre")}
          className={`px-6 py-3 rounded-4xl 
          ${active === "trainingCentre" ? "bg-five border border-gray-500" : "bg-transparent"}`}
        >
          Training Centre Events
        </button>
      </div>

      {/* Renderer */}
      <div className="mt-6">
        {active === "event" && <GalleryEventPage />}
        {active === "college" && <GalleryCollegePage />}
        {active === "trainingCentre" && <TrainingCentreEventPage />}
      </div>
    </div>
  );
};

export default GalleryForm;
