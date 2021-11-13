const validateConfig = (config) => {
  const configRegex = /^(([CR][01])|A)(-(?=(([CR][01])|A))(([CR][01])|A))*$/;

  return configRegex.test(config);
};

module.exports = {
  validateConfig,
};
