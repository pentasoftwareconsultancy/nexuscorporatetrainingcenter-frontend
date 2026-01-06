import React, { use, useState } from "react";
import { Search } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../core/constants/routes.constant";

const AdminQuestionsDashboardPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  // 🔹 Dummy course + questions data
  const courseName = "Full Stack Python";

  const questions = [
    {
      id: 1,
      question: "What is React?",
      correctAnswer: "A JavaScript library for building UI",
    },
    {
      id: 2,
      question: "What is JSX?",
      correctAnswer: "Syntax extension for JavaScript",
    },
    {
      id: 3,
      question: "What is useState?",
      correctAnswer: "React Hook for state management",
    },
  ];

  // 🔍 Filter questions
  const filteredQuestions = questions.filter(
    (q) =>
      q.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      q.correctAnswer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="relative min-h-screen flex text-white font-sora">
      {/* MAIN CONTENT */}
      <main className="flex-1 p-4 md:p-8">
        {/* HEADING */}
        <h2 className="text-xl md:text-2xl font-semibold pb-5">
          {courseName} Questions ({filteredQuestions.length})
        </h2>

        {/* SEARCH */}
        <div className="mt-4 relative">
          <Search
            className="absolute left-4 top-3 text-gray-400"
            size={20}
          />
          <input
            type="text"
            placeholder="Search question or answer"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full border border-white rounded-full py-3 pl-12 pr-5
            outline-none focus:ring-2 focus:ring-orange-400 transition bg-transparent"
          />
        </div>

        {/* HEADER */}
        <div className="mt-6 hidden md:grid grid-cols-12 gap-4 font-bold text-sm">
          <div className="col-span-1">Sr No</div>
          <div className="col-span-7">Question</div>
          <div className="col-span-4">Correct Answer</div>
        </div>

        {/* DATA LIST */}
        <div className="flex flex-col gap-4 mt-4">
          {filteredQuestions.map((q, idx) => (
            <div
              key={q.id}
              onClick={() => navigate(`${ROUTES.ADMIN_QUESTION_FORM_EDIT}/${q.id}`)}
              className="border border-white rounded-xl p-4 hover:bg-[#222] transition
              grid grid-cols-1 md:grid-cols-12 gap-2 md:gap-4 items-start"
            >
              {/* SR NO */}
              <div className="md:col-span-1 font-semibold">
                {idx + 1}
              </div>

              {/* QUESTION */}
              <div className="md:col-span-7 text-sm leading-relaxed">
                {q.question}
              </div>

              {/* ANSWER */}
              <div className="md:col-span-4 text-green-400 text-sm">
                {q.correctAnswer}
              </div>
            </div>
          ))}

          {/* EMPTY STATE */}
          {filteredQuestions.length === 0 && (
            <p className="text-center text-gray-400 mt-4">
              No questions found
            </p>
          )}
        </div>
      </main>
      <button
        onClick={() => navigate(ROUTES.ADMIN_QUESTION_FORM)}
        className="fixed right-10 bottom-10 w-14 h-14 bg-one text-black text-3xl rounded-full font-bold shadow-lg"
      >
        +
      </button>
    </div>
  );
};

export default AdminQuestionsDashboardPage;
