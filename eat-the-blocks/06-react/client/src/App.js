import React, { useEffect, useState } from 'react';

import getWeb3 from "./getWeb3";
import SimpleStorageContract from "./contracts/SimpleStorage.json";

function App() {
    const [storageValue, setStorageValue] = useState(0);
    const [web3, setWeb3] = useState(null);
    const [accounts, setAccounts] = useState(null);
    const [contract, setContract] = useState(null);

    useEffect(() => {
        (async function() {
            try {
                const web3Instance = await getWeb3();
          
                const accountsResponse = await web3Instance.eth.getAccounts();
          
                const networkId = await web3Instance.eth.net.getId();
                const deployedNetwork = SimpleStorageContract.networks[networkId];
                const instance = new web3Instance.eth.Contract(
                  SimpleStorageContract.abi,
                  deployedNetwork && deployedNetwork.address,
                );
                
                setWeb3(web3Instance);
                setAccounts(accountsResponse);
                setContract(instance);
            } catch (error) {
                alert(
                    'Failed to load web3, accounts, or contract. Check console for details.',
                );
                console.error(error);
            }
        })();
    }, []);

    useEffect(() => {
        if (web3 && accounts && contract) {
            (async function() {
                await contract.methods.set(5).send({ from: accounts[0] });

                const response = await contract.methods.get().call();

                setStorageValue(response);
            })()
        }
    }, [web3, accounts, contract]);

    return !web3
        ? (
            <div>Loading Web3, accounts, and contract...</div>
        )
        : (
            <div className="App">
                <h1>Smart Contract Example</h1>
                <p>
                    If your contracts compiled and migrated successfully, below will show
                    a stored value of 5 (by default).
                </p>
                <p>
                    Try changing the value stored on <strong>line 27</strong> of App.js.
                </p>
                <div>The stored value is: {storageValue}</div>
            </div>
        );
}

export default App;
