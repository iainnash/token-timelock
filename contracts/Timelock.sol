pragma solidity 0.8.6;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";

contract Timelock {
    IERC20 private token;
    uint256 private tokenAmount;
    uint256 public timeRecoverGrant;
    uint256 public timeReceiveGrant;
    address private owner;
    address[] public recipients;
    bool[] public hasClaimed;

    event Recovered(address sender, uint256 amount);
    event Claimed(address claimee);

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

    function claim() external {
        require(block.timestamp > timeReceiveGrant, "a7");
        for (uint256 i = 0; i < recipients.length; i++) {
            if (recipients[i] == msg.sender) {
                require(!hasClaimed[i], "a2");
                token.transfer(msg.sender, tokenAmount);
                hasClaimed[i] = true;
                emit Claimed(msg.sender);
                return;
            }
        }
        revert("a3");
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
