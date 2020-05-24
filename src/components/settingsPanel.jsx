import React, { useState, useEffect } from "react";
import VoiceList from "./voicelist";
import CogIcon from "./cog-icon";
import "./range.css";

export default function SettingsPanel({ state, dispatch }) {
  const [open, setOpen] = useState(false);
  const [openOptions, setOpenOptions] = useState("");
  const { voices, selectedVoice, volume } = state;

  useEffect(
    (e) => {
      setOpenOptions(open ? "visible" : "");
    },
    [open]
  );

  const onToggleOptions = (e) => {
    setOpen(!open);
  };

  function bindInputChange(actionType) {
    return (e) => {
      dispatch({ type: actionType, payload: e.target.value });
    };
  }
  const onVoiceChange = bindInputChange("SET_VOICE");
  const onVolumeChange = bindInputChange("SET_VOLUME");
  const onPitchChange = bindInputChange("SET_PITCH");
  const onRateChange = bindInputChange("SET_RATE");

  return (
    <React.Fragment>
      <button
        className="button--options"
        aria-expanded={open}
        onClick={onToggleOptions}
      >
        <CogIcon />
      </button>
      <fieldset className={`speakout-options ${openOptions} `}>
        <legend>Options</legend>
        <div className="speakout-options__section">
          <label htmlFor="voice">Speaker</label>
          <VoiceList
            voices={voices}
            onVoiceChange={onVoiceChange}
            selectedVoice={selectedVoice}
          />
        </div>
        <div className="speakout-options__section">
          <label htmlFor="volume">Volume</label>
          <input
            name="volume"
            type="range"
            min="0"
            max="100"
            step="5"
            onChange={onVolumeChange}
            defaultValue={state.volume}
          />
        </div>
        <div className="speakout-options__section">
          <label htmlFor="pitch">Pitch</label>
          <input
            name="pitch"
            type="range"
            min="0"
            max="20"
            step="1"
            onChange={onPitchChange}
            defaultValue={state.pitch}
          />
        </div>
        <div className="speakout-options__section">
          <label htmlFor="rate">Rate</label>
          <input
            name="rate"
            type="range"
            min="1"
            max="100"
            step="1"
            onChange={onRateChange}
            defaultValue={state.rate}
          />
        </div>
      </fieldset>
    </React.Fragment>
  );
}
