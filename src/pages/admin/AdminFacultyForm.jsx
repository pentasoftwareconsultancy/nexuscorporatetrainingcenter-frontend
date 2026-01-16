import React, { useState, useEffect } from "react";
import { Upload, Trash2, Check, Edit } from "lucide-react";
import { useParams, useNavigate } from "react-router-dom";
import ApiService from "../../core/services/api.service";
import ServerUrl from "../../core/constants/serverURL.constant";
import toast from "react-hot-toast";
import { useSingleClick } from "../../core";

export default function AdminFacultyForm() {
  const { id } = useParams();
  const mode = id ? "edit" : "add";
  const singleClick = useSingleClick();
  const { run, locked } = useSingleClick();
  const navigate = useNavigate();
  const api = new ApiService();

  const [editMode, setEditMode] = useState(true);

  const [data, setData] = useState({
    faculty_name: "",
    designation: "",
    experience: "",
    skills: "",
    image: null,
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
        const res = await api.apiget(`${ServerUrl.API_GET_FACULTY_BY_ID}${id}`);

        if (!res?.data?.success) return;

        const v = res.data.data;

        setData({
          faculty_name: v.faculty_name || "",
          designation: v.designation || "",
          experience: v.experience || "",
          skills: v.skills || "",
          image: v.image || null,
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
        form.append("faculty_name", data.faculty_name);
        form.append("designation", data.designation);
        form.append("experience", data.experience);
        form.append("skills", data.skills);

        if (data.image && data.image instanceof File) {
          form.append("file", data.image);
        }

        let res;

        if (id) {
          res = await api.apiput(`${ServerUrl.API_UPDATE_FACULTY}${id}`, form);
        } else {
          res = await api.apipost(ServerUrl.API_POST_FACULTY, form);
        }

        if (res?.data?.success) {
          toast.success("Faculty Saved Successfully");
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
    if (!window.confirm("Delete this faculty member?")) return;
    singleClick(async () => {
      try {
        await api.apidelete(`${ServerUrl.API_DELETE_FACULTY}${id}`);
        toast.success("Faculty Deleted Successfully");
        navigate(-1);
      } catch (err) {
        toast.error("Something went wrong please try again later");
        console.error("Delete Error", err);
      }
    });
  };

  return (
    <form onSubmit={handleSubmit} className="min-h-screen px-6 lg:px-12 py-4">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-semibold">
          {mode === "add" ? "Add Faculty" : "Edit Faculty"}
        </h1>

        {mode === "edit" && (
          <div className="flex gap-4">
            <button
              type="button"
              disabled={locked}
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
          label="Faculty Name"
          value={data.faculty_name}
          onChange={(v) => handleChange("faculty_name", v)}
        />

        <InputBox
          label="Designation"
          value={data.designation}
          onChange={(v) => handleChange("designation", v)}
        />

        <InputBox
          label="Experience"
          value={data.experience}
          onChange={(v) => handleChange("experience", v)}
        />

        <InputBox
          label="Skills"
          value={data.skills}
          onChange={(v) => handleChange("skills", v)}
        />
      </div>

      {/* Image Upload */}
      <div className="mt-6">
        <h2 className="mb-2 text-lg font-medium">Profile Image</h2>

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

      {/* Add Button */}
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

/* Reusable Input */
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
