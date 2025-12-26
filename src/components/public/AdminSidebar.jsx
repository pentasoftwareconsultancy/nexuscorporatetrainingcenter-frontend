// import React, { useState, useEffect } from "react";
// import { ROUTES } from "../../core/constants/routes.constant";
// import { NavLink, useNavigate } from "react-router-dom";
// import {
//   LogOut,
//   LayoutDashboard,
//   BookOpen,
//   Images,
//   Briefcase,
//   Menu,
//   X,
// } from "lucide-react";

// const NAV_LINKS = [
//   { label: "Dashboard", icon: <LayoutDashboard />, href: ROUTES.ADMIN_DASHBOARD },
//   { label: "Courses", icon: <BookOpen />, href: ROUTES.ADMIN_COURSES },
//   { label: "Gallery", icon: <Images />, href: ROUTES.ADMIN_GALLERY_EVENT },
//   { label: "Placements", icon: <Briefcase />, href: ROUTES.ADMIN_TOTAL_PLACEMENTS },
// ];

// function AdminSidebar({ isOpen, setIsOpen }) {
//   const [activeTab, setActiveTab] = useState("Dashboard");
//   const navigate = useNavigate();
//   const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

//   // Detect viewport size
//   useEffect(() => {
//     const handleResize = () => setIsMobile(window.innerWidth < 768);
//     window.addEventListener("resize", handleResize);
//     return () => window.removeEventListener("resize", handleResize);
//   }, []);

//   return (
//     <>
//       {/* === MOBILE HAMBURGER BUTTON === */}
//       {isMobile && !isOpen && (
//         <button
//           onClick={() => setIsOpen(true)}
//           className="fixed top-[84px] left-4 z-[60] bg-[#3B3938] border border-white text-white p-2 rounded-md"
//         >
//           <Menu size={20} />
//         </button>
//       )}

//       {/* === MOBILE BACKDROP === */}
//       {isMobile && isOpen && (
//         <div
//           className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
//           onClick={() => setIsOpen(false)}
//         />
//       )}

//       {/* === SIDEBAR === */}
//       <aside
//         onMouseEnter={() => !isMobile && setIsOpen(true)}
//         onMouseLeave={() => !isMobile && setIsOpen(false)}
//         className={`
//           fixed ${isMobile ? "top-0" : "top-16"} left-0
//           ${isMobile ? "h-full" : "h-screen"}
//           bg-[#3B3938] border-r border-t border-white rounded-md shadow-xl
//           flex flex-col justify-between transition-all duration-300 z-50

//           ${
//             isMobile
//               ? isOpen
//                 ? "w-52 translate-x-0"
//                 : "-translate-x-full"
//               : isOpen
//               ? "w-52 overflow-y-auto"
//               : "w-16 overflow-y-auto"
//           }
//         `}
//       >
//         {/* === CLOSE BUTTON (MOBILE) ===
//         {isMobile && (
//           <button
//             onClick={() => setIsOpen(false)}
//             className="absolute top-4 right-4 text-white border border-white rounded-md p-[3px] z-[70]"
//           >
//             <X size={16} />
//           </button>
//         )} */}

//         {/* === NAVIGATION === */}
//         <nav className="flex flex-col mt-10 px-1 space-y-3">
//           {NAV_LINKS.map((item) => (
//             <NavLink
//               key={item.label}
//               to={item.href}
//               onClick={() => {
//                 setActiveTab(item.label);
//                 isMobile && setIsOpen(false);
//               }}
//               className={({ isActive }) => `
//                 flex items-center rounded-lg py-2 transition-all duration-200
//                 ${isOpen ? "px-3 gap-3" : "justify-center"}
//                 ${
//                   isActive || activeTab === item.label
//                     ? "bg-[#FFF6EF] text-black border border-[#e8d7c9]"
//                     : "text-white hover:bg-[#3a3838]"
//                 }
//               `}
//             >
//               <span className="flex justify-center items-center w-6 h-6">
//                 {React.cloneElement(item.icon, {
//                   size: 20,
//                   className: activeTab === item.label ? "text-black" : "text-white",
//                 })}
//               </span>

//               {isOpen && (
//                 <span className={`${isMobile ? "text-xs" : "text-sm"} font-medium`}>
//                   {item.label}
//                 </span>
//               )}
//             </NavLink>
//           ))}
//         </nav>

//         {/* === LOGOUT BUTTON === */}
//         <div className={`${isMobile ? "pb-6" : "pb-20"}`}>
//           <button
//             onClick={() => {
//               localStorage.clear();
//               sessionStorage.clear();
//               navigate("/");
//             }}
//             className={`
//               flex items-center transition-all duration-300 cursor-pointer
//               ${isOpen
//                 ? "px-4 py-2 w-[85%] mx-auto bg-[#FFF6EF] border border-[#e8d7c9] rounded-full justify-between"
//                 : "w-full justify-center"}
//             `}
//           >
//             {!isOpen && (
//               <span className="flex justify-center items-center w-10 h-10 bg-five rounded-full">
//                 <LogOut size={18} className="text-one" />
//               </span>
//             )}

