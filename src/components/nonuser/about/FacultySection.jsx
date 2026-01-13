import React, { useEffect, useState } from "react";
import ApiService from "../../../core/services/api.service";
import ServerUrl from "../../../core/constants/serverURL.constant";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../../core/constants/routes.constant";

export default function FacultySection() {
  const [faculty, setFaculty] = useState([]);
  const navigate = useNavigate();
  const api = new ApiService();

  // Load faculty
  useEffect(() => {
    const fetchFaculty = async () => {
      try {
        const res = await api.apiget(ServerUrl.API_GET_FACULTYS);
        if (Array.isArray(res?.data?.data)) {
          setFaculty(res.data.data);
        }
      } catch (err) {
        console.error("Failed to load faculty:", err);
      }
    };
    fetchFaculty();
  }, []);

  if (faculty.length === 0) return null;

  return (
    <section className="py-5 text-white px-4 sm:px-6 md:px-12 overflow-hidden">
      {/* Inline CSS ONLY (NO GLOBAL CSS) */}
      <style>
        {`
          @keyframes facultyScroll {
            from {
              transform: translateX(0);
            }
            to {
              transform: translateX(-50%);
            }
          }

          .faculty-track {
            display: flex;
            gap: 16px;
            width: max-content;
            animation: facultyScroll 5s linear infinite;
          }

          .faculty-wrapper:hover .faculty-track {
            animation-play-state: paused;
          }
        `}
      </style>

      {/* TEXT */}
      <div className="mb-8">
        <h2 className="text-3xl sm:text-4xl font-bold">Faculty</h2>
        <p className="text-gray-400 pt-4 max-w-4xl">
          Our success is driven by world-class instructors with real industry expertise.
        </p>
      </div>

      {/* AUTO HORIZONTAL SCROLLER */}
      <div className="faculty-wrapper relative overflow-hidden">
        <div className="faculty-track">
          {[...faculty, ...faculty].map((f, index) => (
            <div
              key={index}
              onClick={() => navigate(ROUTES.PROFESSOR)}
              className="
                min-w-[220px]
                sm:min-w-[260px]
                md:min-w-[300px]
                rounded-2xl
                overflow-hidden
                bg-[#1f1f1f]
                cursor-pointer
              "
            >
              <img
                src={f.image}
                alt=""
                className="
                  w-full
                  h-[280px]
                  sm:h-[320px]
                  md:h-[360px]
                  object-cover
                "
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
