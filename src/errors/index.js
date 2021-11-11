class DuplicateArgumentsError extends Error {
  constructor(argument) {
    super(
      `Duplicate argument found: ${argument}\nArguments shouldn't be duplicated`
    );
    this.name = this.constructor.name;
  }
}

module.exports = {
  DuplicateArgumentsError,
};
