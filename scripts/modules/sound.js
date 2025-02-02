

class SoundManager {

    constructor() {
      this.tracks = {};
    }
  
    /**
     * Load a sound
     * @param {string} name a name for further reference
     * @param {string} src the path to the file
     * @returns {HTMLAudioElement} the new audio element
     */
    load(name, src) {
      let newSound = new Audio(src);
      this.tracks[name] = newSound;
      return newSound;
    }
  
    /**
     * Play a sound
     * @param {string} name the name of the sound (as used in load())
     */
    play(name) {
      if(this.tracks[name]) {
        let sound = this.tracks[name];
        if(sound.singleton && sound.currentTime != 0 && !sound.paused) return;
        sound.currentTime = 0;
        sound.play();
      }
    }
  
  }
  
  export default SoundManager;