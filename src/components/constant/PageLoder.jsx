import React from "react";

const PageLoader = () => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-three">
      <div className="flex items-center justify-center min-h-screen">
        <div className="relative">
          <div className="relative w-32 h-32 flex items-center justify-center">

            <div
              className="absolute w-full h-full rounded-full border-[3px] border-gray-100/10 border-r-[#0ff] border-b-[#0ff] animate-spin"
              style={{ animationDuration: "3s" }}
            ></div>

            <div
              className="absolute w-full h-full rounded-full border-[3px] border-gray-100/10 border-t-[#0ff] animate-spin"
              style={{ animationDuration: "2s", animationDirection: "reverse" }}
            ></div>

            <div className="absolute text-cyan-300 font-semibold tracking-widest text-lg select-none">
              NEXUS
            </div>

          </div>

          <div className="absolute inset-0 bg-gradient-to-tr from-[#0ff]/10 via-transparent to-[#0ff]/5 animate-pulse rounded-full blur-sm"></div>
        </div>
      </div>
    </div>
  );
};

export default PageLoader;
