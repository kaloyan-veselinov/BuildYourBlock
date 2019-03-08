const { BlockTool } = require('./tools');
const crypto = require('crypto');

// Je mets ça là ... au cas où ...
function generateId() {
  return Math.floor(Math.random()*1000000000);
}

function hash(data) {
  return crypto.createHash('sha256').update(data, 'utf8').digest('hex');
}

// Vous n'avez pas à comprendre BlockTool.
// Cette class vient en support du sujet.
// Si vous avez besoin de débugguer,
// vous pouvez commenter le `extends BlockTool`.
module.exports = class Block extends BlockTool {

  // Complétez le constructeur
  constructor(previous, data) {
    super() // Obligatoire car on hérite de BlockTool
    // Le mot clé `this` permet d'accèder aux propriétés de l'object depuis ses méthodes.
    this.previous = previous;
    this.data = data;
    this.date = new Date();
    this.id = this.getHash();
    this.nonce = 0;
  }

  stringify(){
    return this.data.concat(this.date, this.previous, this.nonce);
  }
  // Retourne l'identifiant du block en le calculant depuis les données
  getHash() {
    return hash(this.stringify());
  }

  // Retourne un boolean qui indique si le block est valide
  isValid(
    DIFFICULTY // Utile à l'étape 2
  ) {
    let prefix = "0".repeat(DIFFICULTY);
    return this.id === this.getHash() && this.id.startsWith(prefix);
  }

  // Utile à l'étape 2
  miner(DIFFICULTY) {
    while(!this.isValid(DIFFICULTY)){
      this.nonce++;
      this.id = this.getHash();
    }
  }
}
