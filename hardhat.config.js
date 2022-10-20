'use strict';
const dotenv = require('dotenv');
require('@nomiclabs/hardhat-ethers');
require('@nomiclabs/hardhat-waffle');
require('@nomiclabs/hardhat-etherscan');

dotenv.config()

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  solidity: {
    version: '0.8.4',
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
  networks: {
    hardhat: {},
    localhost: {},
    mainnet: {
      accounts: process.env.PRIVATE_KEY ? [process.env.PRIVATE_KEY] : { MNEMONIC },
      gasPrice: 130000000000,
      timeout: 300000,
      url: process.env.MAINNET_URL,
    },
    testnet: {
      accounts: process.env.PRIVATE_KEY ? [process.env.PRIVATE_KEY] : { MNEMONIC },
      gasPrice: 80000000000,
      timeout: 120000,
      url: process.env.TESTNET_URL, // `https://eth-ropsten.alchemyapi.io/v2/${alchemyApiKey}`
    },
  },
  etherscan: {
    apiKey: process.env.ETHERSCAN_API_KEY,
  },
};
