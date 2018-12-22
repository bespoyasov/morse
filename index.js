const alphabet = defaultAlphabet

const translator = new Translator({ alphabet })
const soundEmitter = new SoundEmitter()
const codePlayer = new MorseCodePlayer({
  soundEmitter, 
  translator,
})

const form = document.getElementById('form')
const input = document.getElementById('message')
const output = document.getElementById('translated')

form.addEventListener('submit', (e) => {
  e.preventDefault()

  const message = input.value
  codePlayer.playMessage(message)

  const encoded = translator.encode(message)
  output.innerHTML = encoded
})