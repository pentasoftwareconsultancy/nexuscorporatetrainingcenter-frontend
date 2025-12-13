// import React, { useState } from "react";
// import { Search, Bell, Menu, X } from "lucide-react";

// export default function NewRegisterDashboard() {
//   const categories = [
//     "Full Stack Python",
//     "Full Stack Developer",
//     "Dev Ops",
//     "AWS Solution Architect",
//     "Power BI / Data analyst",
//     "Data Science",
//     "Big Data",
//     "Data Engineer",
//     "Google Cloud",
//     "Azure 104 admin",
//     "Dev- 320",
//     "Software Testing/ QA",
//     "Manual testing",
//     "Auto testing",
//     "Database testing",
//     "Mobile testing",
//     "ETC training",
//     "Ethical hacking",
//     "Graphic Design",
//   ];

//   const initialUsers = new Array(15).fill({
//     name: "Vaishnavi Gopale",
//     email: "vaishnavigopale22@gmail.com",
//     course: "Full Stack Python",
//     duration: "6 months",
//   });

//   const [allUsers] = useState(initialUsers);
//   const [selectedCategory, setSelectedCategory] = useState("");
//   const [selectedFilter, setSelectedFilter] = useState("Enquiry");
//   const [searchQuery, setSearchQuery] = useState("");
//   const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

//   const filteredUsers = allUsers.filter((u) => {
//     const matchCategory =
//       selectedCategory === "" || u.course === selectedCategory;

//     const matchSearch =
//       u.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
//       u.email.toLowerCase().includes(searchQuery.toLowerCase());

//     return matchCategory && matchSearch;
//   });

//   return (
//     <div className="relative min-h-screen flex text-one font-sora overflow-hidden">

//       {/* MOBILE TOP BAR */}
//       <div className="lg:hidden fixed top-0 left-0 w-full flex justify-between items-center px-4 py-4 z-20 border-b border-gray-700">
//         <Menu
//           onClick={() => setMobileMenuOpen(true)}
//           className="text-white"
//           size={28}
//         />
//         <h2 className="text-lg font-semibold">New Registration Users</h2>
//         <Bell className="text-white" size={24} />
//       </div>

//       {/* MOBILE SLIDE SIDEBAR */}
//       {mobileMenuOpen && (
//         <div className="fixed inset-0 bg-black/60 z-30 lg:hidden">
//           <div className="bg-[#111] w-72 h-full p-6 overflow-y-auto">
//             <div className="flex justify-between items-center mb-6">
//               <h2 className="text-xl font-semibold">Categories</h2>
//               <X
//                 size={28}
//                 onClick={() => setMobileMenuOpen(false)}
//                 className="cursor-pointer"
//               />
//             </div>

//             <div className="flex flex-col gap-3">
//               {categories.map((item) => (
//                 <button
//                   key={item}
//                   onClick={() => {
//                     setSelectedCategory(item);
//                     setMobileMenuOpen(false);
//                   }}
//                   className={`border px-3 py-2 rounded-full text-sm transition 
//                     ${
//                       selectedCategory === item
//                         ? "bg-orange-500 border-orange-500 text-black"
//                         : "border-white hover:bg-gray-800 text-white"
//                     }`}
//                 >
//                   {item}
//                 </button>
//               ))}
//             </div>
//           </div>
//         </div>
//       )}

//       {/* DESKTOP SIDEBAR */}
//       <div className="hidden lg:flex p-6 overflow-y-auto w-72 border-r border-gray-700">
//         <div className="flex flex-col gap-3 w-full">
//           {categories.map((item) => (
//             <button
//               key={item}
//               onClick={() => setSelectedCategory(item)}
//               className={`border px-3 py-2 rounded-full text-sm transition 
//                 ${
//                   selectedCategory === item
//                     ? "bg-orange-500 border-orange-500 text-black"
//                     : "border-white hover:bg-gray-800"
//                 }`}
//             >
//               {item}
//             </button>
//           ))}
//         </div>
//       </div>

//       {/* MAIN CONTENT */}
//       <main className="flex-1 p-4 pt-20 lg:pt-10 lg:p-10 w-full overflow-y-auto">

