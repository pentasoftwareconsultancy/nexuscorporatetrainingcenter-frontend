import React from "react";
import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./routs/AppRoutes";
import { AuthProvider } from "./core/contexts/AuthContext";
import ScrollToTop from "./pages/ScrollToTop";
import Toaster from "./components/constant/Toaster";
import AiAssistant from "./components/common/AiAssistant";
import "./App.css";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        {/* ── GLOBAL BACKGROUND ANIMATION ── */}
        <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
          {[...Array(18)].map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full"
              style={{
                width: `${(i % 3) * 4 + 4}px`,
                height: `${(i % 3) * 4 + 4}px`,
                backgroundColor: ["#FF6A00","#fb923c","#34d399","#c084fc","#f472b6","#22d3ee"][i % 6],
                left: `${[8,22,37,51,63,78,14,45,70,5,88,30,55,92,18,42,67,83][i]}%`,
                top: `${[12,35,58,80,20,45,70,5,90,28,52,75,15,40,65,88,32,60][i]}%`,
                opacity: 0.2,
                animation: `floatParticle ${8 + (i % 6)}s ease-in-out infinite`,
                animationDelay: `${(i * 0.7) % 5}s`,
              }}
            />
          ))}
          <div className="absolute inset-0" style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)`,
            backgroundSize: "60px 60px",
            animation: "gridMove 20s linear infinite",
          }} />
          <div className="absolute top-[-10%] left-[-5%] w-[600px] h-[600px] bg-orange-600/6 blur-[130px] rounded-full" />
          <div className="absolute bottom-[10%] right-[-5%] w-[500px] h-[500px] bg-blue-600/10 blur-[120px] rounded-full" />
          <div className="absolute top-[40%] left-[35%] w-[400px] h-[400px] bg-purple-600/5 blur-[100px] rounded-full" />
          <style>{`
            @keyframes floatParticle {
              0%, 100% { transform: translateY(0px) translateX(0px); }
              25%       { transform: translateY(-30px) translateX(10px); }
              50%       { transform: translateY(-15px) translateX(-10px); }
              75%       { transform: translateY(-40px) translateX(5px); }
            }
            @keyframes gridMove {
              0%   { transform: translateY(0px); }
              100% { transform: translateY(60px); }
            }
          `}</style>
        </div>
        <Toaster />
        <ScrollToTop />
        <AppRoutes/>
        <AiAssistant />
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
