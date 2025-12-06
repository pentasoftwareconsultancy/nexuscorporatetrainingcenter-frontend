import React, { useEffect, useState, useMemo } from "react";
import Button from "../../components/common/Button";
import { useNavigate, useParams } from "react-router-dom";
import { ROUTES } from "../../core/constants/routes.constant";
import ApiService from "../../core/services/api.service";
import ServerUrl from "../../core/constants/serverURL.constant";

export default function TestExam() {
  // UI popups
  const [showSelectPopup, setShowSelectPopup] = useState(true);
  const [showSubmitPopup, setShowSubmitPopup] = useState(false);

  // user selections / navigation
  const [selectedQuestionCount, setSelectedQuestionCount] = useState(20); // chosen on popup
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({}); // { [questionId]: optionId }

  // backend + loading
  const [loading, setLoading] = useState(true);
  const [testData, setTestData] = useState(null); // raw test from backend
  const [quizQuestions, setQuizQuestions] = useState([]); // final questions array used for quiz
  const api = new ApiService();

  const navigate = useNavigate();
  const { id } = useParams(); // test ID from URL

  // Fetch test data on mount
  useEffect(() => {
    fetchTestDetails();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const fetchTestDetails = async () => {
    try {
      setLoading(true);
      const res = await api.apiget(`${ServerUrl.API_GET_TEST_BY_ID}${id}`);
      // Try to read data safely across possible API shapes
      const payload = res?.data ?? res;
      // Expecting either payload.data or payload (depending on backend wrapper)
      const test = payload.data ?? payload;
      setTestData(test);

      // do not set quizQuestions yet — wait until user selects number of questions
      setLoading(false);
    } catch (err) {
      console.error("Error loading test:", err);
      setLoading(false);
      alert("Failed to load test. Check console for details.");
    }
  };

  // When user confirms how many questions, prepare final quizQuestions array
  const prepareQuiz = () => {
    const allQuestions = testData?.questions ?? testData?.Questions ?? [];

    // Normalize question object shape to have:
    // { id, question_text, options: [{id, option_text}] }
    const normalized = allQuestions.map((q) => {
      const qId = q.id ?? q.questionId;
      const qText = q.question_text ?? q.question ?? q.questionText ?? "";
      const rawOptions = q.options ?? q.Options ?? q.options_list ?? [];

      const normalizedOptions = rawOptions.map((opt) => ({
        id: opt.id ?? opt.optionId ?? opt.option_id,
        text: opt.option_text ?? opt.option_text ?? opt.text ?? opt.optionText ?? "",
        // keep is_correct if exists
        is_correct: typeof opt.is_correct !== "undefined" ? opt.is_correct : opt.isCorrect,
      }));

      return {
        ...q,
        id: qId,
        question_text: qText,
        options: normalizedOptions,
      };
    });

    // If selectedQuestionCount is less than available, slice. Otherwise use all.
    const final = normalized.slice(0, selectedQuestionCount);
    setQuizQuestions(final);
    setCurrentQuestionIndex(0);
    setShowSelectPopup(false);
  };

  // Derived values
  const totalQuestions = quizQuestions.length;
  const currentQuestion = quizQuestions[currentQuestionIndex] ?? null;

  // Helper: when user selects an option, save by questionId
  const selectOption = (questionId, optionId) => {
    setAnswers((prev) => ({ ...prev, [questionId]: optionId }));
  };

  // Navigation
  const handleNext = () => {
    if (currentQuestionIndex < totalQuestions - 1) {
      setCurrentQuestionIndex((idx) => idx + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((idx) => idx - 1);
    }
  };

  // Submit flow
  const handleSubmit = () => {
    setShowSubmitPopup(true);
  };

  // Format answers payload for backend
  const buildSubmitPayload = useMemo(() => {
    // Convert answers object { questionId: optionId } into an array of objects
    // or a mapping depending on what backend expects. We'll send both common shapes:
    // { testId, answers: [{ questionId, optionId }, ...], answersMap: { questionId: optionId } }
    const answersArray = Object.entries(answers).map(([qId, oId]) => ({
      questionId: Number(qId),
      optionId: Number(oId),
    }));

    const answersMap = Object.fromEntries(
      Object.entries(answers).map(([qId, oId]) => [qId, Number(oId)])
    );

    return {
      testId: Number(id),
      totalQuestionsSelected: Number(selectedQuestionCount),
      answersArray,
      answersMap,
    };
  }, [answers, id, selectedQuestionCount]);

  const confirmSubmit = async () => {
    try {
      // Optionally, show a quick client-side validation
      // For example: ensure at least 1 answer selected
      // (you can customize this behavior)
      // Send payload to backend
      const body = {
        testId: buildSubmitPayload.testId,
        answers: buildSubmitPayload.answersArray,
      };

      // Post to submit endpoint
      const res = await api.apipost(ServerUrl.API_SUBMIT_TEST, body);

      // On success: redirect to success page
      // (you might want to parse response and show score, etc.)
      navigate(ROUTES.USER_SUCCESS);
    } catch (err) {
      console.error("Submit failed:", err);
      alert("Failed to submit test. Check console for details.");
    } finally {
      setShowSubmitPopup(false);
    }
  };

  // Loading UI
  if (loading && !testData) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        Loading exam...
      </div>
    );
  }

  return (
    <div className="min-h-screen text-white flex flex-col w-full overflow-x-hidden relative">

      {/* =================================================== */}
      {/* 🔥 POPUP — SELECT NUMBER OF QUESTIONS */}
      {/* =================================================== */}
      {showSelectPopup && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <div className="flex flex-col bg-zinc-900 p-8 rounded-xl px-2 max-w-md shadow-xl text-center justify-center">
            <h2 className="text-xl font-semibold mb-4">Take a Quiz</h2>
            <h2 className="text-l font-semibold mb-2">How many questions you want to take?</h2>

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
                    checked={selectedQuestionCount === num}
                    onChange={() => setSelectedQuestionCount(num)}
                    className="w-4 h-4 accent-orange-500"
                  />
                  <span className="text-lg">{num}</span>
                </label>
              ))}
            </div>

            <Button
              text="Next"
              onClick={() => {
                // If no questions available from backend, do nothing
                const available = (testData?.questions ?? []).length;
                if (!available) {
                  alert("No questions available for this test.");
                  return;
                }
                // If selected count is larger than available, adjust
                if (selectedQuestionCount > available) {
                  setSelectedQuestionCount(available);
                }
                prepareQuiz();
              }}
              disabled={(testData?.questions ?? []).length === 0}
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
        <h1 className="text-4xl font-bold">{testData?.title ?? "Untitled Test"}</h1>

        {/* Timer placeholder (simple) */}
        <p className="text-gray-400 mt-2">{30 - currentQuestionIndex * 2}s</p>

        {/* Progress bar */}
        <div className="w-full bg-gray-800 rounded-full h-2 mt-2">
          <div
            className="bg-gray-200 h-2 rounded-full transition-all duration-500"
            style={{
              width: `${totalQuestions === 0 ? 0 : ((currentQuestionIndex + 1) / totalQuestions) * 100}%`,
            }}
          ></div>
        </div>
      </header>

      {/* ================= MAIN ================= */}
      <main className="flex flex-col lg:flex-row w-full px-6 py-10 gap-10 overflow-x-hidden">

        {/* LEFT CONTENT */}
        <div className="flex-1 w-full min-w-0">
          <p className="text-sm text-gray-300 mb-3">
            {totalQuestions === 0 ? 0 : currentQuestionIndex + 1} out of {totalQuestions} attempts
          </p>

          <h2 className="text-xl font-semibold mb-6">
            {currentQuestion
              ? `${currentQuestionIndex + 1}. ${currentQuestion.question_text}`
              : "No question loaded"}
          </h2>

          {/* OPTIONS */}
          <div className="space-y-4 w-full">
            {currentQuestion?.options?.map((opt) => {
              const checked = answers[currentQuestion.id] === opt.id;
              return (
                <label
                  key={opt.id}
                  className={`flex items-center justify-between border rounded-lg px-4 py-4 cursor-pointer transition-all 
                    ${checked ? "bg-green-800 border-green-600" : "border-gray-700 hover:border-white"}`}
                >
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name={`q_${currentQuestion.id}`}
                      className="w-4 h-4 accent-green-500"
                      checked={checked}
                      onChange={() => selectOption(currentQuestion.id, opt.id)}
                    />
                    <span className="text-base">{opt.text}</span>
                  </div>

                  {checked && (
                    <span className="text-green-300 text-xl">✔</span>
                  )}
                </label>
              );
            })}
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
            Question {totalQuestions === 0 ? 0 : currentQuestionIndex + 1} of {totalQuestions}
          </h3>

          <div className="grid grid-cols-5 gap-1">
            {quizQuestions.map((q, i) => {
              const isAttempted = !!answers[q.id];
              return (
                <button
                  key={q.id}
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
