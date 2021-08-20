import { ethers, network, deployments } from 'hardhat';
import { TestToken, Timelock, TimelockCreator } from '../typechain';

async function main() {
  const [signer] = await ethers.getSigners();
  const signerAddress = await signer.getAddress();

  const timelockAddress = '0x0F41711C8392c6f0c94b1F25197F748b2bf4B3D6';

  const timelock = (await ethers.getContractAt(
    'Timelock',
    timelockAddress
  )) as Timelock;

  if (false) {
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
