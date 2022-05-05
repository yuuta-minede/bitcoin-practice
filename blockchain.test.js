const blockChain = require('./blockchan');
const bitcoin = new blockChain();

// bitcoin.createNewBlock(2389, '00IAIJIJUIGGUGUYG', '09IAIJHIFYFTUFIFDIJU')
// bitcoin.createNewBlock(3463, "00IAIJIJUIGGUHIHH", "0IGUGIGITUFIFDIJU");

bitcoin.createNewTransaction(
  100, "ALICE090970FYFFYFYFIF","BOB797789790JFJFFGFJF"
)

// bitcoin.createNewBlock(4124, "00IAIJIJUDRTDDYD", "09IAIJHIFYFTUHIUGIUG");
// const previousBlockHash = "0AA0IAIJIJUIGGUGUYG";
// const currentBlockData = [
//   {
//     amount: 10,
//     sender: "ALICE090970FYFFYFYFIF",
//     recipient: "BOB797789790JFJFFGFJF"
//   },
//   {
//     amount: 30,
//     sender: "ALICGHIUGUGOOIGODYGDHFD",
//     recipient: "BOBTYSHGHOUHOHOHOHOHO"
//   },
//   {
//     amount: 200,
//     sender: "ALICEHJGUGUTETEEUUCVVUVUV",
//     recipient: "BOBGIUGIUGIUDRTESREAREUY"
//   }
// ];

// const nonce = bitcoin.proofOfWork(previousBlockHash, currentBlockData);
// console.log(bitcoin.hashBlock(previousBlockHash, currentBlockData, nonce));

function mining(bitcoin) {
  const lastBlock = bitcoin.getLastBlock();

  const previousBlockHash = lastBlock["hash"];

  const currentBlockData = {
    transactions: bitcoin.pendingTransactions,
    index: lastBlock["index"] + 1
  };

  const nonce = bitcoin.proofOfWork(previousBlockHash, currentBlockData);

  const blockHash = bitcoin.hashBlock(
    previousBlockHash,
    currentBlockData,
    nonce
  );
  bitcoin.createNewBlock(nonce, previousBlockHash, blockHash);
}

mining(bitcoin);

bitcoin.createNewTransaction(
  200,
  "ALICE090970FYFFYFYFIF",
  "BOB797789790JFJFFGFJF"
);

mining(bitcoin);

bitcoin.createNewTransaction(
  300,
  "ALICE090970FYFFYFYFIF",
  "BOB797789790JFJFFGFJF"
);

mining(bitcoin);

console.log(bitcoin);
