import React, { useEffect, useState } from "react";
import { Search } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import ApiService from "../../core/services/api.service";
import ServerUrl from "../../core/constants/serverURL.constant";
import { ROUTES } from "../../core/constants/routes.constant";

const AdminQuestionsDashboardPage = () => {
  const { id: testId } = useParams(); // testId from URL
  const navigate = useNavigate();
  const api = new ApiService();

  const [searchQuery, setSearchQuery] = useState("");
  const [courseName, setCourseName] = useState("");
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);

  // 🔥 FETCH QUESTIONS BY TEST ID
  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const res = await api.apiget(`${ServerUrl.API_GET_QUESTIONS_AND_OPTIONS}${testId}/questions`);
        console.log("Fetched Questions:", res);
        setCourseName(res.data.title);
        setQuestions(res.data.questions || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchQuestions();
  }, [testId]);

  // 🔍 Filter
  const filteredQuestions = questions.filter((q) => {
    const correctOption =
      q.options?.find((o) => o.is_correct)?.option_text || "";

    return (
      q.question_text.toLowerCase().includes(searchQuery.toLowerCase()) ||
      correctOption.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  if (loading) {
    return <p className="text-center mt-20">Loading questions...</p>;
  }

  return (
    <div className="relative min-h-screen flex text-white font-sora">
      <main className="flex-1 p-4 md:p-8">

        {/* HEADING */}
        <h2 className="text-xl md:text-2xl font-semibold pb-5">
          {courseName} Questions ({filteredQuestions.length})
        </h2>

        {/* SEARCH */}
        <div className="mt-4 relative">
          <Search className="absolute left-4 top-3 text-gray-400" size={20} />
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

        {/* DATA */}
        <div className="flex flex-col gap-4 mt-4">
          {filteredQuestions.map((q, idx) => {
            const correctAnswer =
              q.options?.find((o) => o.is_correct)?.option_text || "—";

            return (
              <div
                key={q.id}
                onClick={() =>
                  navigate(`${ROUTES.ADMIN_QUESTION_FORM_EDIT}/${q.id}`, { state: { testId } })
                }
                className="border border-white rounded-xl p-4 hover:bg-[#222] transition
                grid grid-cols-1 md:grid-cols-12 gap-2 md:gap-4 items-start cursor-pointer"
              >
                <div className="md:col-span-1 font-semibold">
                  {idx + 1}
                </div>

                <div className="md:col-span-7 text-sm leading-relaxed">
                  {q.question_text}
                </div>

                <div className="md:col-span-4 text-green-400 text-sm">
                  {correctAnswer}
                </div>
              </div>
            );
          })}

          {filteredQuestions.length === 0 && (
            <p className="text-center text-gray-400 mt-4">
              No questions found
            </p>
          )}
        </div>
      </main>

      {/* ADD BUTTON */}
      <button
        onClick={() => navigate(ROUTES.ADMIN_QUESTION_FORM, { state: { testId } })}
        className="fixed right-10 bottom-10 w-14 h-14 bg-one text-black text-3xl rounded-full font-bold shadow-lg"
      >
        +
      </button>
    </div>
  );
};

export default AdminQuestionsDashboardPage;
