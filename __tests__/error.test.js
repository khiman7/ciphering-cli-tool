const {
  NotValidConfigError,
  FileDoesNotExistError,
  MissingConfigArgumentError,
  NotValidAlgorithmError,
} = require('../src/errors');

describe('errors', () => {
  test('should throw NotValidConfigError', () => {
    const error = new NotValidConfigError('R2-D2');
    const stubMethod = () => { throw error; };

    expect(stubMethod).toThrowError(new NotValidConfigError('R2-D2'));
  });
  test('should throw FileDoesNotExistError', () => {  
    const error = new FileDoesNotExistError('./test.txt');
    const stubMethod = () => { throw error; }

    expect(stubMethod).toThrowError(new FileDoesNotExistError('./test.txt'));
  });
  test('should throw MissingConfigArgumentError', () => {
    const error = new MissingConfigArgumentError();
    const stubMethod = () => { throw error; };

    expect(stubMethod).toThrowError(new MissingConfigArgumentError())
  });
  test('should throw NotValidAlgorithmError', () => {
    const error = new NotValidAlgorithmError('enigma');
    const stubMethod = () => { throw error; };

    expect(stubMethod).toThrowError(new NotValidAlgorithmError('enigma'));
  });
});
