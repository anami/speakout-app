import React from 'react';
import './App.css';
import PlayPauseButton from './components/playpausebutton';
import StopButton from './components/stopbutton';
import ProgressBar from  './components/progressbar';
import SpeechEngine from './Speech';
import useSpeech from './useSpeech';

const speechEngine = new SpeechEngine();


function App() {
 
  const [state, dispatch] = useSpeech(speechEngine);

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

  function onStop(e) {
    dispatch({ type: 'STOP'});
  }

  return (
    <div className="speakout-app">
      <PlayPauseButton className="play-button" 
        isPlaying={state.isPlaying} 
        onPlay={onPlay} onPause={onPause} />
      <StopButton isPlaying={state.isPlaying} onStop={onStop} />
      <textarea value={state.text} onChange={onPhraseChange}></textarea>

      <ProgressBar progress={state.progress} />
      <div>
        <button value="Clear" onClick={e => dispatch({type: 'CLEAR'})}>Clear</button>
      </div>
    </div>
  );
}



export default App;
