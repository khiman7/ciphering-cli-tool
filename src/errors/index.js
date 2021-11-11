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

module.exports = {
  DuplicateArgumentsError,
};
