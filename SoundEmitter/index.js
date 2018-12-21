/**
 * Uses standard oscillator, based on WebAudioAPI:
 * https://developer.mozilla.org/ru/docs/Web/API/Web_Audio_API
 */

class SoundEmitter {
  constructor(config={}) {
    const { glbl=window, frequencyHZ=600 } = config
    const AudioContext = glbl.AudioContext || glbl.webkitAudioContext
    if (!AudioContext) throw new Error(soundEmitterErrors.noCtx)
    
    this.audioCtx = new AudioContext()
    this.frequencyHZ = frequencyHZ
  }

  createOscillator = () => {
    const oscillator = this.audioCtx.createOscillator()
    oscillator.frequency.value = this.frequencyHZ
    oscillator.connect(this.audioCtx.destination)
    
    return oscillator
  }

  play = durationMS => {
    const oscillator = this.createOscillator()
    oscillator.start()
    oscillator.stop(this.audioCtx.currentTime + durationMS / 1000)
  }
}