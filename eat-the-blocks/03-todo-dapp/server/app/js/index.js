import Web3 from 'web3';
import TruffleContract from '@truffle/contract';

import artifact from '../../../build/contracts/ToDo.json';

const provider = new Web3.providers.HttpProvider('http://localhost:9545');

const abstraction = TruffleContract(artifact);
abstraction.setProvider(provider);

const network = Object.keys(artifact.networks)[0];
const address = artifact.networks[network].address;
console.log(address);
