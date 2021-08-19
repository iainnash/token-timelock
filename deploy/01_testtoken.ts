import { HardhatRuntimeEnvironment } from "hardhat/types/runtime";

module.exports = async ({ getNamedAccounts, deployments }: any) => {
  const { deploy } = deployments;
  const { deployer } = await getNamedAccounts();

  await deploy('TestToken', {
    from: deployer,
    args: [],
    log: true,
  });
};
module.exports.tags = ['TestToken'];
module.exports.skip = (hre: HardhatRuntimeEnvironment) => {
  // @ts-ignore
  return hre.network.live;
}