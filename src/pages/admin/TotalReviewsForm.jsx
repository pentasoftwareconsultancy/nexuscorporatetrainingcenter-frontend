import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Check, Trash2, Upload, Star } from "lucide-react";
import ApiService from "../../core/services/api.service";
import ServerUrl from "../../core/constants/serverURL.constant";
import { useSingleClick } from "../../core";

export default function TotalReviewsForm() {
  const { id } = useParams();
  const isEditMode = Boolean(id);
  const api = new ApiService();
  const navigate = useNavigate();
  const singleClick = useSingleClick();

  const [review, setReview] = useState({
    name: "",
    position: "",
    rating: "",
    review: "",
    imageUrl: "", // backend stored image
    image: null, // new upload file
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  // ---------------- FETCH IN EDIT MODE ----------------
  useEffect(() => {
    if (!isEditMode) return;

    const fetchReview = async () => {
      try {
        const res = await api.apiget(`${ServerUrl.API_GET_REVIEW_BY_ID}${id}`);
        const data = res?.data?.data;

        setReview({
          name: data?.name || "",
          position: data?.position || "",
          rating: data?.rating || "",
          review: data?.review || "",
          imageUrl: data?.imageUrl || "",
          image: null,
        });
      } catch (err) {
        console.error("Fetch review failed:", err);
      }
    };

    fetchReview();
  }, [id, isEditMode]);

  // ---------------- INPUT CHANGE ----------------
  const handleChange = (e) => {
    setReview({ ...review, [e.target.name]: e.target.value });
  };

  //   ---------------- RATING SELECT ----------------
  const handleRatingSelect = (value) => {
    setReview((prev) => ({
      ...prev,
      rating: value,
    }));
  };

  // ---------------- FILE UPLOAD ----------------
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setReview((prev) => ({
      ...prev,
      image: file,
      imageUrl: URL.createObjectURL(file), // preview
    }));
  };

  const removeImage = () => {
    setReview((prev) => ({
      ...prev,
      image: null,
      imageUrl: "",
    }));
  };

  // ---------------- SUBMIT ----------------
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const formData = new FormData();
      formData.append("name", review.name);
      formData.append("position", review.position);
      formData.append("rating", review.rating);
      formData.append("review", review.review);

      if (review.image) {
        formData.append("file", review.image);
      }
      await api.apipost(`${ServerUrl.API_POST_REVIEW}`, formData);
      navigate(-1);
    } catch (err) {
      console.error("Submit failed:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  //   ---------------- UPDATE ----------------
  const handleUpdate = async () => {
    setIsSubmitting(true);
    try {
      const formData = new FormData();
      formData.append("name", review.name);
      formData.append("position", review.position);
      formData.append("rating", review.rating);
      formData.append("review", review.review);
      if (review.image) {
        formData.append("image", review.image);
      }
      await api.apiput(`${ServerUrl.API_UPDATE_REVIEW}${id}`, formData);
      navigate(-1);
    } catch (err) {
      console.error("Update failed:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  // ---------------- DELETE ----------------
  const handleDelete = async () => {
    if (!window.confirm("Delete this review?")) return;

    try {
      await api.apidelete(`${ServerUrl.API_DELETE_REVIEW}${id}`);
      navigate(-1);
    } catch (err) {
      console.error("Delete failed:", err);
    }
  };

  return (
    <div className="flex flex-col md:flex-row text-white font-sora">
      <div className="flex-1 p-4 md:p-8 space-y-6 relative">
        {/* HEADER */}
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold">
            {isEditMode ? "Edit Review" : "Add Review"}
          </h2>

          {isEditMode && (
            <div className="flex gap-4">
              <button
                onClick={()=>singleClick(handleUpdate)}
                className="bg-[#1a1a1a] p-4 rounded-full"
              >
                <Check size={20} />
              </button>

              <button
                onClick={()=>singleClick(handleDelete)}
                className="bg-[#1a1a1a] p-4 rounded-full"
              >
                <Trash2 size={20} />
              </button>
            </div>
          )}
        </div>

        {/* FORM */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* NAME + POSITION + RATING */}
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 flex flex-col">
              <label>Name</label>
              <input
                name="name"
                value={review.name}
                onChange={handleChange}
                className="p-2 rounded border border-white bg-transparent"
              />
            </div>

            <div className="flex-1 flex flex-col">
              <label>Position</label>
              <input
                name="position"
                value={review.position}
                onChange={handleChange}
                className="p-2 rounded border border-white bg-transparent"
              />
            </div>

            <div className="flex-1 flex flex-col">
              <label>Rating</label>

              <div className="flex gap-2 mt-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    size={28}
                    className="cursor-pointer transition"
                    onClick={() => handleRatingSelect(star)}
                    onMouseEnter={() => handleRatingSelect(star)}
                    fill={star <= review.rating ? "gold" : "none"}
                    stroke={star <= review.rating ? "gold" : "white"}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* REVIEW */}
          <div>
            <label>Review</label>
            <textarea
              name="review"
              value={review.review}
              onChange={handleChange}
              className="w-full p-4 rounded border border-white bg-transparent h-40"
            />
          </div>

          {/* IMAGE */}
          <div>
            <label>Profile Image</label>

            {!review.imageUrl && (
              <label className="flex items-center gap-3 cursor-pointer border border-dashed border-gray-500 p-6 rounded-lg w-fit">
                <Upload size={20} />
                <span>Upload image</span>
                <input type="file" hidden onChange={handleImageUpload} />
              </label>
            )}

            {review.imageUrl && (
              <div className="relative w-64 mt-2">
                <label>
                  <img
                    src={review.imageUrl}
                    alt="preview"
                    className="w-full h-40 object-cover rounded-lg cursor-pointer"
                  />
                  <input type="file" hidden onChange={handleImageUpload} />
                </label>

                <button
                  type="button"
                  onClick={removeImage}
                  className="absolute top-2 right-2 bg-black/70 text-white rounded-full w-7 h-7"
                >
                  ✕
                </button>
              </div>
            )}
          </div>
        </form>
      </div>

      {/* FLOAT ADD BUTTON */}
      {!isEditMode && (
        <button
          onClick={()=>singleClick(handleSubmit)}
          disabled={isSubmitting}
          className={`fixed right-10 bottom-10 w-14 h-14 
          ${isSubmitting ? "bg-gray-400" : "bg-one"}
          text-black text-3xl rounded-full`}
        >
          {isSubmitting ? "…" : "+"}
        </button>
      )}
    </div>
  );
}
