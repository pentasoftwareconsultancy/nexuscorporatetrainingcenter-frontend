import React from "react";
import { RiNotification4Fill } from "react-icons/ri";
import profile from "../../assets/adminProfile/profile.png";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../core/constants/routes.constant";

const AdminNavbar = () => {
  const navigate = useNavigate();
  return (
    <div className="w-full font-sora fixed top-0 left-0 z-50">
      <div className="max-w-[2400px]">
        <nav
          className="flex justify-between items-center 
                  px-4 sm:px-8 lg:px-10 
                  py-2 sm:py-3"
        >
          {/* Left Logo */}
          <div onClick={() => navigate(ROUTES.ADMIN_DASHBOARD)} className="flex flex-col items-center cursor-pointer">
            <h1 className="text-2xl lg:text-3xl font-medium flex items-center justify-center">
              <span className="text-one font-playfair">NE</span>
              <span className="text-five text-5xl pt-1">
                <svg
                  width="40"
                  height="34"
                  viewBox="0 0 40 34"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M31.5408 0.000221879L39.5234 0.00080831L34.5562 2.77579C33.3436 3.45323 32.2854 4.37587 31.4491 5.4849L12.364 30.7934C11.2302 32.2968 9.45642 33.1808 7.57341 33.1808H-0.000190735L5.03663 30.275C6.22264 29.5907 7.25551 28.6702 8.07121 27.5704L26.7213 2.42583C27.8531 0.899828 29.6409 8.23028e-05 31.5408 0.000221879Z"
                    fill="#FF6A00"
                  />
                  <path
                    d="M7.98262 0.000221879L0 0.00080831L4.96721 2.77579C6.17983 3.45323 7.23802 4.37587 8.07433 5.4849L27.1595 30.7934C28.2932 32.2968 30.067 33.1808 31.95 33.1808H39.5236L34.4868 30.275C33.3008 29.5907 32.2679 28.6702 31.4522 27.5704L12.8022 2.42583C11.6703 0.899828 9.88257 8.23028e-05 7.98262 0.000221879Z"
                    fill="#FF6A00"
                  />
                </svg>
              </span>
              <span className="text-one font-playfair">US</span>
            </h1>
            <span className="text-[6.5px] text-white">CORPORATE TRAINING CENTER LLP</span>
          </div>

          {/* Right Icons */}
          <div
            className="right_div flex items-center 
                    gap-3 sm:gap-4 lg:gap-5"
          >
            {/* Notification Icon */}
            <div onClick={() => navigate(ROUTES.ADMIN_NOTIFICATION)}
              className="w-8 h-8 sm:w-9 sm:h-9 lg:w-10 lg:h-10 
                      bg-five rounded-full cursor-pointer
                      flex justify-center items-center 
                      text-xl sm:text-2xl lg:text-3xl"
            >
              <RiNotification4Fill className="text-one w-7 h-7 sm:w-8 sm:h-8 lg:w-6 lg:h-6  " />
            </div>

            {/* User Image */}
            <div>
              <img
                onClick={() => navigate(ROUTES.ADMIN_PROFILE)}
                src={profile}
                className="w-8 h-8 sm:w-9 sm:h-9 lg:w-10 lg:h-10 rounded-full border-2 border-orange-500 object-cover cursor-pointer"
              />
            </div>
          </div>
        </nav>
      </div>
    </div>
  );
};

export default AdminNavbar;
