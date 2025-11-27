import React, { useState } from "react";
import { Pencil, Trash2, Plus, Check } from "lucide-react";

export default function PlacementDetailPage() {
  const initialData = {
    name: "Shravani Padwal",
    courseName: "Data Science",
    courseDuration: "3 months",
    email: "Shravani@gmail.com",
    phone: "1234567890",
    placedIn: "Tech Mahindra",
    role: "AR Associate",
    packageOffered: "7.5 LPA",

    story: [
      {
        title: "Rishikesh’s Success Story:",
        content:
          "From Graduate to Full-Time Developer! Rishi Dhamsa secured a full-time position after joining Nexus CTC’s Placement Guaranteed Program.",
      },
      {
        title: "Facing Job Market Challenges:",
        content:
          "Rishi realized the importance of specialized programs like Nexus CTC after struggling with off-campus opportunities.",
      },
    ],

    programHighlights: [
      "Flexible learning schedule",
      "Hands-on projects",
      "Affordable & beginner-friendly",
      "Placement-focused training",
    ],
  };

  const [data, setData] = useState(initialData);
  const [editMode, setEditMode] = useState(false);

  const handleChange = (field, value) => {
    setData({ ...data, [field]: value });
  };

  const handleStoryChange = (index, field, value) => {
    const updated = [...data.story];
    updated[index][field] = value;
    setData({ ...data, story: updated });
  };

  const handleHighlightChange = (index, value) => {
    const updated = [...data.programHighlights];
    updated[index] = value;
    setData({ ...data, programHighlights: updated });
  };

  const deleteAll = () => {
    if (window.confirm("Are you sure you want to delete ALL data?")) {
      setData(null);
    }
  };

  if (!data) {
    return (
      <div className="min-h-screen bg-[#0b0b0b] text-white flex items-center justify-center text-2xl">
        No Placement Data Found
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0b0b0b] text-white px-6 lg:px-12 py-8 font-sans relative">
      {/* ===== TOP BAR ===== */}
      <div className="flex items-center justify-between">
        {editMode ? (
          <input
            value={data.name}
            onChange={(e) => handleChange("name", e.target.value)}
            className="text-xl sm:text-2xl font-semibold bg-transparent border-b border-gray-600 outline-none"
          />
        ) : (
          <h1 className="text-xl sm:text-2xl font-semibold">{data.name}</h1>
        )}

        {/* Edit + Delete buttons (same UI as image) */}
        <div className="flex gap-3">
          {/* === EDIT / SAVE BUTTON === */}
          <button
            onClick={() => setEditMode(!editMode)}
            className="
              w-9 h-9 flex items-center justify-center cursor-pointer
              bg-[#FFF6EF] border border-[#e8d7c9] rounded-full
              shadow-[0_4px_8px_rgba(0,0,0,0.12)]
              hover:scale-105 transition
            "
          >
            <span className="flex items-center justify-center w-7 h-7 bg-orange-500 rounded-full">
              {editMode ? (
                <Check size={16} color="white" /> // ✅ NEW SAVE ICON
              ) : (
                <Pencil size={16} color="white" />
              )}
            </span>
          </button>

          {/* === DELETE BUTTON === */}
          <button
            onClick={deleteAll}
            className="
              w-9 h-9 flex items-center justify-center cursor-pointer 
              bg-[#FFF6EF] border border-[#e8d7c9] rounded-full
              shadow-[0_4px_8px_rgba(0,0,0,0.12)]
              hover:scale-105 transition
            "
          >
            <span className="flex items-center justify-center w-7 h-7 bg-orange-500 rounded-full">
              <Trash2 size={16} color="white" />
            </span>
          </button>
        </div>
      </div>

      {/* ===== DETAILS GRID ===== */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-6 ">
        <DetailBox
          label="Course name"
          value={data.courseName}
          editable={editMode}
          onChange={(v) => handleChange("courseName", v)}
        />
        <DetailBox
          label="Course duration"
          value={data.courseDuration}
          editable={editMode}
          onChange={(v) => handleChange("courseDuration", v)}
        />
        <DetailBox
          label="Email"
          value={data.email}
          editable={editMode}
          onChange={(v) => handleChange("email", v)}
        />
        <DetailBox
          label="Phone number"
          value={data.phone}
          editable={editMode}
          onChange={(v) => handleChange("phone", v)}
        />

        <DetailBox
          label="Placed In"
          value={data.placedIn}
          editable={editMode}
          onChange={(v) => handleChange("placedIn", v)}
        />
        <DetailBox
          label="Role"
          value={data.role}
          editable={editMode}
          onChange={(v) => handleChange("role", v)}
        />
        <DetailBox
          label="Package"
          value={data.packageOffered}
          editable={editMode}
          onChange={(v) => handleChange("packageOffered", v)}
        />
      </div>

      {/* ===== STORY SECTION ===== */}
      <h2 className="mt-10 mb-3 text-lg font-semibold">Story</h2>
      <div className="bg-[#1a1a1a] border border-gray-700 rounded-xl p-6 space-y-8">
        {data.story.map((sec, index) => (
          <div key={index} className="space-y-1">
            {editMode ? (
              <>
                <input
                  value={sec.title}
                  onChange={(e) =>
                    handleStoryChange(index, "title", e.target.value)
                  }
                  className="w-full bg-transparent border-b border-gray-600 text-lg outline-none"
                />

                <textarea
                  value={sec.content}
                  onChange={(e) =>
                    handleStoryChange(index, "content", e.target.value)
                  }
                  className="w-full bg-transparent border border-gray-700 p-3 rounded-lg outline-none"
                  rows={4}
                />
              </>
            ) : (
              <>
                <h3 className="text-lg font-semibold">{sec.title}</h3>
                <p className="text-gray-300 text-sm leading-relaxed">
                  {sec.content}
                </p>
              </>
            )}
          </div>
        ))}
      </div>

      {/* ===== PROGRAM HIGHLIGHTS ===== */}
      <h2 className="mt-10 mb-3 text-lg font-semibold">Program Highlights</h2>

      <div className="bg-[#1a1a1a] border border-gray-700 rounded-xl p-6 space-y-4">
        {data.programHighlights.map((item, index) => (
          <div key={index}>
            {editMode ? (
              <input
                value={item}
                onChange={(e) => handleHighlightChange(index, e.target.value)}
                className="w-full bg-transparent border-b border-gray-600 outline-none pb-1"
              />
            ) : (
              <p className="text-gray-300 text-sm">• {item}</p>
            )}
          </div>
        ))}
      </div>

      {/* ===== ADD STORY BUTTON ===== */}
      {/* <button
        onClick={() =>
          setData({
            ...data,
            story: [...data.story, { title: "New Story Title", content: "Write here..." }],
          })
        }
        className="
          fixed bottom-6 right-6 cursor-pointer w-10 h-10 flex items-center justify-center
          bg-[#FFF6EF] border border-[#e8d7c9] rounded-full 
          shadow-[inset_2px_2px_4px_rgba(255,255,255,0.8),inset_-2px_-2px_4px_rgba(0,0,0,0.12)]
          hover:scale-110 transition
        "
      >
        <span className="flex items-center justify-center w-7 h-7 bg-orange-500 rounded-full">
          <Plus size={16} color="white" />
        </span>
      </button> */}
    </div>
  );
}

/* ================= Detail Box Component ================= */
const DetailBox = ({ label, value, editable, onChange, className = "" }) => (
  <div className="space-y-1">
    <p className="text-xs text-[#FFF3EA] font-medium">{label}</p>

    {editable ? (
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`w-full  border border-[#FFF3EA] rounded-md text-sm px-3 py-2 outline-none ${className}`}
      />
    ) : (
      <div
        className={`w-full bg-[#242424] border border-[#FFF3EA] rounded-md text-sm px-3 py-2 ${className}`}
      >
        {value}
      </div>
    )}
  </div>
);
