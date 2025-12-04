import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import ApiService from "../../core/services/api.service";
import ServerUrl from "../../core/constants/serverURL.constant";

import Button from "../../components/common/Button";

const InputField = ({ type = "text", placeholder, value, onChange }) => (
  <input
    type={type}
    placeholder={placeholder}
    value={value}
    onChange={onChange}
    className="w-full border border-gray-600 rounded-md p-2 mb-4 
               bg-[rgba(63,63,63,0.23)] text-amber-50 placeholder-gray-300 
               focus:outline-none focus:ring-2 
               hover:bg-[rgba(63,63,63,0.35)] transition"
  />
);

const SignUpForm = ({ formData, setFormData, handleSubmit }) => (
  <form
    onSubmit={handleSubmit}
    className="bg-transparent p-4 shadow-lg flex flex-col justify-center border border-gray-700 rounded-2xl w-full"
  >
    <InputField
      placeholder="Email / Phone number"
      value={formData.email}
      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
    />

    <InputField
      type="password"
      placeholder="Create Password"
      value={formData.password}
      onChange={(e) => setFormData({ ...formData, password: e.target.value })}
    />

    <InputField
      type="password"
      placeholder="Confirm Password"
      value={formData.confirmPassword}
      onChange={(e) =>
        setFormData({ ...formData, confirmPassword: e.target.value })
      }
    />

    <Button
      type="submit"
      text="Register"
      className="mb-4 text-2xl font-bold"
      showIcon={false}
    />
  </form>
);

const Signup = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleSubmit = async (e) => {
  e.preventDefault();

  if (!formData.email || !formData.password || !formData.confirmPassword) {
    alert("All fields are required");
    return;
  }

  if (formData.password !== formData.confirmPassword) {
    alert("Passwords do not match");
    return;
  }

  try {
    // Direct axios call WITHOUT interceptor
    const response = await new ApiService().apipost(ServerUrl.API_REGISTER, {
      emailOrPhone: formData.email,
      password: formData.password,
    });

    console.log("REGISTRATION RESPONSE:", response.data);
    alert("Registration successful! Please login.");
    navigate("/login");
  } catch (error) {
    console.error("Registration error:", error);
    alert(error.response?.data?.message || "Registration failed");
  }
};

  return (
    <div className="bg-transparent relative flex flex-col md:flex-row min-h-screen font-[Poppins] text-white items-center justify-center overflow-hidden">
      <div className="flex flex-col md:flex-row items-center justify-center gap-10 md:gap-28 z-10 w-full relative px-4 md:px-12">
        {/* Left Large SIGNUP text */}
        <div className="relative w-full md:w-[450px] flex items-center justify-center">
          <div className="relative w-full md:w-[500px] flex items-center justify-center md:justify-start text-center md:text-left pl-0 md:pl-10">
            <h1 className="text-[90px] md:text-[220px] font-extrabold 
              text-[#c96b2c] opacity-40 font-[Poppins]
              leading-none select-none tracking-tight pointer-events-none 
              text-center md:text-left">
              Sign<br />Up
            </h1>
          </div>

          {/* Mobile Form */}
          <div className="absolute inset-0 flex items-center justify-center md:hidden">
            <div className="w-[90%] max-w-[380px] scale-100 bg-transparent p-2 rounded-xl animate-popin">
              <SignUpForm
                formData={formData}
                setFormData={setFormData}
                handleSubmit={handleSubmit}
              />
              <div className="text-sm text-gray-300 text-right mt-3 pr-1">
                Already have an account?{" "}
                <a href="/login" className="text-orange-400 font-bold">
                  Login
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Desktop Form */}
        <div className="hidden md:flex flex-col w-full md:w-[460px] scale-100 animate-popin">
          <SignUpForm
            formData={formData}
            setFormData={setFormData}
            handleSubmit={handleSubmit}
          />
          <div className="text-sm text-gray-300 text-right mt-3 pr-2">
            Already have an account?{" "}
            <a href="/login" className="text-orange-400 font-bold">
              Login
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
