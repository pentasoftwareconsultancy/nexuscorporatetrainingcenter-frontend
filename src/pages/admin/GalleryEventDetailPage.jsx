import React, { useEffect, useState } from "react";
import { Edit, Trash2, Upload } from "lucide-react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import ApiService from "../../core/services/api.service";
import ServerUrl from "../../core/constants/serverURL.constant";
import { ROUTES } from "../../core/constants/routes.constant";

const Input = ({ label, ...props }) => (
  <div className="flex flex-col">
    <label className="text-sm font-semibold mb-1">{label}</label>
    <input
      {...props}
      className="bg-transparent border border-gray-500 rounded-lg px-3 py-2 outline-none focus:border-white"
    />
  </div>
);

const SingleImageUpload = ({ image, onChange, onRemove }) => (
  <div>
    <label className="text-sm font-semibold mb-2 block">Image</label>

    {!image && (
      <label className="flex items-center gap-3 cursor-pointer border border-dashed border-gray-500 p-6 rounded-lg w-fit">
        <Upload size={20} />
        <span>Upload image</span>
        <input type="file" hidden onChange={onChange} />
      </label>
    )}

    {image && (
      <div className="relative w-64 mt-2">
        <label>
          <img
            src={image instanceof File ? URL.createObjectURL(image) : image}
            alt="preview"
            className="w-full h-40 object-cover rounded-lg cursor-pointer"
          />
          <input type="file" hidden onChange={onChange} />
        </label>

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
  const api = new ApiService();
  const navigator = useNavigate();
  const location = useLocation();
  const { id } = useParams();

  const mode = location.state?.mode || "add"; // add | edit
  const isEdit = mode === "edit";
  const isAdd = mode === "add";

  const [storyData, setStoryData] = useState({
    eventName: "",
    date: "",
    location: "",
    image: null,
  });

  const handleStoryChange = (e) => {
    const { name, value } = e.target;
    setStoryData((prev) => ({ ...prev, [name]: value }));
  };

  const handleStoryImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) setStoryData((prev) => ({ ...prev, image: file }));
  };

  const removeStoryImage = () =>
    setStoryData((prev) => ({ ...prev, image: null }));

  // -------- FETCH BY ID FOR EDIT --------
  useEffect(() => {
    if (!isEdit || !id) return;

    const fetchStory = async () => {
      try {
        const res = await api.apiget(`${ServerUrl.API_GET_EVENTSTORY_BY_ID}/${id}`);
        const data = res?.data?.data;

        setStoryData({
          eventName: data?.eventName || "",
          date: data?.date ? data.date.split("T")[0] : "",
          location: data?.location || "",
          image: data?.image || null,
        });
      } catch (err) {
        console.error("Fetch story failed", err);
      }
    };

    fetchStory();
  }, [isEdit, id]);

  // -------- ADD --------
  const handleAddStory = async () => {
    try {
      const formData = new FormData();
      formData.append("eventName", storyData.eventName);
      formData.append("date", storyData.date);
      formData.append("location", storyData.location);
      if (storyData.image instanceof File)
        formData.append("file", storyData.image);

      await api.apipost(ServerUrl.API_CREATE_EVENTSTORIES, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      alert("Event Story Added Successfully");
      navigator(-1);
    } catch (err) {
      console.error("Add Story Failed", err);
      alert("Failed to add");
    }
  };

  // -------- UPDATE --------
  const handleUpdateStory = async () => {
    try {
      const formData = new FormData();
      formData.append("eventName", storyData.eventName);
      formData.append("date", storyData.date);
      formData.append("location", storyData.location);

      if (storyData.image instanceof File)
        formData.append("file", storyData.image);

      await api.apiput(`${ServerUrl.API_UPDATE_EVENTSTORIES}/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      alert("Updated Successfully");
      navigator(-1);
    } catch (err) {
      console.error("Update failed", err);
      alert("Failed");
    }
  };

  // -------- DELETE --------
  const handleDeleteStory = async () => {
    try {
      await api.apidelete(`${ServerUrl.API_DELETE_EVENTSTORIES}/${id}`);
      alert("Deleted Successfully");
      navigator(-1);
    } catch (err) {
      console.error("Delete failed", err);
    }
  };

  return (
    <div className="w-full px-4 sm:px-6 lg:px-12">
      <div className="max-w-[1600px] mx-auto">
        {/* HEADER */}
        <div className="flex justify-between items-center mt-10">
          <h1 className="text-2xl sm:text-3xl text-white font-semibold">
            Event Story
          </h1>

          {isEdit && (
            <div className="flex gap-4">
              <button
                onClick={handleUpdateStory}
                className="bg-white p-2 rounded"
              >
                <Edit size={20} color="orange" />
              </button>

              <button
                onClick={handleDeleteStory}
                className="bg-white p-2 rounded"
              >
                <Trash2 size={20} color="orange" />
              </button>
            </div>
          )}
        </div>

        {/* FORM */}
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

        {/* FLOATING ADD BUTTON */}
        {isAdd && (
          <button
            onClick={handleAddStory}
            className="fixed right-10 bottom-10 w-14 h-14 bg-one text-black text-3xl rounded-full font-bold shadow-lg"
          >
            +
          </button>
        )}
      </div>
    </div>
  );
};

export default GalleryEventDetailPage;
