import React from 'react';

export default function PlayPauseButton({className, isPlaying, onPlay, onPause}) {
    const ariaPressed = isPlaying ? 'true' : 'false';
    const onClick = isPlaying ? onPause : onPlay;

    return (
        <button className={className} onClick={onClick} aria-pressed={ariaPressed} aria-label="play">
            <svg viewBox="0 0 100 100">
            <g transform="translate(0 -952.36)">
                <g className="pause-icon" transform="translate(1.0714 .71367)">
                <rect style={{fill: "#ffffff"}} ry="2.7614" height="45" width="15" y="979.15" x="53.929"/>
                <rect style={{fill: "#ffffff"}} ry="2.7614" height="45" width="15" y="979.15" x="28.929"/>
                </g>
                <path className="play-icon" style={{strokeLinejoin: "round", fillRule: "evenodd", stroke:"#ffffff", strokeWidth:5, fill: "#ffffff"}} d="m38.5 982.36v40l35-20z"/>
            </g>
            </svg>
        </button>
    )
}