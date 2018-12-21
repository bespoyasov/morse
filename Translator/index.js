/**
 * Morse code translation algorithm is based on standard algorithm
 * You can find a good explanation of it here:
 * https://www.geeksforgeeks.org/morse-code-translator-python/
 */

class Translator {
  constructor({
    alphabet, 
    space=' ',
  }) {
    if (!alphabet) throw new Error(translatorErrors.noAlphabet)
    
    this.space = space
    this.alphabet = alphabet
    this.inversed = this.inverse(alphabet)
  }


  inverse = alphabet =>
    Object
      .keys(alphabet)
      .reduce((inversed, key) => ({
        ...inversed, 
        [alphabet[key]]: key
      }), {})


  encode = message => {
    return message
      .toLowerCase()
      .split('')
      .reduce((encoded, char) => {
        const code = this.inversed[char] || ''
        const part = code + this.space
        return encoded += part
      }, '')
  }

  decode = message => {
    message += this.space

    let decoded = '',
        currentCode = '',
        spaceCount = 0

    for (const char of message) {
      if (char !== this.space) {
        currentCode += char
        spaceCount = 0
        continue
      }

      spaceCount += 1
      if (spaceCount === 2) {
        decoded += this.space
        continue
      }
      
      decoded += this.alphabet[currentCode]
      currentCode = ''
    }

    return decoded
  }
}