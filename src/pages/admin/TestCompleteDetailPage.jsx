// import React from "react";
// import { Pencil, Trash2, Plus } from "lucide-react";

// export default function TestCompleted() {
//   const userData = {
//     name: "Shravani Padwal",
//     courseName: "Data Science",
//     duration: "3 months",
//     email: "Shravani@gmail.com",
//     phone: "1234567890",
//     test: "Data Science (80 Questions)",
//     certificate: "Completed",
//     attempts: "3",
//     topicsCovered: "6",
//   };

//   const inputStyle =
//     "w-full bg-transparent border border-gray-500 rounded-lg px-3 py-2 text-sm text-white";

//   return (
//     <div className="min-h-screen bg-[#0b0b0b] text-white px-6 py-6 font-sans">

//       {/* Header Section */}
//       <div className="flex justify-between items-center mb-6">
//         <h1 className="text-lg font-medium">{userData.name}</h1>

//         <div className="flex items-center gap-3">
//           {/* Edit button */}
//           <button className="w-9 h-9 flex items-center justify-center rounded-full bg-[#FFF6EF] border border-[#e8d7c9] shadow-md hover:scale-105 transition">
//             <Pencil size={16} className="text-orange-500" />
//           </button>

//           {/* Delete button */}
//           <button className="w-9 h-9 flex items-center justify-center rounded-full bg-[#FFF6EF] border border-[#e8d7c9] shadow-md hover:scale-105 transition">
//             <Trash2 size={16} className="text-orange-500" />
//           </button>
//         </div>
//       </div>

//       {/* GRID */}
//       <div className="grid grid-cols-1 md:grid-cols-4 gap-4">

//         <div>
//           <label className="text-xs text-gray-400 font-semibold">Course name</label>
//           <input className={inputStyle} value={userData.courseName} readOnly />
//         </div>

//         <div>
//           <label className="text-xs text-gray-400">Course duration</label>
//           <input className={inputStyle} value={userData.duration} readOnly />
//         </div>

//         <div>
//           <label className="text-xs text-gray-400">Email</label>
//           <input className={inputStyle} value={userData.email} readOnly />
//         </div>

//         <div>
//           <label className="text-xs text-gray-400">Phone number</label>
//           <input className={inputStyle} value={userData.phone} readOnly />
//         </div>

//         <div>
//           <label className="text-xs text-gray-400">Test</label>
//           <input className={inputStyle} value={userData.test} readOnly />
//         </div>

//         <div>
//           <label className="text-xs text-gray-400">Certificate</label>
//           <input className={inputStyle} value={userData.certificate} readOnly />
//         </div>

//         <div>
//           <label className="text-xs text-gray-400">Number of Attempts</label>
//           <input className={inputStyle} value={userData.attempts} readOnly />
//         </div>

//         <div>
//           <label className="text-xs text-gray-400">Topic covered</label>
//           <input className={inputStyle} value={userData.topicsCovered} readOnly />
//         </div>
//       </div>

//       {/* Add Button */}
//       <div className="flex justify-end mt-8">
//         <button
//   className="
//     fixed bottom-6 right-6
//     w-12 h-12 flex items-center justify-center
//     bg-[#FFF6EF] border border-[#e8d7c9] rounded-full
//     shadow-lg hover:scale-110 transition z-50
//   "
// >
//   <Plus size={22} className="text-orange-500" />
// </button>
//       </div>
//     </div>
//   );
// }

// import React from "react";
// import { Pencil, Trash2, Plus } from "lucide-react";

// export default function TestCompleted() {
//   const userData = {
//     name: "Shravani Padwal",
//     courseName: "Data Science",
//     duration: "3 months",
//     email: "Shravani@gmail.com",
//     phone: "1234567890",
//     test: "Data Science (80 Questions)",
//     certificate: "Completed",
//     attempts: "3",
//     topicsCovered: "6",
//   };

//   const inputStyle =
//     "w-full bg-transparent border border-gray-700 rounded-md px-3 py-2 text-sm text-white outline-none";

//   return (
//     <div className="min-h-screen bg-[#0b0b0b] text-white px-6 py-8 font-sans">

//       {/* ===== HEADER WITH BUTTONS (Same UI as previous) ===== */}
//       <div className="flex justify-between items-center mb-8">
//         <h1 className="text-lg sm:text-xl font-semibold">{userData.name}</h1>

//         <div className="flex gap-3">

