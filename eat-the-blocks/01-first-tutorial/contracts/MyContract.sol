// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.8.0;

contract MyBaseContract {
  uint innerVal = 100;

  function innerAdd10(uint val) public pure returns (uint) {
    return val + 10;
  }
}

contract MyContract is MyBaseContract {
  function outerAdd10(uint val) public pure returns (uint) {
    return MyBaseContract.innerAdd10(val);
  }

  function getInnerVal() public view returns (uint) {
    return MyBaseContract.innerVal;
  }
}
