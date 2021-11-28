const { validateConfig } = require('../src/helpers/validators');

const parseArguments = jest
  .fn()
  .mockImplementationOnce(() => ({
    config: 'C1-R1-A',
    input: './input.txt',
    output: './output.txt',
  }))
  .mockImplementationOnce(() => ({
    config: 'C5-R1-A',
    input: './input.txt',
    output: './output.txt',
  }))
  .mockImplementationOnce(() => ({
    config: 'C1-R0-A0',
    input: './input.txt',
    output: './output.txt',
  }));

describe('validation functions', () => {
  test('should return true', () => {
    const args = parseArguments();

    expect(validateConfig(args.config)).toBe(true);
  });

  test('should return false', () => {
    const args = parseArguments();

    expect(validateConfig(args.config)).toBe(false);
  });

  test('should return false', () => {
    const args = parseArguments();

    expect(validateConfig(args.config)).toBe(false);
  });
});
