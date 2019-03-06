const Block = require("./Block");
const Blockchain = require("./Blockchain");

const DIFFICULTY = 5;

const first  = new Block(null     , "First !");
first.miner(DIFFICULTY);
const second = new Block(first.id , "Second :)");
second.miner(DIFFICULTY);
const third  = new Block(second.id, "Vous commencez à voir le principe ?");
third.miner(DIFFICULTY);

const blockchain = new Blockchain();

blockchain.add(first);
blockchain.add(second);
blockchain.add(third);

console.log("isValid:", blockchain.isValid(DIFFICULTY));

second.data = "Hack";

console.log("Un hacker passe par ici...");
console.log("isValid:", blockchain.isValid(DIFFICULTY));

second.data = "Hack moins grossier";
second.id = second.getHash();

console.log("Et un autre par là...");
console.log("isValid:", blockchain.isValid(DIFFICULTY));

second.data = "Hack moins grossier";
second.id = second.getHash();

third.previous = second.id;
third.id = third.getHash();

console.log("Lui, il est motivé...");
console.log("isValid:", blockchain.isValid(DIFFICULTY));

// console.log(blockchain);
