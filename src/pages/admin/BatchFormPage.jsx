import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Trash2, Check, Edit } from "lucide-react";
import ApiService from "../../core/services/api.service";
import ServerUrl from "../../core/constants/serverURL.constant";
import toast from "react-hot-toast";
import { useSingleClick } from "../../core";

export default function BatchFormPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const api = new ApiService();
  const singleClick = useSingleClick();
  const mode = id ? "edit" : "add";
  const [editMode, setEditMode] = useState(false);
  const [courses, setCourses] = useState([]);

  const [data, setData] = useState({
    courseId: "",
    batchName: "",
    startDate: "",
    endDate: "",
  });

  const handleChange = (field, value) =>
    setData((prev) => ({ ...prev, [field]: value }));

  /* =======================
        FETCH COURSES
  ======================== */
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await api.apiget(ServerUrl.API_GET_COURSES);

        let list = [];

        if (Array.isArray(res?.data?.data)) {
          list = res.data.data;
        } else if (Array.isArray(res?.data?.data?.rows)) {
          list = res.data.data.rows;
        }

        setCourses(list);
      } catch (error) {
        console.error("COURSES FETCH ERROR", error);
        setCourses([]);
      }
    };

    fetchCourses();
  }, []);

  /* =======================
        FETCH BATCH (EDIT)
  ======================== */
  useEffect(() => {
    if (!id) return;

    const fetchBatch = async () => {
      const res = await api.apiget(`${ServerUrl.API_GET_BATCH_BY_ID}/${id}`);

      if (res?.data?.success) {
        const v = res.data.data;
        setData({
          courseId: v.courseId || "",
          batchName: v.name || "",
          startDate: v.start_date?.slice(0, 10) || "",
          endDate: v.end_date?.slice(0, 10) || "",
        });
      }
    };

    fetchBatch();
  }, [id]);

  /* =======================
           SUBMIT
  ======================== */
  const handleSubmit = async (e) => {
    e.preventDefault();

    singleClick(async () => {
      const payload = {
        courseId: data.courseId,
        name: data.batchName,
        start_date: data.startDate,
        end_date: data.endDate,
      };

      let res;
      if (id) {
        res = await api.apiput(`${ServerUrl.API_UPDATE_BATCH}/${id}`, payload);
      } else {
        res = await api.apipost(ServerUrl.API_ADD_BATCH, payload);
      }

      if (res?.data?.success) {
        toast.success("Batch saved successfully");
        navigate(-1);
      }
    });
  };

  const handleDelete = async () => {
    if (!window.confirm("Delete this batch?")) return;

    singleClick(async () => {
      try {
        await api.apidelete(`${ServerUrl.API_DELETE_BATCH}/${id}`);
        toast.success("Batch deleted successfully");
        navigate(-1);
      } catch (err) {
        console.error("Delete Error", err);
      }
    });
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="min-h-screen py-2 space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-semibold">
            {mode === "add" ? "Add Batch" : "Edit Batch"}
          </h1>

          {mode === "edit" && (
            <div className="flex gap-4">
              <button
                type="button"
                onClick={() => {
                  if (!editMode) {
                    setEditMode(true); // enable editing
                    return;
                  }
                  // save
                  document.querySelector("form")?.requestSubmit();
                }}
              >
                {editMode ? <Check size={20} /> : <Edit size={20} />}
              </button>

              <button
                type="button"
                onClick={handleDelete}
                className="bg-[#1a1a1a] p-4 rounded-full"
              >
                <Trash2 size={20} />
              </button>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Course Dropdown */}
          <div>
            <label className="block mb-2 font-medium">Course</label>
            <select
              value={data.courseId}
              onChange={(e) => handleChange("courseId", e.target.value)}
              className="w-full bg-[#1a1a1a] border border-gray-700 rounded-xl px-3 py-3 outline-none"
            >
              <option value="">Select course</option>
              {Array.isArray(courses) &&
                courses.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.title}
                  </option>
                ))}
            </select>
          </div>

          {/* Batch Name */}
          <div>
            <label className="block mb-2 font-medium">Batch Name</label>
            <input
              type="text"
              value={data.batchName}
              onChange={(e) => handleChange("batchName", e.target.value)}
              disabled={!editMode}
              className="w-full bg-[#1a1a1a] border border-gray-700 rounded-xl px-3 py-3 outline-none"
              placeholder="Enter batch name"
            />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Start Date */}
          <div>
            <label className="block mb-2 font-medium">Start Date</label>
            <input
              type="date"
              value={data.startDate}
              onChange={(e) => handleChange("startDate", e.target.value)}
              className="w-full bg-[#1a1a1a] border border-gray-700 rounded-xl px-3 py-3 outline-none"
            />
          </div>

          {/* End Date */}
          <div>
            <label className="block mb-2 font-medium">End Date</label>
            <input
              type="date"
              value={data.endDate}
              onChange={(e) => handleChange("endDate", e.target.value)}
              className="w-full bg-[#1a1a1a] border border-gray-700 rounded-xl px-3 py-3 outline-none"
            />
          </div>
        </div>
        {mode === "add" && (
          <button
            type="submit"
            className="fixed right-10 bottom-10 w-14 h-14 bg-one text-black text-3xl rounded-full font-bold shadow-lg flex items-center justify-center"
          >
            +
          </button>
        )}
      </form>
    </>
  );
}
