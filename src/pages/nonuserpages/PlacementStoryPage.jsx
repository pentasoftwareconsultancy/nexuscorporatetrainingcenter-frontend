import React, { useEffect, useRef } from 'react';
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import data from "../../assets/saniya/PlacementData.json";

const PlacementStoryPage = () => {

  const { id } = useParams();

  const scrollRef = useRef(null);

  useEffect(() => {
    window.scrollTo(0, 0);

    if (scrollRef.current) {
      scrollRef.current.scrollTop = 0;
    }
  }, []);

  const allCards = data.flatMap((yearObj) => yearObj.card);
  const student = allCards.find((item) => item.id === parseInt(id));

  return (
    <motion.div
      ref={scrollRef}  
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="text-white px-6 md:px-12 pt-4 pb-8 overflow-y-auto"
    >
      <div className="hidden md:block text-left mb-4 mt-2">
        <motion.h2
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="text-4xl"
        >
          {student.name}{" "}
          <span className="font-bold text-white">– {student.package}</span>
        </motion.h2>
      </div>

      <div className="flex flex-col md:flex-row-reverse items-center mt-5 md:items-start justify-between gap-4 md:gap-2">

        <motion.div
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="font-bold md:w-[250px] w-full flex flex-col justify-center text-center items-center md:items-start mt-0 md:mt-4 p-2"
        >
          <img
            src={student.image}
            alt={student.name}
            className="w-60 h-60 md:w-72 md:h-72 object-cover rounded-xl border border-gray-600 shadow-lg filter grayscale"
          />
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="block md:hidden mt-2 text-xl font-bold text-white"
          >
            {student.name}{" "}
            <span className="text-gray-300 text-base font-bold">
              – {student.package}
            </span>
          </motion.p>
        </motion.div>

        <motion.div
          initial={{ x: -30, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="-mt-3 md:mt-0 flex-1 rounded-2xl shadow-xl border border-gray-700 p-1 md:p-3"
        >
          <div className="space-y-[1px] mb-3 leading-tight font-bold text-white">
            <p>Company: <span className="font-bold text-white">{student.company}</span></p>
            <p>Role: <span className="font-bold text-white">{student.role}</span></p>
            <p>Course: <span className="font-bold text-white">{student.course}</span></p>
          </div>

          {student.story && (
            <div className="leading-tight text-white space-y-[1px]">
              <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}>
                <h3 className="text-xl font-bold text-white mb-0">{student.name}’s Success Story</h3>
                <p className="mt-0 mb-5">{student.story.Success_Story}</p>
              </motion.div>

              <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3 }}>
                <h3 className="text-xl font-bold text-white mb-0">Facing Challenges</h3>
                <p className="mt-0 mb-5">{student.story.facingChallenges}</p>
              </motion.div>

              <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.4 }}>
                <h3 className="text-xl font-bold text-white mb-0">Program Highlights</h3>
                <p className="mt-0 mb-5">{student.story.programHighlights}</p>
              </motion.div>

              <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.5 }}>
                <h3 className="text-xl font-bold text-white mb-0">Final Evaluation</h3>
                <p className="mt-0 mb-5">{student.story.finalEvaluation}</p>
              </motion.div>

              <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.6 }}>
                <h3 className="text-xl font-bold text-white mb-0">Overall Experience</h3>
                <p className="mt-0 mb-5">{student.story.overallExperience}</p>
              </motion.div>
            </div>
          )}
        </motion.div>
      </div>
    </motion.div>
  );
};

export default PlacementStoryPage;
