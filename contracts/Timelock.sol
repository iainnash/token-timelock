// SPDX-License-Identifier: GPL-3.0

pragma solidity 0.8.6;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "hardhat/console.sol";

/**
Error codes:
a5: Cannot set the recovery grant before the unlock time
a3: Only owner can add grants.
a2: Grant not valid.
a7: Too early to claim
a4: Only owner can recover
a6: Too early to recover
a9: Already granted
 */

/**
  Timelock contract.
  Fixed token payout and timing.
  Can add recipients and multiple grants per recipient.
 */
contract Timelock {
    IERC20 private token;
    uint256 private tokenAmount;
    uint256 public timeRecoverGrant;
    uint256 public timeReceiveGrant;
    address private owner;
    // address[] public recipients;
    // bool[] public hasClaimed;
    enum GrantStatus {
        UNKNOWN,
        GRANTED,
        CLAIMED,
        RECOVERED
    }
    mapping (address => GrantStatus) grants;

    event Recovered(address sender, address recipient);
    event Claimed(address actor, address claimee);

    constructor(
        address _owner,
        IERC20 _token,
        uint256 _tokenAmount,
        uint16 daysGrant,
        uint16 daysRecover
    ) {
        token = _token;
        owner = _owner;
        tokenAmount = _tokenAmount;
        timeReceiveGrant = (uint256(daysGrant) * 1 days) + block.timestamp;
        timeRecoverGrant = 0;
        if (daysRecover > 0) {
            timeRecoverGrant =
                (uint256(daysGrant + daysRecover) * 1 days) +
                block.timestamp;
        }
        require(timeReceiveGrant < timeRecoverGrant, "a5");
    }

    function addGrants(address[] memory newRecipients) external {
        require(msg.sender == owner, "a3");
        uint256 numberRecipients = newRecipients.length;
        token.transferFrom(
            msg.sender,
            address(this),
            tokenAmount * numberRecipients
        );
        for (uint256 i = 0; i < numberRecipients; i++) {
            require(grants[newRecipients[i]] == GrantStatus.UNKNOWN, "a9");
            grants[newRecipients[i]] = GrantStatus.GRANTED;
        }
    }

    function grantStatus(address recipient)
        external
        view
        returns (GrantStatus)
    {
        return grants[recipient];
    }

    function claim() external {
        address recipient = msg.sender;
        require(block.timestamp > timeReceiveGrant, "a7");
        require(grants[recipient] == GrantStatus.GRANTED, "a2");
        token.transfer(recipient, tokenAmount);
        grants[recipient] = GrantStatus.CLAIMED;
        emit Claimed(msg.sender, recipient);
    }

    function recover(address recipient) external {
        require(msg.sender == owner, "a4");
        require(block.timestamp > timeRecoverGrant, "a6");
        grants[recipient] = GrantStatus.RECOVERED;
        emit Recovered(msg.sender, recipient);
        token.transfer(owner, tokenAmount);
    }
}
