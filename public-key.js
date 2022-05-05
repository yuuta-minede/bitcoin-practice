const ec = require('elliptic').ec;
const ecdsa = new ec('secp256k1');
const private = require('./private-key')

const keys = ecdsa.keyFromPrivate(private.privateKey());
exports.publicKey = keys.getPublic('hex');
// console.log(keys.getPublic('hex'))
