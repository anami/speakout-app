import React, { useState, useEffect, useReducer } from 'react';
import './App.css';
import PlayPauseButton from './components/playpausebutton';
import ProgressBar from  './components/progressbar'
import SpeechEngine from './Speech';

const speechEngine = new SpeechEngine();


function App() {
  const [state, dispatch] = useReducer((state, action) => {
    switch(action.type) {
      case 'SP_PROGRESS':
        return {
          ...state,
          progress: speechEngine.progress
        }
      case 'SP_STOPPED':
      case 'SP_FINISHED':
        return {
          ...state,
          isPlaying: false
        }
      case 'SP_ERROR':
        return state;
      case 'SP_PLAYING':
        return {
          ...state,
          isPlaying: true
        }
      case 'SP_PAUSED':
        return {
          ...state,
          isPlaying: false
        } 
      case 'SP_GET_VOICES':
        return {
          ...state,
          voices: speechEngine.voices
        }
      case 'SET_TEXT':
        return {
          ...state,
          text: action.text
        }
      case 'PLAY':
        speechEngine.speak(state.text);
        return { ...state, isPlaying: true, progress: 0 }
      case 'PAUSE':
        speechEngine.pause();
        break;
      case 'STOP':
        speechEngine.stop();
        break;
      default: return state;
    }

    // return unchanged state
    return state;

  }, {
    text: '',
    progress: 0, 
    isPlaying: false,
    voices: []
  });

  // Run this useEffect only once - initialise speech engine..
  useEffect(e => {
    // subscribe to the speech engine update event.
    speechEngine.subscribe(onSpeechEngineUpdate);
    speechEngine.initialise();
  }, []);

  function onSpeechEngineUpdate(updateType) {
    dispatch({
      type: 'SP_' + updateType
    })
  }

  function onPhraseChange(e) {
    e.preventDefault();
    dispatch({ type: 'SET_TEXT', text: e.target.value});
  }

  function onPlay(e) {
    dispatch({ type: 'PLAY'});
  }

  function onPause(e) {
    dispatch({ type: 'PAUSE'});
  }

  return (
    <div className="speakout-app">
      <PlayPauseButton className="play-button" 
        isPlaying={state.isPlaying} 
        onPlay={onPlay} onPause={onPause} />
      <textarea value={state.text} onChange={onPhraseChange}></textarea>

      <ProgressBar progress={state.progress} />
      <div>
        <button value="Clear">Clear</button>
      </div>
    </div>
  );
}

export default App;
