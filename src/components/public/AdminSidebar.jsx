import React, { useState } from "react";
import {
  LogOut,
  LayoutDashboard,
  BookOpen,
  Images,
  Briefcase,
} from "lucide-react";

const NAV_LINKS = [
  { label: "Dashboard", icon: <LayoutDashboard />, href: "#" },
  { label: "Courses", icon: <BookOpen />, href: "#courses" },
  { label: "Gallery", icon: <Images />, href: "#gallery" },
  { label: "Placements", icon: <Briefcase />, href: "#placements" },
];

function AdminSidebar() {
  const [activeTab, setActiveTab] = useState("Dashboard");
  const [isOpen, setIsOpen] = useState(false);

  return (
    <aside
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
      className={`
                fixed left-0 top-0 h-screen
                bg-[#3B3938] border-r border-gray-700 shadow-xl
                flex flex-col justify-between
                transition-all duration-300 z-50
                ${isOpen ? "w-52" : "w-16"}
            `}
    >
      {/* === NAVIGATION === */}
      <nav className="flex flex-col mt-10 space-y-3">
        {NAV_LINKS.map((item) => (
          <button
            key={item.label}
            onClick={() => setActiveTab(item.label)}
            className={`
                            flex items-center
                            transition-all duration-200
                            rounded-lg py-2
                            ${isOpen ? "px-3 gap-4" : "justify-center"} 
                            ${
                              activeTab === item.label
                                ? "bg-[#FFF6EF] text-black border border-[#e8d7c9]"
                                : "text-white/90 hover:bg-[#3a3838]"
                            }
                        `}
          >
            {/* ICON CENTERED WHEN COLLAPSED */}
            <span className="flex justify-center items-center w-6 h-6">
              {React.cloneElement(item.icon, {
                size: 20,
                className:
                  activeTab === item.label ? "text-black" : "text-white",
              })}
            </span>

            {/* SHOW LABEL ONLY WHEN OPEN */}
            {isOpen && (
              <span className="text-sm font-medium whitespace-nowrap">
                {item.label}
              </span>
            )}
          </button>
        ))}
      </nav>

      {/* === LOGOUT === */}
      <div className="pb-6">
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
            <span className="flex justify-center items-center w-10 h-10 bg-orange-500 rounded-full">
              <LogOut size={18} className="text-white" />
            </span>
          )}

          {/* EXPANDED → TEXT + ORANGE BUBBLE */}
          {isOpen && (
            <>
              <span className="text-sm font-medium text-black">Log out</span>
              <span className="flex justify-center items-center w-8 h-8 bg-orange-500 rounded-full shadow-md">
                <LogOut size={16} className="text-white" />
              </span>
            </>
          )}
        </button>
      </div>
    </aside>
  );
}

export default AdminSidebar;
