import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ApiService from "../../core/services/api.service";
import ServerUrl from "../../core/constants/serverURL.constant";
import { ROUTES } from "../../core/constants/routes.constant";

import zeal1 from "../../assets/gallary/zeal1.avif";
import govtpoly1 from "../../assets/gallary/govtpoly1.avif";
import akola1 from "../../assets/gallary/akolaclg/Screenshot (81) 5.avif";

const GalleryEventPage = () => {
  const [eventStories, setEventStories] = useState([]);
  const [loading, setLoading] = useState(true);
  const api = new ApiService();
  const navigate = useNavigate();

  const fetchEvents = async () => {
    try {
      setLoading(true);
      const res = await api.apiget(ServerUrl.API_GET_EVENTSTORIES);
      const data = res?.data?.data || [];
      
      const enrichedData = data.map((item) => {
        let imgToUse = item.image;
        if (typeof imgToUse !== "string" || !imgToUse.startsWith("http")) {
          if (item.eventName === "Zeal College Event" || imgToUse === "zeal1") imgToUse = zeal1;
          else if (item.eventName === "Government College Event" || imgToUse === "govtpoly1") imgToUse = govtpoly1;
          else if (item.eventName === "Akola College Event" || imgToUse === "akola1") imgToUse = akola1;
          else imgToUse = zeal1;
        }
        return {
          ...item,
          image: imgToUse
        };
      });

      setEventStories(enrichedData);
    } catch (err) {
      console.error("Event gallery fetch error", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  return (
    <div className="w-full px-6">

      {loading ? (
        <p className="text-white mt-6">Loading…</p>
      ) : (
        <div className="grid mt-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {eventStories.map((item) => (
            <div
              key={item.id}
              onClick={() =>
                navigate(
                  ROUTES.ADMIN_EVENT_DETAIL_EDIT.replace(":id", item.id),
                  { state: { mode: "edit", type: "eventstory" } }
                )
              }
              className="text-white border border-gray-600 rounded-3xl p-4 cursor-pointer hover:scale-[1.02] transition"
            >
              <div className="overflow-hidden rounded-2xl">
                <img
                  src={item.image}
                  alt={item.eventName}
                  className="w-full h-48 object-cover"
                />
              </div>

              <div className="mt-4 text-sm">
                <p><b>Event:</b> {item.eventName}</p>
                <p><b>Date:</b> {item.date}</p>
                <p><b>Location:</b> {item.location}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      <button
        onClick={() =>
          navigate(ROUTES.ADMIN_EVENT_DETAIL_ADD, {
            state: { mode: "add", type: "eventstory" },
          })
        }
        className="fixed right-10 bottom-10 w-14 h-14 bg-one text-black text-3xl rounded-full"
      >
        +
      </button>
    </div>
  );
};

export default GalleryEventPage;
