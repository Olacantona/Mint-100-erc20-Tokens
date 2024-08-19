// SPDX-License-Identifier: MIT
// Compatible with OpenZeppelin Contracts ^5.0.0
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Permit.sol";

contract MyERC20Token is ERC20, ERC20Permit {
    constructor() ERC20("MyERC20Token", "MTK") ERC20Permit("MyERC20Token") {
        _mint(msg.sender, 10000000 * 10 ** decimals());
    }
}
