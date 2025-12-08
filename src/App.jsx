import React from "react";
import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./routs/AppRoutes";
import { AuthProvider } from "./core/contexts/AuthContext";
import ScrollToTop from "./pages/ScrollToTop";
import "./App.css"; // optional if you have it

function App() {

  return (
    <AuthProvider>
      <BrowserRouter>
        <ScrollToTop />
        <AppRoutes/>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
