const crypto = require('crypto');

const RSATools = require('./RSATools');

function hash(data) {
  return crypto.createHash('sha256').update(data, 'utf8').digest('hex');
}

// Représente une transaction ou un chèque.
// Souvent abrégé en tx quand passé en variable.
class Transaction {

  // @params inputs : un tableau de Input
  // @params outputs : un tableau de Output
  constructor(
    inputs,
    outputs
  ) {
    this.inputs = inputs;
    this.outputs = outputs;
    this.id = this.getHash();
  }

  // Retourne le hash du Tx : hash des inputs + hash des outputs
  getHash() {
    const hashInputs = this.inputs.map((input) => {return input.hash;}).join('');
    const hashOutputs = this.outputs.map((output) => {return output.hash;}).join('');
    return hashInputs.concat(hashOutputs);
  }
}

class Input {
  // @params tx : transaction dans laquelle est le Output que j'utilise
  // @params index : index du Output dans le outputs de la transaction
  // @params signature : signature du destinataire du Output
  constructor(tx, index, signature = undefined) {
    this.tx = tx;
    this.index = index;
    this.signature = signature;
  }

  stringify(){
    return this.tx.id.concat(this.index);
  }

  // Calcule la signature : tx.id + index
  sign(privateKeyString) {
    this.signature = RSATools.sign(this.stringify(), privateKeyString);
  }

  // Retourne le hash du Input : tx.id + index
  getHash() {
    return hash(this.stringify())
  }

  // Retourne le montant de l'output utilisé
  montant() {
    return this.tx.outputs[this.index].montant;
  }
}

class Output {
  constructor(montant, destinataire) {
    this.montant = montant;
    this.destinataire = destinataire;
  }

  stringify(){
    return this.destinataire.concat(this.montant);
  }

  // Retourne le hash du Output : montant + destinataire
  getHash() {
    return hash(this.stringify());
  }
}

// Construit une transaction envoyant montant à destinataire.
// Retourne la transaction
function buildSimpleTransaction(
  privateKeyStringSender,
  publicKeyStringDestinataire,
  montant,
  unspentOutputs
) {

  const publicKeyStringSender = RSATools.privateToPublic(privateKeyStringSender);
  const unspentOutputsForMontant = calcUnspentOutputsForMontant(montant, unspentOutputs, publicKeyStringSender);

  const inputs = unspentOutputsForMontant.map((unspentOutput) => {
    // transformez un unspentOutput en input
    return new Input(unspentOutput.tx, unspentOutput.index);
  });

  const sommeInputs = inputs.reduce((somme, input) => {
    return somme + input.montant();
  }, 0);

  const outputs = [new Output(montant, publicKeyStringDestinataire), new Output(sommeInputs-montant, publicKeyStringSender)];

  return new Transaction(inputs, outputs);
}

module.exports = {
  Transaction,
  Input,
  Output,
  buildSimpleTransaction
}


// Sélection des unspentOutputs m'appartenant jusqu'à atteindre le montant souhaité
function calcUnspentOutputsForMontant(montant, unspentOutputs, publicKeyStringSender) {
  let unspentOutputsForMontant = [];
  let valueUnspentOutputsForMontant = 0;

  for (let i = 0; i < unspentOutputs.length; i++) {
    const unspentOutput = unspentOutputs[i];
    const output = unspentOutput.tx.outputs[unspentOutput.index];

    // Je ne sélectionne que les transactions qui m'appartiennent
    if(output.destinataire === publicKeyStringSender) {
      unspentOutputsForMontant.push(unspentOutput);
      valueUnspentOutputsForMontant += output.montant;

      if (valueUnspentOutputsForMontant >= montant) {
        // Quand j'atteind le montant souhaité, j'arrête.
        return unspentOutputsForMontant;
      }
    }
  }

  console.log(unspentOutputsForMontant);

  // Quand on n'a pas assez d'argent, on lance une exception
  throw new Error("Vous n'avez pas assez.");
}
