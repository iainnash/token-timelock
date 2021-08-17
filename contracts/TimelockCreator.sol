pragma solidity 0.8.6;

import "@openzeppelin/contracts/access/AccessControl.sol";
import "./Timelock.sol";

contract TimelockCreator {
    event CreatedTimelockContract(address indexed, Timelock);

    function createTimelock(
        IERC20 token,
        uint256 payoutAmount,
        uint16 daysInFuture,
        uint16 recoveryDaysAfterGrant
    ) external returns (Timelock) {
        Timelock response = new Timelock(msg.sender, token, payoutAmount, daysInFuture, recoveryDaysAfterGrant);
        emit CreatedTimelockContract(msg.sender, response);
        return response;
    }
}
