pragma solidity 0.8.6;

import "./Timelock.sol";

contract TimelockCreator {
    event CreatedTimelockContract(address indexed, Timelock);

    function createTimelock(
        address owner,
        IERC20 token,
        uint256 payoutAmount,
        uint16 daysInFuture,
        uint16 recoveryDaysAfterGrant
    ) external returns (Timelock) {
        Timelock response = new Timelock(owner, token, payoutAmount, daysInFuture, recoveryDaysAfterGrant);
        emit CreatedTimelockContract(owner, response);
        return response;
    }
}
