import Web3 from 'web3';

const getWeb3 = (avoidBrowserWallet) => new Promise((resolve, reject) => {
    window.addEventListener('load', async () => {
        if (avoidBrowserWallet || !window.web3) {
            const provider = new Web3.providers.HttpProvider('http://127.0.0.1:9545');
            console.log('No web3 instance injected, using Local web3.');
            resolve(new Web3(provider));
        }
        else if (window.ethereum) {
            const web3 = new Web3(window.ethereum);
            try {
                await window.ethereum.enable();
                resolve(web3);
            } catch (error) {
                reject(error);
            }
        }
        else {
            resolve(window.web3);
        }
    });
});

export default getWeb3;
