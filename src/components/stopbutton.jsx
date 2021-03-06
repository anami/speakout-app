import React from "react";

export default function StopButton({ onStop, isPlaying }) {
  return (
    <button
      className="stop-button"
      disabled={!isPlaying}
      onClick={onStop}
      aria-label="stop"
    >
      <svg viewBox="0 0 100 100">
        <g transform="translate(0 -952.36)">
          <g className="stop-icon" transform="translate(1.0714 .71367)">
            <rect
              style={{ fill: "#ffffff" }}
              ry="2.7614"
              height="45"
              width="45"
              y="979.15"
              x="28.929"
            />
          </g>
        </g>
      </svg>
    </button>
  );
}
