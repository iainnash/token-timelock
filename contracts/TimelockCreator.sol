// SPDX-License-Identifier: GPL-3.0

pragma solidity 0.8.6;

import "./Timelock.sol";

/**
Factory contract that creates a timelock given global timelock parameters.
*/
contract TimelockCreator {
    event CreatedTimelockContract(
        address indexed,
        Timelock indexed,
        IERC20 indexed,
        uint256,
        uint256
    );

    function createTimelock(
        address owner,
        IERC20 token,
        uint256 unlockTimestamp,
        uint256 recoverTimestamp
    ) external returns (Timelock) {
        Timelock response = new Timelock(
            owner,
            token,
            unlockTimestamp,
            recoverTimestamp
        );
        emit CreatedTimelockContract(
            owner,
            response,
            token,
            unlockTimestamp,
            recoverTimestamp
        );
        return response;
    }
}
