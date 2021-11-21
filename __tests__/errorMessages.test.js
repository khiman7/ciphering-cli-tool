const path = require('path');
const { spawn } = require('child_process');

const testErrorMessage = (args, regex) => {
  const filePath = path.join(__dirname, '../ciphering-tool.js');
  const testApp = spawn(
      'node', [filePath, ...args]
    );

  let errorMessage = '';

  testApp.stderr.on('data', data => {
    errorMessage += data.toString();
  });

  testApp.stderr.on('end', () => {
    expect(errorMessage).toMatch(regex);
  });
}

describe('process arguments', () => {
  test('should show MissingConfigArgumentError message', () => {
    const args = ['-i', './input.txt', '-o', './output.txt']

    testErrorMessage(args, /^Missing required config argument?/);
  });

  test('should show FileDoesNotExistError message', () => {
    const args = ['-c', 'C1', '-i', './test.txt', '-o', './output.txt'];

    testErrorMessage(args, /^File ".\/test.txt"?/);
  });

  test('should show FileDoesNotExistError message', () => {
    const args = ['-c', 'C1', '-i', './input.txt', '-o', './test.txt'];

    testErrorMessage(args, /^File ".\/test.txt"?/);
  });

  test('should show NotValidConfigError message', () => {
    const args = ['-c', 'R2_D2!', '-i', './input.txt', '-o', './output.txt'];

    testErrorMessage(args, /^Config you provided "R2_D2!" is not valid?/);
  });
});