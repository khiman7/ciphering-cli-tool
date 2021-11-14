const OPTIONS = {
  config: {
    alias: 'c',
    fullName: 'config',
  },
  input: {
    alias: 'i',
    fullName: 'input',
  },
  output: {
    alias: 'o',
    fullName: 'output',
  },
};

const ENCRYPTION_ALGORITHMS = {
  caesar: {
    alias: 'C',
    name: 'caesar',
  },
  rot8: {
    alias: 'R',
    name: 'rot8',
  },
  atbash: {
    alias: 'A',
    name: 'atbash',
  },
};

const [UPPER_A_CODE, UPPER_Z_CODE] = [65, 90];
const [LOWER_A_CODE, LOWER_Z_CODE] = [97, 122];
const ALPHABET_LENGTH = 26;

module.exports = { 
  OPTIONS,
  ENCRYPTION_ALGORITHMS,
  UPPER_A_CODE,
  UPPER_Z_CODE,
  LOWER_A_CODE,
  LOWER_Z_CODE,
  ALPHABET_LENGTH,
};
