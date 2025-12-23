import React, { useState, useEffect } from "react";
import { Pencil, Trash2, Check, Edit, Upload } from "lucide-react";
import { useParams } from "react-router-dom";
import { useLocation, useNavigate } from "react-router-dom";
import ApiService from "../../core/services/api.service";
import ServerUrl from "../../core/constants/serverURL.constant";

export default function PlacementDetailForm({ defaultValues = {}, onSubmit }) {
  const location = useLocation();
  const { id } = useParams();
  const mode = id ? "edit" : "add"; // "add" OR "edit"
  const placementId = id || null;
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const api = new ApiService();
  const [editMode, setEditMode] = useState(true); // it's a form so editable by default
  const passedData = location?.state?.data || {};

  const [data, setData] = useState({
    name: "",
    courseName: "",
    courseDuration: "",
    email: "",
    phone: "",
    placedIn: "",
    role: "",
    category: "",
    newCategory: "",
    packageOffered: "",
    successStory: "",
    challenges: "",
    highlights: "",
    evaluation: "",
    experience: "",
    image: null,
    ...defaultValues, //
  });

  const handleChange = (field, value) => {
    setData((prev) => ({ ...prev, [field]: value }));
  };

  const handleStoryImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setData((prev) => ({ ...prev, image: file }));
  };

  const removeStoryImage = () => {
    setData((prev) => ({ ...prev, image: null }));
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const res = await api.apiget(ServerUrl.API_GET_PLACEMENT_CATEGORIES);

      if (!Array.isArray(res.data)) return;

      // const list = [{ name: "", placementCategoryId: null }, ...res.data];

      setCategories(res.data || []);
    } catch (e) {
      console.error("Category Fetch Error:", e);
    }
  };

  // REPLACE YOUR handleSubmit WITH THIS

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!data.category) {
      alert("Select Category");
      return;
    }

    let categoryId = null;

    try {
      if (mode === "edit") {
        const formData = new FormData();

        formData.append("student_name", data.name || "");
        formData.append("email", data.email || "");
        formData.append("phone", data.phone || "");
        formData.append("company_name", data.placedIn || "");
        formData.append("company_role", data.role || "");
        formData.append("course", data.courseName || "");
        formData.append("duration", data.courseDuration || "");
        formData.append("package", data.packageOffered || "");
        formData.append("year", new Date().getFullYear());
        formData.append("placementCategoryId", data.category);

        if (data.image) {
          formData.append("file", data.image);
        }

        await api.apiput(
          `${ServerUrl.API_UPDATE_PLACEMENT}/${placementId}`,
          formData
        );

        await api.apiput(
          `${ServerUrl.API_UPDATE_PLACEMENT_DETAILS}/${placementId}`,
          {
            success_story: data.successStory || "",
            facing_challenges: data.challenges || "",
            program_highlights: data.highlights || "",
            final_evaluation: data.evaluation || "",
            overall_experience: data.experience || "",
          }
        );

        alert("Updated Successfully");
        navigate(-1);
        return;
      }

      // If user selected existing category
      if (data.category && data.category !== "add_new") {
        categoryId = parseInt(data.category);
      }

      // If user is creating new category
      if (data.category === "add_new") {
        if (!data.newCategory?.trim()) {
          alert("Please enter new category name");
          return;
        }

        const res = await api.apipost(ServerUrl.API_CREATE_PLACEMENT_CATEGORY, {
          name: data.newCategory,
        });

        categoryId =
          res?.data?.placementCategoryId ||
          res?.data?.data?.placementCategoryId ||
          res?.data?.id ||
          res?.data?.insertId;

        console.log("FINAL CATEGORY ID = ", categoryId);

        console.log("CATEGORY CREATE RES:", res);
      }

      // FINAL VALIDATION
      if (!categoryId || isNaN(categoryId)) {
        alert("Category Id missing");
        return;
      }

      const formData = new FormData();

      formData.append("student_name", data.name || "");
      formData.append("email", data.email || "");
      formData.append("phone", data.phone || "");
      formData.append("company_name", data.placedIn || "");
      formData.append("company_role", data.role || "");
      formData.append("course", data.courseName || "");
      formData.append("duration", data.courseDuration || "");
      formData.append("package", data.packageOffered || "");
      formData.append("year", new Date().getFullYear());
      formData.append("placementCategoryId", categoryId);

      formData.append("success_story", data.successStory || "");
      formData.append("facing_challenges", data.challenges || "");
      formData.append("program_highlights", data.highlights || "");
      formData.append("final_evaluation", data.evaluation || "");
      formData.append("overall_experience", data.experience || "");

      if (data.image) {
        formData.append("file", data.image);
      }

      const response = await api.apipost(
        ServerUrl.API_CREATE_PLACEMENT,
        formData
      );

      console.log("PLACEMENT SAVE:", response);

      const placementId =
        response?.data?.placement_id ||
        response?.data?.data?.placement_id ||
        response?.data?.id ||
        response?.data?.insertId;

      if (!placementId) {
        alert("Placement Id missing from response");
        return;
      }

      // ================= CREATE DETAILS =====================
      await api.apipost(ServerUrl.API_CREATE_PLACEMENT_DETAILS, {
        placement_id: placementId,
        success_story: data.successStory || "",
        facing_challenges: data.challenges || "",
        program_highlights: data.highlights || "",
        final_evaluation: data.evaluation || "",
        overall_experience: data.experience || "",
      });

      alert("Saved Successfully");
      navigate(-1);
    } catch (err) {
      console.error("SUBMIT ERROR:", err?.response?.data || err);
      alert("Failed to save");
    }
  };

  const fetchPlacementData = async () => {
    try {
      // 1️⃣ Get Placement
      const res = await api.apiget(
        `${ServerUrl.API_GET_PLACEMENT_BY_ID}/${placementId}`
      );

      const p = res?.data?.data || res?.data;

      // 2️⃣ Get Details
      const d = await api.apiget(
        `${ServerUrl.API_GET_PLACEMENT_DETAILS}/${placementId}`
      );

      const details = d?.data?.data || d?.data;

      setData((prev) => ({
        ...prev,

        // ===== Placement Table =====
        name: p?.student_name || "",
        email: p?.email || "",
        phone: p?.phone || "",
        placedIn: p?.company_name || "",
        role: p?.company_role || "",
        courseName: p?.course || "",
        courseDuration: p?.duration || "",
        packageOffered: p?.package || "",
        category: p?.placementCategoryId || "",

        // ===== Placement Details Table =====
        successStory: details?.success_story || "",
        challenges: details?.facing_challenges || "",
        highlights: details?.program_highlights || "",
        evaluation: details?.final_evaluation || "",
        experience: details?.overall_experience || "",

        image: null,
      }));
    } catch (e) {
      console.error("FETCH SINGLE ERROR:", e?.response?.data || e);
    }
  };

  useEffect(() => {
    if (mode === "edit" && placementId) {
      fetchPlacementData();
    }
  }, [mode, placementId]);

  return (
    <form
      onSubmit={handleSubmit}
      className="min-h-screen px-6 lg:px-12 py-2 font-sans relative"
    >
      {/* ===== TOP BAR ===== */}
      <div className="flex items-center justify-between">
        <div className="grid grid-cols-2 gap-4">
          {/* CATEGORY DROPDOWN */}
          <div className="space-y-1">
            <h2 className="text-lg font-medium">Category</h2>

            <select
              value={data.category}
              onChange={(e) => handleChange("category", e.target.value)}
              className="w-full bg-[#1a1a1a] border border-gray-700 rounded-xl px-3 py-2 outline-none"
            >
              <option value="">Select Category</option>

              {categories.map((cat, idx) => (
                <option key={idx} value={cat.placementCategoryId}>
                  {cat.name}
                </option>
              ))}

              <option value="add_new">➕ Add New Category</option>
            </select>
          </div>

          {/* ADD NEW CATEGORY INPUT (Visible only when Add New Selected) */}
          {data.category === "add_new" && (
            <div className="space-y-1">
              <h2 className="text-lg font-medium">New Category</h2>
              <input
                value={data.newCategory}
                placeholder="Enter new category"
                onChange={(e) => handleChange("newCategory", e.target.value)}
                className="w-full bg-[#1a1a1a] border border-gray-700 rounded-xl px-3 py-2 outline-none"
              />
            </div>
          )}
        </div>

        {mode === "edit" && (
          <div className="flex gap-4">
            {/* EDIT / SAVE BUTTON */}
            <button
              type="button"
              className="bg-[#1a1a1a] p-4 rounded-full"
              onClick={() => {
                // If already in edit mode → Save
                if (editMode) {
                  handleSubmit(new Event("submit"));
                  return;
                }

                // Else → Enable Editing
                setEditMode(true);
              }}
            >
              {editMode ? <Check size={20} /> : <Edit size={20} />}
            </button>
            <button
              className="bg-[#1a1a1a] p-4 rounded-full"
              onClick={async () => {
                if (!window.confirm("Delete this record?")) return;

                await api.apidelete(
                  `${ServerUrl.API_DELETE_PLACEMENT}/${placementId}`
                );
                await api.apidelete(
                  `${ServerUrl.API_DELETE_PLACEMENT_DETAILS}/${placementId}`
                );

                alert("Deleted Successfully");
                navigate(-1);
              }}
            >
              <Trash2 size={20} />
            </button>
          </div>
        )}
      </div>

      {/* ===== DETAILS GRID ===== */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-6 text-lg">
        <DetailBox
          label="Full Name"
          value={data.name}
          onChange={(v) => handleChange("name", v)}
        />
        <DetailBox
          label="Email"
          value={data.email}
          onChange={(v) => handleChange("email", v)}
        />
        <DetailBox
          label="Phone"
          value={data.phone}
          onChange={(v) => handleChange("phone", v)}
        />
        <DetailBox
          label="Company Name"
          value={data.placedIn}
          onChange={(v) => handleChange("placedIn", v)}
        />
        <DetailBox
          label="Role"
          value={data.role}
          onChange={(v) => handleChange("role", v)}
        />
        <DetailBox
          label="Course Name"
          value={data.courseName}
          onChange={(v) => handleChange("courseName", v)}
        />
        <DetailBox
          label="Course Duration"
          value={data.courseDuration}
          onChange={(v) => handleChange("courseDuration", v)}
        />
        <DetailBox
          label="Package"
          value={data.packageOffered}
          onChange={(v) => handleChange("packageOffered", v)}
        />
      </div>

      {/* TEXTAREAS */}
      <div className="grid grid-cols-2 gap-4">
        <Section
          title="Success Story"
          field="successStory"
          data={data}
          setData={setData}
        />
        <Section
          title="Facing Challenges"
          field="challenges"
          data={data}
          setData={setData}
        />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <Section
          title="Program Highlights"
          field="highlights"
          data={data}
          setData={setData}
        />
        <Section
          title="Final Evaluation"
          field="evaluation"
          data={data}
          setData={setData}
        />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <Section
          title="Overall Experience"
          field="experience"
          data={data}
          setData={setData}
        />
        <SingleImageUpload
          image={data.image}
          onChange={handleStoryImageUpload}
          onRemove={removeStoryImage}
        />
      </div>

      {mode === "add" && (
        <button
          type="button"
          onClick={handleSubmit}
          className="fixed right-10 bottom-10 w-14 h-14 bg-one text-black text-3xl rounded-full font-bold shadow-lg flex justify-center items-center"
        >
          +
        </button>
      )}
    </form>
  );
}

