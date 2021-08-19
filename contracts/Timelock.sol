// SPDX-License-Identifier: GPL-3.0

pragma solidity 0.8.6;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

/**
    Error codes:
    a1: Recover and recieve grant days need to be greater than 0
    a2: Grant not valid.
    a3: Only owner can add grants.
    a4: Only owner can recover
    a5: Cannot set the recovery grant before the unlock time
    a6: Too early to recover
    a7: Too early to claim
    a8: Recover timestamp needs to be after receive timestamp
    a9: Already granted
 */

/**
  Timelock contract.
  Fixed token payout and timing.
  Can add recipients and multiple grants per recipient.
  @author github.com/iainnnash
 */
contract Timelock {
    // Token amount to grant to each user
    uint256 private immutable tokenAmount;
    // Timestamp for when the recovery begins
    uint256 public immutable timeRecoverGrant;
    // Timestamp for when the receive begins
    uint256 public immutable timeReceiveGrant;
    // Owner that can recover grant and add new grant addresses
    address private immutable owner;
    // Token to lock
    IERC20 private immutable token;

    // Status of grant
    enum GrantStatus {
        // No grant setup for user
        UNKNOWN,
        // Granted to user
        GRANTED,
        // Claimed by user
        CLAIMED,
        // Recovered by admin
        RECOVERED
    }

    // Mapping of address to grant
    mapping(address => GrantStatus) private grants;

    // Emitted when a claim is recovered
    event Recovered(address recipient, uint256 amount);

    // Emitted when a claim is claimed
    event Claimed(address actor, uint256 amount);

    // Emitted when a grant is added
    event GrantsAdded(address actor, address[] newRecipients);

    modifier onlyOwner() {
        require(msg.sender == owner, "3");
        _;
    }

    constructor(
        address _owner,
        IERC20 _token,
        uint256 _tokenAmount,
        uint256 unlockTimestamp,
        uint256 recoverTimestamp
    ) {
        token = _token;
        owner = _owner;
        tokenAmount = _tokenAmount;
        require(unlockTimestamp > block.timestamp && recoverTimestamp > block.timestamp, "1");
        require(recoverTimestamp > unlockTimestamp, "8");
        timeReceiveGrant = unlockTimestamp;
        timeRecoverGrant = recoverTimestamp;
    }

    function getTokenAndAmount() public view returns (IERC20, uint256) {
        return (token, tokenAmount);
    }

    function getTimeUnlock() public view returns (uint256) {
        return timeRecoverGrant;
    }

    function addGrants(address[] memory newRecipients) onlyOwner external {
        uint256 numberRecipients = newRecipients.length;
        token.transferFrom(
            msg.sender,
            address(this),
            tokenAmount * numberRecipients
        );
        for (uint256 i = 0; i < numberRecipients; i++) {
            require(grants[newRecipients[i]] == GrantStatus.UNKNOWN, "9");
            grants[newRecipients[i]] = GrantStatus.GRANTED;
        }
        emit GrantsAdded(owner, newRecipients);
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
        require(block.timestamp >= timeReceiveGrant, "7");
        require(grants[recipient] == GrantStatus.GRANTED, "2");
        token.transfer(recipient, tokenAmount);
        grants[recipient] = GrantStatus.CLAIMED;
        emit Claimed(recipient, tokenAmount);
    }

    function recover() onlyOwner external {
        address payable sender = payable(msg.sender);
        require(block.timestamp >= timeRecoverGrant, "6");
        uint256 balance = token.balanceOf(address(this));
        emit Recovered(sender, balance);
        token.transfer(sender, balance);
        selfdestruct(sender);
    }
}
