const App = {
  web3Provider: null,
  contracts: {},
  account: '0x0',

  init: async function() {
    return await App.initWeb3();
  },

  initWeb3: async function() {
    // Case 1 - new metamask present
    if (typeof window.ethereum !== 'undefined') {
      await window.ethereum.enable();
      App.web3Provider = window.ethereum;
    }
    // Case 2 - old metamask present
    else if (typeof window.web3 !== 'undefined') {
      App.web3Provider = window.web3.currentProvider;
    }
    // Case 3 - no metamask present, connect to Ganache
    else {
      App.web3Provider = 'http://localhost:9545';
    }

    window.web3 = new Web3(App.web3Provider);

    return await App.initContract();
  },

  initContract: async function() {
    const electionArtifact = await $.getJSON('Election.json');
    const deploymentKey = Object.keys(
      electionArtifact.networks
    )[0];
    App.contracts.Election = new window.web3.eth.Contract(
        electionArtifact.abi,
        electionArtifact.networks[deploymentKey].address,
    );

    return App.render();
  },

  render: async function() {
    const loader = document.getElementById('loader');
    const content = document.getElementById('content');

    loader.style.display = '';
    content.style.display = 'none';

    const accounts = await window.web3.eth.getAccounts()
    App.account = accounts[0];
    const accAddressP = document.getElementById('accountAddress');
    accAddressP.innerHTML = `Your account: ${App.account}`;

    const candidatesTable = document.getElementById('candidatesResults');
    App.contracts.Election.methods
      .candidatesCount()
      .call()
      .then(async candidatesCount => {
        const rows = [];
        for (let i=1; i<=candidatesCount; i++) {
          const { id, name, voteCount } = await App.contracts.Election.methods.candidates(i).call();
          const row = `<tr> <td>${id}</td> <td>${name}</td> <td>${voteCount}</td> </tr>`;
          rows.push(row);
        }
        candidatesTable.innerHTML = rows.join('');

        loader.style.display = 'none';
        content.style.display = '';
      });
  },

};

window.addEventListener('load', () => {
  App.init();
});
