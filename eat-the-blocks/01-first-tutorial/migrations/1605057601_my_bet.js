const MyBet = artifacts.require("MyBet");

module.exports = function (deployer) {
  deployer.deploy(MyBet, 15);
};
