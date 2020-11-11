const MyOwner = artifacts.require("MyOwner");

module.exports = function (deployer) {
  deployer.deploy(MyOwner);
};
