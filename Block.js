const crypto = require('crypto');

function getHash(data) {
  return crypto.createHash('sha256').update(data, 'utf8').digest('hex');
}

module.exports = class Block {
  constructor(previous, data) {
    this.previous = previous;
    this.data = data;
    this.date = new Date();
    this.id = this.generateId();
  }

  stringify(){
    return this.data.concat(this.date, this.previous);
  }

  generateId(){
    return getHash(this.stringify());
  }
}
