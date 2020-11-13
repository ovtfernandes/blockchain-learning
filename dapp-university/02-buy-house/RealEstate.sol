pragma solidity ^0.5.0;

contract RealEstate {
    address payable public seller;
    address public buyer;
    string public streetAddress;
    string title;
    uint public price;
    
    constructor() public {
        seller = msg.sender;
        streetAddress = '350 5th Ave, New York, NY 10118';
        title = '';
        price = 10 ether;
    }
    
    function buyHouse() payable public {
        require(seller != address(0x0), 'Seller must be set');
        require(buyer == address(0x0), 'Cannot buy this house twice');
        require(msg.sender != seller, 'Buyer cannot be seller');
        require(msg.value == price, 'Price must equal 10 ether');
        buyer = msg.sender;
        seller.transfer(msg.value);
    }
}
