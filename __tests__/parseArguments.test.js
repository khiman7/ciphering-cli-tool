const parseArguments = require('../src/helpers/parseArguments');
const { DuplicateArgumentsError } = require('../src/errors');

describe('parseArguments function', () => {
  test('should return object with given arguments', () => {
    process.argv = [
      'node', 
      'jest', 
      '-c', 
      'C1-C1-C1', 
      '-i', 
      './input.txt', 
      '-o', 
      './output.txt'
    ];

    const parsedArguments = {
      c: 'C1-C1-C1',
      i: './input.txt',
      o: './output.txt',
    };

    expect(parseArguments()).toEqual(parsedArguments);
  });

  test('should return objects with full named arguments', () => {
    process.argv = [
      'node', 
      'jest', 
      '--config', 
      'C1-C1-C1', 
      '--input', 
      './input.txt', 
      '--output', 
      './output.txt'
    ];

    const parsedArguments = {
      config: 'C1-C1-C1',
      input: './input.txt',
      output: './output.txt',
    };

    expect(parseArguments()).toEqual(parsedArguments);
  });

  test('should throw DuplicateArgumentsError', () => {
    process.argv = [
      'node', 
      'jest', 
      '-c', 
      'C1-C1-C1', 
      '-c',
      'R1-R1-R1',
    ];

    expect(parseArguments)
      .toThrowError(new DuplicateArgumentsError('-c'));
  })
});
