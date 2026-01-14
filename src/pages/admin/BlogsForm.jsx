import React, { useState, useEffect } from "react";
import { Upload, Trash2, Check, Edit } from "lucide-react";
import { useParams, useNavigate } from "react-router-dom";
import ApiService from "../../core/services/api.service";
import ServerUrl from "../../core/constants/serverURL.constant";
import toast from "react-hot-toast";
import { useSingleClick } from "../../core";

export default function BlogsForm() {
  const { id } = useParams();
  const mode = id ? "edit" : "add";
  const navigate = useNavigate();
  const singleClick = useSingleClick();
  const api = new ApiService();

  const [editMode, setEditMode] = useState(true);

  const [data, setData] = useState({
    caption: "",
    about: "",
    image: null,
    videoUrl: "",
  });

  const handleChange = (field, value) =>
    setData((prev) => ({ ...prev, [field]: value }));

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setData((prev) => ({ ...prev, image: file }));
  };

  const removeImage = () =>
    setData((prev) => ({
      ...prev,
      image: null,
    }));

  /* =======================
         FETCH (EDIT)
  ======================== */
  useEffect(() => {
    if (!id) return;

    const fetchData = async () => {
      try {
        const res = await api.apiget(`${ServerUrl.API_GET_VIDEO_BY_ID}/${id}`);

        if (!res?.data?.success) return;

        const v = res.data.data;

        setData({
          caption: v.caption || "",
          about: v.about || "",
          image: v.image || null,
          videoUrl: v.videoUrl || "",
        });
      } catch (err) {
        console.error("❌ Fetch Error", err);
      }
    };

    fetchData();
  }, [id]);

  /* =======================
           SUBMIT
  ======================== */
  const handleSubmit = async (e) => {
    e.preventDefault();
    singleClick(async () => {
      try {
        const form = new FormData();
        form.append("caption", data.caption);
        form.append("about", data.about);
        form.append("videoUrl", data.videoUrl);

        if (data.image && data.image instanceof File) {
          form.append("file", data.image);
        }

        let res;

        if (id) {
          res = await api.apiput(`${ServerUrl.API_UPDATE_VIDEO}/${id}`, form);
        } else {
          res = await api.apipost(ServerUrl.API_UPLOAD_VIDEO, form);
        }

        if (res?.data?.success) {
          toast.success("Blog Saved Successfully");
          navigate(-1);
        }
      } catch (err) {
        console.error("❌ Submit Error", err);
      }
    });
  };

  /* =======================
           DELETE
  ======================== */
  const handleDelete = async () => {
    if (!window.confirm("Delete this video?")) return;
    singleClick(async () => {
      try {
        await api.apidelete(`${ServerUrl.API_DELETE_VIDEO}/${id}`);
        toast.success("Blog Deleted Successfully");
        navigate(-1);
      } catch (err) {
        console.error("Delete Error", err);
      }
    });
  };

  return (
    <form onSubmit={handleSubmit} className="min-h-screen px-6 lg:px-12 py-4">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-semibold">
          {mode === "add" ? "Add Video Blog" : "Edit Video Blog"}
        </h1>

        {mode === "edit" && (
          <div className="flex gap-4">
            <button
              type="button"
              className="bg-[#1a1a1a] p-4 rounded-full"
              onClick={() => {
                if (!editMode) {
                  setEditMode(true);
                  return;
                }

                singleClick(async () => {
                  document.querySelector("form")?.requestSubmit();
                });
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

      {/* Fields */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
        <InputBox
          label="Caption"
          value={data.caption}
          onChange={(v) => handleChange("caption", v)}
        />

        <InputBox
          label="Video URL"
          value={data.videoUrl}
          onChange={(v) => handleChange("videoUrl", v)}
        />
      </div>

      <div className="mt-6">
        <h2 className="mb-2 text-lg font-medium">About</h2>
        <textarea
          value={data.about}
          onChange={(e) => handleChange("about", e.target.value)}
          className="w-full bg-[#1a1a1a] border border-gray-700 rounded-xl p-4 outline-none"
          rows={6}
          placeholder="Write description..."
        />
      </div>

      {/* Image Upload */}
      <div className="mt-6">
        <h2 className="mb-2 text-lg font-medium">Image</h2>

        {!data.image && (
          <label className="flex items-center gap-3 cursor-pointer border border-dashed border-gray-500 p-6 rounded-lg w-fit">
            <Upload size={20} />
            <span>Upload image</span>
            <input type="file" hidden onChange={handleImageUpload} />
          </label>
        )}

        {data.image && (
          <div className="relative w-64">
            <label>
              <img
                src={
                  typeof data.image === "string"
                    ? data.image
                    : URL.createObjectURL(data.image)
                }
                className="w-full h-40 object-cover rounded-lg cursor-pointer"
              />
              <input type="file" hidden onChange={handleImageUpload} />
            </label>

            <button
              onClick={removeImage}
              type="button"
              className="absolute top-2 right-2 bg-black/70 text-white rounded-full w-6 h-6 text-sm"
            >
              ✕
            </button>
          </div>
        )}
      </div>

      {mode === "add" && (
        <button
          type="submit"
          className="fixed right-10 bottom-10 w-14 h-14 bg-one text-black text-3xl rounded-full font-bold shadow-lg flex justify-center items-center"
        >
          +
        </button>
      )}
    </form>
  );
}

/* Reusable Input Box */
const InputBox = ({ label, value, onChange }) => (
  <div className="space-y-1">
    <h2 className="text-lg font-medium">{label}</h2>
    <input
      value={value}
      placeholder={label}
      onChange={(e) => onChange(e.target.value)}
      className="w-full bg-[#1a1a1a] border border-gray-700 rounded-xl px-3 py-2 outline-none"
    />
  </div>
);
