// SPDX-License-Identifier: MIT
pragma solidity ^0.5.0;

import '@openzeppelin/contracts/token/ERC20/IERC20.sol';

contract DaiIntegration {
    IERC20 dai;

    constructor(address daiAddress) public {
        dai = IERC20(daiAddress);
    }

    function foo(address recipient, uint amount) external {
        // do some stuff
        dai.transfer(recipient, amount);
    }
}