/* ========= Reusable Detail Box ========= */
const DetailBox = ({ label, value, onChange }) => (
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

/* ========= Reusable Textarea ========= */
const Section = ({ title, field, data, setData }) => (
  <div>
    <h2 className="mt-5 mb-3 text-lg font-semibold">{title}</h2>

    <textarea
      value={data[field]}
      placeholder={title}
      onChange={(e) => setData({ ...data, [field]: e.target.value })}
      className="bg-[#1a1a1a] border border-gray-700 rounded-xl p-6 w-full outline-none"
    />
  </div>
);

const SingleImageUpload = ({ image, onChange, onRemove }) => (
  <div>
    <h2 className="mt-5 mb-3 text-lg font-semibold">Image</h2>

    {/* NO IMAGE → SHOW UPLOAD */}
    {!image && (
      <label className="flex items-center gap-3 cursor-pointer border border-dashed border-gray-500 p-6 rounded-lg w-fit">
        <Upload size={20} />
        <span>Upload image</span>
        <input type="file" hidden onChange={onChange} />
      </label>
    )}

    {/* IMAGE → REPLACES UPLOAD */}
    {image && (
      <div className="relative w-64 mt-2">
        {/* IMAGE IS CLICKABLE TO REPLACE */}
        <label>
          <img
            src={URL.createObjectURL(image)}
            alt="preview"
            className="w-full h-40 object-cover rounded-lg cursor-pointer"
          />
          <input type="file" hidden onChange={onChange} />
        </label>

        {/* REMOVE */}
        <button
          onClick={onRemove}
          className="absolute top-2 right-2 bg-black/70 text-white rounded-full w-6 h-6 text-sm"
        >
          ✕
        </button>
      </div>
    )}
  </div>
);
