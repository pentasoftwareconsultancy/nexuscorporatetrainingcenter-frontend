import React, { useEffect, useState } from "react";
import { Check, Edit, Trash2 } from "lucide-react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import ApiService from "../../core/services/api.service";
import ServerUrl from "../../core/constants/serverURL.constant";
import toast from "react-hot-toast";
import { useSingleClick } from "../../core";

const QuestionsForm = () => {
  const { id: questionId } = useParams(); // questionId for edit
  const { state } = useLocation(); // expect testId from navigation
  const testId = state?.testId;
  const singleClick = useSingleClick();

  const mode = questionId ? "edit" : "add";
  const navigate = useNavigate();
  const api = new ApiService();

  const [editMode, setEditMode] = useState(mode === "add");
  const [loading, setLoading] = useState(false);

  const [excelFile, setExcelFile] = useState(null);
  const [bulkLoading, setBulkLoading] = useState(false);

  const [data, setData] = useState({
    question: "",
    options: [
      { text: "", isCorrect: 0 },
      { text: "", isCorrect: 0 },
      { text: "", isCorrect: 0 },
      { text: "", isCorrect: 0 },
    ],
    reason: "",
  });

  /* =======================
        FETCH (EDIT)
  ======================== */
  useEffect(() => {
    if (!questionId || !testId) return;

    const fetchQuestion = async () => {
      try {
        setLoading(true);

        const res = await api.apiget(
          `${ServerUrl.API_GET_QUESTIONS_AND_OPTIONS}${testId}/questions`,
        );

        const q = res.data.questions.find(
          (item) => item.id === Number(questionId),
        );

        if (!q) return;

        setData({
          question: q.question_text,
          reason: q.answer_explanation || "",
          options:
            q.options.length > 0
              ? q.options.map((o) => ({
                  text: o.option_text,
                  isCorrect: o.is_correct ? 1 : 0,
                }))
              : data.options,
        });
      } catch (err) {
        console.error("Fetch question failed", err);
      } finally {
        setLoading(false);
      }
    };

    fetchQuestion();
  }, [questionId, testId]);

  /* =======================
        HANDLERS
  ======================== */
  const handleQuestionChange = (value) =>
    setData((p) => ({ ...p, question: value }));

  const handleOptionChange = (index, value) => {
    const updated = [...data.options];
    updated[index].text = value;
    setData((p) => ({ ...p, options: updated }));
  };

  const setCorrectOption = (index) => {
    const updated = data.options.map((o, i) => ({
      ...o,
      isCorrect: i === index ? 1 : 0,
    }));
    setData((p) => ({ ...p, options: updated }));
  };

  const mapOptionsForApi = (options) =>
    options.map((o) => ({
      option_text: o.text,
      is_correct: o.isCorrect === 1,
    }));

  // ✅ SINGLE-CLICK SAFE WRAPPERS
  const onSubmitSingleClick = (e) => singleClick(() => handleSubmit(e));

  const onDeleteSingleClick = () => singleClick(() => handleDelete());

  /* =======================
        SUBMIT (ADD / EDIT)
  ======================== */
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      if (mode === "add") {
        const payload = {
          testId,
          question_text: data.question,
          answer_explanation: data.reason,
          options: mapOptionsForApi(data.options),
        };

        await api.apipost(ServerUrl.API_POST_QUESTIONS_AND_OPTIONS, payload);
      } else {
        const payload = {
          question_text: data.question,
          answer_explanation: data.reason,
          options: mapOptionsForApi(data.options),
        };

        await api.apiput(
          `${ServerUrl.API_UPDATE_QUESTIONS_AND_OPTIONS}${questionId}`,
          payload,
        );
      }

      toast.success("Question saved successfully");
      navigate(-1);
    } catch (err) {
      console.error(err);
      toast.error("Failed to save question");
    } finally {
      setLoading(false);
    }
  };

  /* =======================
        DELETE
  ======================== */
  const handleDelete = async () => {
    if (!window.confirm("Delete this question?")) return;

    try {
      setLoading(true);

      await api.apidelete(ServerUrl.API_DELETE_QUESTIONS_AND_OPTIONS, {
        data: {
          questionId: Number(questionId),
          testId: Number(testId),
        },
      });

      toast.success("Question deleted successfully");
      navigate(-1);
    } catch (err) {
      console.error("Delete failed", err);
      toast.error("Delete failed");
    } finally {
      setLoading(false);
    }
  };

  const handleExcelUpload = async () => {
    if (!excelFile) {
      toast.error("Please select an Excel file");
      return;
    }

    try {
      setBulkLoading(true);

      const formData = new FormData();
      formData.append("file", excelFile); // REAL FILE

      await api.apipostForm(`${ServerUrl.API_BULK_POST}${testId}`, formData);

      toast.success("Excel uploaded successfully");
      navigate(-1);
    } catch (err) {
      console.error(err);
      toast.error("Excel upload failed");
    } finally {
      setBulkLoading(false);
    }
  };

  if (loading) {
    return <p className="p-6">Loading...</p>;
  }

  return (
    <form
      onSubmit={onSubmitSingleClick}
      className="min-h-screen px-6 lg:px-12 py-4"
    >
      {/* HEADER */}
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-semibold">
          {mode === "add" ? "Add Question" : "Edit Question"}
        </h1>

        {mode === "edit" && (
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
              onClick={onDeleteSingleClick}
              className="bg-[#1a1a1a] p-4 rounded-full"
            >
              <Trash2 size={20} />
            </button>
          </div>
        )}
      </div>

      {/* BULK UPLOAD */}
      {mode === "add" && (
        <div className="mt-6 p-4 border border-dashed border-gray-600 rounded-xl">
          <div className="flex md:flex-row gap-4 items-start md:items-center justify-between">
            <div>
              <h2 className="text-lg font-medium mb-2">Bulk Upload (Excel)</h2>
              <input
                type="file"
                accept=".xlsx,.xls"
                onChange={(e) => setExcelFile(e.target.files[0])}
                className="block text-sm text-gray-400"
              />
              <p className="mt-2 text-xs text-gray-400">
                Excel format must match predefined columns (Question, Option
                A–D, Correct Option, Explanation)
              </p>
            </div>
            <button
              type="button"
              disabled={bulkLoading}
              onClick={handleExcelUpload}
              className="px-6 py-2 rounded-lg bg-one text-black font-semibold disabled:opacity-60"
            >
              {bulkLoading ? "Uploading..." : "Upload Excel"}
            </button>
          </div>
        </div>
      )}

      {/* QUESTION */}
      <div className="mt-6">
        <InputBox
          label="Question"
          value={data.question}
          onChange={handleQuestionChange}
        />
      </div>

      {/* OPTIONS */}
      <div className="mt-6 space-y-4">
        <h2 className="text-lg font-medium">Options</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {data.options.map((opt, idx) => (
            <div
              key={idx}
              className="flex items-center gap-3 border border-gray-700 rounded-xl px-4 py-3"
            >
              <input
                type="radio"
                name="correctOption"
                checked={opt.isCorrect === 1}
                onChange={() => setCorrectOption(idx)}
                className="accent-orange-500 cursor-pointer"
              />

              <input
                type="text"
                placeholder={`Option ${idx + 1}`}
                value={opt.text}
                onChange={(e) => handleOptionChange(idx, e.target.value)}
                className="flex-1 bg-transparent outline-none"
              />

              {opt.isCorrect === 1 && (
                <span className="text-green-400 text-xs font-semibold">
                  Correct
                </span>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* REASON */}
      <div className="mt-6">
        <h2 className="text-lg font-medium">Reason / Explanation</h2>
        <textarea
          value={data.reason}
          onChange={(e) => setData((p) => ({ ...p, reason: e.target.value }))}
          placeholder="Explain why this option is correct..."
          className="w-full mt-2 border border-gray-700 rounded-xl px-4 py-3 outline-none resize-none min-h-[120px]"
        />
      </div>

      {/* ADD BUTTON */}
      {mode === "add" && (
        <button
          type="submit"
          onClick={onSubmitSingleClick}
          className="fixed right-10 bottom-10 w-14 h-14 bg-one text-black text-3xl rounded-full font-bold shadow-lg flex justify-center items-center"
        >
          +
        </button>
      )}
    </form>
  );
};

export default QuestionsForm;

/* =======================
      INPUT COMPONENT
======================== */
const InputBox = ({ label, value, onChange }) => (
  <div className="space-y-1">
    <h2 className="text-lg font-medium">{label}</h2>
    <input
      value={value}
      placeholder={label}
      onChange={(e) => onChange(e.target.value)}
      className="w-full border border-gray-700 rounded-xl px-4 py-2 outline-none"
    />
  </div>
);
