import React from 'react'

const InputField = ({ type = "text", placeholder }) => (
  <input
    type={type}
    placeholder={placeholder}
    className="w-full border border-gray-600 rounded-md p-2 mb-4 
               bg-[rgba(63,63,63,0.23)] text-amber-50 placeholder-gray-300 
               focus:outline-none focus:ring-2 
               hover:bg-[rgba(63,63,63,0.35)] transition"
  />
);

const SignUpForm = () => (
  <div className="bg-transparent p-4 shadow-lg flex flex-col justify-center border border-gray-700 rounded-2xl w-full">
    <InputField placeholder="Email / Phone number" />
    <InputField type="password" placeholder="Create Password" />
    <InputField type="password" placeholder="Confirm Password" />

  <button
  className="w-full text-black py-2 rounded-full 
  bg-linear-to-b from-[#fff3e6] to-[#ffffff]
  border border-[#ffcc99]/40
  shadow-[0_4px_10px_rgba(255,186,120,0.35),inset_0_2px_4px_rgba(255,255,255,0.6)]
  hover:shadow-[0_6px_15px_rgba(255,186,120,0.5),inset_0_2px_4px_rgba(255,255,255,0.8)]
  hover:scale-[1.01]
  font-medium transition-all duration-300 mb-4"
>
  Submit
</button>

  </div>
);


const Signup = () => {
  return(
 <div className="bg-transparent relative flex flex-col md:flex-row min-h-screen font-[Poppins] text-white items-center justify-center overflow-hidden">

      <div className="flex flex-col md:flex-row items-center justify-center gap-10 md:gap-28 z-10 w-full relative px-4 md:px-12">

        <div className="relative w-full md:w-[450px] flex items-center justify-center">
           <div className="relative w-full md:w-[500px] flex items-center justify-center md:justify-start text-center md:text-left pl-0 md:pl-10">
          <h1
            className="text-[90px] md:text-[220px] font-extrabold 
            text-[#c96b2c] opacity-40 font-[Poppins]
            leading-none select-none tracking-tight pointer-events-none 
            text-center md:text-left"
          >
            Sign<br />Up
          </h1>
        </div>

          <div className="absolute inset-0 flex items-center justify-center md:hidden">
            <div className="w-[90%] max-w-[380px] scale-100 bg-transparent p-2 rounded-xl animate-popin">
              <SignUpForm />
              <div className="text-sm text-gray-300 text-right mt-3 pr-1">
                Already have an account?{" "}
                <a href="/login" className="text-orange-400 font-bold">
                  Login
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="hidden md:flex flex-col w-full md:w-[460px] scale-100 animate-popin">
          <SignUpForm />
          <div className="text-sm text-gray-300 text-right mt-3 pr-2">
            Already have an account?{" "}
            <a href="/Login" className="text-orange-400 font-bold">
              Login
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup