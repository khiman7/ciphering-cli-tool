const path = require('path');
const { spawn } = require('child_process');

describe('process arguments', () => {
  test('should show MissingConfigArgumentError message', () => {
    const filePath = path.join(__dirname, '../ciphering-tool.js');
    const testApp = spawn(
      'node', [filePath, '-i', './input.txt', '-o', './output.txt']
    );

    let res = '';

    testApp.stderr.on('data', data => {
      res += data.toString();
    });

    testApp.stderr.on('end', () => {
      expect(res).toMatch(/^Missing required config argument?/);
    });
  });

  test('should show FileDoesNotExistError message', () => {
    const filePath = path.join(__dirname, '../ciphering-tool.js');
    const testApp = spawn(
      'node', [filePath, '-c', 'C1', '-i', './test.txt', '-o', './output.txt']
    );

    let res = '';

    testApp.stderr.on('data', data => {
      res += data.toString();
    });

    testApp.stderr.on('end', () => {
      expect(res).toMatch(/^File ".\/test.txt"?/);
    });
  });

  test('should show FileDoesNotExistError message', () => {
    const filePath = path.join(__dirname, '../ciphering-tool.js');
    const testApp = spawn(
      'node', [filePath, '-c', 'C1', '-i', './input.txt', '-o', './test.txt']
    );

    let res = '';

    testApp.stderr.on('data', data => {
      res += data.toString();
    });

    testApp.stderr.on('end', () => {
      expect(res).toMatch(/^File ".\/test.txt"?/);
    });
  });

  test('should show NotValidConfigError message', () => {
    const filePath = path.join(__dirname, '../ciphering-tool.js');
    const testApp = spawn(
      'node', [filePath, '-c', 'R2_D2!', '-i', './input.txt', '-o', './output.txt']
    );

    let res = '';
      
    testApp.stderr.on('data', data => {
      res += data.toString();
    });

    testApp.stderr.on('end', () => {
      expect(res).toMatch(/^Config you provided "R2_D2!" is not valid?/);
    });
  });
});