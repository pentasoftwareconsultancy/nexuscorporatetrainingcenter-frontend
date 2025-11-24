import React, { useState } from "react";
import { ROUTES } from "../../core/constants/routes.constant";
import { NavLink } from "react-router-dom";
import {
  LogOut,
  LayoutDashboard,
  BookOpen,
  Images,
  Briefcase,
} from "lucide-react";

const NAV_LINKS = [
  {
    label: "Dashboard",
    icon: <LayoutDashboard />,
    href: ROUTES.ADMIN_DASHBOARD,
  },
  { label: "Courses", icon: <BookOpen />, href: ROUTES.ADMIN_COURSES },
  { label: "Gallery", icon: <Images />, href: ROUTES.ADMIN_GALLERY_EVENT },
  {
    label: "Placements",
    icon: <Briefcase />,
    href: ROUTES.ADMIN_TOTAL_PLACEMENTS,
  },
];

function AdminSidebar({ isOpen, setIsOpen }) {
  const [activeTab, setActiveTab] = useState("Dashboard");
  // const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="text-one ">
      <aside
        onMouseEnter={() => setIsOpen(true)}
        onMouseLeave={() => setIsOpen(false)}
        className={`
        fixed left-0 top-16 h-screen
        bg-[#3B3938] border-r rounded-md border-t border-white shadow-xl
        flex flex-col justify-between
        transition-all duration-300 z-50
        ${isOpen ? "w-52" : "w-16"}
        `}
      >
        {/* === NAVIGATION === */}
        <nav className="flex flex-col mt-10 space-y-3">
          {NAV_LINKS.map((item) => (
            <NavLink
              key={item.label}
              to={item.href}
              onClick={() => setActiveTab(item.label)}
              className={({ isActive }) => `
        flex items-center transition-all duration-200 rounded-lg py-2
        ${isOpen ? "px-3 gap-4" : "justify-center"} 
        ${
          isActive || activeTab === item.label
            ? "bg-[#FFF6EF] text-black border border-[#e8d7c9]"
            : "text-one hover:bg-[#3a3838]"
        }
      `}
            >
              <span className="flex justify-center items-center w-6 h-6">
                {React.cloneElement(item.icon, {
                  size: 20,
                  className:
                    activeTab === item.label ? "text-black" : "text-white",
                })}
              </span>

              {isOpen && (
                <span className="text-sm font-medium whitespace-nowrap">
                  {item.label}
                </span>
              )}
            </NavLink>
          ))}
        </nav>

        {/* === LOGOUT === */}
        <div className="pb-20">
          <button
            className={`
            flex items-center 
            transition-all duration-300
            ${
              isOpen
                ? "px-4 py-2 w-44 mx-auto bg-[#FFF6EF] border border-[#e8d7c9] rounded-full justify-between"
                : "w-full justify-center"
            }
            `}
          >
            {/* COLLAPSED → CENTERED ORANGE BUBBLE */}
            {!isOpen && (
              <span className="flex justify-center items-center w-10 h-10 bg-five rounded-full">
                <LogOut size={18} className="text-one" />
              </span>
            )}

            {/* EXPANDED → TEXT + ORANGE BUBBLE */}
            {isOpen && (
              <>
                <span className="text-sm font-medium text-black">Log out</span>
                <span className="flex justify-center items-center w-8 h-8 bg-five rounded-full shadow-md">
                  <LogOut size={16} className="text-one" />
                </span>
              </>
            )}
          </button>
        </div>
      </aside>
    </div>
  );
}

export default AdminSidebar;
