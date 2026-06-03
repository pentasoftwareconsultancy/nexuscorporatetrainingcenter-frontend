import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useAuth } from "../../core/contexts/AuthContext";
import ApiService from "../../core/services/api.service";
import ServerUrl from "../../core/constants/serverURL.constant";
import Button from "../../components/common/Button";
import { ROUTES } from "../../core/constants/routes.constant";
import login1 from "../../assets/home/login1.png";

// ================= INPUT FIELD =================
const InputField = ({
  type = "text",
  placeholder,
  value,
  onChange,
}) => (
  <input
    type={type}
    placeholder={placeholder}
    value={value}
    onChange={onChange}
    className="w-full border border-gray-600 rounded-md p-3 mb-4 bg-[#1e1e1e] text-white
      placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-400 "  />
);
// ================= LOGIN FORM =================
const LoginForm = ({
  email,
  password,
  setEmail,
  setPassword,
  onSubmit,
  onForgot,
}) => (
  <form onSubmit={onSubmit} className="w-full p-6">

    <InputField
      placeholder="Email or Phone Number" value={email}
      onChange={(e) => setEmail(e.target.value)}
    />
    <InputField type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
    <Button type="submit" text="Login" className="w-full" />

    <div className="text-right mt-3">
      <button type="button" onClick={onForgot} className="text-sm text-orange-400"  > Forgot Password? </button>
    </div>
  </form>
);
// ================= MAIN LOGIN =================
const Login = () => {
  const navigate = useNavigate();
  const { login, isLoggedIn, user } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showForgot, setShowForgot] = useState(false);
  // ================= LOGIN SUBMIT =================

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await new ApiService().apipost(
        ServerUrl.API_LOGIN,
        {
          emailOrPhone: email,
          password,
        }
      );

      login(response.data);
      toast.success("Login Successful");
      navigate(
        response?.data?.role === "admin"
          ? ROUTES.ADMIN_DASHBOARD
          : ROUTES.USER_APPITUDE
      );

    } catch (err) {
      toast.error(
        err?.response?.data?.message ||
        "Invalid Email or Password"
      );
    }
  };

 return (
  <>
    <div
  className="min-h-screen flex items-center justify-center px-4 bg-cover bg-center bg-no-repeat  "
  style={{ backgroundImage: `url(${login1})` }}
>
<div className="w-full max-w-md p-4 rounded-2xl bg-white/5 border border-white/70 backdrop-blur-md mb-28">
    <h1 className="text-4xl font-bold text-white mb-2 ml-6">
      Login
    </h1>

    <LoginForm
      email={email}
      password={password}
      setEmail={setEmail}
      setPassword={setPassword}
      onSubmit={handleSubmit}
      onForgot={() => setShowForgot(true)}
    />

    <div className="text-center  text-white">
      Don't have an account?
      <span
        onClick={() => navigate(ROUTES.SIGNUP)}
        className="text-orange-400 ml-2 cursor-pointer"
      >
        Sign Up
      </span>
    </div>
  </div>
</div>
  </>
);
};

export default Login;

// ================= FORGOT PASSWORD =================

const ForgotPasswordModal = ({ onClose }) => {

  const api = new ApiService();
  const [step, setStep] = useState(1);
  const [emailOrPhone, setEmailOrPhone] = useState("");
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [resetToken, setResetToken] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  // ================= STEP 1 =================
  const handleFindUser = async () => {
    if (!emailOrPhone) {
      return toast.error("Enter Email or Phone");
    }
    try {
      setLoading(true);
      const res = await api.apipost(
        ServerUrl.API_FORGOT_PASSWORD,
        {
          emailOrPhone,
        }
      );

      setQuestion(res.data.question);

      setStep(2);

    } catch (err) {

      toast.error("User not found");

    } finally {

      setLoading(false);

    }
  };

  // ================= STEP 2 =================

  const handleVerifyAnswer = async () => {

    if (!answer) {
      return toast.error("Enter Answer");
    }

    try {
      setLoading(true);
      const res = await api.apipost(
        ServerUrl.API_FORGOT_PASSWORD_VERIFY,
        {
          emailOrPhone,
          answer,
        }
      );
      setResetToken(res.data.resetToken);
      setStep(3);
    } catch (err) {
      toast.error("Wrong Answer");
    } finally {
      setLoading(false);
    }
  };
  // ================= STEP 3 =================
  const handleResetPassword = async () => {
    if (!newPassword || !confirmPassword) {
      return toast.error("Fill all fields");
    }
    if (newPassword !== confirmPassword) {
      return toast.error("Passwords do not match");
    }
    try {
      setLoading(true);
      await api.apipost(
        ServerUrl.API_FORGOT_PASSWORD_RESET,
        {
          resetToken,
          newPassword,
          confirmPassword,
        }
      );
      toast.success("Password Reset Successful");
      onClose();
    } catch (err) {
      toast.error(
        err?.response?.data?.message ||
        "Reset Failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
      <div className="bg-[#111] p-3 rounded-xl w-[90%] max-w-md border border-gray-700">
        <h2 className="text-2xl text-white font-bold mb-5">
          Forgot Password
        </h2>
        {/* STEP 1 */}
        {step === 1 && (
          <>
            <InputField
              placeholder="Enter Email or Phone"
              value={emailOrPhone}
              onChange={(e) =>
                setEmailOrPhone(e.target.value)
              }
            />

            <Button
              text={loading ? "Loading..." : "Next"}
              onClick={handleFindUser}
            />
          </>
        )}
        {/* STEP 2 */}
        {step === 2 && (
          <>
            <p className="text-gray-300 mb-3"> {question}   </p>
            <InputField placeholder="Enter Answer" value={answer} onChange={(e) => setAnswer(e.target.value)} />
            <Button text={loading ? "Verifying..." : "Verify"} onClick={handleVerifyAnswer} />  </>
        )}
        {/* STEP 3 */}
        {step === 3 && (
          <>
            <InputField
              type="password"
              placeholder="New Password"
              value={newPassword}
              onChange={(e) =>
                setNewPassword(e.target.value)
              }
            />

            <InputField type="password" placeholder="Confirm Password" value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)} />

            <Button text={loading ? "Resetting..." : "Reset Password"}
              onClick={handleResetPassword} />  </>
        )}

        <button onClick={onClose} className="mt-4 text-gray-400 text-sm" > Cancel  </button>
      </div>
    </div>
  );
};