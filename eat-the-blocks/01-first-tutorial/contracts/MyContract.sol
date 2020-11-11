// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.8.0;

contract Parent {
  uint contractType = 0;

  function foo() public view returns (uint) {
    return contractType;
  }

  function bar() public view returns (uint) {
    return contractType;
  }

  function baz() public view returns (uint) {
    return contractType;
  }
}

contract Kid1 is Parent {
  uint contractType = 1;

  function bar() public view returns (uint) {
    return contractType;
  }

  function baz() public view returns (uint) {
    return contractType;
  }
}

contract Kid2 is Parent {
  uint contractType = 2;

  function bar() public view returns (uint) {
    return super.bar();
  }

  function baz() public view returns (uint) {
    return contractType;
  }
}

contract MyContract is Kid1, Kid2 {
  function callFoo() public view returns (uint) {
    return foo();
  }

  function callBar() public view returns (uint) {
    return bar(); // will return 1, and not 0, because Kid1 is before Kid2 in hierarchy
  }

  function callBaz() public view returns (uint) {
    return baz();
  }
}
