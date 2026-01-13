import { useEffect, useState } from "react";
import ApiService from "../../core/services/api.service";
import ServerUrl from "../../core/constants/serverURL.constant";
import { Search } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../core/constants/routes.constant";

export default function AdminVideoDashboard() {
  const api = new ApiService();
  const navigate = useNavigate();

  const [videos, setVideos] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const fetchVideos = async () => {
    try {
      const res = await api.apiget(ServerUrl.API_GET_VIDEOS);
      const list = res?.data?.data || [];

      const formatted = list.map((v) => ({
        id: v.video_id,
        caption: v.caption,
        about: v.about,
        thumbnail: v.image,
        videoUrl: v.videoUrl,
      }));

      setVideos(formatted);
    } catch (err) {
      console.error("VIDEO FETCH ERROR:", err);
    }
  };

  useEffect(() => {
    fetchVideos();
  }, []);

  const truncate = (t) =>
    !t ? "" : t.length > 30 ? t.substring(0, 30) + "......" : t;

  const finalResult = videos.filter((v) => {
    const text = searchQuery.toLowerCase();
    return (
      v.caption?.toLowerCase().includes(text) ||
      v.about?.toLowerCase().includes(text) ||
      v.videoUrl?.toLowerCase().includes(text)
    );
  });

  return (
    <div className="min-h-screen p-4 md:p-8 text-one font-poppins">
      <h2 className="text-xl md:text-2xl font-semibold pb-5">
        Total Videos ({finalResult.length})
      </h2>

      {/* SEARCH */}
      <div className="mt-4 relative">
        <Search className="absolute left-4 top-3 text-gray-400" size={20} />
        <input
          type="text"
          placeholder="Search by caption, about, url"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full border border-white rounded-full py-3 pl-12 pr-5 outline-none focus:ring-2 focus:ring-orange-400 transition"
        />
      </div>

      {/* HEADER */}
      <div className="mt-6 hidden md:grid grid-cols-4 gap-2 font-bold">
        <h2>Video Image</h2>
        <h2>Caption</h2>
        <h2>About</h2>
        <h2>Video URL</h2>
      </div>

      {/* LIST */}
      <div className="flex flex-col gap-4 mt-4">
        {finalResult.map((v, idx) => (
          <div
            key={idx}
            onClick={() =>
              navigate(ROUTES.ADMIN_BLOGS_FORM_EDIT.replace(":id", v.id))
            }
            className="border border-white rounded-xl p-4 hover:bg-[#222] transition
      grid grid-cols-1 md:grid-cols-4 gap-3 md:gap-4 cursor-pointer"
          >
            {/* IMAGE + MOBILE TEXT */}
            <div className="flex items-center gap-3 md:block">
              <img
                src={v.thumbnail}
                alt={v.caption}
                className="w-12 h-12 rounded-full object-cover border"
              />

              {/* MOBILE TEXT */}
              <div className="md:hidden">
                <p className="font-semibold text-white">
                  {truncate(v.caption)}
                </p>
                <p className="text-xs text-gray-400 mt-1">
                  {truncate(v.videoUrl)}
                </p>
              </div>
            </div>

            {/* DESKTOP FIELDS */}
            <div className="hidden md:block truncate text-white">
              {truncate(v.caption)}
            </div>

            <div className="hidden md:block truncate text-gray-300">
              {truncate(v.about)}
            </div>

            <div className="hidden md:block truncate text-gray-400">
              {truncate(v.videoUrl)}
            </div>

            {/* MOBILE ABOUT */}
            <div className="md:hidden text-sm text-gray-300 mt-2">
              {truncate(v.about)}
            </div>
          </div>
        ))}

        {finalResult.length === 0 && (
          <p className="text-center text-gray-400 mt-4">No videos found</p>
        )}
      </div>

      {/* ADD BUTTON */}
      <button
        onClick={() => navigate(ROUTES.ADMIN_BLOGS_FORM)}
        className="fixed right-10 bottom-10 w-14 h-14 bg-one text-black text-3xl rounded-full font-bold shadow-lg"
      >
        +
      </button>
    </div>
  );
}
