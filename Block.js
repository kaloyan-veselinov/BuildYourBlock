const { BlockTool } = require('./tools');

// Je mets ça là ... au cas où ...
function generateId() {
  return Math.floor(Math.random()*1000000000);
}

// Vous n'avez pas à comprendre BlockTool.
// Cette class vient en support du sujet.
// Si vous avez besoin de débugguer,
// vous pouvez commenter le `extends BlockTool`.
module.exports = class Block extends BlockTool {

  // Complétez le constructeur
  constructor(previous, data) {
    super()
    this.previous = previous;
    //...
  }

  // Retourne l'identifiant du block en le calculant depuis les données
  getHash() {}

  // Retourne un boolean qui indique si le block est valide
  isValid(
    DIFFICULTY // Utile à l'étape 2
  ) {
    return true;
  }

  // Utile à l'étape 2
  miner(DIFFICULTY) {}
}
