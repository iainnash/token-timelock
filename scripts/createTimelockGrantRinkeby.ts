import { ethers, network, deployments, getNamedAccounts } from 'hardhat';
import { TestToken, Timelock, TimelockCreator } from '../typechain';

async function main() {
  // const [signer] = await ethers.getSigners();
  // const signerAddress = await signer.getAddress();

  const { signer } = await getNamedAccounts();
  const deployer = signer; 

  const timelockAddress = (await deployments.get('Timelock')).address;
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
  const txn = await timelock.addGrants([deployer], '10000');
  console.log(txn);
  await txn.wait();
  const txn2 = await timelock.addGrants([deployer], '5000');
  await txn2.wait();
  console.log('grant2');

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
