import React from 'react'
import { FaCheckCircle } from "react-icons/fa";
import testData from "../../assets/tarushri/Test.json";
import { ROUTES } from '../../core/constants/routes.constant';
import { useNavigate } from 'react-router-dom';

const TestSuccess = () => {
    const navigate = useNavigate();
  return (
    <div className="flex flex-col items-center justify-center min-h-screen w-full text-one text-center px-4 py-10">

            {testData.map((test, index) => (
                <div
                    key={index}
                    className="w-full max-w-3xl mx-auto"
                >
                    {/* Green Check Icon */}
                    <FaCheckCircle className="greenCheckIcon text-green-400 text-6xl sm:text-7xl mb-3 mx-auto animate-scaleIn" />

                    {/* Main Title */}
                    <h2 className="MainTitle text-2xl sm:text-3xl md:text-4xl font-semibold mb-6 sm:mb-8">
                        Test Submitted Successfully
                    </h2>

                    {/* Subtitle */}
                    <p className="DynamicSubtitle text-gray-300 text-base sm:text-lg md:text-2xl mb-2 px-2">
                        {`${test.subject} - ${test.totalQuestions} Questions Attempted (${test.course})`}
                    </p>

                    {/* Result Summary */}
                    <p className="DynamicResultSummary text-white font-semibold mb-5 text-base sm:text-lg md:text-[20px]">
                        {`${test.right} out of ${test.totalQuestions} questions are right`}
                    </p>

                    {/* Attempted Section */}
                    <div className="AttemptedSection flex flex-wrap justify-center gap-3 sm:gap-4 md:gap-5">
                        <div className="bg-[#252525] text-gray-200 px-5 sm:px-8 py-2 rounded-lg border border-white shadow-md text-xs sm:text-sm md:text-base animate-slideInLeft">
                            Attempted Question - {test.attempted}
                        </div>
                        <div className="bg-[#252525] text-gray-200 px-5 sm:px-8 py-2 rounded-lg border border-white shadow-md text-xs sm:text-sm md:text-base animate-scaleUp">
                            Not attempted Question - {test.nonAttempted}
                        </div>
                        <div className="bg-[#235333] text-white px-5 sm:px-8 py-2 rounded-lg border border-white shadow-md text-xs sm:text-sm md:text-base animate-slideInRight">
                            Right questions - {test.right}
                        </div>
                        <div className="bg-[#552C0E] text-white px-5 sm:px-8 py-2 rounded-lg border border-white shadow-md text-xs sm:text-sm md:text-base animate-slideInLeft">
                            Wrong questions - {test.wrong}
                        </div>
                        <div className="bg-[#252525] text-gray-200 px-5 sm:px-8 py-2 rounded-lg border border-white shadow-md text-xs sm:text-sm md:text-base animate-slideInRight">
                            Attempted remaining - {test.remaining}
                        </div>
                    </div>
                </div>
            ))}

            {/* View Result Button */}
            <button 
                onClick={() => navigate(ROUTES.USER_CERTIFICATION)}
                className="bg-[#e6dfd8] text-black font-medium px-6 sm:px-8 py-2 mt-10 rounded-full hover:bg-[#f5a967] transition-all text-sm sm:text-base">
                View Result
            </button>
        </div>
    
  )
}

export default TestSuccess