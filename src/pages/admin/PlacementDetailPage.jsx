import React, { useState, useEffect } from "react";
import { Trash2, Check, Edit, Upload } from "lucide-react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import ApiService from "../../core/services/api.service";
import ServerUrl from "../../core/constants/serverURL.constant";
import toast from "react-hot-toast";
import { useSingleClick } from "../../core";

export default function PlacementDetailForm() {
  const { id } = useParams();
  const mode = id ? "edit" : "add";
  const navigate = useNavigate();
  const api = new ApiService();
  const singleClick = useSingleClick();

  const [editMode, setEditMode] = useState(mode === "add");
  const [categories, setCategories] = useState([]);

  /* =======================
        FORM DATA
  ======================== */
  const [data, setData] = useState({
    placementCategoryId: "",
    newCategory: "",

    name: "",
    email: "",
    placedIn: "",
    role: "",
    courseName: "",
    courseDuration: "",
    packageOffered: "",
    year: new Date().getFullYear(),

    successStory: "",
    challenges: "",
    highlights: "",
    evaluation: "",
    experience: "",

    image: null,
  });

  const handleChange = (field, value) =>
    setData((prev) => ({ ...prev, [field]: value }));

  const handleStoryImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setData((prev) => ({ ...prev, image: file }));
  };

  const removeStoryImage = () => setData((prev) => ({ ...prev, image: null }));

  /* =======================
      FETCH CATEGORY
  ======================== */
  const fetchCategories = async () => {
    try {
      const res = await api.apiget(ServerUrl.API_GET_PLACEMENT_CATEGORIES);
      if (!Array.isArray(res.data)) return;
      setCategories(res.data);
    } catch (e) {
      console.error("Category Fetch Error:", e);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  /* =======================
      FETCH DATA (EDIT)
  ======================== */
  useEffect(() => {
    if (!id) return;

    const fetchData = async () => {
      try {
        const res = await api.apiget(
          ServerUrl.API_GET_ALL_PLACEMENT_DETAILS_BYID + id
        );

        // console.log("📌 FETCHED DATA -->", res?.data);

        if (!res?.data?.success) return;

        const p = res.data.data;

        setData({
          placementCategoryId: p.placementCategoryId || "",

          name: p.student_name || "",
          email: p.email || "",
          placedIn: p.company_name || "",
          role: p.company_role || "",
          courseName: p.course || "",
          courseDuration: p.duration || "",
          packageOffered: p.package || "",
          year: p.year || new Date().getFullYear(),

          successStory: p?.details?.success_story || "",
          challenges: p?.details?.facing_challenges || "",
          highlights: p?.details?.program_highlights || "",
          evaluation: p?.details?.final_evaluation || "",
          experience: p?.details?.overall_experience || "",

          image: p.image || null,
        });
      } catch (err) {
        console.error("❌ FETCH ERROR:", err);
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
        const formData = new FormData();

        formData.append("placementCategoryId", data.placementCategoryId);
        formData.append("student_name", data.name);
        formData.append("company_name", data.placedIn);
        formData.append("company_role", data.role);
        formData.append("course", data.courseName);
        formData.append("year", data.year);
        formData.append("package", data.packageOffered);
        formData.append("email", data.email);
        formData.append("duration", data.courseDuration);

        if (data.image && data.image instanceof File) {
          formData.append("file", data.image);
        }

        formData.append(
          "details",
          JSON.stringify({
            success_story: data.successStory,
            facing_challenges: data.challenges,
            program_highlights: data.highlights,
            final_evaluation: data.evaluation,
            overall_experience: data.experience,
          })
        );

        let res;

        if (id) {
          res = await api.apiput(
            ServerUrl.API_UPDATE_ALL_PLACEMENT_DETAILS_BYID + id,
            formData
          );

          // console.log("🟠 UPDATED RESPONSE -->", res?.data);
        } else {
          res = await api.apipost(
            ServerUrl.API_CREATE_ALL_PLACEMENT_DETAILS,
            formData
          );

          // console.log("🟢 CREATED RESPONSE -->", res?.data);
        }

        if (res?.data?.success) {
          toast.success("Placement Saved Successfully");
          navigate(-1);
        }
      } catch (err) {
        // console.error("❌ SUBMIT ERROR --->", err);
      }
    });
  };

  /* =======================
        DELETE
  ======================== */
  const handleDelete = async () => {
    if (!window.confirm("Delete this record?")) return;
    singleClick(async () => {
      try {
        await api.apidelete(
          `${ServerUrl.API_DELETE_ALL_PLACEMENT_DETAILS_BYID}${id}`
        );

        toast.success("Placement Deleted Successfully");
        navigate(-1);
      } catch (err) {
        console.error("Delete Error", err);
      }
    });
  };

  const handleAddCategory = async () => {
    if (!data.newCategory.trim()) return toast.error("Enter category name");
    singleClick(async () => {
      try {
        const res = await api.apipost(ServerUrl.API_CREATE_PLACEMENT_CATEGORY, {
          name: data.newCategory,
        });

        if (res?.status === 200) {
          toast.success("Category Added");
          await fetchCategories(); // refresh dropdown
          handleChange("placementCategoryId", "");
          handleChange("newCategory", "");
        }
        // console.log("Category Add Response", res);
      } catch (e) {
        console.error("Category Add Error", e);
      }
    });
  };

  /* =======================
        UI
  ======================== */
  return (
    <form
      onSubmit={handleSubmit}
      className="min-h-screen px-6 lg:px-12 py-2 font-sans relative"
    >
      {/* TOP BAR */}
      <div className="flex items-center justify-between">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <h2 className="text-lg font-medium">Category</h2>

            <select
              value={data.placementCategoryId}
              disabled={!editMode}
              onChange={(e) =>
                handleChange("placementCategoryId", e.target.value)
              }
              className="w-full bg-[#1a1a1a] border border-gray-700 rounded-xl px-3 py-2 outline-none disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <option value="">Select Category</option>

              {categories.map((cat, idx) => (
                <option key={idx} value={cat.placementCategoryId}>
                  {cat.name}
                </option>
              ))}

              <option value="add">➕ Add New Category</option>
            </select>
          </div>
          {data.placementCategoryId === "add" && (
            <div>
              <div className="flex gap-4">
                <DetailBox
                  label="Add Category"
                  value={data.newCategory}
                  disabled={!editMode}
                  onChange={(v) => handleChange("newCategory", v)}
                />
                <button
                  type="button"
                  disabled={!editMode}
                  className="bg-[#1a1a1a] px-4 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed"
                  onClick={handleAddCategory}
                >
                  Add
                </button>
              </div>
            </div>
          )}
        </div>

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
                handleSubmit(new Event("submit"));
              }}
            >
              {editMode ? <Check size={20} /> : <Edit size={20} />}
            </button>

            <button
              className="bg-[#1a1a1a] p-4 rounded-full"
              onClick={handleDelete}
            >
              <Trash2 size={20} />
            </button>
          </div>
        )}
      </div>

      {/* FORM FIELDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-6 text-lg">
        <DetailBox
          label="Full Name"
          value={data.name}
          disabled={!editMode}
          onChange={(v) => handleChange("name", v)}
        />
        <DetailBox
          label="Email"
          value={data.email}
          disabled={!editMode}
          onChange={(v) => handleChange("email", v)}
        />
        <DetailBox
          label="Company Name"
          value={data.placedIn}
          disabled={!editMode}
          onChange={(v) => handleChange("placedIn", v)}
        />
        <DetailBox
          label="Role"
          value={data.role}
          disabled={!editMode}
          onChange={(v) => handleChange("role", v)}
        />
        <DetailBox
          label="Course Name"
          value={data.courseName}
          disabled={!editMode}
          onChange={(v) => handleChange("courseName", v)}
        />
        <DetailBox
          label="Course Duration"
          value={data.courseDuration}
          disabled={!editMode}
          onChange={(v) => handleChange("courseDuration", v)}
        />
        <DetailBox
          label="Package"
          value={data.packageOffered}
          disabled={!editMode}
          onChange={(v) => handleChange("packageOffered", v)}
        />
        <DetailBox
          label="Year"
          value={data.year}
          disabled={!editMode}
          onChange={(v) => handleChange("year", v)}
        />
      </div>

      {/* TEXTAREAS */}
      <div className="grid grid-cols-2 gap-4">
        <Section
          title="Success Story"
          field="successStory"
          data={data}
          setData={setData}
          disabled={!editMode}
        />
        <Section
          title="Facing Challenges"
          field="challenges"
          data={data}
          setData={setData}
          disabled={!editMode}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <Section
          title="Program Highlights"
          field="highlights"
          data={data}
          setData={setData}
          disabled={!editMode}
        />
        <Section
          title="Final Evaluation"
          field="evaluation"
          data={data}
          setData={setData}
          disabled={!editMode}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <Section
          title="Overall Experience"
          field="experience"
          data={data}
          setData={setData}
          disabled={!editMode}
        />

        <SingleImageUpload
          image={data.image}
          onChange={handleStoryImageUpload}
          onRemove={removeStoryImage}
          disabled={!editMode}
        />
      </div>

      {mode === "add" && (
        <button
          type="button"
          onClick={(e) => handleSubmit(e)}
          className="fixed right-10 bottom-10 w-14 h-14 bg-one text-black text-3xl rounded-full font-bold shadow-lg flex justify-center items-center"
        >
          +
        </button>
      )}
    </form>
  );
}

