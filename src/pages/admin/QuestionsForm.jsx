import React, { useState } from "react";
import { Check, Edit, Trash2 } from "lucide-react";
import { useParams, useNavigate } from "react-router-dom";

const QuestionsForm = () => {
  const { id } = useParams();
  const mode = id ? "edit" : "add";
  const navigate = useNavigate();

  const [editMode, setEditMode] = useState(true);

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

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Question Payload:", data);
    alert("Question saved (UI only)");
    navigate(-1);
  };

  const handleDelete = () => {
    if (!window.confirm("Delete this question?")) return;
    alert("Deleted (UI only)");
    navigate(-1);
  };

  return (
    <form onSubmit={handleSubmit} className="min-h-screen px-6 lg:px-12 py-4">
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
            {/* RADIO */}
            <input
              type="radio"
              name="correctOption"
              checked={opt.isCorrect === 1}
              onChange={() => setCorrectOption(idx)}
              className="accent-orange-500 cursor-pointer"
            />

            {/* OPTION INPUT */}
            <input
              type="text"
              placeholder={`Option ${idx + 1}`}
              value={opt.text}
              onChange={(e) => handleOptionChange(idx, e.target.value)}
              className="flex-1 bg-transparent outline-none"
            />

            {/* CORRECT LABEL */}
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
          onChange={(e) =>
            setData((p) => ({ ...p, reason: e.target.value }))
          }
          placeholder="Explain why this option is correct..."
          className="w-full mt-2 border border-gray-700 rounded-xl px-4 py-3 outline-none resize-none min-h-[120px]"
        />
      </div>

      {/* ADD BUTTON */}
      {mode === "add" && (
        <button
          type="submit"
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
