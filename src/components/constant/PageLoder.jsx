import React from "react";

const PageLoader = () => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black">
      <div className="w-full max-w-4xl">
        <svg viewBox="0 0 800 500" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="chipGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#2d2d2d" />
              <stop offset="100%" stopColor="#0f0f0f" />
            </linearGradient>

            <linearGradient id="textGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#eeeeee" />
              <stop offset="100%" stopColor="#888888" />
            </linearGradient>

            <linearGradient id="pinGradient" x1="1" y1="0" x2="0" y2="0">
              <stop offset="0%" stopColor="#bbbbbb" />
              <stop offset="50%" stopColor="#888888" />
              <stop offset="100%" stopColor="#555555" />
            </linearGradient>
          </defs>

          {/* Traces */}
          <g>
            {[
              ["M100 100 H200 V210 H326", "purple"],
              ["M80 180 H180 V230 H326", "blue"],
              ["M60 260 H150 V250 H326", "yellow"],
              ["M100 350 H200 V270 H326", "green"],
              ["M700 90 H560 V210 H474", "blue"],
              ["M740 160 H580 V230 H474", "green"],
              ["M720 250 H590 V250 H474", "red"],
              ["M680 340 H570 V270 H474", "yellow"]
            ].map(([path, color], i) => (
              <g key={i}>
                <path d={path} className="trace-bg" />
                <path d={path} className={`trace-flow ${color}`} />
              </g>
            ))}
          </g>

          {/* Chip */}
          <rect
            x="330"
            y="190"
            width="140"
            height="100"
            rx="20"
            ry="20"
            fill="url(#chipGradient)"
            stroke="#222"
            strokeWidth="3"
            filter="drop-shadow(0 0 6px rgba(0,0,0,0.8))"
          />

          {/* Pins */}
          {[322, 470].map(x =>
            [205, 225, 245, 265].map(y => (
              <rect
                key={`${x}-${y}`}
                x={x}
                y={y}
                width="8"
                height="10"
                rx="2"
                fill="url(#pinGradient)"
              />
            ))
          )}

          {/* Text */}
          <text
            x="400"
            y="240"
            fontFamily="Arial"
            fontSize="22"
            fill="url(#textGradient)"
            textAnchor="middle"
            alignmentBaseline="middle"
          >
            Loading
          </text>
        </svg>
      </div>

      <style>{`
        .trace-bg {
          stroke: #333;
          stroke-width: 1.8;
          fill: none;
        }

        .trace-flow {
          stroke-width: 1.8;
          fill: none;
          stroke-dasharray: 40 400;
          stroke-dashoffset: 438;
          filter: drop-shadow(0 0 6px currentColor);
          animation: flow 3s cubic-bezier(0.5, 0, 0.9, 1) infinite;
        }

        .yellow { stroke: #ffea00; color: #ffea00; }
        .blue { stroke: #00ccff; color: #00ccff; }
        .green { stroke: #00ff15; color: #00ff15; }
        .purple { stroke: #9900ff; color: #9900ff; }
        .red { stroke: #ff3300; color: #ff3300; }

        @keyframes flow {
          to { stroke-dashoffset: 0; }
        }
      `}</style>
    </div>
  );
};

export default PageLoader;
