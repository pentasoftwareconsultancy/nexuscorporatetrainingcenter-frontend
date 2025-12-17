import React, { useState } from "react";
import { Edit, Trash2, Upload } from "lucide-react";
import { useLocation, useParams } from "react-router-dom";
import ApiService from "../../core/services/api.service";
import ServerUrl from "../../core/constants/serverURL.constant";
import { useEffect } from "react";

const Input = ({ label, ...props }) => (
  <div className="flex flex-col">
    <label className="text-sm font-semibold mb-1">{label}</label>
    <input
      {...props}
      className="bg-transparent border border-gray-500 rounded-lg px-3 py-2 outline-none focus:border-white"
    />
  </div>
);

const Textarea = ({ label, ...props }) => (
  <div className="flex flex-col">
    <label className="text-sm font-semibold mb-1">{label}</label>
    <textarea
      {...props}
      rows={4}
      className="bg-transparent border border-gray-500 rounded-lg px-3 py-2 outline-none focus:border-white"
    />
  </div>
);

const MultiImageUpload = ({ images, onChange, onRemove }) => (
  <div>
    <label className="text-sm font-semibold mb-2 block">Images</label>

    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
      {/* UPLOAD TILE (ALWAYS VISIBLE) */}
      <label className="flex flex-col items-center justify-center gap-2 cursor-pointer border border-dashed border-gray-500 rounded-lg h-32 text-sm text-gray-300 hover:border-white transition">
        <Upload size={20} />
        <span>Add images</span>
        <input type="file" hidden multiple onChange={onChange} />
      </label>

      {/* IMAGE PREVIEWS */}
      {images.map((img, index) => (
        <div key={index} className="relative group">
          <img
            src={URL.createObjectURL(img)}
            alt="preview"
            className="w-full h-32 object-cover rounded-lg"
          />

          {/* REMOVE */}
          <button
            onClick={() => onRemove(index)}
            className="absolute top-2 right-2 bg-black/70 text-white rounded-full w-6 h-6 text-sm hidden group-hover:flex items-center justify-center"
          >
            ✕
          </button>
        </div>
      ))}
    </div>
  </div>
);

