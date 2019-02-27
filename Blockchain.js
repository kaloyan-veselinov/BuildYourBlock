const crypto = require('crypto');

module.exports = class Blockchain {
  constructor() {
    this.chain = [];
  }

  add(block) {
    this.chain.push(block);
  }

  last() {
    if (this.chain.length > 0) {
      return this.chain[this.chain.length - 1];
    } else {
      throw new Error("La blockchain est vide");
    }
  }

  isValid() {
    let valid = true;
    let previous = null;
    let i = 0;
    while (i<this.chain.length && valid){
      valid = this.chain[i].isValid(previous);
      previous = this.chain[i];
      i++;
    }
    return valid;
  }
}
