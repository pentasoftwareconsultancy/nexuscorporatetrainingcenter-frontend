import React, { useEffect, useState } from "react";
import ApiService from "../../core/services/api.service.jsx";
import Profile from "../../assets/adminProfile/profile.png";
import { FaRegCircleUser } from "react-icons/fa6";
import { FaPhoneAlt } from "react-icons/fa";
import { MdOutlineMail } from "react-icons/md";
import ServerUrl from "../../core/constants/serverURL.constant.jsx";

const AdminProfile = () => {
  const api = new ApiService();
  const [admin, setAdmin] = useState({
    username: "",
    email: "",
    phone: "",
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAdmin = async () => {
      try {
        const res = await api.apiget(`${ServerUrl.API_GET_ME}`);
        console.log("Admin Profile Data:", res.data);

        const user = res?.data?.user;

        setAdmin({
          username: user?.userName || "",
          email: user?.emailOrPhone || "",
          phone: user?.phoneNumber || "",
        });

        setLoading(false);
      } catch (err) {
        console.error("Profile Fetch Failed:", err);
        setLoading(false);
      }
    };

    fetchAdmin();
  }, []);

  if (loading) return <p className="text-white p-6">Loading...</p>;

  return (
    <div className="text-white p-6 md:p-10">
      <h5 className="text-3xl mb-6 text-center md:text-left">Profile</h5>

      <div className="flex flex-col md:flex-row gap-10 md:gap-20">
        {/* Dummy Image */}
        <div className="flex justify-center md:justify-start shrink-0 min-w-[80px]">
          <img
            src={Profile}
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
                value={admin.username}
                disabled
                className="border rounded-md bg-[#242424] mt-2 p-2 w-full"
              />
            </div>

            <div className="flex flex-col w-full md:w-70">
              <div className="flex gap-2 items-center">
                <FaPhoneAlt />
                <label>Phone Number</label>
              </div>
              <input
                type="text"
                value={admin.phone}
                disabled
                className="border rounded-md bg-[#242424] mt-2 p-2 w-full"
              />
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-6 md:gap-10">
            <div className="flex flex-col w-full md:w-70">
              <div className="flex gap-2 items-center">
                <MdOutlineMail />
                <label>Email</label>
              </div>
              <input
                type="text"
                value={admin.email}
                disabled
                className="border rounded-md bg-[#242424] mt-2 p-2 w-full"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminProfile;