//             {isOpen && (
//               <>
//                 <span className="text-xs sm:text-sm font-medium text-black">Log out</span>
//                 <span className="flex justify-center items-center w-8 h-8 bg-five rounded-full shadow-md">
//                   <LogOut size={16} className="text-one" />
//                 </span>
//               </>
//             )}
//           </button>
//         </div>
//       </aside>
//     </>
//   );
// }

// export default AdminSidebar;








// import React, { useState, useEffect } from "react";
// import { ROUTES } from "../../core/constants/routes.constant";
// import { NavLink, useNavigate } from "react-router-dom";
// import {
//   LogOut,
//   LayoutDashboard,
//   BookOpen,
//   Images,
//   Briefcase,
//   Menu,
// } from "lucide-react";

// const NAV_LINKS = [
//   {
//     label: "Dashboard",
//     icon: <LayoutDashboard />,
//     href: ROUTES.ADMIN_DASHBOARD,
//   },
//   { label: "Courses", icon: <BookOpen />, href: ROUTES.ADMIN_COURSES },
//   { label: "Gallery", icon: <Images />, href: ROUTES.ADMIN_GALLERY_EVENT },
//   {
//     label: "Placements",
//     icon: <Briefcase />,
//     href: ROUTES.ADMIN_TOTAL_PLACEMENTS,
//   },
// ];

// function AdminSidebar({ isOpen, setIsOpen }) {
//   const [activeTab, setActiveTab] = useState("Dashboard");
//   const navigate = useNavigate();
//   const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

//   // Detect screen width
//   useEffect(() => {
//     const handleResize = () => setIsMobile(window.innerWidth < 768);
//     window.addEventListener("resize", handleResize);
//     return () => window.removeEventListener("resize", handleResize);
//   }, []);

//   return (
//     <>
//       {/* MOBILE MENU BUTTON */}
//       {isMobile && !isOpen && (
//         <button
//           onClick={() => setIsOpen(true)}
//           className="fixed top-[84px] left-4 z-[60] bg-[#3B3938] border border-white text-white p-2 rounded-md"
//         >
//           <Menu size={20} />
//         </button>
//       )}

//       {/* BACKDROP */}
//       {isMobile && isOpen && (
//         <div
//           className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
//           onClick={() => setIsOpen(false)}
//         />
//       )}

//       {/* SIDEBAR */}
//       <aside
//         className={`
//           fixed ${isMobile ? "top-0" : "top-16"} left-0
//           ${isMobile ? "h-full" : "h-[calc(100vh-64px)]"}
//           bg-[#3B3938] border-r border-t border-white rounded-md shadow-xl
//           flex flex-col justify-between
//           z-50 transition-all duration-300

//           ${
//             isMobile
//               ? isOpen
//                 ? "w-52 translate-x-0"
//                 : "-translate-x-full"
//               : isOpen
//               ? "w-52"
//               : "w-16"
//           }

//           overflow-hidden
//         `}
//         onMouseEnter={() => !isMobile && setIsOpen(true)}
//         onMouseLeave={() => !isMobile && setIsOpen(false)}
//       >
//         {/* NAVIGATION */}
//         <nav className="flex flex-col mt-10 px-1 space-y-3 select-none">
//           {NAV_LINKS.map((item) => (
//             <NavLink
//               key={item.label}
//               to={item.href}
//               onClick={() => {
//                 setActiveTab(item.label);
//                 isMobile && setIsOpen(false);
//               }}
//               className={({ isActive }) => `
//                 flex items-center py-2 rounded-lg transition-all duration-200
//                 ${isOpen ? "px-3 gap-3" : "justify-center"}
//                 ${
//                   isActive || activeTab === item.label
//                     ? "bg-[#FFF6EF] text-black border border-[#e8d7c9]"
//                     : "text-white hover:bg-[#4a4747]"
//                 }
//               `}
//             >
//               <span className="flex justify-center items-center w-6 h-6">
//                 {React.cloneElement(item.icon, {
//                   size: 20,
//                   className:
//                     activeTab === item.label ? "text-black" : "text-white",
//                 })}
//               </span>

//               {isOpen && (
//                 <span className="text-sm font-medium whitespace-nowrap">
//                   {item.label}
//                 </span>
//               )}
//             </NavLink>
//           ))}
//         </nav>

