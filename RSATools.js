const NodeRSA = require('node-rsa');

module.exports = class RSATools {

  // Retourne la clé publique associée à la clé privée
  static privateToPublic(privateKeyString) {
    let privateKey = new NodeRSA(privateKeyString);
    return privateKey.exportKey("public");
  }

  // Retourne la signature du message par la clé privée
  // https://github.com/rzcoder/node-rsa#signingverifying
  static sign(msg, privateKeyString) {
    let privateKey = new NodeRSA(privateKeyString);
    return privateKey.sign(msg);
  }

  // Vérifie la signature du message par la clé publique
  // Retourne un booléen à true si la signature est bonne
  // https://github.com/rzcoder/node-rsa#signingverifying
  static verify(msg, signature, publicKeyString) {
    let publicKey = new NodeRSA(publicKeyString);
    return publicKey.verify(msg, signature); 
  }
}
