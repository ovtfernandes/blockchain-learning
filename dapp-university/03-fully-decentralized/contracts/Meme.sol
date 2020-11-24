// SPDX-License-Identifier: MIT
pragma solidity ^0.5.0;

contract Meme {
  string memePath;

  function set(string memory _memePath) public {
    memePath = _memePath;
  }

  function get() view public returns (string memory) {
    return memePath;
  }
}
