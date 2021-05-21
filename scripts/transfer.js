/* eslint-disable no-console */

'use strict';

const { ethers } = require('hardhat');
require('dotenv').config();

async function main() {
  const [owner, other] = await ethers.provider.listAccounts();

  const address = process.env.CONTRACT_ADDRESS;
  const GovernanceToken = await ethers.getContractFactory('GovernanceToken');
  const governanceToken = await GovernanceToken.attach(address);

  const value1 = await governanceToken.balanceOf(owner);
  console.log(`Balance of owner: ${value1.toString()}`);

  const value2 = await governanceToken.balanceOf(other);
  console.log(`Balance of other: ${value2.toString()}`);

  const cap = await governanceToken.cap();
  console.log(`Cap: ${cap.toString()}`);

  console.log('Transferring 40% of cap to other...');
  await governanceToken.transfer(other, cap.mul(4).div(10));

  const value3 = await governanceToken.balanceOf(owner);
  console.log(`Balance of owner: ${value3.toString()}`);

  const value4 = await governanceToken.balanceOf(other);
  console.log(`Balance of other: ${value4.toString()}`);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
