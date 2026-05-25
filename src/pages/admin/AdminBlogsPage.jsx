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
  const [activeTab, setActiveTab] = useState("all");

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
        category: v.category || "video",
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
    const matchesSearch = (
      v.caption?.toLowerCase().includes(text) ||
      v.about?.toLowerCase().includes(text) ||
      v.videoUrl?.toLowerCase().includes(text)
    );
    const matchesTab = activeTab === "all" || v.category === activeTab;
    return matchesSearch && matchesTab;
  });

  return (
    <div className="min-h-screen p-4 md:p-8 text-one font-poppins">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 pb-5">
        <h2 className="text-xl md:text-2xl font-semibold">
          Blogs & Videos ({finalResult.length})
        </h2>
        {/* TABS */}
        <div className="flex gap-2">
          {["all", "video", "blog"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-1.5 rounded-full border transition text-sm capitalize font-medium ${
                activeTab === tab
                  ? "bg-orange-500 text-white border-orange-500"
                  : "border-gray-600 text-gray-400 hover:border-white hover:text-white"
              }`}
            >
              {tab}s
            </button>
          ))}
        </div>
      </div>

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
      <div className="mt-6 hidden md:grid grid-cols-5 gap-2 font-bold text-white border-b border-gray-800 pb-2">
        <h2>Image</h2>
        <h2>Category</h2>
        <h2>Caption</h2>
        <h2>About</h2>
        <h2>URL</h2>
      </div>

      {/* LIST */}
      <div className="flex flex-col gap-4 mt-4">
        {finalResult.map((v, idx) => (
          <div
            key={idx}
            onClick={() =>
              navigate(ROUTES.ADMIN_VIDEOS_FORM_EDIT.replace(":id", v.id))
            }
            className="border border-white/20 hover:border-white rounded-xl p-4 hover:bg-[#222] transition
      grid grid-cols-1 md:grid-cols-5 gap-3 md:gap-4 cursor-pointer items-center"
          >
            {/* IMAGE + MOBILE TEXT */}
            <div className="flex items-center gap-3 md:block">
              <img
                src={v.thumbnail}
                alt={v.caption}
                className="w-12 h-12 rounded-full object-cover border border-gray-700"
              />

              {/* MOBILE TEXT */}
              <div className="md:hidden">
                <p className="font-semibold text-white">
                  {truncate(v.caption)}
                </p>
                <p className="text-xs text-gray-400 mt-1 flex gap-2 items-center">
                  <span className="bg-[#333] px-2 py-0.5 rounded text-[10px] uppercase font-bold text-orange-400">
                    {v.category}
                  </span>
                  {truncate(v.videoUrl)}
                </p>
              </div>
            </div>

            {/* CATEGORY (DESKTOP) */}
            <div className="hidden md:block">
              <span className="bg-[#333] px-3 py-1 rounded text-xs uppercase font-bold text-orange-400">
                {v.category}
              </span>
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
        onClick={() => navigate(ROUTES.ADMIN_VIDEOS_FORM)}
        className="fixed right-10 bottom-10 w-14 h-14 bg-one text-black text-3xl rounded-full font-bold shadow-lg"
      >
        +
      </button>
    </div>
  );
}
