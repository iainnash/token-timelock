module.exports = async ({ getNamedAccounts, deployments }: any) => {
  const { deploy } = deployments;
  const { signer, deployer } = await getNamedAccounts();

  const args = [
    '0x9444390c01Dd5b7249E53FAc31290F7dFF53450D',
    '0xc778417e063141139fce010982780140aa0cd5ab',
    Math.floor(new Date().getTime() / 1000) + 60 * 6,
    Math.floor(new Date().getTime() / 1000) + 60 * 12,
  ];

  console.log(args);

  await deploy('Timelock', {
    from: deployer,
    args,
    log: true,
  });
};
module.exports.tags = ['Timelock'];
