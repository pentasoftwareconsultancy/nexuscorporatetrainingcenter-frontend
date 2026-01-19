import { useEffect, useState } from "react";
import ApiService from "../../core/services/api.service";
import ServerUrl from "../../core/constants/serverURL.constant";
import { Search } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../core/constants/routes.constant";

export default function AdminBatchPage() {
  const api = new ApiService();
  const navigate = useNavigate();

  const [batches, setBatches] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  // ⭐ Format date (yyyy-mm-dd)
  const formatDate = (dateStr) => {
    if (!dateStr) return "";
    return new Date(dateStr).toISOString().split("T")[0];
  };

  // ⭐ Calculate duration in months
  const getMonthDifference = (start, end) => {
    const s = new Date(start);
    const e = new Date(end);

    const months =
      (e.getFullYear() - s.getFullYear()) * 12 + (e.getMonth() - s.getMonth());

    return months <= 0 ? 1 : months;
  };

  // ⭐ Fetch batches
  const fetchBatches = async () => {
    try {
      const res = await api.apiget(ServerUrl.API_GET_BATCHES);

      let list = [];

      if (Array.isArray(res?.data?.data)) {
        list = res.data.data;
      } else if (res?.data?.data?.rows) {
        list = res.data.data.rows;
      }

      setBatches(list);
    } catch (err) {
      console.error("BATCH FETCH ERROR:", err);
      setBatches([]);
    }
  };

  useEffect(() => {
    fetchBatches();
  }, []);

  // ⭐ Search filter
  const finalResult = batches.filter((b) =>
    b.name?.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <div className="min-h-screen p-4 md:p-8 text-one font-poppins">
      <h2 className="text-xl md:text-2xl font-semibold pb-5">
        Total Batches ({finalResult.length})
      </h2>

      {/* SEARCH */}
      <div className="mt-4 relative">
        <Search className="absolute left-4 top-3 text-gray-400" size={20} />
        <input
          type="text"
          placeholder="Search by batch name"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full border border-white rounded-full py-3 pl-12 pr-5 outline-none
          focus:ring-2 focus:ring-orange-400 transition"
        />
      </div>

      {/* HEADER */}
      <div className="mt-6 hidden md:grid grid-cols-5 gap-2 font-bold">
        <h2>Course Name</h2>
        <h2>Batch Name</h2>
        <h2 className="text-center">Duration</h2>
        <h2 className="text-center">Start Date</h2>
        <h2 className="text-center">End Date</h2>
      </div>

      {/* LIST */}
      <div className="flex flex-col gap-4 mt-4">
        {finalResult.map((b) => (
          <div
            key={b.id}
            onClick={() =>
              navigate(ROUTES.ADMIN_BATCH_FORM_EDIT.replace(":id", b.id))
            }
            className="border border-white rounded-xl p-4 hover:bg-[#222] transition
  grid grid-cols-1 md:grid-cols-5 gap-3 md:gap-4 cursor-pointer"
          >
            {/* COURSE NAME */}
            <div className="hidden md:block text-white font-medium">
              {b.course?.title || "-"}
            </div>

            {/* BATCH NAME */}
            <div className="hidden md:block text-white font-medium">
              {b.name}
            </div>

            {/* DURATION */}
            <div className="text-gray-300 text-left md:text-center">
              {getMonthDifference(b.start_date, b.end_date)} Months
            </div>

            {/* START DATE */}
            <div className="text-gray-400 text-left md:text-center">
              {formatDate(b.start_date)}
            </div>

            {/* END DATE */}
            <div className="text-gray-400 text-left md:text-center">
              {formatDate(b.end_date)}
            </div>

            {/* MOBILE VIEW */}
            <div className="md:hidden">
              <p className="font-semibold text-white">{b.name}</p>
              <p className="text-xs text-gray-400">{b.course?.title}</p>
            </div>
          </div>
        ))}

        {finalResult.length === 0 && (
          <p className="text-center text-gray-400 mt-4">No batches found</p>
        )}
      </div>

      {/* ADD BUTTON */}
      <button
        onClick={() => navigate(ROUTES.ADMIN_BATCH_FORM)}
        className="fixed right-10 bottom-10 w-14 h-14 bg-one text-black
        text-3xl rounded-full font-bold shadow-lg"
      >
        +
      </button>
    </div>
  );
}
