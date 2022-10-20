/* eslint-disable no-console */

'use strict';

const { ethers } = require('hardhat');
const fs = require('fs')


// List of tokens to deploy.
const tokens = [
    {
        name: 'Nahmii',
        symbol: 'KNII',
        decimals: 18,
    },
    {
        name: 'Nahmii Euro',
        symbol: 'NEURO',
        decimals: 6,
    },
    {
        name: 'Nahmii USD',
        symbol: 'NUSD',
        decimals: 6,
    },
    {
        name: 'Troll',
        symbol: 'TRL',
        decimals: 18,
    },
]

async function main() {
    const accounts = await ethers.provider.listAccounts();
    console.log("Deploying with ", accounts[0]);

    const ERC20Token = await ethers.getContractFactory("contracts/ERC20Token.sol:ERC20Token");

    const deploymentDetails = []

    for (let token of tokens) {
        let token_ = await ERC20Token.deploy(
            token.name,
            token.symbol,
            ethers.utils.parseUnits(process.env.TOTAL_SUPPLY, token.decimals),
            token.decimals,
        );
        await token_.deployed();

        console.log(`${token.name} (${token.symbol}) deployed at ${token_.address}`)
        deploymentDetails.push({ name: token.name, symbol: token.symbol, address: token_.address })
    }

    // Write deployment details to a JSON file.
    fs.writeFileSync('batchDeploymentDetails.json', JSON.stringify(deploymentDetails), 'utf8')
}


main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
