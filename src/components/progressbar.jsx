import React from "react";

export default function ProgressBar({ progress }) {
  return (
    <div className="speech__progress">
      <div
        className="speech__progress-bar"
        style={{ width: progress + "%" }}
      ></div>
    </div>
  );
}
