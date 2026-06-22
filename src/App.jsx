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
          <div className="absolute top-[-10%] left-[-5%] w-[600px] h-[600px] bg-orange-600/6 blur-[130px] rounded-full" />
          <div className="absolute bottom-[10%] right-[-5%] w-[500px] h-[500px] bg-blue-600/10 blur-[120px] rounded-full" />
          <div className="absolute top-[40%] left-[35%] w-[400px] h-[400px] bg-purple-600/5 blur-[100px] rounded-full" />
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
