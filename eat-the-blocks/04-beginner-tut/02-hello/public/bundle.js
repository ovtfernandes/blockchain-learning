const contractABI = [
    {
        "constant": true,
        "inputs": [],
        "name": "hello",
        "outputs": [
            {
                "internalType": "string",
                "name": "",
                "type": "string"
            }
        ],
        "payable": false,
        "stateMutability": "pure",
        "type": "function"
    }
];
const contractAddress = '0x9595f459C5A0DAbEF7be6D7A71b08f6d0A2cC5f4';
const web3 = new Web3('http://localhost:9545');

const helloWorld = new web3.eth.Contract(contractABI, contractAddress);

window.addEventListener('load', () => {
    helloWorld.methods.hello().call()
        .then(result => {
            document.getElementById('hello').innerHTML = result;
        });
});