//           {/* === EDIT BUTTON (Same UI) === */}
//           <button
//             className="
//               w-9 h-9 flex items-center justify-center cursor-pointer
//               bg-[#FFF6EF] border border-[#e8d7c9] rounded-full
//               shadow-[0_4px_8px_rgba(0,0,0,0.12)]
//               hover:scale-105 transition
//             "
//           >
//             <span className="flex items-center justify-center w-7 h-7 bg-orange-500 rounded-full">
//               <Pencil size={16} color="white" />
//             </span>
//           </button>

//           {/* === DELETE BUTTON (Same UI) === */}
//           <button
//             className="
//               w-9 h-9 flex items-center justify-center cursor-pointer
//               bg-[#FFF6EF] border border-[#e8d7c9] rounded-full
//               shadow-[0_4px_8px_rgba(0,0,0,0.12)]
//               hover:scale-105 transition
//             "
//           >
//             <span className="flex items-center justify-center w-7 h-7 bg-orange-500 rounded-full">
//               <Trash2 size={16} color="white" />
//             </span>
//           </button>

//         </div>
//       </div>

//       {/* ===== GRID DETAILS ===== */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">

//         <Detail label="Course name" value={userData.courseName} inputStyle={inputStyle} />
//         <Detail label="Course duration" value={userData.duration} inputStyle={inputStyle} />
//         <Detail label="Email" value={userData.email} inputStyle={inputStyle} />
//         <Detail label="Phone number" value={userData.phone} inputStyle={inputStyle} />
//         <Detail label="Test" value={userData.test} inputStyle={inputStyle} />
//         <Detail label="Certificate" value={userData.certificate} inputStyle={inputStyle} />
//         <Detail label="Number of Attempts" value={userData.attempts} inputStyle={inputStyle} />
//         <Detail label="Topic covered" value={userData.topicsCovered} inputStyle={inputStyle} />

//       </div>

//       {/* ===== FIXED ADD BUTTON (Same UI as Nexus branding) ===== */}
//       {/* <button
//         className="
//           fixed bottom-6 right-6 cursor-pointer w-10 h-10 flex items-center justify-center
//           bg-[#FFF6EF] border border-[#e8d7c9] rounded-ful
//           shadow-[inset_2px_2px_4px_rgba(255,255,255,0.8),inset_-2px_-2px_4px_rgba(0,0,0,0.12)]
//           hover:scale-110 transition
//         "
//       >
//         <span className="flex items-center justify-center w-7 h-7 bg-orange-500 rounded-full">
//           <Plus size={16} color="white" />
//         </span>
//       </button> */}

//     </div>
//   );
// }

// /* ===== REUSABLE DETAIL ROW ===== */
// const Detail = ({ label, value, inputStyle }) => (
//   <div>
//     <p className="text-xs text-gray-300 mb-1">{label}</p>
//     <input className={inputStyle} value={value} readOnly />
//   </div>
// );

import React, { useState } from "react";
import { Pencil, Trash2, Plus, Check } from "lucide-react";

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

  const addNewField = () => {
    const label = prompt("Enter field name:");
    if (!label) return;

    const value = prompt("Enter value:");
    if (value === null) return;

    setData({
      ...data,
      details: [...data.details, { label, value }],
    });
  };

  if (!data) {
    return (
      <div className="min-h-screen bg-[#0b0b0b] text-white flex items-center justify-center text-xl">
        No Test Data Found
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0b0b0b] text-white px-6 py-8 font-sans">
      {/* ===== HEADER ===== */}
      <div className="flex justify-between items-center mb-8">
        {editMode ? (
          <input
            value={data.name}
            onChange={(e) => setData({ ...data, name: e.target.value })}
            className="text-lg sm:text-xl font-semibold bg-transparent border-b border-gray-600 outline-none"
          />
        ) : (
          <h1 className="text-lg sm:text-xl font-semibold">{data.name}</h1>
        )}

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
                <Check size={16} color="white" />
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
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {data.details.map((item, index) => (
          <div key={index}>
            <p className="text-xs text-gray-300 mb-1">{item.label}</p>

            {editMode ? (
              <input
                className="w-full bg-transparent border border-gray-700 rounded-md px-3 py-2 text-sm text-white outline-none"
                value={item.value}
                onChange={(e) => handleEditChange(index, e.target.value)}
              />
            ) : (
              <div className="w-full bg-transparent border border-gray-700 rounded-md px-3 py-2 text-sm">
                {item.value}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* ===== ADD BUTTON ===== */}
      {/* <button
        onClick={addNewField}
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