//         <h2 className="text-xl md:text-2xl font-semibold pb-5">
//           New Registration Users ({allUsers.length})
//         </h2>

//         {/* FILTER BUTTONS */}
//         <div className="flex gap-3 overflow-x-auto pb-2">
//           {["Enquiry", "Class Visit", "Direct Admissions"].map((item) => (
//             <button
//               key={item}
//               onClick={() => setSelectedFilter(item)}
//               className={`px-5 py-2 whitespace-nowrap rounded-full transition border 
//                 ${
//                   selectedFilter === item
//                     ? "border-orange-400 text-white"
//                     : "border-white hover:bg-gray-800"
//                 }`}
//             >
//               {item}
//             </button>
//           ))}
//         </div>

//         {/* SEARCH BAR */}
//         <div className="mt-6 relative">
//           <Search className="absolute left-4 top-3 text-gray-400" size={20} />
//           <input
//             type="text"
//             placeholder="Search by name, email"
//             value={searchQuery}
//             onChange={(e) => setSearchQuery(e.target.value)}
//             className="w-full border border-white rounded-full py-3 pl-12 pr-5 outline-none focus:ring-2 focus:ring-orange-400 transition"
//           />
//         </div>

//         {/* DESKTOP HEADINGS */}
//         <div className="hidden md:grid mt-6 grid-cols-4 gap-4 border-b border-gray-600 pb-3">
//           <h2 className="font-bold">Name</h2>
//           <h2 className="font-bold">Email</h2>
//           <h2 className="font-bold">Course</h2>
//           <h2 className="font-bold">Duration</h2>
//         </div>

//         {/* USER LIST */}
//         <div className="flex flex-col gap-4 mt-4">

//           {filteredUsers.map((u, index) => (
//             <div
//               key={index}
//               className="border border-white rounded-xl p-4 hover:bg-[#222] transition 
//                 grid grid-cols-1 md:grid-cols-4 gap-2"
//             >
//               {/* MOBILE CARD VIEW */}
//               <div className="md:hidden">
//                 <p><span className="font-semibold">Name: </span>{u.name}</p>
//                 <p><span className="font-semibold">Email: </span>{u.email}</p>
//                 <p><span className="font-semibold">Course: </span>{u.course}</p>
//                 <p><span className="font-semibold">Duration: </span>{u.duration}</p>
//               </div>

//               {/* DESKTOP GRID VIEW */}
//               <p className="hidden md:block truncate">{u.name}</p>
//               <p className="hidden md:block truncate">{u.email}</p>
//               <p className="hidden md:block truncate">{u.course}</p>
//               <p className="hidden md:block truncate">{u.duration}</p>
//             </div>
//           ))}

//           {filteredUsers.length === 0 && (
//             <p className="text-center text-gray-400 mt-4">No users found</p>
//           )}
//         </div>
//       </main>
//     </div>
//   );
// }

import React, { useState } from "react";
import { Search, Bell, Menu, X } from "lucide-react";

