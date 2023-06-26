module.exports = async ({ getNamedAccounts, deployments }: any) => {
  const { deploy } = deployments;
  const { signer, deployer } = await getNamedAccounts();

  const args = [
    '0x87EE1158bEe297c381745284dcb2E54fA03EB5f2',
    '0x47E1b433Ca6F3f87302fACE00484BaE025b6b31C',
    1640408400,
    1653796800,
  ];

  console.log({args});

  await deploy('Timelock', {
    from: deployer,
    args,
    log: true,
  });
};
module.exports.tags = ['Timelock'];
