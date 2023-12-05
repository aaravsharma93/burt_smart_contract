// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

interface IERC20 {
    /**
     * @dev Returns the amount of tokens in existence.
     */
    function totalSupply() external view returns (uint256);
    function decimals() external view returns (uint256);
    /**
     * @dev Returns the amount of tokens owned by `account`.
     */
    function balanceOf(address account) external view returns (uint256);

    /**
     * @dev Moves `amount` tokens from the caller's account to `recipient`.
     *
     * Returns a boolean value indicating whether the operation succeeded.
     *
     * Emits a {Transfer} event.
     */
    function transfer(address recipient, uint256 amount) external returns (bool);

    /**
     * @dev Returns the remaining number of tokens that `spender` will be
     * allowed to spend on behalf of `owner` through {transferFrom}. This is
     * zero by default.
     *
     * This value changes when {approve} or {transferFrom} are called.
     */
    function allowance(address owner, address spender) external view returns (uint256);

    /**
     * @dev Sets `amount` as the allowance of `spender` over the caller's tokens.
     *
     * Returns a boolean value indicating whether the operation succeeded.
     *
     * IMPORTANT: Beware that changing an allowance with this method brings the risk
     * that someone may use both the old and the new allowance by unfortunate
     * transaction ordering. One possible solution to mitigate this race
     * condition is to first reduce the spender's allowance to 0 and set the
     * desired value afterwards:
     * https://github.com/ethereum/EIPs/issues/20#issuecomment-263524729
     *
     * Emits an {Approval} event.
     */
    function approve(address spender, uint256 amount) external returns (bool);

    /**
     * @dev Moves `amount` tokens from `sender` to `recipient` using the
     * allowance mechanism. `amount` is then deducted from the caller's
     * allowance.
     *
     * Returns a boolean value indicating whether the operation succeeded.
     *
     * Emits a {Transfer} event.
     */
    function transferFrom(
        address sender,
        address recipient,
        uint256 amount
    ) external returns (bool);

    /**
     * @dev Emitted when `value` tokens are moved from one account (`from`) to
     * another (`to`).
     *
     * Note that `value` may be zero.
     */
    event Transfer(address indexed from, address indexed to, uint256 value);

    /**
     * @dev Emitted when the allowance of a `spender` for an `owner` is set by
     * a call to {approve}. `value` is the new allowance.
     */
    event Approval(address indexed owner, address indexed spender, uint256 value);
}


contract TokenSale{
    IERC20 public tokenContractAddress;
    uint256 public price;  // the price, in wei, per token
    address owner;
    address public buyer;
    address public seller;
    uint256 public tokensSold;
    string public ContractDescription;
    string public ContractTitle;

    event Sold(address buyer, uint256 amount); // this used for UI purpose 

    // address of token who being sold , and the price of single token
    constructor(IERC20 _tokenContractAddress, uint256 _price,address _buyer,string memory _ContractTitle, string memory _ContractDescription){
        seller = msg.sender;
        tokenContractAddress = _tokenContractAddress;
        price = _price;
        // seller = _seller;
        buyer =  _buyer;
        ContractDescription = _ContractDescription;
        ContractTitle = _ContractTitle;
    }

     function multiply(uint x, uint y) internal pure returns (uint z) {
        require(y == 0 || (z = x * y) / y == x);
    }
    function buyTokens(uint256 numberOfTokens) public payable{
        require(msg.value == multiply(numberOfTokens, price));
        uint256 scaledAmount = multiply(numberOfTokens,uint256(10) ** tokenContractAddress.decimals());
        require(tokenContractAddress.balanceOf(seller) >= scaledAmount);
        // require(tokenContractAddress.balanceOf(seller) >= numberOfTokens);
    
        tokensSold += numberOfTokens;

        emit Sold(msg.sender, numberOfTokens);
        require(tokenContractAddress.transfer(msg.sender, numberOfTokens));

      //all unsole token transfer to contract owner address
        
       
    }
     function Saleend() public {
        require(msg.sender == seller);

        // Send unsold tokens to the owner.
        require(tokenContractAddress.transfer(seller, tokenContractAddress.balanceOf(seller)));//
        // msg.sender.transfer(address(this).balance);
        selfdestruct(payable(seller));
    }      
}

//====================================================================================


