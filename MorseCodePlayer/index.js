/**
 * Morse code is usually heard at the receiver as
 * a medium-pitched on/off audio tone (600–1000 Hz):
 *
 * All Morse code elements depend on the dot length.
 * A dash is the length of 3 dots,
 * and spacings are specified in number of dot lengths.
 *
 * An unambiguous method of specifying the transmission speed
 * is to specify the dot duration as 50 ms:
 * https://en.wikipedia.org/wiki/Morse_code
 */

class MorseCodePlayer {
  constructor({
    translator,
    soundEmitter,
    dotLengthMS=50,
  }) {
    this.isPlaying = false
    this.translator = translator
    this.soundEmitter = soundEmitter

    this.durations = {
      dot: dotLengthMS,
      dash: 3 * dotLengthMS,
    }

    this.gaps = {
      part: dotLengthMS,
      char: 3 * dotLengthMS,
      word: 5 * dotLengthMS,
    }
  }


  togglePlayingState = () => {
    this.isPlaying = !this.isPlaying
  }


  getSignalDuration = smbl => {
    const {dot, dash} = this.durations
    switch (smbl) {
      case '0': return dot
      case '1': return dash
      default:  return 0;
    }
  }

  getGapDuration = smbl => {
    const {word, char, part} = this.gaps
    switch (smbl) {
      case '  ':  return word
      case ' ':   return char
      default:    return part
    }
  }

  *generateSequence(symbols) {
    for (const smbl of symbols) {
      const signal = this.getSignalDuration(smbl)
      const gap = this.getGapDuration(smbl)

      yield Promise.resolve({signal})
      yield new Promise(resolve =>
        setTimeout(() => resolve({gap}), signal + gap))
    }
  }

  playMessage = async message => {
    // prevent from playing another message
    if (this.isPlaying) return false
    this.togglePlayingState()

    const morseString = this.translator.encode(message)
    const symbols = morseString.split('')

    for await (const bit of this.generateSequence(symbols)) {
      const {signal} = bit
      if (signal) this.soundEmitter.play(signal)
    }

    this.togglePlayingState()
  }
}
