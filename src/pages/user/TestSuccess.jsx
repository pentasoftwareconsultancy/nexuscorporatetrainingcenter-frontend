import React from 'react'
import { FaCheckCircle } from "react-icons/fa";
import testData from "../../assets/tarushri/Test.json";
import { ROUTES } from '../../core/constants/routes.constant';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/common/Button';

const TestSuccess = () => {
    const navigate = useNavigate();
  return (
    <div className="flex flex-col items-center justify-center w-full text-one text-center px-4 py-10">

            {testData.map((test, index) => (
                <div
                    key={index}
                    className="w-full max-w-7xl mx-auto"
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
                    <div className="w-full flex justify-center">
                      <div
                        className="
                          grid 
                          grid-cols-1 
                          sm:grid-cols-2 
                          md:grid-cols-3 
                          lg:grid-cols-5 
                          gap-2 
                          max-w-7xl 
                          mx-auto
                        "
                      >
                        <div className="bg-[#252525] text-gray-200 px-6 py-3 rounded-lg border border-white shadow-md">
                          Attempted Question - {test.attempted}
                        </div>

                        <div className="bg-[#252525] text-gray-200 px-6 py-3 rounded-lg border border-white shadow-md">
                          Not attempted Question - {test.nonAttempted}
                        </div>

                        <div className="bg-[#235333] text-white px-6 py-3 rounded-lg border border-white shadow-md">
                          Right questions - {test.right}
                        </div>

                        <div className="bg-[#552C0E] text-white px-6 py-3 rounded-lg border border-white shadow-md">
                          Wrong questions - {test.wrong}
                        </div>

                        <div className="bg-[#252525] text-gray-200 px-6 py-3 rounded-lg border border-white shadow-md">
                          Attempted remaining - {test.remaining}
                        </div>
                      </div>
                    </div>
                </div>
            ))}

            <div className='py-8'>
                <Button
                  text="View Result"
                  onClick={() => navigate(ROUTES.USER_RESULT) }
                />
            </div>
        </div>
    
  )
}

export default TestSuccess