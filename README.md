# timelock contract for ERC20 token grants

This contract grants the receiver an ERC20 token after a specified window of time.

`createTimelock(token, value (value per recipient), N days unlock, K days recover);`

Admin recovery of funds is allowed K+N days after the timelock grant opens.

Recipient addresses cannot be updated once created.

However, additional recipients can be added any any time to an ongoing timelock by the creator of that timelock.

This is fairly simple and gas-friendly. It's based on block.timestamp but has a day granularity to prevent any issues with timing attacks.

