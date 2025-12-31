import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import ApiService from "../../core/services/api.service";
import ServerUrl from "../../core/constants/serverURL.constant";

const PlacementStoryPage = () => {
  const { id } = useParams();
  const scrollRef = useRef(null);
  const api = new ApiService();
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);

  console.log("student data", student);
  const fetchPlacement = async () => {
    try {
      const res = await api.apiget(
        ServerUrl.API_GET_PLACEMENT_AND_DETAILS_BY_ID + "/" + id
      );

      console.log("API RAW RESPONSE", res);

      // ✅ Correct access
      if (res?.data?.success && res?.data?.data) {
        const raw = Object.values(res.data.data)[0];

        const normalizedPlacement = {
          name: raw.student_name,
          image: raw.image,
          company: raw.company_name,
          role: raw.company_role,
          course: raw.course,
          package: raw.package,
          story: {
            Success_Story: raw.success_story,
            facingChallenges: raw.facing_challenges,
            programHighlights: raw.program_highlights,
            finalEvaluation: raw.final_evaluation,
            overallExperience: raw.overall_experience,
          },
        };

        setStudent(normalizedPlacement);
      }
    } catch (err) {
      console.error("Placement fetch error", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    if (scrollRef.current) scrollRef.current.scrollTop = 0;

    fetchPlacement();
  }, [id]);

  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0 },
  };

  const staggerParent = {
    hidden: {},
    show: { transition: { staggerChildren: 0.18 } },
  };

  if (loading) {
    return <div className="text-white p-10">Loading...</div>;
  }

  if (!student) {
    return <div className="text-white p-10">Placement not found</div>;
  }

  return (
    <motion.div
      ref={scrollRef}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      className="text-white px-6 md:px-12 pt-4 pb-10 overflow-y-auto"
    >
      {/* TITLE */}
      <motion.h2
        initial={{ opacity: 0, y: -25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="hidden md:block text-left mb-6 mt-2 text-4xl font-semibold"
      >
        {student.name}{" "}
        <span className="font-bold text-white">– {student.package} LPA</span>
      </motion.h2>

      <div className="flex flex-col md:flex-row-reverse items-center mt-3 md:items-start justify-between gap-8 md:gap-4">
        {/* PROFILE IMAGE - HOVER EFFECT REMOVED */}
        <motion.div
          initial={{ opacity: 0, x: 60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="md:w-[300px] w-full flex flex-col justify-center text-center md:text-left items-center md:items-start"
        >
          <motion.img
            src={student.image}
            alt={student.name}
            className="w-60 h-60 md:w-72 md:h-72 object-cover rounded-2xl border border-gray-600 shadow-xl"
          />

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="block md:hidden mt-3 text-xl font-bold"
          >
            {student.name}{" "}
            <span className="text-gray-300 text-base">
              – {student.package} LPA
            </span>
          </motion.p>
        </motion.div>

        {/* STORY CONTAINER */}
        <motion.div
          initial={{ opacity: 0, x: -60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9, ease: "easeOut" }}
          className="flex-1 rounded-2xl shadow-xl border border-gray-700 p-6 backdrop-blur-sm"
        >
          <motion.div
            variants={staggerParent}
            initial="hidden"
            animate="show"
            className="space-y-2 mb-8 leading-relaxed font-semibold"
          >
            <motion.p variants={fadeUp}>Company: {student.company}</motion.p>
            <motion.p variants={fadeUp}>Role: {student.role}</motion.p>
            <motion.p variants={fadeUp}>Course: {student.course}</motion.p>
          </motion.div>

          {student.story && (
            <motion.div
              variants={staggerParent}
              initial="hidden"
              animate="show"
              className="leading-relaxed space-y-10"
            >
              <motion.div variants={fadeUp}>
                <h3
                  className="text-xl font-bold mb-3 relative pb-2
                  before:content-[''] before:absolute before:left-0 before:bottom-0
                  before:h-[3px] before:w-28 before:bg-gradient-to-r
                  before:from-yellow-400 before:via-yellow-200 before:to-yellow-500
                  before:rounded-full before:shadow-[0_0_10px_rgba(255,215,0,0.8)]"
                >
                  Success Story
                </h3>
                <p className="text-gray-200 mt-1 mb-6">
                  {student.story.Success_Story}
                </p>
              </motion.div>

              <motion.div variants={fadeUp}>
                <h3
                  className="text-xl font-bold mb-3 relative pb-2
                  before:content-[''] before:absolute before:left-0 before:bottom-0
                  before:h-[3px] before:w-32 before:bg-gradient-to-r
                  before:from-yellow-400 before:via-yellow-200 before:to-yellow-500
                  before:rounded-full before:shadow-[0_0_10px_rgba(255,215,0,0.8)]"
                >
                  Facing Challenges
                </h3>
                <p className="text-gray-200 mt-1 mb-6">
                  {student.story.facingChallenges}
                </p>
              </motion.div>

              <motion.div variants={fadeUp}>
                <h3
                  className="text-xl font-bold mb-3 relative pb-2
                  before:content-[''] before:absolute before:left-0 before:bottom-0
                  before:h-[3px] before:w-36 before:bg-gradient-to-r
                  before:from-yellow-400 before:via-yellow-200 before:to-yellow-500
                  before:rounded-full before:shadow-[0_0_10px_rgba(255,215,0,0.8)]"
                >
                  Program Highlights
                </h3>
                <p className="text-gray-200 mt-1 mb-6">
                  {student.story.programHighlights}
                </p>
              </motion.div>

              <motion.div variants={fadeUp}>
                <h3
                  className="text-xl font-bold mb-3 relative pb-2
                  before:content-[''] before:absolute before:left-0 before:bottom-0
                  before:h-[3px] before:w-32 before:bg-gradient-to-r
                  before:from-yellow-400 before:via-yellow-200 before:to-yellow-500
                  before:rounded-full before:shadow-[0_0_10px_rgba(255,215,0,0.8)]"
                >
                  Final Evaluation
                </h3>
                <p className="text-gray-200 mt-1 mb-6">
                  {student.story.finalEvaluation}
                </p>
              </motion.div>

              <motion.div variants={fadeUp}>
                <h3
                  className="text-xl font-bold mb-3 relative pb-2
                  before:content-[''] before:absolute before:left-0 before:bottom-0
                  before:h-[3px] before:w-40 before:bg-gradient-to-r
                  before:from-yellow-400 before:via-yellow-200 before:to-yellow-500
                  before:rounded-full before:shadow-[0_0_10px_rgba(255,215,0,0.8)]"
                >
                  Overall Experience
                </h3>
                <p className="text-gray-200 mt-1 mb-6">
                  {student.story.overallExperience}
                </p>
              </motion.div>
            </motion.div>
          )}
        </motion.div>
      </div>
    </motion.div>
  );
};

export default PlacementStoryPage;
