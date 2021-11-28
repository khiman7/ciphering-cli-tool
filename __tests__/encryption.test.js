const path = require('path');
const { spawn } = require('child_process');

const testTextEncryption = (config, text, expectedText) => {
  const filePath = path.join(__dirname, '../ciphering-tool.js');
  const cp = spawn('node', [filePath, '-c', config]);
  const buf = Buffer.from(text, 'utf-8');

  let encryptedText = '';

  cp.stdin.write(buf);
  cp.stdin.end();

  cp.stdout.on('data', data => {
    encryptedText += data.toString();
  });

  cp.stdout.on('end', () => {
    expect(encryptedText).toBe(expectedText);
  });
};

const parseArguments = jest
  .fn()
  .mockImplementationOnce(() => ({
    config: 'C1-C1-R0-A',
  }))
  .mockImplementationOnce(() => ({
    config: 'C1-C0-A-R1-R0-A-R0-R0-C1-A',
  }))
  .mockImplementationOnce(() => ({
    config: 'A-A-A-R1-R0-R0-R0-C1-C1-A',
  }))
  .mockImplementationOnce(() => ({
    config: 'C1-R1-C0-C0-A-R0-R1-R1-A-C1',
  }));

describe('text encryption', () => {
  test('should encrypt text correctly', () => {
    const args = parseArguments();

    testTextEncryption(
      args.config, 
      'This is secret. Message about "_" symbol!',
      'Myxn xn nbdobm. Tbnnfzb ferlm "_" nhteru!',
    );
  });

  test('should encrypt text correctly', () => {
    const args = parseArguments();

    testTextEncryption(
      args.config, 
      'This is secret. Message about "_" symbol!',
      'Vhgw gw wkmxkv. Ckwwoik onauv "_" wqcnad!',
    );
  });

  test('should encrypt text correctly', () => {
    const args = parseArguments();

    testTextEncryption(
      args.config,
      'This is secret. Message about "_" symbol!',
      'Hvwg wg gsqfsh. Asggous opcih "_" gmapcz!',
    );
  });

  test('should encrypt text correctly', () => {
    const args = parseArguments();

    testTextEncryption(
      args.config,
      'This is secret. Message about "_" symbol!',
      'This is secret. Message about "_" symbol!',
    );
  });
});
