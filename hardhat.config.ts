import { HardhatUserConfig } from 'hardhat/config';
import 'hardhat-deploy';
import '@nomiclabs/hardhat-waffle';
import 'hardhat-typechain';
import '@nomiclabs/hardhat-ethers';
import 'hardhat-gas-reporter';
import NETWORKS_CONFIG from "./networks.private.json";

const config: HardhatUserConfig = {
  solidity: {
    version: '0.8.6',
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
  networks: {
    ...NETWORKS_CONFIG,
  },
  namedAccounts: {
    deployer: 0,
    signer: 1,
  },
};

export default config;
