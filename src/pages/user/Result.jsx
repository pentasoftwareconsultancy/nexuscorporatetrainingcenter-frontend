import React from 'react'
import data from '../../assets/saidas/resultData.json'

const Result = () => {
  return (
    <div className="min-h-screen bg-[#0f0f0f] text-white px-4 sm:px-6 md:px-10 lg:px-16 py-8 sm:py-10 md:py-14 font-sora">
      {/* 🔹 Title */}
      <h1
        className="
          text-3xl sm:text-4xl md:text-5xl  mb-10 sm:mb-12 text-left
          max-[400px]:text-[1.8rem] max-[370px]:text-[1.6rem] max-[350px]:text-[1.5rem]
        "
      >
        Result
      </h1>

      {/* 🔹 Grid Layout */}
      <div
        className="
          grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8
          max-[430px]:gap-5 max-[380px]:gap-4
        "
      >
        {data.map((item, index) => {
          const isCorrect = item.userSelection === item.correctAnswer;

          return (
            <div
              key={index}
              className={`rounded-xl p-5 sm:p-6 shadow-md border transition-all duration-200
                ${isCorrect
                  ? "bg-[#205E3B] border-[#FFF3EA]" // ✅ Green for correct
                  : "bg-[#5A2B14] border-[#FFF3EA]" // 🟤 Brown for wrong
                }
                max-[430px]:p-4 max-[380px]:p-3
              `}
            >
              {/* Question */}
              <h2
                className="
                  text-base sm:text-lg font-semibold mb-3 sm:mb-4 text-white
                  max-[400px]:text-sm max-[360px]:text-xs
                "
              >
                {index + 1}. {item.question}
              </h2>

              {/* Answer Details */}
              <div
                className="
                  space-y-1.5 sm:space-y-2 text-xs sm:text-sm text-gray-200
                  max-[400px]:text-[11px] max-[360px]:leading-snug
                "
              >
                <p>
                  <span className="font-semibold text-white">
                    Your selection:{" "}
                  </span>
                  {item.userSelection}
                </p>
                <p>
                  <span className="font-semibold text-white">
                    Correct answer:{" "}
                  </span>
                  {item.correctAnswer}
                </p>
                <p className="leading-relaxed">
                  <span className="font-semibold text-white">Reason: </span>
                  {item.reason}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* 🔹 Download Certificate Button */}
      <div className="flex justify-center mt-10 sm:mt-12">
        <button
          className="
            relative px-6 sm:px-8 py-2.5 sm:py-3 rounded-full font-semibold text-black cursor-pointer
            bg-[linear-gradient(180deg,#fdfbf8_0%,#f8eee6_50%,#f5d4ad_100%)]
            border border-[#f1d4b5]
            shadow-[inset_2px_2px_5px_rgba(255,255,255,0.9),inset_-2px_-2px_6px_rgba(0,0,0,0.1)]
            overflow-hidden transition-all duration-300 ease-in-out
            hover:shadow-[inset_2px_2px_6px_rgba(255,255,255,1),inset_-2px_-2px_8px_rgba(0,0,0,0.15)]
            max-[400px]:text-xs max-[370px]:px-4 max-[370px]:py-2
          "
        >
          {/* Animated orange line */}
          <span
            className="
              absolute top-0 left-0 w-full h-[2px] rounded-t-full
              bg-gradient-to-r from-transparent via-orange-400 to-transparent
              animate-[shimmer_2.5s_linear_infinite]
            "
          ></span>

          Download Certificate
        </button>
      </div>

      {/* 🔹 Custom shimmer animation */}
      <style>
        {`
          @keyframes shimmer {
            0% { transform: translateX(-100%); opacity: 0.6; }
            50% { transform: translateX(0%); opacity: 1; }
            100% { transform: translateX(100%); opacity: 0.6; }
          }
        `}
      </style>
    </div>
  );
};

export default Result