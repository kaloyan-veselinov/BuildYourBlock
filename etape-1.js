const Block = require("./Block");

const first  = new Block(null     , "First !");
const second = new Block(first.id , "Second :)");
const third  = new Block(second.id, "Vous commencez à voir le principe ?");

// Vos tests ici...

console.log([first, second, third]);
console.log(first.isValid());
console.log(second.isValid());
console.log(third.isValid());
