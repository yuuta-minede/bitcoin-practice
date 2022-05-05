const ripemd160 = require('ripemd160');
const ec = require('elliptic').ec;
const ecdsa = new ec('secp256k1');
const private = require('./private-key')

// private key
const privateKey = private.privateKey()
console.log(privateKey.toString('hex'))

// public key
const keys = ecdsa.keyFromPrivate(privateKey);
const publicKey = keys.getPublic('hex');
console.log(publicKey)

let message = 'hello world';

function Hash(msg) {
  return new ripemd160().update(msg).digest('hex');
}

function createSignature(message, privateKey) {
  const messageHash = Hash(message);
  const privateKeyPair = ecdsa.keyFromPrivate(privateKey)
  const signature = ecdsa.sign(messageHash, privateKeyPair) // digital sign
  return signature
}
// console.log(createSignature(message, privateKey))

function verifySignature(message, publicKey, signature) {
  const messageHash = Hash(message);
  const publicKeyPair = ecdsa.keyFromPublic(publicKey, 'hex');
  const IsVerified = publicKeyPair.verify(messageHash, signature); // confirm propriety of digital sign by pub key
  return IsVerified
}
// console.log(verifySignature(message, privateKey))

function testVerification(publicKey, privateKey, message) {
  const signature = createSignature(message, privateKey);
  console.log(signature.toDER('hex'))
  const IsVerified = verifySignature(message, publicKey, signature);
  console.log(IsVerified)
}

testVerification(publicKey, privateKey, message);

// let wrongPublicKey = '04487bd002b2b61a1bbc89b3c05cebf73039d4722c96877308ee4905c10f155d71f03dca22650a2aea193416dd5071260b3fca82ab5a254163371e5929fb28c0f2';
// testVerification(wrongPublicKey, privateKey, message);
