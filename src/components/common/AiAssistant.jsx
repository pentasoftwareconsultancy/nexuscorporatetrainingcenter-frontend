import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Send, X, Bot, User, Trash2, Volume2, VolumeX, Mic, MicOff,
  Sparkles, MessageSquare, BookOpen, GraduationCap, MapPin, PhoneCall, RefreshCw, HelpCircle
} from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function AiAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [isListening, setIsListening] = useState(false);
  const [activeTab, setActiveTab] = useState("chat"); // chat or courses/info

  const chatEndRef = useRef(null);
  const recognitionRef = useRef(null);
  const navigate = useNavigate();

  // Load welcome message on mount
  useEffect(() => {
    setMessages([
      {
        id: "welcome-1",
        sender: "ai",
        text: "Welcome to **Nexus Corporate Training Center**! 🎓 I am your Nexus Intelligent Assistant. I can help you explore courses, find branch locations, understand placement statistics, and schedule counselor calls.",
        timestamp: getCurrentTime(),
      },
      {
        id: "welcome-2",
        sender: "ai",
        text: "How can I accelerate your learning journey today? Feel free to select one of the quick options below or ask me any question directly.",
        timestamp: getCurrentTime(),
        showChips: true
      }
    ]);
  }, []);

  // Listen to custom toggle event
  useEffect(() => {
    const handleToggle = () => setIsOpen((prev) => !prev);
    window.addEventListener("toggle-ai-assistant", handleToggle);
    return () => window.removeEventListener("toggle-ai-assistant", handleToggle);
  }, []);

  // Auto-scroll to bottom
  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isTyping]);

  // Speech Recognition (Speech-to-Text) Setup
  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      const rec = new SpeechRecognition();
      rec.continuous = false;
      rec.interimResults = false;
      rec.lang = "en-US";

      rec.onstart = () => {
        setIsListening(true);
      };

      rec.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setInputValue(transcript);
      };

      rec.onerror = (e) => {
        console.error("Speech recognition error", e);
        setIsListening(false);
      };

      rec.onend = () => {
        setIsListening(false);
      };

      recognitionRef.current = rec;
    }
  }, []);

  const getCurrentTime = () => {
    return new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  // Text to Speech
  const speakText = (text) => {
    if (isMuted) return;

    // Clean markdown before speaking
    const cleanText = text
      .replace(/\*\*/g, "")
      .replace(/•/g, "")
      .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1");

    // Cancel current speech
    window.speechSynthesis?.cancel();

    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.rate = 1.0;
    window.speechSynthesis?.speak(utterance);
  };

  const handleSendMessage = async (textToSend) => {
    const query = textToSend || inputValue;
    if (!query.trim()) return;

    // Add user message
    const userMsg = {
      id: `user-${Date.now()}`,
      sender: "user",
      text: query,
      timestamp: getCurrentTime(),
    };
    setMessages((prev) => [...prev, userMsg]);
    setInputValue("");
    setIsTyping(true);

    // Speak user's query if desired, or silence any current speaking
    window.speechSynthesis?.cancel();

    // Simulate AI response delay
    setTimeout(() => {
      let replyText = "";
      let customComponent = null;
      let suggestions = [];

      const lowercaseQuery = query.toLowerCase();

      // Simple mock AI response engine matching typical keywords
      if (lowercaseQuery.includes("course") || lowercaseQuery.includes("class") || lowercaseQuery.includes("learn") || lowercaseQuery.includes("syllabus")) {
        replyText = "We offer premium, industry-oriented training programs designed to match global corporate expectations. All courses include **100% placement assurance**.\n\nHere are our top programs:\n• **Full Stack Java Developer**: Spring Boot, React, Microservices, AWS.\n• **Data Science & AI / ML**: Python, Statistics, Deep Learning, Generative AI.\n• **Full Stack Web Development**: MERN Stack (MongoDB, Express, React, Node).\n• **Software Testing**: Manual + Automation (Selenium, Java, API Testing).";

        suggestions = ["Java syllabus", "Data Science fee", "Apply for test"];
        customComponent = (
          <div className="mt-3 p-3 bg-zinc-900/60 rounded-xl border border-orange-500/20 space-y-2">
            <h4 className="text-xs font-bold text-orange-400 uppercase tracking-wider">Quick Actions</h4>
            <div className="flex flex-col gap-2">
              <button
                onClick={() => { navigate("/courses"); setIsOpen(false); }}
                className="w-full text-left py-1.5 px-3 rounded-lg bg-orange-600 hover:bg-orange-500 text-white font-medium text-xs transition-colors flex items-center justify-between"
              >
                <span>View Full Course Syllabus</span>
                <span>→</span>
              </button>
            </div>
          </div>
        );
      } else if (lowercaseQuery.includes("placement") || lowercaseQuery.includes("job") || lowercaseQuery.includes("package") || lowercaseQuery.includes("company")) {
        replyText = "Nexus is proud of its stellar placement record. Our graduates receive extensive grooming, including resume reviews, profile building, and mock interviews.\n\n📈 **Placement Highlights**:\n• **Highest CTC Offered**: 18.0 LPA\n• **Average Salary Package**: 5.5 LPA\n• **Active Hiring Partners**: 250+ firms\n• **Top Employers**: TCS, Infosys, Capgemini, Tech Mahindra, LTIMindtree, Cognizant, etc.";

        suggestions = ["Success stories", "Our branches", "Contact counselor"];
      } else if (lowercaseQuery.includes("location") || lowercaseQuery.includes("branch") || lowercaseQuery.includes("where") || lowercaseQuery.includes("address")) {
        replyText = "Nexus has state-of-the-art training centers across Pune, equipped with modern lecture theatres and dedicated lab spaces:\n\n📍 **HQ (Kharadi)**: Behind EON IT Park, Kharadi, Pune.\n📍 **Deccan Campus**: FC Road, Opp. Fergusson College, Pune.\n📍 **Chinchwad Campus**: Near Chinchwad Railway Station, Pune.";

        suggestions = ["Contact details", "HQ Map", "Book campus visit"];
      } else if (lowercaseQuery.includes("contact") || lowercaseQuery.includes("phone") || lowercaseQuery.includes("call") || lowercaseQuery.includes("number") || lowercaseQuery.includes("counselor")) {
        replyText = "You can get in touch with our expert academic counselors right away! 📞\n\n• **Direct Hotline**: +91 9545450788\n• **WhatsApp Support**: +91 9545450788\n• **Email**: admissions@nexuscenter.com\n\nWould you like us to schedule a callback for you?";

        suggestions = ["WhatsApp chat", "Request callback", "HQ Location"];
      } else if (lowercaseQuery.includes("java")) {
        replyText = "Our **Full Stack Java Developer** program is an intensive 6-month career path covering Core Java, Advanced Java, Hibernate, Spring Boot, React.js, Docker, Kubernetes, and Cloud Deployment (AWS).\n\n• **Eligibility**: BE/BTech, BCA, MCA, BSC CS, or working professionals looking to transition.\n• **Projects**: e-Commerce Backend, Microservice Gateway, Live cloud deploy.";
        suggestions = ["Java syllabus", "Fee structure", "Next batch date"];
      } else if (lowercaseQuery.includes("data") || lowercaseQuery.includes("science") || lowercaseQuery.includes("ai")) {
        replyText = "Our **Data Science & Generative AI** program focuses on practical engineering. You'll master Python, Pandas, SQL, Tableau, Machine Learning, Deep Learning (TensorFlow/PyTorch), and LLMs/Prompt Engineering.\n\n• **Eligibility**: Open to any graduate with logical reasoning abilities.\n• **Projects**: Customer Churn Predictor, Custom RAG Chatbot, Image recognition pipeline.";
        suggestions = ["Data science syllabus", "Next batch date", "Eligibility test"];
      } else if (lowercaseQuery.includes("hello") || lowercaseQuery.includes("hi") || lowercaseQuery.includes("hey")) {
        replyText = "Hi there! 👋 Glad to chat. How can I help you today? I can guide you through our tech courses, placements, and branch information.";
        suggestions = ["Show all courses", "Our locations", "Placement stats"];
      } else {
        // General query fall-back
        replyText = "I see. We have designed our training center programs to solve exactly that. Nexus provides dedicated hands-on labs, 250+ hiring partners, and expert faculty mentorship to transform your technical skills.\n\nTo learn more, you can ask about **courses**, **placement packages**, or **branch locations**, or talk to our team directly.";

        suggestions = ["Explore Courses", "Placement Record", "Contact Admissions"];
      }

      // TODO: Replace this mock response block with your actual AI assistant API call.
      // Example:
      // const res = await axios.post('/api/assistant', { message: query });
      // replyText = res.data.response;

      const aiMsg = {
        id: `ai-${Date.now()}`,
        sender: "ai",
        text: replyText,
        timestamp: getCurrentTime(),
        customComponent,
        suggestions
      };

      setMessages((prev) => [...prev, aiMsg]);
      setIsTyping(false);
      speakText(replyText);
    }, 1200);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const toggleSpeechInput = () => {
    if (!recognitionRef.current) {
      alert("Speech recognition is not supported on this browser. Try Chrome or Safari.");
      return;
    }

    if (isListening) {
      recognitionRef.current.stop();
    } else {
      recognitionRef.current.start();
    }
  };

  const clearChat = () => {
    if (window.confirm("Are you sure you want to clear this conversation?")) {
      setMessages([
        {
          id: `welcome-${Date.now()}`,
          sender: "ai",
          text: "Conversation cleared. How can I help you fresh today? Ask me about **courses**, **placements**, or **campuses**.",
          timestamp: getCurrentTime(),
          showChips: true
        }
      ]);
    }
  };

  // Helper function to format markdown-like text safely without dynamic components
  const formatMessageText = (text) => {
    if (!text) return "";

    // Split by lines
    const lines = text.split("\n");
    return lines.map((line, idx) => {
      let renderedLine = line;

      // Handle bold formatting: **text**
      const boldRegex = /\*\*([^*]+)\*\*/g;
      const parts = [];
      let lastIndex = 0;
      let match;

      while ((match = boldRegex.exec(line)) !== null) {
        // Add text before match
        if (match.index > lastIndex) {
          parts.push(line.substring(lastIndex, match.index));
        }
        // Add bolded text
        parts.push(<strong key={match.index} className="text-orange-400 font-semibold">{match[1]}</strong>);
        lastIndex = boldRegex.lastIndex;
      }

      if (lastIndex < line.length) {
        parts.push(line.substring(lastIndex));
      }

      const content = parts.length > 0 ? parts : renderedLine;

      // Handle bullets
      if (line.startsWith("• ")) {
        return (
          <li key={idx} className="list-none flex items-start mt-1 pl-1 text-zinc-100 text-sm">
            <span className="text-orange-500 mr-2 mt-1 select-none text-[8px]">●</span>
            <div className="flex-1">{content}</div>
          </li>
        );
      }

      return (
        <p key={idx} className="text-zinc-100 text-sm leading-relaxed mt-1 first:mt-0 min-h-[1.25rem]">
          {content}
        </p>
      );
    });
  };

  const presetChips = [
    { label: "🎓 View Courses", query: "courses" },
    { label: "📍 Branch Locations", query: "locations" },
    { label: "💼 Placement Packages", query: "placement package" },
    { label: "📞 Speak to Advisor", query: "contact counseling" }
  ];

  return (
    <>
      {/* === OPTIONAL DIRECT FLOATING TOGGLE BUTTON === */}
      {/* This renders only if the chat is closed, giving users a way to open the AI assistant on pages where ButtonGroup isn't used */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0, y: 50 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0, opacity: 0, y: 50 }}
            whileHover={{ scale: 1.1, boxShadow: "0 0 20px rgba(255, 106, 0, 0.6)" }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsOpen(true)}
            className="fixed bottom-6 left-6 z-50 p-4 rounded-full bg-gradient-to-tr from-[#FF6A00] to-[#1254FA] text-[#FFF3EA] shadow-2xl border border-white/20 flex items-center justify-center cursor-pointer group"
            title="Nexus AI Assistant"
          >
            <div className="relative">
              <Bot className="size-6 group-hover:rotate-12 transition-transform duration-300" />
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-green-500 rounded-full border border-zinc-950 animate-pulse" />
            </div>
            <span className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-300 ease-out font-medium text-sm whitespace-nowrap pl-0 group-hover:pl-2">
              Ask Nexus AI
            </span>
          </motion.button>
        )}
      </AnimatePresence>

      {/* === ASSISTANT WIDGET BODY === */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.85 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 100, scale: 0.85 }}
            transition={{ type: "spring", damping: 25, stiffness: 220 }}
            className="fixed bottom-4 right-4 z-50 w-[92vw] sm:w-[420px] h-[80vh] sm:h-[620px] rounded-2xl overflow-hidden flex flex-col glass-luxury border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.6)]"
          >
            {/* Ambient Background Glow Effect */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-orange-600/10 blur-[40px] pointer-events-none rounded-full" />
            <div className="absolute bottom-0 left-0 w-40 h-40 bg-blue-600/10 blur-[50px] pointer-events-none rounded-full" />

            {/* HEADER */}
            <div className="relative z-10 p-4 bg-zinc-950/80 border-b border-white/5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="relative p-2 bg-gradient-to-br from-orange-600/25 to-blue-600/25 rounded-xl border border-white/10">
                  <Bot className="size-5 text-orange-500 animate-pulse" />
                  <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 rounded-full border border-zinc-950" />
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <h3 className="font-semibold text-sm text-[#FFF3EA] tracking-wide font-sora">Nexus AI Guide</h3>
                    <span className="px-1.5 py-0.5 text-[9px] bg-orange-500/10 border border-orange-500/25 text-orange-400 rounded-md font-bold uppercase tracking-wider flex items-center gap-0.5">
                      <Sparkles className="size-2" /> Beta
                    </span>
                  </div>
                  <p className="text-[10px] text-zinc-400">Online • Answers center questions</p>
                </div>
              </div>

              {/* Controls */}
              <div className="flex items-center gap-1">
                <button
                  onClick={() => setIsMuted(!isMuted)}
                  className={`p-2 rounded-lg text-zinc-400 hover:text-[#FFF3EA] hover:bg-white/5 transition-colors cursor-pointer`}
                  title={isMuted ? "Unmute Voice Responses" : "Mute Voice Responses"}
                >
                  {isMuted ? <VolumeX className="size-4" /> : <Volume2 className="size-4 text-orange-400" />}
                </button>
                <button
                  onClick={clearChat}
                  className="p-2 rounded-lg text-zinc-400 hover:text-red-400 hover:bg-white/5 transition-colors cursor-pointer"
                  title="Clear Chat History"
                >
                  <Trash2 className="size-4" />
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 rounded-lg text-zinc-400 hover:text-white hover:bg-white/5 transition-colors cursor-pointer"
                  title="Close Assistant"
                >
                  <X className="size-4" />
                </button>
              </div>
            </div>

            {/* MESSAGES BODY */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 relative z-10 scrollbar-thin">
              <AnimatePresence initial={false}>
                {messages.map((msg) => (
                  <motion.div
                    key={msg.id}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className={`flex items-start gap-2.5 ${msg.sender === "user" ? "justify-end" : ""}`}
                  >
                    {/* Bot Avatar */}
                    {msg.sender === "ai" && (
                      <div className="p-1.5 rounded-lg bg-zinc-900 border border-zinc-800 shrink-0 select-none">
                        <Bot className="size-3.5 text-orange-400" />
                      </div>
                    )}

                    <div className="flex flex-col max-w-[82%] space-y-1.5">
                      {/* Message Bubble */}
                      <div
                        className={`p-3 rounded-2xl shadow-sm leading-relaxed text-sm ${msg.sender === "user"
                            ? "bg-gradient-to-tr from-[#FF6A00] to-orange-700 text-[#FFF3EA] rounded-tr-none border border-orange-500/20"
                            : "bg-zinc-900/80 border border-white/5 text-zinc-100 rounded-tl-none backdrop-blur-sm"
                          }`}
                      >
                        {formatMessageText(msg.text)}

                        {/* Rendering Custom Component (like redirect actions) */}
                        {msg.customComponent}
                      </div>

                      {/* Chips / Suggestion buttons inside specific messages */}
                      {msg.sender === "ai" && msg.showChips && (
                        <div className="flex flex-wrap gap-1.5 pt-1.5">
                          {presetChips.map((chip, idx) => (
                            <button
                              key={idx}
                              onClick={() => handleSendMessage(chip.query)}
                              className="text-xs px-2.5 py-1.5 rounded-full bg-zinc-850 hover:bg-zinc-800 border border-white/10 hover:border-orange-500/30 text-zinc-200 hover:text-white transition duration-200 cursor-pointer flex items-center gap-1"
                            >
                              {chip.label}
                            </button>
                          ))}
                        </div>
                      )}

                      {/* Interactive Next-Step Suggestions */}
                      {msg.sender === "ai" && msg.suggestions && msg.suggestions.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 pt-1">
                          {msg.suggestions.map((suggestion, idx) => (
                            <button
                              key={idx}
                              onClick={() => handleSendMessage(suggestion)}
                              className="text-[11px] px-2 py-1 rounded-lg bg-white/5 hover:bg-white/10 border border-white/5 hover:border-orange-500/20 text-zinc-300 hover:text-white transition duration-200 cursor-pointer"
                            >
                              {suggestion}
                            </button>
                          ))}
                        </div>
                      )}

                      {/* Timestamp */}
                      <span className={`text-[9px] text-zinc-500 ${msg.sender === "user" ? "text-right" : ""}`}>
                        {msg.timestamp}
                      </span>
                    </div>

                    {/* User Avatar */}
                    {msg.sender === "user" && (
                      <div className="p-1.5 rounded-lg bg-orange-500/10 border border-orange-500/20 shrink-0 select-none">
                        <User className="size-3.5 text-orange-500" />
                      </div>
                    )}
                  </motion.div>
                ))}

                {/* Thinking/Typing Indicator */}
                {isTyping && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex items-start gap-2.5"
                  >
                    <div className="p-1.5 rounded-lg bg-zinc-900 border border-zinc-800 shrink-0">
                      <Bot className="size-3.5 text-orange-400" />
                    </div>
                    <div className="bg-zinc-900/60 border border-white/5 p-3 rounded-2xl rounded-tl-none flex items-center space-x-1.5">
                      <span className="w-1.5 h-1.5 bg-orange-500 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                      <span className="w-1.5 h-1.5 bg-orange-500 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                      <span className="w-1.5 h-1.5 bg-orange-500 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <div ref={chatEndRef} />
            </div>

            {/* INPUT FOOTER */}
            <div className="relative z-10 p-3 bg-zinc-950/90 border-t border-white/5 flex flex-col gap-2">
              <div className="flex items-center gap-2">
                {/* Speech Microphone Input */}
                <button
                  onClick={toggleSpeechInput}
                  className={`p-2 rounded-xl border transition duration-200 cursor-pointer flex items-center justify-center ${isListening
                      ? "bg-red-500/20 border-red-500 text-red-500 animate-pulse"
                      : "bg-white/5 border-white/5 text-zinc-400 hover:text-white hover:bg-white/10"
                    }`}
                  title={isListening ? "Listening... Click to stop" : "Use Voice Input"}
                >
                  {isListening ? <MicOff className="size-4" /> : <Mic className="size-4" />}
                </button>

                {/* Input Text Field */}
                <div className="flex-1 relative flex items-center">
                  <textarea
                    rows={1}
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={handleKeyPress}
                    placeholder={isListening ? "Listening..." : "Ask about courses, branches..."}
                    className="w-full bg-white/5 border border-white/5 focus:border-orange-500/40 rounded-xl py-2 pl-3 pr-10 text-sm text-[#FFF3EA] placeholder-zinc-500 outline-none resize-none focus:ring-1 focus:ring-orange-500/20 transition-all scrollbar-none max-h-[80px]"
                    style={{ scrollbarWidth: "none" }}
                  />
                  {/* File attach visually placeholder */}
                  <button className="absolute right-3 text-zinc-500 hover:text-zinc-300 cursor-pointer">
                    <HelpCircle className="size-4" onClick={() => handleSendMessage("help")} title="Show help topics" />
                  </button>
                </div>

                {/* Send Button */}
                <button
                  onClick={() => handleSendMessage()}
                  disabled={!inputValue.trim() && !isListening}
                  className="p-2.5 rounded-xl bg-orange-600 hover:bg-orange-500 text-[#FFF3EA] disabled:bg-zinc-800 disabled:text-zinc-500 shadow-lg hover:shadow-orange-600/20 disabled:shadow-none transition duration-200 cursor-pointer shrink-0"
                >
                  <Send className="size-4" />
                </button>
              </div>

              {/* Powered By Tag */}
              <div className="flex items-center justify-between text-[9px] text-zinc-500 px-1">
                <span>Powered by Nexus AI</span>
                <span>Press Enter to send</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