export default function NewRegisterDashboard() {
  const categories = [
    "Full Stack Python",
    "Full Stack Developer",
    "Dev Ops",
    "AWS Solution Architect",
    "Power BI / Data analyst",
    "Data Science",
    "Big Data",
    "Data Engineer",
    "Google Cloud",
    "Azure 104 admin",
    "Dev- 320",
    "Software Testing/ QA",
    "Manual testing",
    "Auto testing",
    "Database testing",
    "Mobile testing",
    "ETC training",
    "Ethical hacking",
    "Graphic Design",
  ];

  const initialUsers = new Array(15).fill({
    name: "Vaishnavi Gopale",
    email: "vaishnavigopale22@gmail.com",
    course: "Full Stack Python",
    duration: "6 months",
  });

  const [allUsers] = useState(initialUsers);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("Enquiry");
  const [searchQuery, setSearchQuery] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const filteredUsers = allUsers.filter((u) => {
    const matchCategory =
      selectedCategory === "" || u.course === selectedCategory;

    const matchSearch =
      u.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.email.toLowerCase().includes(searchQuery.toLowerCase());

    return matchCategory && matchSearch;
  });

  return (
    <div className="relative min-h-screen flex text-one font-sora overflow-hidden">

      {/* MOBILE TOP BAR */}
      <div className="lg:hidden fixed top-0 left-0 w-full flex justify-between items-center px-4 py-4 z-20 border-b border-gray-700">
        <Menu
          onClick={() => setMobileMenuOpen(true)}
          className="text-white"
          size={28}
        />
        <h2 className="text-lg font-semibold">New Registration Users</h2>
        <Bell className="text-white" size={24} />
      </div>

      {/* MOBILE SLIDE SIDEBAR */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 bg-black/60 z-30 lg:hidden">
          <div className="bg-[#111] w-72 h-full p-6 overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold">Categories</h2>
              <X
                size={28}
                onClick={() => setMobileMenuOpen(false)}
                className="cursor-pointer"
              />
            </div>

            <div className="flex flex-col gap-3">
              {categories.map((item) => (
                <button
                  key={item}
                  onClick={() => {
                    setSelectedCategory(item);
                    setMobileMenuOpen(false);
                  }}
                  className={`border px-3 py-2 rounded-full text-sm transition 
                    ${
                      selectedCategory === item
                        ? "bg-orange-500 border-orange-500 text-black"
                        : "border-white hover:bg-gray-800 text-white"
                    }`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* DESKTOP SIDEBAR */}
      <div className="hidden lg:flex p-6 overflow-y-auto w-72 border-r border-gray-700">
        <div className="flex flex-col gap-3 w-full">
          {categories.map((item) => (
            <button
              key={item}
              onClick={() => setSelectedCategory(item)}
              className={`border px-3 py-2 rounded-full text-sm transition 
                ${
                  selectedCategory === item
                    ? "bg-orange-500 border-orange-500 text-black"
                    : "border-white hover:bg-gray-800"
                }`}
            >
              {item}
            </button>
          ))}
        </div>
      </div>

      {/* MAIN CONTENT */}
      <main className="flex-1 p-4 pt-20 lg:pt-10 lg:p-10 w-full overflow-y-auto">

        <h2 className="text-xl md:text-2xl font-semibold pb-5">
          New Registration Users ({allUsers.length})
        </h2>

        {/* SEARCH BAR */}
        <div className="mt-6 relative">
          <Search className="absolute left-4 top-3 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search by name, email"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full border border-white rounded-full py-3 pl-12 pr-5 outline-none focus:ring-2 focus:ring-orange-400 transition"
          />
        </div>

        {/* DESKTOP HEADINGS */}
        <div className="hidden md:grid mt-6 grid-cols-4 gap-4 border-b border-gray-600 pb-3">
          <h2 className="font-bold">Name</h2>
          <h2 className="font-bold">Email</h2>
          <h2 className="font-bold">Course</h2>
          <h2 className="font-bold">Duration</h2>
        </div>

        {/* USER LIST */}
        <div className="flex flex-col gap-4 mt-4">

          {filteredUsers.map((u, index) => (
            <div
              key={index}
              className="border border-white rounded-xl p-4 hover:bg-[#222] transition 
                grid grid-cols-1 md:grid-cols-4 gap-2"
            >
              {/* MOBILE CARD VIEW */}
              <div className="md:hidden">
                <p><span className="font-semibold">Name: </span>{u.name}</p>
                <p><span className="font-semibold">Email: </span>{u.email}</p>
                <p><span className="font-semibold">Course: </span>{u.course}</p>
                <p><span className="font-semibold">Duration: </span>{u.duration}</p>
              </div>

              {/* DESKTOP GRID VIEW */}
              <p className="hidden md:block truncate">{u.name}</p>
              <p className="hidden md:block truncate">{u.email}</p>
              <p className="hidden md:block truncate">{u.course}</p>
              <p className="hidden md:block truncate">{u.duration}</p>
            </div>
          ))}

          {filteredUsers.length === 0 && (
            <p className="text-center text-gray-400 mt-4">No users found</p>
          )}
        </div>
      </main>
    </div>
  );
}
