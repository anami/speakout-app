// Basic Speech Engine
export default class SpeechEngine {
  constructor() {
    this.speechAvailable = false;
    this.phrase = "";
    this.speechUtterance = new SpeechSynthesisUtterance(this.phrase);
    this.voices = [];
    this.callbacks = [];
    this.progress = 0;
    this.lastError = "";
    this.speaking = false;
    this.selectedVoice = null;
    this.volume = 100.0;    // 0 to 1 - default 1
    this.rate = 10.0;       // 0.1 to 10 - default 1
    this.pitch = 10.0;      // 0 to 2 - default 1
  }

  initialise() {
    const self = this;
    if ("onvoiceschanged" in window.speechSynthesis) {
      window.speechSynthesis.onvoiceschanged = function () {
        self.getVoices();
      };
    } else {
      // Safari does not have the onvoiceschanged event.
      this.getVoices();
    }
  }

  attachUtteranceEventHandlers(utterance) {
    utterance.onresume = (e) => {
      this.speaking = true;
      this.update("PLAYING");
    };
    utterance.onstart = (e) => {
      this.speaking = true;
      this.update("PLAYING");
    };
    utterance.onend = (e) => {
      window.speechSynthesis.cancel();

      this.speaking = false;
      this.update("FINISHED");
    };

    utterance.onboundary = (e) => {
      const textLength = this.phrase.length,
        words = this.phrase.substring(e.charIndex, textLength).split(" "),
        partialLength = e.charIndex + words[0].length;

      this.progress = (partialLength * 100) / textLength;
      if (this.progress >= 100) {
        this.update('FINISHED');
        return;
      }
      this.update("PROGRESS");
    };

    utterance.onerror = (e) => {
      this.update("ERROR");
      console.error(e);
    };
  }

  createUtterance(phrase) {
    this.phrase = phrase;
    this.speechUtterance = new SpeechSynthesisUtterance(phrase);
    this.attachUtteranceEventHandlers(this.speechUtterance);
    console.log("voice: ", this.speechUtterance.voice);
    this.speechUtterance.voice = this.selectedVoice;
    this.speechUtterance.pitch = Number((this.pitch / 10).toFixed(2));
    this.speechUtterance.rate = Number((this.rate / 10).toFixed(2));
    this.speechUtterance.volume = Number((this.volume / 100).toFixed(2));
    // this.progress = 0;
    // this.update("PROGRESS");
    console.log(this.speechUtterance);
    return this.speechUtterance;
  }

  getVoices() {
    this.voices = window.speechSynthesis.getVoices();
    this.update("GET_VOICES");
  }

  pause() {
    if (window.speechSynthesis.speaking) {
      window.speechSynthesis.pause();
      this.update("PAUSED");
    }
  }

  subscribe(callback) {
    this.callbacks.push(callback);
  }

  setVoice(voiceURI) {
    const voices = this.voices.filter((v) => v.voiceURI === voiceURI);
    if (voices) {
      this.selectedVoice = voices[0];
      this.update("VOICE_CHANGED");
    }
  }

  speak(phrase) {
    // if the pause is nothing - then stop
    if (phrase.length === 0) {
      window.speechSynthesis.cancel();
    } else {
      if (phrase === this.phrase) {
        // if the phrase is still the same.
        this.speechUtterance.voice = this.selectedVoice;
        this.speechUtterance.pitch = Number((this.pitch / 10).toFixed(2));
        this.speechUtterance.rate = Number((this.rate / 10).toFixed(2));
        this.speechUtterance.volume = Number((this.volume / 100).toFixed(2));
        console.log(this.speechUtterance);
        if (this.progress < 100){
            window.speechSynthesis.resume();
        } else {
            this.createUtterance(phrase);
            this.progress = 0;
            window.speechSynthesis.speak(this.speechUtterance);
        }
        
      } else {
        // it is a new phrase
        this.createUtterance(phrase);
        this.progress = 0;
        window.speechSynthesis.speak(this.speechUtterance);
      }
    }
  }

  stop() {
    window.speechSynthesis.cancel();
    this.progress = 0;
    this.update("STOPPED");
  }

  update(updateType) {
    this.callbacks.forEach((cb) => cb(updateType));
  }
}
