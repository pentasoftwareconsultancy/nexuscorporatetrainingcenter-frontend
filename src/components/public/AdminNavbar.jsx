import React from 'react'
import { RiNotification4Fill } from "react-icons/ri";



const AdminNavbar = () => {
  return (
    <div className='w-full'>
      <div className='max-w-[2400px]'>
        <nav className="flex justify-between items-center 
                  px-4 sm:px-8 lg:px-10 
                  py-2 sm:py-3">

          {/* Left Logo */}
          <div className="leftdiv 
                    w-28 sm:w-36 lg:w-40">
            <img
              src="/images/NEXUS.png"
              alt="logo"
              className="h-7 sm:h-8 lg:h-9 w-auto"
            />
          </div>

          {/* Right Icons */}
          <div className="right_div flex items-center 
                    gap-3 sm:gap-4 lg:gap-5">

            {/* Notification Icon */}
            <div className="w-8 h-8 sm:w-9 sm:h-9 lg:w-10 lg:h-10 
                      bg-orange-500 rounded-full 
                      flex justify-center items-center 
                      text-xl sm:text-2xl lg:text-3xl">
              <RiNotification4Fill className='text-white w-7 h-7 sm:w-8 sm:h-8 lg:w-6 lg:h-6  ' />


            </div>

            {/* User Image */}
            <div>
              <img
                src="/images/image 1.png"
                className="w-8 h-8 sm:w-9 sm:h-9 lg:w-10 lg:h-10 rounded-full"
              />
            </div>

          </div>

        </nav>
      </div>
    </div>
  )
}

export default AdminNavbar