const { Transform } = require('stream');

const {
  UPPER_A_CODE,
  UPPER_Z_CODE,
  LOWER_A_CODE,
  LOWER_Z_CODE,
  ALPHABET_LENGTH,
} = require('../constants');

const SHIFT = 1;

class CaesarStreamEncryptor extends Transform {
  constructor(mode = 'enc') {
    super();
    this.mode = mode;
  }

  _encrypt(chunk) {
    return String.fromCharCode(
      ...chunk.split('').map((char) => {
        if (char.match(/[a-z]/i)) {
          const code = char.charCodeAt();

          if (code >= UPPER_A_CODE && code <= UPPER_Z_CODE) {
            return (
              ((code - UPPER_A_CODE + SHIFT) % ALPHABET_LENGTH) + UPPER_A_CODE
            );
          }

          if (code >= LOWER_A_CODE && code <= LOWER_Z_CODE) {
            return (
              ((code - LOWER_A_CODE + SHIFT) % ALPHABET_LENGTH) + LOWER_A_CODE
            );
          }
        }

        return char.charCodeAt();
      })
    );
  }

  _decrypt(chunk) {
    return String.fromCharCode(
      ...chunk.split('').map((char) => {
        if (char.match(/[a-z]/i)) {
          const code = char.charCodeAt();

          if (code >= UPPER_A_CODE && code <= UPPER_Z_CODE) {
            return (
              ((code - UPPER_A_CODE + (-SHIFT + ALPHABET_LENGTH)) %
                ALPHABET_LENGTH) +
              UPPER_A_CODE
            );
          }

          if (code >= LOWER_A_CODE && code <= LOWER_Z_CODE) {
            return (
              ((code - LOWER_A_CODE + (-SHIFT + ALPHABET_LENGTH)) %
                ALPHABET_LENGTH) +
              LOWER_A_CODE
            );
          }
        }

        return char.charCodeAt();
      })
    );
  }

  _transform(chunk, encoding, done) {
    if (this.mode === 'enc') {
      const transformedChunk = this._encrypt(chunk.toString());
      this.push(transformedChunk);
    } else if (this.mode === 'dec') {
      const transformedChunk = this._decrypt(chunk.toString());
      this.push(transformedChunk);
    }
    done();
  }
}

module.exports = CaesarStreamEncryptor;
