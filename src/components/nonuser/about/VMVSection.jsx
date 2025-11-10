import React from 'react'

const VMVSection = () => {
  return (
    <div className="
      min-h-screen bg-black flex flex-col justify-between 
      px-5 sm:px-8 md:px-12 lg:px-20 py-10 
      text-white font-sans space-y-20 sm:space-y-24 overflow-hidden
    ">

      {/* === OUR VISION (Left) === */}
      <div className="relative flex justify-start">
        {/* Blue Glow behind Vision */}
        <div className="
          absolute -top-20 -left-20 w-[300px] h-[300px] sm:w-[400px] sm:h-[400px]
          bg-blue-700/40 blur-[120px] sm:blur-[150px] rounded-full
        "></div>

        <div className="relative w-full md:w-1/2 z-10 text-left">
          <h2 className="
            text-3xl sm:text-4xl md:text-5xl font-bold mb-4 
            max-[400px]:text-[1.8rem]
          ">
            Our Vision
          </h2>
          <p className="
            text-gray-200 leading-relaxed text-sm sm:text-base md:text-[17px]
            max-[400px]:text-[13px]
          ">
            At Nexus Corporate Training Center LLP, our vision is to deliver accessible, high-quality IT
            education with placement support, empowering learners in Pune and beyond. We aim to build an
            inclusive global community that equips students with the skills and connections needed to excel in
            the dynamic IT industry.
          </p>
        </div>
      </div>

      {/* === OUR MISSION (Right) === */}
      <div className="relative flex justify-end">
        {/* Blue Glow behind Mission */}
        <div className="
          absolute top-0 right-0 w-[300px] h-[300px] sm:w-[400px] sm:h-[400px]
          bg-blue-700/40 blur-[120px] sm:blur-[150px] rounded-full
        "></div>

        <div className="relative w-full md:w-1/2 text-right z-10">
          <h2 className="
            text-3xl sm:text-4xl md:text-5xl font-bold mb-4
            max-[400px]:text-[1.8rem]
          ">
            Our Mission
          </h2>
          <p className="
            text-gray-200 leading-relaxed text-sm sm:text-base md:text-[17px]
            max-[400px]:text-[13px]
          ">
            Our mission at Nexus Corporate Training Center LLP is to empower learners with job-focused software
            skills through tailored programs for all experience levels. We aim to equip each student with the
            knowledge and hands-on training needed to thrive in the IT industry and excel in their careers.
          </p>
        </div>
      </div>

      {/* === OUR VALUES (Bottom Left) === */}
      <div className="relative flex justify-start">
        {/* Blue Glow behind Values */}
        <div className="
          absolute -bottom-20 -left-20 w-[300px] h-[300px] sm:w-[400px] sm:h-[400px]
          bg-blue-700/40 blur-[120px] sm:blur-[150px] rounded-full
        "></div>

        <div className="relative w-full md:w-1/2 z-10 text-left">
          <h2 className="
            text-3xl sm:text-4xl md:text-5xl font-bold mb-4
            max-[400px]:text-[1.8rem]
          ">
            Our Values
          </h2>
          <p className="
            text-gray-200 leading-relaxed text-sm sm:text-base md:text-[17px]
            max-[400px]:text-[13px]
          ">
            At Nexus Corporate Training Center LLP, our values focus on a learner-centered approach, career
            success with 100% placement support, continuous improvement through feedback, and a collaborative,
            inclusive community for students and professionals alike.
          </p>
        </div>
      </div>
    </div>
  );
};

export default VMVSection