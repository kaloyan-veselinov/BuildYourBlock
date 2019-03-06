const Block = require("./Block");
const Blockchain = require("./Blockchain");

const first  = new Block(null     , "First !");
const second = new Block(first.id , "Second :)");
const third  = new Block(second.id, "Vous commencez à voir le principe ?");

const blockchain = new Blockchain();

blockchain.add(first);
blockchain.add(second);
blockchain.add(third);

console.log("isValid:", blockchain.isValid());

second.data = "Hack";

console.log("Un hacker passe par ici");
console.log("isValid:", blockchain.isValid());

second.data = "Hack moins grossier";
second.id = second.getHash(;)

console.log("Et un autre par là");
console.log("isValid:", blockchain.isValid());
