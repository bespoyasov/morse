const alphabet = defaultAlphabet

const translator = new Translator({ alphabet })
const soundEmitter = new SoundEmitter()
const codePlayer = new MorseCodePlayer({
  soundEmitter, 
  translator,
})

const form = document.getElementById('form')
const input = document.getElementById('message')

form.addEventListener('submit', (e) => {
  e.preventDefault()
  codePlayer.playMessage(input.value)
})