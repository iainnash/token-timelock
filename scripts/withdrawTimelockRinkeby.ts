import { ethers, network, deployments } from 'hardhat';
import { TestToken, Timelock, TimelockCreator } from '../typechain';

async function main() {
  const timelockAddress = '0x37975a85d3e37f0e5580b46162e52b92ffc65dc2';

  const timelock = (await ethers.getContractAt(
    'Timelock',
    timelockAddress
  )) as Timelock;

  if (true) {
    const withdraw = await timelock.claim();
    console.log(withdraw);
    await withdraw.wait();
  } else {
    const recover = await timelock.recover();
    console.log(recover);
    await recover.wait();
    console.log('recovered');
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
