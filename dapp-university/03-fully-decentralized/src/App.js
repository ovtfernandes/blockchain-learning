import React, { useState } from 'react';

import ipfsClient from 'ipfs-http-client';
const ipfs = ipfsClient({ host: 'ipfs.infura.io', port: 5001, protocol: 'https' });

function App() {
    const [buffer, setBuffer] = useState(null);
    const [memePath, setMemePath] = useState('QmPL8ZSiukWKs2DKTL5bogqeVKdbpv1rZSUyChQTTEE9cU');

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
