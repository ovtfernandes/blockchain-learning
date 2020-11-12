const contractABI = [
    {
        "constant": true,
        "inputs": [],
        "name": "data",
        "outputs": [
            {
                "internalType": "string",
                "name": "",
                "type": "string"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "internalType": "string",
                "name": "_data",
                "type": "string"
            }
        ],
        "name": "set",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "get",
        "outputs": [
            {
                "internalType": "string",
                "name": "",
                "type": "string"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    }
];
const contractAddress = '0x9595f459C5A0DAbEF7be6D7A71b08f6d0A2cC5f4';
const web3 = new Web3('http://localhost:9545');

const simpleStorage = new web3.eth.Contract(contractABI, contractAddress);

window.addEventListener('load', () => {
    const setDataForm = document.getElementById('setData');
    const setDataInput = document.getElementById('setDataInput');
    const dataSpan = document.getElementById('data');
    let accounts;

    web3.eth.getAccounts()
        .then(_accounts => accounts = _accounts);
    
    const getData = () => {
        simpleStorage.methods.data().call()
            .then(result => dataSpan.innerHTML = result);
    };

    getData();

    setDataForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const data = setDataInput.value;
        simpleStorage.methods.set(data)
            .send({ from: accounts[0] })
            .then(() => {
                setDataInput.value = '';
                getData();
            });
    });
});