const SingleImageUpload = ({ image, onChange, onRemove }) => (
  <div>
    <label className="text-sm font-semibold mb-2 block">Image</label>

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

const GalleryEventDetailPage = () => {
  const [active, setActive] = useState("colleges");
  const location = useLocation();
  const { id } = useParams();
  const api = new ApiService();

  const mode = location.state?.mode || "add"; // add | edit
  const type = location.state?.type || "college"; // college | eventstory

  const isEdit = mode === "edit";
  const isAdd = mode === "add";

  // -------------------- STATE --------------------
  const [collegeData, setCollegeData] = useState({
    city: "",
    collegeName: "",
    description: "",
    images: [], // 👈 multiple images
  });

  const [storyData, setStoryData] = useState({
    eventName: "",
    date: "",
    location: "",
    image: null, // 👈 single image
  });

  // -------------------- HANDLERS --------------------
  const handleCollegeChange = (e) => {
    const { name, value } = e.target;
    setCollegeData((prev) => ({ ...prev, [name]: value }));
  };

  const handleStoryChange = (e) => {
    const { name, value } = e.target;
    setStoryData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCollegeImagesUpload = (e) => {
    const files = Array.from(e.target.files);
    if (!files.length) return;

    setCollegeData((prev) => ({
      ...prev,
      images: [...files, ...prev.images], // 👈 add in front
    }));
  };

  const handleStoryImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setStoryData((prev) => ({ ...prev, image: file }));
  };

  const removeCollegeImage = (index) => {
    setCollegeData((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
  };

  const removeStoryImage = () => {
    setStoryData((prev) => ({ ...prev, image: null }));
  };

  useEffect(() => {
    if (!isEdit || !id) return;

    const fetchById = async () => {
      try {
        if (type === "college") {
          const res = await api.apiget(
            ServerUrl.API_GET_COLLEGES_BY_CITY + id
          );

          const data = res?.data?.data;

          setCollegeData({
            city: data.city || "",
            collegeName: data.name || "",
            description: data.description || "",
            images: [], // images come separately
          });

          // OPTIONAL: fetch images
          if (data.id) {
            const imgRes = await api.apiget(
              ServerUrl.API_UPLOAD_EVENT_IMAGE + "/" + data.id
            );

            setCollegeData((prev) => ({
              ...prev,
              images: imgRes?.data?.data || [],
            }));
          }
        }

        if (type === "eventstory") {
          const res = await api.apiget(
            ServerUrl.API_GET_EVENTSTORIES + "/" + id
          );

          const data = res?.data?.data;

          setStoryData({
            eventName: data.eventName || "",
            date: data.date || "",
            location: data.location || "",
            image: null, // backend image URL shown separately if needed
          });
        }
      } catch (err) {
        console.error("Fetch by ID failed", err);
      }
    };

    fetchById();
  }, [isEdit, id, type]);

  useEffect(() => {
    if (isEdit) {
      setActive(type === "college" ? "colleges" : "eventstories");
    }
  }, [isEdit, type]);

  // -------------------- UI --------------------
  return (
    <div className="w-full px-4 sm:px-6 lg:px-12">
      <div className="max-w-[1600px] mx-auto">
        {/* HEADER */}
        <div className="flex justify-between items-center mt-10">
          <h1 className="text-2xl sm:text-3xl text-white font-semibold">
            Gallery
          </h1>

          {isEdit && (
            <div className="flex gap-4">
              <button className="bg-white p-2 rounded">
                <Edit size={20} color="orange" />
              </button>
              <button className="bg-white p-2 rounded">
                <Trash2 size={20} color="orange" />
              </button>
            </div>
          )}
        </div>

        {/* TOGGLE */}
        <div className="border border-gray-400 rounded-full p-1 w-fit mt-5">
          <button
            disabled={isEdit}
            onClick={() => setActive("colleges")}
            className={`px-4 py-2 rounded-full text-white 
              ${active === "colleges" ? "bg-five" : ""} 
              ${isEdit ? "opacity-50 cursor-not-allowed" : ""}`}
          >
            Colleges
          </button>

          <button
            disabled={isEdit}
            onClick={() => setActive("eventstories")}
            className={`px-4 py-2 rounded-full text-white 
              ${active === "eventstories" ? "bg-five" : ""} 
              ${isEdit ? "opacity-50 cursor-not-allowed" : ""}`}
          >
            Event stories
          </button>
        </div>

        {/* ================== COLLEGE FORM ================== */}
        {active === "colleges" && (
          <div className="mt-8 space-y-8 text-white">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Input
                label="City"
                name="city"
                value={collegeData.city}
                onChange={handleCollegeChange}
              />
              <Input
                label="College Name"
                name="collegeName"
                value={collegeData.collegeName}
                onChange={handleCollegeChange}
              />
            </div>

            <Textarea
              label="Description"
              name="description"
              value={collegeData.description}
              onChange={handleCollegeChange}
            />

            <MultiImageUpload
              images={collegeData.images}
              onChange={handleCollegeImagesUpload}
              onRemove={removeCollegeImage}
            />
          </div>
        )}

        {/* ================== EVENT STORY FORM ================== */}
        {active === "eventstories" && (
          <div className="mt-8 space-y-8 text-white">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Input
                label="Event Name"
                name="eventName"
                value={storyData.eventName}
                onChange={handleStoryChange}
              />
              <Input
                label="Date"
                name="date"
                type="date"
                value={storyData.date}
                onChange={handleStoryChange}
              />
              <Input
                label="Location"
                name="location"
                value={storyData.location}
                onChange={handleStoryChange}
              />
            </div>

            <SingleImageUpload
              image={storyData.image}
              onChange={handleStoryImageUpload}
              onRemove={removeStoryImage}
            />
          </div>
        )}
      </div>

      {/* FLOATING ADD */}
      {isAdd && (
        <button className="fixed right-10 bottom-10 w-14 h-14 bg-one text-black text-3xl rounded-full font-bold shadow-lg">
          +
        </button>
      )}
    </div>
  );
};

export default GalleryEventDetailPage;
