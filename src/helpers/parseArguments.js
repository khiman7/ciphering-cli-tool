const { DuplicateArgumentsError } = require('../errors');

const parseArguments = () => {
  const args = process.argv.slice(2);
  const options = {};
  
  const isOptionDuplicated = (option) => {
    return options.hasOwnProperty(option);
  };

  args.forEach((arg, index) => {
    if (arg.startsWith('-')) {
      const option = arg.slice(1);

      if (isOptionDuplicated(option)) {
        throw new DuplicateArgumentsError(arg);
      }

      options[option] = args[index + 1];
      return;
    } else if (arg.startsWith('--')) {
      const option = arg.slice(2);

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
