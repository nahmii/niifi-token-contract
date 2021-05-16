'use strict';

require('@nomiclabs/hardhat-ethers');
require('@nomiclabs/hardhat-waffle');
require('@nomiclabs/hardhat-etherscan');

const { etherscanApiKey, mnemonic } = require('./secrets.json');

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  solidity: '0.8.4',
  networks: {
    hardhat: {},
    localhost: {},
    ropsten: {
      url: 'https://geth-ropsten.dev.hubii.net', // `https://eth-ropsten.alchemyapi.io/v2/${alchemyApiKey}`
      accounts: { mnemonic },
    },
  },
  etherscan: {
    apiKey: etherscanApiKey,
  },
};
