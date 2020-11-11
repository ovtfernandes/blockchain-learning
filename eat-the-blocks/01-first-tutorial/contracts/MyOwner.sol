pragma solidity ^0.5.0;

contract MyOwner {
  address owner;

  constructor() public {
    owner = msg.sender;
  }

  function getOwner() public view returns (address) {
    return owner;
  }
}
