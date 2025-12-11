import React, { useEffect, useRef, useState } from "react";
import ApiService from "../../../core/services/api.service";
import ServerUrl from "../../../core/constants/serverURL.constant";
import OGLAnimation from "../../layout/OGLAnimation";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../../core/constants/routes.constant";

export default function FacultySection() {
  const oglContainerRef = useRef(null);
  const [faculty, setFaculty] = useState([]);
  const navigate = useNavigate();
  const api = new ApiService();

  // -------------------------------
  // 1️⃣  Load Faculty from Backend
  // -------------------------------
  useEffect(() => {
    const fetchFaculty = async () => {
      try {
        const res = await api.apiget(ServerUrl.API_GET_FACULTYS);

        if (!res?.data?.data || !Array.isArray(res.data.data)) {
          console.error("Invalid faculty response format: ", res);
          return;
        }

        setFaculty(res.data.data);
      } catch (err) {
        console.error("Failed to load faculty:", err);
      }
    };

    fetchFaculty();
  }, []);

  // -------------------------------
  // 2️⃣ Initialize OGL once data is loaded
  // -------------------------------
  useEffect(() => {
    if (faculty.length === 0) return;

    const ogl = new OGLAnimation(oglContainerRef.current, {
      items: faculty.map((f) => ({
        image: f.image,
      })),
      bend: 1,
      textColor: "#ffffff",
      borderRadius: 0.06,
      font: "bold 32px Figtree",
      scrollSpeed: 2,
      scrollEase: 0.05,
    });

    return () => ogl.destroy && ogl.destroy();
  }, [faculty]);

  // -------------------------------

  return (
    <section className="min-h-screen text-white px-12 sm:px-6 md:px-12 overflow-hidden">

      {/* INTRO TEXT */}
      <div className="flex flex-col">
        <h2 className="text-3xl sm:text-4xl font-bold mb-1 sm:mb-1">Faculty</h2>
        <p className="text-gray-400 max-w-11/12 pt-8 text-[1.1rem]">
          Our success is driven by our faculty of world-class instructors, who are not just educators,
          but active industry leaders with an average of 6+ years of real-world expertise. They bring
          cutting-edge knowledge directly from the field into the classroom.
        </p>
      </div>

      {/* OGL 3D CAROUSEL */}
      <div
        ref={oglContainerRef}
        onClick={() => navigate(ROUTES.PROFESSOR)}
        className="relative w-full h-[500px] sm:h-[600px] md:h-[640px] overflow-hidden"
      ></div>
    </section>
  );
}
