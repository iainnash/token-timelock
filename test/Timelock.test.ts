import { ContractReceipt, Event } from '@ethersproject/contracts';
import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/dist/src/signers';
import { expect } from 'chai';
import { ethers, deployments, network } from 'hardhat';

import { TestToken, Timelock, TimelockCreator } from '../typechain';

describe('TimelockTest', () => {
  let testToken: TestToken;
  let timelockCreator: TimelockCreator;
  let signer: SignerWithAddress;
  let signerAddress: string;

  beforeEach(async () => {
    signer = (await ethers.getSigners())[0];
    signerAddress = await signer.getAddress();
    const { TestToken: token } = await deployments.fixture('TestToken');
    const { TimelockCreator: creator } = await deployments.fixture(
      'TimelockCreator'
    );
    testToken = (await ethers.getContractAt(
      'TestToken',
      token.address
    )) as TestToken;
    timelockCreator = (await ethers.getContractAt(
      'TimelockCreator',
      creator.address
    )) as TimelockCreator;
  });

  it('transacts a timelock', async () => {
    const txn = await timelockCreator.createTimelock(
      testToken.address,
      ethers.utils.parseEther('0.01'),
      1,
      1
    );
    const receipt: ContractReceipt = await txn.wait();
    const created = receipt.events.find(
      (evt: Event) => evt.event === 'CreatedTimelockContract'
    );
    const tmLock = (await ethers.getContractAt(
      'Timelock',
      created.args[1]
    )) as Timelock;
    const [s1, s2, s3] = await ethers.getSigners();
    await testToken.mint(ethers.utils.parseEther('1'));
    await testToken.approve(created.args[1], ethers.utils.parseEther('100'));
    await tmLock.addGrants([await s2.getAddress(), await s3.getAddress()]);
    expect(await testToken.balanceOf(await s2.getAddress())).to.be.equal(0);
    await expect(tmLock.connect(s2).claim()).to.be.reverted;
    await network.provider.request({
      method: 'evm_increaseTime',
      params: [60 * 60 * 24 + 1],
    });
    await tmLock.connect(s2).claim();
    expect(await testToken.balanceOf(await s2.getAddress())).to.be.equal(
      ethers.utils.parseEther('0.01')
    );
    await expect(tmLock.connect(s2).claim()).to.reverted;
  });

  describe('with a timelock', () => {
    let tmLock: Timelock;
    beforeEach(async () => {
      const txn = await timelockCreator.createTimelock(
        testToken.address,
        ethers.utils.parseEther('1'),
        2,
        4
      );
      const receipt: ContractReceipt = await txn.wait();
      const created = receipt.events.find(
        (evt: Event) => evt.event === 'CreatedTimelockContract'
      );
      tmLock = (await ethers.getContractAt(
        'Timelock',
        created.args[1]
      )) as Timelock;
    });
    it('withdraws all created grants', async () => {
      const [s1, s2, s3] = await ethers.getSigners();
      await testToken.mint(ethers.utils.parseEther('100'));
      await testToken.approve(tmLock.address, ethers.utils.parseEther('100'));
      await tmLock.addGrants([
        await s1.getAddress(),
        await s2.getAddress(),
        await s3.getAddress(),
      ]);
      await network.provider.request({
        method: 'evm_increaseTime',
        params: [60 * 60 * 24 * 2 + 1],
      });
      const signerBeforeClaimBalance = await testToken.balanceOf(signerAddress);
      await tmLock.connect(s1).claim();
      await tmLock.connect(s2).claim();
      await tmLock.connect(s3).claim();
      expect(
        await (
          await testToken.balanceOf(signerAddress)
        ).sub(signerBeforeClaimBalance)
      ).to.be.equal(ethers.utils.parseEther('1'));
      expect(await testToken.balanceOf(await s2.getAddress())).to.be.equal(
        ethers.utils.parseEther('1')
      );
      expect(await testToken.balanceOf(await s3.getAddress())).to.be.equal(
        ethers.utils.parseEther('1')
      );
      await network.provider.request({
        method: 'evm_increaseTime',
        params: [60 * 60 * 24 * 4 + 1],
      });
      const lastBalance = await testToken.balanceOf(signerAddress);
      await tmLock.recover();
      expect(await testToken.balanceOf(signerAddress)).to.be.equal(lastBalance);
    });

    it('allows adding on new grants', async () => {
      const [s1, s2, s3] = await ethers.getSigners();
      await testToken.mint(ethers.utils.parseEther('100'));
      await testToken.approve(tmLock.address, ethers.utils.parseEther('100'));
      await tmLock.addGrants([
        await s1.getAddress(),
      ]);
      await tmLock.addGrants([
        await s2.getAddress(),
      ]);
      await network.provider.request({
        method: 'evm_increaseTime',
        params: [60 * 60 * 24 * 2 + 1],
      });
      const signerBeforeClaimBalance = await testToken.balanceOf(signerAddress);
      await tmLock.connect(s1).claim();
      await tmLock.connect(s2).claim();
      expect(
        await (
          await testToken.balanceOf(signerAddress)
        ).sub(signerBeforeClaimBalance)
      ).to.be.equal(ethers.utils.parseEther('1'));
      expect(await testToken.balanceOf(await s2.getAddress())).to.be.equal(
        ethers.utils.parseEther('1')
      );
      await network.provider.request({
        method: 'evm_increaseTime',
        params: [60 * 60 * 24 * 4 + 1],
      });
      const lastBalance = await testToken.balanceOf(signerAddress);
      await tmLock.recover();
      expect(await testToken.balanceOf(signerAddress)).to.be.equal(lastBalance);
    });
  });
});
