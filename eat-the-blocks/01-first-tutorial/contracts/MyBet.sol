// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.8.0;

contract Bet {
  uint betType;

  constructor(uint _betType) public {
    betType = _betType;
  }
}

contract MyBet is Bet {
  constructor(uint _betType) Bet(_betType) public {
  }

  function getBetType() public view returns (uint) {
    return betType;
  }
}
