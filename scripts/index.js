/* eslint-disable no-console */

'use strict';

const { ethers } = require('hardhat');

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

  console.log('Minting to owner...');
  await governanceToken.mint(owner, cap);

  const value3 = await governanceToken.balanceOf(owner);
  console.log(`Balance of owner: ${value3.toString()}`);

  const value4 = await governanceToken.balanceOf(other);
  console.log(`Balance of other: ${value4.toString()}`);

  console.log('Transferring to other...');
  await governanceToken.transfer(other, cap);

  const value5 = await governanceToken.balanceOf(owner);
  console.log(`Balance of owner: ${value5.toString()}`);

  const value6 = await governanceToken.balanceOf(other);
  console.log(`Balance of other: ${value6.toString()}`);

  console.log(`Current owner: ${await governanceToken.owner()}`);

  console.log('Transferring ownership...');
  await governanceToken.transferOwnership(other);
  console.log(`Current owner: ${await governanceToken.owner()}`);

  const otherSigner = await ethers.getSigner(other);

  console.log('Transferring ownership back...');
  await (governanceToken.connect(otherSigner)).transferOwnership(owner);
  console.log(`Current owner: ${await governanceToken.owner()}`);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
