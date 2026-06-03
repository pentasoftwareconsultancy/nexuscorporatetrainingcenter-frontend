import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  FiMail,
  FiLock,
  FiUser,
  FiPhone,
} from "react-icons/fi";
import Button from "../../components/common/Button";

import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import ApiService from "../../core/services/api.service";
import ServerUrl from "../../core/constants/serverURL.constant";

import login from "../../assets/home/login.avif";

const Signup = () => {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { fullName, phone, email, password, confirmPassword } = formData;

    if (!fullName || !phone || !email || !password || !confirmPassword) {
      toast.error("All fields are required");
      return;
    }

    // Full name validation: only letters and spaces, at least 2 characters
    const nameRegex = /^[a-zA-Z\s]{2,}$/;
    if (!nameRegex.test(fullName.trim())) {
      toast.error("Full Name must contain at least 2 characters and only letters/spaces");
      return;
    }

    // Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error("Please enter a valid email address");
      return;
    }

    // 10-digit phone number validation
    const phoneRegex = /^\d{10}$/;
    if (!phoneRegex.test(phone)) {
      toast.error("Phone number must be exactly 10 digits");
      return;
    }

    const hasCapital = /[A-Z]/.test(password);
    const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    if (password.length < 6 || !hasCapital || !hasSpecial) {
      toast.error("Password must be at least 6 characters, contain 1 capital letter, and 1 special character");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    // Auto role detection matching codebase defaults
    const role = email.endsWith("@devconsoftware.com") ? "admin" : "user";

    try {
      await new ApiService().apipost(ServerUrl.API_REGISTER, {
        userName: fullName,
        phoneNumber: phone,
        emailOrPhone: email,
        password,
        confirmPassword,
        role,
      });

      toast.success("Registration successful! Please login.");
      navigate("/login");
    } catch (error) {
      toast.error(error.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black px-4">

      {/* BACKGROUND IMAGE */}
      <div className="absolute inset-0">
        <img
          src={login}
          alt="background"
          className="w-full h-full object-cover scale-110"
        />

        {/* DARK OVERLAY */}
        <div className="absolute inset-0 bg-black/75"></div>

        {/* ORANGE LIGHT */}
        <div className="absolute inset-0 bg-gradient-to-br from-orange-500/20 via-transparent to-transparent"></div>
      </div>

      {/* SIGNUP CARD */}
      <motion.div
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="relative z-10 w-full max-w-md"
      >

        {/* GLASS CARD */}
        <div
          className="
            relative
            rounded-[30px]
            border
            border-white/10
            bg-white/[0.03]
            backdrop-blur-xl
            p-3
            mt-3
            mb-17
            shadow-[0_0_40px_rgba(255,115,0,0.12)]
          "
        >

          {/* HEADING */}
          <div className="mb-6">

            <h1 className="text-4xl font-bold text-white">
              Create Account
            </h1>

            <p className="text-gray-400 mt-2 text-sm">
              Join the futuristic experience
            </p>
          </div>

          {/* FORM */}
          <form
            onSubmit={handleSubmit}
            className="space-y-4"
          >

            {/* FULL NAME */}
            <div className="relative">

              <FiUser className="absolute top-4 left-4 text-orange-400" />

              <input
                type="text"
                placeholder="Full Name"
                value={formData.fullName}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    fullName: e.target.value,
                  })
                }
                className="
                  w-full
                  bg-white/[0.04]
                  border
                  border-white/10
                  rounded-xl
                  py-3
                  pl-12
                  pr-4
                  text-white
                  placeholder-gray-500
                  outline-none
                  focus:border-orange-400
                  focus:ring-2
                  focus:ring-orange-500/20
                  transition-all
                "
              />
              {formData.fullName && (formData.fullName.trim().length < 2 || !/^[a-zA-Z\s]+$/.test(formData.fullName)) && (
                <p className="text-xs text-orange-400 mt-1 pl-1">
                  Full Name must contain at least 2 characters and only letters/spaces
                </p>
              )}
            </div>

            {/* PHONE */}
            <div className="relative">

              <FiPhone className="absolute top-4 left-4 text-orange-400" />

              <input
                type="text"
                maxLength={10}
                placeholder="Phone Number"
                value={formData.phone}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    phone: e.target.value.replace(/\D/g, ""),
                  })
                }
                className="
                  w-full
                  bg-white/[0.04]
                  border
                  border-white/10
                  rounded-xl
                  py-3
                  pl-12
                  pr-4
                  text-white
                  placeholder-gray-500
                  outline-none
                  focus:border-orange-400
                  focus:ring-2
                  focus:ring-orange-500/20
                  transition-all
                "
              />
            </div>

            {/* EMAIL */}
            <div className="relative">

              <FiMail className="absolute top-4 left-4 text-orange-400" />

              <input
                type="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    email: e.target.value,
                  })
                }
                className="
                  w-full
                  bg-white/[0.04]
                  border
                  border-white/10
                  rounded-xl
                  py-3
                  pl-12
                  pr-4
                  text-white
                  placeholder-gray-500
                  outline-none
                  focus:border-orange-400
                  focus:ring-2
                  focus:ring-orange-500/20
                  transition-all
                "
              />
            </div>

            {/* PASSWORD */}
            <div className="relative">

              <FiLock className="absolute top-4 left-4 text-orange-400" />

              <input
                type="password"
                placeholder="Create Password"
                value={formData.password}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    password: e.target.value,
                  })
                }
                className="
                  w-full
                  bg-white/[0.04]
                  border
                  border-white/10
                  rounded-xl
                  py-3
                  pl-12
                  pr-4
                  text-white
                  placeholder-gray-500
                  outline-none
                  focus:border-orange-400
                  focus:ring-2
                  focus:ring-orange-500/20
                  transition-all
                "
              />
              {formData.password && (formData.password.length < 6 || !/[A-Z]/.test(formData.password) || !/[!@#$%^&*(),.?":{}|<>]/.test(formData.password)) && (
                <p className="text-xs text-orange-400 mt-1 pl-1">
                  Password must be at least 6 characters and contain 1 capital letter and 1 special character
                </p>
              )}
            </div>

            {/* CONFIRM PASSWORD */}
            <div className="relative">

              <FiLock className="absolute top-4 left-4 text-orange-400" />

              <input
                type="password"
                placeholder="Confirm Password"
                value={formData.confirmPassword}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    confirmPassword: e.target.value,
                  })
                }
                className="
                  w-full
                  bg-white/[0.04]
                  border
                  border-white/10
                  rounded-xl
                  py-3
                  pl-12
                  pr-4
                  text-white
                  placeholder-gray-500
                  outline-none
                  focus:border-orange-400
                  focus:ring-2
                  focus:ring-orange-500/20
                  transition-all
                "
              />
              {formData.confirmPassword && formData.confirmPassword !== formData.password && (
                <p className="text-xs text-orange-400 mt-1 pl-1">
                  Passwords do not match
                </p>
              )}
            </div>

            <motion.button
              initial={{ boxShadow: "0px 0px 0px rgba(255,115,0,0.0)" }}
              whileHover={{
                scale: 1.02,
                boxShadow: "0px 0px 25px rgba(255,115,0,0.4)",
              }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="w-full py-3 mt-2 bg-gradient-to-r from-orange-500 to-amber-600 text-white font-semibold rounded-xl transition-all"
            >
              Create Account
            </motion.button>

            {/* LOGIN LINK */}
            <div className="text-center pt-2 text-gray-400 text-sm">
              Already have an account?{" "}

              <span
                onClick={() => navigate("/login")}
                className="
                  text-orange-400
                  cursor-pointer
                  hover:text-orange-300
                "
              >
                Login
              </span>
            </div>
          </form>
        </div>
      </motion.div>
    </div>
  );
};

export default Signup;