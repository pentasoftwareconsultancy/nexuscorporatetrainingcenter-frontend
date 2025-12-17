import React, { useEffect, useState } from "react";
import Gallerydata from "../../assets/tarushri/GallleryEventData.json";
import { useNavigate } from "react-router-dom";
import AdminGallery from "../../assets/tarushri/Admingallery.json";
import ApiService from "../../core/services/api.service";
import ServerUrl from "../../core/constants/serverURL.constant";
import { ROUTES } from "../../core/constants/routes.constant";

const GalleryEventPage = () => {
  const [colleges, setColleges] = useState([]);
  const [eventStories, setEventStories] = useState([]);
  const [loading, setLoading] = useState(true);
  const api = new ApiService();
  const navigate = useNavigate();
  const [active, setActive] = useState("colleges");

  const fetchGalleryData = async () => {
    try {
      setLoading(true);

      // 1️⃣ Get all cities
      const cityRes = await api.apiget(ServerUrl.API_GET_CITIES);
      const cities = cityRes?.data?.data || [];

      let allColleges = [];

      // 2️⃣ Get colleges from ALL cities
      for (const city of cities) {
        const collegeRes = await api.apiget(
          ServerUrl.API_GET_COLLEGES_BY_CITY + city.id
        );

        const colleges = collegeRes?.data?.data || [];

        // attach city info
        const enriched = colleges.map((c) => ({
          ...c,
          cityId: city.id,
          cityName: city.name,
        }));

        allColleges.push(...enriched);
      }

      // 3️⃣ Get images for each college
      const withImages = await Promise.all(
        allColleges.map(async (college) => {
          try {
            const imgRes = await api.apiget(
              ServerUrl.API_GET_IMAGES_BY_COLLEGE + college.id
            );

            return {
              ...college,
              images: imgRes?.data?.data || [],
            };
          } catch {
            return { ...college, images: [] };
          }
        })
      );

      // 4️⃣ Get event stories (already works)
      const storiesRes = await api.apiget(ServerUrl.API_GET_EVENTSTORIES);

      setColleges(withImages);
      setEventStories(storiesRes?.data?.data || []);
    } catch (err) {
      console.error("Admin gallery fetch error", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGalleryData();
  }, []);

  const openAlbum = (id) => {
    navigate(`/Admingallery/${id}`);
  };

  const categoryData = active === "eventstories" ? eventStories : [];

  return (
    <div className="w-full px-4 sm:px-6 lg:px-6">
      <div className="max-w-[1600px] mx-auto">
        {/* Header */}
        <div className="Gallery mt-8">
          <h1 className="text-2xl sm:text-3xl font-semibold text-white">
            Gallery
          </h1>
        </div>

        {/* Buttons */}
        <div className="border border-gray-400 rounded-full p-1 w-fit mt-5">
          <button
            onClick={() => setActive("colleges")}
            className={`px-4 sm:px-6 py-2 rounded-full text-white text-sm sm:text-base 
            ${active === "colleges" ? "bg-five" : "bg-transparent"}`}
          >
            Colleges
          </button>

          <button
            onClick={() => setActive("eventstories")}
            className={`px-4 sm:px-6 py-2 rounded-full text-white text-sm sm:text-base 
            ${active === "eventstories" ? "bg-five" : "bg-transparent"}`}
          >
            Event stories
          </button>
        </div>

        {/* ------------------------ EVENT CARDS (Works Already) ------------------------ */}
        {active === "eventstories" && (
          <div className="Card mt-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {categoryData.map((item) => (
                <div
                  key={item.id}
                  onClick={() => navigate(ROUTES.ADMIN_EVENT_DETAIL_EDIT.replace(":id", item.id), {
                      state: { mode: "edit", type: "eventstory" },
                    })
                  }
                  className="text-white border border-gray-600 rounded-3xl p-4 cursor-pointer hover:scale-[1.02] transition-transform"
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
                    <p>
                      <span className="font-semibold">Event name: </span>
                      {item.eventName}
                    </p>
                    <p>
                      <span className="font-semibold">Date: </span>
                      {item.date}
                    </p>
                    <p>
                      <span className="font-semibold">Location: </span>
                      {item.location}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ------------------------ COLLEGE GALLERY (YOUR ISSUE FIXED) ------------------------ */}
        {active === "colleges" && (
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-12">
            {colleges.map((album) => (
              <div
                key={album.id}
                onClick={() => navigate(ROUTES.ADMIN_EVENT_DETAIL_EDIT.replace(":id", album.id), {
                    state: { mode: "edit", type: "college" },
                  })
                }
                className="cursor-pointer group w-full"
              >
                <div className="relative w-full aspect-square transition-all duration-500 group-hover:scale-105">
                  <img
                    src={album.images?.[2]?.url}
                    className="absolute top-0 left-[10%] w-full h-full object-cover rounded-xl opacity-60 grayscale"
                  />

                  <img
                    src={album.images?.[1]?.url}
                    className="absolute top-0 left-[5%] w-full h-full object-cover rounded-xl opacity-80 grayscale"
                  />

                  <img
                    src={album.images?.[0]?.url}
                    className="absolute top-0 left-0 w-full h-full object-cover rounded-xl"
                  />
                </div>

                <p className="mt-4 text-lg font-semibold text-white">
                  {album.name}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
      <button
        onClick={() =>
          navigate(ROUTES.ADMIN_EVENT_DETAIL_ADD, {
            state: {
              mode: "add",
              type: active === "colleges" ? "college" : "eventstory",
            },
          })
        }
        className="fixed right-10 bottom-10 z-[9999] pointer-events-auto
                   w-14 h-14 bg-one text-black text-3xl rounded-full font-bold shadow-lg"
      >
        +
      </button>
    </div>
  );
};

export default GalleryEventPage;
