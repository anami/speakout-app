import React from 'react';

export default function VoiceList({voices, selectedVoice, onVoiceChange}) {
    return (
        <select onChange={onVoiceChange} name="voice" value={selectedVoice} >
            {voices.map(v => getVoiceOption(v))}
        </select>
    )
}

function getVoiceOption(voice) {
    return (
        <option value={voice.name} key={voice.voiceURI}>
            { voice.name + " - (" + voice.lang + ")" }
        </option>
    )
}