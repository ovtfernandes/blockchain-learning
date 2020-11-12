const contractABI = [];
const contractAddress = '0x9595f459C5A0DAbEF7be6D7A71b08f6d0A2cC5f4';
const web3 = new Web3('http://localhost:9545');

const simpleSmartContract = new web3.eth.Contract(contractABI, contractAddress);
console.log(simpleSmartContract);

web3.eth.getAccounts()
    .then(console.log);
