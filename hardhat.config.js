'use strict';

require('@nomiclabs/hardhat-ethers');
require('@nomiclabs/hardhat-waffle');
require('@nomiclabs/hardhat-etherscan');

const { etherscanApiKey, mnemonic } = require('./secrets.json');

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
      accounts: process.env.PRIVATE_KEY ? [process.env.PRIVATE_KEY] : { mnemonic },
      gasPrice: 130000000000,
      timeout: 300000,
      url: 'https://ethereum.hubii.com',
    },
    ropsten: {
      accounts: process.env.PRIVATE_KEY ? [process.env.PRIVATE_KEY] : { mnemonic },
      gasPrice: 80000000000,
      timeout: 120000,
      url: 'https://geth-ropsten.dev.hubii.net', // `https://eth-ropsten.alchemyapi.io/v2/${alchemyApiKey}`
    },
  },
  etherscan: {
    apiKey: etherscanApiKey,
  },
};
