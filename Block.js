function generateId() {
  return Math.floor(Math.random()*1000000000);
}

module.exports = class Block {
  constructor(previous, data) {
    this.previous = previous;
    this.data = data;
    this.id = generateId();
    this.date = new Date();
  }
}
