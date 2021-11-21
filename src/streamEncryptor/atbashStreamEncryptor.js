const { Transform } = require('stream');

const {
  UPPER_A_CODE,
  UPPER_Z_CODE,
  LOWER_A_CODE,
  LOWER_Z_CODE,
  ALPHABET_LENGTH,
} = require('../constants');

class AtbashStreamEncryptor extends Transform {
  constructor() {
    super();
  }

  _encrypt(chunk) {
    return String.fromCharCode(
      ...chunk.split('').map(char => {
        if (char.match(/[a-z]/i)) {
          const code = char.charCodeAt();

          if (code >= UPPER_A_CODE && code <= UPPER_Z_CODE) {
            return UPPER_Z_CODE - (code - UPPER_A_CODE);
          }

          if (code >= LOWER_A_CODE && code <= LOWER_Z_CODE) {
            return LOWER_Z_CODE - (code - LOWER_A_CODE);
          }
        }
        
        return char.charCodeAt();
      })
    );
  }

  _transform(chunk, encoding, done) {
    const transformedChunk = this._encrypt(chunk.toString());
    this.push(transformedChunk);
    done();
  }
}

module.exports = AtbashStreamEncryptor;
