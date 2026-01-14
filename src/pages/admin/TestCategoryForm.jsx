import React, { useEffect, useState } from "react";
import { Check, Edit, Trash2 } from "lucide-react";
import { useParams, useNavigate } from "react-router-dom";
import ApiService from "../../core/services/api.service";
import ServerUrl from "../../core/constants/serverURL.constant";
import toast from "react-hot-toast";
import { useSingleClick } from "../../core";

const TestCategoryForm = () => {
  const { id } = useParams();
  const isEdit = Boolean(id);
  const navigate = useNavigate();
  const api = new ApiService();
  const singleClick = useSingleClick();

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

    const fetchFromCategoryTests = async () => {
      try {
        setLoading(true);

        const res = await api.apiget(ServerUrl.API_GEY_CATEGORY_AND_TESTS);

        const categories = res.data || [];

        let foundTest = null;
        let foundCategory = null;

        for (const cat of categories) {
          const test = cat.tests?.find((t) => t.id === Number(id));
          if (test) {
            foundTest = test;
            foundCategory = cat;
            break;
          }
        }

        if (!foundTest) throw new Error("Test not found");

        setData({
          category: foundCategory.name,
          course: foundTest.title,
        });
      } catch (err) {
        console.error("Failed to fetch test", err);
      } finally {
        setLoading(false);
      }
    };

    fetchFromCategoryTests();
  }, [id]);

  const handleChange = (field, value) =>
    setData((prev) => ({ ...prev, [field]: value }));

  /* =======================
          UPDATE
  ======================== */
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (isEdit) {
        // UPDATE
        await api.apiput(`${ServerUrl.API_UPDATE_CATEGORY_AND_TESTS}${id}`, {
          categoryName: data.category,
          testTitle: data.course,
          status: true,
        });
        toast.success("Updated successfully");
      } else {
        // CREATE
        await api.apipost(ServerUrl.API_POST_CATEGORY_AND_TESTS, {
          categoryName: data.category,
          testTitle: data.course,
          status: true,
        });
        toast.success("Created successfully");
      }

      navigate(-1);
    } catch (err) {
      console.error(err);
      toast.error("Operation failed");
    }
  };

  /* =======================
          DELETE
  ======================== */
  const handleDelete = async () => {
    const choice = window.prompt(
      "Type:\n1 → Delete ONLY this Test\n2 → Delete CATEGORY with ALL tests & questions"
    );

    if (!choice) return;

    try {
      // DELETE ONLY TEST
      if (choice === "1") {
        if (!window.confirm("Are you sure you want to delete this test?"))
          return;

        await api.apidelete(`${ServerUrl.API_DELETE_TEST}${id}`);

        toast.success("Test deleted");
        navigate(-1);
      }

      // DELETE CATEGORY
      if (choice === "2") {
        const confirm = window.confirm(
          "⚠️ WARNING ⚠️\nDeleting category will delete ALL its tests and questions.\n\nAre you absolutely sure?"
        );

        if (!confirm) return;

        // first fetch categoryId
        const res = await api.apiget(ServerUrl.API_GEY_CATEGORY_AND_TESTS);

        const categories = res.data || [];
        let categoryId = null;

        for (const cat of categories) {
          if (cat.tests?.some((t) => t.id === Number(id))) {
            categoryId = cat.id;
            break;
          }
        }

        if (!categoryId) throw new Error("Category not found");

        await api.apidelete(`${ServerUrl.API_DELETE_CATEGORY}${categoryId}`);

        toast.success("Category deleted with all tests");
        navigate(-1);
      }
    } catch (err) {
      console.error(err);
      toast.error("Delete failed");
    }
  };

  if (loading) return <p className="p-6">Loading...</p>;

  return (
    <form
      onSubmit={(e) => singleClick(() => handleSubmit(e))}
      className="min-h-screen px-6 lg:px-12 py-4"
    >
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
                editMode
                  ? singleClick(() => handleSubmit(new Event("submit")))
                  : setEditMode(true)
              }
            >
              {editMode ? <Check size={20} /> : <Edit size={20} />}
            </button>

            <button
              type="button"
              onClick={() =>
                singleClick(async () => {
                  await handleDelete();
                })
              }
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
          onClick={(e) => singleClick(() => handleSubmit(e))}
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
