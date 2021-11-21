const fs = require('fs');
const { Readable } = require('stream');

class ReadFileStream extends Readable {
  constructor(filename) {
    super();
    this.filename = filename;
    this.fd = fs.openSync(filename, 'r');
  }

  _read(size) {
    const buffer = Buffer.alloc(size);

    fs.read(this.fd, buffer, 0, size, null, (err, bytesRead) => {
      if (err) {
        this.destroy(err);
      } else {
        this.push(bytesRead > 0 ? buffer.slice(0, bytesRead) : null);
      }
    })
  }

  _destroy(err, callback) {
    if (this.fd) {
      fs.close(this.fd, (er) => callback(er || err));
    } else {
      callback(err);
    }
  }
}

module.exports = ReadFileStream;
