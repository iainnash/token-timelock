module.exports = async ({ getNamedAccounts, deployments }: any) => {
  const { deploy } = deployments;
  const { deployer } = await getNamedAccounts();

  await deploy('Timelock', {
    from: deployer,
    args: [],
    log: true,
  });
};
module.exports.tags = ['Timelock'];
