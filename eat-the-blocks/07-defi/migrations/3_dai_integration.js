const Dai = artifacts.require("Dai");
const DaiIntegration = artifacts.require("DaiIntegration");

module.exports = async function (deployer, _network, accounts) {
  const dai = await Dai.deployed();
  await deployer.deploy(DaiIntegration, dai.address);
  const daiIntegration = await DaiIntegration.deployed();
  await dai.faucet(daiIntegration.address, 100);
  await daiIntegration.foo(accounts[1], 100);

  const balance0 = await dai.balanceOf(daiIntegration.address);
  const balance1 = await dai.balanceOf(accounts[1]);

  console.log(balance0.toString(), balance1.toString());

  // 1. Use Kovan faucet to get some Kovan ether
  // 2. Use Oasis interface to get some Dai
  // 3. migration script: deploy you smart contract (DaiIntegration)
  // 4. send this smart contract some Dai
  // 5. execute the foo() function of your smart contract
};
