/**
 * This module became a bit dirty
 * but I don't care :–D
 */

class SoundEmitter {
  constructor() {
    const AudioContext = window.AudioContext || window.webkitAudioContext
    if (!AudioContext) throw new Error(soundEmitterErrors.noCtx)

    this.audioCtx = new AudioContext()
    this.initAdaptee();
  }

  initAdaptee = async () => {
    console.log('init')
    this.source = await Soundfont.instrument(this.audioCtx, 'distortion_guitar');
    console.log(this.source)
  }

  play = (durationMS) => {
    if (!this.source) throw new Error('Not ready yet...');
    this.source.play(
      durationMS > 50 ? 'F1' : 'E1',
      this.audioCtx.currentTime,
      { duration: durationMS / 1000}
    )
  }
}
