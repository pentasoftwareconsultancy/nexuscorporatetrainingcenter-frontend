// import React, { useState } from "react";
// import { ArrowLeft } from "lucide-react";

// export default function TestExam() {
//   // 🔥 Your Questions (Dynamic Length)
//   const quizData = [
//     {
//       question: "Which of the following is true about Python lists?",
//       options: ["Ordered", "Mutable", "Unique", "Indexed"],
//       answer: "Ordered",
//     },
//     {
//       question: "Which keyword is used to create a function in Python?",
//       options: ["func", "def", "define", "lambda"],
//       answer: "def",
//     },
//     {
//       question: "Which one is NOT a Python data type?",
//       options: ["Tuple", "Dictionary", "Character", "List"],
//       answer: "Character",
//     },
//     {
//       question: "Which operator is used for exponent in Python?",
//       options: ["^", "**", "exp", "//"],
//       answer: "**",
//     }
//   ];

//   const totalQuestions = quizData.length;

//   const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
//   const [answers, setAnswers] = useState({});

//   const currentQuestion = quizData[currentQuestionIndex];

//   const handleNext = () => {
//     if (currentQuestionIndex < totalQuestions - 1) {
//       setCurrentQuestionIndex(currentQuestionIndex + 1);
//     }
//   };

//   const handlePrevious = () => {
//     if (currentQuestionIndex > 0) {
//       setCurrentQuestionIndex(currentQuestionIndex - 1);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-[#0b0b0b] text-white flex flex-col w-full overflow-x-hidden">

//       {/* ================= HEADER ================= */}
//       <header className="w-full px-4 sm:px-6 md:px-8 lg:px-10 py-6 border-b border-gray-800">
//         <h1 className="text-4xl lg:text-5xl font-bold">Intro to Python</h1>

//         <p className="text-gray-400 mt-2">{30 - currentQuestionIndex * 2}s</p>

//         {/* ===== Dynamic Progress Bar ===== */}
//         <div className="w-full bg-gray-800 rounded-full h-2 mt-2">
//           <div
//             className="bg-gray-200 h-2 rounded-full transition-all duration-500"
//             style={{
//               width: `${((currentQuestionIndex + 1) / totalQuestions) * 100}%`,
//             }}
//           ></div>
//         </div>
//       </header>

//       {/* ================= MAIN ================= */}
//       <main className="flex flex-col lg:flex-row w-full px-4 sm:px-6 md:px-8 lg:px-10 py-10 gap-10 overflow-x-hidden">

//         {/* LEFT CONTENT */}
//         <div className="flex-1 w-full min-w-0">

//           <p className="text-sm text-gray-300 mb-3">
//             {currentQuestionIndex + 1} out of {totalQuestions} attempts
//           </p>

//           <h2 className="text-xl font-semibold mb-6">
//             {currentQuestionIndex + 1}. {currentQuestion.question}
//           </h2>

//           {/* OPTIONS */}
//           <div className="space-y-4 w-full">
//             {currentQuestion.options.map((opt, idx) => (
//               <label
//                 key={idx}
//                 className={`flex items-center justify-between border rounded-lg px-4 py-4 cursor-pointer transition-all 
//                   ${
//                     answers[currentQuestionIndex] === opt
//                       ? "bg-green-800 border-green-600"
//                       : "border-gray-700 hover:border-white"
//                   }
//                 `}
//               >
//                 <div className="flex items-center gap-3">
//                   <input
//                     type="radio"
//                     className="w-4 h-4 accent-green-500"
//                     checked={answers[currentQuestionIndex] === opt}
//                     onChange={() =>
//                       setAnswers({ ...answers, [currentQuestionIndex]: opt })
//                     }
//                   />
//                   <span className="text-base">{opt}</span>
//                 </div>

//                 {answers[currentQuestionIndex] === opt && (
//                   <span className="text-green-300 text-xl">✔</span>
//                 )}
//               </label>
//             ))}
//           </div>

