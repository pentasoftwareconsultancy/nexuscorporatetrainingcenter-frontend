import React, { useEffect, useState } from "react";
import { Check, Edit, Trash2 } from "lucide-react";
import { useParams, useNavigate } from "react-router-dom";
import ApiService from "../../core/services/api.service";
import ServerUrl from "../../core/constants/serverURL.constant";

const TestCategoryForm = () => {
  const { id } = useParams();
  const isEdit = Boolean(id);
  const navigate = useNavigate();
  const api = new ApiService();

  const [editMode, setEditMode] = useState(!isEdit);
  const [loading, setLoading] = useState(false);

  const [data, setData] = useState({
    category: "",
    course: "",
  });

  /* =======================
        FETCH BY ID
  ======================== */
  useEffect(() => {
    if (!id) return;

    const fetchTest = async () => {
      try {
        setLoading(true);
        const res = await api.apiget(
          `${ServerUrl.API_GET_CATEGORY_WITH_TEST}/${id}`
        );

        const test = res.data.data;

        setData({
          category: test.categoryId,
          course: test.title,
        });
      } catch (err) {
        console.error("Failed to fetch test", err);
      } finally {
        setLoading(false);
      }
    };

    fetchTest();
  }, [id]);

  const handleChange = (field, value) =>
    setData((prev) => ({ ...prev, [field]: value }));

  /* =======================
          UPDATE
  ======================== */
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await api.apiput(
        `${ServerUrl.API_UPDATE_TEST}/${id}`,
        data
      );
      alert("Updated successfully");
      navigate(-1);
    } catch (err) {
      console.error(err);
      alert("Update failed");
    }
  };

  /* =======================
          DELETE
  ======================== */
  const handleDelete = async () => {
    if (!window.confirm("Delete this test?")) return;

    try {
      await api.apidelete(
        `${ServerUrl.API_DELETE_TEST}/${id}`
      );
      alert("Deleted successfully");
      navigate(-1);
    } catch (err) {
      console.error(err);
      alert("Delete failed");
    }
  };

  if (loading) return <p className="p-6">Loading...</p>;

  return (
    <form onSubmit={handleSubmit} className="min-h-screen px-6 lg:px-12 py-4">
      {/* HEADER */}
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-semibold">
          {isEdit ? "Edit Test" : "Add Test"}
        </h1>

        {isEdit && (
          <div className="flex gap-4">
            <button
              type="button"
              className="bg-[#1a1a1a] p-4 rounded-full"
              onClick={() =>
                editMode ? handleSubmit(new Event("submit")) : setEditMode(true)
              }
            >
              {editMode ? <Check size={20} /> : <Edit size={20} />}
            </button>

            <button
              type="button"
              onClick={handleDelete}
              className="bg-[#1a1a1a] p-4 rounded-full"
            >
              <Trash2 size={20} />
            </button>
          </div>
        )}
      </div>

      {/* FIELDS */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
        <InputBox
          label="Test Category"
          value={data.category}
          disabled={!editMode}
          onChange={(v) => handleChange("category", v)}
        />

        <InputBox
          label="Test Name"
          value={data.course}
          disabled={!editMode}
          onChange={(v) => handleChange("course", v)}
        />
      </div>

      {/* ADD BUTTON */}
      {!isEdit && (
        <button
          type="submit"
          className="fixed right-10 bottom-10 w-14 h-14 bg-one text-black text-3xl rounded-full font-bold shadow-lg"
        >
          +
        </button>
      )}
    </form>
  );
};

export default TestCategoryForm;

const InputBox = ({ label, value, onChange, disabled }) => (
  <div className="space-y-1">
    <h2 className="text-lg font-medium">{label}</h2>
    <input
      value={value}
      disabled={disabled}
      onChange={(e) => onChange(e.target.value)}
      className={`w-full bg-[#1a1a1a] border border-gray-700 rounded-xl px-3 py-2 outline-none
        ${disabled ? "opacity-60 cursor-not-allowed" : ""}`}
    />
  </div>
);