// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.8.0;

contract Parent {
  string parentVar = "parentVar";
}

contract Kid1 is Parent {
  string kid1Var = "kid1Var";
}

contract Kid2 {
  string kid2Var = "kid2Var";
}

contract MyContract is Kid1, Kid2 {
  string myContractVar = "myContractVar";

  function getMyContractVar() public view returns (string memory) {
    return myContractVar;
  }

  function getKid1Var() public view returns (string memory) {
    return kid1Var;
  }

  function getKid2Var() public view returns (string memory) {
    return kid2Var;
  }

  function getParentVar() public view returns (string memory) {
    return parentVar;
  }
}
