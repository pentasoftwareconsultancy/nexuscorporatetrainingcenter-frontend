import React from "react";
import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./routs/AppRoutes";
import { AuthProvider } from "./core/contexts/AuthContext";
import "./App.css"; // optional if you have it

function App() {

  return (
    <AuthProvider>
      <BrowserRouter>
        <AppRoutes/>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
