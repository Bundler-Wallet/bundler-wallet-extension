<p align="center">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="src/assets/img/icon-128.png">
    <img src="src/assets/img/icon-128.png" height="300px">
  </picture>
</p>

<h1 align="center">Bundler wallet</h1>

Privacy-enabled and Web2 Authenticated smart wallets for access to any Web3 dApp.

## Installation and Running

### Steps:

1. Verify that your [Node.js](https://nodejs.org/) version is >= **18.12.0**.
2. Clone this repository.
3. Make sure you configure the `provider` in `src/exconfig.json` to the `Goerli` network.
4. Edit the `bundler` URL pointing to `Goerli` network and accepting EntryPoint=`0x0576a174D229E3cFA37253523E645A78A0C91B57`
5. Run `yarn install` to install the dependencies.
6. Run `yarn start`
7. Load your extension in Chrome by following these steps:
   1. Go to `chrome://extensions/`
   2. Enable `Developer mode`
   3. Click on `Load unpacked extension`
   4. Select the `build` folder.
8. Happy hacking.

### Custom Network

1. Make sure EntryPoint is deployed on the target network.
2. Edit the `entryPointAddress` in `src/exconfig.json`.
3. Add your network details in `hardhat.condig.ts`.
4. Deploy the factory using `INFURA_ID=<required> npx hardhat deploy --network <network>`.
5. Edit the `factory_address` in `src/exconfig.json`
6. Edit the `bundler` url in `src/exconfig.json` that points to your network and accepts requests for your EntryPoint.
7. Run `yarn start`

### Local Network

1. Run a local hardhat node with `npx hardhat node` or use the node inside the bundler repo.
2. Deploy EntryPoint from [the infinitism repo](https://github.com/eth-infinitism/account-abstraction), you can find the instructions [below](#how-to-deploy-entrypoint-locally).
3. Edit the `entryPointAddress` in `src/exconfig.json`.
4. Deploy the factory using `npx hardhat deploy --network localhost`.
5. Edit the `factory_address` in `src/exconfig.json`
6. Start a local bunder from [the infinitism repo](https://github.com/eth-infinitism/bundler) at port `9000`, you can find the instructions [below](#how-to-run-bundler-locally).
7. Edit the `bundler` to `http://localhost:9000/rpc` url in `src/exconfig.json` that points to your network and accepts requests for your EntryPoint.
8. Run `yarn start`

### How to deploy EntryPoint Locally

1. Clone the repo https://github.com/eth-infinitism/account-abstraction
2. Run `yarn install` to install the dependencies.
3. Deploy EntryPoint with `DEBUG=true MNEMONIC_FILE=<path-to-mnemonic-file> yarn deploy --network dev`

### How to run bundler Locally

1. Clone the repo https://github.com/eth-infinitism/bundler
2. Run `yarn install` to install the dependencies.
3. Run `yarn preprocess` to compile all the local dependencies.
4. Edit `bundler.config.json` at `packages/bundler/localconfig`:
   a. Edit `network` to your local hardhat node
   b. Edit the `entryPoint` address that you got while deploying it using instructions above.
   c. Change port to `9000`.
   d. Make sure your mnemonic & beneficiary are setup correctly.
5. Run the bunder using `yarn bundler --unsafe --port 9000 --auto`

## Config

Config of the extension can be set in `excnfig.json` file.

```json
{
  // Enable or disable password for the user.
  "enablePasswordEncryption": true,
  // Show default transaction screen
  "showTransactionConfirmationScreen": true,
  // Network that your SCW supports. Currently this app only supports a single network, we will soon have support for multiple networks in future
  "network": {
    "chainID": "5",
    "family": "EVM",
    "name": "Goerli",
    "provider": "https://goerli.infura.io/v3/bdabe9d2f9244005af0f566398e648da",
    "entryPointAddress": "0x0F46c65C17AA6b4102046935F33301f0510B163A",
    "bundler": "https://app.stackup.sh/api/v1/bundler/96771b1b09e802669c33a3fc50f517f0f514a40da6448e24640ecfd83263d336",
    "baseAsset": {
      "symbol": "ETH",
      "name": "ETH",
      "decimals": 18,
      "image": "https://ethereum.org/static/6b935ac0e6194247347855dc3d328e83/6ed5f/eth-diamond-black.webp"
    }
  }
}
```

## ...

This repository is based on the boilerplate code found at [plusminushalf/trampoline-example](https://github.com/plusminushalf/trampoline-example) go there for more details.