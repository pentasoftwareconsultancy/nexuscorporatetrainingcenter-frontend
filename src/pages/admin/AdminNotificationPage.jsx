import React from 'react'
import notifications from "../../assets/saniya/Adminnotification.json";


const AdminNotificationPage = () => {
   return (
    <div className="text-white p-3 md:p-8 w-full ">
      <div className='w-max-[2400px]'>

      <h6 className="mb-3 text-5xl md:text-4xl text-center md:text-left pb-5 ">
        Notifications
      </h6>

      <p className="mb-1 font-bold text-lg md:text-base text-center md:text-left">
        User & Enrollment Notifications
      </p>

      {notifications.userEnrollmentNotifications.map((item, index) => (
        <div
          key={index}
          className="w-full border border-gray-300 rounded-md mb-4 bg-[#242424]"
        >
          <p className="p-3 text-lg md:text-base text-center md:text-left">
            {item}
          </p>
        </div>
      ))}

      <p className="mb-1 font-bold text-lg md:text-base text-center md:text-left mt-6">
        System & Technical Alerts
      </p>

      {notifications.systemTechnicalAlerts.map((item, index) => (
        <div
          key={index}
          className="w-full border border-gray-300 rounded-md mb-4 bg-[#242424]"
        >
          <p className="p-3 text-sm md:text-base text-center md:text-left">
            {item}
          </p>
        </div>
      ))}
      </div>
    </div>
  );
};

export default AdminNotificationPage