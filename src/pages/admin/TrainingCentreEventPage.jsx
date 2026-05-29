import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ApiService from "../../core/services/api.service";
import ServerUrl from "../../core/constants/serverURL.constant";
import { ROUTES } from "../../core/constants/routes.constant";
import zeal1 from "../../assets/gallary/zeal1.avif";

const TrainingCentreEventPage = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const api = new ApiService();
  const navigate = useNavigate();

  const fetchEvents = async () => {
    try {
      setLoading(true);
      const res = await api.apiget(ServerUrl.API_TRAINING_CENTRE_EVENTS);
      const data = res?.data?.data || [];
      setEvents(data);
    } catch (err) {
      console.error("Training centre events fetch error", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const getThumbnail = (item) => {
    const firstImage = item.media?.find((m) => m.type === "image");
    if (firstImage) return firstImage.url;
    
    // If no image but has video file/url, return a default play thumbnail or zeal1
    return zeal1;
  };

  return (
    <div className="w-full px-6">
      {loading ? (
        <p className="text-white mt-6">Loading…</p>
      ) : events.length === 0 ? (
        <p className="text-gray-400 mt-6">No training centre events found. Click + to add one.</p>
      ) : (
        <div className="grid mt-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {events.map((item) => (
            <div
              key={item.id}
              onClick={() =>
                navigate(
                  ROUTES.ADMIN_TRAINING_CENTRE_EVENT_EDIT.replace(":id", item.id),
                  { state: { mode: "edit" } }
                )
              }
              className="text-white border border-gray-600 rounded-3xl p-4 cursor-pointer hover:scale-[1.02] transition bg-black/40 backdrop-blur-md"
            >
              <div className="overflow-hidden rounded-2xl aspect-video relative bg-black/60">
                <img
                  src={getThumbnail(item)}
                  alt={item.title}
                  className="w-full h-full object-cover"
                />
                {!item.media?.find((m) => m.type === "image") && item.media?.find((m) => m.type === "video") && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                    <span className="bg-orange-500/80 p-2 rounded-full text-white text-xs">Video Event</span>
                  </div>
                )}
              </div>

              <div className="mt-4 text-sm space-y-1">
                <p className="text-base font-semibold text-orange-400 truncate">{item.title}</p>
                <p className="text-gray-300 truncate"><b>Date:</b> {item.date ? new Date(item.date).toLocaleDateString() : "N/A"}</p>
                <p className="text-gray-300 truncate"><b>Location:</b> {item.location || "N/A"}</p>
                {item.media && (
                  <p className="text-gray-400 text-xs">
                    {item.media.filter(m => m.type === 'image').length} Images • {item.media.filter(m => m.type === 'video').length} Videos
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      <button
        onClick={() =>
          navigate(ROUTES.ADMIN_TRAINING_CENTRE_EVENT_ADD, {
            state: { mode: "add" },
          })
        }
        className="fixed right-10 bottom-10 w-14 h-14 bg-one text-black text-3xl rounded-full hover:scale-110 active:scale-95 duration-200 shadow-xl"
      >
        +
      </button>
    </div>
  );
};

export default TrainingCentreEventPage;
