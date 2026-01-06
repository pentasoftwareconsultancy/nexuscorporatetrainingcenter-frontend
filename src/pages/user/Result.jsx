import React, { useEffect, useState } from "react";
import Button from "../../components/common/Button";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../core/constants/routes.constant";
import ServerUrl from "../../core/constants/serverURL.constant";
import ApiService from "../../core/services/api.service";

const Result = () => {
  const navigate = useNavigate();
  const api = new ApiService();

  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchResult = async () => {
      try {
        const res = await api.apiget(ServerUrl.API_USER_TEST_RESULT_VIEWS);
        console.log("RESULT API:", res.data);
        // API RETURNS -> success + data
        setResult(res.data.data);
      } catch (error) {
        console.error("Result Fetch Error", error);
      } finally {
        setLoading(false);
      }
    };

    fetchResult();
  }, []);

  if (loading) return <p className="text-white p-10">Loading...</p>;

  if (!result) return <p className="text-white p-10">No result found</p>;

  return (
    <div className="min-h-screen text-one px-6 py-6 font-sora">
      <h1 className="text-4xl mb-10">Result</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {result.questions.map((item, index) => {
          const isCorrect = item.user_is_correct;

          return (
            <div
              key={item.questionId}
              className={`rounded-xl p-6 shadow-md border transition-all
                ${isCorrect
                  ? "bg-[#205E3B] border-[#FFF3EA]"  // Green
                  : "bg-[#5A2B14] border-[#FFF3EA]"  // Brown / Red
                }
              `}
            >
              {/* Question */}
              <h2 className="text-lg font-semibold mb-3 text-white">
                {index + 1}. {item.question_text}
              </h2>

              {/* Details */}
              <div className="space-y-2 text-sm text-gray-200">
                <p>
                  <span className="font-semibold text-white">Your selection: </span>
                  {item.user_selected_option_text ?? "Not Answered"}
                </p>

                <p>
                  <span className="font-semibold text-white">Correct answer: </span>
                  {item.correct_option?.text}
                </p>

                <p>
                  <span className="font-semibold text-white">Reason: </span>
                  {item.answer_explanation ?? "No explanation provided"}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Download Button */}
      <div className="flex justify-center mt-10">
        <Button
          text="Download Certificate"
          onClick={() => navigate(ROUTES.USER_CERTIFICATION)}
        />
      </div>
    </div>
  );
};

export default Result;
