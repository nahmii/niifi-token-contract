/* eslint-disable no-console */

'use strict';

const { ethers } = require('hardhat');

async function main() {
  const [owner] = await ethers.provider.listAccounts();

  const address = process.env.CONTRACT_ADDRESS;
  const GovernanceToken = await ethers.getContractFactory('GovernanceToken');
  const governanceToken = await GovernanceToken.attach(address);

  const value1 = await governanceToken.balanceOf(owner);
  console.log(`Balance of owner: ${value1.toString()}`);

  const cap = await governanceToken.cap();
  console.log(`Cap: ${cap.toString()}`);

  console.log('Minting to owner...');
  await governanceToken.mint(owner, cap);

  const value2 = await governanceToken.balanceOf(owner);
  console.log(`Balance of owner: ${value2.toString()}`);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
