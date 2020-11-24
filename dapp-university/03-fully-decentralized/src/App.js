import React, { useEffect, useState } from 'react';
import ipfsClient from 'ipfs-http-client';

import getWeb3 from './getWeb3';

const ipfs = ipfsClient({ host: 'ipfs.infura.io', port: 5001, protocol: 'https' });

function App() {
    const [buffer, setBuffer] = useState(null);
    const [memePath, setMemePath] = useState('QmPL8ZSiukWKs2DKTL5bogqeVKdbpv1rZSUyChQTTEE9cU');
    const [account, setAccount] = useState('');

    useEffect(() => {
        (async function() {
            window.web3 = await getWeb3();
            const accounts = await window.web3.eth.getAccounts();
            setAccount(accounts[0]);
        })();
    }, []);

    function captureFile(event) {
        event.preventDefault();
        const [file] = event.target.files;
        const reader = new FileReader();
        reader.readAsArrayBuffer(file);
        reader.onloadend = () => {
            setBuffer(Buffer(reader.result));
        };
    }

    async function onSubmit(event) {
        event.preventDefault();
        const result = await ipfs.add(buffer);
        setMemePath(result.path);
    }

    return (
        <div>
            <nav className="navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow">
                <span
                    className="navbar-brand col-sm-3 col-md-2 mr-0"
                >
                    Meme of the Day
                </span>
                <ul className="navbar-nav px-3">
                    <li className="nav-item text-nowrap d-none d-sm-none d-sm-block">
                        <small className="text-white">{account}</small>
                    </li>
                </ul>
            </nav>
            <div className="container-fluid mt-5">
                <div className="row">
                    <main role="main" className="col-lg-12 d-flex text-center">
                        <div className="content mr-auto ml-auto">
                            {memePath && <img width="100%" src={`https://gateway.ipfs.io/ipfs/${memePath}`} alt="meme" />}
                            <h2>Change Meme</h2>
                            <form onSubmit={onSubmit}>
                                <input type="file" onChange={captureFile} />
                                <input type="submit" />
                            </form>
                        </div>
                    </main>
                </div>
            </div>
        </div>
    );
}

export default App;
