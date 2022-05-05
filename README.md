# Advanced Sample Hardhat Project

This project demonstrates an advanced Hardhat use case, integrating other tools commonly used alongside Hardhat in the ecosystem.

The project comes with a sample contract, a test for that contract, a sample script that deploys that contract, and an example of a task implementation, which simply lists the available accounts. It also comes with a variety of other tools, preconfigured to work with the project code.

Try running some of the following tasks:

```shell
npx hardhat accounts
npx hardhat compile
npx hardhat clean
npx hardhat test
npx hardhat node
npx hardhat help
REPORT_GAS=true npx hardhat test
npx hardhat coverage
npx hardhat run scripts/deploy.ts
TS_NODE_FILES=true npx ts-node scripts/deploy.ts
npx eslint '**/*.{js,ts}'
npx eslint '**/*.{js,ts}' --fix
npx prettier '**/*.{json,sol,md}' --check
npx prettier '**/*.{json,sol,md}' --write
npx solhint 'contracts/**/*.sol'
npx solhint 'contracts/**/*.sol' --fix
```

# Etherscan verification

To try out Etherscan verification, you first need to deploy a contract to an Ethereum network that's supported by Etherscan, such as Ropsten.

In this project, copy the .env.example file to a file named .env, and then edit it to fill in the details. Enter your Etherscan API key, your Ropsten node URL (eg from Alchemy), and the private key of the account which will send the deployment transaction. With a valid .env file in place, first deploy your contract:

```shell
hardhat run --network ropsten scripts/deploy.ts
```

Then, copy the deployment address and paste it in to replace `DEPLOYED_CONTRACT_ADDRESS` in this command:

```shell
npx hardhat verify --network ropsten DEPLOYED_CONTRACT_ADDRESS "Hello, Hardhat!"
```

# Performance optimizations

For faster runs of your tests and scripts, consider skipping ts-node's type checking by setting the environment variable `TS_NODE_TRANSPILE_ONLY` to `1` in hardhat's environment. For more details see [the documentation](https://hardhat.org/guides/typescript.html#performance-optimizations).

## Resources:

- L2 guide on Ethereum: https://dcbuilder.mirror.xyz/QX_ELJBQBm1Iq45ktPsz8pWLZN1C52DmEtH09boZuo0
- Optimistic Ethereum: https://github.com/ethereum-optimism/optimistic-specs
- Understanding rollups: https://vitalik.ca/general/2021/01/05/rollup.html
- Ethereum for developers: https://ethereum.org/es/developers/docs/
- Intro Ethereum: https://ethereum.org/en/developers/docs/intro-to-ethereum/
- Hardhat documentation: https://hardhat.org/advanced/hardhat-runtime-environment.html
- POS: https://ethereum.org/en/developers/docs/consensus-mechanisms/pos/
- Ethereum white paper: https://ethereum.org/en/whitepaper/
- Solidity API: https://docs.soliditylang.org/en/v0.8.13/
- EIP 721: https://eips.ethereum.org/EIPS/eip-721
- SVG viewer: https://www.svgviewer.dev
- Alchemy: https://www.alchemy.com
- Polygon Mumbai testnet: https://mumbai.polygonscan.com
- Mumbai Polygon scan: https://mumbai.polygonscan.com
- Opensea test net: https://testnets.opensea.io
