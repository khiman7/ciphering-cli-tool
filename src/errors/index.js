class DuplicateArgumentsError extends Error {
  constructor(argument) {
    super(
      `Duplicate argument found: [${argument}]\n`
      + 'Arguments shouldn\'t be duplicated\n'
      + 'Available options:\n'
      + '\t-c, --config: config for ciphers\n'
      + '\t-i, --input: a path to input file\n'
      + '\t-o, --output: a path to output file\n'
    );
    this.name = this.constructor.name;
  }
}

class NotValidConfigError extends Error {
  constructor(config) {
    super(
      `Config you provided "${config}" is not valid\n`
      + 'Config should be a string with pattern {XY(-)}n\n'
      + '- X is a cipher mark (C, R or A)\n'
      + '- Y is a flag of encoding and decoding (0 or 1)\n'
      + 'e.g. - "C1-C1-R0-A-C1"'
    );
    this.name = this.constructor.name;
  }
}

module.exports = {
  DuplicateArgumentsError,
  NotValidConfigError,
};
