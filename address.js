const sha256 = require("js-sha256");
const ripemd160 = require("ripemd160");
base58 = require('bs58');
const public = require('./public-key')

// double hash public key
let hash = sha256(Buffer.from(public.publicKey, 'hex'));
let publicKeyHash = new ripemd160().update(Buffer.from(hash, 'hex')).digest();
// console.log(publicKeyHash)

const step1 = Buffer.from('00' + publicKeyHash.toString('hex'), 'hex'); // add 00 head of publicKeyHash
const step2 = sha256(step1); // sha256
const step3 = sha256(Buffer.from(step2, 'hex')); // hexadecimal number
const checksum = step3.substring(0, 8); // head 8 character
const step4 = step1.toString('hex') + checksum; // add 8 character to hexadecimal number
const address = base58.encode(Buffer.from(step4, 'hex')); // encode

console.log(address)
