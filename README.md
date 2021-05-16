# niifi-token-contract

This repository contains the governance token contract for NIIFI.

## Install

This project was developed with Node.js v12. Other versions of Node.js have thus far not been tested with this project.

Install as follows:
```shell
npm install
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

The sample script at `scripts/index.js` may be run to mint and transfer tokens as well as to transfer ownership of the contract.
```shell
npm run index:localhost
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