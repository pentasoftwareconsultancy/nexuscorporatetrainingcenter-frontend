import React, { useState } from "react";
import { Edit, Trash2, LogOut, Upload } from "lucide-react"; // Import Upload icon

export default function CoursesAddEditPage() {
  const initialCourseState = {
    name: "",
    duration: "",
    instructor: "",
    phone: "",
    fees: "",
    syllabus: null,
    about: "",
    learn: "",
  };

  const [course, setCourse] = useState(initialCourseState);
  const [savedCourse, setSavedCourse] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCourse({ ...course, [name]: value });
  };

  const handleFileChange = (e) => {
    setCourse({ ...course, syllabus: e.target.files[0] });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSavedCourse(course);
    alert("Course submitted!");
    console.log("Saved Course:", course);
  };

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this course?")) {
      setCourse(initialCourseState);
      setSavedCourse(null);
    }
  };

  const handleEdit = () => {
    if (savedCourse) {
      setCourse(savedCourse);
    } else {
      alert("No saved course to edit!");
    }
  };

  return (
    <div className="flex flex-col md:flex-row h-screen bg-[#0f0f0f] text-white font-poppins">
      {/* Sidebar */}
      <div className="w-full md:w-48 bg-[#1f1f1f] p-4 flex flex-col justify-between">
        <div>
          <h1 className="text-2xl font-bold text-orange-500 mb-8">NEXUS</h1>
          <ul className="space-y-4">
            <li className="bg-[#2a2a2a] px-4 py-2 rounded">Dashboard</li>
            <li className="bg-[#fff] text-black px-4 py-2 rounded">Courses</li>
            <li className="px-4 py-2 rounded hover:bg-[#2a2a2a] cursor-pointer">Gallery</li>
            <li className="px-4 py-2 rounded hover:bg-[#2a2a2a] cursor-pointer">Placements</li>
          </ul>
        </div>
        <button className="bg-orange-500 px-4 py-2 rounded flex items-center justify-center gap-2 mt-4 md:mt-0">
          <LogOut size={16} />
        </button>
      </div>

      {/* Main content */}
      <div className="flex-1 p-4 md:p-8 space-y-6 relative">
        {/* Top-right icon buttons */}
        <div className="flex justify-end gap-4 mb-4">
          <button
            onClick={handleEdit}
            className="bg-white p-2 rounded flex items-center justify-center"
          >
            <Edit size={20} color="orange" />
          </button>
          <button
            onClick={handleDelete}
            className="bg-white p-2 rounded flex items-center justify-center"
          >
            <Trash2 size={20} color="orange" />
          </button>
        </div>

        {/* Title */}
        <h2 className="text-xl font-semibold mb-4">Add Course</h2>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Row 1: Name, Duration, Instructor, Phone */}
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 flex flex-col">
              <label className="mb-1">Course Name</label>
              <input
                type="text"
                name="name"
                value={course.name}
                onChange={handleChange}
                className="flex-1 bg-[#1a1a1a] p-2 rounded border border-white"
              />
            </div>
            <div className="flex-1 flex flex-col">
              <label className="mb-1">Course Duration</label>
              <input
                type="text"
                name="duration"
                value={course.duration}
                onChange={handleChange}
                className="flex-1 bg-[#1a1a1a] p-2 rounded border border-white"
              />
            </div>
            <div className="flex-1 flex flex-col">
              <label className="mb-1">Instructor</label>
              <input
                type="text"
                name="instructor"
                value={course.instructor}
                onChange={handleChange}
                className="flex-1 bg-[#1a1a1a] p-2 rounded border border-white"
              />
            </div>
            <div className="flex-1 flex flex-col">
              <label className="mb-1">Phone Number</label>
              <input
                type="text"
                name="phone"
                value={course.phone}
                onChange={handleChange}
                className="flex-1 bg-[#1a1a1a] p-2 rounded border border-white"
              />
            </div>
          </div>

          {/* Row 2: Left column (Fees + Upload PDF + About) and Right column (What You'll Learn) */}
          <div className="flex flex-col md:flex-row gap-4">
            {/* Left column */}
            <div className="flex-1 flex flex-col gap-4">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1 flex flex-col">
                  <label className="mb-1">Fees</label>
                  <input
                    type="text"
                    name="fees"
                    value={course.fees}
                    onChange={handleChange}
                    className="flex-1 bg-[#1a1a1a] p-2 rounded border border-white h-[50px]"
                  />
                </div>
                <div className="flex-1 flex flex-col">
                  <label className="mb-1">Syllabus</label>
                  <label className="flex items-center justify-center gap-2 bg-[#1a1a1a] border border-white rounded p-2 cursor-pointer h-[50px]">
                    <Upload size={18} /> Upload PDF {/* Added upload icon */}
                    <input
                      type="file"
                      accept="application/pdf"
                      onChange={handleFileChange}
                      className="hidden"
                    />
                  </label>
                </div>
              </div>

              <div className="flex flex-col">
                <label className="mb-1">About Course</label>
                <textarea
                  name="about"
                  value={course.about}
                  onChange={handleChange}
                  className="w-full bg-[#1a1a1a] p-4 rounded border border-white h-48"
                />
              </div>
            </div>

            {/* Right column */}
            <div className="flex-1 flex flex-col">
              <label className="mb-1">What You'll Learn</label>
              <textarea
                name="learn"
                value={course.learn}
                onChange={handleChange}
                className="flex-1 bg-[#1a1a1a] p-4 rounded border border-white h-64"
              />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
