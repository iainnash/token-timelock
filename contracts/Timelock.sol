pragma solidity 0.8.6;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract Timelock {
    IERC20 private token;
    uint256 private tokenAmount;
    uint256 public timeRecoverGrant;
    uint256 public timeReceiveGrant;
    address private owner;
    address[] public recipients;
    bool[] public hasClaimed;

    event Recovered(address sender, uint256 amount);
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
            recipients.push(newRecipients[i]);
            hasClaimed.push(false);
        }
    }

    function lockedBalanceOf(address recipient)
        external
        view
        returns (uint256)
    {
        uint256 balance = 0;
        for (uint256 i = 0; i < recipients.length; i++) {
            if (recipients[i] == recipient && !hasClaimed[i]) {
                balance += tokenAmount;
            }
        }
        return balance;
    }

    function claimedBalanceOf(address recipient)
        external
        view
        returns (uint256)
    {
        uint256 balance = 0;
        for (uint256 i = 0; i < recipients.length; i++) {
            if (recipients[i] == recipient && hasClaimed[i]) {
                balance += tokenAmount;
            }
        }
        return balance;
    }

    function claim(address recipient) external {
        require(block.timestamp > timeReceiveGrant, "a7");
        bool success = false;
        for (uint256 i = 0; i < recipients.length; i++) {
            if (recipients[i] == recipient) {
                require(!hasClaimed[i], "a2");
                token.transfer(recipient, tokenAmount);
                hasClaimed[i] = true;
                emit Claimed(msg.sender, recipient);
                success = true;
            }
        }
        require(success, "no recipients found");
    }

    function recover() external {
        require(msg.sender == owner, "a3");
        require(block.timestamp > timeRecoverGrant, "a4");
        uint256 amount = token.balanceOf(address(this));
        emit Recovered(msg.sender, amount);

        for (uint256 i = 0; i < hasClaimed.length; i++) {
            hasClaimed[i] = true;
        }
        // Recovers remaining token balance.
        token.transfer(owner, amount);
    }
}
