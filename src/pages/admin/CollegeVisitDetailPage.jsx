import React, { useState } from "react";
import visitJson from "../../assets/shubham/visit.json";

export default function CollegeVisitDetailPage() {
  const [visit, setVisit] = useState(visitJson);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({});

  // OPEN EDIT FORM
  const handleEdit = () => {
    setFormData({
      collegeName: visit.collegeName,
      description: visit.description,
      visitDate: visit.visitDate,
    });
    setShowForm(true);
  };

  // FORM CHANGE
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // SAVE FORM
  const handleSave = () => {
    setVisit({ ...visit, ...formData });
    setShowForm(false);
  };

  // DELETE IMAGE
  const handleDeleteImage = (id) => {
    setVisit({
      ...visit,
      images: visit.images.filter((img) => img.id !== id),
    });
  };

  // ADD IMAGE
  const handleAddImage = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      setVisit({
        ...visit,
        images: [...visit.images, { id: Date.now(), src: reader.result }],
      });
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="flex flex-col md:flex-row bg-[#121212] text-white min-h-screen w-full overflow-x-hidden">
      {/* SIDEBAR */}
    

      <div className="w-full flex-1 p-4 md:p-8">
        {/* HEADER */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
          <h1 className="text-xl md:text-2xl tracking-wide bg-[#2A2A2A] rounded-b-sm border border-[#3A3A3A] px-4 py-2 w-full sm:w-auto text-center sm:text-left">
            {visit.collegeName}
          </h1>

          {/* EDIT / SAVE BUTTON */}
          {!showForm ? (
            <button
              className="px-6 py-2 bg-[#FF6F00] hover:bg-[#FF8800] transition rounded-full shadow-md w-full sm:w-auto"
              onClick={handleEdit}
            >
              Edit
            </button>
          ) : (
            <button
              className="px-6 py-2 bg-green-600 hover:bg-green-700 transition rounded-full shadow-md w-full sm:w-auto"
              onClick={handleSave}
            >
              Save
            </button>
          )}
        </div>

        {/* EDIT FORM */}
        {showForm && (
          <div className="bg-[#1E1E1E] border border-[#2E2E2E] p-4 md:p-6 rounded-xl mb-6 shadow-lg">
            <h2 className="text-lg font-bold mb-4">Edit College Details</h2>

            <input
              type="text"
              name="collegeName"
              onChange={handleChange}
              value={formData.collegeName}
              className="w-full p-3 bg-[#2A2A2A] rounded-lg mb-4 border border-[#3A3A3A]"
              placeholder="College Name"
            />

            <textarea
              name="description"
              onChange={handleChange}
              value={formData.description}
              rows={4}
              className="w-full p-3 bg-[#2A2A2A] rounded-lg mb-4 border border-[#3A3A3A]"
              placeholder="Description"
            />
          </div>
        )}

        {/* TEXT SECTION */}
        <h2 className="text-xl font-semibold mb-2">College Collaboration</h2>

        <div className="bg-[#1E1E1E] mb-8 p-4 md:p-6 rounded-xl shadow-lg border border-[#2E2E2E]">
          <p className="text-gray-300 leading-relaxed">{visit.description}</p>
        </div>

        {/* IMAGE SECTION */}
        <h2 className="text-xl font-semibold mb-4">
          Images ({visit.images.length})
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-5">
          {visit.images.map((img) => (
            <div
              key={img.id}
              className="relative group rounded-xl overflow-hidden border border-[#2E2E2E] shadow-lg hover:shadow-xl transition"
            >
              <img
                src={img.src}
                alt="visit"
                className="w-full h-32 sm:h-40 object-cover rounded-lg"
              />

              {/* DELETE IMAGE BUTTON */}
              <button
                onClick={() => handleDeleteImage(img.id)}
                className="absolute top-2 right-2 bg-red-600 px-3 py-1 rounded-md text-xs opacity-0 group-hover:opacity-100 transition"
              >
                Delete
              </button>
            </div>
          ))}

          {/* ADD IMAGE BUTTON */}
          <label
            htmlFor="imageUpload"
            className="w-full h-32 sm:h-40 flex items-center justify-center border-2 border-dashed border-[#3A3A3A] rounded-xl cursor-pointer hover:bg-[#1F1F1F] transition"
          >
            <span className="text-3xl sm:text-4xl font-bold">+</span>
          </label>

          <input
            type="file"
            accept="image/*"
            id="imageUpload"
            className="hidden"
            onChange={handleAddImage}
          />
        </div>
      </div>
    </div>
  );
}
