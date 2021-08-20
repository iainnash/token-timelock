import { ethers, network, deployments } from 'hardhat';
import { TestToken, Timelock, TimelockCreator } from '../typechain';

async function main() {
  const [signer] = await ethers.getSigners();
  const signerAddress = await signer.getAddress();

  const timelockAddress = '0x37975a85d3e37f0e5580b46162e52b92ffc65dc2';

  const timelock = (await ethers.getContractAt(
    'Timelock',
    timelockAddress
  )) as Timelock;
  const weth = (await ethers.getContractAt(
    'TestToken',
    '0xc778417e063141139fce010982780140aa0cd5ab'
  )) as TestToken;
  const wethapprove = await weth.approve(timelockAddress, '100000000000000000');
  console.log(wethapprove);
  await wethapprove.wait();

//   const txn = await timelock.addGrants([signerAddress]);
console.log('add grants');
  const txn = await timelock.addGrants([signerAddress]);
  console.log(txn);
  await txn.wait();

  const withdraw = await timelock.claim();
  console.log(withdraw);
  await withdraw.wait();
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
