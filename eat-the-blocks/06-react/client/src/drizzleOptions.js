import SimpleStorage from './contracts/SimpleStorage.json';

const options = {
    contracts: [SimpleStorage],
    web3: {
        fallback: {
            type: 'ws',
            url: 'ws://localhost:9545',
        },
    },
};

export default options;
