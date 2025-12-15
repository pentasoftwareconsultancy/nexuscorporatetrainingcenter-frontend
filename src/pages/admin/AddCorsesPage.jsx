import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Edit, Trash2, Upload } from "lucide-react"; // Import Upload icon
import ServerUrl from "../../core/constants/serverURL.constant";
import ApiService from "../../core/services/api.service";

export default function AddCorsesPage() {
  const { id } = useParams();
  const isEditMode = Boolean(id);
  const api = new ApiService();
  const navigate = useNavigate();

  const initialCourseState = {
    title: "",
    description: "",
    duration: "",
    fees: "",
    categoryId: "",

    // coursedetails table
    instructor: "",
    what_you_will_learn: "",
    syllabus: "",
    syllabus_pdf: null, // file
  };
  const [course, setCourse] = useState(initialCourseState);
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const resetForm = () => {
    setCourse(initialCourseState);
    setNewCategory("");
  };

  useEffect(() => {
    if (!isEditMode) return;

    const fetchFullCourse = async () => {
      try {
        // 1️⃣ fetch course
        const courseRes = await api.apiget(ServerUrl.API_GET_COURSE_BY_ID + id);

        // 2️⃣ fetch course details
        const detailsRes = await api.apiget(
          ServerUrl.API_GET_COURSE_DETAILS_BY_ID + id
        );

        const course = courseRes.data.data;
        const details = detailsRes.data.data;

        setCourse({
          title: course.title || "",
          description: course.description || "",
          duration: course.duration || "",
          fees: course.fees || "",
          categoryId: course.categoryId || "",

          instructor: details?.instructor || "",
          what_you_will_learn: details?.what_you_will_learn || "",
          syllabus: details?.syllabus || "",
          syllabus_pdf: null, // never prefill file
        });
      } catch (err) {
        console.error("Failed to fetch course data", err);
      }
    };

    fetchFullCourse();
  }, [id]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await api.apiget(ServerUrl.API_GET_COURSE_CATEGORIES);
        setCategories(res.data.data);
      } catch (err) {
        console.error("Failed to fetch categories", err);
      }
    };

    fetchCategories();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCourse({ ...course, [name]: value });
  };

  const handleFileChange = (e) => {
    setCourse({ ...course, syllabus_pdf: e.target.files[0] });
  };

  const handleSubmit = async () => {
    if (isSubmitting) return; // 🛑 double safety

    setIsSubmitting(true);

    try {
      let categoryId = course.categoryId;

      if (categoryId === "new") {
        if (!newCategory.trim()) {
          alert("Please enter category name");
          setIsSubmitting(false);
          return;
        }

        const catRes = await api.apipost(ServerUrl.API_ADD_COURSE_CATEGORY, {
          name: newCategory,
        });

        categoryId = catRes.data.data.id;
      }

      if (!categoryId) {
        alert("Category is required");
        setIsSubmitting(false);
        return;
      }

      const formData = new FormData();
      formData.append("title", course.title);
      formData.append("description", course.description);
      formData.append("duration", course.duration);
      formData.append("fees", course.fees);
      formData.append("categoryId", categoryId);
      formData.append("instructor", course.instructor);
      formData.append("what_you_will_learn", course.what_you_will_learn);
      formData.append("syllabus", course.syllabus);

      if (course.syllabus_pdf) {
        formData.append("syllabus_pdf", course.syllabus_pdf);
      }

      await api.apipost(ServerUrl.API_ADD_COURSE_WITH_DETAILS, formData);

      resetForm();
      navigate("/admincourses");
    } catch (err) {
      console.error(err);
      alert("Something went wrong");
    } finally {
      setIsSubmitting(false); // ✅ unlock button
    }
  };

  const handleEdit = async () => {
    // 1️⃣ update course
    await api.apiput(ServerUrl.API_UPDATE_COURSE + id, {
      title: course.title,
      description: course.description,
      duration: course.duration,
      fees: course.fees,
      categoryId: course.categoryId,
    });

    // 2️⃣ update course details
    const formData = new FormData();
    formData.append("instructor", course.instructor);
    formData.append("what_you_will_learn", course.what_you_will_learn);
    formData.append("syllabus", course.syllabus);

    if (course.syllabus_pdf) {
      formData.append("syllabus_pdf", course.syllabus_pdf);
    }

    await api.apiput(ServerUrl.API_UPDATE_COURSE_DETAILS + id, formData);

    alert("Course updated successfully");
  };

  const handleDelete = async () => {
    if (!window.confirm("Delete this course permanently?")) return;

    await api.apidelete(ServerUrl.API_DELETE_COURSE_DETAILS + id);

    await api.apidelete(ServerUrl.API_DELETE_COURSE + id);

    navigate("/admincourses");
  };

  return (
    <div className="flex flex-col md:flex-row text-white font-poppins">
      {/* Main content */}
      <div className="flex-1 p-4 md:p-8 space-y-6 relative">
        <div className="flex justify-between items-center mb-6">
          {/* Title */}
          <h2 className="text-xl font-semibold mb-4">Add Course</h2>
          {/* Top-right icon buttons */}
          {isEditMode && (
            <div className="flex gap-4">
              <button onClick={handleEdit} className="bg-white p-2 rounded">
                <Edit size={20} color="orange" />
              </button>

              <button onClick={handleDelete} className="bg-white p-2 rounded">
                <Trash2 size={20} color="orange" />
              </button>
            </div>
          )}
        </div>
        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Row 1: Name, Duration, Instructor, Phone */}
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 flex flex-col">
              <label className="mb-1">Category</label>

              {/* Dropdown */}
              <select
                value={course.categoryId}
                onChange={(e) =>
                  setCourse({ ...course, categoryId: e.target.value })
                }
                className="bg-[#1a1a1a] p-2 rounded border border-white mb-2"
              >
                <option value="">-- Select Category --</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
                <option value="new">➕ Add New Category</option>
              </select>

              {/* New category input */}
              {course.categoryId === "new" && (
                <input
                  type="text"
                  placeholder="Enter new category name"
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value)}
                  className="bg-[#1a1a1a] p-2 rounded border border-white"
                />
              )}
            </div>
            <div className="flex-1 flex flex-col">
              <label className="mb-1">Course Name</label>
              <input
                type="title"
                name="title"
                value={course.title}
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
                  name="description"
                  value={course.description}
                  onChange={handleChange}
                  className="w-full bg-[#1a1a1a] p-4 rounded border border-white h-48"
                />
              </div>
            </div>

            {/* Right column */}
            <div className="flex-1 flex flex-col">
              <label className="mb-1">What You'll Learn</label>
              <textarea
                name="what_you_will_learn"
                value={course.what_you_will_learn}
                onChange={handleChange}
                className="flex-1 bg-[#1a1a1a] p-4 rounded border border-white h-64"
              />
            </div>
          </div>
          <div>
            <label className="mb-1">Syllabus Details</label>
            <textarea
              name="syllabus"
              value={course.syllabus}
              onChange={handleChange}
              className="w-full bg-[#1a1a1a] p-4 rounded border border-white h-48"
            />
          </div>
        </form>
      </div>
      {!isEditMode && (
        <button
          onClick={handleSubmit}
          disabled={isSubmitting}
          className={`fixed right-10 bottom-10 w-14 h-14 
          ${isSubmitting ? "bg-gray-400 cursor-not-allowed" : "bg-one"}
        text-black text-3xl rounded-full font-bold shadow-lg`}
        >
          {isSubmitting ? "…" : "+"}
        </button>
      )}
    </div>
  );
}
