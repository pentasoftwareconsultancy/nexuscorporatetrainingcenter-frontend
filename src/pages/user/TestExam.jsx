import React, { useState } from "react";
import Button from "../../components/common/Button";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../core/constants/routes.constant";

export default function TestExam() {
  // Popup 1: ask number of questions
  const [showSelectPopup, setShowSelectPopup] = useState(true);

  // Popup 2: ask to confirm final submission
  const [showSubmitPopup, setShowSubmitPopup] = useState(false);

  const [totalQuestions, setTotalQuestions] = useState(20);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const navigate = useNavigate();

  // Dynamic questions
  const quizData = Array.from({ length: totalQuestions }, (_, i) => ({
    question: `Sample Question ${i + 1} — What is correct answer?`,
    options: ["Option A", "Option B", "Option C", "Option D"],
    answer: "Option A",
  }));

  const currentQuestion = quizData[currentQuestionIndex];

  const handleNext = () => {
    if (currentQuestionIndex < totalQuestions - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleSubmit = () => {
    setShowSubmitPopup(true);
  };

  const confirmSubmit = () => {
    // 🚀 Here redirect to success page
    navigate(ROUTES.USER_SUCCESS);
  };

  return (
    <div className="min-h-screen text-white flex flex-col w-full overflow-x-hidden relative">

      {/* =================================================== */}
      {/* 🔥 POPUP — SELECT NUMBER OF QUESTIONS */}
      {/* =================================================== */}
      {showSelectPopup && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <div className="flex flex-col bg-zinc-900 p-8 rounded-xl px-2 max-w-md shadow-xl text-center justify-center">

            <h2 className="text-xl font-semibold mb-4">
              Take a Quiz
            </h2>

            <h2 className="text-l font-semibold mb-2">
              How many questions you want to take?
            </h2>

            {/* Radio Options */}
            <div className="flex gap-4 my-4 items-center justify-center mx-auto w-fit">
              {[10, 20, 30].map((num) => (
                <label
                  key={num}
                  className="flex items-center gap-3 cursor-pointer text-gray-300 hover:text-orange-400 transition"
                >
                  <input
                    type="radio"
                    name="totalQuestions"
                    value={num}
                    onChange={() => setTotalQuestions(num)}
                    className="w-4 h-4 accent-orange-500"
                  />
                  <span className="text-lg">{num}</span>
                </label>
              ))}
            </div>

            <Button
              text="Next"
              onClick={() => {
                if (totalQuestions) {
                  setShowSelectPopup(false);
                }
              }}
              disabled={!totalQuestions}
              className="w-auto px-6 self-center"
            />
          </div>
        </div>
      )}


      {/* =================================================== */}
      {/* 🔥 POPUP — CONFIRM SUBMISSION */}
      {/* =================================================== */}
      {showSubmitPopup && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <div className="bg-zinc-900 p-8 rounded-xl w-[90%] max-w-md shadow-xl text-center">
            <h2 className="text-xl font-semibold mb-4">Submit Exam?</h2>
            <p className="text-gray-300 mb-6">Are you sure you want to submit?</p>

            <div className="flex justify-center gap-4">
              <button
                onClick={() => setShowSubmitPopup(false)}
                className="px-6 py-2 rounded-lg border border-gray-600 hover:border-white transition"
              >
                Cancel
              </button>

              <button
                onClick={confirmSubmit}
                className="px-6 py-2 rounded-lg bg-orange-500 hover:bg-orange-600 transition"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ================= HEADER ================= */}
      <header className="w-full px-6 py-6 border-b border-gray-800">
        <h1 className="text-4xl font-bold">Intro to Python</h1>

        {/* Timer placeholder */}
        <p className="text-gray-400 mt-2">{30 - currentQuestionIndex * 2}s</p>

        {/* Progress bar */}
        <div className="w-full bg-gray-800 rounded-full h-2 mt-2">
          <div
            className="bg-gray-200 h-2 rounded-full transition-all duration-500"
            style={{
              width: `${((currentQuestionIndex + 1) / totalQuestions) * 100}%`,
            }}
          ></div>
        </div>
      </header>

      {/* ================= MAIN ================= */}
      <main className="flex flex-col lg:flex-row w-full px-6 py-10 gap-10 overflow-x-hidden">

        {/* LEFT CONTENT */}
        <div className="flex-1 w-full min-w-0">
          <p className="text-sm text-gray-300 mb-3">
            {currentQuestionIndex + 1} out of {totalQuestions} attempts
          </p>

          <h2 className="text-xl font-semibold mb-6">
            {currentQuestionIndex + 1}. {currentQuestion.question}
          </h2>

          {/* OPTIONS */}
          <div className="space-y-4 w-full">
            {currentQuestion.options.map((opt, idx) => (
              <label
                key={idx}
                className={`flex items-center justify-between border rounded-lg px-4 py-4 cursor-pointer transition-all 
                  ${answers[currentQuestionIndex] === opt
                    ? "bg-green-800 border-green-600"
                    : "border-gray-700 hover:border-white"
                  }`}
              >
                <div className="flex items-center gap-3">
                  <input
                    type="radio"
                    className="w-4 h-4 accent-green-500"
                    checked={answers[currentQuestionIndex] === opt}
                    onChange={() =>
                      setAnswers({ ...answers, [currentQuestionIndex]: opt })
                    }
                  />
                  <span className="text-base">{opt}</span>
                </div>

                {answers[currentQuestionIndex] === opt && (
                  <span className="text-green-300 text-xl">✔</span>
                )}
              </label>
            ))}
          </div>

          {/* BUTTONS */}
          <div className="flex justify-between mt-10">
            {/* PREVIOUS */}
            <button
              onClick={handlePrevious}
              disabled={currentQuestionIndex === 0}
              className="border border-gray-600 text-gray-300 px-6 py-2 rounded-full 
              hover:border-orange-500 hover:text-orange-500 transition disabled:opacity-40"
            >
              Previous
            </button>

            {/* NEXT or SUBMIT */}
            {currentQuestionIndex === totalQuestions - 1 ? (
              <Button text="Submit Exam" onClick={handleSubmit} />
            ) : (
              <Button text="Save & Next" onClick={handleNext} />
            )}
          </div>
        </div>

        {/* ================= RIGHT QUESTION GRID ================= */}
        <div className="w-full lg:max-w-[300px]">
          <h3 className="text-center text-lg font-semibold mb-4">
            Question {currentQuestionIndex + 1} of {totalQuestions}
          </h3>

          <div className="grid grid-cols-5 gap-1">
            {[...Array(totalQuestions)].map((_, i) => {
              const isAttempted = answers[i];

              return (
                <button
                  key={i}
                  onClick={() => setCurrentQuestionIndex(i)}
                  className={`w-10 h-10 rounded-lg flex items-center justify-center font-semibold transition border 
                    ${i === currentQuestionIndex
                      ? "bg-orange-500 text-white border-orange-500"
                      : isAttempted
                        ? "bg-green-700 text-white border-green-600"
                        : "border-[#d1cfcf] text-white hover:border-white"
                    }`}
                >
                  {i + 1}
                </button>
              );
            })}
          </div>
        </div>
      </main>
    </div>
  );
}
