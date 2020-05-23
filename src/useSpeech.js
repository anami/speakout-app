// useSpeech hook
import { useEffect, useReducer } from 'react';

export default function useSpeech(speechEngine) {
    // useSpeech Hook.
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
            progress: speechEngine.progress,
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
          return { ...state, isPlaying: false, progress: 0 }
        case 'CLEAR':
          speechEngine.stop();
          return { ...state, isPlaying: false, progress: 0, text: '' }
        default: return state;
      }
  
      // return unchanged state
      return state;
  
    }, {
      text: 'Welcome to Speakout! Type anything here and press play. Have fun!',
      progress: 0, 
      isPlaying: false,
      voices: []
    });
  
    // Run this useEffect only once - initialise speech engine..
    useEffect(e => {
      // subscribe to the speech engine update event.
      speechEngine.subscribe(updateType => {
        dispatch({
          type: 'SP_' + updateType
        })
      });
      speechEngine.initialise();
    }, [dispatch]);
  
    return [state, dispatch]
}