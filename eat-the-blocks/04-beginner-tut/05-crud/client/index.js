import Web3 from 'web3';
import CrudArtifact from '../build/contracts/Crud.json';

let web3;
let crud;

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
        CrudArtifact.networks
    )[0];
    return new web3.eth.Contract(
        CrudArtifact.abi,
        CrudArtifact
            .networks[deploymentKey]
            .address,
    );
};

const initApp = () => {
    const createForm = document.getElementById('create');
    const nameInput = document.getElementById('name');
    const createResultP = document.getElementById('create-result');

    const readForm = document.getElementById('read');
    const readIdInput = document.getElementById('read-id');
    const readResultP = document.getElementById('read-result');

    const editForm = document.getElementById('edit');
    const editIdInput = document.getElementById('edit-id');
    const editNameInput = document.getElementById('edit-name');
    const editResultP = document.getElementById('edit-result');

    const deleteForm = document.getElementById('delete');
    const deleteIdInput = document.getElementById('delete-id');
    const deleteResultP = document.getElementById('delete-result');

    let accounts;

    web3.eth.getAccounts()
        .then(_accounts => {
            accounts = _accounts;
        });

    createForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const name = nameInput.value;
        crud.methods
            .create(name)
            .send({ from: accounts[0] })
            .then(() => {
                nameInput.value = '';
                createResultP.innerHTML = `New user ${name} was successfully created!`;
            })
            .catch(() => {
                createResultP.innerHTML = 'Oops... There was an error while trying to create a new user...';
            });
    });

    readForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const id = readIdInput.value;
        crud.methods
            .read(id)
            .call()
            .then(result => {
                readIdInput.value = null;
                readResultP.innerHTML = `Id: ${result[0]} Name: ${result[1]}`;
            })
            .catch(() => {
                readResultP.innerHTML = `Oops... There was an error while trying to read user ${id}...`;
            });
    });

    editForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const id = editIdInput.value;
        const name = editNameInput.value;
        crud.methods
            .update(id, name)
            .send({ from: accounts[0] })
            .then(() => {
                editIdInput.value = null;
                editNameInput.value = '';
                editResultP.innerHTML = `Changed name of user ${id} to ${name}`;
            })
            .catch(() => {
                editResultP.innerHTML = `Oops... There was an error while trying to update user ${id}...`;
            });
    });

    deleteForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const id = deleteIdInput.value;
        crud.methods
            .destroy(id)
            .send({ from: accounts[0] })
            .then(() => {
                deleteIdInput.value = null;
                deleteResultP.innerHTML = `Deleted user ${id}`;
            })
            .catch(() => {
                deleteResultP.innerHTML = `Oops... There was an error while trying to delete user ${id}...`;
            });
    });
};

window.addEventListener('load', () => {
    initWeb3()
        .then(_web3 => {
            web3 = _web3;
            crud = initContract();
            initApp();
        })
        .catch(e => console.log(e.message));
});
