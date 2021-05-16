/* eslint-disable no-console */

'use strict';

const { ethers } = require('hardhat');

const { BigNumber } = ethers;

async function main() {
  const accounts = await ethers.provider.listAccounts();
  console.log(accounts);

  const GovernanceToken = await ethers.getContractFactory('GovernanceToken');
  console.log('Deploying GovernanceToken...');
  const governanceToken = await GovernanceToken.deploy(
    'NiiFiToken',
    'NIIFI',
    BigNumber.from('888888888000000000000000'),
  );
  await governanceToken.deployed();
  console.log('GovernanceToken deployed to:', governanceToken.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
