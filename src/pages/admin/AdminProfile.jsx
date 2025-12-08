import React from 'react'
import { FaRegCircleUser } from "react-icons/fa6";
import { MdPassword } from "react-icons/md";
import { FaPhoneAlt } from "react-icons/fa";
import { MdOutlineMail } from "react-icons/md";

import adminData from "../../assets/saniya/AdminProfile.json";

const AdminProfile = () => {

  return (
    <div className="text-white p-6 md:p-10">
      <h5 className="text-3xl mb-6 text-center md:text-left">Profile</h5>

      <div className="flex flex-col md:flex-row gap-10 md:gap-20">
        <div className="flex justify-center md:justify-start shrink-0 min-w-[80px]">
          <img
            src={adminData.image}
            alt="Profile"
            className="w-20 h-20 rounded-full"
          />
        </div>

        <div className="flex flex-col gap-8 w-full">
          <div className="flex flex-col md:flex-row gap-6 md:gap-10">
            <div className="flex flex-col w-full md:w-70">
              <div className="flex gap-2 items-center">
                <FaRegCircleUser />
                <label>Admin Username</label>
              </div>
              <input
                type="text"
                defaultValue={adminData.username}
                className="border rounded-md bg-[#242424] mt-2 p-2 w-full"
              />
            </div>

            <div className="flex flex-col w-full md:w-70">
              <div className="flex gap-2 items-center">
                <MdPassword />
                <label>Password</label>
              </div>
              <input
                type="text"
                defaultValue={adminData.password}
                className="border rounded-md bg-[#242424] mt-2 p-2 w-full"
              />
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-6 md:gap-10">
            <div className="flex flex-col w-full md:w-70">
              <div className="flex gap-2 items-center">
                <FaPhoneAlt />
                <label>Phone Number</label>
              </div>
              <input
                type="text"
                defaultValue={adminData.phone}
                className="border rounded-md bg-[#242424] mt-2 p-2 w-full"
              />
            </div>

            <div className="flex flex-col w-full md:w-70">
              <div className="flex gap-2 items-center">
                <MdOutlineMail />
                <label>Email</label>
              </div>
              <input
                type="text"
                defaultValue={adminData.email}
                className="border rounded-md bg-[#242424] mt-2 p-2 w-full"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default AdminProfile