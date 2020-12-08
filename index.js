const alphabet = defaultAlphabet
const defaultMessage = 'DJENT!';

const stateObserver = new StateObserver();
const translator = new Translator({ alphabet })
const soundEmitter = new SoundEmitter()
const codePlayer = new MorseCodePlayer({
  soundEmitter,
  translator,
})

const form = document.getElementById('form')
const input = document.getElementById('message')
const output = document.getElementById('translated')

document.addEventListener('DOMContentLoaded', () => {
  const initialText = stateObserver.currentState() || defaultMessage;
  input.value = initialText;

  const encoded = translator.encode(initialText)
  output.innerHTML = encoded
})

form.addEventListener('submit', (e) => {
  e.preventDefault()

  const message = input.value
  codePlayer.playMessage(message)

  const encoded = translator.encode(message)
  output.innerHTML = encoded

  if (message !== defaultMessage) {
    stateObserver.updateState(message);
  }
})
