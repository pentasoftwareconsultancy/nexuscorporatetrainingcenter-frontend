import React, { useState } from 'react';
import { motion } from "framer-motion"; 
import data from "../../assets/saniya/PlacementData.json";
import { Link } from "react-router-dom";

const PlacementPage = () => {

  const categories = [
    "All Placement",
    "Software Developer",
    "AR Associates",
    "Dev OPS",
    "SQL",
    "Frontend Developer",
    "Backend Developer",
    "Full Stack Developer",
    "UI/UX Designer",
    "Tester",
  ];

  const [active, setActive] = useState("All Placement");
  const [showAll, setShowAll] = useState(false);

  const visibleCategories = showAll ? categories : categories.slice(0, 6);

  const filterCards = (cards) => {
    if (active === "All Placement") return cards;

    const q = active.toLowerCase();
    return cards.filter((item) =>
      item.role?.toLowerCase().includes(q) ||
      item.company?.toLowerCase().includes(q) ||
      item.course?.toLowerCase().includes(q)
    );
  };

  const renderRow = (rowData, year, rowIndex) => (
    <motion.div
      key={rowIndex}
      initial={{ opacity: 0, scale: 0.95, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      className="flex overflow-x-auto space-x-4 sm:space-x-6 px-4 sm:px-6
                 snap-x snap-mandatory [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
    >
      {rowData.map((student, index) => (
        <motion.div
          key={`${year}-${student.id}`}
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: index * 0.1 }}
        >
          <Link
            to={`/placements/${year}/${student.id}`}
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

  const renderFlexGridForFiltered = (cards, year) => {
    return (
      <div className="flex flex-wrap gap-6 px-4 sm:px-6">
        {cards.map((student) => (
          <Link
            key={`${year}-${student.id}`}
            to={`/placements/${year}/${student.id}`}
            className="w-full sm:w-[48%] lg:w-[23%] shrink-0"
          >
            <div className="bg-transparent border border-white rounded-2xl shadow-lg overflow-hidden h-[220px] flex">
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
            </div>
          </Link>
        ))}
      </div>
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }} 
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="text-white py-6 px-12 sm:px-12 overflow-hidden min-h-0"
    >
      <div>
        <h6 className='text-5xl text-one pt-5 mb-5'>From Potential to Performance</h6>
        <p className='text-one mb-20 text-lg'>
We measure our success by the tangible, transformative results we deliver for our Students. Explore our collection of success stories that highlight how organizations, just like yours, leveraged Nexus training to close critical skill gaps, achieve ambitious strategic goals, and unlock new levels of organizational performance. These are not just testimonials; they are verifiable accounts of growth and competitive advantage.        </p>
      </div>

      <div className='pb-20 flex flex-wrap gap-3'>
        {visibleCategories.map((cat, index) => (
          <button
            key={index}
            onClick={() => setActive(cat)}
            className={`p-4 border-2 rounded-full mr-3 shrink-0 
              ${active === cat ? "text-black bg-white" : "text-white bg-rgba(0,0,0,0.34)"}
            `}
          >
            {cat}
          </button>
        ))}

        <button onClick={() => setShowAll(!showAll)}>
          {showAll ? "Show Less" : "More"}
        </button>
      </div>

      {data.map((yearBlock, index) => {
        const filteredCards = filterCards(yearBlock.card);

        if (filteredCards.length === 0) return null;

        if (active !== "All Placement") {
          return (
            <div key={yearBlock.year} className="mb-16">
              <h1 className="text-2xl font-bold text-white mb-5">{yearBlock.year}</h1>

              {renderFlexGridForFiltered(filteredCards, yearBlock.year)}
            </div>
          );
        }

        const half = Math.ceil(filteredCards.length / 2);
        const firstRow = filteredCards.slice(0, half);
        const secondRow = filteredCards.slice(half);

        return (
          <div key={index} className="mb-16">
            <h1 className="text-2xl font-bold text-white mb-5">{yearBlock.year}</h1>

            <div className="space-y-6 sm:space-y-10">
              {renderRow(firstRow, yearBlock.year, index + "a")}
              {renderRow(secondRow, yearBlock.year, index + "b")}
            </div>
          </div>
        );
      })}
    </motion.div>
  );
};

export default PlacementPage;
