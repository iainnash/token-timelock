// SPDX-License-Identifier: GPL-3.0

pragma solidity 0.8.6;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

/**
  Timelock contract.
  Fixed token payout and timing.
  Can add recipients and multiple grants per recipient.

  @author iain
  github.com/iainnash/simple-timelock
 */
contract Timelock {
    /**
        Error codes lookup:
        1: Recover and recieve grant days need to be greater than 0
        2: Grant not valid.
        3: Only owner can add grants.
        4: Only owner can recover
        5: Cannot set the recovery grant before the unlock time
        6: Too early to recover
        7: Too early to claim
        8: Recover timestamp needs to be after receive timestamp
        9: Already granted
        10: Cannot grant after unlock
    */

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
        CLAIMED
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

    /**
        Sets up grant created by TimelockCreator Contract
     */
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
        require(
            unlockTimestamp > block.timestamp &&
                recoverTimestamp > block.timestamp,
            "1"
        );
        require(recoverTimestamp > unlockTimestamp, "8");
        timeReceiveGrant = unlockTimestamp;
        timeRecoverGrant = recoverTimestamp;
    }

    /**
        Returns token for timelock and amount per recipient
     */
    function getTokenAndAmount() public view returns (IERC20, uint256) {
        return (token, tokenAmount);
    }

    /** 
        Returns the time users can recieve the grant / when the timelock expires
     */
    function getTimeUnlock() public view returns (uint256) {
        return timeReceiveGrant;
    }

    /** 
        @dev Adds a grant to the timelock
        Grants can be added at any time before claim period.
    */
    function addGrants(address[] memory newRecipients) external onlyOwner {
        require(getTimeUnlock() > block.timestamp, "10");

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

    /** 
        Returns the status of the grant.
     */
    function grantStatus(address recipient)
        external
        view
        returns (GrantStatus)
    {
        return grants[recipient];
    }

    /**
        Allows a user to claim their grant. Claimee has to be msg.sender.
     */
    function claim() external {
        address recipient = msg.sender;
        require(block.timestamp >= timeReceiveGrant, "7");
        require(grants[recipient] == GrantStatus.GRANTED, "2");
        token.transfer(recipient, tokenAmount);
        grants[recipient] = GrantStatus.CLAIMED;
        emit Claimed(recipient, tokenAmount);
    }

    /**
        The owner of the grant can recover after the recovery timestamp passes.
        This sweeps remaining funds and destroys the contract data.
     */
    function recover() external onlyOwner {
        address payable sender = payable(msg.sender);
        require(block.timestamp >= timeRecoverGrant, "6");
        uint256 balance = token.balanceOf(address(this));
        emit Recovered(sender, balance);
        token.transfer(sender, balance);
        selfdestruct(sender);
    }
}
