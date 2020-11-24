import React, { useState } from 'react';

function App() {
    const [buffer, setBuffer] = useState(null);

    function captureFile(event) {
        event.preventDefault();
        const [file] = event.target.files;
        const reader = new FileReader();
        reader.readAsArrayBuffer(file);
        reader.onloadend = () => {
            setBuffer(Buffer(reader.result));
        };
    }

    function onSubmit(event) {
        event.preventDefault();
    }

    return (
        <div>
            <nav className="navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow">
                <a
                    className="navbar-brand col-sm-3 col-md-2 mr-0"
                >
                    Meme of the Day
                </a>
            </nav>
            <div className="container-fluid mt-5">
                <div className="row">
                    <main role="main" className="col-lg-12 d-flex text-center">
                        <div className="content mr-auto ml-auto">
                            {meme && <img src={meme} alt="meme" />}
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
