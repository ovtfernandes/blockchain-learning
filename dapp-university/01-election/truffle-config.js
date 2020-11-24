require('dotenv').config();
const HDWalletProvider = require('@truffle/hdwallet-provider');

const infuraKey = process.env.APP_TOKEN;
const mnemonic = process.env.MNEMONIC;

module.exports = {
  contracts_build_directory: './src/contracts',
  // See <http://truffleframework.com/docs/advanced/configuration>
  // for more about customizing your Truffle configuration!
  networks: {
    development: {
      host: "127.0.0.1",
      port: 7545,
      network_id: "*" // Match any network id
    },
    ropsten: {
      provider: () => new HDWalletProvider(mnemonic, `https://ropsten.infura.io/v3/${infuraKey}`),
      network_id: 3,
    },
    develop: {
      port: 9545
    },
  }
};
