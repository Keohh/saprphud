import React, { useEffect, useState } from "react";
import "./styles.css";

const getDirection = (angle) => {
  const directions = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"];
  return directions[Math.round(angle / 45) % 8];
};

export default function App() {
  const [streetA, setStreetA] = useState("Main St");
  const [streetB, setStreetB] = useState("5th Ave");
  const [heading, setHeading] = useState(180);
  const [area, setArea] = useState("Downtown");
  const direction = getDirection(heading);

  // Listen to NUI message (simulate FiveM event trigger)
  useEffect(() => {
    window.addEventListener("message", (event) => {
      if (event.data.action === "display") {
        setStreetA(event.data.streetA || "");
        setStreetB(event.data.streetB || "");
        setHeading(event.data.value || 0);
        setArea(event.data.area || "");
      }
    });
  }, []);

  return (
    <div className="ui">
      <div className="streetA">{streetA}</div>
      <div className="streetB">{streetB}</div>
      <div className="compass">{`${Math.round(heading)}°`}</div>
      <div className="compass-dir">{direction}</div>
      <div className="compass-area">{area}</div>

      {/* Direction Labels */}
      <svg className="svg">
        <text
          x="0"
          y="-2"
          stroke="black"
          fill="white"
          strokeWidth="1"
          textAnchor="middle"
        >
          N
        </text>
        <text
          x="360"
          y="-2"
          stroke="black"
          fill="white"
          strokeWidth="1"
          textAnchor="middle"
        >
          N
        </text>
        <text
          x="315"
          y="-20"
          stroke="black"
          fill="white"
          strokeWidth="0.7"
          fontSize="14"
          textAnchor="middle"
        >
          NW
        </text>
        <text
          x="-45"
          y="-20"
          stroke="black"
          fill="white"
          strokeWidth="0.7"
          fontSize="14"
          textAnchor="middle"
        >
          NW
        </text>
        <text
          x="45"
          y="-20"
          stroke="black"
          fill="white"
          strokeWidth="0.7"
          fontSize="14"
          textAnchor="middle"
        >
          NE
        </text>
        <text
          x="405"
          y="-20"
          stroke="black"
          fill="white"
          strokeWidth="0.7"
          fontSize="14"
          textAnchor="middle"
        >
          NE
        </text>
        <text
          x="90"
          y="-2"
          stroke="black"
          fill="white"
          strokeWidth="1"
          textAnchor="middle"
        >
          E
        </text>
        <text
          x="135"
          y="-20"
          stroke="black"
          fill="white"
          strokeWidth="0.7"
          fontSize="14"
          textAnchor="middle"
        >
          SE
        </text>
        <text
          x="180"
          y="-2"
          stroke="black"
          fill="white"
          strokeWidth="1"
          textAnchor="middle"
        >
          S
        </text>
        <text
          x="225"
          y="-20"
          stroke="black"
          fill="white"
          strokeWidth="0.7"
          fontSize="14"
          textAnchor="middle"
        >
          SW
        </text>
        <text
          x="270"
          y="-2"
          stroke="black"
          fill="white"
          strokeWidth="1"
          textAnchor="middle"
        >
          W
        </text>
      </svg>

      {/* Needle Lines */}
      <div className="bar" style={{ marginTop: "-119px" }}>
        <svg className="svg" viewBox={`${heading - 90} 0 180 5`}>
          {[...Array(13).keys()].map((i) => {
            const x = i * 45 - 90;
            const isMajor = i % 3 === 0;
            return (
              <rect
                key={x}
                x={x}
                width={isMajor ? 4.5 : 3}
                height={isMajor ? 14 : 5}
                stroke="black"
                fill="white"
                strokeWidth="0.6"
                strokeOpacity="0.8"
              />
            );
          })}
        </svg>
      </div>

      {/* Compass Needle */}
      <div className="bar needle">˅</div>
    </div>
  );
}
