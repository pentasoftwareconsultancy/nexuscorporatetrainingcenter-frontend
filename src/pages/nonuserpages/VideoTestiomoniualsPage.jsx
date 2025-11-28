import React, { useEffect, useState } from "react";
import data from "../../assets/sneha/json/Video.json"

const VideoTestiomoniualsPage = () => {
  const [videos, setVideos] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [currentVideo, setCurrentVideo] = useState(null);

  useEffect(() => {
    setVideos(data.videos);
  }, []);

  // Open popup with selected video
  const openPopup = (video) => {
    setCurrentVideo(video);
    setShowPopup(true);
  };

  // Close popup
  const closePopup = () => {
    setCurrentVideo(null);
    setShowPopup(false);
  };

  // Play a random video
  const playRandomVideo = () => {
    const randomIndex = Math.floor(Math.random() * videos.length);
    setCurrentVideo(videos[randomIndex]);
    setShowPopup(true);
  };

  return (
    <div className="px-12 pb-10  min-h-screen text-one">
      <h1 className="text-5xl md:text-5xl font-bold mb-10">Videos</h1>
     

      <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-8">
        {videos.map((item) => (
          <div
            key={item.id}
            className=" rounded-2xl shadow-lg overflow-hidden flex flex-col cursor-pointer"
            onClick={() => openPopup(item)}
          >
            {/* Thumbnail */}
            <div className="relative w-full h-100">
              <img
                src={item.thumbnail}
                alt={item.caption}
                className="w-full h-full object-cover"
              />
              <button className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <span className="bg-white/80 text-black font-bold p-4 rounded-full text-xl shadow">
                  ▶
                </span>
              </button>
            </div>

            {/* Text Area */}
            <div className="p-5 flex flex-col flex-grow">
              <p className="mt-2 text-base leading-relaxed">
                <span className="font-bold text-2xl">Caption: </span>
                {item.caption}
              </p>

              <p className="mt-1 text-base leading-relaxed text-gray-300">
                <span className="font-bold text-2xl text-gray-200">About: </span>
                {item.about}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Popup */}
      {showPopup && currentVideo && (
        <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50">
          <div className="relative w-full max-w-7xl h-[80vh]">
            {/* Close button */}
            <button
              onClick={closePopup}
              className="absolute top-4 right-4 text-white text-3xl font-bold z-50"
            >
              ×
            </button>

            {/* Video iframe */}
            <iframe
              src={currentVideo.videoUrl}
              title={currentVideo.caption}
              className="w-full h-full"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      )}
    </div>
  );
};

export default VideoTestiomoniualsPage;
