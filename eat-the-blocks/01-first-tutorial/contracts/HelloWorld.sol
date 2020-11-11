pragma solidity ^0.5.0;

contract HelloWorld {
  string message;

  constructor(string memory myMessage) public {
    message = myMessage;
  }

  function getMessage() public view returns (string memory) {
    return message;
  }
}
