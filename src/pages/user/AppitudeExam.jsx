import React, { useState, useEffect } from "react";
import { Search, ExternalLink, ArrowLeft } from "lucide-react";

export default function ApptitudeExam() {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Full Stack Python");
  const [selectedTest, setSelectedTest] = useState(null);
  const [showQuiz, setShowQuiz] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(30);

  const categories = [
    "Full Stack Python",
    "Full Stack Developer",
    "Dev Ops",
    "AWS Solution Architect",
    "Power BI / Data Analyst",
    "Data Science",
    "Big Data",
    "Data Engineer",
    "Google Cloud",
    "Azure 104 Admin",
    "DV-360",
    "Software Testing / QA",
    "Manual Testing",
    "Automation Testing",
    "Database Testing",
    "Mobile Testing",
  ];

  const topicsData = {
    "Full Stack Python": [
      "Python Basics",
      "Control Structures",
      "Functions & Modules",
      "Object-Oriented Programming",
      "File Handling",
      "Exception Handling",
      "Database Integration",
      "Flask Framework",
      "Django Basics",
      "RESTful APIs",
      "Testing in Python",
      "Version Control with Git",
      "Deployment & CI/CD",
    ],
    "Full Stack Developer": [
      "HTML & CSS Fundamentals",
      "JavaScript Essentials",
      "React.js Basics",
      "Node.js & Express.js",
      "MongoDB & SQL",
      "REST API Integration",
      "Authentication & Security",
      "Git & Version Control",
      "CI/CD Pipelines",
      "Deployment on Cloud",
      "Debugging & Testing",
      "Performance Optimization",
      "Responsive Design",
    ],
    "Dev Ops": [
      "Linux Fundamentals",
      "Shell Scripting",
      "Git & GitHub",
      "Jenkins CI/CD",
      "Docker Basics",
      "Kubernetes",
      "Monitoring (Prometheus, Grafana)",
      "Infrastructure as Code (Terraform)",
      "AWS EC2 & S3",
      "Security & Networking",
    ],
  };

  const quizData = {};
  Object.keys(topicsData).forEach((cat) => {
    quizData[cat] = topicsData[cat].map((topic) =>
      Array.from({ length: 5 }, (_, i) => ({
        question: `${topic} - Question ${i + 1}`,
        options: ["Option A", "Option B", "Option C", "Option D"],
        answer: "Option A",
      }))
    );
  });

  useEffect(() => {
    if (showQuiz) {
      const timer =
        timeLeft > 0 && setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
      return () => clearInterval(timer);
    }
  }, [timeLeft, showQuiz]);

  const handleCategoryClick = (cat) => {
    setSelectedCategory(cat);
    setSelectedTest(null);
    setShowQuiz(false);
    setCurrentQuestionIndex(0);
    setAnswers({});
    setTimeLeft(30);
  };

  const handleQuizClick = (topic) => {
    setSelectedTest(topic);
    setShowQuiz(true);
    setCurrentQuestionIndex(0);
    setAnswers({});
    setTimeLeft(30);
  };

  const handleOptionSelect = (questionIndex, option) => {
    setAnswers({ ...answers, [questionIndex]: option });
  };

  const handleNext = () => {
    const total =
      quizData[selectedCategory][
        topicsData[selectedCategory].indexOf(selectedTest)
      ].length;
    if (currentQuestionIndex < total - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setTimeLeft(30);
    } else {
      alert("🎉 Quiz completed!");
      setShowQuiz(false);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
      setTimeLeft(30);
    }
  };

  const topicIndex = topicsData[selectedCategory].indexOf(selectedTest);
  const currentQuestion =
    selectedTest &&
    quizData[selectedCategory]?.[topicIndex]?.[currentQuestionIndex];

  return (
    <div className="min-h-screen bg-[#0b0b0b] text-white flex flex-col font-sans">
      {/* Header */}
      <header className="px-4 sm:px-6 md:px-10 py-6 border-b border-gray-800">
        <h1 className="text-3xl sm:text-4xl font-bold mb-2">Aptitude Test</h1>
        <p className="text-gray-400 text-sm sm:text-base">
          Choose a test to assess your skills with Nexus Corporate Training Center LLP
        </p>

        {/* Search */}
        <div className="relative mt-4 max-w-full sm:max-w-md">
          <Search
            size={18}
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
          />
          <input
            type="text"
            placeholder="Search for a test..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-transparent border border-gray-700 rounded-full py-2 pl-10 pr-4 text-sm focus:outline-none focus:border-gray-500"
          />
        </div>
      </header>

      {/* Layout */}
      <div className="flex flex-1 overflow-hidden flex-col md:flex-row">
        {/* Sidebar */}
        {!showQuiz && (
          <aside className="w-full md:w-64 border-b md:border-b-0 md:border-r border-gray-800 p-4 flex flex-wrap md:flex-col gap-2 md:gap-3 overflow-y-auto justify-center md:justify-start">
            {categories.map((cat, i) => (
              <button
                key={i}
                onClick={() => handleCategoryClick(cat)}
                className={`text-xs sm:text-sm rounded-full border px-3 py-2 transition ${
                  cat === selectedCategory
                    ? "bg-orange-500 text-white border-orange-500"
                    : "border-gray-600 text-gray-300 hover:bg-[#1a1a1a]"
                }`}
              >
                {cat}
              </button>
            ))}
          </aside>
        )}

        {/* Main Content */}
        <main className="flex-1 p-4 sm:p-6 md:p-10 overflow-y-auto">
          {showQuiz ? (
            <>
              <button
                onClick={() => setShowQuiz(false)}
                className="mb-4 flex items-center gap-2 text-gray-300 hover:text-orange-500"
              >
                <ArrowLeft size={18} /> Back
              </button>

              <div className="flex flex-col sm:flex-row justify-between items-center mb-4 gap-2 sm:gap-0">
                <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-center sm:text-left">
                  {selectedCategory} — {selectedTest}
                </h2>
                <p className="text-gray-400 text-sm">{timeLeft}s left</p>
              </div>

              {/* Progress Bar */}
              <div className="w-full bg-gray-800 rounded-full h-2 mb-6">
                <div
                  className="bg-orange-500 h-2 rounded-full transition-all"
                  style={{
                    width: `${
                      ((currentQuestionIndex + 1) /
                        quizData[selectedCategory][topicIndex].length) *
                      100
                    }%`,
                  }}
                ></div>
              </div>

              {/* Quiz Layout */}
              <div className="flex flex-col lg:flex-row gap-6">
                {/* Question Box */}
                <div className="flex-1 bg-[#1a1a1a] border border-gray-800 rounded-2xl p-4 sm:p-6">
                  <p className="text-base sm:text-lg font-semibold mb-4">
                    {currentQuestionIndex + 1}. {currentQuestion?.question}
                  </p>

                  <div className="space-y-3 sm:space-y-4">
                    {currentQuestion?.options.map((opt, idx) => (
                      <label
                        key={idx}
                        className={`flex items-center gap-3 border rounded-lg p-2 sm:p-3 cursor-pointer transition ${
                          answers[currentQuestionIndex] === opt
                            ? "bg-green-700 border-green-500 text-white"
                            : "border-gray-600 hover:border-white"
                        }`}
                      >
                        <input
                          type="radio"
                          name={`question-${currentQuestionIndex}`}
                          value={opt}
                          checked={answers[currentQuestionIndex] === opt}
                          onChange={() =>
                            handleOptionSelect(currentQuestionIndex, opt)
                          }
                          className="accent-green-500 w-4 h-4"
                        />
                        <span className="text-sm sm:text-base">{opt}</span>
                      </label>
                    ))}
                  </div>

                  {/* Nav Buttons */}
                  <div className="flex justify-between mt-6 sm:mt-8">
                    <button
                      onClick={handlePrevious}
                      disabled={currentQuestionIndex === 0}
                      className="border border-gray-600 text-gray-300 px-4 sm:px-6 py-2 rounded-full hover:border-orange-500 hover:text-orange-500 transition disabled:opacity-40"
                    >
                      Previous
                    </button>

                    <button
                      onClick={handleNext}
                      className="bg-orange-500 hover:bg-orange-600 text-white px-4 sm:px-6 py-2 rounded-full font-semibold"
                    >
                      {currentQuestionIndex ===
                      quizData[selectedCategory][topicIndex].length - 1
                        ? "Submit"
                        : "Save & Next"}
                    </button>
                  </div>
                </div>

                {/* Question Number Grid */}
                <div className="lg:w-1/4 bg-[#1a1a1a] border border-gray-800 rounded-2xl p-4 sm:p-6 h-fit">
                  <h3 className="text-base sm:text-lg font-semibold mb-4 text-center">
                    Questions
                  </h3>
                  <div className="grid grid-cols-5 gap-2 sm:gap-3 justify-center">
                    {quizData[selectedCategory][topicIndex].map((_, i) => (
                      <button
                        key={i}
                        onClick={() => setCurrentQuestionIndex(i)}
                        className={`w-8 sm:w-10 h-8 sm:h-10 rounded-lg flex items-center justify-center text-xs sm:text-sm font-semibold transition ${
                          i === currentQuestionIndex
                            ? "bg-orange-500 text-white"
                            : answers[i]
                            ? "bg-green-600 text-white"
                            : "bg-[#0f0f0f] border border-gray-700 hover:border-white"
                        }`}
                      >
                        {i + 1}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </>
          ) : (
            <>
              {/* Topics Section */}
              <h2 className="text-xl sm:text-2xl font-semibold mb-6">
                {selectedCategory}
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
                {(topicsData[selectedCategory] || [])
                  .filter((topic) =>
                    topic.toLowerCase().includes(search.toLowerCase())
                  )
                  .map((topic, index) => (
                    <div
                      key={index}
                      className="bg-[#1a1a1a] border border-white rounded-2xl p-4 sm:p-5 flex flex-col justify-between hover:border-gray-500 transition"
                    >
                      <p className="text-sm sm:text-base mb-3">• {topic}</p>
                      <button
                        onClick={() => handleQuizClick(topic)}
                        className="group px-4 sm:px-5 py-2 bg-white text-orange-600 font-semibold rounded-full flex items-center justify-center gap-3 self-center mt-auto text-sm sm:text-[15px] hover:bg-gray-50 transition-all duration-300"
                      >
                        Take Quiz
                        <span className="flex items-center justify-center w-6 sm:w-7 h-6 sm:h-7 rounded-full bg-orange-500 text-white transition-all duration-300 group-hover:bg-orange-700">
                          <ExternalLink
                            size={16}
                            className="transition-transform duration-300 group-hover:translate-x-[1px] group-hover:-translate-y-[1px]"
                          />
                        </span>
                      </button>
                    </div>
                  ))}
              </div>
            </>
          )}
        </main>
      </div>
    </div>
  );
}
