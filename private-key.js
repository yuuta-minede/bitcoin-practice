const secureRandom = require('secure-random')

// revise
const max = Buffer.from(
  "FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFEBAAEDCE6AF48A03BBFD25E8CD0364140",
  "hex"
);

let Isinvalid = true;

exports.privateKey = function () {
  let privateKey;
  while (Isinvalid) {
    privateKey = secureRandom.randomBuffer(32) // 32byte binary
    if (Buffer.compare(max, privateKey) === 1) {
      Isinvalid = false
    }
  }
  // console.log(privateKey) // 32byte binary
  // console.log(privateKey.toString('hex')) // hexadecimal number
  return privateKey
}
// privateKey()
