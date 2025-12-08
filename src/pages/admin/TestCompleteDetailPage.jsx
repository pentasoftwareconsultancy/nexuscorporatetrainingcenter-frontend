
import React, { useState } from "react";
import { Pencil, Trash2, Check } from "lucide-react";

export default function TestCompleteDetailPage() {
  const initialData = {
    name: "Shravani Padwal",
    details: [
      { label: "Course name", value: "Data Science" },
      { label: "Course duration", value: "3 months" },
      { label: "Email", value: "Shravani@gmail.com" },
      { label: "Phone number", value: "1234567890" },
      { label: "Test", value: "Data Science (80 Questions)" },
      { label: "Certificate", value: "Completed" },
      { label: "Number of Attempts", value: "3" },
      { label: "Topics covered", value: "6" },
    ],
  };

  const [data, setData] = useState(initialData);
  const [editMode, setEditMode] = useState(false);

  const handleEditChange = (index, newValue) => {
    const updated = [...data.details];
    updated[index].value = newValue;
    setData({ ...data, details: updated });
  };

  const deleteAll = () => {
    if (window.confirm("Are you sure you want to delete all test records?")) {
      setData(null);
    }
  };

  if (!data) {
    return (
      <div className="min-h-screen bg-[#0b0b0b] text-white flex items-center justify-center text-lg sm:text-xl text-center px-3">
        No Test Data Found
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0b0b0b] text-white px-4 sm:px-6 py-6 sm:py-8 font-sans">
      {/* ===== HEADER ===== */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sm:gap-0 mb-8">
        {/* Name */}
        {editMode ? (
          <input
            value={data.name}
            onChange={(e) => setData({ ...data, name: e.target.value })}
            className="text-base sm:text-xl font-semibold bg-transparent border-b border-gray-600 outline-none w-full sm:w-auto"
          />
        ) : (
          <h1 className="text-base sm:text-xl font-semibold w-full sm:w-auto break-words">
            {data.name}
          </h1>
        )}

        {/* Action buttons */}
        <div className="flex gap-3 self-end sm:self-auto">
          {/* EDIT / SAVE */}
          <button
            onClick={() => setEditMode(!editMode)}
            className="
              w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center cursor-pointer
              bg-[#FFF6EF] border border-[#e8d7c9] rounded-full shadow
              hover:scale-105 transition
            "
          >
            <span className="flex items-center justify-center w-6 h-6 sm:w-7 sm:h-7 bg-orange-500 rounded-full">
              {editMode ? (
                <Check size={14} color="white" />
              ) : (
                <Pencil size={14} color="white" />
              )}
            </span>
          </button>

          {/* DELETE */}
          <button
            onClick={deleteAll}
            className="
              w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center cursor-pointer 
              bg-[#FFF6EF] border border-[#e8d7c9] rounded-full shadow
              hover:scale-105 transition
            "
          >
            <span className="flex items-center justify-center w-6 h-6 sm:w-7 sm:h-7 bg-orange-500 rounded-full">
              <Trash2 size={14} color="white" />
            </span>
          </button>
        </div>
      </div>

      {/* ===== DETAILS GRID ===== */}
      <div
        className="
          grid grid-cols-1 
          sm:grid-cols-2 
          lg:grid-cols-4 
          gap-3 sm:gap-4
        "
      >
        {data.details.map((item, index) => (
          <div key={index}>
            {/* LABEL */}
            <p className="text-[10px] sm:text-xs text-gray-300 mb-1">
              {item.label}
            </p>

            {/* VALUE / INPUT */}
            {editMode ? (
              <input
                className="
                  w-full bg-transparent border border-gray-700 rounded-md 
                  px-3 py-2 text-[11px] sm:text-sm text-white outline-none
                "
                value={item.value}
                onChange={(e) => handleEditChange(index, e.target.value)}
              />
            ) : (
              <div
                className="
                  w-full bg-transparent border border-gray-700 rounded-md 
                  px-3 py-2 text-[11px] sm:text-sm break-words
                "
              >
                {item.value}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
