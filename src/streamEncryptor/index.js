const CaesarStreamEncryptor = require('./caesarStreamEncryptor');
const ROT8StreamEncryptor = require('./rot8StreamEncryptor');
const AtbashStreamEncryptor = require('./atbashStreamEncryptor');

const { NotValidAlgorithmError } = require('../errors');

class StreamEncryptor {
  static create(algorithm, mode = 'enc') {
    switch (algorithm) {
      case 'caesar':
        return new CaesarStreamEncryptor(mode);
      case 'rot8':
        return new ROT8StreamEncryptor(mode);
      case 'atbash':
        return new AtbashStreamEncryptor();
      default:
        throw new NotValidAlgorithmError(algorithm);
    }
  }
}

module.exports = StreamEncryptor;
