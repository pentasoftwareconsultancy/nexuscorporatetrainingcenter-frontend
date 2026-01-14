import React, { useEffect, useState } from "react";
import ApiService from "../../core/services/api.service";
import ServerUrl from "../../core/constants/serverURL.constant";
import toast from "react-hot-toast";

const AdminNotificationPage = () => {
  const api = new ApiService();

  const [notifications, setNotifications] = useState([]);
  const [selected, setSelected] = useState(null);
  const [showModal, setShowModal] = useState(false);

  // truncate message to 30 words
  const truncateMessage = (text) => {
    if (!text) return "";
    const words = text.split(" ");
    return words.length > 30 ? words.slice(0, 30).join(" ") + "..." : text;
  };

  const fetchNotifications = async () => {
    try {
      const response = await api.apiget(ServerUrl.API_GET_CONTACT_FORMS);
      setNotifications(response?.data || []);
      // console.log("Notifications fetched:", response.data);
    } catch (error) {
      console.error("Error fetching notifications:", error);
    }
  };

  const deleteNotification = async (id) => {
    try {
      await api.apidelete(`${ServerUrl.API_DELETE_CONTACT_FORM}${id}`);
      setShowModal(false);
      setNotifications(notifications.filter((n) => n.id !== id));
      toast.success("Notification deleted");
    } catch (error) {
      console.error("Delete failed:", error);
      toast.error("Failed to delete notification");
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  return (
    <div className="text-white p-3 w-full">
      <div className="w-max-[2400px]">
        <h6 className="mb-3 text-5xl md:text-4xl text-center md:text-left pb-5">
          Notifications
        </h6>

        <p className="mb-1 font-bold text-lg md:text-base text-center md:text-left">
          User Contact Notifications
        </p>

        {/* Notifications List */}
        {/* HEADER */}
        <div className="mt-6 hidden md:grid grid-cols-4 gap-2 font-bold">
          <h2>Name</h2>
          <h2>Email</h2>
          <h2>Phone</h2>
          <h2>Message</h2>
        </div>

        {/* LIST */}
        <div className="flex flex-col gap-4 mt-4">
          {notifications.map((item, idx) => (
            <div
              key={idx}
              onClick={() => {
                setSelected(item);
                setShowModal(true);
              }}
              className="border border-white rounded-xl p-4 hover:bg-[#222] transition
                grid grid-cols-1 md:grid-cols-4 gap-2 md:gap-4 items-center cursor-pointer"
            >
              {/* Name */}
              <div className="text-white truncate">{item.name}</div>

              {/* Email */}
              <div className="text-gray-300 truncate">{item.email}</div>

              {/* Phone */}
              <div className="text-gray-400 truncate">{item.phone}</div>

              {/* Message */}
              <div className="text-gray-400 truncate">
                {truncateMessage(item.message)}
              </div>
            </div>
          ))}

          {notifications.length === 0 && (
            <p className="text-center text-gray-400 mt-4">
              No notifications found
            </p>
          )}
        </div>
      </div>

      {/* ================= Modal ================= */}
      {showModal && selected && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center">
          <div className="bg-[#1f1f1f] p-6 rounded-xl w-[95%] max-w-lg">
            <h2 className="text-2xl font-bold mb-3">User Message</h2>

            <p>
              <span className="font-bold">Name:</span> {selected.name}
            </p>
            <p>
              <span className="font-bold">Email:</span> {selected.email}
            </p>
            <p>
              <span className="font-bold">Phone:</span> {selected.phone}
            </p>

            <p className="mt-4">
              <span className="font-bold">Message:</span>
              <br />
              {selected.message}
            </p>

            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 bg-gray-500 rounded-md"
              >
                Close
              </button>

              <button
                onClick={() => deleteNotification(selected.id)}
                className="px-4 py-2 bg-red-600 rounded-md"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminNotificationPage;
