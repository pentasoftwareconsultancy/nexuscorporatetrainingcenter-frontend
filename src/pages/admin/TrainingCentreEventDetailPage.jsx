import React, { useEffect, useState } from "react";
import { Trash2, Upload, Check, X, Plus, Play } from "lucide-react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import ApiService from "../../core/services/api.service";
import ServerUrl from "../../core/constants/serverURL.constant";
import toast from "react-hot-toast";
import { useSingleClick } from "../../core";

const Input = ({ label, ...props }) => (
  <div className="flex flex-col">
    <label className="text-sm font-semibold mb-1 text-gray-300">{label}</label>
    <input
      {...props}
      className="bg-[#1a1a1a] border border-gray-700 rounded-lg px-3 py-2 text-white outline-none focus:border-orange-500 transition duration-200"
    />
  </div>
);

const Textarea = ({ label, ...props }) => (
  <div className="flex flex-col">
    <label className="text-sm font-semibold mb-1 text-gray-300">{label}</label>
    <textarea
      {...props}
      rows={4}
      className="bg-[#1a1a1a] border border-gray-700 rounded-lg px-3 py-2 text-white outline-none focus:border-orange-500 transition duration-200"
    />
  </div>
);

const TrainingCentreEventDetailPage = () => {
  const api = new ApiService();
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams();
  const singleClick = useSingleClick();

  const mode = location.state?.mode || (id ? "edit" : "add");
  const isEdit = mode === "edit";
  const isAdd = mode === "add";

  const [eventData, setEventData] = useState({
    title: "",
    description: "",
    date: "",
    location: "",
  });

  const [existingMedia, setExistingMedia] = useState([]);
  const [newImages, setNewImages] = useState([]);
  const [newVideos, setNewVideos] = useState([]);
  const [newVideoUrls, setNewVideoUrls] = useState([]);
  const [videoUrlInput, setVideoUrlInput] = useState("");
  const [submitting, setSubmitting] = useState(false);

  // Fetch event details on edit mode
  useEffect(() => {
    if (!isEdit || !id) return;

    const fetchEvent = async () => {
      try {
        const res = await api.apiget(`${ServerUrl.API_TRAINING_CENTRE_EVENTS}/${id}`);
        const data = res?.data?.data;
        if (data) {
          setEventData({
            title: data.title || "",
            description: data.description || "",
            date: data.date ? data.date.split("T")[0] : "",
            location: data.location || "",
          });
          setExistingMedia(data.media || []);
        }
      } catch (err) {
        console.error("Fetch event error", err);
        toast.error("Failed to load event details");
      }
    };

    fetchEvent();
  }, [isEdit, id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEventData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle image upload input
  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length) {
      setNewImages((prev) => [...prev, ...files]);
    }
  };

  const removeNewImage = (idx) => {
    setNewImages((prev) => prev.filter((_, i) => i !== idx));
  };

  // Handle video file upload input
  const handleVideoChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length) {
      setNewVideos((prev) => [...prev, ...files]);
    }
  };

  const removeNewVideo = (idx) => {
    setNewVideos((prev) => prev.filter((_, i) => i !== idx));
  };

  // Handle manual video URLs list
  const handleAddVideoUrl = () => {
    if (!videoUrlInput.trim()) return;
    setNewVideoUrls((prev) => [...prev, videoUrlInput.trim()]);
    setVideoUrlInput("");
  };

  const removeNewVideoUrl = (idx) => {
    setNewVideoUrls((prev) => prev.filter((_, i) => i !== idx));
  };

  // Handle deleting existing media from DB immediately (with confirm)
  const handleDeleteExistingMedia = async (mediaId) => {
    if (!window.confirm("Are you sure you want to delete this media item? This cannot be undone.")) return;

    try {
      await api.apidelete(`${ServerUrl.API_DELETE_TRAINING_CENTRE_MEDIA}/${mediaId}`);
      toast.success("Media deleted successfully");
      setExistingMedia((prev) => prev.filter((m) => m.id !== mediaId));
    } catch (err) {
      console.error("Delete media error", err);
      toast.error("Failed to delete media item");
    }
  };

  // Prepare FormData for submit
  const getFormData = () => {
    const formData = new FormData();
    formData.append("title", eventData.title);
    formData.append("description", eventData.description);
    formData.append("date", eventData.date);
    formData.append("location", eventData.location);

    // Append new images
    newImages.forEach((file) => {
      formData.append("images", file);
    });

    // Append new videos
    newVideos.forEach((file) => {
      formData.append("videos", file);
    });

    // Append manual video URLs
    formData.append("videoUrls", JSON.stringify(newVideoUrls));

    return formData;
  };

  // Submit Add form
  const handleAddEvent = async () => {
    if (!eventData.title.trim()) return toast.error("Title is required");
    try {
      setSubmitting(true);
      const formData = getFormData();
      await api.apipost(ServerUrl.API_TRAINING_CENTRE_EVENTS, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      toast.success("Training Centre Event Created Successfully");
      navigate(-1);
    } catch (err) {
      console.error("Create event failed", err);
      toast.error("Failed to create training centre event");
    } finally {
      setSubmitting(false);
    }
  };

  // Submit Update form
  const handleUpdateEvent = async () => {
    if (!eventData.title.trim()) return toast.error("Title is required");
    try {
      setSubmitting(true);
      const formData = getFormData();
      await api.apiput(`${ServerUrl.API_TRAINING_CENTRE_EVENTS}/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      toast.success("Training Centre Event Updated Successfully");
      navigate(-1);
    } catch (err) {
      console.error("Update event failed", err);
      toast.error("Failed to update training centre event");
    } finally {
      setSubmitting(false);
    }
  };

  // Delete entire Event
  const handleDeleteEvent = async () => {
    if (!window.confirm("Are you sure you want to delete this event and all its media files?")) return;

    try {
      await api.apidelete(`${ServerUrl.API_TRAINING_CENTRE_EVENTS}/${id}`);
      toast.success("Training Centre Event Deleted Successfully");
      navigate(-1);
    } catch (err) {
      console.error("Delete event failed", err);
      toast.error("Failed to delete event");
    }
  };

  return (
    <div className="w-full px-4 sm:px-6 lg:px-12 min-h-screen text-white">
      <div className="max-w-[1600px] mx-auto pb-24">
        {/* HEADER */}
        <div className="flex justify-between items-center mt-10 border-b border-gray-800 pb-5">
          <h1 className="text-2xl sm:text-3xl font-semibold">
            {isEdit ? "Edit Training Centre Event" : "Add Training Centre Event"}
          </h1>

          {isEdit && (
            <div className="flex gap-4">
              <button
                type="button"
                disabled={submitting}
                onClick={() => singleClick(handleUpdateEvent)}
                className="bg-[#1a1a1a] hover:bg-orange-500 hover:text-black transition p-4 rounded-full border border-gray-700"
                title="Save Changes"
              >
                <Check size={20} />
              </button>

              <button
                type="button"
                onClick={() => singleClick(handleDeleteEvent)}
                className="bg-[#1a1a1a] hover:bg-red-600 transition p-4 rounded-full border border-gray-700"
                title="Delete Event"
              >
                <Trash2 size={20} />
              </button>
            </div>
          )}
        </div>

        {/* FORM */}
        <div className="mt-8 space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Input
              label="Event Title"
              name="title"
              value={eventData.title}
              onChange={handleInputChange}
              required
            />

            <Input
              label="Date"
              name="date"
              type="date"
              value={eventData.date}
              onChange={handleInputChange}
            />

            <Input
              label="Location"
              name="location"
              value={eventData.location}
              onChange={handleInputChange}
            />
          </div>

          <Textarea
            label="Description"
            name="description"
            value={eventData.description}
            onChange={handleInputChange}
          />

          {/* ================= IMAGES SECTION ================= */}
          <div className="border-t border-gray-800 pt-6">
            <h2 className="text-lg font-bold mb-4 text-orange-400">Event Images</h2>
            
            {/* Existing Images */}
            {isEdit && existingMedia.filter((m) => m.type === "image").length > 0 && (
              <div className="mb-6">
                <h3 className="text-sm font-semibold text-gray-400 mb-2">Uploaded Images</h3>
                <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-4">
                  {existingMedia
                    .filter((m) => m.type === "image")
                    .map((media) => (
                      <div key={media.id} className="relative group rounded-xl overflow-hidden border border-gray-700 aspect-video">
                        <img
                          src={media.url}
                          alt="event media"
                          className="w-full h-full object-cover"
                        />
                        <button
                          type="button"
                          onClick={() => handleDeleteExistingMedia(media.id)}
                          className="absolute top-2 right-2 bg-red-600 text-white rounded-full p-1.5 opacity-0 group-hover:opacity-100 transition duration-200"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    ))}
                </div>
              </div>
            )}

            {/* New Image Uploads */}
            <div>
              <h3 className="text-sm font-semibold text-gray-400 mb-2">Upload New Images</h3>
              <div className="flex flex-wrap gap-4 items-center">
                <label className="flex flex-col items-center justify-center gap-2 cursor-pointer border border-dashed border-gray-700 hover:border-orange-500 rounded-xl h-32 w-48 text-sm text-gray-400 transition bg-black/30">
                  <Upload size={20} />
                  <span>Choose Images</span>
                  <input
                    type="file"
                    hidden
                    multiple
                    accept="image/*"
                    onChange={handleImageChange}
                  />
                </label>

                {newImages.map((file, idx) => (
                  <div key={idx} className="relative group rounded-xl overflow-hidden border border-gray-700 aspect-video h-32 w-48 bg-black">
                    <img
                      src={URL.createObjectURL(file)}
                      alt="preview"
                      className="w-full h-full object-cover"
                    />
                    <button
                      type="button"
                      onClick={() => removeNewImage(idx)}
                      className="absolute top-2 right-2 bg-black/70 hover:bg-black text-white rounded-full p-1 text-sm"
                    >
                      <X size={14} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ================= VIDEOS SECTION ================= */}
          <div className="border-t border-gray-800 pt-6">
            <h2 className="text-lg font-bold mb-4 text-orange-400">Event Videos</h2>

            {/* Existing Videos */}
            {isEdit && existingMedia.filter((m) => m.type === "video").length > 0 && (
              <div className="mb-6">
                <h3 className="text-sm font-semibold text-gray-400 mb-2">Uploaded & Embedded Videos</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                  {existingMedia
                    .filter((m) => m.type === "video")
                    .map((media) => {
                      const isEmbed = media.url.includes("youtube.com") || media.url.includes("youtu.be") || media.url.includes("vimeo.com");
                      return (
                        <div key={media.id} className="relative group rounded-xl overflow-hidden border border-gray-700 aspect-video bg-black flex flex-col justify-between">
                          {isEmbed ? (
                            <iframe
                              src={media.url}
                              className="w-full h-full"
                              title="Embedded Video"
                              allowFullScreen
                            ></iframe>
                          ) : (
                            <video src={media.url} controls className="w-full h-full object-cover" />
                          )}
                          <button
                            type="button"
                            onClick={() => handleDeleteExistingMedia(media.id)}
                            className="absolute top-2 right-2 bg-red-600 text-white rounded-full p-1.5 opacity-0 group-hover:opacity-100 transition duration-200 z-10"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      );
                    })}
                </div>
              </div>
            )}

            {/* New Video File Uploads */}
            <div className="mb-6">
              <h3 className="text-sm font-semibold text-gray-400 mb-2">Upload Video Files</h3>
              <div className="flex flex-wrap gap-4 items-center">
                <label className="flex flex-col items-center justify-center gap-2 cursor-pointer border border-dashed border-gray-700 hover:border-orange-500 rounded-xl h-32 w-48 text-sm text-gray-400 transition bg-black/30">
                  <Upload size={20} />
                  <span>Choose Videos</span>
                  <input
                    type="file"
                    hidden
                    multiple
                    accept="video/*"
                    onChange={handleVideoChange}
                  />
                </label>

                {newVideos.map((file, idx) => (
                  <div key={idx} className="relative group rounded-xl overflow-hidden border border-gray-700 aspect-video h-32 w-48 bg-black flex flex-col justify-center items-center">
                    <Play className="text-gray-400 mb-1" size={24} />
                    <span className="text-xs text-gray-400 text-center px-2 truncate w-full">{file.name}</span>
                    <button
                      type="button"
                      onClick={() => removeNewVideo(idx)}
                      className="absolute top-2 right-2 bg-black/70 hover:bg-black text-white rounded-full p-1 text-sm"
                    >
                      <X size={14} />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Add Manual Embed URLs */}
            <div>
              <h3 className="text-sm font-semibold text-gray-400 mb-2">Add Video URLs (YouTube, Vimeo, etc.)</h3>
              <div className="flex gap-2 max-w-2xl">
                <input
                  type="text"
                  placeholder="https://www.youtube.com/embed/..."
                  value={videoUrlInput}
                  onChange={(e) => setVideoUrlInput(e.target.value)}
                  className="flex-1 bg-[#1a1a1a] border border-gray-700 rounded-lg px-3 py-2 text-white outline-none focus:border-orange-500"
                />
                <button
                  type="button"
                  onClick={handleAddVideoUrl}
                  className="bg-orange-500 hover:bg-orange-600 text-black font-semibold rounded-lg px-4 flex items-center gap-1 transition duration-200"
                >
                  <Plus size={16} /> Add
                </button>
              </div>

              {newVideoUrls.length > 0 && (
                <div className="mt-4 space-y-2 max-w-2xl">
                  {newVideoUrls.map((url, idx) => (
                    <div key={idx} className="flex justify-between items-center bg-black/40 border border-gray-800 rounded-lg p-2 text-sm text-gray-300">
                      <span className="truncate pr-4">{url}</span>
                      <button
                        type="button"
                        onClick={() => removeNewVideoUrl(idx)}
                        className="text-red-500 hover:text-red-400 p-1"
                      >
                        <X size={16} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* FLOATING SUBMIT BUTTON FOR ADD MODE */}
        {isAdd && (
          <button
            type="button"
            disabled={submitting}
            onClick={() => singleClick(handleAddEvent)}
            className="fixed right-10 bottom-10 w-14 h-14 bg-one hover:scale-110 active:scale-95 duration-200 text-black text-3xl rounded-full font-bold shadow-lg flex justify-center items-center disabled:opacity-50"
          >
            {submitting ? "..." : "+"}
          </button>
        )}
      </div>
    </div>
  );
};

export default TrainingCentreEventDetailPage;
