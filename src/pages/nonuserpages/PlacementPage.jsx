import React from 'react'
import { motion } from "framer-motion"; 
import data from "../../assets/saniya/PlacementData.json";
import { Link } from "react-router-dom";

const PlacementPage = () => {

  const half = Math.ceil(data.length / 2);
  const firstRow = data.slice(0, half);
  const secondRow = data.slice(half);

  const renderRow = (rowData, rowIndex) => (
    <motion.div
      key={rowIndex}
      initial={{ opacity: 0, scale: 0.95, y: 20 }} 
      animate={{ opacity: 1, scale: 1, y: 0 }} 
      transition={{ duration: 0.7, ease: "easeOut", delay: rowIndex * 0.2 }}
      className="flex overflow-x-auto space-x-4 sm:space-x-6 px-4 sm:px-6 snap-x snap-mandatory
                 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
      style={{ scrollBehavior: "smooth" }}
    >
      {rowData.map((student, index) => (
        <motion.div
          key={student.id}
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: index * 0.1 }}
        >
          <Link
            to={`/placements/${student.id}`}
            className="shrink-0 bg-transparent border border-white rounded-2xl shadow-lg 
                       transition-transform duration-200 hover:scale-95 
                       w-[90vw] sm:w-[400px] h-[220px] flex snap-start overflow-hidden"
          >
            <div className="flex flex-col justify-center p-3 w-70">
              <p className="font-bold text-sm">Package: {student.package}</p>
              <p className="text-sm">Name: {student.name}</p>
              <p className="text-sm">Company: {student.company}</p>
              <p className="text-sm">Role: {student.role}</p>
              <p className="text-sm">Course: {student.course}</p>
            </div>

            <div className="w-50 h-full p-3">
              <img
                src={student.image}
                alt={student.name}
                className="object-cover w-full h-full rounded-xl border border-gray-700"
              />
            </div>
          </Link>
        </motion.div>
      ))}
    </motion.div>
  );

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }} 
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="text-white py-6 px-12 sm:px-12 overflow-hidden min-h-0"
    >
      <div className="text-left mb-3">
        <h1 className="text-2xl font-bold text-white">2025</h1>
      </div>

      <div className="space-y-6 sm:space-y-10">
        {renderRow(firstRow, 0)}
        {renderRow(secondRow, 1)}
      </div>
    </motion.div>
  );
};

export default PlacementPage;
