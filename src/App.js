import React from 'react';
import './App.css';
import PlayButton from './components/playbutton';
import ProgressBar from  './components/progressbar'

function App() {
  return (
    <div className="speakout-app">
      {/* <PlayButton /> */}
      <textarea></textarea>
      <ProgressBar progress="80" />
    </div>
  );
}

export default App;
