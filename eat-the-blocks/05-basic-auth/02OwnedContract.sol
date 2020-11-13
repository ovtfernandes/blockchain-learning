pragma solidity ^0.5.0;

import './Ownable.sol';

contract OwnedContract is Ownable {
    constructor() public Ownable() {}
    
    function publicFunction() external {}
    
    function privateFunction() external onlyOwner {}
}