//         {/* LOGOUT BUTTON */}
//         <div className={`${isMobile ? "pb-6" : "pb-10"}`}>
//           <button
//             onClick={() => {
//               localStorage.clear();
//               sessionStorage.clear();
//               navigate("/");
//             }}
//             className={`
//               flex items-center cursor-pointer transition-all duration-300
//               ${
//                 isOpen
//                   ? "px-4 py-2 w-[85%] mx-auto bg-[#FFF6EF] border border-[#e8d7c9] rounded-full justify-between"
//                   : "w-full justify-center py-3"
//               }
//             `}
//           >
//             {!isOpen && (
//               <span className="w-10 h-10 bg-five rounded-full flex justify-center items-center">
//                 <LogOut size={18} className="text-one" />
//               </span>
//             )}

//             {isOpen && (
//               <>
//                 <span className="text-sm font-medium text-black">Log out</span>
//                 <span className="w-8 h-8 bg-five rounded-full flex justify-center items-center shadow-md">
//                   <LogOut size={16} className="text-one" />
//                 </span>
//               </>
//             )}
//           </button>
//         </div>
//       </aside>
//     </>
//   );
// }

// export default AdminSidebar;



import React, { useState, useEffect } from "react";
import { ROUTES } from "../../core/constants/routes.constant";
import { NavLink, useNavigate } from "react-router-dom";
import {
  LogOut,
  LayoutDashboard,
  BookOpen,
  Images,
  Briefcase,
  Menu,
} from "lucide-react";

const NAV_LINKS = [
  {
    label: "Dashboard",
    icon: <LayoutDashboard />,
    href: ROUTES.ADMIN_DASHBOARD,
  },
  { label: "Courses", icon: <BookOpen />, href: ROUTES.ADMIN_COURSES },
  { label: "Gallery", icon: <Images />, href: ROUTES.ADMIN_GALLERY_FORM },
  {
    label: "Placements",
    icon: <Briefcase />,
    href: ROUTES.ADMIN_TOTAL_PLACEMENTS,
  },
];

function AdminSidebar({ isOpen, setIsOpen }) {
  const [activeTab, setActiveTab] = useState("Dashboard");
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      {/* MOBILE MENU BUTTON */}
      {isMobile && !isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed top-[84px] left-4 z-[60] bg-[#3B3938] text-white border border-white p-2 rounded-md"
        >
          <Menu size={20} />
        </button>
      )}

      {/* MOBILE BACKDROP */}
      {isMobile && isOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* SIDEBAR */}
      <aside
        onMouseEnter={() => !isMobile && setIsOpen(true)}
        onMouseLeave={() => !isMobile && setIsOpen(false)}
        className={`
          fixed ${isMobile ? "top-0" : "top-16"} left-0
          bg-[#3B3938] border-r border-t border-white rounded-md shadow-xl
          flex flex-col justify-between transition-all duration-300 z-50

          ${isMobile ? "h-full" : "h-[calc(100vh-64px)]"}
          ${
            isMobile
              ? isOpen
                ? "w-52 translate-x-0"
                : "-translate-x-full"
              : isOpen
              ? "w-52"
              : "w-16"
          }

          /* 🔥 NO SCROLL */
          overflow-hidden overscroll-none touch-none
        `}
      >
        {/* NAV LINKS */}
        <nav className="flex flex-col px-1 space-y-3 mt-6 flex-grow overflow-hidden">
          {NAV_LINKS.map((item) => (
            <NavLink
              key={item.label}
              to={item.href}
              onClick={() => {
                setActiveTab(item.label);
                isMobile && setIsOpen(false);
              }}
              className={({ isActive }) => `
                flex items-center py-2 rounded-lg transition-all duration-200
                ${isOpen ? "px-3 gap-3" : "justify-center"}
                ${
                  isActive || activeTab === item.label
                    ? "bg-[#FFF6EF] text-black border border-[#e8d7c9]"
                    : "text-white hover:bg-[#4a4747]"
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

        {/* LOGOUT BUTTON */}
        <div className={`${isMobile ? "pb-4" : "pb-6"} shrink-0`}>
          <button
            onClick={() => {
              localStorage.clear();
              sessionStorage.clear();
              navigate("/");
              window.location.reload();
            }}
            className={`
              flex items-center cursor-pointer transition-all duration-300
              ${
                isOpen
                  ? "px-4 py-2 w-[85%] mx-auto bg-[#FFF6EF] border border-[#e8d7c9] rounded-full justify-between"
                  : "w-full justify-center py-3"
              }
            `}
          >
            {!isOpen && (
              <span className="w-10 h-10 bg-five rounded-full flex justify-center items-center">
                <LogOut size={18} className="text-one" />
              </span>
            )}

            {isOpen && (
              <>
                <span className="text-sm font-medium text-black">Log out</span>
                <span className="w-8 h-8 bg-five rounded-full flex justify-center items-center shadow-md">
                  <LogOut size={16} className="text-one" />
                </span>
              </>
            )}
          </button>
        </div>
      </aside>
    </>
  );
}

export default AdminSidebar;

