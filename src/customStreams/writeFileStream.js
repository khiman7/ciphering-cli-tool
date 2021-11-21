const { Writable } = require('stream');
const fs = require('fs');

class WriteFileStream extends Writable {
  constructor(filename) {
    super();
    this.filename = filename;
    this.fd = fs.openSync(filename, 'a');
  }

  _write(chunk, encoding, callback) {
    fs.write(this.fd, chunk, callback);
  }
  
  _destroy(err, callback) {
    if (this.fd) {
      fs.close(this.fd, (er) => callback(er || err));
    } else {
      callback(err);
    }
  }
}

module.exports = WriteFileStream;
