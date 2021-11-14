const { DuplicateArgumentsError } = require('../errors');
const { OPTIONS } = require('../constants');

const parseArguments = () => {
  const args = process.argv.slice(2);
  const options = {};

  const isOptionDuplicated = (option) => {
    /**
     * If the option is an available option, check for duplicates
     * including short and full name (e.g. 'c' and 'config').
     */
    const availableOption = Object.values(OPTIONS).find(
      (opt) => opt.alias === option || opt.fullName === option
    );

    if (availableOption) {
      return (
        options.hasOwnProperty(availableOption.alias) ||
        options.hasOwnProperty(availableOption.fullName)
      );
    }

    return options.hasOwnProperty(option);
  };

  args.forEach((arg, index) => {
    if (arg.startsWith('--')) {
      const option = arg.slice(2);

      if (isOptionDuplicated(option)) {
        throw new DuplicateArgumentsError(arg);
      }

      options[option] = args[index + 1];
      return;
    } else if (arg.startsWith('-')) {
      const option = arg.slice(1);

      if (isOptionDuplicated(option)) {
        throw new DuplicateArgumentsError(arg);
      }

      options[option] = args[index + 1];
      return;
    }
  });

  return options;
};

module.exports = parseArguments;