//           {/* BUTTONS */}
//           <div className="flex justify-between mt-10">
//             <button
//               onClick={handlePrevious}
//               disabled={currentQuestionIndex === 0}
//               className="border border-gray-600 text-gray-300 px-6 py-2 rounded-full 
//               hover:border-orange-500 hover:text-orange-500 transition disabled:opacity-40"
//             >
//               Previous
//             </button>

//             <button
//               onClick={handleNext}
//               className="bg-[#F6E9DD] text-black px-10 py-3 rounded-full font-semibold hover:bg-[#e8d9cb] transition"
//             >
//               {currentQuestionIndex === totalQuestions - 1
//                 ? "Submit"
//                 : "Save and Next"}
//             </button>
//           </div>
//         </div>

//         {/* ================= RIGHT QUESTION GRID ================= */}
//         <div className="w-full lg:max-w-[400px]">
//           <h3 className="text-center text-lg font-semibold mb-4">
//             Question {currentQuestionIndex + 1} of {totalQuestions}
//           </h3>

//           <div className="grid grid-cols-5 gap-1">
//             {[...Array(totalQuestions)].map((_, i) => {
//               const isAttempted = answers[i];

//               return (
//                 <button
//                   key={i}
//                   onClick={() => setCurrentQuestionIndex(i)}
//                   className={`w-10 h-10 rounded-lg flex items-center justify-center font-semibold transition border 
//                     ${
//                       i === currentQuestionIndex
//                         ? "bg-orange-500 text-white border-orange-500"
//                         : isAttempted
//                         ? "bg-green-700 text-white border-green-600"
//                         : "border-[#d1cfcf] text-white hover:border-white"
//                     }
//                   `}
//                 >
//                   {i + 1}
//                 </button>
//               );
//             })}
//           </div>
//         </div>
//       </main>
//     </div>
//   );
// }

import React, { useState } from "react";
import { ArrowLeft } from "lucide-react";
import Button from '../../components/common/Button'

export default function TestExam() {
  // 🔥 20 QUESTIONS (FULLY DYNAMIC)
  const quizData = Array.from({ length: 20 }, (_, i) => ({
    question: `Sample Question ${i + 1} — What is correct answer?`,
    options: ["Option A", "Option B", "Option C", "Option D"],
    answer: "Option A",
  }));

  const totalQuestions = quizData.length;

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});

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

  return (
    <div className="min-h-screen bg-[#0b0b0b] text-white flex flex-col w-full overflow-x-hidden">

      {/* ================= HEADER ================= */}
      <header className="w-full px-4 sm:px-6 md:px-8 lg:px-10 py-6 border-b border-gray-800">
        <h1 className="text-4xl lg:text-5xl font-bold">Intro to Python</h1>

        <p className="text-gray-400 mt-2">{30 - currentQuestionIndex * 2}s</p>

        {/* ===== Dynamic Progress Bar ===== */}
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
      <main className="flex flex-col lg:flex-row w-full px-4 sm:px-6 md:px-8 lg:px-10 py-10 gap-10 overflow-x-hidden">

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
                  ${
                    answers[currentQuestionIndex] === opt
                      ? "bg-green-800 border-green-600"
                      : "border-gray-700 hover:border-white"
                  }
                `}
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
            <button
              onClick={handlePrevious}
              disabled={currentQuestionIndex === 0}
              className="border border-gray-600 text-gray-300 px-6 py-2 rounded-full 
              hover:border-orange-500 hover:text-orange-500 transition disabled:opacity-40"
            >
              Previous
            </button>

            <Button 
              onClick={handleNext}
              text="Save & Next"
            />

            {/* <button
              onClick={handleNext}
              className="bg-[#F6E9DD] text-black px-10 py-3 rounded-full font-semibold hover:bg-[#e8d9cb] transition"
            >
              {currentQuestionIndex === totalQuestions - 1
                ? "Submit"
                : "Save and Next"} 
            </button> */}
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
                    ${
                      i === currentQuestionIndex
                        ? "bg-orange-500 text-white border-orange-500"
                        : isAttempted
                        ? "bg-green-700 text-white border-green-600"
                        : "border-[#d1cfcf] text-white hover:border-white"
                    }
                  `}
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