/* Utilities */
const DetailBox = ({ label, value, onChange, disabled }) => (
  <div className="space-y-1">
    <h2 className="text-lg font-medium">{label}</h2>
    <input
      value={value}
      placeholder={label}
      disabled={disabled}
      onChange={(e) => onChange(e.target.value)}
      className="w-full bg-[#1a1a1a] border border-gray-700 rounded-xl px-3 py-2 outline-none disabled:opacity-50 disabled:cursor-not-allowed"
    />
  </div>
);

const Section = ({ title, field, data, setData, disabled }) => (
  <div>
    <h2 className="mt-5 mb-3 text-lg font-semibold">{title}</h2>
    <textarea
      value={data[field]}
      placeholder={title}
      disabled={disabled}
      onChange={(e) => setData({ ...data, [field]: e.target.value })}
      className="bg-[#1a1a1a] border border-gray-700 rounded-xl p-6 w-full outline-none disabled:opacity-50 disabled:cursor-not-allowed"
    />
  </div>
);

const SingleImageUpload = ({ image, onChange, onRemove, disabled }) => (
  <div>
    <h2 className="mt-5 mb-3 text-lg font-semibold">Image</h2>

    {!image && (
      <label className={`flex items-center gap-3 border border-dashed border-gray-500 p-6 rounded-lg w-fit ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}>
        <Upload size={20} />
        <span>Upload image</span>
        {!disabled && <input type="file" hidden onChange={onChange} />}
      </label>
    )}

    {image && (
      <div className="relative w-64 mt-2">
        <label className={disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'}>
          <img
            src={typeof image === "string" ? image : URL.createObjectURL(image)}
            className="w-full h-40 object-cover rounded-lg"
          />
          {!disabled && <input type="file" hidden onChange={onChange} />}
        </label>

        {!disabled && (
          <button
            onClick={onRemove}
            type="button"
            className="absolute top-2 right-2 bg-black/70 text-white rounded-full w-6 h-6 text-sm"
          >
            ✕
          </button>
        )}
      </div>
    )}
  </div>
);
