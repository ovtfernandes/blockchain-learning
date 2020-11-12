pragma solidity ^0.5.0;

contract AdvancedStorage {
    uint[] public ids;
    
    function add(uint _id) public {
        ids.push(_id);
    }
    
    function get(uint position) view public returns (uint) {
        return ids[position];
    }
    
    function getAll() view public returns (uint[] memory) {
        return ids;
    }
    
    function length() view public returns (uint) {
        return ids.length;
    }
}
