import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../core/contexts/AuthContext";
import { FcGoogle } from "react-icons/fc";
import { toast } from "react-toastify";
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

const LoginForm = ({ email, password, setEmail, setPassword, onSubmit }) => (
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

    <Button
      type="submit"
      text="Submit"
      className="mb-4 text-2xl font-bold"
      showIcon={false}
    />

    <div className="flex flex-col sm:flex-row justify-between gap-2 mb-4 w-full">
      <button className="flex items-center justify-center border border-gray-600 gap-1 w-full sm:w-1/2 text-white py-2 rounded-md transition focus:ring-2">
        <FcGoogle />
        <span className="text-sm">Login with Google</span>
      </button>

      <button className="flex items-center justify-center border border-gray-600 gap-1 w-full sm:w-1/2 text-white py-2 rounded-md transition focus:ring-2">
        <span className="text-sm">Forgot Password?</span>
      </button>
    </div>
  </form>
);

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await new ApiService().apipost(ServerUrl.API_LOGIN, {
        emailOrPhone: email,
        password: password,
      });

      // Save user
      login(response.data);

      // Role-based redirect
      const role = response.data.user?.roles?.[0]?.roleName;

      if (role === "admin") {
        navigate(ROUTES.ADMIN_DASHBOARD);
      } else if (role === "user") {
        navigate(ROUTES.USER_APPITUDE);
      } else {
        navigate(ROUTES.HOME);
      }
    } catch (error) {
      console.log("Login error:", error);
      alert("Invalid login");
    }
  };

  return (
    <div className="bg-transparent relative flex flex-col md:flex-row min-h-screen font-[Poppins] text-white items-center justify-center overflow-hidden">
      <div className="flex flex-col md:flex-row items-center justify-center gap-10 md:gap-28 z-10 w-full relative px-4 md:px-12">
        <div className="relative w-full md:w-[450px] flex items-center justify-center">
          <h1
            className="absolute left-1/2 -translate-x-1/2 md:left-10 md:translate-x-0 top-1/2 -translate-y-1/2 
            text-[150px] md:text-[220px] font-extrabold 
            text-[#c96b2c] opacity-40 
            leading-none select-none pointer-events-none text-center md:text-left"
          >
            Log
            <br />
            In
          </h1>

          <div className="absolute inset-0 flex items-center justify-center md:hidden">
            <div className="w-[90%] max-w-[380px] bg-transparent p-2 rounded-xl animate-popin">
              <LoginForm
                email={email}
                password={password}
                setEmail={setEmail}
                setPassword={setPassword}
                onSubmit={handleSubmit}
              />
              <div className="text-sm text-gray-300 text-right mt-3 pr-1">
                Don’t have an account?{" "}
                <a href="/Signup" className="text-orange-400 font-bold">
                  Sign Up
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="hidden md:flex flex-col w-full md:w-[500px] scale-100 animate-popin">
          <LoginForm
            email={email}
            password={password}
            setEmail={setEmail}
            setPassword={setPassword}
            onSubmit={handleSubmit}
          />
          <div className="text-sm text-gray-300 text-right mt-3 pr-2">
            Don’t have an account?{" "}
            <a href="/Signup" className="text-orange-400 font-bold">
              Sign Up
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
