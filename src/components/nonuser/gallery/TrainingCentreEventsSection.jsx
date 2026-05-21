import React, { useEffect, useState } from "react";
import { X, Play, Image as ImageIcon, Film, MapPin, Calendar } from "lucide-react";
import ApiService from "../../../core/services/api.service";
import ServerUrl from "../../../core/constants/serverURL.constant";
import zeal1 from "../../../assets/gallary/zeal1.jpeg";

export default function TrainingCentreEventsSection() {
  const api = new ApiService();

  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [activeTab, setActiveTab] = useState("all"); // all, images, videos
  const [fullScreenImage, setFullScreenImage] = useState(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setLoading(true);
        const res = await api.apiget(ServerUrl.API_TRAINING_CENTRE_EVENTS);
        setEvents(res?.data?.data || []);
      } catch (err) {
        console.error("Failed to fetch training centre events:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  const getThumbnail = (item) => {
    const firstImage = item.media?.find((m) => m.type === "image");
    if (firstImage) return firstImage.url;
    return zeal1; // Fallback
  };

  const getEmbedUrl = (url) => {
    if (!url) return "";
    let embedUrl = url;
    if (url.includes("youtube.com/watch?v=")) {
      const videoId = url.split("v=")[1]?.split("&")[0];
      embedUrl = `https://www.youtube.com/embed/${videoId}`;
    } else if (url.includes("youtu.be/")) {
      const videoId = url.split("youtu.be/")[1]?.split("?")[0];
      embedUrl = `https://www.youtube.com/embed/${videoId}`;
    } else if (url.includes("vimeo.com/")) {
      const videoId = url.split("vimeo.com/")[1]?.split("?")[0];
      embedUrl = `https://player.vimeo.com/video/${videoId}`;
    }
    return embedUrl;
  };

  const filteredMedia = () => {
    if (!selectedEvent || !selectedEvent.media) return [];
    if (activeTab === "images") {
      return selectedEvent.media.filter((m) => m.type === "image");
    }
    if (activeTab === "videos") {
      return selectedEvent.media.filter((m) => m.type === "video");
    }
    return selectedEvent.media;
  };

  return (
    <div className="relative w-full text-white py-12 px-12 border-t border-gray-800 bg-black/10">
      {/* Title */}
      <div className="max-w-[2400px] mx-auto mb-10">
        <h2 className="text-start text-2xl sm:text-3xl md:text-5xl font-extrabold mb-4 tracking-wide">
          Training Centre Events
        </h2>
        <p className="text-gray-300 text-sm md:text-base max-w-4xl leading-relaxed">
          Take a look at the latest happenings, training workshops, bootcamps, and events at our training centre. Browse through high-quality photos and video sessions of our learners in action.
        </p>
      </div>

      {loading ? (
        <div className="max-w-[2400px] mx-auto text-gray-400">Loading events...</div>
      ) : events.length === 0 ? (
        <div className="max-w-[2400px] mx-auto text-gray-500 py-10">
          No training centre events posted yet. Check back soon!
        </div>
      ) : (
        <div className="grid gap-8 w-full max-w-[2400px] mx-auto grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
          {events.map((event) => {
            const imageCount = event.media?.filter((m) => m.type === "image").length || 0;
            const videoCount = event.media?.filter((m) => m.type === "video").length || 0;

            return (
              <div
                key={event.id}
                onClick={() => {
                  setSelectedEvent(event);
                  setActiveTab("all");
                }}
                className="bg-zinc-900/60 backdrop-blur-md border border-zinc-800 rounded-3xl overflow-hidden cursor-pointer group hover:border-orange-500/50 hover:scale-[1.02] transition-all duration-300 flex flex-col justify-between"
              >
                <div className="relative aspect-video overflow-hidden w-full bg-black">
                  <img
                    src={getThumbnail(event)}
                    alt={event.title}
                    className="w-full h-full object-cover group-hover:scale-105 duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60"></div>
                  
                  {/* Media Count Badge */}
                  <div className="absolute bottom-3 right-3 flex gap-2">
                    {imageCount > 0 && (
                      <span className="flex items-center gap-1 bg-black/70 text-xs px-2.5 py-1 rounded-full text-gray-200">
                        <ImageIcon size={12} /> {imageCount}
                      </span>
                    )}
                    {videoCount > 0 && (
                      <span className="flex items-center gap-1 bg-orange-500/90 text-xs px-2.5 py-1 rounded-full text-black font-semibold">
                        <Film size={12} /> {videoCount}
                      </span>
                    )}
                  </div>
                </div>

                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-xl font-bold text-gray-100 group-hover:text-orange-400 transition-colors duration-200 line-clamp-1 mb-2">
                      {event.title}
                    </h3>
                    <p className="text-gray-400 text-sm line-clamp-3 mb-4 leading-relaxed">
                      {event.description}
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-y-2 justify-between items-center text-xs text-gray-500 border-t border-zinc-800/80 pt-3">
                    {event.date && (
                      <span className="flex items-center gap-1">
                        <Calendar size={12} className="text-orange-400/80" />
                        {new Date(event.date).toLocaleDateString(undefined, {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })}
                      </span>
                    )}
                    {event.location && (
                      <span className="flex items-center gap-1">
                        <MapPin size={12} className="text-orange-400/80" />
                        {event.location}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* LIGHTBOX MODAL FOR EVENT DETAILS */}
      {selectedEvent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 sm:p-8 animate-in fade-in duration-300">
          <div className="relative w-full max-w-6xl h-full max-h-[90vh] flex flex-col bg-zinc-950 border border-zinc-800 rounded-3xl overflow-hidden shadow-2xl">
            {/* Header */}
            <div className="flex justify-between items-start p-6 border-b border-zinc-900 bg-zinc-900/30">
              <div>
                <h3 className="text-2xl font-bold text-orange-400 mb-1">{selectedEvent.title}</h3>
                <div className="flex gap-4 text-xs text-gray-400">
                  {selectedEvent.date && (
                    <span className="flex items-center gap-1">
                      <Calendar size={12} /> {new Date(selectedEvent.date).toLocaleDateString()}
                    </span>
                  )}
                  {selectedEvent.location && (
                    <span className="flex items-center gap-1">
                      <MapPin size={12} /> {selectedEvent.location}
                    </span>
                  )}
                </div>
              </div>
              <button
                onClick={() => setSelectedEvent(null)}
                className="p-2 hover:bg-zinc-800 text-gray-400 hover:text-white rounded-full transition-all duration-200 border border-zinc-800 bg-zinc-900"
              >
                <X size={20} />
              </button>
            </div>

            {/* Event Description */}
            {selectedEvent.description && (
              <div className="px-6 py-4 bg-zinc-900/10 border-b border-zinc-900/50">
                <p className="text-gray-300 text-sm leading-relaxed">{selectedEvent.description}</p>
              </div>
            )}

            {/* Tab Selectors */}
            {selectedEvent.media?.length > 0 && (
              <div className="flex gap-4 px-6 py-3 border-b border-zinc-900/60 bg-zinc-900/5">
                <button
                  onClick={() => setActiveTab("all")}
                  className={`px-4 py-1.5 rounded-full text-xs font-semibold transition ${
                    activeTab === "all" ? "bg-orange-500 text-black" : "bg-zinc-900 text-gray-300 hover:bg-zinc-800"
                  }`}
                >
                  All Media ({selectedEvent.media.length})
                </button>
                {selectedEvent.media.filter((m) => m.type === "image").length > 0 && (
                  <button
                    onClick={() => setActiveTab("images")}
                    className={`px-4 py-1.5 rounded-full text-xs font-semibold transition ${
                      activeTab === "images" ? "bg-orange-500 text-black" : "bg-zinc-900 text-gray-300 hover:bg-zinc-800"
                    }`}
                  >
                    Images ({selectedEvent.media.filter((m) => m.type === "image").length})
                  </button>
                )}
                {selectedEvent.media.filter((m) => m.type === "video").length > 0 && (
                  <button
                    onClick={() => setActiveTab("videos")}
                    className={`px-4 py-1.5 rounded-full text-xs font-semibold transition ${
                      activeTab === "videos" ? "bg-orange-500 text-black" : "bg-zinc-900 text-gray-300 hover:bg-zinc-800"
                    }`}
                  >
                    Videos ({selectedEvent.media.filter((m) => m.type === "video").length})
                  </button>
                )}
              </div>
            )}

            {/* Media Gallery Grid */}
            <div className="flex-1 overflow-y-auto p-6 bg-zinc-950">
              {filteredMedia().length === 0 ? (
                <div className="text-center py-12 text-zinc-500">No media files matching the tab selector.</div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                  {filteredMedia().map((media) => {
                    if (media.type === "image") {
                      return (
                        <div
                          key={media.id}
                          className="relative aspect-video rounded-2xl overflow-hidden border border-zinc-800 bg-zinc-900 shadow-md group cursor-pointer"
                          onClick={() => setFullScreenImage(media.url)}
                        >
                          <img
                            src={media.url}
                            alt="Event details"
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                        </div>
                      );
                    } else if (media.type === "video") {
                      const isEmbed =
                        media.url.includes("youtube.com") ||
                        media.url.includes("youtu.be") ||
                        media.url.includes("vimeo.com");

                      return (
                        <div
                          key={media.id}
                          className="relative aspect-video rounded-2xl overflow-hidden border border-zinc-800 bg-black shadow-md"
                        >
                          {isEmbed ? (
                            <iframe
                              src={getEmbedUrl(media.url)}
                              className="w-full h-full"
                              title="Event Video Link"
                              allowFullScreen
                            ></iframe>
                          ) : (
                            <video src={media.url} controls className="w-full h-full object-cover" />
                          )}
                        </div>
                      );
                    }
                    return null;
                  })}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* FULL SCREEN LIGHTBOX FOR IMAGES */}
      {fullScreenImage && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 p-4 animate-in fade-in duration-300"
          onClick={() => setFullScreenImage(null)}
        >
          <button
            className="absolute top-6 right-6 p-2 bg-white/10 hover:bg-white/20 rounded-full transition-colors text-white"
            onClick={(e) => {
              e.stopPropagation();
              setFullScreenImage(null);
            }}
          >
            <X size={32} />
          </button>

          <div className="relative max-w-7xl max-h-[90vh] flex items-center justify-center" onClick={(e) => e.stopPropagation()}>
            <img
              src={fullScreenImage}
              alt="Full view"
              className="max-w-full max-h-[90vh] object-contain rounded-lg shadow-2xl border border-white/10"
            />
          </div>
        </div>
      )}
    </div>
  );
}
