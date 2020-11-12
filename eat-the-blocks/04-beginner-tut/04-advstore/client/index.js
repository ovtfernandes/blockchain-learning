import Web3 from 'web3';
import AdvancedStorageArtifact from '../build/contracts/AdvancedStorage.json';

let web3;
let advancedStorage;

const initWeb3 = () => {
    return new Promise((resolve, reject) => {
        // Case 1 - new metamask present
        if (typeof window.ethereum !== 'undefined') {
            return window.ethereum.enable()
                .then(() => {
                    return resolve(
                        new Web3(window.ethereum)
                    );
                })
                .catch(reject);
        }
        // Case 2 - old metamask present
        if (typeof window.web3 !== 'undefined') {
            return resolve(
                new Web3(window.web3.currentProvider)
            );
        }
        // Case 3 - no metamask present, connect to Ganache
        resolve(new Web3('http://localhost:9545'));
    });
};

const initContract = () => {
    const deploymentKey = Object.keys(
        AdvancedStorageArtifact.networks
    )[0];
    return new web3.eth.Contract(
        AdvancedStorageArtifact.abi,
        AdvancedStorageArtifact
            .networks[deploymentKey]
            .address,
    );
};

const initApp = () => {
    const addDataForm = document.getElementById('addData');
    const addDataInput = document.getElementById('addDataInput');
    const dataSpan = document.getElementById('data');
    let accounts;

    const getData = () => {
        return advancedStorage.methods
            .getAll()
            .call()
            .then(result => dataSpan.innerHTML = result.join(', '));
    };

    web3.eth.getAccounts()
        .then(_accounts => {
            accounts = _accounts;
            return getData();
        });

    addDataForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const data = addDataInput.value;
        advancedStorage.methods
            .add(data)
            .send({ from: accounts[0] })
            .then(() => {
                addDataInput.value = '';
                return getData();
            });
    });
};

window.addEventListener('load', () => {
    initWeb3()
        .then(_web3 => {
            web3 = _web3;
            advancedStorage = initContract();
            initApp();
        })
        .catch(e => console.log(e.message));
});
