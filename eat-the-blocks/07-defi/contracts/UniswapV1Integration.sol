// SPDX-License-Identifier: MIT
pragma solidity ^0.5.0;

import 'github.com/OpenZeppelin/openzeppelin-contracts/blob/release-v2.5.0/contracts/token/ERC20/IERC20.sol';

interface UniswapFactoryInterface {
    // Create Exchange
    function createExchange(address token) external returns (address exchange);
    // Get Exchange and Token Info
    function getExchange(address token) external view returns (address exchange);
    function getToken(address exchange) external view returns (address token);
    function getTokenWithId(uint256 tokenId) external view returns (address token);
    // Never use
    function initializeFactory(address template) external;
}

interface UniswapExchangeInterface {
    // Provide Liquidity
    function addLiquidity(uint256 min_liquidity, uint256 max_tokens, uint256 deadline) external payable returns (uint256);
    // Get Prices
    function getEthToTokenInputPrice(uint256 eth_sold) external view returns (uint256 tokens_bought);
    function getEthToTokenOutputPrice(uint256 tokens_bought) external view returns (uint256 eth_sold);
    function getTokenToEthInputPrice(uint256 tokens_sold) external view returns (uint256 eth_bought);
    function getTokenToEthOutputPrice(uint256 eth_bought) external view returns (uint256 tokens_sold);
    // Trade ETH to ERC20
    function ethToTokenSwapInput(uint256 min_tokens, uint256 deadline) external payable returns (uint256  tokens_bought);
    function ethToTokenTransferInput(uint256 min_tokens, uint256 deadline, address recipient) external payable returns (uint256  tokens_bought);
    function ethToTokenSwapOutput(uint256 tokens_bought, uint256 deadline) external payable returns (uint256  eth_sold);
    function ethToTokenTransferOutput(uint256 tokens_bought, uint256 deadline, address recipient) external payable returns (uint256  eth_sold);
}

contract UniswapV1Integration {
    UniswapFactoryInterface uniswapFactory;
    
    function setup(UniswapFactoryInterface _uniswapFactory) external {
        uniswapFactory = _uniswapFactory;
    }
    
    function createExchange(address token) external {
        uniswapFactory.createExchange(token);
    }
    
    function buy(address tokenAddress) external payable {
        UniswapExchangeInterface uniswapExchange = UniswapExchangeInterface(uniswapFactory.getExchange(tokenAddress));
        uint tokenAmount = uniswapExchange.getEthToTokenInputPrice(msg.value);
        
        uniswapExchange.ethToTokenTransferInput.value(msg.value)(
            tokenAmount, now + 120, msg.sender); // up to 2 minutes from now
    }
    
    function addLiquidity(address tokenAddress) external payable {
        UniswapExchangeInterface uniswapExchange = UniswapExchangeInterface(uniswapFactory.getExchange(tokenAddress));
        uint tokenAmount = uniswapExchange.getEthToTokenOutputPrice(msg.value);
        
        IERC20 token = IERC20(tokenAddress);
        token.transferFrom(msg.sender, address(this), tokenAmount);
        token.approve(address(uniswapExchange), tokenAmount);
        
        uniswapExchange.addLiquidity.value(msg.value)(
            tokenAmount, tokenAmount, now + 120);
    }
}
