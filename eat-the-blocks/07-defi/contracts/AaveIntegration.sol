pragma solidity ^0.5.0;

import 'github.com/aave/aave-protocol/blob/master/contracts/configuration/LendingPoolAddressesProvider.sol';
import 'github.com/aave/aave-protocol/blob/master/contracts/lendingpool/LendingPool.sol';
import 'github.com/aave/aave-protocol/blob/master/contracts/flashloan/base/FlashLoanReceiverBase.sol';

contract AaveIntegration is FlashLoanReceiverBase {
    LendingPoolAddressesProvider provider;
    address dai;
    
    constructor (LendingPoolAddressesProvider _provider, address _dai)
        FlashLoanReceiverBase(address(_provider))
        public
    {
        provider = _provider;
        dai = _dai;
    }
    
    function startLoan(uint _amount, bytes calldata _params) external {
        LendingPool lendingPool = provider.getLendingPool();
        lendingPool.flashLoan(address(this), dai, _amount, _params);
    }
    
    function executeOperation(address _reserve, uint _amount, uint _fee, bytes memory _params) {
        // execute arbitrage
        transferFundsBackToPoolInternal(_reserve, _amount + _fee);
    }
}
