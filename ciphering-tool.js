const fs = require('fs');
const { pipeline } = require('stream');

const parseArguments = require('./src/helpers/parseArguments');
const { ReadFileStream, WriteFileStream } = require('./src/customStreams');
const StreamEncryptor = require('./src/streamEncryptor');
const { validateConfig } = require('./src/helpers/validators');
const {
  NotValidConfigError,
  FileDoesNotExistError,
  MissingConfigArgumentError,
} = require('./src/errors');
const { ENCRYPTION_ALGORITHMS } = require('./src/constants');

try {
  const args = parseArguments();
  const config = args.c || args.config;
  const inputPath = args.i || args.input;
  const outputPath = args.o || args.output;

  if (!config) {
    throw new MissingConfigArgumentError();
  }

  const isConfigValid = validateConfig(config);

  if (!isConfigValid) {
    throw new NotValidConfigError(config);
  }

  if (inputPath && !fs.existsSync(inputPath)) {
    throw new FileDoesNotExistError(inputPath);
  }

  if (outputPath && !fs.existsSync(outputPath)) {
    throw new FileDoesNotExistError(outputPath);
  }

  const streamEncryptors = config.split('-').map((cypher) => {
    const [alias, number] = cypher.split('');
    const algorithm = Object.values(ENCRYPTION_ALGORITHMS).find(
      (alg) => alg.alias === alias
    ).name;
    const mode = number === '1' ? 'enc' : 'dec';

    return StreamEncryptor.create(algorithm, mode);
  });

  //!inputPath && process.stdout.write('Enter the text you want to encrypt: \n');
  pipeline(
    inputPath
      ? new ReadFileStream(inputPath)
      : process.stdin,
    ...streamEncryptors,
    outputPath
      ? new WriteFileStream(outputPath)
      : process.stdout,
    () => process.stdout.write('Cyphering succeeded.')
  );
} catch (error) {
  process.stderr.write(error.message);
  process.exit(1);
}
