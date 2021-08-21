import { ethers, network, deployments } from 'hardhat';
import { TestToken, Timelock, TimelockCreator } from '../typechain';

async function main() {
  const [signer] = await ethers.getSigners();
  const signerAddress = await signer.getAddress();

  const timelockCreatorDeployment = await deployments.get('TimelockCreator');
  const timelock = (await ethers.getContractAt(
    'TimelockCreator',
    timelockCreatorDeployment.address
  )) as TimelockCreator;
  const weth = (await ethers.getContractAt(
    'TestToken',
    '0xc778417e063141139fce010982780140aa0cd5ab'
  )) as TestToken;

  const txn = await timelock.createTimelock(
    signerAddress,
    weth.address,
    Math.floor(new Date().getTime() / 1000) + 60 * 6,
    Math.floor(new Date().getTime() / 1000) + 60 * 12 
  );
  async function addGrant(newContract: string) {
    const timelock = (await ethers.getContractAt(
      'Timelock',
      newContract
    )) as Timelock;
    const txn = await timelock.addGrants([signerAddress], '100000');
    console.log(txn);
    await txn.wait();
    return txn.hash;
  }
  timelock.on('CreatedTimelockContract', (owner, newContract) => {
    console.log(newContract);
    addGrant(newContract).then((res) => {
      console.log(res);
    });
  });
  await txn.wait();
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
