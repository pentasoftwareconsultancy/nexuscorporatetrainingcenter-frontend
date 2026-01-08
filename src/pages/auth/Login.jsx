import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../core/contexts/AuthContext";
import { FcGoogle } from "react-icons/fc";
import { ROUTES } from "../../core/constants/routes.constant";
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

const LoginForm = ({
  email,
  password,
  setEmail,
  setPassword,
  onSubmit,
  onForgot,
}) => (
  <form
    onSubmit={onSubmit}
    className="bg-transparent p-4 shadow-lg flex flex-col justify-center border border-gray-700 rounded-2xl w-full"
  >
    <InputField
      placeholder="Email / Phone number"
      value={email}
      onChange={(e) => setEmail(e.target.value)}
    />

    <InputField
      type="password"
      placeholder="Password"
      value={password}
      onChange={(e) => setPassword(e.target.value)}
    />

    <div className="flex flex-col sm:flex-row gap-2 mb-4">
      <Button type="submit" text="Submit" className="w-full" />

      <button
        type="button"
        onClick={onForgot}
        className="border border-gray-600 rounded-md text-sm w-full sm:w-1/2"
      >
        Forgot Password?
      </button>
    </div>
  </form>
);

const Login = () => {
  const navigate = useNavigate();
  const { login, isLoggedIn, user, isLoading } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showForgot, setShowForgot] = useState(false); // ✅ added

  useEffect(() => {
    if (isLoading) return;
    if (window.location.pathname === "/Login") return;

    if (isLoggedIn && user) {
      navigate(
        user.role === "admin" ? ROUTES.ADMIN_DASHBOARD : ROUTES.USER_APPITUDE,
        { replace: true }
      );
    }
  }, [isLoggedIn, user, isLoading, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await new ApiService().apipost(ServerUrl.API_LOGIN, {
        emailOrPhone: email,
        password,
      });
      login(response.data);
    } catch {
      alert("Invalid login");
    }
  };

  return (
    <>
      {/* 🔥 YOUR DESIGN – UNTOUCHED */}
      <div className="bg-transparent relative flex flex-col md:flex-row min-h-screen font-[Poppins] text-white items-center justify-center overflow-hidden">
        <div className="flex flex-col md:flex-row items-center justify-center gap-10 md:gap-28 z-10 w-full relative px-4 md:px-12">
          <div className="relative w-full md:w-[450px] flex items-center justify-center">
            <h1
              className="absolute left-1/2 -translate-x-1/2 md:left-10 md:translate-x-0 top-1/2 -translate-y-1/2 
              text-[150px] md:text-[220px] font-extrabold 
              text-[#c96b2c] opacity-40 leading-none"
            >
              Log
              <br />
              In
            </h1>

            <div className="absolute inset-0 flex items-center justify-center md:hidden">
              <div className="w-[90%] max-w-[380px] p-2 animate-popin">
                <LoginForm
                  email={email}
                  password={password}
                  setEmail={setEmail}
                  setPassword={setPassword}
                  onSubmit={handleSubmit}
                  onForgot={() => setShowForgot(true)} // ✅ added
                />
                <div className="flex justify-end text-sm text-gray-300 gap-2 mt-3 pr-2">
                  <span>Don’t have an account?</span>
                  <span
                    onClick={() => navigate(ROUTES.SIGNUP)}
                    className="text-orange-400 font-bold"
                  >
                    Sign Up
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="hidden md:flex flex-col w-full md:w-[500px] animate-popin">
            <LoginForm
              email={email}
              password={password}
              setEmail={setEmail}
              setPassword={setPassword}
              onSubmit={handleSubmit}
              onForgot={() => setShowForgot(true)} // ✅ added
            />
            <div className="flex justify-end text-sm text-gray-300 gap-2 mt-3 pr-2">
              <span>Don’t have an account?</span>
              <span
                onClick={() => navigate(ROUTES.SIGNUP)}
                className="text-orange-400 font-bold"
              >
                Sign Up
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 🔥 POPUP OVERLAY */}
      {showForgot && (
        <ForgotPasswordModal onClose={() => setShowForgot(false)} />
      )}
    </>
  );
};

export default Login;

const ForgotPasswordModal = ({ onClose }) => {
  const api = new ApiService();

  const [step, setStep] = useState(1);
  const [emailOrPhone, setEmailOrPhone] = useState("");
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleStep1 = async () => {
    try {
      setLoading(true);
      const res = await api.apipost(ServerUrl.API_FORGOT_PASSWORD, {
        emailOrPhone,
      });
      setQuestion(res.data.question);
      setStep(2);
    } catch {
      alert("User not found");
    } finally {
      setLoading(false);
    }
  };

  const handleStep2 = async () => {
    try {
      setLoading(true);
      await api.apipost(ServerUrl.API_FORGOT_PASSWORD_VERIFY, {
        emailOrPhone,
        answer,
      });
      setStep(3);
    } catch {
      alert("Wrong answer");
    } finally {
      setLoading(false);
    }
  };

  const handleStep3 = async () => {
    try {
      setLoading(true);

      await api.apipost(ServerUrl.API_FORGOT_PASSWORD_RESET, {
        emailOrPhone,
        newPassword,
        confirmPassword, // ✅ REQUIRED
      });

      alert("Password reset successful");
      onClose();
    } catch (err) {
      alert(err?.response?.data?.message || "Failed to reset password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
      <div className="bg-[#111] border border-gray-700 rounded-xl p-6 w-[90%] max-w-md">
        <h2 className="text-xl font-bold mb-4">Recover Password</h2>

        {step === 1 && (
          <>
            <InputField
              placeholder="Email or Phone"
              value={emailOrPhone}
              onChange={(e) => setEmailOrPhone(e.target.value)}
            />
            <Button text="Next" onClick={handleStep1} disabled={loading} />
          </>
        )}

        {step === 2 && (
          <>
            <p className="mb-2 text-sm text-gray-300">{question}</p>
            <InputField
              placeholder="Your Answer"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
            />
            <Button text="Verify" onClick={handleStep2} disabled={loading} />
          </>
        )}

        {step === 3 && (
          <>
            <InputField
              type="password"
              placeholder="New Password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />

            <InputField
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />

            <Button
              text="Reset Password"
              onClick={handleStep3}
              disabled={loading}
            />
          </>
        )}

        <button
          onClick={onClose}
          className="mt-4 text-sm text-gray-400 hover:text-white"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};
