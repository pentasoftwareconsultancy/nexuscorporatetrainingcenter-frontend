import React, { useEffect, useState } from "react";
import { FaCheckCircle } from "react-icons/fa";
import { useNavigate, useLocation } from "react-router-dom";
import Button from "../../components/common/Button";
import ApiService from "../../core/services/api.service";
import ServerUrl from "../../core/constants/serverURL.constant";
import { ROUTES } from "../../core/constants/routes.constant";

const TestSuccess = () => {
  const navigate = useNavigate();
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(true);
  const api = new ApiService();
  const location = useLocation();
  const testId = location.state?.testId;

  useEffect(() => {
    fetchLatestResult();
  }, []);

  const fetchLatestResult = async () => {
    try {
      if (!testId) return;

      const res = await api.apiget(`${ServerUrl.API_GET_TEST_RESULT}${testId}`);
      console.log("Latest Result:", res.data.data);

      // FIX: backend returns res.data.success
      if (res.data.success) {
        const d = res.data.data; // actual result object

        setResult({
          ...d,
          right: d.correct_answers,
          wrong: d.attempted - d.correct_answers,
          remaining: d.total_questions - d.attempted,
        });
      }
    } catch (err) {
      console.error("Error fetching result:", err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center w-full py-20 text-white">
        Loading Result...
      </div>
    );
  }

  if (!result) {
    return (
      <div className="flex justify-center items-center w-full py-20 text-white">
        No result available.
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center w-full text-one text-center px-4 py-10">
      <div className="w-full max-w-7xl mx-auto">
        {/* Green Check Icon */}
        <FaCheckCircle className="text-green-400 text-7xl mb-3 mx-auto animate-scaleIn" />

        {/* Main Title */}
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold mb-6">
          Test Submitted Successfully
        </h2>

        {/* Subtitle */}
        <p className="text-gray-300 text-base sm:text-lg md:text-2xl mb-2">
          {`${result.title ?? "Untitled Test"} - ${
            result.total_questions
          } Questions Attempted`}
        </p>

        {/* Result Summary */}
        <p className="text-white font-semibold mb-5 text-base sm:text-lg md:text-[20px]">
          {`${result.right} out of ${result.total_questions} questions are correct`}
        </p>

        {/* Attempted Section */}
        <div className="w-full flex justify-center">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2 max-w-7xl mx-auto">
            <div className="bg-[#252525] text-gray-200 px-6 py-3 rounded-lg border">
              Attempt questions – {result.attempted}
            </div>

            <div className="bg-[#252525] text-gray-200 px-6 py-3 rounded-lg border">
              Not Attempted questions – {result.total_questions - result.attempted}
            </div>

            <div className="bg-[#235333] text-white px-6 py-3 rounded-lg border">
              Right questions – {result.right}
            </div>

            <div className="bg-[#552C0E] text-white px-6 py-3 rounded-lg border">
              Wrong questions – {result.wrong}
            </div>

            <div className="bg-[#252525] text-gray-200 px-6 py-3 rounded-lg border">
              Remaining questions – {result.remaining}
            </div>
          </div>
        </div>
      </div>

      <div className="py-8">
        <Button
          text="View Detailed Result"
          onClick={() =>
            navigate(ROUTES.USER_RESULT)
          }
        />
      </div>
    </div>
  );
};

export default TestSuccess;
