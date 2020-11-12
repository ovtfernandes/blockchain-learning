const SimpleSmartContract = artifacts.require("SimpleSmartContract");

contract("SimpleSmartContract", function (/* accounts */) {
  it("Should deploy smart contract properly", async function () {
    const simpleSmartContract = await SimpleSmartContract.deployed();
    return assert(simpleSmartContract.address !== '');
  });
});
