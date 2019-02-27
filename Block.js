const crypto = require('crypto');

const NOMBRE_ZERO = 5;

function getHash(data) {
  return crypto.createHash('sha256').update(data, 'utf8').digest('hex');
}

module.exports = class Block {
  constructor(previous, data) {
    this.previous = previous;
    this.data = data;
    this.date = new Date();
    this.nonce = 1;
    this.id = this.generateId();
  }

  stringify(){
    return this.data.concat(this.date, this.previous);
  }

  generateId(){
    return getHash(this.stringify());
  }

  isIdValid(){
    return parseInt(this.id.substring(0, NOMBRE_ZERO)) === 0;
  }

  isPreviousIdValid(previous) {
    return (previous===null) ? this.previous===null : this.previous.localeCompare(previous) === 0;
  }

  isValid(previous) {
    return this.isIdValid() && this.isPreviousIdValid(previous);
  }

  mine(){
    do{

    } while(true);
  } 
}