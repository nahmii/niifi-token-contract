# niifi-token-contract

This repository contains the governance token contract for NIIFI.

## Install

This project was developed and tried with Node.js v12 and v14. Other versions of Node.js have thus far not been tested with this project. Note however that _@nomiclabs/hardhat-waffle_ was found to trigger faulty unit tests if installed with npm < 7. Thus you should most likely upgrade your npm with `npm install -g npm` before continuing.

Install as follows:
```shell
npm install --engine-strict
```

## Build

The contract may compiled with
```shell
npm run build
```

## Test

After successful build the contract may be tested with
```shell
npm run test
```

## Deployment on localhost

Complementary to testing the contract may be deployed to a HardHat Ethereum instance on localhost, allowing for subsequent interaction with the smart contract in console or script.

In a separate terminal start the Ethereum instance
```shell
npm run node
```

Deploy contracts to the node
```shell
npm run deploy:localhost
```

The sample script at `scripts/mint.js` may be run to mint tokens.
```shell
npm run mint:localhost
```

Another sample script at `scripts/transfer.js` may be run to transfer tokens from 
the mint target to another account.
```shell
npm run transfer:localhost
```

Also the HardHat REPL may be started to interact with the HardHat instance
```shell
npm run console:localhost
```

## Deployment on public testnet

For deployment on public testnet the EOA to deploy from may be derived from mnemonics. The generation of mnemonics may be done as
```shell
npx mnemonics
```